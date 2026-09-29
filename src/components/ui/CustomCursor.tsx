"use client";
import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsTouch } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const isTouch = useIsTouch();
  const { smoothPosition } = useMousePosition(!isTouch);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], [role='button'], input, textarea, select"
      );
      if (interactive) {
        setIsHovering(true);
        const cursorText = interactive.getAttribute("data-cursor");
        setHoverText(cursorText || null);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], [role='button'], input, textarea, select"
      );
      if (interactive) {
        setIsHovering(false);
        setHoverText(null);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isTouch]);

  // Hide native cursor on desktop
  useEffect(() => {
    if (isTouch) return;
    document.body.style.cursor = 'none';
    // Also add cursor:none to all interactive elements
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);
    return () => {
      document.body.style.cursor = '';
      style.remove();
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${smoothPosition.x}px, ${smoothPosition.y}px)`;
    }
    if (cursorOuterRef.current) {
      cursorOuterRef.current.style.transform = `translate(${smoothPosition.x}px, ${smoothPosition.y}px)`;
    }
  }, [smoothPosition, isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10001] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            isHovering
              ? "w-16 h-16 bg-[var(--accent)]/20 backdrop-blur-sm"
              : "w-2 h-2 bg-foreground"
          }`}
        />
      </div>

      {/* Outer ring */}
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 z-[10001] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-300 flex items-center justify-center ${
            isHovering
              ? "w-20 h-20 border-[var(--accent)]/40"
              : "w-8 h-8 border-foreground/20"
          }`}
        >
          {hoverText && (
            <span className="text-[8px] font-bold tracking-widest text-foreground whitespace-nowrap">
              {hoverText}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
