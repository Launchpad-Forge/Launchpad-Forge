"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Suppress THREE.Clock deprecation warning from @react-three/fiber
if (typeof console !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === "string" && args[0].includes("THREE.Clock: This module has been deprecated")) {
      return;
    }
    originalWarn(...args);
  };
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Skip smooth scrolling when user prefers reduced motion
    if (prefersReduced) {
      // Still set up ScrollTrigger refresh on resize for GSAP animations
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(document.body);
      return () => resizeObserver.disconnect();
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when DOM size changes (e.g. from dynamic imports)
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, [prefersReduced]);

  return <>{children}</>;
}
