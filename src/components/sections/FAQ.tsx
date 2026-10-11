"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 lg:py-32 bg-[var(--background)]">
      <div className="container-forge max-w-4xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4 text-[var(--accent)]">
            <MessageCircle size={20} />
            <span className="text-sm font-bold tracking-widest uppercase">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Got Questions? <br className="md:hidden"/> <span className="text-[var(--accent)] font-serif italic">We've got answers.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">Everything you need to know about working with us.</p>
        </div>

        <div className="space-y-4 mb-12">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border border-border-subtle rounded-2xl bg-[var(--surface)] overflow-hidden transition-colors duration-300 hover:border-[var(--accent)]/30"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base sm:text-lg font-medium text-foreground pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={`text-[var(--accent)] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                        <div className="w-full h-px bg-foreground/5 mb-6" />
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="glass-elevated rounded-2xl p-6 sm:p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 border border-border-subtle">
          <div className="text-left">
            <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">Have a custom question or specific requirements?</h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">We answer technical inquiries within 24 business hours.</p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-[var(--accent)]/90 transition-all shadow-md shadow-[var(--accent)]/20"
          >
            Ask Us Directly <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

