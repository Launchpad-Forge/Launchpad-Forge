import { prisma } from "@/lib/db";
import { or } from "@prisma/orm-postgres/orm-client";

export type ContactListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  companyId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function getContacts(params: ContactListParams = {}) {
  const {
    page = 1,
    pageSize = 25,
    search,
    companyId,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  let baseQuery = prisma.orm.public.Contact;
  if (companyId) baseQuery = baseQuery.where({ companyId });
  if (search) {
    baseQuery = baseQuery.where((c) => or(
      c.name.ilike(`%${search}%`),
      c.email.ilike(`%${search}%`),
      c.jobTitle.ilike(`%${search}%`)
    ));
  }

  const query = baseQuery
    .include('company')
    .include('opportunities', o => o.count())
    .include('activities', a => a.count())
    .orderBy(c => sortOrder === "asc" ? (c as any)[sortBy].asc() : (c as any)[sortBy].desc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [contacts, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(c => ({ total: c.count() }))
  ]);

  const formattedContacts = contacts.map(c => ({
    ...c,
    _count: {
      opportunities: c.opportunities,
      activities: c.activities
    }
  }));

  return JSON.parse(JSON.stringify({ contacts: formattedContacts, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

export async function getContact(id: string) {
  return prisma.orm.public.Contact
    .where({ id })
    .include('company')
    .include('opportunities', o => o.include('company').orderBy(opp => opp.createdAt.desc()))
    .include('activities', a => a.include('author').orderBy(act => act.date.desc()).limit(20))
    .include('followUps', f => f.where({ status: 'Pending' }).orderBy(fup => fup.dueDate.asc()))
    .first();
}

export async function createContact(data: any) {
  return prisma.orm.public.Contact.create(data);
}

export async function updateContact(id: string, data: any) {
  return prisma.orm.public.Contact.where({ id }).update(data);
}

export async function deleteContact(id: string) {
  return prisma.orm.public.Contact.where({ id }).delete();
}

export async function getContactOptions(search?: string) {
  let query = prisma.orm.public.Contact
    .select('id', 'name', 'email', 'companyId')
    .include('company', c => c.select('name'))
    .orderBy(c => c.name.asc())
    .limit(20);

  if (search) {
    query = query.where(c => c.name.ilike(`%${search}%`));
  }

  const result = await query.all();
  return JSON.parse(JSON.stringify(result));
}
