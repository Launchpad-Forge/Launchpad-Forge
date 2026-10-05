"use server";

import { requireCrmUser } from "@/lib/crm-auth";
import { revalidatePath } from "next/cache";
import { TaskCreateSchema, TaskUpdateSchema } from "@/lib/validations/entities";
import * as dal from "@/lib/dal/entities";

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

export async function createTaskAction(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = TaskCreateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data);
    await dal.createTask(data);

    revalidatePath("/crm/tasks");
    revalidatePath("/crm/projects");
    return { success: true };
  } catch (error) {
    console.error("[createTaskAction]", error);
    return { success: false, error: "Failed to create task. Please try again." };
  }
}

export async function updateTaskAction(id: string, formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = TaskUpdateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data);
    await dal.updateTask(id, data);

    revalidatePath("/crm/tasks");
    revalidatePath("/crm/projects");
    return { success: true };
  } catch (error) {
    console.error("[updateTaskAction]", error);
    return { success: false, error: "Failed to update task. Please try again." };
  }
}

export async function deleteTaskAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    await dal.deleteTask(id);
    revalidatePath("/crm/tasks");
    revalidatePath("/crm/projects");
    return { success: true };
  } catch (error) {
    console.error("[deleteTaskAction]", error);
    return { success: false, error: "Failed to delete task. Please try again." };
  }
}
