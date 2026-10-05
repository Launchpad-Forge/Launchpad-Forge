/**
 * Zod validation schemas for Company entities.
 */

import { z } from "zod";

export const CompanyCreateSchema = z.object({
  name: z.string().min(1, "Company name is required").max(200),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  industry: z.string().max(100).optional().or(z.literal("")),
  companySize: z.string().optional().or(z.literal("")),
  location: z.string().max(200).optional().or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  source: z.string().optional().or(z.literal("")),
  status: z.enum(["Prospect", "Active Client", "Former Client"]).default("Prospect"),
  notes: z.string().optional().or(z.literal("")),
});

export const CompanyUpdateSchema = CompanyCreateSchema.partial();

export type CompanyCreateInput = z.infer<typeof CompanyCreateSchema>;
export type CompanyUpdateInput = z.infer<typeof CompanyUpdateSchema>;
