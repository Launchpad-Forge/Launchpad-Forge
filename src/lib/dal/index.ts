/**
 * Data Access Layer — Centralized exports
 *
 * Import everything from `@/lib/dal` instead of individual files.
 */

// Core CRM entities
export * from "./leads";
export * from "./contacts";
export * from "./companies";
export * from "./opportunities";

// Timeline & Follow-ups
export * from "./activities";
export * from "./follow-ups";

// Secondary entities (Clients, Projects, Tasks, Invoices, Proposals, Payments)
export * from "./entities";

// Global search
export * from "./search";
