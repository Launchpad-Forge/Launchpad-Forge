import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ page, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createUrl = (newPage: number) => {
    const url = new URL(baseUrl, "http://localhost"); // Dummy base for URL parsing
    url.searchParams.set("page", newPage.toString());
    return `${url.pathname}${url.search}`;
  };

  return (
    <div className="flex items-center justify-between border-t border-border-subtle pt-4 mt-4">
      <div className="text-sm text-text-secondary">
        Page {page} of {totalPages}
      </div>
      <div className="flex gap-2">
        {page > 1 ? (
          <Link
            href={createUrl(page - 1)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-surface-elevated border border-border-subtle hover:border-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-surface border border-border-subtle opacity-50 cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
        )}

        {page < totalPages ? (
          <Link
            href={createUrl(page + 1)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-surface-elevated border border-border-subtle hover:border-accent transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-surface border border-border-subtle opacity-50 cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
