"use client";
import { NAV_LINKS } from "@/lib/constants";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[var(--background)]">
      <div className="container-forge py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-md p-1">
                <Image
                  src="/logo.png"
                  alt="Launchpad Forge"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <span className="font-semibold tracking-tight text-sm">
                LAUNCHPAD FORGE
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-xs">
              We build the digital infrastructure behind ambitious businesses — from software and AI to automation and cloud systems.
            </p>
            <p className="label text-[var(--text-muted)]">
              BUILD. AUTOMATE. GROW.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
              Get in touch
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:launchpadforge1618@gmail.com"
                className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors duration-300 flex items-center gap-2"
              >
                <Mail size={14} className="text-[var(--accent)]" />
                launchpadforge1618@gmail.com
              </a>
              <div className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                <MapPin size={14} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Launchpad Forge. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <span>Designed & engineered with</span>
            <span className="text-[var(--accent)]">precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
