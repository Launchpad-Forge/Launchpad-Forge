import { getRelationshipOptions } from "@/lib/dal/relationships";
import { getFollowUps } from "@/lib/dal";
import { FollowUpsClient } from "./FollowUpsClient";

export const dynamic = "force-dynamic";

export default async function FollowUpsPage() {
  const { followUps } = await getFollowUps({
    page: 1,
    pageSize: 100, // Load all for client-side date filtering
  });

  const options = await getRelationshipOptions();
  return <FollowUpsClient followUps={followUps} options={options} />;
}
