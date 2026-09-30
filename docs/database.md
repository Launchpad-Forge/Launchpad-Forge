# Database Schema Proposal

We will use a relational PostgreSQL schema. All primary keys will be UUIDs. All tables will include `id`, `created_at`, `updated_at`. Soft deletes (`deleted_at`) will be supported where appropriate.

## Core Entities

### Users
- `id` (UUID), `name`, `email`, `password_hash`, `role`, timestamps.
*(Note: initially for the single admin, expandable later)*

### Companies
- `id` (UUID), `name`, `website`, `industry`, `company_size`, `location`, `email`, `phone`, `source`, `status`, `notes`, timestamps.

### Contacts
- `id` (UUID), `company_id` (FK), `name`, `job_title`, `email`, `phone`, `linkedin`, `whatsapp`, `location`, `notes`, timestamps.

### Leads
- `id` (UUID), `name`, `company_name`, `email`, `phone`, `website`, `source`, `industry`, `service_interested_in`, `estimated_budget`, `priority`, `status`, `pipeline_stage`, `lead_score`, `next_follow_up`, `assigned_user_id` (FK), `notes`, timestamps.

### Opportunities (Deals)
- `id` (UUID), `company_id` (FK), `primary_contact_id` (FK), `title`, `estimated_value`, `probability`, `expected_close_date`, `stage`, `service`, `source`, `priority`, `next_follow_up`, `notes`, timestamps.

### Activities (Timeline)
- `id` (UUID), `type` (Call, Email, WhatsApp, Meeting, Follow-up, Note, Proposal sent, etc.), `title`, `description`, `date`, `status`, `contact_id` (FK), `company_id` (FK), `opportunity_id` (FK), `project_id` (FK), `lead_id` (FK), timestamps.

### Follow-ups
- `id` (UUID), `title`, `due_date`, `priority`, `status` (Pending, Completed, Skipped, Rescheduled), `notes`, `lead_id` (FK), `contact_id` (FK), `company_id` (FK), `opportunity_id` (FK), timestamps.

### Notes
- `id` (UUID), `content` (Markdown), `author_id` (FK), related entity FKs (Lead, Contact, Company, Opportunity, Client, Project), timestamps.

### Proposals & Proposal Items
- **Proposals**: `id`, `proposal_number`, `client_id` (FK), `company_id` (FK), `title`, `description`, `valid_until`, `status`, `subtotal`, `discount`, `tax`, `total`, timestamps.
- **Proposal Items**: `id`, `proposal_id` (FK), `service`, `description`, `quantity`, `unit_price`, `discount`, `total`, timestamps.

### Clients
- `id` (UUID), `company_id` (FK), `status`, `notes`, timestamps. *(Opportunity converts to Client)*

### Projects & Tasks
- **Projects**: `id`, `client_id` (FK), `name`, `description`, `start_date`, `expected_completion`, `status`, `budget`, `priority`, timestamps.
- **Tasks**: `id`, `project_id` (FK), `title`, `description`, `status`, `priority`, `due_date`, timestamps.

### Invoices, Items & Payments
- **Invoices**: `id`, `invoice_number`, `client_id` (FK), `project_id` (FK), `issue_date`, `due_date`, `status`, `subtotal`, `tax`, `discount`, `total`, timestamps.
- **Invoice Items**: `id`, `invoice_id` (FK), `description`, `quantity`, `unit_price`, `total`, timestamps.
- **Payments**: `id`, `invoice_id` (FK), `amount`, `date`, `method`, `reference`, `notes`, timestamps.

### Tags & Relations
- **Tags**: `id`, `name`, `color`, timestamps.
- **Entity_Tags**: Many-to-many relationship tables mapping tags to Leads, Contacts, Companies, etc.

### Attachments
- `id`, `file_name`, `file_url`, `provider` (Local, S3, etc.), `size`, `mime_type`, related entity FKs, timestamps.
