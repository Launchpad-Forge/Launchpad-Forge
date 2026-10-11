"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  { prefix: "WE DON'T JUST", emphasis: "WRITE CODE." },
  { prefix: "WE ENGINEER", emphasis: "SYSTEMS." },
  { prefix: "WE AUTOMATE", emphasis: "OPERATIONS." },
  { prefix: "WE BUILD", emphasis: "FOR SCALE." },
];

export default function WhyLaunchpadForge() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const statements = containerRef.current!.querySelectorAll(".statement");

      statements.forEach((statement, i) => {
        gsap.fromTo(
          statement,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: statement as HTMLElement,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-20 md:py-32">
      <div className="container-forge space-y-[16vh]">
        {STATEMENTS.map((statement, i) => (
          <div key={i} className="statement min-h-[40vh] flex items-center justify-center">
            <div className="text-center">
              <div className="heading-lg text-[var(--text-muted)] mb-2">
                {statement.prefix}
              </div>
              <div className="heading-xl gradient-text-accent">
                {statement.emphasis}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
