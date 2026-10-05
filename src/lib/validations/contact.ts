/**
 * Zod validation schemas for Contact entities.
 */

import { z } from "zod";

export const ContactCreateSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  jobTitle: z.string().max(100).optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  whatsapp: z.string().max(30).optional().or(z.literal("")),
  location: z.string().max(200).optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  companyId: z.string().uuid().optional().or(z.literal("")),
});

export const ContactUpdateSchema = ContactCreateSchema.partial();

export type ContactCreateInput = z.infer<typeof ContactCreateSchema>;
export type ContactUpdateInput = z.infer<typeof ContactUpdateSchema>;
