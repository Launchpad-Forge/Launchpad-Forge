import { getRelationshipOptions } from "@/lib/dal/relationships";
import { getActivities } from "@/lib/dal";
import { ActivitiesClient } from "./ActivitiesClient";

export const dynamic = "force-dynamic";

export default async function ActivitiesPage() {
  const { activities } = await getActivities({
    page: 1,
    pageSize: 100, // Load all recent activities
  });

  const options = await getRelationshipOptions();
  return <ActivitiesClient activities={activities} options={options} />;
}
