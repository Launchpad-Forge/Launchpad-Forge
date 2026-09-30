"use client";
import { useState } from "react";
import { CheckCircle2, CheckSquare } from "lucide-react";

export function InteractiveCheck({ type = "circle" }: { type?: "circle" | "square" }) {
  const [checked, setChecked] = useState(false);
  const Icon = type === "circle" ? CheckCircle2 : CheckSquare;
  
  return (
    <button 
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setChecked(!checked); }}
      className={`mt-0.5 transition-colors focus:outline-none ${checked ? 'text-green-500' : 'text-border-subtle hover:text-accent'}`}
    >
      <Icon className={`w-4 h-4 ${checked ? 'fill-green-500/20' : ''}`} />
    </button>
  );
}
