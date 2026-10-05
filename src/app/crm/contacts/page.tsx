import { getContacts, getCompanyOptions } from "@/lib/dal";
import { ContactsClient } from "./ContactsClient";

export const dynamic = "force-dynamic";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const search = params.search || "";

  const [contactsData, companies] = await Promise.all([
    getContacts({
      page,
      search,
      pageSize: 15,
    }),
    getCompanyOptions(),
  ]);

  return (
    <ContactsClient
      contacts={contactsData.contacts}
      companies={companies}
      page={page}
      totalPages={contactsData.totalPages}
    />
  );
}
