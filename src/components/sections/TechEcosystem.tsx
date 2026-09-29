"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_ECOSYSTEM } from "@/lib/constants";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function TechEcosystem() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const nodes = Object.keys(TECH_ECOSYSTEM);

  // Calculate positions in a circle — smaller radius on mobile
  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = isMobile ? 32 : 38;
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  };

  const handleNodeClick = (node: string) => {
    setActiveNode((prev) => (prev === node ? null : node));
  };

  return (
    <section id="solutions" className="section-padding relative overflow-hidden">
      <div className="container-forge">
        <div className="text-center mb-16">
          <div className="label mb-4">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
            TECHNOLOGY ECOSYSTEM
          </div>
          <h2 className="heading-lg">
            Connected<br />
            <span className="gradient-text-accent">capabilities.</span>
          </h2>
        </div>

        {/* Interactive Network */}
        <div className="relative w-full max-w-4xl mx-auto aspect-square px-2 sm:px-0">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {nodes.map((node, i) => {
              const pos = getNodePosition(i, nodes.length);
              return (
                <line
                  key={`line-${node}`}
                  x1="50"
                  y1="50"
                  x2={pos.x}
                  y2={pos.y}
                  stroke={activeNode === node ? "var(--accent)" : "var(--border-subtle)"}
                  strokeWidth={activeNode === node ? "0.3" : "0.1"}
                  className="transition-all duration-500"
                />
              );
            })}
            {/* Cross connections */}
            {nodes.map((_, i) =>
              nodes.slice(i + 1).map((__, j) => {
                const pos1 = getNodePosition(i, nodes.length);
                const pos2 = getNodePosition(i + j + 1, nodes.length);
                return (
                  <line
                    key={`cross-${i}-${j}`}
                    x1={pos1.x}
                    y1={pos1.y}
                    x2={pos2.x}
                    y2={pos2.y}
                    stroke="var(--border-subtle)"
                    strokeWidth="0.05"
                  />
                );
              })
            )}
          </svg>

          {/* Center Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-[var(--surface-elevated)] border border-[var(--accent)]/40 flex items-center justify-center shadow-[0_0_30px_rgba(232,101,43,0.15)]">
              <div className="text-center">
                <div className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest text-[var(--accent)]">
                  LAUNCHPAD
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest text-foreground">
                  FORGE
                </div>
              </div>
            </div>
          </div>

          {/* Outer Nodes */}
          {nodes.map((node, i) => {
            const pos = getNodePosition(i, nodes.length);
            const isActive = activeNode === node;

            return (
              <motion.div
                key={node}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isActive ? "z-50" : "z-20"}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                whileHover={{ scale: 1.1 }}
                whileFocus={{ scale: 1.1 }}
                onMouseEnter={() => !isMobile && setActiveNode(node)}
                onMouseLeave={() => !isMobile && setActiveNode(null)}
                onClick={() => handleNodeClick(node)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNodeClick(node);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${node} technologies`}
                aria-expanded={isActive}
              >
                <div
                  data-cursor="EXPLORE →"
                  className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                    isActive
                      ? "bg-[var(--accent)] shadow-[0_0_40px_var(--accent-glow)] border-transparent"
                      : "bg-[var(--surface-elevated)] border border-border-subtle hover:border-[var(--accent)]/50"
                  }`}
                >
                  <span
                    className={`text-[8px] sm:text-[9px] md:text-[10px] font-semibold tracking-widest ${
                      isActive ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {node}
                  </span>
                </div>

                {/* Expanded Tech List */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 glass-elevated rounded-xl p-4 min-w-[180px] z-30"
                    >
                      {TECH_ECOSYSTEM[node]?.map((tech, ti) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: ti * 0.05 }}
                          className="text-xs text-[var(--text-secondary)] py-1.5 border-b border-white/5 last:border-0 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                          {tech}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
