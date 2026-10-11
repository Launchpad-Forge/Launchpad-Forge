"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IDEA_TO_IMPACT_STAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function IdeaToImpact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      <div className="container-forge">
        <div className="text-center mb-20">
          <div className="label mb-4">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
            OUR PROCESS
          </div>
          <h2 className="heading-lg">
            From idea<br />
            <span className="gradient-text-accent">to impact.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glowing Path Background */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-foreground/5" />
          {/* Animated Progress Line */}
          <div
            ref={pathRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px origin-top transition-all duration-100"
            style={{
              height: `${progress * 100}%`,
              background: `linear-gradient(to bottom, var(--accent), transparent)`,
              boxShadow: `0 0 10px var(--accent-glow)`,
            }}
          />

          {/* Stages */}
          <div className="relative space-y-24 md:space-y-32">
            {IDEA_TO_IMPACT_STAGES.map((stage, i) => {
              const stageProgress = Math.min(
                1,
                Math.max(0, (progress - i / IDEA_TO_IMPACT_STAGES.length) * IDEA_TO_IMPACT_STAGES.length)
              );
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={stage.label}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  {/* Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div
                      className="w-4 h-4 rounded-full border-2 transition-all duration-500"
                      style={{
                        borderColor:
                          stageProgress > 0.3
                            ? "var(--accent)"
                            : "var(--border-subtle)",
                        background:
                          stageProgress > 0.3
                            ? "var(--accent)"
                            : "var(--background)",
                        boxShadow:
                          stageProgress > 0.3
                            ? "0 0 20px var(--accent-glow)"
                            : "none",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    } text-center md:text-inherit`}
                    style={{
                      opacity: 0.2 + stageProgress * 0.8,
                      transform: `translateY(${(1 - stageProgress) * 20}px)`,
                      transition: "all 0.3s ease-out",
                    }}
                  >
                    <div className="label mb-2 text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="heading-md mb-2">{stage.label}</h3>
                    <p className="body-md">{stage.description}</p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

