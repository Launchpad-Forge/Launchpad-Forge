"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  QrCode, ChefHat, BarChart3, Receipt, Package, FileText,
  ScanText, Database, Brain, MessageSquare, CheckSquare,
  FolderKanban, GraduationCap, Sparkles, LineChart,
} from "lucide-react";

interface CaseStudyProps {
  title: string;
  subtitle: string;
  label: string;
  items: { icon: React.ReactNode; label: string }[];
  gradient: string;
}

const PROJECTS: CaseStudyProps[] = [
  {
    title: "Restaurant Operating System",
    subtitle: "End-to-end management system with QR ordering, kitchen display, inventory tracking, and analytics.",
    label: "CONCEPT PROJECT",
    gradient: "linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface-elevated), var(--accent) 5%) 100%)",
    items: [
      { icon: <QrCode size={16} />, label: "QR Ordering" },
      { icon: <ChefHat size={16} />, label: "Kitchen" },
      { icon: <BarChart3 size={16} />, label: "Analytics" },
      { icon: <Receipt size={16} />, label: "Billing" },
      { icon: <Package size={16} />, label: "Inventory" },
    ],
  },
  {
    title: "AI Document Intelligence",
    subtitle: "Automated document processing pipeline with OCR, extraction, embedding, and AI-powered answers.",
    label: "CONCEPT PROJECT",
    gradient: "linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface-elevated), var(--accent) 3%) 100%)",
    items: [
      { icon: <FileText size={16} />, label: "Document" },
      { icon: <ScanText size={16} />, label: "OCR" },
      { icon: <Database size={16} />, label: "Embedding" },
      { icon: <Brain size={16} />, label: "RAG" },
      { icon: <MessageSquare size={16} />, label: "AI Answer" },
    ],
  },
  {
    title: "LifeOS",
    subtitle: "Personal productivity system with tasks, projects, learning tracking, AI assistance, and analytics.",
    label: "INTERNAL PROJECT",
    gradient: "linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface-elevated), var(--accent) 4%) 100%)",
    items: [
      { icon: <CheckSquare size={16} />, label: "Tasks" },
      { icon: <FolderKanban size={16} />, label: "Projects" },
      { icon: <GraduationCap size={16} />, label: "Learning" },
      { icon: <Sparkles size={16} />, label: "AI" },
      { icon: <LineChart size={16} />, label: "Analytics" },
    ],
  },
];

function CaseStudyCard({ title, subtitle, label, items, gradient }: CaseStudyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="group w-full flex-shrink-0"
      data-cursor="EXPLORE"
    >
      <div className="rounded-2xl border border-white/5 bg-[var(--surface)] overflow-hidden hover:border-[var(--accent)]/20 transition-all duration-500 cursor-pointer h-full flex flex-col">
        {/* Visual Environment */}
        <div
          className="relative h-48 md:h-56 lg:h-64 overflow-hidden flex-shrink-0"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 grid-overlay" />

          {/* Floating UI Elements */}
          <div className="absolute inset-8 flex flex-wrap gap-2 md:gap-3 items-center justify-center content-center">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="glass-elevated rounded-xl px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 hover:border-[var(--accent)]/30 hover:scale-105 transition-all duration-300"
              >
                <div className="text-[var(--accent)]">{item.icon}</div>
                <span className="text-xs md:text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-10 border-t border-white/5 flex-grow flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-dim)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-[var(--accent)]">
                {label}
              </span>
              <span className="w-8 h-px bg-white/10" />
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 group-hover:text-foreground transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  return (
    <section 
      id="work" 
      className="relative py-20 lg:py-32"
    >
      <div className="container-forge mb-12">
        <div className="label mb-4">
          <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
          03 / SELECTED SYSTEMS
        </div>
        <h2 className="heading-lg max-w-3xl">
          We don&apos;t just<br />
          make websites.<br />
          <span className="gradient-text-accent">We build systems.</span>
        </h2>
      </div>

      <div className="container-forge grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <CaseStudyCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

