import { prisma } from "@/lib/db";
import { or } from "@prisma/orm-postgres/orm-client";

export type OpportunityListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  stage?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function getOpportunities(params: OpportunityListParams = {}) {
  const {
    page = 1,
    pageSize = 25,
    search,
    stage,
    priority,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  let baseQuery = prisma.orm.public.Opportunity;
  if (stage) baseQuery = baseQuery.where({ stage });
  if (priority) baseQuery = baseQuery.where({ priority });
  if (search) {
    baseQuery = baseQuery.where((o) => or(
      o.title.ilike(`%${search}%`),
      o.company.some(c => c.name.ilike(`%${search}%`))
    ));
  }

  const query = baseQuery
    .include('company')
    .include('primaryContact')
    .include('activities', a => a.count())
    .include('followUps', f => f.count())
    .include('proposals', p => p.count())
    .orderBy(o => sortOrder === "asc" ? (o as any)[sortBy].asc() : (o as any)[sortBy].desc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [opportunities, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(o => ({ total: o.count() }))
  ]);

  const formattedOpportunities = opportunities.map(o => ({
    ...o,
    _count: {
      activities: o.activities,
      followUps: o.followUps,
      proposals: o.proposals
    }
  }));

  return JSON.parse(JSON.stringify({ opportunities: formattedOpportunities, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

export async function getOpportunitiesForKanban() {
  const opportunities = await prisma.orm.public.Opportunity
    .where(o => o.stage.neq("Won")).where(o => o.stage.neq("Lost"))
    .include('company', c => c.select('id', 'name'))
    .include('primaryContact', c => c.select('id', 'name'))
    .orderBy(o => o.createdAt.asc())
    .all();

  const stages = ["New", "Qualified", "Discovery", "Proposal", "Negotiation"];
  const columns: Record<string, typeof opportunities> = {};
  for (const stage of stages) {
    columns[stage] = opportunities.filter((o) => o.stage === stage);
  }
  return JSON.parse(JSON.stringify(columns));
}

export async function getOpportunity(id: string) {
  return prisma.orm.public.Opportunity
    .where({ id })
    .include('company')
    .include('primaryContact')
    .include('activities', a => a.include('author').orderBy(act => act.date.desc()).limit(30))
    .include('followUps', f => f.orderBy(fup => fup.dueDate.asc()))
    .include('proposals', p => p.orderBy(prop => prop.createdAt.desc()))
    .first();
}

export async function createOpportunity(data: any) {
  return prisma.orm.public.Opportunity.create(data);
}

export async function updateOpportunity(id: string, data: any) {
  return prisma.orm.public.Opportunity.where({ id }).update(data);
}

export async function deleteOpportunity(id: string) {
  return prisma.orm.public.Opportunity.where({ id }).delete();
}

export async function moveOpportunityStage(id: string, newStage: string) {
  return prisma.orm.public.Opportunity.where({ id }).update({ stage: newStage });
}

export async function getPipelineStats() {
  const stats = await prisma.orm.public.Opportunity
    .where(o => o.stage.neq("Won")).where(o => o.stage.neq("Lost"))
    .groupBy('stage')
    .aggregate(a => ({ count: a.count(), totalValue: a.sum('estimatedValue') }));

  return JSON.parse(JSON.stringify(stats.map((s) => ({
    stage: s.stage,
    count: s.count,
    totalValue: s.totalValue || 0,
  }))));
}
