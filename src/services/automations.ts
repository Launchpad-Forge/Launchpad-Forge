/**
 * Automation & Webhook Services
 * 
 * Centralized registry for CRM events. Useful for pinging n8n, Make, or Zapier
 * when core entities change (e.g. Lead created -> Add to mailing list).
 */

type CRMEvent = 
  | 'lead.created' 
  | 'lead.converted' 
  | 'proposal.accepted' 
  | 'invoice.paid';

export class AutomationService {
  private webhookUrl: string | undefined;

  constructor() {
    this.webhookUrl = process.env.N8N_WEBHOOK_URL;
  }

  async triggerEvent(event: CRMEvent, payload: any) {
    console.log(`[Automations] Triggered ${event}`, payload);

    if (!this.webhookUrl) {
      console.warn('[Automations] No webhook URL configured. Event ignored.');
      return;
    }

    try {
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Event-Type': event
        },
        body: JSON.stringify(payload)
      });
      console.log(`[Automations] Successfully dispatched ${event} to webhook.`);
    } catch (error) {
      console.error(`[Automations] Failed to dispatch ${event}`, error);
    }
  }
}

export const automations = new AutomationService();
