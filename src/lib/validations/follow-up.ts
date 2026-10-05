/**
 * Zod validation schemas for FollowUp entities.
 */

import { z } from "zod";

export const FollowUpCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  dueDate: z.coerce.date({ error: "Due date is required" }),
  priority: z.enum(["High", "Normal", "Low"]).default("Normal"),
  status: z.enum(["Pending", "Completed", "Skipped", "Rescheduled"]).default("Pending"),
  notes: z.string().optional().or(z.literal("")),
  leadId: z.string().uuid().optional().or(z.literal("")),
  contactId: z.string().uuid().optional().or(z.literal("")),
  companyId: z.string().uuid().optional().or(z.literal("")),
  opportunityId: z.string().uuid().optional().or(z.literal("")),
});

export const FollowUpUpdateSchema = FollowUpCreateSchema.partial();

export type FollowUpCreateInput = z.infer<typeof FollowUpCreateSchema>;
export type FollowUpUpdateInput = z.infer<typeof FollowUpUpdateSchema>;
