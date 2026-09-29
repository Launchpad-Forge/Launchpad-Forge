"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What exactly do you build?",
    answer: "We engineer end-to-end digital systems. This ranges from high-performance websites and mobile apps to custom AI integrations, n8n automations, and scalable cloud infrastructure. Everything is custom-tailored to your business."
  },
  {
    question: "Do you use templates or build custom solutions?",
    answer: "Everything we build is custom-engineered from the ground up for your specific business needs. We focus on scalable architecture, premium design, and optimal performance rather than limiting off-the-shelf templates."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines vary based on scope and complexity. A premium marketing website might take 2-4 weeks, while a full custom SaaS platform, mobile app, or complex AI automation system can take 2-4 months to build and deploy."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we offer dedicated monthly retainers for continuous development, security updates, cloud management, and SEO/growth optimization. We act as your long-term technology partner to ensure your systems scale with you."
  }
];

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

        <div className="space-y-4">
          {faqs.map((faq, index) => {
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
                  <span className="text-lg font-medium text-foreground pr-8">{faq.question}</span>
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
                      <div className="p-6 pt-0 text-[var(--text-secondary)] leading-relaxed">
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
      </div>
    </section>
  );
}

