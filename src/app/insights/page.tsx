import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  COMPANY_INFO,
  INSIGHTS_ARTICLES,
  type InsightArticle,
} from "@/lib/constants";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Tag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Insights & Technical Guides | Launchpad Forge",
  description: "In-depth technical guides, architectural blueprints, and engineering analyses on AI systems, headless Next.js platforms, and workflow automation.",
  openGraph: {
    title: "Engineering Insights & Technical Guides | Launchpad Forge",
    description: "Original architectural analyses and production lessons from the Launchpad Forge engineering team.",
    url: `${COMPANY_INFO.url}/insights`,
  },
};

export default function InsightsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Launchpad Forge Engineering Insights",
    description: "Technical articles on modern software engineering, AI systems, and automation architecture.",
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
    hasPart: INSIGHTS_ARTICLES.map((article) => ({
      "@type": "Article",
      headline: article.title,
      description: article.summary,
      url: `${COMPANY_INFO.url}/insights/${article.slug}`,
      datePublished: article.date,
      author: {
        "@type": "Organization",
        name: article.author.name,
      },
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
        <section className="container-forge mb-16 sm:mb-20">
          <div className="max-w-4xl">
            <div className="label mb-4 text-[var(--accent)] flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--accent)]" />
              ENGINEERING INSIGHTS & RESEARCH
            </div>
            <h1 className="heading-xl mb-6">
              Practical guides on <span className="gradient-text-accent">software, AI, and scale.</span>
            </h1>
            <p className="body-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Original analyses written by our senior engineering team. We share architectural patterns, real production trade-offs, and lessons learned from deploying mission-critical systems.
            </p>
          </div>
        </section>

        {/* Featured Article & Articles List */}
        <section className="container-forge mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {INSIGHTS_ARTICLES.map((article: InsightArticle, idx: number) => {
              const isFirst = idx === 0;
              return (
                <article
                  key={article.slug}
                  className={`group glass-elevated border border-[var(--border-subtle)] hover:border-[var(--border-accent)] rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent-glow)]/10 ${
                    isFirst ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
                >
                  <div className="space-y-6">
                    {/* Meta Bar */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--accent)] border border-[var(--border-subtle)] font-mono">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2
                      className={`font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors ${
                        isFirst ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                      }`}
                    >
                      <Link href={`/insights/${article.slug}`} className="flex items-start justify-between gap-2">
                        <span>{article.title}</span>
                        <ArrowUpRight className="w-5 h-5 shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[var(--accent)]" />
                      </Link>
                    </h2>

                    {/* Summary */}
                    <p className="body-md text-[var(--text-secondary)] leading-relaxed">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author Bar & Read Button */}
                  <div className="pt-8 mt-8 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[var(--text-primary)] block">
                        {article.author.name}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] block">
                        {article.author.role}
                      </span>
                    </div>

                    <Link
                      href={`/insights/${article.slug}`}
                      className="px-4 py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-subtle)] hover:border-transparent text-xs font-mono uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-1.5"
                    >
                      <span>Read Guide</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <section className="container-forge">
          <div className="glass-elevated border border-[var(--border-accent)] rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEED TAILORED ARCHITECTURE?</span>
            </div>
            <h2 className="heading-lg">
              Want to apply these patterns to your tech stack?
            </h2>
            <p className="body-md text-[var(--text-secondary)] max-w-xl mx-auto">
              Our architects provide direct consulting, code reviews, and end-to-end implementation for high-growth businesses.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-glow)] text-white text-xs font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all shadow-lg shadow-[var(--accent-glow)]"
              >
                <span>Book Technical Consultation</span>
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
