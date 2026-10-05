import { getCompanies } from "@/lib/dal";
import { CompaniesClient } from "./CompaniesClient";

export const dynamic = "force-dynamic";

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string; industry?: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const search = params.search || "";
  const status = params.status || undefined;
  const industry = params.industry || undefined;

  const { companies, totalPages } = await getCompanies({
    page,
    search,
    status,
    industry,
    pageSize: 15,
  });

  return <CompaniesClient companies={companies} page={page} totalPages={totalPages} />;
}
