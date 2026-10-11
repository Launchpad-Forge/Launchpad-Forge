"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight, ShieldCheck, FileText } from "lucide-react";
import { NAV_LINKS, SERVICES_CATALOG, COMPANY_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[var(--background)] z-10" aria-label="Site Footer">
      <div className="container-forge py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-md p-1 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="Launchpad Forge"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <span className="font-bold tracking-tight text-base text-foreground">
                LAUNCHPAD <span className="text-[var(--accent)]">FORGE</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-sm">
              We engineer the digital infrastructure behind ambitious companies — from custom web applications and AI copilots to event-driven automations and cloud systems.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">
              <span className="w-6 h-px bg-[var(--accent)]" />
              BUILD. AUTOMATE. SCALE.
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors duration-200 flex items-center gap-1 group w-fit"
                >
                  {link.label}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
              Solutions
            </h4>
            <div className="flex flex-col gap-3">
              {SERVICES_CATALOG.slice(0, 4).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors duration-200 truncate max-w-[200px]"
                >
                  {service.shortTitle}
                </Link>
              ))}
              <Link
                href="/services"
                className="text-xs font-semibold text-[var(--accent)] hover:underline mt-1"
              >
                All 6 Services →
              </Link>
            </div>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors duration-200 flex items-center gap-2 break-all"
              >
                <Mail size={14} className="text-[var(--accent)] flex-shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                <MapPin size={14} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </div>
            </div>

            <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-3">
              Legal & Trust
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/privacy"
                className="text-xs text-[var(--text-muted)] hover:text-foreground transition-colors duration-200 flex items-center gap-1.5"
              >
                <ShieldCheck size={12} className="text-[var(--accent)]" />
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-[var(--text-muted)] hover:text-foreground transition-colors duration-200 flex items-center gap-1.5"
              >
                <FileText size={12} className="text-[var(--accent)]" />
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span>Engineered with Next.js 16 & React 19</span>
            <span className="text-[var(--accent)]">•</span>
            <span>Zero generic templates</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
