import { getLeads } from "@/lib/dal";
import { LeadsClient } from "./LeadsClient";

// Force dynamic since we're using searchParams
export const dynamic = "force-dynamic";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string; priority?: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const search = params.search || "";
  const status = params.status || undefined;
  const priority = params.priority || undefined;

  const { leads, totalPages } = await getLeads({
    page,
    search,
    status,
    priority,
    pageSize: 15,
  });

  return <LeadsClient leads={leads} page={page} totalPages={totalPages} />;
}
