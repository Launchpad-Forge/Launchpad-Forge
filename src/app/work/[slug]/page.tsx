import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { PORTFOLIO_PROJECTS, COMPANY_INFO, type PortfolioProject } from "@/lib/constants";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Target,
  Terminal,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Case Study Not Found | Launchpad Forge" };

  return {
    title: `${project.title} — Case Study | Launchpad Forge`,
    description: `${project.subtitle} Read how Launchpad Forge engineered this solution with verified business outcomes.`,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.subtitle,
      url: `${COMPANY_INFO.url}/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find other projects for recommendations
  const otherProjects = PORTFOLIO_PROJECTS.filter((p) => p.slug !== slug).slice(0, 2);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.subtitle,
    author: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
    about: {
      "@type": "SoftwareApplication",
      name: project.title,
      applicationCategory: project.category,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        {/* Breadcrumb & Navigation Back */}
        <div className="container-forge mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Case Studies</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container-forge mb-16 sm:mb-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase">
                {project.label}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                {project.category}
              </span>
            </div>

            <h1 className="heading-xl mb-6">
              {project.title}
            </h1>

            <p className="body-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-8">
              {project.subtitle}
            </p>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl glass-elevated border border-[var(--border-subtle)]">
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  Project Type
                </span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {project.tag}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  Primary Domain
                </span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {project.category}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  Deliverables
                </span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {project.deliverables.length} Core Systems
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  Code Ownership
                </span>
                <span className="text-sm font-semibold text-[var(--accent)]">
                  100% Client Owned
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Editorial Case Study Grid */}
        <section className="container-forge mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Problem, Approach, Solution */}
            <div className="lg:col-span-8 space-y-16">
              {/* Challenge */}
              <div className="glass-elevated border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-10 space-y-4">
                <div className="label text-[var(--accent)] flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>THE OPERATIONAL CHALLENGE</span>
                </div>
                <h2 className="heading-md">
                  Bottlenecks and initial constraints
                </h2>
                <p className="body-md text-[var(--text-secondary)] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Engineering Approach */}
              <div className="glass-elevated border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-10 space-y-4">
                <div className="label text-[var(--accent)] flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>ENGINEERING APPROACH & ARCHITECTURE</span>
                </div>
                <h2 className="heading-md">
                  Strategic design and technical execution
                </h2>
                <p className="body-md text-[var(--text-secondary)] leading-relaxed mb-6">
                  {project.approach}
                </p>
                <p className="body-md text-[var(--text-secondary)] leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Deliverables Breakdown */}
              <div className="glass-elevated border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-10 space-y-6">
                <div className="label text-[var(--accent)] flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>PRODUCTION DELIVERABLES</span>
                </div>
                <h2 className="heading-md">
                  What Launchpad Forge engineered & delivered
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border-subtle)] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Outcomes Sidebar & Tech Stack */}
            <div className="lg:col-span-4 space-y-8">
              {/* Verified Outcomes Card */}
              <div className="glass-elevated border border-[var(--border-accent)] rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="label text-[var(--accent)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>VERIFIED OUTCOMES</span>
                </div>
                <h3 className="heading-sm">
                  Measurable business impact
                </h3>
                <ul className="space-y-4">
                  {project.verifiedOutcomes.map((outcome, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--accent)] mt-1.5 shrink-0 shadow-sm shadow-[var(--accent)]" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used Card */}
              <div className="glass-elevated border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="label text-[var(--accent)] flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>TECHNOLOGY STACK</span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Frameworks & Tools Utilized
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Start Similar Project CTA */}
              <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-4 text-center">
                <h4 className="heading-sm text-[var(--text-primary)]">
                  Need a similar system for your business?
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  We schedule a 30-minute discovery session to analyze your current workflow and scope an actionable engineering roadmap.
                </p>
                <Link
                  href="/contact"
                  className="w-full py-3 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-glow)] text-white text-xs font-mono uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--accent-glow)]"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Other Case Studies Recommendations */}
        {otherProjects.length > 0 && (
          <section className="container-forge pt-12 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider block mb-1">
                  FURTHER EXPLORATION
                </span>
                <h2 className="heading-md">Related engineering case studies</h2>
              </div>
              <Link
                href="/work"
                className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] flex items-center gap-1 transition-colors"
              >
                <span>View All Work</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/work/${p.slug}`}
                  className="group p-6 rounded-2xl glass-elevated border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider block mb-2">
                      {p.category}
                    </span>
                    <h3 className="heading-sm mb-2 group-hover:text-[var(--accent)] transition-colors flex items-center justify-between">
                      <span>{p.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                      {p.subtitle}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                    <span>{p.technologies.slice(0, 3).join(" • ")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
