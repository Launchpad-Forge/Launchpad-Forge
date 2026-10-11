"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Truck, MapPin, Receipt, FileText, Brain, Shield,
  MessageSquare, Workflow, CheckSquare, Database, QrCode,
  Package, BarChart3, Layout, ArrowRight, Sparkles, Star
} from "lucide-react";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/lib/constants";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Truck,
  MapPin,
  Receipt,
  FileText,
  Brain,
  Shield,
  MessageSquare,
  Workflow,
  CheckSquare,
  Database,
  QrCode,
  Package,
  BarChart3,
  Layout,
  Sparkles,
};

function ProjectCard({ project }: { project: PortfolioProject }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group w-full flex-shrink-0"
    >
      <Link
        href={`/work/${project.slug}`}
        className="block rounded-2xl border border-white/5 bg-[var(--surface)] overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-500 h-full flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        {/* Visual Environment */}
        <div
          className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0"
          style={{ background: project.gradient }}
        >
          <div className="absolute inset-0 grid-overlay opacity-30" />

          {/* Floating UI Badges */}
          <div className="absolute inset-4 sm:inset-6 flex flex-wrap gap-2 items-center justify-center content-center">
            {project.items?.map((item, i) => {
              const IconComp = ICON_MAP[item.icon] || Star;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  className="glass-elevated rounded-xl px-3 py-2 flex items-center gap-2 border border-white/10 group-hover:border-[var(--accent)]/40 transition-colors"
                >
                  <IconComp size={14} className="text-[var(--accent)] flex-shrink-0" />
                  <span className="text-xs font-semibold tracking-wide text-foreground">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 border-t border-white/5 flex-grow flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-dim)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-bold tracking-widest text-[var(--accent)] uppercase">
                {project.label}
              </span>
              <span className="w-6 h-px bg-white/10" />
              <span className="text-[11px] text-[var(--text-muted)] font-medium">
                {project.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-foreground text-foreground/95 transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-6">
              {project.subtitle}
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies?.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-foreground/5 text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="text-xs font-bold text-[var(--accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Case Study <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CaseStudies() {
  const [projects, setProjects] = useState<PortfolioProject[]>(PORTFOLIO_PROJECTS);

  useEffect(() => {
    // Attempt to load dynamic projects if configured
    import("@/app/crm/portfolio/actions")
      .then(({ getPortfolioProjectsAction }) => {
        getPortfolioProjectsAction().then((data) => {
          if (data && data.length > 0) {
            setProjects(data);
          }
        }).catch(() => {
          // Graceful fallback to verified constant projects
        });
      })
      .catch(() => {
        // Fallback silently
      });
  }, []);

  return (
    <section id="work" className="relative py-20 lg:py-32">
      <div className="container-forge mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="label mb-4">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
              03 / SELECTED SYSTEMS
            </div>
            <h2 className="heading-lg max-w-2xl">
              We don&apos;t just make websites.<br />
              <span className="gradient-text-accent">We engineer systems.</span>
            </h2>
          </div>

          <Link
            href="/work"
            className="rounded-full border border-border-subtle hover:border-[var(--accent)] text-foreground px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-foreground/5 transition-all duration-300 flex items-center gap-2 group w-fit"
          >
            Explore All Case Studies
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[var(--accent)]" />
          </Link>
        </div>
      </div>

      <div className="container-forge grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id || project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

