import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  INSIGHTS_ARTICLES,
  COMPANY_INFO,
  type InsightArticle,
} from "@/lib/constants";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Share2,
  Sparkles,
  Tag,
  User,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INSIGHTS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = INSIGHTS_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found | Launchpad Forge" };

  return {
    title: `${article.title} | Launchpad Forge Insights`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `${COMPANY_INFO.url}/insights/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = INSIGHTS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const otherArticles = INSIGHTS_ARTICLES.filter((a) => a.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${COMPANY_INFO.url}/insights/${article.slug}`,
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
        {/* Back Link */}
        <div className="container-forge mb-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Insights</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="container-forge">
          <header className="max-w-3xl mx-auto mb-16 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent)] font-mono">
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

            <h1 className="heading-xl leading-tight">
              {article.title}
            </h1>

            <p className="body-lg text-[var(--text-secondary)] leading-relaxed">
              {article.summary}
            </p>

            {/* Author Card */}
            <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center font-bold font-mono text-sm border border-[var(--border-subtle)]">
                  LF
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {article.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] hidden sm:inline-block"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto space-y-12 mb-20 text-[var(--text-secondary)]">
            {article.content.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="heading-md text-[var(--text-primary)] pt-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="body-md leading-relaxed text-[var(--text-secondary)]">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            {/* Internal Ecosystem Links */}
            <div className="p-8 rounded-2xl glass-elevated border border-[var(--border-subtle)] space-y-4 my-12">
              <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider block">
                RELATED SYSTEMS & SERVICES
              </span>
              <h3 className="heading-sm text-[var(--text-primary)]">
                Implement this architecture in your business
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Launchpad Forge designs and deploys custom systems based on these exact architectural patterns. Explore how our service offerings and client case studies align with your roadmap:
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/services"
                  className="px-4 py-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-subtle)] text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
                >
                  <span>Explore Services</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/work"
                  className="px-4 py-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-subtle)] text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
                >
                  <span>View Case Studies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Further Reading */}
        {otherArticles.length > 0 && (
          <section className="container-forge pt-12 border-t border-[var(--border-subtle)]">
            <div className="max-w-3xl mx-auto">
              <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider block mb-2">
                FURTHER READING
              </span>
              <h2 className="heading-md mb-8">Related engineering guides</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/insights/${a.slug}`}
                    className="group p-6 rounded-2xl glass-elevated border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider block mb-2">
                        {a.category} • {a.readTime}
                      </span>
                      <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                        {a.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                        {a.summary}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] flex items-center justify-between">
                      <span>{a.author.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
