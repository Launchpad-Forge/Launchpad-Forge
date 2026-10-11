import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { SERVICES_CATALOG, COMPANY_INFO } from "@/lib/constants";
import { ArrowRight, Check, Layout, Smartphone, Brain, Workflow, Layers, Shield, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Capabilities | Launchpad Forge",
  description: "Explore our core digital engineering services: Custom Web Applications, Mobile Apps, Enterprise AI & RAG, Event-Driven Automations, MVP Development, and Cloud Infrastructure.",
  openGraph: {
    title: "Services & Capabilities | Launchpad Forge",
    description: "High-performance digital flagships, mobile applications, autonomous AI agents, and business automation pipelines.",
    url: `${COMPANY_INFO.url}/services`,
  },
};

const ICONS_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Layout,
  Smartphone,
  Brain,
  Workflow,
  Layers,
  Shield,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        {/* Page Header */}
        <section className="container-forge mb-20 sm:mb-28">
          <div className="max-w-4xl">
            <div className="label mb-4 text-[var(--accent)] flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--accent)]" />
              CAPABILITIES & SERVICES
            </div>
            <h1 className="heading-xl mb-6">
              Engineering solutions built for <span className="gradient-text-accent">scale & revenue.</span>
            </h1>
            <p className="body-lg text-[var(--text-secondary)] max-w-2xl">
              We don&apos;t build disposable templates or fragile prototypes. We architect robust, high-converting digital flagships, autonomous workflows, and cloud systems engineered for ambitious businesses.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="container-forge space-y-20 sm:space-y-28">
          {SERVICES_CATALOG.map((service, index) => {
            const Icon = ICONS_MAP[service.icon] || Layout;
            const isReversed = index % 2 === 1;

            return (
              <article
                key={service.slug}
                id={service.slug}
                className="rounded-3xl border border-white/5 bg-[var(--surface)] p-8 sm:p-12 lg:p-16 transition-all duration-300 hover:border-[var(--accent)]/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start ${isReversed ? "" : ""}`}>
                  {/* Left Column: Overview & Problems */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                        <Icon size={22} className="text-[var(--accent)]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold tracking-widest text-[var(--accent)] uppercase">
                          {service.number} / CORE CAPABILITY
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg text-[var(--text-secondary)] font-medium leading-relaxed">
                      {service.tagline}
                    </p>

                    {/* Problem Solved */}
                    <div className="rounded-2xl bg-foreground/5 p-6 border border-white/5 space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                        The Problem We Solve
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {service.customerProblem}
                      </p>
                    </div>

                    {/* Who It Is For */}
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Who This Is For
                      </h3>
                      <p className="text-sm text-foreground/90">
                        {service.targetAudience}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="pt-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                        Technologies & Frameworks
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Inclusions & CTA */}
                  <div className="lg:col-span-5 space-y-8 glass-elevated p-6 sm:p-8 rounded-2xl border border-white/10">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                        <span className="w-4 h-px bg-[var(--accent)]" />
                        What&apos;s Included
                      </h3>
                      <ul className="space-y-3">
                        {service.whatsIncluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                            <Check size={16} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <div className="text-xs text-[var(--text-muted)]">Typical Engagement:</div>
                      <div className="text-xs font-medium text-foreground">{service.engagementModel}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex-1 text-center rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-border-subtle text-foreground py-3 px-4 text-xs font-bold tracking-wider uppercase transition-colors"
                      >
                        Full Specs →
                      </Link>
                      <Link
                        href={`/contact?service=${service.slug}`}
                        className="flex-1 text-center rounded-xl bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-foreground py-3 px-4 text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-[var(--accent)]/20"
                      >
                        Start Project
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Closing CTA */}
        <section className="container-forge mt-28">
          <div className="glass-elevated rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto border border-white/10 relative overflow-hidden">
            <div className="label mb-3 text-[var(--accent)]">READY TO COMMENCE?</div>
            <h2 className="heading-md mb-4">Have an ambitious project in mind?</h2>
            <p className="body-md text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
              We review technical briefs within 24 business hours. No pushy sales calls — talk directly with our lead systems architects.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-foreground font-semibold px-8 py-4 text-sm transition-all shadow-lg shadow-[var(--accent)]/25"
            >
              Start a Project Discovery Call <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
