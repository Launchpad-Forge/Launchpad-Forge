import { prisma } from "@/lib/db";
import { or } from "@prisma/orm-postgres/orm-client";

export type LeadListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function getLeads(params: LeadListParams = {}) {
  const {
    page = 1,
    pageSize = 25,
    search,
    status,
    priority,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  let baseQuery = prisma.orm.public.Lead;
  if (status) baseQuery = baseQuery.where({ status });
  if (priority) baseQuery = baseQuery.where({ priority });
  if (search) {
    baseQuery = baseQuery.where((l) => or(
      l.name.ilike(`%${search}%`),
      l.email.ilike(`%${search}%`),
      l.companyName.ilike(`%${search}%`)
    ));
  }

  const query = baseQuery
    .include('assignedUser', u => u.select('id', 'name')).include('company', c => c.select('name'))
    .include('activities', a => a.count())
    .include('followUps', f => f.count())
    .orderBy(l => sortOrder === "asc" ? (l as any)[sortBy].asc() : (l as any)[sortBy].desc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [leads, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(l => ({ total: l.count() }))
  ]);

  const formattedLeads = leads.map(l => ({
    ...l,
    _count: {
      activities: l.activities,
      followUps: l.followUps
    }
  }));

  return JSON.parse(JSON.stringify({ leads: formattedLeads, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

export async function getLead(id: string) {
  return prisma.orm.public.Lead
    .where({ id })
    .include('assignedUser')
    .include('company')
    .include('activities', a => a.include('author').orderBy(act => act.date.desc()).limit(20))
    .include('followUps', f => f.where({ status: 'Pending' }).orderBy(fup => fup.dueDate.asc()))
    .first();
}

export async function createLead(data: any) {
  return prisma.orm.public.Lead.create(data);
}

export async function updateLead(id: string, data: any) {
  return prisma.orm.public.Lead.where({ id }).update(data);
}

export async function deleteLead(id: string) {
  return prisma.orm.public.Lead.where({ id }).delete();
}

export async function getLeadsForKanban() {
  const leads = await prisma.orm.public.Lead
    .where(l => l.status.neq("Converted")).where(l => l.status.neq("Lost"))
    .include('assignedUser', u => u.select('id', 'name')).include('company', c => c.select('name'))
    .orderBy(l => l.createdAt.asc())
    .all();

  const stages = ["New", "Contacted", "Qualified", "Proposal"];
  const columns: Record<string, typeof leads> = {};
  for (const stage of stages) {
    columns[stage] = leads.filter((l) => l.status === stage);
  }

  return JSON.parse(JSON.stringify(columns));
}

export async function moveLeadStatus(id: string, newStatus: string) {
  return prisma.orm.public.Lead.where({ id }).update({ status: newStatus });
}

export type LeadWithRelations = Awaited<ReturnType<typeof getLeads>>["leads"][number];
