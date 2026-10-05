'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireCrmUser } from '@/lib/crm-auth';
import { prisma } from '@/lib/db';
export async function updateProfile(form: FormData) {
  try {
    const { supabase } = await requireCrmUser();
    const name = z.string().trim().min(1).max(120).parse(form.get('name'));
    const { error } = await supabase.auth.updateUser({ data: { name } });
    if (error) throw error;
    revalidatePath('/crm', 'layout');
    return { success: true };
  } catch (error) { return { success: false, error: error instanceof Error ? error.message : 'Unable to save profile.' }; }
}
export async function updatePassword(form: FormData) {
  try {
    const { supabase, user } = await requireCrmUser();
    const password = z.string().min(12).max(128).parse(form.get('password'));
    if (password !== form.get('confirmPassword')) throw new Error('Passwords do not match.');
    const current = z.string().min(1).parse(form.get('currentPassword'));
    const verified = await supabase.auth.signInWithPassword({ email: user.email!, password: current });
    if (verified.error) throw new Error('Current password is incorrect.');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return { success: true };
  } catch (error) { return { success: false, error: error instanceof Error ? error.message : 'Unable to update password.' }; }
}
export async function exportCrmData() {
  await requireCrmUser();
  const [companies, contacts, leads, opportunities, clients, projects, tasks, proposals, invoices, payments, activities, followUps, proposalItems, invoiceItems] = await Promise.all([
    prisma.orm.public.Company.all(), prisma.orm.public.Contact.all(), prisma.orm.public.Lead.all(), prisma.orm.public.Opportunity.all(), prisma.orm.public.Client.all(), prisma.orm.public.Project.all(), prisma.orm.public.Task.all(), prisma.orm.public.Proposal.all(), prisma.orm.public.Invoice.all(), prisma.orm.public.Payment.all(), prisma.orm.public.Activity.all(), prisma.orm.public.FollowUp.all(), prisma.orm.public.ProposalItem.all(), prisma.orm.public.InvoiceItem.all(),
  ]);
  return JSON.stringify({ exportedAt: new Date().toISOString(), companies, contacts, leads, opportunities, clients, projects, tasks, proposals, invoices, payments, activities, followUps, proposalItems, invoiceItems }, null, 2);
}
