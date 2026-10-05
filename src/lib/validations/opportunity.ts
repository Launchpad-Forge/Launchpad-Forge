/**
 * Zod validation schemas for Opportunity entities.
 */

import { z } from "zod";

export const OpportunityCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  companyId: z.string().uuid().optional().or(z.literal("")),
  primaryContactId: z.string().uuid().optional().or(z.literal("")),
  estimatedValue: z.coerce.number().nonnegative().optional(),
  probability: z.coerce.number().int().min(0).max(100).optional(),
  expectedCloseDate: z.coerce.date().optional(),
  stage: z.enum(["New", "Qualified", "Discovery", "Proposal", "Negotiation", "Won", "Lost"]).default("New"),
  service: z.string().optional().or(z.literal("")),
  source: z.string().optional().or(z.literal("")),
  priority: z.enum(["High", "Normal", "Low"]).default("Normal"),
  nextFollowUp: z.coerce.date().optional(),
  lossReason: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

export const OpportunityUpdateSchema = OpportunityCreateSchema.partial();

export type OpportunityCreateInput = z.infer<typeof OpportunityCreateSchema>;
export type OpportunityUpdateInput = z.infer<typeof OpportunityUpdateSchema>;
