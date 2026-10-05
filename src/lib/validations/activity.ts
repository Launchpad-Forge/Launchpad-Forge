/**
 * Zod validation schemas for Activity entities.
 */

import { z } from "zod";

export const ActivityCreateSchema = z.object({
  type: z.enum(["NOTE", "CALL", "EMAIL", "MEETING", "FOLLOW_UP", "STAGE_CHANGE"]),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional().or(z.literal("")),
  date: z.coerce.date().default(() => new Date()),
  status: z.enum(["Completed", "Scheduled"]).default("Completed"),
  authorId: z.string().uuid().optional().or(z.literal("")),
  leadId: z.string().uuid().optional().or(z.literal("")),
  contactId: z.string().uuid().optional().or(z.literal("")),
  companyId: z.string().uuid().optional().or(z.literal("")),
  opportunityId: z.string().uuid().optional().or(z.literal("")),
  projectId: z.string().uuid().optional().or(z.literal("")),
});

export type ActivityCreateInput = z.infer<typeof ActivityCreateSchema>;
