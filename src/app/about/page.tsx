import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  COMPANY_INFO,
  AGENCY_PRINCIPLES,
  TRUST_METRICS,
} from "@/lib/constants";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Engineering & Brand Philosophy | Launchpad Forge",
  description: "Learn about Launchpad Forge: a modern digital partner engineering custom software, AI copilot systems, and high-performance digital products.",
  openGraph: {
    title: "About Launchpad Forge — Pragmatic Engineering & Clean Architecture",
    description: "We help businesses solve real operational challenges with custom code, intelligent automation, and transparent collaboration.",
    url: `${COMPANY_INFO.url}/about`,
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Launchpad Forge",
    description: "Launchpad Forge is a modern digital engineering partner specializing in custom web applications, AI copilots, and business automation.",
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
      foundingDate: "2024",
      description: COMPANY_INFO.description,
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
        {/* Hero Section */}
        <section className="container-forge mb-16 sm:mb-24">
          <div className="max-w-4xl">
            <div className="label mb-4 text-[var(--accent)] flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--accent)]" />
              ABOUT LAUNCHPAD FORGE
            </div>
            <h1 className="heading-xl mb-6">
              Engineering systems built to <span className="gradient-text-accent">solve real problems.</span>
            </h1>
            <p className="body-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              We are a specialized digital studio and engineering partner. We help ambitious companies, founders, and operational leaders turn manual bottlenecks and product concepts into resilient websites, custom software, and automated workflows.
            </p>
          </div>
        </section>

        {/* Agency Metrics Banner */}
        <section className="container-forge mb-20 sm:mb-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="glass-elevated border border-[var(--border-subtle)] p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                    {metric.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[var(--text-primary)] mb-2">
                    {metric.value}
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Positioning & Philosophy */}
        <section className="container-forge mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 sticky top-32">
              <div className="label mb-3 text-[var(--accent)]">OUR POSITIONING</div>
              <h2 className="heading-lg mb-6">
                Why we reject generic templates and bloated agencies.
              </h2>
              <p className="body-md text-[var(--text-secondary)] leading-relaxed mb-6">
                Traditional agencies often charge enterprise fees while passing work to junior generalists or relying on fragile visual page builders that degrade over time.
              </p>
              <p className="body-md text-[var(--text-secondary)] leading-relaxed">
                Launchpad Forge operates as a focused multidisciplinary engineering team. When you partner with us, you collaborate directly with the engineers and designers architecting your software.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {AGENCY_PRINCIPLES.map((principle, idx) => (
                <div
                  key={idx}
                  className="glass-elevated border border-[var(--border-subtle)] p-8 rounded-2xl space-y-3 transition-all hover:border-[var(--border-accent)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--surface)] text-[var(--accent)] text-xs font-mono flex items-center justify-center font-bold border border-[var(--border-subtle)]">
                      {idx + 1}
                    </span>
                    <h3 className="heading-sm text-[var(--text-primary)]">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="body-md text-[var(--text-secondary)] leading-relaxed pl-9">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Architecture & Capabilities */}
        <section className="container-forge mb-20 sm:mb-28">
          <div className="glass-elevated border border-[var(--border-subtle)] rounded-3xl p-8 sm:p-12">
            <div className="max-w-3xl mb-12">
              <div className="label mb-3 text-[var(--accent)]">OUR ENGINEERING FOUNDATION</div>
              <h2 className="heading-lg mb-4">
                What we believe about modern software development.
              </h2>
              <p className="body-md text-[var(--text-secondary)]">
                We believe that software should be fast, maintainable, and type-safe from the ground up. Here are the standards we enforce across every repository:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--accent)] border border-[var(--border-subtle)]">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  Strict Type Safety
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Every project uses TypeScript in strict mode, runtime schema validation (Zod), and end-to-end typed API communication to prevent runtime errors.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--accent)] border border-[var(--border-subtle)]">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  Sub-Second Performance
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  We optimize Core Web Vitals to guarantee LCP under 2.0s. Server-rendered layouts ensure zero delay for search engine crawlers and users alike.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--accent)] border border-[var(--border-subtle)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  Zero Data Compromise
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  In our AI & automation pipelines, proprietary company data is never used to train public LLMs. We implement zero-retention enterprise policies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration & Handover */}
        <section className="container-forge mb-20 sm:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-elevated border border-[var(--border-subtle)] p-8 sm:p-10 rounded-2xl space-y-4">
              <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider block">
                INTELLECTUAL PROPERTY
              </span>
              <h3 className="heading-md">
                100% Code and Asset Transfer
              </h3>
              <p className="body-md text-[var(--text-secondary)] leading-relaxed">
                When you work with Launchpad Forge, you never have to worry about vendor lock-in. You receive the complete Git repository, Figma design files, database migration scripts, and deployment configurations upon final settlement.
              </p>
              <ul className="space-y-2 pt-2">
                <li className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>Full Git repository access & commit history</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>Organized Figma token library & interactive prototypes</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>Deployment runbooks & environment documentation</span>
                </li>
              </ul>
            </div>

            <div className="glass-elevated border border-[var(--border-subtle)] p-8 sm:p-10 rounded-2xl space-y-4">
              <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider block">
                COMMUNICATION STANDARDS
              </span>
              <h3 className="heading-md">
                Direct Engineer Access
              </h3>
              <p className="body-md text-[var(--text-secondary)] leading-relaxed">
                We despise communication games where client requests are filtered through layers of non-technical account managers. You will have a direct channel with the architects actually writing your code.
              </p>
              <ul className="space-y-2 pt-2">
                <li className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>Dedicated Slack or WhatsApp communication channel</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>Weekly live sprint reviews on working staging URLs</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>Transparent milestone roadmap and status updates</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container-forge">
          <div className="glass-elevated border border-[var(--border-accent)] rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WORK WITH US</span>
            </div>
            <h2 className="heading-lg">
              Ready to engineer your next digital advantage?
            </h2>
            <p className="body-md text-[var(--text-secondary)] max-w-xl mx-auto">
              Tell us about your business goals, target timeline, and operational constraints. We will review your requirements and provide honest engineering guidance.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-glow)] text-white text-xs font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all shadow-lg shadow-[var(--accent-glow)]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/work"
                className="px-8 py-3.5 rounded-full bg-[var(--surface-elevated)] hover:bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 transition-all"
              >
                <span>Explore Case Studies</span>
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
