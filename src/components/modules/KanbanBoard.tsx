"use client";

import { PIPELINE_STAGES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Clock, Edit, Trash2 } from "lucide-react";

export default function KanbanBoard({ opportunities, onEdit, onDelete }: { opportunities: any[], onEdit?: (opp: any) => void, onDelete?: (id: string) => void }) {
  // Simple kanban layout, without drag-and-drop for now
  
  return (
    <div className="flex gap-4 h-full items-start">
      {PIPELINE_STAGES.map((stage) => {
        if (stage === "Lost") return null; // Typically hidden or moved to end
        
        const columnDeals = opportunities.filter((opp) => opp.stage === stage);
        const columnTotal = columnDeals.reduce((sum, opp) => sum + (opp.estimatedValue || 0), 0);

        return (
          <div key={stage} className="flex-shrink-0 w-72 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-semibold text-sm text-text-primary uppercase tracking-wider">{stage}</h3>
              <span className="text-xs font-medium text-text-muted bg-surface-elevated px-2 py-0.5 rounded-full">
                {columnDeals.length}
              </span>
            </div>
            
            <div className="text-xs text-text-secondary mb-3 px-1">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(columnTotal)}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {columnDeals.map((deal) => (
                <div key={deal.id} className="group glass-elevated p-4 rounded-lg cursor-grab active:cursor-grabbing border border-border-subtle hover:border-accent/40 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      deal.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-surface-elevated text-text-secondary'
                    }`}>
                      {deal.priority || 'Normal'}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onEdit && (
                        <button onClick={() => onEdit(deal)} className="p-1 text-text-muted hover:text-accent rounded hover:bg-surface transition-colors">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(deal.id)} className="p-1 text-text-muted hover:text-red-500 rounded hover:bg-surface transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <h4 className="font-medium text-text-primary text-sm mb-1">{deal.title}</h4>
                  <p className="text-xs text-text-secondary mb-3">{deal.company?.name}</p>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-subtle">
                    <span className="font-semibold text-sm text-accent">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(deal.estimatedValue || 0)}
                    </span>
                    <div className="flex items-center text-text-muted text-xs gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{deal.probability}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
