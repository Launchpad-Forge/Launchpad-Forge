import { prisma } from "@/lib/db";
import { or } from "@prisma/orm-postgres/orm-client";

export type CompanyListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  industry?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function getCompanies(params: CompanyListParams = {}) {
  const {
    page = 1,
    pageSize = 25,
    search,
    status,
    industry,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  let baseQuery = prisma.orm.public.Company;

  if (status) baseQuery = baseQuery.where({ status });
  if (industry) baseQuery = baseQuery.where({ industry });
  if (search) {
    baseQuery = baseQuery.where((c) => or(
      c.name.ilike(`%${search}%`),
      c.email.ilike(`%${search}%`),
      c.industry.ilike(`%${search}%`)
    ));
  }

  const query = baseQuery
    .include('contacts', c => c.count())
    .include('opportunities', o => o.count())
    .include('leads', l => l.count())
    .orderBy(c => sortOrder === "asc" ? (c as any)[sortBy].asc() : (c as any)[sortBy].desc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [companies, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(c => ({ total: c.count() }))
  ]);

  // Convert the count reducers into a _count object to keep frontend compatibility
  const formattedCompanies = companies.map(c => ({
    ...c,
    _count: {
      contacts: c.contacts,
      opportunities: c.opportunities,
      leads: c.leads
    }
  }));

  return JSON.parse(JSON.stringify({ companies: formattedCompanies, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

export async function getCompany(id: string) {
  return prisma.orm.public.Company
    .where({ id })
    .include('contacts', c => c.orderBy(con => con.name.asc()))
    .include('opportunities', o => o.include('primaryContact').orderBy(opp => opp.createdAt.desc()))
    .include('leads', l => l.orderBy(lead => lead.createdAt.desc()))
    .include('client')
    .include('activities', a => a.include('author').orderBy(act => act.date.desc()).limit(20))
    .include('followUps', f => f.where({ status: 'Pending' }).orderBy(fup => fup.dueDate.asc()))
    .first();
}

export async function createCompany(data: any) {
  return prisma.orm.public.Company.create(data);
}

export async function updateCompany(id: string, data: any) {
  return prisma.orm.public.Company.where({ id }).update(data);
}

export async function deleteCompany(id: string) {
  return prisma.orm.public.Company.where({ id }).delete();
}

export async function getCompanyOptions(search?: string) {
  let query = prisma.orm.public.Company
    .select('id', 'name', 'industry', 'status')
    .orderBy(c => c.name.asc())
    .limit(20);

  if (search) {
    query = query.where(c => c.name.ilike(`%${search}%`));
  }

  const result = await query.all();
  return JSON.parse(JSON.stringify(result));
}
