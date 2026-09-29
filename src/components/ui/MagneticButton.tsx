"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  cursorText?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
  cursorText,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center gap-2 font-medium tracking-wider text-xs uppercase transition-all duration-300";

  const variantStyles = {
    primary:
      "px-8 py-4 bg-[var(--accent)] text-foreground rounded-full hover:shadow-[0_0_30px_var(--accent-glow)] hover:scale-105",
    secondary:
      "px-8 py-4 border border-border-subtle text-foreground rounded-full hover:border-[var(--accent)]/50 hover:bg-foreground/5",
    ghost:
      "px-4 py-2 text-[var(--text-secondary)] hover:text-foreground",
  };

  const MotionTag = href ? motion.a : motion.button;

  return (
    <MotionTag
      ref={ref as any}
      href={href}
      onClick={onClick}
      data-cursor={cursorText}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </MotionTag>
  );
}

