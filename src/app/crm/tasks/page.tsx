import { getTasks, getProjectOptions } from "@/lib/dal/entities";
import { TasksClient } from "./TasksClient";

export const dynamic = "force-dynamic";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const status = params.status || undefined;

  const [tasksData, projects] = await Promise.all([
    getTasks({
      page: 1,
      search,
      status,
      pageSize: 100,
    }),
    getProjectOptions(),
  ]);

  return (
    <TasksClient
      tasks={tasksData.tasks}
      projects={projects}
    />
  );
}
