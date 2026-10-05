"use server";

import { requireCrmUser } from "@/lib/crm-auth";
import { revalidatePath } from "next/cache";
import { ProjectCreateSchema, ProjectUpdateSchema } from "@/lib/validations/entities";
import * as dal from "@/lib/dal/entities";
import { eventBus } from "@/services/automations";

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

export async function createProjectAction(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = ProjectCreateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data);
    await dal.createProject(data);

    revalidatePath("/crm/projects");
    return { success: true };
  } catch (error) {
    console.error("[createProjectAction]", error);
    return { success: false, error: "Failed to create project. Please try again." };
  }
}

export async function updateProjectAction(id: string, formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = ProjectUpdateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data);
    await dal.updateProject(id, data);

    revalidatePath("/crm/projects");
    return { success: true };
  } catch (error) {
    console.error("[updateProjectAction]", error);
    return { success: false, error: "Failed to update project. Please try again." };
  }
}

export async function deleteProjectAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    await dal.deleteProject(id);
    revalidatePath("/crm/projects");
    return { success: true };
  } catch (error) {
    console.error("[deleteProjectAction]", error);
    return { success: false, error: "Failed to delete project. Please try again." };
  }
}
