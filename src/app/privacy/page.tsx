import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { COMPANY_INFO } from "@/lib/constants";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Launchpad Forge",
  description: "Our privacy policy explains how Launchpad Forge collects, processes, and protects your information when you contact us or partner on software projects.",
  openGraph: {
    title: "Privacy Policy | Launchpad Forge",
    url: `${COMPANY_INFO.url}/privacy`,
  },
};

export default function PrivacyPage() {
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
              <Shield className="w-4 h-4" />
              <span>LEGAL POLICIES</span>
            </div>
            <h1 className="heading-xl mb-4">Privacy Policy</h1>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Last updated: October 2026
            </p>
          </header>

          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">
            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">1. Overview</h2>
              <p className="body-md">
                Launchpad Forge (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the personal and proprietary operational information you provide through our website ({COMPANY_INFO.url}) and during commercial client engagements.
              </p>
              <p className="body-md">
                This Privacy Policy outlines how we collect, handle, store, and protect your data when you submit inquiries, book discovery calls, or collaborate with us on custom software engineering.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">2. Information We Collect</h2>
              <p className="body-md">
                We only collect information directly provided by you through our contact forms or direct communications:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong className="text-[var(--text-primary)]">Contact Details:</strong> Your name, work email address, phone/WhatsApp number, and company name.</li>
                <li><strong className="text-[var(--text-primary)]">Project Requirements:</strong> Preferred services, budget ballpark, target launch timeline, and description of your business needs or system bottlenecks.</li>
                <li><strong className="text-[var(--text-primary)]">Technical Context:</strong> Any existing repository links, API documentation, or architecture diagrams you choose to submit for project discovery.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">3. How We Use Your Data</h2>
              <p className="body-md">
                We use collected information solely for genuine business purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>To review, evaluate, and respond to your engineering inquiries.</li>
                <li>To prepare technical proposals, milestone scopes, and architectural estimates.</li>
                <li>To fulfill our contractual development obligations upon signing an engagement agreement.</li>
                <li>To maintain our internal CRM records regarding active client projects.</li>
              </ul>
              <p className="body-md">
                We never sell, rent, or trade your personal or business data to advertisers or third-party lead brokers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">4. AI Systems & Zero-Data-Retention Commitment</h2>
              <p className="body-md">
                When architecting AI solutions, RAG knowledge systems, or automated copilots for clients:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>We exclusively use enterprise-grade API endpoints that enforce zero data retention policies.</li>
                <li>Your proprietary business data, customer records, and internal documents are never used to train or fine-tune public foundation models.</li>
                <li>Where requested, we deploy self-hosted open-weights models inside your isolated private virtual cloud (VPC).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">5. Data Retention & Your Rights</h2>
              <p className="body-md">
                We retain client project notes for the duration of the engagement and required accounting periods. You have the right at any time to request access to the data we hold about you, request corrections, or ask for complete deletion of your contact records.
              </p>
              <p className="body-md">
                To exercise any of these rights, contact us directly at <a href={`mailto:${COMPANY_INFO.email}`} className="text-[var(--accent)] underline">{COMPANY_INFO.email}</a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="heading-sm text-[var(--text-primary)]">6. Contact Information</h2>
              <p className="body-md">
                If you have questions regarding this Privacy Policy, please contact our team:
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
