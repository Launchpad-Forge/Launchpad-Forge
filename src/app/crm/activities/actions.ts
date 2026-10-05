/**
 * Server Actions — Activities
 */

"use server";

import { requireCrmUser } from "@/lib/crm-auth";
import { revalidatePath } from "next/cache";
import { ActivityCreateSchema } from "@/lib/validations";
import * as dal from "@/lib/dal";

export type ActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function cleanData(data: Record<string, unknown>) {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    cleaned[key] = value === "" ? undefined : value;
  }
  return cleaned;
}

export async function createActivityAction(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = ActivityCreateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.createActivity>[0];
    await dal.createActivity(data);
    revalidatePath("/crm/activities");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[createActivityAction]", error);
    return { success: false, error: "Failed to log activity. Please try again." };
  }
}

export async function updateActivityAction(id: string, formData: FormData): Promise<ActionResult> {
  const parsed = ActivityCreateSchema.partial().safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  try {
    await requireCrmUser();
    const changes = cleanData(parsed.data);
    for (const [key, value] of Object.entries(parsed.data)) {
      if (value === "" && key.endsWith("Id")) changes[key] = null;
    }
    if (!await dal.updateActivity(id, changes)) throw new Error("Record not found.");
    revalidatePath("/crm/activities");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[updateActivityAction]", error);
    return { success: false, error: "Failed to update activity. Please try again." };
  }
}

export async function deleteActivityAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    await dal.deleteActivity(id);
    revalidatePath("/crm/activities");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[deleteActivityAction]", error);
    return { success: false, error: "Failed to delete activity. Please try again." };
  }
}
