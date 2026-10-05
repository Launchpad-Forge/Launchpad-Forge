/**
 * Server Actions — Leads
 *
 * These are invoked from Client Components via form submissions
 * or programmatic calls. They validate, mutate, and revalidate.
 */

"use server";

import { crmTransaction } from "@/lib/db";
import { z } from "zod";
import { requireCrmUser } from "@/lib/crm-auth";
import { revalidatePath } from "next/cache";
import { LeadCreateSchema, LeadUpdateSchema } from "@/lib/validations";
import * as dal from "@/lib/dal";
import "@/services/workflows";
import { eventBus } from "@/services/automations";

export type ActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

/** Clean empty strings to undefined so Prisma doesn't insert blanks */
function cleanData(data: Record<string, unknown>) {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    cleaned[key] = value === "" ? undefined : value;
  }
  return cleaned;
}

export async function createLeadAction(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = LeadCreateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.createLead>[0];
    const newLead = await dal.createLead(data);

    await eventBus.emit("lead.created", { leadId: newLead.id, name: newLead.name });

    revalidatePath("/crm/leads");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[createLeadAction]", error);
    return { success: false, error: "Failed to create lead. Please try again." };
  }
}

export async function updateLeadAction(id: string, formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = LeadUpdateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await requireCrmUser();
    const data = cleanData(parsed.data) as Parameters<typeof dal.updateLead>[1];

    // Check old status to see if it just changed
    const oldLead = await dal.getLead(id);
    const updatedLead = await dal.updateLead(id, data);

    await eventBus.emit("lead.updated", { leadId: id });

    if (oldLead && updatedLead && oldLead.status !== "Qualified" && updatedLead.status === "Qualified") {
      await eventBus.emit("lead.qualified", { leadId: id, name: updatedLead.name });
    }

    revalidatePath("/crm/leads");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[updateLeadAction]", error);
    return { success: false, error: "Failed to update lead. Please try again." };
  }
}

export async function deleteLeadAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    await dal.deleteLead(id);
    revalidatePath("/crm/leads");
    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("[deleteLeadAction]", error);
    return { success: false, error: "Failed to delete lead. Please try again." };
  }
}

export async function convertLeadAction(id: string): Promise<ActionResult> {
  try {
    await requireCrmUser();
    z.string().uuid().parse(id);
    await crmTransaction(async tx => {
      const lead = await tx.orm.public.Lead.where({ id }).first();
      if (!lead) throw new Error("Lead not found.");
      await tx.orm.public.Lead.where({ id }).update({ id: lead.id });
      const current = await tx.orm.public.Lead.where({ id }).first();
      if (current?.status === "Converted") return;
      let companyId = lead.companyId;
      if (!companyId && lead.companyName) {
        const existing = await tx.orm.public.Company.where({ name: lead.companyName }).first();
        const company = existing ?? await tx.orm.public.Company.create({ name: lead.companyName, status: "Prospect", website: lead.website, industry: lead.industry });
        companyId = company.id;
      }
      const existingContact = lead.email ? await tx.orm.public.Contact.where({ email: lead.email }).first() : null;
      const contact = existingContact ?? await tx.orm.public.Contact.create({ name: lead.name, email: lead.email, phone: lead.phone, companyId });
      await tx.orm.public.Opportunity.create({ title: `${lead.companyName ?? lead.name} opportunity`, companyId, primaryContactId: contact.id, estimatedValue: lead.estimatedBudget, service: lead.serviceInterestedIn, stage: "Qualified", priority: lead.priority });
      await tx.orm.public.Lead.where({ id }).update({ status: "Converted", companyId });
      await tx.orm.public.Activity.create({ type: "NOTE", status: "Completed", title: `Lead converted: ${lead.name}`, leadId: id, contactId: contact.id, companyId });
    });
    revalidatePath("/crm", "layout");
    return { success: true };
  } catch (error) { return { success: false, error: error instanceof Error ? error.message : "Unable to convert lead." }; }
}
