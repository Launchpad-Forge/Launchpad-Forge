"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ConstellationScene from "@/components/three/ConstellationScene";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { TECHNOLOGIES } from "@/lib/constants";

function MobileFallback() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {TECHNOLOGIES.map((tech) => (
        <div
          key={tech}
          className="glass-elevated rounded-xl px-3 py-3 text-center text-[10px] font-medium tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/20 transition-all duration-300"
        >
          {tech}
        </div>
      ))}
    </div>
  );
}

export default function TechConstellation() {
  const isMobile = useIsMobile();

  return (
    <section id="insights" className="section-padding relative">
      <div className="container-forge">
        <div className="text-center mb-16">
          <div className="label mb-4">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
            TECHNOLOGY STACK
          </div>
          <h2 className="heading-lg">
            Our<br />
            <span className="gradient-text-accent">technology.</span>
          </h2>
          <p className="body-lg mt-4 max-w-lg mx-auto">
            The tools, frameworks and platforms we use to build exceptional digital systems.
          </p>
        </div>

        {!isMobile ? (
          <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/5 bg-[var(--surface)]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                Loading constellation...
              </div>
            }>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
              >
                <ConstellationScene />
              </Canvas>
            </Suspense>
          </div>
        ) : (
          <MobileFallback />
        )}
      </div>
    </section>
  );
}
