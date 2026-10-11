"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_CATALOG, type ServiceItem } from "@/lib/constants";
import { 
  Layout, Smartphone, Brain, Workflow, Database, Cloud, Shield, 
  Layers, ArrowRight, X, Check, ArrowUpRight
} from "lucide-react";

const ICONS_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = { 
  Layout, 
  Smartphone, 
  Brain, 
  Workflow, 
  Database, 
  Cloud, 
  Shield, 
  Layers
};

export default function WhatWeBuild() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_CATALOG);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    import("@/app/crm/services/actions")
      .then(({ getServicesAction }) => {
        getServicesAction().then((data) => {
          if (data && data.length > 0) {
            setServices(
              data.map((d: any, idx: number) => ({
                id: d.id || `service-${idx}`,
                slug: d.slug || SERVICES_CATALOG[idx]?.slug || "service",
                number: d.number || String(idx + 1).padStart(2, "0"),
                title: d.title,
                shortTitle: d.title,
                tagline: d.description || "",
                description: d.description || "",
                icon: d.icon || SERVICES_CATALOG[idx]?.icon || "Layout",
                customerProblem: d.customerProblem || SERVICES_CATALOG[idx]?.customerProblem || "",
                targetAudience: d.targetAudience || SERVICES_CATALOG[idx]?.targetAudience || "",
                whatsIncluded: Array.isArray(d.details) ? d.details : (SERVICES_CATALOG[idx]?.whatsIncluded || []),
                engagementModel: SERVICES_CATALOG[idx]?.engagementModel || "Sprint based",
                deliverables: SERVICES_CATALOG[idx]?.deliverables || [],
                technologies: SERVICES_CATALOG[idx]?.technologies || ["TypeScript", "Next.js"],
                faqs: SERVICES_CATALOG[idx]?.faqs || [],
              }))
            );
          }
        });
      })
      .catch(() => {});
  }, []);

  return (
    <section id="services" className="relative py-20 lg:py-32">
      <div className="container-forge">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-center">
          <div>
            <div className="label mb-4">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
              02 / CAPABILITIES & SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              End-to-End Digital Solutions <br className="hidden md:block" /> Built for <span className="text-[var(--accent)] font-serif italic">Growth.</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-lg">
              From high-converting web applications to autonomous AI workflows and resilient cloud backends, we engineer systems that help your business scale with precision.
            </p>
            <Link
              href="/services"
              className="rounded-full border border-border-subtle hover:border-[var(--accent)] text-foreground px-8 py-3.5 text-xs font-bold tracking-wider uppercase hover:bg-foreground/5 transition-all duration-300 flex items-center gap-3 group w-fit"
            >
              Explore All 6 Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[var(--accent)]" />
            </Link>
          </div>

          {/* Image Section */}
          <div className="relative h-64 md:h-80 lg:h-[400px] rounded-3xl overflow-hidden border border-border-subtle bg-[var(--surface)] hidden md:block">
            <Image 
              src="/what_we_build_bg.jpg"
              alt="Launchpad Forge digital system architecture"
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="hidden dark:block object-cover opacity-60 mix-blend-luminosity"
            />
            <Image 
              src="/what_we_build_bg_light.jpg"
              alt="Launchpad Forge digital system architecture"
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="block dark:hidden object-cover opacity-80 mix-blend-luminosity"
            />
            <div className="absolute inset-0 grid-overlay opacity-20 dark:opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-[var(--surface)]/30" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = ICONS_MAP[service.icon] || Layout;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                key={service.slug}
                className="group p-8 rounded-3xl border border-white/5 bg-[var(--surface)] hover:border-[var(--accent)]/30 transition-all duration-500 flex flex-col justify-between min-h-[340px] relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center bg-foreground/5 group-hover:bg-[var(--accent)]/10 transition-colors duration-500">
                      <IconComponent size={20} className="text-[var(--accent)]" />
                    </div>
                    <span className="text-[var(--accent)] text-xs font-bold tracking-widest">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-foreground text-foreground/95 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setActiveService(service)}
                    className="text-xs font-bold tracking-wider uppercase text-[var(--accent)] hover:text-foreground transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:underline"
                    aria-label={`Quick preview for ${service.title}`}
                  >
                    Quick Specs
                  </button>

                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 group-hover:translate-x-0.5"
                  >
                    Full Details <ArrowUpRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeService && (
          <ModalOverlay service={activeService} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ModalOverlay({ service, onClose }: { service: ServiceItem; onClose: () => void }) {
  const Icon = ICONS_MAP[service.icon] || Layout;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-elevated border border-border-subtle rounded-3xl p-6 sm:p-10 max-w-2xl w-full relative shadow-[0_0_50px_rgba(232,101,43,0.15)] max-h-[90dvh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-foreground transition-colors p-2"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full border border-[var(--accent)]/30 flex items-center justify-center bg-[var(--accent)]/10 flex-shrink-0">
            <Icon size={22} className="text-[var(--accent)]" />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest text-[var(--accent)] uppercase">{service.number} / SERVICE SPEC</div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h3>
          </div>
        </div>
        
        <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed mb-6 border-b border-border-subtle pb-6">
          {service.description}
        </p>

        {/* The Problem Solved */}
        <div className="mb-6 bg-foreground/5 rounded-2xl p-4 sm:p-5 border border-white/5">
          <h4 className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2">The Problem We Solve</h4>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{service.customerProblem}</p>
        </div>
        
        <div className="space-y-3 mb-8">
          <h4 className="font-bold text-foreground tracking-widest text-xs uppercase flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-[var(--accent)]" /> What Is Included
          </h4>
          {service.whatsIncluded?.map((detail: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <Check size={16} className="text-[var(--accent)] mt-1 flex-shrink-0" />
              <span className="text-foreground/90 text-sm leading-relaxed">{detail}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row gap-4">
          <Link
            href={`/services/${service.slug}`}
            onClick={onClose}
            className="flex-1 text-center bg-transparent border border-border-subtle hover:border-[var(--accent)] text-foreground font-semibold rounded-xl py-3.5 text-sm transition-colors"
          >
            Full Service Page →
          </Link>
          <Link
            href={`/contact?service=${service.slug}`}
            onClick={onClose}
            className="flex-1 text-center bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-foreground font-semibold rounded-xl py-3.5 text-sm transition-all shadow-[0_0_20px_rgba(232,101,43,0.3)]"
          >
            Start a Project →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

