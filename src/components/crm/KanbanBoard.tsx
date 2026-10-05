"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MoreHorizontal } from "lucide-react";

export type DealStatus = "lead" | "qualified" | "proposal" | "won";

export interface Deal {
  id: string;
  title: string;
  company: string;
  amount: number;
  status: DealStatus;
}

interface KanbanBoardProps {
  initialDeals: Deal[];
}

const COLUMNS: { id: DealStatus; title: string }[] = [
  { id: "lead", title: "Lead" },
  { id: "qualified", title: "Qualified" },
  { id: "proposal", title: "Proposal" },
  { id: "won", title: "Won" },
];

export function KanbanBoard({ initialDeals }: KanbanBoardProps) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  React.useEffect(() => {
    setDeals(initialDeals);
  }, [initialDeals]);

  const [isPending, startTransition] = React.useTransition();

  const moveDeal = (dealId: string, newStatus: DealStatus) => {
    // Optimistic update
    setDeals(deals.map(d => d.id === dealId ? { ...d, status: newStatus } : d));

    // Persist to backend
    startTransition(async () => {
      // Map DealStatus back to PipelineStage
      let dbStage = "New";
      if (newStatus === "lead") dbStage = "New";
      else if (newStatus === "qualified") dbStage = "Qualified";
      else if (newStatus === "proposal") dbStage = "Proposal";
      else if (newStatus === "won") dbStage = "Won";

      const { moveStageAction } = await import("@/app/crm/opportunities/actions");
      const result = await moveStageAction(dealId, dbStage);
      if (!result.success) { setDeals(initialDeals); alert(result.error || "Unable to change stage."); }
    });
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 h-full min-h-[500px] scrollbar-hide">
      {COLUMNS.map(col => (
        <div key={col.id} className="flex-1 min-w-[300px] flex flex-col bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl p-4 shadow-sm">
          {/* Column Header */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
               <h3 className="heading-sm font-medium text-[var(--text-primary)]">{col.title}</h3>
               <span className="text-xs font-semibold bg-[var(--surface)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-full text-[var(--text-secondary)]">
                 {deals.filter(d => d.status === col.id).length}
               </span>
            </div>
            <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
               <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Column Content */}
          <div className="flex-1 flex flex-col gap-3">
            {deals.filter(d => d.status === col.id).map(deal => (
              <motion.div
                layout
                key={deal.id}
                className="glass p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors group relative"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                 <h4 className="body-md font-medium text-[var(--text-primary)] leading-tight">{deal.title}</h4>
                 <p className="text-sm text-[var(--text-secondary)] mb-3 mt-1">{deal.company}</p>

                 <div className="flex justify-between items-center text-sm">
                   <span className="font-semibold text-[var(--text-primary)]">
                     ${deal.amount.toLocaleString()}
                   </span>

                   {/* Quick action buttons to move cards (since drag needs full dnd context) */}
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     {COLUMNS.map(c => c.id !== col.id && (
                       <button
                         key={c.id}
                         onClick={() => moveDeal(deal.id, c.id)}
                         className="p-1 bg-[var(--surface)] border border-[var(--border-subtle)] rounded hover:text-[var(--accent)] hover:border-[var(--border-accent)] transition-colors text-[var(--text-muted)]"
                         title={`Move to ${c.title}`}
                       >
                         <ArrowRight size={14} className={c.id === "won" ? "text-green-500" : ""} />
                       </button>
                     ))}
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
