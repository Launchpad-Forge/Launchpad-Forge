/**
 * Server Actions — Companies
 */

"use server";

import { requireCrmUser } from "@/lib/crm-auth";
import { revalidatePath } from "next/cache";
import { CompanyCreateSchema, CompanyUpdateSchema } from "@/lib/validations";
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

export async function createCompanyAction(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = CompanyCreateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.createCompany>[0];
    await dal.createCompany(data);
    revalidatePath("/crm/companies");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[createCompanyAction]", error);
    return { success: false, error: "Failed to create company. Please try again." };
  }
}

export async function updateCompanyAction(id: string, formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = CompanyUpdateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.updateCompany>[1];
    await dal.updateCompany(id, data);
    revalidatePath("/crm/companies");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[updateCompanyAction]", error);
    return { success: false, error: "Failed to update company. Please try again." };
  }
}

export async function deleteCompanyAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    await dal.deleteCompany(id);
    revalidatePath("/crm/companies");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[deleteCompanyAction]", error);
    return { success: false, error: "Failed to delete company. Please try again." };
  }
}
