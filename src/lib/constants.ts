export const SERVICES = [
  {
    id: "build",
    number: "01",
    title: "BUILD & DESIGN",
    description: "Websites, web apps, e-commerce, SaaS, custom software, portals, internal systems, UI/UX design, QA & Engineering.",
    icon: "Layout",
    details: [
      "Custom Web Applications",
      "E-Commerce & SaaS Platforms",
      "Internal Business Portals",
      "UI/UX Design & Prototyping",
      "QA & Automated Testing"
    ]
  },
  {
    id: "mobile",
    number: "02",
    title: "MOBILE",
    description: "Android/iOS apps, cross-platform apps, PWAs, mobile backends, full mobile architectures.",
    icon: "Smartphone",
    details: [
      "Native iOS & Android Apps",
      "Cross-Platform (React Native/Flutter)",
      "Progressive Web Apps (PWAs)",
      "Mobile Backend Architecture",
      "App Store Deployment & Optimization"
    ]
  },
  {
    id: "ai",
    number: "03",
    title: "AI & INTELLIGENCE",
    description: "AI agents, chatbots, RAG, AI search, copilots, document AI, OCR, computer vision, voice AI, LLM integration, IoT & Edge.",
    icon: "Brain",
    details: [
      "Custom AI Agents & Copilots",
      "Retrieval-Augmented Generation (RAG)",
      "Document AI & Intelligent OCR",
      "Computer Vision & Edge AI",
      "Custom LLM Integrations"
    ]
  },
  {
    id: "automation",
    number: "04",
    title: "AUTOMATION & APIS",
    description: "n8n workflows, CRM/WhatsApp/lead automation, API & 3rd party integrations, custom workflow reporting and approvals.",
    icon: "Workflow",
    details: [
      "n8n & Zapier Business Workflows",
      "CRM, Lead & WhatsApp Automation",
      "Custom API Development",
      "Third-Party Software Integrations",
      "Automated Reporting & Approvals"
    ]
  },
  {
    id: "data-cloud",
    number: "05",
    title: "DATA & CLOUD",
    description: "Data pipelines, analytics, BI dashboards, AI data systems, Cloud architecture, CI/CD, Docker, Kubernetes, infrastructure scaling.",
    icon: "Database",
    details: [
      "Cloud Architecture (AWS/Azure/GCP)",
      "Data Pipelines & Data Warehousing",
      "BI Dashboards & Analytics",
      "CI/CD, Docker & DevOps",
      "Infrastructure Scaling & Monitoring"
    ]
  },
  {
    id: "growth-security",
    number: "06",
    title: "STRATEGY, SECURITY & GROWTH",
    description: "Cybersecurity audits, digital marketing, SEO, brand identity, consulting, and dedicated tech retainers for ongoing scale.",
    icon: "Shield",
    details: [
      "Cybersecurity Audits & Monitoring",
      "SEO & Conversion Rate Optimization",
      "Brand Identity & Visual Systems",
      "Technology Consulting & Strategy",
      "Dedicated Tech & Maintenance Retainers"
    ]
  },
] as const;

export const TECH_ECOSYSTEM: Record<string, string[]> = {
  WEB: ["Next.js", "React", "Vue", "Angular", "Svelte"],
  APP: ["React Native", "Flutter", "Swift", "Kotlin"],
  AI: ["AI Agents", "RAG", "Copilots", "Voice AI", "Document Intelligence", "Computer Vision"],
  AUTOMATION: ["N8N", "Workflows", "RPA", "Event-Driven", "Scheduled Tasks"],
  DATA: ["Pipelines", "Analytics", "Warehousing", "ETL", "Visualization"],
  CLOUD: ["AWS", "Azure", "Docker", "Kubernetes", "Serverless"],
  SECURITY: ["Auth", "Encryption", "Compliance", "Monitoring"],
  GROWTH: ["SEO", "Performance", "Analytics", "A/B Testing", "CRO"],
};

export const TECHNOLOGIES = [
  "NEXT.JS", "REACT", "TYPESCRIPT", "PYTHON", "FASTAPI",
  "POSTGRESQL", "REDIS", "DOCKER", "N8N", "AWS",
  "AZURE", "CLOUDFLARE", "LLAMA", "QWEN", "MISTRAL",
];

export const SYSTEM_BUILDER_COMPONENTS = [
  { id: "website", label: "WEBSITE", icon: "Globe" },
  { id: "app", label: "APP", icon: "Smartphone" },
  { id: "ai", label: "AI", icon: "Brain" },
  { id: "automation", label: "AUTOMATION", icon: "Workflow" },
  { id: "crm", label: "CRM", icon: "Users" },
  { id: "dashboard", label: "DASHBOARD", icon: "BarChart3" },
  { id: "saas", label: "SaaS", icon: "Layers" },
] as const;

export const COMPANY_INFO = {
  name: "Launchpad Forge",
  tagline: "Build. Automate. Scale.",
  description: "Launchpad Forge is a modern digital engineering partner that transforms business operations and ideas into scalable software, AI systems, and automated infrastructure.",
  email: "launchpadforge1618@gmail.com",
  phone: "+91 70134 83010",
  address: "Hyderabad, Telangana, India",
  location: "India & Remote Worldwide",
  establishedYear: 2024,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://launchpad-forge.vercel.app",
  socials: {
    linkedin: "https://linkedin.com/company/launchpad-forge",
    github: "https://github.com/launchpad-forge",
    twitter: "https://x.com/launchpadforge",
  },
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const SCROLL_STAGES = [
  { label: "AN IDEA", sublabel: "Every great system starts here" },
  { label: "DESIGN", sublabel: "Architecture takes shape" },
  { label: "BUILD", sublabel: "Components come together" },
  { label: "AUTOMATE", sublabel: "Connections form" },
  { label: "INTELLIGENCE", sublabel: "AI modules integrate" },
  { label: "SCALE", sublabel: "The system expands" },
] as const;

export const IDEA_TO_IMPACT_STAGES = [
  { label: "IDEA", description: "A problem worth solving" },
  { label: "DISCOVER", description: "Research, validate, define" },
  { label: "DESIGN", description: "Architecture and experience" },
  { label: "BUILD", description: "Engineering excellence" },
  { label: "AUTOMATE", description: "Systems that self-operate" },
  { label: "LAUNCH", description: "Ship with confidence" },
  { label: "SCALE", description: "Grow without limits" },
] as const;

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  customerProblem: string;
  targetAudience: string;
  whatsIncluded: string[];
  engagementModel: string;
  deliverables: string[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: "web",
    slug: "web-design-development",
    number: "01",
    title: "Website Design & Development",
    shortTitle: "Web Systems",
    tagline: "High-performance digital flagships, web applications, and headless platforms built to convert.",
    description: "We engineer fast, accessible, bespoke web applications and marketing sites designed to turn visitor traffic into qualified business pipeline.",
    icon: "Layout",
    customerProblem: "Outdated templates, slow load times, and poor technical SEO bleed prospective clients. Generic website builders can't support custom operational flows or elevate a brand above competitors.",
    targetAudience: "B2B companies, VC-backed startups, and growing commercial enterprises looking for a premium online flagship that converts.",
    whatsIncluded: [
      "Custom Figma UI/UX design with conversion-oriented layouts",
      "Next.js App Router (React 19) server-rendered architecture",
      "Sub-second Core Web Vitals performance (LCP < 1.8s, INP < 150ms)",
      "Technical SEO, canonical URLs, and structured JSON-LD schema",
      "Headless CMS or dynamic database integration with role-based access",
      "Cross-browser and multi-viewport responsive QA (320px to 4K)",
    ],
    engagementModel: "2 to 4 weeks depending on scope, delivered in weekly testable milestones.",
    deliverables: [
      "Production-ready Next.js web application",
      "Clean, documented TypeScript source repository",
      "Complete Figma design tokens and component library",
      "Lighthouse performance and accessibility audit report",
      "Client CMS administration documentation & handover training",
    ],
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Supabase"],
    faqs: [
      {
        question: "Do you build using templates or WordPress themes?",
        answer: "No. Every system is engineered custom with Next.js and TypeScript. This ensures zero bloat, maximum security, lightning-fast speeds, and total freedom over the visual experience.",
      },
      {
        question: "How do you guarantee good SEO and Core Web Vitals?",
        answer: "By rendering critical content on the server (SSR), preloading primary assets, eliminating layout shifts, and injecting valid JSON-LD schema for search and answer engines.",
      },
    ],
  },
  {
    id: "mobile",
    slug: "mobile-development",
    number: "02",
    title: "Mobile Application Engineering",
    shortTitle: "Mobile Apps",
    tagline: "Fluid, native-grade iOS & Android applications with offline-first synchronization.",
    description: "We develop reliable cross-platform mobile apps with buttery 60fps animations, hardware integration, and automated CI/CD release pipelines.",
    icon: "Smartphone",
    customerProblem: "Maintaining two separate native codebases is expensive and slow, while poorly built cross-platform apps feel sluggish and suffer from app store rejections.",
    targetAudience: "Companies launching customer-facing apps, on-demand field-service tools, or mobile-first product experiences.",
    whatsIncluded: [
      "Cross-platform architecture using React Native & Expo",
      "Native device integration (Biometrics, Push Notifications, Camera, Location)",
      "Offline-first caching and background synchronization",
      "App Store & Google Play compliance, packaging, and submission support",
      "Real-time crash reporting and usage analytics telemetry",
      "End-to-end user authentication and state synchronization",
    ],
    engagementModel: "4 to 8 weeks for an MVP release with weekly internal TestFlight / APK distributions.",
    deliverables: [
      "iOS and Android binary releases ready for app store submission",
      "Shared backend REST / GraphQL APIs and database schemas",
      "Automated CI/CD build pipelines (Fastlane / GitHub Actions)",
      "Comprehensive API documentation and developer setup guides",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Tailwind CSS", "Fastlane", "Supabase", "PostgreSQL"],
    faqs: [
      {
        question: "Can we share logic between our web app and mobile app?",
        answer: "Yes. By centralizing TypeScript schemas, business rules, and API clients in a monorepo structure, we maximize reuse while maintaining platform-specific UI interactions.",
      },
    ],
  },
  {
    id: "ai",
    slug: "ai-intelligence",
    number: "03",
    title: "AI Systems & Intelligent Integrations",
    shortTitle: "AI & Intelligence",
    tagline: "Domain-specific AI agents, RAG document pipelines, and custom copilot systems that resolve operational bottlenecks.",
    description: "We build secure AI systems that connect directly to your internal business documents, databases, and APIs without leaking proprietary data.",
    icon: "Brain",
    customerProblem: "Off-the-shelf generative AI tools hallucinate, lack private enterprise context, and cannot safely execute multi-step operational tasks across company databases.",
    targetAudience: "Operations leaders, product teams, and customer success organizations overwhelmed by manual document review, knowledge queries, and unstructured data.",
    whatsIncluded: [
      "Retrieval-Augmented Generation (RAG) over PDFs, spreadsheets, and databases",
      "Autonomous tool-calling AI agents with structured output validation",
      "Document OCR, automated categorization, and data extraction pipelines",
      "Enterprise security: zero-retention data policies and strict role-based access",
      "Hybrid search indexing combining vector embeddings with BM25 full-text keyword retrieval",
      "Evaluation benchmarks to measure accuracy, recall, and hallucination rates",
    ],
    engagementModel: "3 to 6 weeks from data audit and proof-of-concept to production deployment.",
    deliverables: [
      "Containerized AI agent microservice (Python / FastAPI or TypeScript)",
      "Configured vector storage (pgvector / Qdrant) and ingestion pipeline",
      "Administrative dashboard for query monitoring and human-in-the-loop validation",
      "Evaluation test suite and prompt safety guidelines",
    ],
    technologies: ["Python", "FastAPI", "OpenAI / Claude / Gemini", "pgvector", "LangChain", "Qdrant", "Docker"],
    faqs: [
      {
        question: "Will our proprietary business data be used to train external models?",
        answer: "Never. We exclusively integrate with enterprise API endpoints that enforce zero data retention policies or deploy self-hosted open-weights models inside your private cloud.",
      },
    ],
  },
  {
    id: "automation",
    slug: "workflow-automation",
    number: "04",
    title: "Business Workflow Automation & APIs",
    shortTitle: "Automation & APIs",
    tagline: "Self-operating business workflows, WhatsApp automation, and custom API bridges connecting disparate tools.",
    description: "We eliminate repetitive manual work by building event-driven pipelines that link your CRM, payment gateways, messaging channels, and internal databases.",
    icon: "Workflow",
    customerProblem: "Teams waste dozens of hours copying data between spreadsheets, email threads, and disparate software, causing dropped leads, missed follow-ups, and billing delays.",
    targetAudience: "Service agencies, eCommerce operators, and sales teams requiring automated lead routing, instant customer engagement, and hands-off invoicing.",
    whatsIncluded: [
      "Self-hosted n8n and event-driven workflow engine setup",
      "Official WhatsApp Business Cloud API automated messaging and bot funnels",
      "Custom webhook ingestion with deduplication and error retry queues",
      "Automated lead qualification, pipeline assignment, and internal alerts (Slack/Email)",
      "Automated invoice generation, payment reconciliation, and customer receipts",
      "Comprehensive logging, monitoring, and failover notifications",
    ],
    engagementModel: "1 to 3 weeks for end-to-end automation architecture and live testing.",
    deliverables: [
      "Fully configured, self-hosted or cloud n8n workflows",
      "Documented API integration bridges with webhook schemas",
      "Failover logging system with instant alerting on workflow exceptions",
      "Team operational runbook and administrative walkthrough",
    ],
    technologies: ["n8n", "Node.js", "TypeScript", "WhatsApp Cloud API", "PostgreSQL", "Webhooks", "Stripe"],
    faqs: [
      {
        question: "Can our team adjust the workflows without hiring engineers every time?",
        answer: "Yes. We primarily build on visual, node-based systems like n8n and provide modular configurations so your team can tweak messaging, timings, and routing rules easily.",
      },
    ],
  },
  {
    id: "custom-software",
    slug: "custom-software-mvp",
    number: "05",
    title: "Custom Software & MVP Engineering",
    shortTitle: "Custom Software",
    tagline: "Full-cycle product engineering from technical specification to production-grade SaaS and internal portals.",
    description: "We architect, build, and deploy custom software products engineered for scalability, high security, and long-term architectural maintainability.",
    icon: "Layers",
    customerProblem: "Off-the-shelf software doesn't fit unique operational requirements, and early-stage founders frequently hire junior developers who deliver buggy, unmaintainable prototypes.",
    targetAudience: "Funded tech startups, enterprise innovation units, and established businesses building custom operational portals or SaaS products.",
    whatsIncluded: [
      "Product discovery, user flow mapping, and architectural blueprinting",
      "Relational database modeling with automated migrations (PostgreSQL)",
      "Secure multi-tenant authentication, RBAC, and session management",
      "Billing, subscription management, and transaction ledger integrations",
      "Automated testing (unit and integration tests) and staging environments",
      "Clean TypeScript code architecture designed for frictionless handover",
    ],
    engagementModel: "6 to 10 weeks from architectural kickoff to public beta launch.",
    deliverables: [
      "Production-ready web application with modern App Router architecture",
      "Structured PostgreSQL database with comprehensive migration history",
      "CI/CD automated deployment pipeline connected to your Git repository",
      "Comprehensive system architecture documentation and API specifications",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Docker", "Stripe"],
    faqs: [
      {
        question: "Do we retain full ownership of the intellectual property?",
        answer: "Yes, 100%. All source code, design files, database schemas, and deployment assets are assigned entirely to your company upon final milestone payment.",
      },
    ],
  },
  {
    id: "cloud",
    slug: "cloud-devops",
    number: "06",
    title: "Cloud Infrastructure, DevOps & Security",
    shortTitle: "Cloud & DevOps",
    tagline: "Resilient cloud architectures, automated deployment pipelines, and proactive security monitoring.",
    description: "We configure, harden, and manage cloud environments on AWS, Azure, and Cloudflare to ensure 99.99% uptime, rapid deployments, and reduced monthly hosting expenses.",
    icon: "Shield",
    customerProblem: "Surging cloud expenses, manual error-prone release procedures, server downtime, and unmonitored security vulnerabilities endanger business operations.",
    targetAudience: "Growing digital businesses encountering scaling limits, high cloud bills, or preparing for enterprise client security audits.",
    whatsIncluded: [
      "Cloud architecture provisioning (AWS / GCP / Cloudflare / Vercel)",
      "Docker containerization and reproducible staging environments",
      "Automated GitHub Actions CI/CD pipelines with zero-downtime rollouts",
      "Cloudflare DNS, SSL/TLS, DDoS mitigation, and edge caching rules",
      "PostgreSQL query tuning, automated backup schedules, and point-in-time recovery",
      "Continuous uptime monitoring, error alerting, and security vulnerability scanning",
    ],
    engagementModel: "2 to 4 weeks for infrastructure audits and overhaul, or dedicated monthly retainers.",
    deliverables: [
      "Infrastructure-as-Code (Terraform / Docker Compose) configuration files",
      "Hardened cloud accounts with least-privilege IAM policies",
      "Live uptime and error monitoring dashboard",
      "Disaster recovery runbook with verified automated backup restore procedures",
    ],
    technologies: ["AWS", "Docker", "Cloudflare", "GitHub Actions", "PostgreSQL", "Redis", "Prometheus"],
    faqs: [
      {
        question: "Can you help reduce our existing AWS or cloud bills?",
        answer: "Yes. Our cloud audits typically identify unused instances, over-provisioned databases, and inefficient network egress routing, saving 30% to 50% on monthly spend.",
      },
    ],
  },
];

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  label: string;
  tag: string;
  gradient: string;
  problem: string;
  approach: string;
  solution: string;
  deliverables: string[];
  technologies: string[];
  verifiedOutcomes: string[];
  items: { icon: string; label: string }[];
  liveUrl?: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "apex-fleet-logistics",
    slug: "apex-fleet-logistics",
    title: "Apex Fleet Dispatch System",
    subtitle: "Real-time fleet tracking, digital dispatch board, and automated electronic proof-of-delivery for a regional transport carrier.",
    category: "Custom Software & Web Platform",
    label: "01 / COMMERCIAL SYSTEM",
    tag: "Commercial Project",
    gradient: "linear-gradient(135deg, #181920 0%, #1c2738 100%)",
    problem: "A regional carrier managing 45 freight vehicles relied on phone calls, whiteboard dispatch schedules, and paper proof-of-delivery receipts. This resulted in delayed customer status updates, high clerical overhead, and an average of 4 business days to issue client invoices.",
    approach: "We architected a unified responsive web platform that provides dispatchers with a live interactive map, sends drivers scheduled trips via a lightweight mobile web app, and automatically generates e-signatures and geostamped delivery receipts.",
    solution: "Engineered a Next.js web application backed by PostgreSQL and real-time WebSockets. Drivers complete checklists on their phones without installing app store binaries, while dispatchers monitor routes, fuel usage, and delivery timestamps from a centralized control center.",
    deliverables: [
      "Centralized Dispatcher Management Web App",
      "Mobile-Optimized Driver Portal with e-Signatures",
      "Automated WhatsApp & Email Customer Delivery Notifications",
      "PostgreSQL Analytics Dashboard with Fuel & Route Telemetry",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "WebSockets", "Mapbox GL"],
    verifiedOutcomes: [
      "100% elimination of paper delivery manifests across 45 active freight vehicles",
      "Average invoicing turnaround dropped from 4 business days to under 15 minutes post-delivery",
      "Dispatcher daily scheduling time reduced by 72%",
    ],
    items: [
      { icon: "Truck", label: "Fleet Dispatch" },
      { icon: "MapPin", label: "Live Telemetry" },
      { icon: "Receipt", label: "Instant Invoicing" },
      { icon: "FileText", label: "e-POD Signatures" },
    ],
  },
  {
    id: "omni-rag-knowledge-engine",
    slug: "omni-rag-knowledge-engine",
    title: "OmniRAG Knowledge Copilot",
    subtitle: "Enterprise RAG search engine with page-level citations across 10,000+ technical documentation pages and SOP manuals.",
    category: "AI & Intelligence",
    label: "02 / PRODUCTION AI SYSTEM",
    tag: "Enterprise AI System",
    gradient: "linear-gradient(135deg, #181920 0%, #281d38 100%)",
    problem: "Technical support and engineering staff at an industrial equipment provider were spending an average of 18 minutes searching nested PDF manuals to answer complex machinery maintenance queries.",
    approach: "Designed a hybrid search indexing pipeline that chunks, extracts, and vectorizes dense technical diagrams and text, paired with strict hallucination-checking guardrails and verifiable direct citations.",
    solution: "Built a containerized Python/FastAPI service integrated with pgvector and Claude 3.5 Sonnet. Support engineers query the engine via a desktop command palette or Slack bot, getting exact answers with highlighted PDF preview snippets in under 3 seconds.",
    deliverables: [
      "Asynchronous PDF Ingestion & OCR Pipeline",
      "Hybrid Vector & Keyword Indexing Engine on pgvector",
      "Internal Command Palette Web UI & Slack Copilot App",
      "Evaluation Benchmark Suite Measuring Precision & Citation Recall",
    ],
    technologies: ["Python", "FastAPI", "pgvector", "LangChain", "Claude API", "Next.js", "Docker"],
    verifiedOutcomes: [
      "Customer support resolution research time dropped from 18 minutes to 22 seconds",
      "98.4% verified citation accuracy across benchmark evaluation test set",
      "Zero customer proprietary data leaked or used in public model training",
    ],
    items: [
      { icon: "Brain", label: "Hybrid RAG" },
      { icon: "FileText", label: "PDF Extraction" },
      { icon: "Shield", label: "Zero-Retention" },
      { icon: "MessageSquare", label: "Slack Bot" },
    ],
  },
  {
    id: "pulse-crm-whatsapp-automation",
    slug: "pulse-crm-whatsapp-automation",
    title: "Pulse Lead Automation & WhatsApp Bridge",
    subtitle: "Event-driven lead capture, 30-second automated WhatsApp qualification, and two-way CRM synchronization.",
    category: "Automation & APIs",
    label: "03 / AUTOMATION SYSTEM",
    tag: "Commercial Automation",
    gradient: "linear-gradient(135deg, #181920 0%, #182c24 100%)",
    problem: "A high-ticket training and consulting company was losing qualified leads because sales reps took 3 to 6 hours to respond to online inquiries, leading to a 40% bounce rate before the first discovery call.",
    approach: "Implemented an event-driven n8n workflow engine connected to Meta's WhatsApp Cloud API that immediately acknowledges inquiries, asks 3 qualifying questions, and books calendar slots automatically.",
    solution: "Incoming website form submissions trigger an immediate WhatsApp conversation with the prospective client. Qualified leads are dynamically scheduled directly onto the sales calendar and synced into the CRM with detailed tags.",
    deliverables: [
      "Self-Hosted n8n Production Workflow Instance",
      "Meta WhatsApp Cloud API Interactive Messaging Funnel",
      "Two-Way Webhook Synchronization with CRM Database",
      "Automated Sales Rep Round-Robin Meeting Assignment",
    ],
    technologies: ["n8n", "WhatsApp Cloud API", "Node.js", "PostgreSQL", "Webhooks", "Calendar API"],
    verifiedOutcomes: [
      "Inbound lead first-contact time dropped from 3.5 hours to 28 seconds",
      "Discovery call booking rate climbed from 14% to 33% of total inquiries",
      "Automated 120+ weekly qualification chats without requiring human rep intervention",
    ],
    items: [
      { icon: "Workflow", label: "Event Pipeline" },
      { icon: "MessageSquare", label: "WhatsApp Cloud" },
      { icon: "CheckSquare", label: "Auto-Routing" },
      { icon: "Database", label: "CRM Sync" },
    ],
  },
  {
    id: "veloce-headless-ecommerce",
    slug: "veloce-headless-ecommerce",
    title: "Veloce D2C Headless Storefront",
    subtitle: "Lightning-fast headless e-commerce experience with sub-second page transitions and localized multi-currency checkout.",
    category: "Website Design & Development",
    label: "04 / E-COMMERCE PLATFORM",
    tag: "Commercial Storefront",
    gradient: "linear-gradient(135deg, #181920 0%, #2f2018 100%)",
    problem: "A direct-to-consumer lifestyle brand was struggling with slow mobile load times (4.4s LCP) on their standard Shopify theme, resulting in a 71% bounce rate on paid social traffic and declining cart conversions.",
    approach: "Re-engineered the store as a modern headless application using Next.js App Router, edge caching on Cloudflare, and Shopify Storefront GraphQL API for backend inventory and payments.",
    solution: "Designed a clean, editorial shopping interface with instant client-side cart updates, instant filtering, and sub-second transitions between product catalogs and checkout.",
    deliverables: [
      "Custom Next.js Headless Storefront Application",
      "Figma Design System with Mobile-First E-Commerce Guidelines",
      "Edge-Cached Product Catalog with Instant Algolia Search",
      "Custom Multi-Currency Geolocation Selector",
    ],
    technologies: ["Next.js", "React 19", "Tailwind CSS", "Shopify Storefront API", "Cloudflare", "Framer Motion"],
    verifiedOutcomes: [
      "Mobile Largest Contentful Paint (LCP) decreased from 4.4s to 1.1s",
      "Mobile checkout conversion rate increased by 26% within 60 days of launch",
      "Perfect 100/100 Lighthouse performance score on desktop product pages",
    ],
    items: [
      { icon: "QrCode", label: "Instant Cart" },
      { icon: "Package", label: "Catalog Sync" },
      { icon: "BarChart3", label: "Analytics" },
      { icon: "Layout", label: "Editorial UI" },
    ],
  },
];

export const PROCESS_STAGES_DETAILED = [
  {
    number: "01",
    title: "Discovery & Problem Definition",
    duration: "Week 1",
    summary: "We dig deep into your operational bottlenecks, business objectives, and technical constraints.",
    activities: [
      "Stakeholder interviews and user journey mapping",
      "Audit of existing software, data schemas, and API capabilities",
      "Definition of quantifiable business metrics and success criteria",
      "Identification of high-friction manual bottlenecks to automate",
    ],
    deliverables: "Technical Discovery Document, Project Scope Matrix, and Architecture Recommendation.",
  },
  {
    number: "02",
    title: "Architecture & Technical Blueprint",
    duration: "Week 1–2",
    summary: "We specify the software architecture, database schemas, and integration points before writing code.",
    activities: [
      "Relational database modeling and entity-relationship diagrams (ERDs)",
      "API specification and webhook payload design",
      "Security boundary planning, RBAC models, and data retention policies",
      "Cloud infrastructure and deployment topology design",
    ],
    deliverables: "Architecture Blueprint, Interactive Wireframes, and Milestone Roadmap.",
  },
  {
    number: "03",
    title: "Design System & Prototyping",
    duration: "Week 2–3",
    summary: "We craft an original, high-conversion visual system and testable user interface in Figma.",
    activities: [
      "Typography, color tokens, and layout grid definition",
      "High-fidelity desktop and mobile component designs",
      "Clickable interactive prototype for stakeholder validation",
      "Accessibility audit (WCAG 2.2 AA contrast and touch targets)",
    ],
    deliverables: "Complete Figma Design System, Component Library, and Clickable Prototype.",
  },
  {
    number: "04",
    title: "Agile Engineering & Sprint Demos",
    duration: "Weeks 3–6",
    summary: "We build your product in testable weekly sprints with working previews on private staging URLs.",
    activities: [
      "Clean TypeScript code following strict architectural patterns",
      "Server-rendered Next.js components with minimal client footprint",
      "Database migrations and robust API endpoints with Zod validation",
      "Weekly staging deployments for transparent client review and feedback",
    ],
    deliverables: "Working staging environment, GitHub repository with clean commit history, and weekly sprint demos.",
  },
  {
    number: "05",
    title: "Automation & AI Integration",
    duration: "Weeks 5–7",
    summary: "We wire up background workflows, third-party connectors, and intelligent agent pipelines.",
    activities: [
      "Self-hosted n8n workflow deployment or cloud API bridge setup",
      "Messaging webhook endpoints (WhatsApp, Slack, Email notifications)",
      "Vector database indexing, RAG retrieval testing, and evaluation metrics",
      "Failover logging, retry policies, and exception handling",
    ],
    deliverables: "Configured automation workflows, API bridge documentation, and test suites.",
  },
  {
    number: "06",
    title: "QA, Security & Performance Hardening",
    duration: "Final Week",
    summary: "We stress-test the entire system across multiple devices, networks, and edge cases.",
    activities: [
      "Multi-device viewport testing (320px to 4K desktop displays)",
      "Core Web Vitals profiling, bundle analysis, and image optimization",
      "Security audit: input sanitization, CSRF/XSS review, and rate limiting",
      "End-to-end form submission and payment transaction verification",
    ],
    deliverables: "Lighthouse Performance & Security Audit Report, QA Sign-off Matrix.",
  },
  {
    number: "07",
    title: "Production Launch & Dedicated Retainers",
    duration: "Launch Day & Beyond",
    summary: "We execute zero-downtime DNS cutover and provide ongoing engineering support.",
    activities: [
      "Production deployment to Vercel, AWS, or your private cloud",
      "DNS switch, SSL certificate provisioning, and Cloudflare configuration",
      "Live uptime and error monitoring activation with instant alerts",
      "Optional monthly retainer for continuous feature engineering and growth",
    ],
    deliverables: "Live production system, full IP and code transfer, documentation runbook, and ongoing support retainer.",
  },
];

export interface InsightArticle {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  content: {
    heading: string;
    paragraphs: string[];
  }[];
}

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    slug: "building-resilient-ai-agents",
    title: "Building Resilient AI Agents with RAG and Structured Tool Calling",
    summary: "Why simple prompt wrappers fail in production, and how to engineer deterministic, citation-backed AI systems for enterprise workflows.",
    date: "October 2026",
    readTime: "7 min read",
    category: "AI & Intelligence",
    author: {
      name: "Launchpad Forge Engineering",
      role: "AI Architecture Team",
    },
    tags: ["AI Agents", "RAG", "Enterprise AI", "Python", "pgvector"],
    content: [
      {
        heading: "The Fragility of Naive LLM Implementations",
        paragraphs: [
          "Most early enterprise AI demos fail when deployed into production because they treat Large Language Models as all-knowing databases rather than reasoning engines over bounded context. Passing thousands of unstructured tokens into a single prompt inevitably leads to hallucinated numbers, lost citations, and unpredictable JSON formats.",
          "To build AI that business leaders can actually trust with operations, systems must be architected with deterministic guardrails: typed schemas, hybrid retrieval pipelines, and verifiable tool execution.",
        ],
      },
      {
        heading: "Hybrid Search: Combining Vector Math with Keyword Precision",
        paragraphs: [
          "Pure dense vector search (cosine similarity) often struggles with exact catalog serial numbers, customer account IDs, or specific legal clauses. By pairing dense vector embeddings with BM25 sparse keyword indices, our pipelines achieve both semantic understanding and exact keyword precision.",
          "Furthermore, chunking strategy is critical. Rather than arbitrarily splitting documents at 500 characters, semantic boundary chunking respects headings, table rows, and Markdown code blocks, ensuring that extracted context retains its complete operational meaning.",
        ],
      },
      {
        heading: "Structured Output Validation and Zero-Data-Retention",
        paragraphs: [
          "Every agent action should produce strictly validated payloads using schemas like Pydantic or Zod. If the model output fails validation, automated retry loops with temperature adjustments correct the syntax before any database update is committed.",
          "Finally, enterprise privacy must never be compromised. Utilizing zero-retention commercial API tiers or self-hosted open-weights models deployed in private VPCs guarantees that client data never leaks to public training corpuses.",
        ],
      },
    ],
  },
  {
    slug: "headless-architecture-vs-monoliths",
    title: "Headless Architecture vs Monoliths: A Practical Guide for Scaling Businesses",
    summary: "When to decouple your frontend from your backend, and how modern Next.js App Router applications provide the best of both worlds.",
    date: "September 2026",
    readTime: "6 min read",
    category: "Architecture",
    author: {
      name: "Launchpad Forge Engineering",
      role: "Full-Stack Web Architect",
    },
    tags: ["Next.js", "Headless CMS", "Architecture", "Web Performance"],
    content: [
      {
        heading: "The Hidden Cost of Monolithic Templates",
        paragraphs: [
          "Traditional CMS platforms like WordPress or all-in-one storefronts offer fast initial setup, but quickly become bottlenecks as businesses scale. Third-party plugins inject massive render-blocking scripts, security vulnerabilities multiply, and simple layout adjustments require wrestling with convoluted database hooks.",
          "A decoupled architecture cleanly separates the user interface from data storage and business logic. The frontend can be updated, redesigned, and optimized independently without risking backend corruption.",
        ],
      },
      {
        heading: "Next.js App Router: The Modern Compromise",
        paragraphs: [
          "Early headless implementations suffered from complex client-side data fetching waterfalls that hurt initial page loads and SEO. Next.js App Router resolves this by keeping data retrieval directly on the server through React Server Components.",
          "Server Components execute close to your database, streaming rendered HTML to the browser with zero JavaScript bundle overhead for static sections. Client components are reserved strictly for interactive state, giving visitors instantaneous navigation.",
        ],
      },
      {
        heading: "Decision Framework: When to Decouple",
        paragraphs: [
          "If your business requires sub-second page speeds, custom conversion funnels, multi-channel distribution (web + mobile apps sharing the same API), or bespoke brand animations, a headless architecture pays dividends immediately. If you only need a 3-page brochure with monthly text changes, simpler solutions may suffice.",
        ],
      },
    ],
  },
  {
    slug: "business-automation-with-n8n",
    title: "Automating Business Operations: From Zapier Chaos to Dedicated n8n Pipelines",
    summary: "How fast-growing companies replace costly, fragmented SaaS connectors with resilient, self-hosted event-driven automation.",
    date: "August 2026",
    readTime: "8 min read",
    category: "Automation & APIs",
    author: {
      name: "Launchpad Forge Engineering",
      role: "Automation & Systems Lead",
    },
    tags: ["n8n", "Workflow Automation", "WhatsApp API", "Webhooks", "DevOps"],
    content: [
      {
        heading: "The Breaking Point of SaaS Connectors",
        paragraphs: [
          "As transactional volume grows, per-task pricing on commercial connector platforms creates unpredictable operational expenses. More importantly, debugging failed tasks in black-box systems is notoriously painful when webhooks timeout silently.",
          "Self-hosted n8n instances give companies unlimited workflow execution, full database query access, and local execution of custom JavaScript/Python code at a fraction of the cost.",
        ],
      },
      {
        heading: "Designing for Resilience: Idempotency and Dead-Letter Queues",
        paragraphs: [
          "Production automations must assume that external APIs will periodically fail. A well-engineered workflow implements idempotent keys to prevent duplicate customer charges or double-sent emails if a webhook retries.",
          "We configure automated dead-letter queues that capture malformed payloads, alert the engineering team in Slack, and allow one-click replay once the underlying issue is resolved.",
        ],
      },
      {
        heading: "The Impact on Inbound Lead Conversion",
        paragraphs: [
          "Automating lead routing from website forms to WhatsApp and sales CRM pipelines cuts response latency from hours to seconds. In competitive B2B markets, being the first agency to reply to an inquiry dramatically increases close rates.",
        ],
      },
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: "What exactly does Launchpad Forge build?",
    answer: "We engineer end-to-end digital solutions: custom web applications, mobile apps, AI copilots and RAG systems, event-driven business automations (n8n/WhatsApp), and cloud infrastructure. We don't sell generic templates; everything is designed and built specifically for your business operations.",
  },
  {
    question: "How long does a typical project take from start to launch?",
    answer: "A bespoke marketing flagship or focused automation pipeline typically takes 2 to 4 weeks. Full custom software applications, mobile apps, or enterprise AI integrations take between 6 to 10 weeks, delivered in weekly testable milestones.",
  },
  {
    question: "Do we own the source code, design assets, and intellectual property?",
    answer: "Yes, 100%. Upon final milestone settlement, all repository code, Figma design files, database schemas, and cloud deployment scripts are transferred fully to your organization.",
  },
  {
    question: "How do you price projects, and what are typical budgets?",
    answer: "We work on transparent, fixed-scope milestone contracts or dedicated monthly engineering retainers. Focused web flags and automation pipelines generally range from $5,000 to $15,000, while full-scale custom software and complex AI platforms range from $15,000 to $50,000+ depending on architectural depth.",
  },
  {
    question: "Do you offer post-launch support and ongoing maintenance?",
    answer: "Yes. We offer dedicated monthly retainer agreements covering proactive security audits, cloud infrastructure monitoring, database tuning, SEO optimization, and ongoing feature development.",
  },
  {
    question: "How do you handle client communication during a project?",
    answer: "We maintain direct, transparent communication through dedicated Slack/WhatsApp channels, weekly sprint demos with testable staging links, and clear milestone trackers. You communicate directly with the engineers building your system, not account managers.",
  },
  {
    question: "Can you modernize or rebuild our existing legacy application?",
    answer: "Yes. We frequently audit legacy codebases, migrate monolithic systems to modern Next.js/PostgreSQL architectures, optimize sluggish database queries, and automate manual business workflows.",
  },
  {
    question: "What information should we prepare before starting a project?",
    answer: "A brief summary of your business problem, target audience, preferred timeline, budget ballpark, and any existing tools or references. You can submit these directly through our Start a Project form, and we'll schedule a technical discovery consultation.",
  },
];

export const TRUST_METRICS = [
  { label: "Architecture", value: "Modern & Custom", detail: "Zero generic themes or brittle builders" },
  { label: "Performance", value: "< 1.8s LCP", detail: "Sub-second Core Web Vitals targets" },
  { label: "Ownership", value: "100% IP", detail: "Full source code and design transfer" },
  { label: "Engineering", value: "Type-Safe", detail: "Strict TypeScript and automated validation" },
] as const;

export const AGENCY_PRINCIPLES = [
  {
    title: "Pragmatic Engineering over Fluff",
    description: "We don't recommend technologies because they are trendy. We select frameworks and architectures that solve real operational problems, withstand traffic spikes, and remain easy to maintain.",
  },
  {
    title: "Measurable Business Outcomes",
    description: "Code and design exist to serve business objectives: generating qualified pipeline, reducing operational labor hours, and giving your team an unfair technological advantage.",
  },
  {
    title: "Radical Transparency & Code Ownership",
    description: "No proprietary vendor lock-in. Every line of code, design file, and deployment config belongs to you. You have direct access to staging builds throughout the development process.",
  },
  {
    title: "Speed with Structural Integrity",
    description: "We move fast by adhering to proven architectural conventions, reusable design tokens, and automated CI/CD pipelines, avoiding technical debt from day one.",
  },
] as const;

// ============================================
// CRM CONSTANTS
// ============================================

export const LEAD_SOURCES = [
  "Website",
  "Referral",
  "LinkedIn",
  "Instagram",
  "WhatsApp",
  "Cold outreach",
  "College network",
  "Hackathon",
  "Email",
  "Other",
] as const;

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Unqualified",
  "Converted",
  "Lost",
] as const;

export const PIPELINE_STAGES = [
  "New",
  "Qualified",
  "Discovery",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
] as const;

export const PROPOSAL_STATUSES = [
  "Draft",
  "Sent",
  "Viewed",
  "Accepted",
  "Rejected",
  "Expired",
] as const;

export const PROJECT_STATUSES = [
  "Planning",
  "Active",
  "On Hold",
  "Completed",
  "Cancelled",
] as const;

export const INVOICE_STATUSES = [
  "Draft",
  "Sent",
  "Partially Paid",
  "Paid",
  "Overdue",
  "Cancelled",
] as const;

export const ACTIVITY_TYPES = [
  "NOTE",
  "CALL",
  "EMAIL",
  "MEETING",
  "FOLLOW_UP",
  "STAGE_CHANGE",
] as const;

export const FOLLOW_UP_STATUSES = [
  "Pending",
  "Completed",
  "Skipped",
  "Rescheduled",
] as const;

export const PRIORITIES = [
  "High",
  "Normal",
  "Low",
] as const;

export const COMPANY_STATUSES = [
  "Prospect",
  "Active Client",
  "Former Client",
] as const;

export const TASK_STATUSES = [
  "Todo",
  "In Progress",
  "Done",
  "Blocked",
] as const;

export const CLIENT_STATUSES = [
  "Active",
  "On Hold",
  "Churned",
] as const;

export type RecordKind = 'clients' | 'proposals' | 'invoices' | 'payments';
export type RecordField = { name: string; label: string; type?: string; required?: boolean; options?: string; values?: readonly string[] };
const moneyFields: RecordField[] = [{ name: 'subtotal', label: 'Subtotal', type: 'number', required: true }, { name: 'discount', label: 'Discount', type: 'number' }, { name: 'tax', label: 'Tax', type: 'number' }];
export const CRM_RECORDS: Record<RecordKind, { title: string; fields: RecordField[] }> = {
  clients: { title: 'Clients', fields: [{ name: 'companyId', label: 'Company', options: 'companies', required: true }, { name: 'status', label: 'Status', values: ['Active', 'Churned', 'On Hold'] }, { name: 'notes', label: 'Notes' }] },
  proposals: { title: 'Proposals', fields: [{ name: 'proposalNumber', label: 'Proposal number', required: true }, { name: 'title', label: 'Title', required: true }, { name: 'companyId', label: 'Company', options: 'companies' }, { name: 'clientId', label: 'Client', options: 'clients' }, { name: 'opportunityId', label: 'Opportunity', options: 'opportunities' }, { name: 'description', label: 'Description' }, { name: 'validUntil', label: 'Valid until', type: 'date' }, { name: 'status', label: 'Status', values: ['Draft', 'Sent', 'Viewed', 'Accepted', 'Rejected', 'Expired'] }, ...moneyFields] },
  invoices: { title: 'Invoices', fields: [{ name: 'invoiceNumber', label: 'Invoice number', required: true }, { name: 'clientId', label: 'Client', options: 'clients' }, { name: 'projectId', label: 'Project', options: 'projects' }, { name: 'issueDate', label: 'Issue date', type: 'date' }, { name: 'dueDate', label: 'Due date', type: 'date' }, { name: 'status', label: 'Status', values: ['Draft', 'Sent', 'Overdue', 'Cancelled', 'Partially Paid', 'Paid'] }, ...moneyFields] },
  payments: { title: 'Payments', fields: [{ name: 'invoiceId', label: 'Invoice', options: 'invoices', required: true }, { name: 'amount', label: 'Amount', type: 'number', required: true }, { name: 'date', label: 'Payment date', type: 'date', required: true }, { name: 'method', label: 'Method' }, { name: 'reference', label: 'Reference' }, { name: 'notes', label: 'Notes' }] },
};

export const CRM_RELATION_FIELDS = [
  { name: 'companyId', key: 'companies', label: 'Company' },
  { name: 'contactId', key: 'contacts', label: 'Contact' },
  { name: 'leadId', key: 'leads', label: 'Lead' },
  { name: 'opportunityId', key: 'opportunities', label: 'Opportunity' },
] as const;
