'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { invoiceTotal, paymentStatus, validatePayment } from '@/lib/crm-finance';
import { crmTransaction } from '@/lib/db';
import { requireCrmUser } from '@/lib/crm-auth';
import { ClientCreateSchema, InvoiceCreateSchema, ProposalCreateSchema, PaymentCreateSchema } from '@/lib/validations/entities';
import { CRM_RECORDS, type RecordKind } from '@/lib/crm-records';
export async function saveCrmRecord(kind: RecordKind, id: string | null, form: FormData) {
  try {
    await requireCrmUser();
    if (id) z.string().uuid().parse(id);
    if (!Object.hasOwn(CRM_RECORDS, kind)) throw new Error('Unknown record type.');
    const allowed = new Set(CRM_RECORDS[kind].fields.map(field => field.name));
    const entries = [...form].filter(([key]) => allowed.has(key));
    const raw = Object.fromEntries(entries.filter(([, value]) => value !== ''));
    const cleared = id ? Object.fromEntries(entries.filter(([key, value]) => value === '' && !CRM_RECORDS[kind].fields.find(field => field.name === key)?.required && !['subtotal', 'tax', 'discount', 'status'].includes(key)).map(([key]) => [key, null])) : {};
    await crmTransaction(async tx => {
      if (kind === 'clients') {
        const data = ClientCreateSchema.parse(raw);
        if (!await tx.orm.public.Company.where({ id: data.companyId }).first()) throw new Error('Company not found.');
        if (id) { if (!await tx.orm.public.Client.where({ id }).update({ ...data, ...cleared })) throw new Error('Client not found.'); } else await tx.orm.public.Client.create(data);
      } else if (kind === 'proposals') {
        const data = ProposalCreateSchema.parse(raw);
        data.total = invoiceTotal(data.subtotal, data.discount, data.tax);
        if (data.total < 0) throw new Error('Discount exceeds subtotal plus tax.');
        if (id) { if (!await tx.orm.public.Proposal.where({ id }).update({ ...data, ...cleared })) throw new Error('Proposal not found.'); } else await tx.orm.public.Proposal.create(data);
      } else if (kind === 'invoices') {
        const data = InvoiceCreateSchema.parse(raw);
        data.total = invoiceTotal(data.subtotal, data.discount, data.tax);
        if (data.total < 0) throw new Error('Discount exceeds subtotal plus tax.');
        if (id) { const existing = await tx.orm.public.Invoice.where({ id }).first(); if (!existing) throw new Error('Invoice not found.'); await tx.orm.public.Invoice.where({ id }).update({ id: existing.id }); }
        const payments = id ? await tx.orm.public.Payment.where({ invoiceId: id }).all() : [];
        const paid = payments.reduce((sum, p) => sum + p.amount, 0);
        if (paid > data.total) throw new Error('Total cannot be less than recorded payments.');
        if (paid > 0) data.status = paid >= data.total ? 'Paid' : 'Partially Paid';
        else if (['Paid', 'Partially Paid'].includes(data.status)) throw new Error('Record a payment to change payment status.');
        if (id) await tx.orm.public.Invoice.where({ id }).update({ ...data, ...cleared }); else await tx.orm.public.Invoice.create(data);
      } else if (kind === 'payments') {
        if (id) throw new Error('Delete and re-record a payment to correct it.');
        const data = PaymentCreateSchema.parse(raw);
        let invoice = await tx.orm.public.Invoice.where({ id: data.invoiceId }).first();
        if (!invoice || ['Draft', 'Cancelled'].includes(invoice.status)) throw new Error('Select an issued invoice.');
        await tx.orm.public.Invoice.where({ id: invoice.id }).update({ id: invoice.id });
        invoice = await tx.orm.public.Invoice.where({ id: data.invoiceId }).first();
        if (!invoice || ["Draft", "Cancelled"].includes(invoice.status)) throw new Error("Invoice is unavailable for payment.");
        if (Math.round(data.amount * 100) !== data.amount * 100 && Math.abs(Math.round(data.amount * 100) - data.amount * 100) > 0.000001) throw new Error('Use at most two decimal places.');
        const payments = await tx.orm.public.Payment.where({ invoiceId: invoice.id }).all();
        const paid = payments.reduce((sum, p) => sum + p.amount, 0);
        validatePayment(invoice.total, Math.round(paid * 100) / 100, data.amount);
        await tx.orm.public.Payment.create(data);
        await tx.orm.public.Invoice.where({ id: invoice.id }).update({ status: paymentStatus(invoice.total, Math.round((paid + data.amount) * 100) / 100) });
      } else throw new Error('Unknown record type.');
    });
    revalidatePath('/crm', 'layout');
    return { success: true };
  } catch (error) { return { success: false, error: error instanceof z.ZodError ? error.issues.map(i => i.message).join(' ') : error instanceof Error ? error.message : 'Unable to save record.' }; }
}
export async function deleteCrmRecord(kind: RecordKind, id: string) {
  try {
    await requireCrmUser();
    z.string().uuid().parse(id);
    await crmTransaction(async tx => {
      if (kind === 'payments') {
        const payment = await tx.orm.public.Payment.where({ id }).first();
        if (!payment) throw new Error('Payment not found.');
        const invoice = await tx.orm.public.Invoice.where({ id: payment.invoiceId }).first();
        if (!invoice) throw new Error('Invoice not found.');
        await tx.orm.public.Invoice.where({ id: invoice.id }).update({ id: invoice.id });
        await tx.orm.public.Payment.where({ id }).delete();
        const remaining = await tx.orm.public.Payment.where({ invoiceId: invoice.id }).all();
        const paid = remaining.reduce((sum, p) => sum + p.amount, 0);
        await tx.orm.public.Invoice.where({ id: invoice.id }).update({ status: paymentStatus(invoice.total, Math.round(paid * 100) / 100) });
      } else if (kind === 'invoices') {
        if (await tx.orm.public.Payment.where({ invoiceId: id }).first()) throw new Error('Remove recorded payments before deleting this invoice.');
        await tx.orm.public.Invoice.where({ id }).delete();
      } else if (kind === 'proposals') await tx.orm.public.Proposal.where({ id }).delete();
      else if (kind === 'clients') await tx.orm.public.Client.where({ id }).delete();
      else throw new Error('Unknown record type.');
    });
    revalidatePath('/crm', 'layout');
    return { success: true };
  } catch (error) { return { success: false, error: error instanceof Error ? error.message : 'Unable to delete record.' }; }
}
