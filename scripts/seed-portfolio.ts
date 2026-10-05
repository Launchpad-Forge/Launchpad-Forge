import 'dotenv/config';
import { prisma } from "../src/lib/db";

const PROJECTS = [
  {
    title: "Restaurant Operating System",
    subtitle: "End-to-end management system with QR ordering, kitchen display, inventory tracking, and analytics.",
    label: "CONCEPT PROJECT",
    gradient: "linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface-elevated), var(--accent) 5%) 100%)",
    items: [
      { icon: "QrCode", label: "QR Ordering" },
      { icon: "ChefHat", label: "Kitchen" },
      { icon: "BarChart3", label: "Analytics" },
      { icon: "Receipt", label: "Billing" },
      { icon: "Package", label: "Inventory" },
    ],
  },
  {
    title: "AI Document Intelligence",
    subtitle: "Automated document processing pipeline with OCR, extraction, embedding, and AI-powered answers.",
    label: "CONCEPT PROJECT",
    gradient: "linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface-elevated), var(--accent) 3%) 100%)",
    items: [
      { icon: "FileText", label: "Document" },
      { icon: "ScanText", label: "OCR" },
      { icon: "Database", label: "Embedding" },
      { icon: "Brain", label: "RAG" },
      { icon: "MessageSquare", label: "AI Answer" },
    ],
  },
  {
    title: "LifeOS",
    subtitle: "Personal productivity system with tasks, projects, learning tracking, AI assistance, and analytics.",
    label: "INTERNAL PROJECT",
    gradient: "linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface-elevated), var(--accent) 4%) 100%)",
    items: [
      { icon: "CheckSquare", label: "Tasks" },
      { icon: "FolderKanban", label: "Projects" },
      { icon: "GraduationCap", label: "Learning" },
      { icon: "Sparkles", label: "AI" },
      { icon: "LineChart", label: "Analytics" },
    ],
  },
];

async function seed() {
  console.log('Seeding portfolio projects...');
  for (const project of PROJECTS) {
    await prisma.orm.public.PortfolioProject.create({
      title: project.title,
      subtitle: project.subtitle,
      label: project.label,
      gradient: project.gradient,
      items: project.items,
    });
  }
  console.log('Successfully seeded portfolio projects!');
}

seed().catch(console.error);
