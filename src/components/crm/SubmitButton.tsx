"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SubmitButtonProps {
  label: string;
  loadingLabel?: string;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
}

export function SubmitButton({
  label,
  loadingLabel = "Saving...",
  className,
  variant = "primary"
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const baseStyles = "flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium rounded-md transition-all shadow-lg";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent/90 shadow-accent/20",
    secondary: "bg-surface-elevated text-text-primary hover:bg-surface-elevated/80 border border-border-subtle",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20",
  };

  return (
    <motion.button
      whileTap={{ scale: pending ? 1 : 0.97 }}
      type="submit"
      disabled={pending}
      className={cn(baseStyles, variants[variant], pending && "opacity-70 cursor-not-allowed", className)}
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? loadingLabel : label}
    </motion.button>
  );
}
