import { eventBus } from "../automations";
import { handleLeadConverted } from "./on-lead-converted";
import { handleOpportunityWon } from "./on-opportunity-won";

/**
 * Register all business workflows to the event bus.
 * This should be called once when the application starts (or lazily initialized).
 */
let registered = false;
export function registerWorkflows() {
  if (registered) return;
  registered = true;
  console.log("[Workflows] Registering internal business workflows...");

  eventBus.on("lead.converted", handleLeadConverted);
  eventBus.on("opportunity.won", handleOpportunityWon);

  // Future workflows
  // eventBus.on("invoice.sent", handleInvoiceSent);
  // eventBus.on("payment.received", handlePaymentReceived);
}

// Auto-register on import
registerWorkflows();
