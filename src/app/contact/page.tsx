import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import { COMPANY_INFO, FAQ_ITEMS } from "@/lib/constants";
import {
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Start a Project — Contact & Engineering Inquiries | Launchpad Forge",
  description: "Initiate your project discussion with Launchpad Forge. Direct engineer review, transparent milestone scoping, and 24-hour response turnaround.",
  openGraph: {
    title: "Start a Project | Launchpad Forge",
    description: "Submit your project requirements for custom software, AI copilot systems, or workflow automation.",
    url: `${COMPANY_INFO.url}/contact`,
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Launchpad Forge",
    description: "Submit project requirements and get in touch with the Launchpad Forge engineering team.",
    mainEntity: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
      email: COMPANY_INFO.email,
      telephone: COMPANY_INFO.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="flex-1 pt-28">
        {/* Direct Contact Cards Bar */}
        <section className="container-forge mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="p-5 rounded-2xl glass-elevated border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                  Direct Email
                </span>
                <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate block">
                  {COMPANY_INFO.email}
                </span>
              </div>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
              className="p-5 rounded-2xl glass-elevated border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                  Direct Telephone
                </span>
                <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate block">
                  {COMPANY_INFO.phone}
                </span>
              </div>
            </a>

            <div className="p-5 rounded-2xl glass-elevated border border-[var(--border-subtle)] flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                  Response SLA
                </span>
                <span className="text-xs font-semibold text-[var(--text-primary)] truncate block">
                  Within 24 Business Hours
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-elevated border border-[var(--border-subtle)] flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                  Confidentiality
                </span>
                <span className="text-xs font-semibold text-[var(--text-primary)] truncate block">
                  Mutual NDA Available
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation Form Section */}
        <Contact />

        {/* Kickoff FAQ Section */}
        <section className="container-forge py-16 sm:py-24 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="label mb-3 text-[var(--accent)]">FREQUENT INQUIRY QUESTIONS</div>
              <h2 className="heading-lg">What happens after you reach out?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl glass-elevated border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>1. Technical Review</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Our engineering team reviews your requirements and prepares initial architecture feasibility notes prior to our first call.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-elevated border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>2. 30-Minute Discovery</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  We schedule a focused consultation to clarify business metrics, technical integration points, and budget expectations.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-elevated border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>3. Fixed Milestone Proposal</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  We deliver a transparent scope matrix with fixed pricing, weekly sprint deliverables, and explicit acceptance criteria.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-elevated border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>4. Sprint Kickoff</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Upon contract sign-off, we establish your dedicated communication channel and launch Sprint 1 immediately.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
