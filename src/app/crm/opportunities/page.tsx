import { getOpportunities, getCompanyOptions } from "@/lib/dal";
import { OpportunitiesClient } from "./OpportunitiesClient";

export const dynamic = "force-dynamic";

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; priority?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const priority = params.priority || undefined;

  // Kanban usually loads all relevant deals, no pagination
  const [opportunitiesData, companies] = await Promise.all([
    getOpportunities({
      page: 1,
      search,
      priority,
      pageSize: 100, // Load enough for the board
    }),
    getCompanyOptions(),
  ]);

  return (
    <OpportunitiesClient
      opportunities={opportunitiesData.opportunities}
      companies={companies}
    />
  );
}
