"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Filter, Layers, Sparkles } from "lucide-react";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/lib/constants";

export default function WorkGalleryClient() {
  const [projects, setProjects] = useState<PortfolioProject[]>(PORTFOLIO_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    import("@/app/crm/portfolio/actions")
      .then(({ getPortfolioProjectsAction }) => {
        getPortfolioProjectsAction().then((data) => {
          if (data && data.length > 0) {
            setProjects(
              data.map((d: any, idx: number) => ({
                id: d.id || `project-${idx}`,
                slug: d.slug || PORTFOLIO_PROJECTS[idx]?.slug || `project-${idx}`,
                title: d.title,
                subtitle: d.subtitle,
                category: d.category || PORTFOLIO_PROJECTS[idx]?.category || "Custom Software & Web Platform",
                label: d.label || `0${idx + 1} / SYSTEM`,
                tag: d.tag || "Commercial System",
                gradient: d.gradient || PORTFOLIO_PROJECTS[idx]?.gradient || "linear-gradient(135deg, #181920 0%, #1c2738 100%)",
                problem: d.problem || PORTFOLIO_PROJECTS[idx]?.problem || "",
                approach: d.approach || PORTFOLIO_PROJECTS[idx]?.approach || "",
                solution: d.solution || PORTFOLIO_PROJECTS[idx]?.solution || "",
                deliverables: d.deliverables || PORTFOLIO_PROJECTS[idx]?.deliverables || [],
                technologies: d.technologies || PORTFOLIO_PROJECTS[idx]?.technologies || ["TypeScript", "Next.js"],
                verifiedOutcomes: d.verifiedOutcomes || PORTFOLIO_PROJECTS[idx]?.verifiedOutcomes || [],
                items: Array.isArray(d.items) ? d.items : (PORTFOLIO_PROJECTS[idx]?.items || []),
              }))
            );
          }
        });
      })
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...unique];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-muted)] mr-2">
          <Filter className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Filter:</span>
        </div>
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[var(--accent)] text-white font-semibold shadow-lg shadow-[var(--accent-glow)]"
                  : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-white border border-[var(--border-subtle)] hover:border-[var(--border-accent)]"
              }`}
            >
              {category === "All" ? "All Systems" : category}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project: PortfolioProject) => (
          <article
            key={project.id}
            className="group glass-elevated border border-[var(--border-subtle)] hover:border-[var(--border-accent)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent-glow)]/10"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase">
                  {project.label}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                  {project.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="heading-sm mb-3 group-hover:text-[var(--accent)] transition-colors">
                <Link href={`/work/${project.slug}`} className="flex items-center justify-between gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[var(--accent)]" />
                </Link>
              </h2>
              <p className="body-md text-[var(--text-secondary)] mb-6">
                {project.subtitle}
              </p>

              {/* Problem & Solution Preview */}
              <div className="space-y-4 mb-6 pt-4 border-t border-[var(--border-subtle)]">
                <div>
                  <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    The Challenge
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Engineering Solution
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Verified Outcome Highlights */}
              <div className="mb-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border-subtle)]">
                <div className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Impact
                </div>
                <ul className="space-y-1.5">
                  {project.verifiedOutcomes.slice(0, 2).map((outcome, idx) => (
                    <li key={idx} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer: Tech Stack + Direct Link */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${project.slug}`}
                className="w-full py-3 px-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-subtle)] hover:border-transparent text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Consultation Banner */}
      <div className="glass-elevated border border-[var(--border-accent)] rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LOOKING FOR A BESPOKE SYSTEM?</span>
        </div>
        <h3 className="heading-md">
          Have an operational challenge or software concept?
        </h3>
        <p className="body-md text-[var(--text-secondary)] max-w-xl mx-auto">
          We architect custom software platforms, RAG knowledge systems, and automated pipelines tailored to your exact business constraints.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-glow)] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-lg shadow-[var(--accent-glow)]"
          >
            <span>Start a Project Discussion</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
