# Migration Strategy

The Launchpad Forge Personal CRM is designed as a temporary but robust, portable solution. When the business scales and requires advanced features (multi-user RBAC, advanced workflow builders, extensive marketing automation), we plan to migrate to an open-source CRM (e.g., NocoBase, Frappe CRM, EspoCRM).

## Principles for Easy Migration
1. **PostgreSQL as the Source of Truth**: No proprietary Vercel/Supabase specific extensions that lock the data structure in.
2. **Clear Entity Separation**: Strong relational mapping (Companies, Contacts, Opportunities) mirrors standard CRM architectures.
3. **API-First Design**: Easy export and integration with external systems.
4. **Abstracted Storage**: File uploads won't be tightly coupled to a single vendor.

## Data Mapping for Future Systems
When migrating, the internal tables map directly to standard CRM concepts:

- **leads** -> Leads / Prospects.
- **companies** -> Accounts / Organizations.
- **contacts** -> Contacts.
- **opportunities** -> Deals / Opportunities.
- **activities** -> Tasks / Events / Activity Timeline.
- **clients** -> Accounts (Status = Active Client).
- **projects** -> Project Management module / Delivery tracker.
- **invoices & payments** -> Billing / Accounting module.

## Export & Import Strategy
Before transitioning to a new platform:
- Data can be exported as CSV/JSON through built-in admin endpoints or direct PostgreSQL dumps.
- Automation events (`lead.created`, etc.) which hook into n8n can easily be redirected to the webhooks of the new system.
- Uploaded files in the `StorageProvider` can be bulk-downloaded or the bucket can simply be attached to the new platform.
