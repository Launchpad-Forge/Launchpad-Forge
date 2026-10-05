/**
 * Server Actions — Contacts
 */

"use server";

import { requireCrmUser } from "@/lib/crm-auth";
import { revalidatePath } from "next/cache";
import { ContactCreateSchema, ContactUpdateSchema } from "@/lib/validations";
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

export async function createContactAction(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = ContactCreateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.createContact>[0];
    await dal.createContact(data);
    revalidatePath("/crm/contacts");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[createContactAction]", error);
    return { success: false, error: "Failed to create contact. Please try again." };
  }
}

export async function updateContactAction(id: string, formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = ContactUpdateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.updateContact>[1];
    await dal.updateContact(id, data);
    revalidatePath("/crm/contacts");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[updateContactAction]", error);
    return { success: false, error: "Failed to update contact. Please try again." };
  }
}

export async function deleteContactAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    await dal.deleteContact(id);
    revalidatePath("/crm/contacts");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[deleteContactAction]", error);
    return { success: false, error: "Failed to delete contact. Please try again." };
  }
}
