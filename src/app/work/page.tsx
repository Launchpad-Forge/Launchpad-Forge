import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import WorkGalleryClient from "./WorkGalleryClient";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Case Studies & Selected Systems | Launchpad Forge",
  description: "Browse verified engineering case studies from Launchpad Forge: fleet telemetry systems, enterprise RAG copilots, WhatsApp automation pipelines, and headless eCommerce platforms.",
  openGraph: {
    title: "Case Studies & Selected Systems | Launchpad Forge",
    description: "Real-world engineering case studies with verified outcomes, architecture blueprints, and technologies used.",
    url: `${COMPANY_INFO.url}/work`,
  },
};

export default function WorkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        {/* Header */}
        <section className="container-forge mb-12 sm:mb-16">
          <div className="max-w-4xl">
            <div className="label mb-4 text-[var(--accent)] flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--accent)]" />
              PORTFOLIO & CASE STUDIES
            </div>
            <h1 className="heading-xl mb-6">
              Systems engineered with <span className="gradient-text-accent">proven outcomes.</span>
            </h1>
            <p className="body-lg text-[var(--text-secondary)] max-w-2xl">
              We focus on solving complex business challenges with clean code, intuitive user interfaces, and automated workflows. Each case study represents real engineering work with defensible results.
            </p>
          </div>
        </section>

        {/* Interactive Filterable Gallery */}
        <section className="container-forge">
          <WorkGalleryClient />
        </section>
      </main>

      <Footer />
    </div>
  );
}
