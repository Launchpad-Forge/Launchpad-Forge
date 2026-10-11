import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { COMPANY_INFO } from "@/lib/constants";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Launchpad Forge",
  description: "Terms and conditions governing consulting, engineering engagements, intellectual property transfer, and milestone deliverables with Launchpad Forge.",
  openGraph: {
    title: "Terms of Service | Launchpad Forge",
    url: `${COMPANY_INFO.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        <div className="container-forge mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <article className="container-forge">
          <header className="max-w-3xl mx-auto mb-12">
            <div className="label mb-4 text-[var(--accent)] flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>LEGAL POLICIES</span>
            </div>
            <h1 className="heading-xl mb-4">Terms of Service</h1>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Last updated: October 2026
            </p>
          </header>

          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">
            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">1. Commercial Agreement</h2>
              <p className="body-md">
                These Terms of Service govern all website visits, preliminary engineering consultations, and formal software development contracts entered into with Launchpad Forge (&quot;the Agency&quot;).
              </p>
              <p className="body-md">
                Formal client engagements are governed by a specific Statement of Work (SOW) or Master Services Agreement (MSA) detailing agreed deliverables, milestones, payment schedules, and technical requirements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">2. Intellectual Property & Code Ownership</h2>
              <p className="body-md">
                We believe in full client ownership without predatory lock-in:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong className="text-[var(--text-primary)]">Full Assignment:</strong> Upon receipt of full settlement for agreed milestones, 100% of custom source code, database migration scripts, UI designs, and documentation created specifically for the project belong entirely to the Client.</li>
                <li><strong className="text-[var(--text-primary)]">Pre-Existing Open Source Tools:</strong> Third-party libraries, public npm packages, and standard open-source tools (e.g., Next.js, React, Tailwind, PostgreSQL) remain subject to their respective open-source licenses (MIT, Apache 2.0).</li>
                <li><strong className="text-[var(--text-primary)]">Portfolio Showcase:</strong> Unless explicitly restricted by an NDA signed prior to development, Launchpad Forge reserves the right to showcase completed public work as a portfolio case study.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">3. Confidentiality & Non-Disclosure</h2>
              <p className="body-md">
                We treat all client business data, user records, proprietary workflow secrets, and architectural blueprints as strictly confidential. We are pleased to execute mutual non-disclosure agreements (NDAs) prior to discovery discussions whenever requested.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">4. Milestone Acceptance & Warranty</h2>
              <p className="body-md">
                Projects are delivered in structured agile milestones with weekly staging previews:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong className="text-[var(--text-primary)]">Acceptance Period:</strong> The Client has a standard 7-business-day review period upon milestone delivery to test functionality against the agreed specification.</li>
                <li><strong className="text-[var(--text-primary)]">30-Day Launch Warranty:</strong> Following production launch, Launchpad Forge provides 30 calendar days of complimentary defect remediation for any bugs attributable to our delivered code.</li>
                <li><strong className="text-[var(--text-primary)]">Ongoing Retainers:</strong> After the warranty window, ongoing feature enhancements, cloud monitoring, and security maintenance are provided via monthly engineering retainers.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">5. Limitation of Liability</h2>
              <p className="body-md">
                In no event shall Launchpad Forge be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, or business data, resulting from third-party cloud service outages, unauthorized third-party breaches outside our systems, or external API modifications.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">6. Inquiries & Legal Contact</h2>
              <p className="body-md">
                For questions regarding these Terms or formal contract execution, please contact our leadership:
              </p>
              <div className="p-6 rounded-2xl glass-elevated border border-[var(--border-subtle)] space-y-2 text-sm">
                <div><strong className="text-[var(--text-primary)]">Agency:</strong> {COMPANY_INFO.name}</div>
                <div><strong className="text-[var(--text-primary)]">Email:</strong> {COMPANY_INFO.email}</div>
                <div><strong className="text-[var(--text-primary)]">Telephone:</strong> {COMPANY_INFO.phone}</div>
                <div><strong className="text-[var(--text-primary)]">Address:</strong> {COMPANY_INFO.address}</div>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
