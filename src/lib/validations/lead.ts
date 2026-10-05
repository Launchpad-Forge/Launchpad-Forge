/**
 * Zod validation schemas for Lead entities.
 * Used by both Server Actions (server-side) and forms (client-side).
 */

import { z } from "zod";

export const LeadCreateSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  companyName: z.string().max(200).optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  source: z.string().optional().or(z.literal("")),
  industry: z.string().optional().or(z.literal("")),
  serviceInterestedIn: z.string().optional().or(z.literal("")),
  estimatedBudget: z.coerce.number().nonnegative().optional().or(z.literal("")),
  priority: z.enum(["High", "Normal", "Low"]).default("Normal"),
  status: z.enum(["New", "Contacted", "Qualified", "Unqualified", "Converted", "Lost"]).default("New"),
  pipelineStage: z.string().optional().or(z.literal("")),
  leadScore: z.coerce.number().int().min(0).max(100).optional(),
  nextFollowUp: z.coerce.date().optional(),
  notes: z.string().optional().or(z.literal("")),
  assignedUserId: z.string().uuid().optional().or(z.literal("")),
  companyId: z.string().uuid().optional().or(z.literal("")),
});

export const LeadUpdateSchema = LeadCreateSchema.partial();

export type LeadCreateInput = z.infer<typeof LeadCreateSchema>;
export type LeadUpdateInput = z.infer<typeof LeadUpdateSchema>;
