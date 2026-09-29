"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { 
  Layout, Smartphone, Brain, Workflow, Database, Cloud, Shield, 
  Network, PenTool, TrendingUp, Palette, Cpu, Atom, CheckCircle, 
  Lightbulb, RefreshCw, ArrowRight, X, Check
} from "lucide-react";

const icons = { 
  Layout, Smartphone, Brain, Workflow, Database, Cloud, Shield, 
  Network, PenTool, TrendingUp, Palette, Cpu, Atom, CheckCircle, 
  Lightbulb, RefreshCw 
};

export default function WhatWeBuild() {
  const [activeService, setActiveService] = useState<typeof SERVICES[number] | null>(null);

  return (
    <section id="services" className="relative py-20 lg:py-32">
      <div className="container-forge">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              End-to-End Digital Solutions <br className="hidden md:block" /> Built for <span className="text-[var(--accent)] font-serif italic">Growth.</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-lg">
              From powerful websites to intelligent automations, we deliver solutions that
              help your business stand out, scale faster, and stay ahead.
            </p>
            <button className="rounded-full border border-border-subtle hover:border-[var(--accent)] text-foreground px-8 py-3 text-sm font-medium hover:bg-foreground/5 transition-colors duration-300 flex items-center gap-3 group w-fit">
              Explore All Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[var(--accent)]" />
            </button>
          </div>

          {/* Image Section */}
          <div className="relative h-64 md:h-80 lg:h-[400px] rounded-3xl overflow-hidden border border-white/5 bg-[var(--surface)] hidden md:block">
            <div 
              className="absolute inset-0 opacity-40"
              style={{ background: "linear-gradient(135deg, var(--surface-elevated) 0%, color-mix(in srgb, var(--surface), var(--accent) 15%) 50%, var(--surface-elevated) 100%)" }}
            />
            <div className="absolute inset-0 grid-overlay opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const IconComponent = icons[service.icon as keyof typeof icons];
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                key={service.id}
                onClick={() => setActiveService(service as any)}
                className="group p-8 rounded-3xl border border-white/5 bg-[var(--surface)] hover:border-[var(--accent)]/30 transition-colors duration-500 flex flex-col justify-between min-h-[320px] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center bg-foreground/5 group-hover:bg-[var(--accent)]/10 transition-colors duration-500">
                      {IconComponent && <IconComponent size={20} className="text-[var(--accent)]" />}
                    </div>
                    <span className="text-[var(--accent)] text-xs font-bold tracking-widest">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-foreground transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors py-2">
                  Learn More
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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

function ModalOverlay({ service, onClose }: { service: typeof SERVICES[number]; onClose: () => void }) {
  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-elevated border border-border-subtle rounded-3xl p-8 md:p-10 max-w-2xl w-full relative shadow-[0_0_50px_rgba(232,101,43,0.15)] max-h-[90dvh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full border border-[var(--accent)]/30 flex items-center justify-center bg-[var(--accent)]/10">
            {(() => {
              const Icon = icons[service.icon as keyof typeof icons];
              return Icon ? <Icon size={20} className="text-[var(--accent)]" /> : null;
            })()}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h3>
        </div>
        
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 border-b border-border-subtle pb-8">
          {service.description}
        </p>
        
        <div className="space-y-4">
          <h4 className="font-bold text-[var(--accent)] tracking-widest text-sm uppercase mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)]" /> What We Build
          </h4>
          {service.details?.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-[var(--accent)]" />
              </div>
              <span className="text-foreground/90 text-base">{detail}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-10 pt-8">
          <button 
            onClick={() => {
              onClose();
              setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                  const top = element.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top });
                }
              }, 300);
            }}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-foreground font-medium rounded-xl py-4 transition-all duration-300 shadow-[0_0_20px_rgba(232,101,43,0.2)] hover:shadow-[0_0_30px_rgba(232,101,43,0.4)]"
          >
            Discuss this with us →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

