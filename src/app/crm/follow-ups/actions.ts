/**
 * Server Actions — Follow-ups
 */

"use server";

import { requireCrmUser } from "@/lib/crm-auth";
import { revalidatePath } from "next/cache";
import { FollowUpCreateSchema, FollowUpUpdateSchema } from "@/lib/validations";
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

export async function createFollowUpAction(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = FollowUpCreateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.createFollowUp>[0];
    await dal.createFollowUp(data);
    revalidatePath("/crm/follow-ups");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[createFollowUpAction]", error);
    return { success: false, error: "Failed to create follow-up. Please try again." };
  }
}

export async function completeFollowUpAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    await dal.completeFollowUp(id);
    revalidatePath("/crm/follow-ups");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[completeFollowUpAction]", error);
    return { success: false, error: "Failed to complete follow-up. Please try again." };
  }
}

export async function deleteFollowUpAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    await dal.deleteFollowUp(id);
    revalidatePath("/crm/follow-ups");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[deleteFollowUpAction]", error);
    return { success: false, error: "Failed to delete follow-up. Please try again." };
  }
}

export async function updateFollowUpAction(id: string, formData: FormData): Promise<ActionResult> {
  const parsed = FollowUpUpdateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  try {
    await requireCrmUser();
    const changes = cleanData(parsed.data);
    for (const [key, value] of Object.entries(parsed.data)) {
      if (value === "" && key.endsWith("Id")) changes[key] = null;
    }
    if (!await dal.updateFollowUp(id, changes)) throw new Error("Record not found.");
    revalidatePath("/crm/follow-ups");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[updateFollowUpAction]", error);
    return { success: false, error: "Failed to update follow-up. Please try again." };
  }
}
