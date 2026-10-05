import { getProjects, getClientOptions } from "@/lib/dal/entities";
import { ProjectsClient } from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const status = params.status || undefined;

  const [projectsData, clients] = await Promise.all([
    getProjects({
      page: 1,
      search,
      status,
      pageSize: 100,
    }),
    getClientOptions(),
  ]);

  return (
    <ProjectsClient
      projects={projectsData.projects}
      clients={clients}
    />
  );
}
