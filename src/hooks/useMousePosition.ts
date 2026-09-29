"use client";
import { useState, useEffect, useCallback, useRef } from "react";

export function useMousePosition(enabled = true) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY };
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (posRef.current.x - prev.x) * 0.15,
        y: prev.y + (posRef.current.y - prev.y) * 0.15,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, enabled]);

  return { position, smoothPosition };
}
