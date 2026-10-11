"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const lines = containerRef.current!.querySelectorAll(".reveal-line");

      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            scrollTrigger: {
              trigger: line as HTMLElement,
              start: "top 85%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="section-padding relative">
      <div className="container-forge max-w-5xl">
        {/* Editorial Statement */}
        <div className="mb-24">
          <div className="reveal-line heading-xl mb-4">
            TECHNOLOGY
          </div>
          <div className="reveal-line heading-xl mb-4">
            IS NOT THE
          </div>
          <div className="reveal-line heading-xl gradient-text-accent mb-4">
            DESTINATION.
          </div>
          <div className="h-8" />
          <div className="reveal-line heading-xl mb-4">
            IT&apos;S THE
          </div>
          <div className="reveal-line heading-xl gradient-text-accent">
            LAUNCHPAD.
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl">
          <div className="reveal-line body-lg mb-4">
            Launchpad Forge helps businesses
          </div>
          <div className="reveal-line body-lg mb-4">
            turn ideas, problems and opportunities
          </div>
          <div className="reveal-line body-lg">
            into scalable digital systems.
          </div>
        </div>
      </div>
    </section>
  );
}
