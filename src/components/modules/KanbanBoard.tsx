"use client";

import { PIPELINE_STAGES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Clock, Edit, Trash2 } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateOpportunityAction } from "@/app/crm/opportunities/actions";

// --- Sortable Item Component ---
function SortableDealCard({ deal, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id, data: deal });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="group glass-elevated p-4 rounded-lg cursor-grab active:cursor-grabbing border border-border-subtle hover:border-accent/40 transition-colors bg-surface-elevated/80"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
          deal.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-surface text-text-secondary'
        }`}>
          {deal.priority || 'Normal'}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button 
              onPointerDown={(e) => e.stopPropagation()} 
              onClick={(e) => { e.stopPropagation(); onEdit(deal); }} 
              className="p-1 text-text-muted hover:text-accent rounded hover:bg-surface transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button 
              onPointerDown={(e) => e.stopPropagation()} 
              onClick={(e) => { e.stopPropagation(); onDelete(deal.id); }} 
              className="p-1 text-text-muted hover:text-red-500 rounded hover:bg-surface transition-colors"
            >
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
  );
}

// --- Main Board Component ---
export default function KanbanBoard({ opportunities, onEdit, onDelete }: { opportunities: any[], onEdit?: (opp: any) => void, onDelete?: (id: string) => void }) {
  const [items, setItems] = useState(opportunities);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Sync state when props change (from server)
  useEffect(() => {
    setItems(opportunities);
  }, [opportunities]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px drag distance before activation
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainer = active.data.current?.sortable?.containerId || active.data.current?.stage;
    const overContainer = over.data.current?.sortable?.containerId || over.id;

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev.filter(i => i.stage === activeContainer);
      const overItems = prev.filter(i => i.stage === overContainer);
      const activeIndex = activeItems.findIndex(i => i.id === activeId);
      const overIndex = overItems.findIndex(i => i.id === overId);

      let newIndex;
      if (overId in PIPELINE_STAGES) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return prev.map(item => {
        if (item.id === activeId) {
          return { ...item, stage: overContainer };
        }
        return item;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeDeal = items.find(i => i.id === active.id);
    const originalDeal = opportunities.find(i => i.id === active.id);

    if (activeDeal && originalDeal && activeDeal.stage !== originalDeal.stage) {
      // Optimistic update already happened in UI. Persist to server.
      startTransition(async () => {
        const formData = new FormData();
        formData.append("stage", activeDeal.stage);
        // Retain original form values
        formData.append("title", activeDeal.title);
        formData.append("companyId", activeDeal.companyId || "");
        formData.append("estimatedValue", activeDeal.estimatedValue?.toString() || "0");
        formData.append("priority", activeDeal.priority || "Normal");
        formData.append("probability", activeDeal.probability?.toString() || "20");

        const result = await updateOpportunityAction(activeDeal.id, formData);
        if (!result.success) { setItems(opportunities); alert(result.error || "Unable to change stage."); }
      });
    }
  };

  const getStageDeals = (stage: string) => items.filter((opp) => opp.stage === stage);
  const activeDeal = activeId ? items.find((i) => i.id === activeId) : null;

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={`flex gap-4 h-full items-start ${isPending ? 'opacity-70 pointer-events-none' : ''}`}>
        {PIPELINE_STAGES.map((stage) => {
          if (stage === "Lost") return null;
          
          const columnDeals = getStageDeals(stage);
          const columnTotal = columnDeals.reduce((sum, opp) => sum + (opp.estimatedValue || 0), 0);

          return (
            <div key={stage} className="flex-shrink-0 w-72 flex flex-col h-full bg-surface/30 rounded-xl p-3 border border-border-subtle/50">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-semibold text-sm text-text-primary uppercase tracking-wider">{stage}</h3>
                <span className="text-xs font-medium text-text-muted bg-surface-elevated px-2 py-0.5 rounded-full border border-border-subtle">
                  {columnDeals.length}
                </span>
              </div>
              
              <div className="text-xs font-medium text-text-secondary mb-3 px-1">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(columnTotal)}
              </div>

              <div className="flex-1 overflow-y-auto min-h-[150px] scrollbar-thin">
                <SortableContext 
                  id={stage}
                  items={columnDeals.map(d => d.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3 pb-2 h-full">
                    {columnDeals.map((deal) => (
                      <SortableDealCard key={deal.id} deal={deal} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                  </div>
                </SortableContext>
              </div>
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeDeal ? (
          <div className="opacity-80 rotate-2 scale-105">
            <SortableDealCard deal={activeDeal} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
