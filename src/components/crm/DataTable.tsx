import React from "react";

interface DataTableProps {
  headers: string[];
  children: React.ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export function DataTable({ headers, children, emptyMessage = "No records found.", isEmpty = false }: DataTableProps) {
  return (
    <div className="glass rounded-xl overflow-x-auto border border-border-subtle">
      <table className="w-full text-left border-collapse whitespace-nowrap min-w-full">
        <thead>
          <tr className="border-b border-border-subtle bg-surface-elevated/30">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className={`px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider ${header === '' ? 'text-right' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {isEmpty ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-12 text-center text-text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}
