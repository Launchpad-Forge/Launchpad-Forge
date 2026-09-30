# Launchpad Forge Personal CRM - Architecture

## Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui, Lucide Icons.
- **Backend**: Next.js Server Actions / API Routes.
- **Database**: PostgreSQL with Prisma (or Drizzle) ORM.
- **Animations/UI**: GSAP, Framer Motion, Lenis, Three.js (for high-end agency frontend, if integrated).

## Core Application Structure
The application follows a modular, API-first architecture, separating UI components from business logic and database access.

### Modular Boundaries
- **UI Layer**: React Server Components (by default) and Client Components (for interactivity).
- **Service Layer**: Handles business logic, abstractions for AI, and Storage.
- **Data Access Layer**: ORM interactions, keeping queries isolated from UI.

### Key Abstractions
- `StorageProvider`: Abstraction layer allowing seamless switching between Local, Supabase Storage, S3, etc.
- `AIProvider`: Abstraction layer supporting OpenRouter, Gemini, Groq, local models. Avoids tight coupling to any specific AI vendor.

### Folder Structure
```text
src/
├── app/                  # Next.js App Router (Layouts, Pages, API endpoints)
│   ├── (crm)/            # CRM Routes (Leads, Contacts, Companies, Deals)
│   ├── api/              # API endpoints for automation/external access
│   └── globals.css       # Global styles and design system variables
├── components/           # Reusable UI components
│   ├── layout/           # Sidebar, Navbar, Page wrappers
│   ├── ui/               # Atomic shadcn/ui and custom UI elements
│   └── modules/          # Feature-specific components (e.g., Kanban board)
├── lib/                  # Utilities, Constants, and Database/ORM configuration
│   ├── constants.ts      # Core configuration (Services, Stages, Tags)
│   ├── db.ts             # ORM instantiation
│   └── utils.ts          # Helper functions (cn for Tailwind, formatting, etc.)
├── services/             # Business logic and external integrations
│   ├── ai.ts             # AIProvider abstractions
│   ├── storage.ts        # StorageProvider abstractions
│   └── automations.ts    # Event triggers (lead.created, etc.)
└── types/                # Shared TypeScript definitions
```
