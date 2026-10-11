import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { SERVICES_CATALOG, PORTFOLIO_PROJECTS, COMPANY_INFO } from "@/lib/constants";
import { ArrowRight, Check, ArrowLeft, ChevronDown, Sparkles, Layout, Smartphone, Brain, Workflow, Layers, Shield } from "lucide-react";

const ICONS_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Layout,
  Smartphone,
  Brain,
  Workflow,
  Layers,
  Shield,
};

export async function generateStaticParams() {
  return SERVICES_CATALOG.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_CATALOG.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Launchpad Forge",
    };
  }

  return {
    title: `${service.title} | Launchpad Forge`,
    description: `${service.tagline} ${service.description}`,
    openGraph: {
      title: `${service.title} | Launchpad Forge`,
      description: service.tagline,
      url: `${COMPANY_INFO.url}/services/${service.slug}`,
    },
    alternates: {
      canonical: `${COMPANY_INFO.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_CATALOG.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = ICONS_MAP[service.icon] || Layout;

  // Filter relevant projects for this service
  const relevantProjects = PORTFOLIO_PROJECTS.filter(
    (p) =>
      p.category.toLowerCase().includes(service.id) ||
      service.technologies.some((t) => p.technologies.includes(t))
  ).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
      email: COMPANY_INFO.email,
    },
    description: service.description,
    audience: {
      "@type": "Audience",
      audienceType: service.targetAudience,
    },
    termsOfService: `${COMPANY_INFO.url}/terms`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="container-forge mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to All Services
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container-forge mb-16 sm:mb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
                <Icon size={20} />
              </span>
              <span className="text-xs font-bold tracking-widest text-[var(--accent)] uppercase">
                {service.number} / SERVICE SPECIFICATION
              </span>
            </div>

            <h1 className="heading-xl mb-6">
              {service.title}
            </h1>

            <p className="body-lg text-foreground/90 font-medium max-w-2xl mb-8">
              {service.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/contact?service=${service.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-foreground font-semibold px-7 py-3.5 text-sm transition-all shadow-lg shadow-[var(--accent)]/25"
              >
                Discuss This Service <ArrowRight size={16} />
              </Link>
              <a
                href="#deliverables"
                className="inline-flex items-center gap-2 rounded-xl border border-border-subtle hover:border-[var(--accent)] text-foreground font-semibold px-7 py-3.5 text-sm transition-colors hover:bg-foreground/5"
              >
                View Deliverables
              </a>
            </div>
          </div>
        </section>

        {/* The Problem & Audience Grid */}
        <section className="container-forge mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-white/5 bg-[var(--surface)] p-8 sm:p-10 space-y-3">
              <div className="label text-[var(--accent)]">THE PROBLEM WE SOLVE</div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Why this capability is critical</h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {service.customerProblem}
              </p>
            </div>

            <div className="rounded-3xl border border-white/5 bg-[var(--surface)] p-8 sm:p-10 space-y-3">
              <div className="label text-[var(--accent)]">WHO THIS IS FOR</div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Target businesses & requirements</h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {service.targetAudience}
              </p>
              <div className="pt-2 text-xs font-semibold text-[var(--text-muted)]">
                Engagement Model: <span className="text-foreground">{service.engagementModel}</span>
              </div>
            </div>
          </div>
        </section>

        {/* What Is Included & Deliverables */}
        <section id="deliverables" className="container-forge mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 rounded-3xl border border-white/5 bg-[var(--surface)] p-8 sm:p-12 space-y-6">
              <div className="label text-[var(--accent)]">SCOPE OF WORK</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What Is Included</h2>
              <div className="space-y-4">
                {service.whatsIncluded.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-white/5 bg-[var(--surface-elevated)] p-8 sm:p-12 space-y-6">
              <div className="label text-[var(--accent)]">FINAL HANDOVER</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Tangible Deliverables</h2>
              <div className="space-y-4">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-foreground">Core Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.map((t) => (
                    <span key={t} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-foreground/5 text-foreground/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Relevant Case Studies */}
        {relevantProjects.length > 0 && (
          <section className="container-forge mb-20">
            <div className="mb-10">
              <div className="label mb-2 text-[var(--accent)]">PROOF OF CAPABILITY</div>
              <h2 className="heading-md">Relevant Systems Engineered</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relevantProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="rounded-3xl border border-white/5 bg-[var(--surface)] p-8 hover:border-[var(--accent)]/30 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 block">
                      {project.label}
                    </span>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-[var(--accent)] transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--accent)] pt-4 border-t border-white/5">
                    <span>Read Full Case Study</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Service FAQs */}
        {service.faqs?.length > 0 && (
          <section className="container-forge mb-20 max-w-4xl">
            <div className="text-center mb-12">
              <div className="label mb-2 text-[var(--accent)]">TRANSPARENCY</div>
              <h2 className="heading-md">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-border-subtle bg-[var(--surface)] p-6 space-y-2">
                  <h3 className="text-base font-bold text-foreground">{faq.question}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Closing Consultation CTA */}
        <section className="container-forge">
          <div className="glass-elevated rounded-3xl p-8 sm:p-14 text-center max-w-3xl mx-auto border border-white/10 relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to engineer your {service.shortTitle.toLowerCase()}?
            </h2>
            <p className="body-md text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              Schedule a technical discovery session. We will evaluate your current architecture and outline an execution roadmap.
            </p>
            <Link
              href={`/contact?service=${service.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-foreground font-semibold px-8 py-4 text-sm transition-all shadow-lg shadow-[var(--accent)]/25"
            >
              Start a Project for {service.shortTitle} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
