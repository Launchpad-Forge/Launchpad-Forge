/**
 * Zod validation schemas for Client, Project, Task, Invoice, Proposal, and Payment entities.
 */

import { z } from "zod";

// ============================================
// CLIENT
// ============================================

export const ClientCreateSchema = z.object({
  companyId: z.string().uuid("Company is required"),
  status: z.enum(["Active", "Churned", "On Hold"]).default("Active"),
  notes: z.string().optional().or(z.literal("")),
});

export const ClientUpdateSchema = ClientCreateSchema.partial();

// ============================================
// PROJECT
// ============================================

export const ProjectCreateSchema = z.object({
  name: z.string().min(1, "Project name is required").max(200),
  clientId: z.string().uuid().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  startDate: z.coerce.date().optional(),
  expectedCompletion: z.coerce.date().optional(),
  status: z.enum(["Planning", "Active", "On Hold", "Completed", "Cancelled"]).default("Planning"),
  budget: z.coerce.number().nonnegative().optional(),
  priority: z.enum(["High", "Normal", "Low"]).default("Normal"),
});

export const ProjectUpdateSchema = ProjectCreateSchema.partial();

// ============================================
// TASK
// ============================================

export const TaskCreateSchema = z.object({
  projectId: z.string().uuid("Project is required"),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional().or(z.literal("")),
  status: z.enum(["Todo", "In Progress", "Done", "Blocked"]).default("Todo"),
  priority: z.enum(["High", "Normal", "Low"]).default("Normal"),
  dueDate: z.coerce.date().optional(),
});

export const TaskUpdateSchema = TaskCreateSchema.partial();

// ============================================
// PROPOSAL
// ============================================

export const ProposalCreateSchema = z.object({
  proposalNumber: z.string().min(1, "Proposal number is required"),
  clientId: z.string().uuid().optional().or(z.literal("")),
  companyId: z.string().uuid().optional().or(z.literal("")),
  opportunityId: z.string().uuid().optional().or(z.literal("")),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional().or(z.literal("")),
  validUntil: z.coerce.date().optional(),
  status: z.enum(["Draft", "Sent", "Viewed", "Accepted", "Rejected", "Expired"]).default("Draft"),
  subtotal: z.coerce.number().nonnegative().default(0),
  discount: z.coerce.number().nonnegative().default(0),
  tax: z.coerce.number().nonnegative().default(0),
  total: z.coerce.number().nonnegative().default(0),
});

export const ProposalUpdateSchema = ProposalCreateSchema.partial();

// ============================================
// INVOICE
// ============================================

export const InvoiceCreateSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  clientId: z.string().uuid().optional().or(z.literal("")),
  projectId: z.string().uuid().optional().or(z.literal("")),
  issueDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  status: z.enum(["Draft", "Sent", "Partially Paid", "Paid", "Overdue", "Cancelled"]).default("Draft"),
  subtotal: z.coerce.number().nonnegative().default(0),
  tax: z.coerce.number().nonnegative().default(0),
  discount: z.coerce.number().nonnegative().default(0),
  total: z.coerce.number().nonnegative().default(0),
});

export const InvoiceUpdateSchema = InvoiceCreateSchema.partial();

// ============================================
// PAYMENT
// ============================================

export const PaymentCreateSchema = z.object({
  invoiceId: z.string().uuid("Invoice is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  date: z.coerce.date().default(() => new Date()),
  method: z.string().optional().or(z.literal("")),
  reference: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type ClientCreateInput = z.infer<typeof ClientCreateSchema>;
export type ProjectCreateInput = z.infer<typeof ProjectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof ProjectUpdateSchema>;
export type TaskCreateInput = z.infer<typeof TaskCreateSchema>;
export type TaskUpdateInput = z.infer<typeof TaskUpdateSchema>;
export type ProposalCreateInput = z.infer<typeof ProposalCreateSchema>;
export type InvoiceCreateInput = z.infer<typeof InvoiceCreateSchema>;
export type PaymentCreateInput = z.infer<typeof PaymentCreateSchema>;
