import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  COMPANY_INFO,
  PROCESS_STAGES_DETAILED,
} from "@/lib/constants";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileCheck,
  GitBranch,
  Layers,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Process & Roadmap | Launchpad Forge",
  description: "Explore our 7-stage engineering methodology: from discovery and architecture blueprints to agile sprints, automated QA, and seamless production launch.",
  openGraph: {
    title: "Engineering Process & Roadmap | Launchpad Forge",
    description: "Transparent, sprint-based software development with zero surprises, weekly demos, and complete code ownership.",
    url: `${COMPANY_INFO.url}/process`,
  },
};

export default function ProcessPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Launchpad Forge 7-Stage Engineering Process",
    description: "How Launchpad Forge takes digital products and software systems from initial discovery to high-performance production release.",
    step: PROCESS_STAGES_DETAILED.map((stage) => ({
      "@type": "HowToStep",
      name: stage.title,
      text: stage.summary,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        {/* Header */}
        <section className="container-forge mb-16 sm:mb-24">
          <div className="max-w-4xl">
            <div className="label mb-4 text-[var(--accent)] flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--accent)]" />
              METHODOLOGY & ROADMAP
            </div>
            <h1 className="heading-xl mb-6">
              A transparent, sprint-driven <span className="gradient-text-accent">engineering process.</span>
            </h1>
            <p className="body-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              We eliminate guesswork. Every milestone has explicit deliverables, defined timelines, and weekly interactive reviews on staging environments. You always know exactly what is being built, why, and what comes next.
            </p>
          </div>
        </section>

        {/* Process Stages Detailed Timeline */}
        <section className="container-forge mb-20 sm:mb-28">
          <div className="space-y-12">
            {PROCESS_STAGES_DETAILED.map((stage, idx) => (
              <div
                key={stage.number}
                className="group glass-elevated border border-[var(--border-subtle)] hover:border-[var(--border-accent)] rounded-3xl p-8 sm:p-12 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number & Timing */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[var(--accent)]">
                        {stage.number}
                      </span>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)]">
                        <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>{stage.duration}</span>
                      </div>
                    </div>

                    <h2 className="heading-md group-hover:text-[var(--accent)] transition-colors">
                      {stage.title}
                    </h2>

                    <p className="body-md text-[var(--text-secondary)] leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>

                  {/* Middle Column: Core Activities */}
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                      Core Sprint Activities
                    </span>
                    <ul className="space-y-3">
                      {stage.activities.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Tangible Deliverable */}
                  <div className="lg:col-span-3 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                      <FileCheck className="w-4 h-4" />
                      <span>Deliverable</span>
                    </div>
                    <p className="text-xs font-medium text-[var(--text-primary)] leading-relaxed">
                      {stage.deliverables}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Collaboration Guarantees */}
        <section className="container-forge mb-20 sm:mb-28">
          <div className="max-w-3xl mb-12">
            <div className="label mb-3 text-[var(--accent)]">WHAT TO EXPECT</div>
            <h2 className="heading-lg mb-4">
              Our working commitments during every project.
            </h2>
            <p className="body-md text-[var(--text-secondary)]">
              We view our clients as engineering partners. Here is what we provide to ensure a seamless collaboration:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-elevated border border-[var(--border-subtle)] p-6 sm:p-8 rounded-2xl space-y-3">
              <GitBranch className="w-6 h-6 text-[var(--accent)]" />
              <h3 className="heading-sm">Weekly Staging Releases</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                You never wait weeks to see progress. We deploy sprint branches to private staging URLs every Friday with a recorded walkthrough.
              </p>
            </div>

            <div className="glass-elevated border border-[var(--border-subtle)] p-6 sm:p-8 rounded-2xl space-y-3">
              <Layers className="w-6 h-6 text-[var(--accent)]" />
              <h3 className="heading-sm">Fixed-Scope Milestones</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                No surprise hourly invoices. We scope deliverables clearly with pre-agreed acceptance criteria before kicking off development.
              </p>
            </div>

            <div className="glass-elevated border border-[var(--border-subtle)] p-6 sm:p-8 rounded-2xl space-y-3">
              <CheckCircle2 className="w-6 h-6 text-[var(--accent)]" />
              <h3 className="heading-sm">Zero Vendor Lock-In</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                All source code, schemas, and configurations belong to your company. Handover includes full technical documentation and developer guides.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container-forge">
          <div className="glass-elevated border border-[var(--border-accent)] rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START DISCOVERY</span>
            </div>
            <h2 className="heading-lg">
              Have a project ready for architectural discovery?
            </h2>
            <p className="body-md text-[var(--text-secondary)] max-w-xl mx-auto">
              Schedule a 30-minute discovery consultation. We will analyze your technical requirements and prepare a detailed scope and timeline.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-glow)] text-white text-xs font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all shadow-lg shadow-[var(--accent-glow)]"
              >
                <span>Schedule Discovery Session</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
