/**
 * Server Actions — Opportunities
 *
 * Includes standard CRUD plus a specialized `moveStageAction`
 * for Kanban drag-and-drop stage changes.
 */

"use server";

import { requireCrmUser } from "@/lib/crm-auth";
import { revalidatePath } from "next/cache";
import { OpportunityCreateSchema, OpportunityUpdateSchema } from "@/lib/validations";
import * as dal from "@/lib/dal";
import "@/services/workflows";
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

export async function createOpportunityAction(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = OpportunityCreateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.createOpportunity>[0];
    const op = await dal.createOpportunity(data);

    await eventBus.emit("opportunity.created", { opportunityId: op.id, title: op.title });
    if (op.stage === "Won") await eventBus.emit("opportunity.won", { opportunityId: op.id });

    revalidatePath("/crm/opportunities");
    revalidatePath("/crm/deals");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[createOpportunityAction]", error);
    return { success: false, error: "Failed to create opportunity. Please try again." };
  }
}

export async function updateOpportunityAction(id: string, formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = OpportunityUpdateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.updateOpportunity>[1];

    const oldOp = await dal.getOpportunity(id);
    const updatedOp = await dal.updateOpportunity(id, data);

    if (oldOp && updatedOp && oldOp.stage !== updatedOp.stage) {
      await eventBus.emit("opportunity.stage_changed", { opportunityId: id, newStage: updatedOp.stage });
      if (updatedOp.stage === "Won") {
        await eventBus.emit("opportunity.won", { opportunityId: id });
      } else if (updatedOp.stage === "Lost") {
        await eventBus.emit("opportunity.lost", { opportunityId: id });
      }
    }

    revalidatePath("/crm/opportunities");
    revalidatePath("/crm/deals");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[updateOpportunityAction]", error);
    return { success: false, error: "Failed to update opportunity. Please try again." };
  }
}

export async function deleteOpportunityAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    await dal.deleteOpportunity(id);
    revalidatePath("/crm/opportunities");
    revalidatePath("/crm/deals");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[deleteOpportunityAction]", error);
    return { success: false, error: "Failed to delete opportunity. Please try again." };
  }
}

/**
 * Kanban drag-and-drop: move an opportunity to a new pipeline stage.
 * This follows the NocoBase `move` API pattern — only the stage field is updated.
 */
export async function moveStageAction(id: string, newStage: string): Promise<ActionResult> {
  const validStages = ["New", "Qualified", "Discovery", "Proposal", "Negotiation", "Won", "Lost"];
  if (!validStages.includes(newStage)) {
    return { success: false, error: `Invalid stage: ${newStage}` };
  }

  try {
    await requireCrmUser();
    await dal.moveOpportunityStage(id, newStage);

    await eventBus.emit("opportunity.stage_changed", { opportunityId: id, newStage });
    if (newStage === "Won") {
      await eventBus.emit("opportunity.won", { opportunityId: id });
    } else if (newStage === "Lost") {
      await eventBus.emit("opportunity.lost", { opportunityId: id });
    }

    revalidatePath("/crm/opportunities");
    revalidatePath("/crm/deals");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[moveStageAction]", error);
    return { success: false, error: "Failed to update stage. Please try again." };
  }
}
