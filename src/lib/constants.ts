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

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
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
