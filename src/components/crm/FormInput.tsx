import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[];
}

export function FormInput({ label, error, className, ...props }: FormInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-text-secondary">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={cn(
          "w-full bg-surface-elevated border rounded-md px-3 py-2 text-sm focus:outline-none transition-colors",
          error ? "border-red-500 focus:border-red-500" : "border-border-subtle focus:border-accent",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error[0]}</p>}
    </div>
  );
}
