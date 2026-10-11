"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled ? "py-2.5 sm:py-3" : "py-4 sm:py-5"
        }`}
      >
        <div className="container-forge">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled
                ? "glass-elevated rounded-full px-5 sm:px-6 py-2.5 sm:py-3 shadow-lg shadow-black/20"
                : "px-0"
            }`}
          >
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg p-1"
              aria-label="Launchpad Forge — Homepage"
            >
              <div className="relative w-9 h-9 flex items-center justify-center bg-white rounded-md p-1 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="Launchpad Forge Logo"
                  fill
                  sizes="36px"
                  className="object-contain p-1"
                  priority
                />
              </div>
              <span className="font-bold tracking-tight text-sm text-foreground">
                LAUNCHPAD <span className="text-[var(--accent)]">FORGE</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative text-xs font-semibold tracking-wider uppercase transition-colors duration-200 py-1 ${
                      isActive
                        ? "text-foreground font-bold"
                        : "text-[var(--text-secondary)] hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[var(--accent)] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <MagneticButton
                  variant="primary"
                  href="/contact"
                  cursorText="LET'S BUILD"
                >
                  START A PROJECT →
                </MagneticButton>
              </div>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
                aria-label="Email Launchpad Forge"
              >
                <Mail size={14} className="text-[var(--accent)]" />
                <span className="truncate max-w-[190px]">{COMPANY_INFO.email}</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Accessible Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] bg-[var(--background)]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto pt-24"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-6 items-start max-w-sm mx-auto w-full">
              <div className="label text-[var(--accent)] mb-2">MENU NAVIGATION</div>
              {NAV_LINKS.map((link, i) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-2xl sm:text-3xl font-bold tracking-tight block py-1 transition-colors ${
                        isActive
                          ? "text-[var(--accent)]"
                          : "text-foreground hover:text-[var(--accent)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="max-w-sm mx-auto w-full pt-8 border-t border-white/10 space-y-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full block text-center bg-[var(--accent)] text-foreground font-semibold rounded-xl py-3.5 shadow-lg shadow-[var(--accent)]/20"
              >
                START A PROJECT →
              </Link>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center justify-center gap-2 text-xs text-[var(--text-secondary)] hover:text-foreground py-2"
              >
                <Mail size={14} className="text-[var(--accent)]" />
                {COMPANY_INFO.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
