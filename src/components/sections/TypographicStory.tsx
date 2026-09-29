"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TypographicStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const word3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Word 1: IDEAS → SYSTEMS
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: word1Ref.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
      tl1.fromTo(
        word1Ref.current!.querySelector(".word-from"),
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -50, scale: 0.9 }
      );
      tl1.fromTo(
        word1Ref.current!.querySelector(".word-to"),
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1 },
        "<"
      );

      // Word 2: SYSTEMS → SCALE
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: word2Ref.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
      tl2.fromTo(
        word2Ref.current!.querySelector(".word-from"),
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -50, scale: 0.9 }
      );
      tl2.fromTo(
        word2Ref.current!.querySelector(".word-to"),
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1 },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative">
      {/* Transform 1: IDEAS → SYSTEMS */}
      <div ref={word1Ref} className="h-[60vh] flex items-center justify-center relative">
        <div className="word-from absolute heading-xl gradient-text text-center z-0">
          IDEAS
        </div>
        <div className="word-to absolute heading-xl gradient-text-accent text-center z-10">
          SYSTEMS
        </div>
      </div>

      {/* Transform 2: SYSTEMS → SCALE */}
      <div ref={word2Ref} className="h-[60vh] flex items-center justify-center relative">
        <div className="word-from absolute heading-xl gradient-text-accent text-center z-0">
          SYSTEMS
        </div>
        <div className="word-to absolute heading-xl gradient-text text-center z-10">
          SCALE
        </div>
      </div>
    </section>
  );
}
