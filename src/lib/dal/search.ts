import { prisma } from "@/lib/db";
import { or } from "@prisma/orm-postgres/orm-client";

export type GlobalSearchResult = {
  leads: any[];
  contacts: any[];
  companies: any[];
  opportunities: any[];
};

export async function globalSearch(query: string): Promise<GlobalSearchResult> {
  if (!query || query.length < 2) {
    return { leads: [], contacts: [], companies: [], opportunities: [] };
  }

  const [leads, contacts, companies, opportunities] = await Promise.all([
    prisma.orm.public.Lead
      .where((l) => or(
        l.name.ilike(`%${query}%`),
        l.email.ilike(`%${query}%`),
        l.companyName.ilike(`%${query}%`)
      ))
      .select('id', 'name', 'email', 'status')
      .limit(5)
      .all(),

    prisma.orm.public.Contact
      .where((c) => or(
        c.name.ilike(`%${query}%`),
        c.email.ilike(`%${query}%`)
      ))
      .select('id', 'name', 'email')
      .include('company', c => c.select('name'))
      .limit(5)
      .all(),

    prisma.orm.public.Company
      .where((c) => or(
        c.name.ilike(`%${query}%`),
        c.industry.ilike(`%${query}%`)
      ))
      .select('id', 'name', 'industry')
      .limit(5)
      .all(),

    prisma.orm.public.Opportunity
      .where((o) => or(
        o.title.ilike(`%${query}%`),
        o.company.some(c => c.name.ilike(`%${query}%`))
      ))
      .select('id', 'title', 'stage')
      .include('company', c => c.select('name'))
      .limit(5)
      .all()
  ]);

  return { leads, contacts, companies, opportunities };
}
