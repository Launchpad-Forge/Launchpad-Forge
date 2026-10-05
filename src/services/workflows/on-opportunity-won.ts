import { crmTransaction } from "@/lib/db";
export async function handleOpportunityWon(payload: { opportunityId: string }) {
  await crmTransaction(async tx => {
    const op = await tx.orm.public.Opportunity.where({ id: payload.opportunityId }).first();
    if (!op || !op.companyId) return;
    await tx.orm.public.Company.where({ id: op.companyId }).update({ status: "Active Client" });
    const existing = await tx.orm.public.Client.where({ companyId: op.companyId }).first();
    if (!existing) await tx.orm.public.Client.create({ companyId: op.companyId, status: "Active" });
    const logged = await tx.orm.public.Activity.where({ opportunityId: op.id, type: "STAGE_CHANGE", title: `Opportunity won: ${op.title}` }).first();
    if (!logged) await tx.orm.public.Activity.create({ type: "STAGE_CHANGE", status: "Completed", title: `Opportunity won: ${op.title}`, companyId: op.companyId, opportunityId: op.id });
  });
}
