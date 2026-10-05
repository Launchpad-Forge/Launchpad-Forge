import RecordsClient, { type CrmRow } from './RecordsClient';
import { requireCrmUser } from '@/lib/crm-auth';
import { prisma } from '@/lib/db';
import { CRM_RECORDS, type RecordKind } from '@/lib/crm-records';
export default async function RecordsPage({ kind }: { kind: RecordKind }) {
  await requireCrmUser();
  const [companies, clients, opportunities, projects, invoices] = await Promise.all([
    prisma.orm.public.Company.select('id', 'name').all(),
    prisma.orm.public.Client.include('company').all(),
    prisma.orm.public.Opportunity.select('id', 'title').all(),
    prisma.orm.public.Project.select('id', 'name').all(),
    prisma.orm.public.Invoice.all(),
  ]);
  const options = {
    companies: companies.map(c => ({ id: c.id, label: c.name })),
    clients: clients.map(c => ({ id: c.id, label: c.company?.name ?? c.id })),
    opportunities: opportunities.map(o => ({ id: o.id, label: o.title })),
    projects: projects.map(p => ({ id: p.id, label: p.name })),
    invoices: invoices.filter(i => !['Draft', 'Cancelled', 'Paid'].includes(i.status)).map(i => ({ id: i.id, label: i.invoiceNumber })),
  };
  const records = kind === 'clients' ? clients : kind === 'invoices' ? invoices : kind === 'proposals' ? await prisma.orm.public.Proposal.all() : await prisma.orm.public.Payment.all();
  const rows: CrmRow[] = records.map(record => {
    const source = record as unknown as Record<string, unknown>;
    const values: CrmRow['values'] = {};
    for (const field of CRM_RECORDS[kind].fields) {
      const value = source[field.name];
      values[field.name] = value == null ? null : field.type === 'date' ? String(value).slice(0, 10) : typeof value === 'number' ? value : String(value);
    }
    const client = clients.find(c => c.id === record.id);
    const invoice = invoices.find(i => i.id === source.invoiceId);
    return { id: record.id, label: String(source.title ?? source.invoiceNumber ?? (kind === 'clients' ? client?.company?.name ?? record.id : invoice?.invoiceNumber ?? record.id)), status: String(source.status ?? source.method ?? ''), amount: typeof source.total === 'number' ? source.total : typeof source.amount === 'number' ? source.amount : undefined, values };
  });
  return <RecordsClient kind={kind} rows={rows} options={options} />;
}
