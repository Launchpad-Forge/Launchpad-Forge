import { prisma } from "@/lib/db";
import { or } from "@prisma/orm-postgres/orm-client";

export type ProjectListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  clientId?: string;
};

export async function getProjects(params: ProjectListParams = {}) {
  const { page = 1, pageSize = 25, search, status, clientId } = params;

  let baseQuery = prisma.orm.public.Project;
  if (status) baseQuery = baseQuery.where({ status });
  if (clientId) baseQuery = baseQuery.where({ clientId });
  if (search) {
    baseQuery = baseQuery.where(p => p.name.ilike(`%${search}%`));
  }

  const query = baseQuery
    .include('client', c => c.include('company', co => co.select('id', 'name')))
    .include('tasks', t => t.select('id', 'status'))
    .include('invoices', i => i.count())
    .orderBy(p => p.createdAt.desc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [projects, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(p => ({ total: p.count() }))
  ]);

  const formattedProjects = projects.map(p => ({
    ...p,
    _count: { tasks: p.tasks.length, invoices: p.invoices }
  }));

  return JSON.parse(JSON.stringify({ projects: formattedProjects, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

export async function getProject(id: string) {
  return prisma.orm.public.Project
    .where({ id })
    .include('client', c => c.include('company'))
    .include('tasks', t => t.orderBy(task => task.createdAt.desc()))
    .include('invoices', i => i.orderBy(inv => inv.createdAt.desc()))
    .include('activities', a => a.orderBy(act => act.date.desc()))
    .first();
}

export async function createProject(data: any) {
  return prisma.orm.public.Project.create(data);
}

export async function updateProject(id: string, data: any) {
  return prisma.orm.public.Project.where({ id }).update(data);
}

export async function deleteProject(id: string) {
  return prisma.orm.public.Project.where({ id }).delete();
}

// Tasks
export type TaskListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  projectId?: string;
};

export async function getTasks(params: TaskListParams = {}) {
  const { page = 1, pageSize = 50, search, status, projectId } = params;

  let baseQuery = prisma.orm.public.Task;
  if (status) baseQuery = baseQuery.where({ status });
  if (projectId) baseQuery = baseQuery.where({ projectId });
  if (search) {
    baseQuery = baseQuery.where(t => t.title.ilike(`%${search}%`));
  }

  const query = baseQuery
    .include('project', p => p.select('id', 'name'))
    .orderBy(t => t.createdAt.desc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [tasks, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(t => ({ total: t.count() }))
  ]);

  return JSON.parse(JSON.stringify({ tasks, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

export async function createTask(data: any) {
  return prisma.orm.public.Task.create(data);
}

export async function updateTask(id: string, data: any) {
  return prisma.orm.public.Task.where({ id }).update(data);
}

export async function deleteTask(id: string) {
  return prisma.orm.public.Task.where({ id }).delete();
}

// Invoices
export type InvoiceListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  clientId?: string;
};

export async function getInvoices(params: InvoiceListParams = {}) {
  const { page = 1, pageSize = 25, search, status, clientId } = params;

  let baseQuery = prisma.orm.public.Invoice;
  if (status) baseQuery = baseQuery.where({ status });
  if (clientId) baseQuery = baseQuery.where({ clientId });
  if (search) {
    baseQuery = baseQuery.where(i => or(
      i.invoiceNumber.ilike(`%${search}%`),
      i.client.some(c => c.company.some(co => co.name.ilike(`%${search}%`)))
    ));
  }

  const query = baseQuery
    .include('client', c => c.include('company', co => co.select('id', 'name')))
    .include('project', p => p.select('id', 'name'))
    .include('payments', p => p.count())
    .include('items', i => i.count())
    .orderBy(i => i.createdAt.desc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [invoices, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(i => ({ total: i.count() }))
  ]);

  const formattedInvoices = invoices.map(i => ({
    ...i,
    _count: { payments: i.payments, items: i.items }
  }));

  return JSON.parse(JSON.stringify({ invoices: formattedInvoices, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

export async function getInvoice(id: string) {
  return prisma.orm.public.Invoice
    .where({ id })
    .include('client', c => c.include('company'))
    .include('project')
    .include('items')
    .include('payments', p => p.orderBy(pay => pay.date.desc()))
    .first();
}

export async function createInvoice(data: any) {
  return prisma.orm.public.Invoice.create(data);
}

export async function updateInvoice(id: string, data: any) {
  return prisma.orm.public.Invoice.where({ id }).update(data);
}

export async function deleteInvoice(id: string) {
  return prisma.orm.public.Invoice.where({ id }).delete();
}

export async function getOverdueInvoices() {
  const result = await prisma.orm.public.Invoice
    .where(i => or(i.status.eq("Sent"), i.status.eq("Overdue")))
    .where(i => i.dueDate.lt(new Date()))
    .include('client', c => c.include('company', co => co.select('name')))
    .orderBy(i => i.dueDate.asc())
    .all();
  return JSON.parse(JSON.stringify(result));
}

// Proposals
export type ProposalListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
};

export async function getProposals(params: ProposalListParams = {}) {
  const { page = 1, pageSize = 25, search, status } = params;

  let baseQuery = prisma.orm.public.Proposal;
  if (status) baseQuery = baseQuery.where({ status });
  if (search) {
    baseQuery = baseQuery.where(p => or(
      p.proposalNumber.ilike(`%${search}%`),
      p.title.ilike(`%${search}%`)
    ));
  }

  const query = baseQuery
    .include('client', c => c.include('company', co => co.select('id', 'name')))
    .include('company', c => c.select('id', 'name'))
    .include('opportunity', o => o.select('id', 'title'))
    .include('items', i => i.count())
    .orderBy(p => p.createdAt.desc())
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [proposals, { total }] = await Promise.all([
    query.all(),
    baseQuery.aggregate(p => ({ total: p.count() }))
  ]);

  const formattedProposals = proposals.map(p => ({
    ...p,
    _count: { items: p.items }
  }));

  return JSON.parse(JSON.stringify({ proposals: formattedProposals, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }));
}

export async function getProposal(id: string) {
  return prisma.orm.public.Proposal
    .where({ id })
    .include('client', c => c.include('company'))
    .include('company')
    .include('opportunity')
    .include('items')
    .first();
}

export async function createProposal(data: any) {
  return prisma.orm.public.Proposal.create(data);
}

export async function updateProposal(id: string, data: any) {
  return prisma.orm.public.Proposal.where({ id }).update(data);
}

export async function deleteProposal(id: string) {
  return prisma.orm.public.Proposal.where({ id }).delete();
}

// Payments
export async function getPayments(invoiceId?: string) {
  let baseQuery = prisma.orm.public.Payment;
  if (invoiceId) baseQuery = baseQuery.where({ invoiceId });

  const result = await baseQuery
    .include('invoice', i => i.select('id', 'invoiceNumber', 'total'))
    .orderBy(p => p.date.desc())
    .all();
  return JSON.parse(JSON.stringify(result));
}

export async function createPayment(data: any) {
  return prisma.orm.public.Payment.create(data);
}

export async function deletePayment(id: string) {
  return prisma.orm.public.Payment.where({ id }).delete();
}

export async function getProjectOptions(search?: string) {
  let query = prisma.orm.public.Project.select("id", "name").orderBy(p => p.name.asc()).limit(20);
  if (search) query = query.where(p => p.name.ilike(`%${search}%`));
  const result = await query.all();
  return JSON.parse(JSON.stringify(result));
}

export async function getClientOptions(search?: string) {
  let query = prisma.orm.public.Client.include("company", c => c.select("name")).limit(20);
  if (search) query = query.where(c => c.company.some(co => co.name.ilike(`%${search}%`)));
  const result = await query.all();
  return JSON.parse(JSON.stringify(result));
}
