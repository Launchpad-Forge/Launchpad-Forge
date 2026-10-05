"use client";

import { CRM_RELATION_FIELDS } from "@/lib/constants";
import type { RelationshipOptions } from "@/lib/dal/relationships";
import { Plus, CheckCircle2, Clock, AlertCircle, Edit, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { EntitySheet } from "@/components/crm/EntitySheet";
import { FormInput } from "@/components/crm/FormInput";
import { FormSelect } from "@/components/crm/FormSelect";
import { SubmitButton } from "@/components/crm/SubmitButton";
import { PRIORITIES } from "@/lib/constants";
import { createFollowUpAction, updateFollowUpAction, deleteFollowUpAction } from "./actions";
import { isToday, isTomorrow, isPast } from "date-fns";
import type { getFollowUps } from "@/lib/dal";
type FollowUpWithRelations = Awaited<ReturnType<typeof getFollowUps>>["followUps"][number];

export function FollowUpsClient({
  followUps, options
}: {
  followUps: FollowUpWithRelations[]; options: RelationshipOptions;
}) {
  const [activeTab, setActiveTab] = useState("Today");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingFollowUp, setEditingFollowUp] = useState<FollowUpWithRelations | null>(null);

  const handleOpenAdd = () => {
    setEditingFollowUp(null);
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (task: FollowUpWithRelations) => {
    setEditingFollowUp(task);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this follow-up?")) {
      const result = await deleteFollowUpAction(id);
      if (!result.success) alert(result.error || "Unable to delete record.");
    }
  };

  const formAction = async (formData: FormData) => {
    let result;
    if (editingFollowUp) {
      result = await updateFollowUpAction(editingFollowUp.id, formData);
    } else {
      result = await createFollowUpAction(formData);
    }

    if (result.success) {
      setIsSheetOpen(false);
    } else {
      alert(result.error || "Validation failed.");
      console.error(result.fieldErrors);
    }
  };

  const toggleStatus = async (task: FollowUpWithRelations) => {
    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("dueDate", new Date(task.dueDate).toISOString());
    formData.append("status", task.status === 'Completed' ? 'Pending' : 'Completed');
    formData.append("priority", task.priority);
    const result = await updateFollowUpAction(task.id, formData);
    if (!result.success) alert(result.error || "Unable to update follow-up.");
  };

  const filteredFollowUps = useMemo(() => {
    return followUps.filter(f => {
      if (activeTab === "Completed") return f.status === "Completed";
      if (f.status === "Completed") return false;

      const date = new Date(f.dueDate);
      if (activeTab === "Today") return isToday(date);
      if (activeTab === "Overdue") return isPast(date) && !isToday(date);
      if (activeTab === "Tomorrow") return isTomorrow(date);
      if (activeTab === "Upcoming") return !isToday(date) && !isTomorrow(date) && !isPast(date);
      return true;
    });
  }, [followUps, activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Follow-ups</h1>
          <p className="text-text-secondary text-sm mt-1">Don't let opportunities slip away.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" />
          Schedule Follow-up
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-border-subtle mb-6 overflow-x-auto scrollbar-none">
        {["Today", "Overdue", "Tomorrow", "Upcoming", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              tab === activeTab
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-subtle'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filteredFollowUps.length === 0 && (
          <p className="text-text-muted text-center py-8">No {activeTab.toLowerCase()} follow-ups.</p>
        )}
        {filteredFollowUps.map((task) => {
          const isOverdue = isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && task.status !== 'Completed';
          const entityName = task.company?.name || task.lead?.name || task.contact?.name || task.opportunity?.title || "No related entity";

          return (
            <div key={task.id} className={`glass flex items-center justify-between p-4 rounded-lg border hover:border-accent/30 transition-colors group cursor-pointer ${isOverdue ? 'border-red-500/30 bg-red-500/5' : 'border-border-subtle'} ${task.status === 'Completed' ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-4">
                <button onClick={() => toggleStatus(task)} className={`mt-0.5 transition-colors ${task.status === 'Completed' ? 'text-green-500' : 'text-text-muted hover:text-accent'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <div>
                  <h3 className={`font-medium group-hover:text-accent transition-colors ${task.status === 'Completed' ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                    <span className="font-medium">{entityName}</span>
                    <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : 'text-text-muted'}`}>
                      {isOverdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {new Date(task.dueDate).toLocaleDateString('en-US')}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                      task.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-surface-elevated text-text-secondary'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenEdit(task)} className="p-1.5 rounded-md hover:bg-surface-elevated text-text-muted hover:text-accent transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(task.id)} className="p-1.5 rounded-md hover:bg-surface-elevated text-text-muted hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <EntitySheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={editingFollowUp ? "Edit Follow-up" : "Schedule Follow-up"}
      >
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              name="title"
              label="Task / Title"
              defaultValue={editingFollowUp?.title}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="dueDate"
                label="Due Date"
                type="date"
                defaultValue={editingFollowUp ? new Date(editingFollowUp.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                required
              />
              <FormSelect
                name="priority"
                label="Priority"
                options={PRIORITIES}
                defaultValue={editingFollowUp?.priority || "Normal"}
              />
            </div>
            {CRM_RELATION_FIELDS.map(field => <FormSelect key={field.name} name={field.name} label={field.label} options={options[field.key]} defaultValue={editingFollowUp?.[field.name] ?? ""} />)}
          </div>
          <div className="pt-4 flex justify-end">
            <SubmitButton label={editingFollowUp ? "Update Follow-up" : "Schedule Follow-up"} />
          </div>
        </form>
      </EntitySheet>
    </div>
  );
}
