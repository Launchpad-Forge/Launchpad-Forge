/**
 * Centralized validation schema exports.
 */

export { LeadCreateSchema, LeadUpdateSchema, type LeadCreateInput, type LeadUpdateInput } from "./lead";
export { ContactCreateSchema, ContactUpdateSchema, type ContactCreateInput, type ContactUpdateInput } from "./contact";
export { CompanyCreateSchema, CompanyUpdateSchema, type CompanyCreateInput, type CompanyUpdateInput } from "./company";
export { OpportunityCreateSchema, OpportunityUpdateSchema, type OpportunityCreateInput, type OpportunityUpdateInput } from "./opportunity";
export { ActivityCreateSchema, type ActivityCreateInput } from "./activity";
export { FollowUpCreateSchema, FollowUpUpdateSchema, type FollowUpCreateInput, type FollowUpUpdateInput } from "./follow-up";
export {
  ClientCreateSchema, ClientUpdateSchema,
  ProjectCreateSchema, ProjectUpdateSchema,
  TaskCreateSchema, TaskUpdateSchema,
  ProposalCreateSchema, ProposalUpdateSchema,
  InvoiceCreateSchema, InvoiceUpdateSchema,
  PaymentCreateSchema,
  type ClientCreateInput,
  type ProjectCreateInput, type ProjectUpdateInput,
  type TaskCreateInput, type TaskUpdateInput,
  type ProposalCreateInput,
  type InvoiceCreateInput,
  type PaymentCreateInput,
} from "./entities";
