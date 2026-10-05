"use server";

import { requireCrmUser } from "@/lib/crm-auth";
import { globalSearch } from "@/lib/dal/search";

export async function performGlobalSearchAction(query: string) {
  await requireCrmUser();
  return globalSearch(query.slice(0, 200));
}
