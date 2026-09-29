"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Smartphone, Brain, Workflow, Users,
  BarChart3, Layers, ArrowDown, Check,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const COMPONENTS = [
  { id: "website", label: "WEBSITE", icon: Globe },
  { id: "app", label: "APP", icon: Smartphone },
  { id: "ai", label: "AI", icon: Brain },
  { id: "automation", label: "AUTOMATION", icon: Workflow },
  { id: "crm", label: "CRM", icon: Users },
  { id: "dashboard", label: "DASHBOARD", icon: BarChart3 },
  { id: "saas", label: "SaaS", icon: Layers },
];

const ARCHITECTURE_LAYERS = [
  "FRONTEND",
  "API",
  "DATABASE",
  "AI",
  "AUTOMATION",
  "ANALYTICS",
];

export default function SystemBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isBuilt, setIsBuilt] = useState(false);

  const toggleComponent = (id: string) => {
    setIsBuilt(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBuild = () => {
    if (selected.size > 0) setIsBuilt(true);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-forge">
        <div className="text-center mb-16">
          <div className="label mb-4">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
            INTERACTIVE
          </div>
          <h2 className="heading-lg mb-4">
            What could we<br />
            <span className="gradient-text-accent">build for you?</span>
          </h2>
          <p className="body-lg max-w-xl mx-auto">
            Select the components you need and watch your system come together.
          </p>
        </div>

        {/* Component Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {COMPONENTS.map(({ id, label, icon: Icon }) => {
            const isSelected = selected.has(id);
            return (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleComponent(id)}
                data-cursor="SELECT"
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 border ${
                  isSelected
                    ? "bg-[var(--accent)] text-foreground border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] border-white/5 hover:border-[var(--accent)]/30"
                }`}
              >
                <Icon size={14} />
                {label}
                {isSelected && <Check size={12} />}
              </motion.button>
            );
          })}
        </div>

        {/* Architecture Visualization */}
        <AnimatePresence mode="wait">
          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-12"
            >
              <div className="space-y-0">
                {ARCHITECTURE_LAYERS.map((layer, i) => {
                  const isRelevant =
                    (layer === "FRONTEND" && (selected.has("website") || selected.has("app") || selected.has("dashboard") || selected.has("saas"))) ||
                    (layer === "API" && selected.size > 0) ||
                    (layer === "DATABASE" && selected.size > 0) ||
                    (layer === "AI" && selected.has("ai")) ||
                    (layer === "AUTOMATION" && selected.has("automation")) ||
                    (layer === "ANALYTICS" && (selected.has("dashboard") || selected.has("crm") || selected.size >= 3));

                  if (!isRelevant) return null;

                  return (
                    <motion.div
                      key={layer}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 glass-elevated rounded-xl px-6 py-4 text-center">
                          <span className="text-xs font-semibold tracking-widest">
                            {layer}
                          </span>
                        </div>
                      </div>
                      {i < ARCHITECTURE_LAYERS.filter((_, idx) => {
                        const l = ARCHITECTURE_LAYERS[idx];
                        return (
                          (l === "FRONTEND" && (selected.has("website") || selected.has("app") || selected.has("dashboard") || selected.has("saas"))) ||
                          (l === "API" && selected.size > 0) ||
                          (l === "DATABASE" && selected.size > 0) ||
                          (l === "AI" && selected.has("ai")) ||
                          (l === "AUTOMATION" && selected.has("automation")) ||
                          (l === "ANALYTICS" && (selected.has("dashboard") || selected.has("crm") || selected.size >= 3))
                        );
                      }).length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowDown
                            size={16}
                            className="text-[var(--accent)] opacity-40"
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Build Button */}
              <div className="flex justify-center mt-8">
                {!isBuilt ? (
                  <MagneticButton variant="primary" onClick={handleBuild}>
                    BUILD THIS SYSTEM →
                  </MagneticButton>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="heading-sm gradient-text-accent mb-4">
                      YOUR SYSTEM IS READY
                    </div>
                    <MagneticButton
                      variant="primary"
                      href="#contact"
                      cursorText="LET'S BUILD"
                    >
                      START A PROJECT →
                    </MagneticButton>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

