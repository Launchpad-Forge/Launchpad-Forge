"use client";
import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroScene from "@/components/three/HeroScene";
import { SCROLL_STAGES } from "@/lib/constants";
import { useIsMobile } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: false,
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          setCurrentStage(Math.floor(self.progress * SCROLL_STAGES.length));
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stageIndex = Math.min(currentStage, SCROLL_STAGES.length - 1);

  return (
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
          {!isMobile && (
            <Suspense fallback={null}>
              <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
              >
                <HeroScene scrollProgress={scrollProgress} />
              </Canvas>
            </Suspense>
          )}

          {/* Mobile gradient fallback */}
          {isMobile && (
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--surface)] to-[var(--background)]">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
                style={{
                  background: `radial-gradient(circle, var(--accent-glow), transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />
            </div>
          )}
        </div>

        {/* Hero Content — Initial */}
        <div
          className="relative z-10 h-full flex flex-col justify-center container-forge"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            <div className="label mb-6">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
              TECHNOLOGY COMPANY
            </div>

            <h1 className="heading-xl mb-6 max-w-4xl">
              <span className="block">BUILD.</span>
              <span className="block gradient-text-accent">AUTOMATE.</span>
              <span className="block">GROW.</span>
            </h1>

            <p className="heading-sm text-[var(--text-secondary)] mb-4 max-w-2xl font-normal">
              We build the digital infrastructure
              behind ambitious businesses.
            </p>

            <p className="body-lg max-w-xl mb-10">
              From software and AI to automation,
              data and cloud infrastructure,
              we turn complex business problems
              into scalable digital systems.
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton
                variant="primary"
                href="#contact"
                cursorText="START"
              >
                START A PROJECT →
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                href="#work"
                cursorText="EXPLORE →"
              >
                EXPLORE OUR WORK
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Scroll Stage Labels */}
        <div className="absolute inset-0 z-10 flex items-center justify-center md:justify-end pointer-events-none md:pr-12 lg:pr-32">
          <AnimatePresence>
            {scrollProgress > 0.15 && (
              <motion.div
                key={stageIndex}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="text-center md:text-right max-w-[90vw] sm:max-w-sm lg:max-w-md bg-[var(--background)]/40 md:bg-transparent px-4 py-6 sm:p-6 rounded-2xl backdrop-blur-md md:backdrop-blur-none"
              >
                <div className="label mb-2 md:mb-4 text-[var(--accent)]">
                  STAGE {String(stageIndex + 1).padStart(2, "0")}
                </div>
                <div className="heading-lg bg-gradient-to-br from-white to-[var(--accent)] bg-clip-text text-transparent">
                  {SCROLL_STAGES[stageIndex]?.label}
                </div>
                <div className="body-lg mt-2 md:mt-4 text-foreground">
                  {SCROLL_STAGES[stageIndex]?.sublabel}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          {scrollProgress < 0.05 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.5 }}
              className="flex flex-col items-center gap-2 text-[var(--text-muted)]"
            >
              <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-px h-8 bg-gradient-to-b from-[var(--accent)] to-transparent"
              />
            </motion.div>
          )}
        </div>

        {/* Stage Progress Dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
          {SCROLL_STAGES.map((stage, i) => (
            <div
              key={stage.label}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i <= stageIndex
                  ? "bg-[var(--accent)] scale-125"
                  : "bg-white/10"
              }`}
              title={stage.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

