import { prisma } from "@/lib/db";
import { createActivity } from "@/lib/dal/activities";

/**
 * When a Lead is converted:
 * - Make sure there is a Contact and Company.
 * - If not, we could auto-create them, but typically conversion implies these exist or are created during the action.
 * - We just log an activity and ensure the lead is marked as Won/Converted.
 */
export async function handleLeadConverted(payload: { leadId: string; contactId?: string; companyId?: string }) {
  const lead = await prisma.orm.public.Lead.where({ id: payload.leadId }).first();

  if (!lead) return;

  // Log activity
  await createActivity({
    type: "NOTE",
    status: "Completed",
    title: `Lead converted: ${lead.name}`,
    description: `Lead was successfully converted to a contact/opportunity.`,
    leadId: lead.id,
    contactId: payload.contactId,
    companyId: payload.companyId || lead.companyId || undefined,
    authorId: lead.assignedUserId ?? undefined
  });
}
