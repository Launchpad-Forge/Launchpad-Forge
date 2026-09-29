"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"lf" | "full" | "line" | "done">("lf");
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on repeat visits within the same session
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("lf-loaded")) {
      setPhase("done");
      return;
    }

    const timeline = gsap.timeline();

    // Phase 1: Show LF
    timeline.to({}, { duration: 0.6, onComplete: () => setPhase("full") });

    // Phase 2: Show LAUNCHPAD FORGE
    timeline.to({}, { duration: 0.8, onComplete: () => setPhase("line") });

    // Phase 3: Line animation
    timeline.to({}, {
      duration: 0.6,
      onStart: () => {
        if (lineRef.current) {
          gsap.fromTo(lineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power2.inOut" }
          );
        }
      },
    });

    // Phase 4: Exit
    timeline.to({}, {
      duration: 0.3,
      onComplete: () => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
              setPhase("done");
              if (typeof sessionStorage !== "undefined") {
                sessionStorage.setItem("lf-loaded", "1");
              }
            },
          });
        }
      },
    });

    return () => { timeline.kill(); };
  }, []);

  if (phase === "done") return null;

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          {phase === "lf" && (
            <motion.div
              key="lf"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={120} 
                height={120} 
                className="w-20 md:w-24 h-auto object-contain drop-shadow-[0_0_15px_rgba(197,168,92,0.5)]"
                priority
              />
            </motion.div>
          )}

          {(phase === "full" || phase === "line") && (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="text-3xl md:text-5xl font-bold tracking-tight"
              >
                LAUNCHPAD
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-3xl md:text-5xl font-bold tracking-tight gradient-text-accent"
              >
                FORGE
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          ref={lineRef}
          className="w-48 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
