"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface FilterSelectProps {
  name: string;
  options: readonly string[];
  placeholder?: string;
}

export function FilterSelect({ name, options, placeholder = "Filter by..." }: FilterSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(name) || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // Reset to page 1 on new filter
    if (params.has("page")) params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentValue}
      onChange={handleChange}
      className="bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
