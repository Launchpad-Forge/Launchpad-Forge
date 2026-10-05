/**
 * Automation & Webhook Services
 *
 * Centralized registry for CRM events. Useful for internal business logic
 * and pinging n8n, Make, or Zapier when core entities change.
 */

export type CRMEvent =
  | 'lead.created'
  | 'lead.updated'
  | 'lead.converted'
  | 'lead.qualified'
  | 'opportunity.created'
  | 'opportunity.stage_changed'
  | 'opportunity.won'
  | 'opportunity.lost'
  | 'invoice.created'
  | 'invoice.sent'
  | 'payment.received'
  | 'followup.due'
  | 'followup.completed'
  | 'proposal.accepted';

type EventListener = (payload: any) => Promise<void>;

class EventBus {
  private listeners: Map<CRMEvent, EventListener[]> = new Map();
  private webhookUrl: string | undefined;

  constructor() {
    this.webhookUrl = process.env.N8N_WEBHOOK_URL;
  }

  /** Register an internal listener for an event */
  on(event: CRMEvent, listener: EventListener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  /** Emit an event, triggering all registered internal listeners and the external webhook */
  async emit(event: CRMEvent, payload: any) {
    console.log(`[EventBus] Emitting ${event}`);

    // Trigger internal listeners
    const handlers = this.listeners.get(event) || [];
    for (const handler of handlers) {
      try {
        // Run handlers asynchronously without blocking the main thread
        await handler(payload).catch(err => {
          console.error(`[EventBus] Handler for ${event} failed:`, err);
        });
      } catch (err) {
        console.error(`[EventBus] Failed to execute handler for ${event}`, err);
      }
    }

    // Trigger external webhook if configured
    if (this.webhookUrl) {
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Event-Type': event
        },
        body: JSON.stringify(payload)
      }).then(response => {
        if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
        console.log(`[EventBus] Successfully dispatched ${event} to webhook.`);
      }).catch(error => {
        console.error(`[EventBus] Failed to dispatch ${event} to webhook`, error);
      });
    }
  }
}

export const eventBus = new EventBus();
