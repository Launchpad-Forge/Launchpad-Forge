import React from "react";
import { cn } from "@/lib/utils";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[] | readonly string[];
  error?: string[];
}

export function FormSelect({ label, options, error, className, ...props }: FormSelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-text-secondary">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <select
        className={cn(
          "w-full bg-surface-elevated border rounded-md px-3 py-2 text-sm focus:outline-none transition-colors",
          error ? "border-red-500 focus:border-red-500" : "border-border-subtle focus:border-accent",
          className
        )}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const displayLabel = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {displayLabel}
            </option>
          );
        })}
      </select>
      {error && <p className="text-xs text-red-500">{error[0]}</p>}
    </div>
  );
}
