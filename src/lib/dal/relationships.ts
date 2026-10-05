import { prisma } from '@/lib/db';
export async function getRelationshipOptions() {
  const [companies, contacts, leads, opportunities] = await Promise.all([
    prisma.orm.public.Company.select('id', 'name').all(),
    prisma.orm.public.Contact.select('id', 'name').all(),
    prisma.orm.public.Lead.select('id', 'name').all(),
    prisma.orm.public.Opportunity.select('id', 'title').all(),
  ]);
  return {
    companies: companies.map(c => ({ value: c.id, label: c.name })),
    contacts: contacts.map(c => ({ value: c.id, label: c.name })),
    leads: leads.map(c => ({ value: c.id, label: c.name })),
    opportunities: opportunities.map(c => ({ value: c.id, label: c.title })),
  };
}
export type RelationshipOptions = Awaited<ReturnType<typeof getRelationshipOptions>>;
