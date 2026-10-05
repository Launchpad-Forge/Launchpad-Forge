import { prisma } from "@/lib/db";
import { or, and } from "@prisma/orm-postgres/orm-client";

export type FollowUpListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  priority?: string;
  dueWithin?: "today" | "week" | "overdue";
};

export async function getFollowUps(params: FollowUpListParams = {}) {
  const {
    page = 1,
    pageSize = 25,
    search,
    status,
    priority,
    dueWithin,
  } = params;

  let baseQuery = prisma.orm.public.FollowUp;
  if (status) baseQuery = baseQuery.where({ status });
  if (priority) baseQuery = baseQuery.where({ priority });
  if (search) {
    baseQuery = baseQuery.where((f) => or(
      f.title.ilike(`%${search}%`),
      f.notes.ilike(`%${search}%`)
    ));
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);
  const endOfWeek = new Date(startOfToday);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  if (dueWithin === "overdue") {
    baseQuery = baseQuery.where(f => and(f.status.neq("Completed"), f.dueDate.lt(startOfToday)));
  } else if (dueWithin === "today") {
    baseQuery = baseQuery.where(f => and(f.dueDate.gte(startOfToday), f.dueDate.lt(endOfToday)));
  } else if (dueWithin === "week") {
    baseQuery = baseQuery.where(f => and(f.dueDate.gte(startOfToday), f.dueDate.lt(endOfWeek)));
  }

  const query = baseQuery
    .include('lead', l => l.select('id', 'name'))
    .include('contact', c => c.select('id', 'name'))
    .include('company', c => c.select('id', 'name'))
    .include('opportunity', o => o.select('id', 'title'))
    .orderBy(f => f.dueDate.asc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [followUps, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(f => ({ total: f.count() }))
  ]);

  return JSON.parse(JSON.stringify({ followUps, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

export async function getFollowUp(id: string) {
  return prisma.orm.public.FollowUp
    .where({ id })
    .include('lead')
    .include('contact')
    .include('company')
    .include('opportunity')
    .first();
}

export async function createFollowUp(data: any) {
  return prisma.orm.public.FollowUp.create(data);
}

export async function updateFollowUp(id: string, data: any) {
  return prisma.orm.public.FollowUp.where({ id }).update(data);
}

export async function deleteFollowUp(id: string) {
  return prisma.orm.public.FollowUp.where({ id }).delete();
}

export async function getPendingFollowUpsWidget(limit = 5) {
  const result = await prisma.orm.public.FollowUp
    .where({ status: "Pending" })
    .include('lead', l => l.select('name'))
    .include('company', c => c.select('name'))
    .orderBy(f => f.dueDate.asc())
    .limit(limit)
    .all();
  return JSON.parse(JSON.stringify(result));
}

export async function completeFollowUp(id: string) {
  return prisma.orm.public.FollowUp.where({ id }).update({ status: "Completed" });
}
