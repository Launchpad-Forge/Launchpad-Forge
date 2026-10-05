/**
 * Data Access Layer — Activities
 */

import { prisma } from "@/lib/db";

export type ActivityListParams = {
  page?: number;
  pageSize?: number;
  type?: string;
  leadId?: string;
  contactId?: string;
  companyId?: string;
  opportunityId?: string;
  projectId?: string;
};

export async function getActivities(params: ActivityListParams = {}) {
  const {
    page = 1,
    pageSize = 25,
    type,
    leadId,
    contactId,
    companyId,
    opportunityId,
    projectId,
  } = params;

  let baseQuery = prisma.orm.public.Activity;
  if (type) baseQuery = baseQuery.where({ type });
  if (leadId) baseQuery = baseQuery.where({ leadId });
  if (contactId) baseQuery = baseQuery.where({ contactId });
  if (companyId) baseQuery = baseQuery.where({ companyId });
  if (opportunityId) baseQuery = baseQuery.where({ opportunityId });
  if (projectId) baseQuery = baseQuery.where({ projectId });

  const query = baseQuery
    .include('author', a => a.select('id', 'name'))
    .include('lead', l => l.select('id', 'name'))
    .include('contact', c => c.select('id', 'name'))
    .include('company', c => c.select('id', 'name'))
    .include('opportunity', o => o.select('id', 'title'))
    .include('project', p => p.select('id', 'name'))
    .orderBy(a => a.date.desc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [activities, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(a => ({ total: a.count() }))
  ]);

  return JSON.parse(JSON.stringify({ activities, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

/** Get activities for a specific entity (for detail view timelines) */
export async function getActivitiesForEntity(
  entityType: "lead" | "contact" | "company" | "opportunity" | "project",
  entityId: string,
  limit = 20
) {
  const result = await prisma.orm.public.Activity
    .where({ [`${entityType}Id`]: entityId })
    .include('author', a => a.select('id', 'name'))
    .orderBy(a => a.date.desc())
    .limit(limit)
    .all();
  return JSON.parse(JSON.stringify(result));
}

export async function createActivity(data: any) {
  return prisma.orm.public.Activity.create(data);
}

/** Get recent activities across all entities — for dashboard */
export async function getRecentActivities(limit = 10) {
  const result = await prisma.orm.public.Activity
    .include('author', a => a.select('id', 'name'))
    .include('lead', l => l.select('id', 'name'))
    .include('contact', c => c.select('id', 'name'))
    .include('company', c => c.select('id', 'name'))
    .include('opportunity', o => o.select('id', 'title'))
    .include('project', p => p.select('id', 'name'))
    .orderBy(a => a.date.desc())
    .limit(limit)
    .all();
  return JSON.parse(JSON.stringify(result));
}

export async function updateActivity(id: string, data: any) {
  return prisma.orm.public.Activity.where({ id }).update(data);
}

export async function deleteActivity(id: string) {
  return prisma.orm.public.Activity.where({ id }).delete();
}
