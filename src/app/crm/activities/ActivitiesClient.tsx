"use client";

import { CRM_RELATION_FIELDS } from "@/lib/constants";
import type { RelationshipOptions } from "@/lib/dal/relationships";
import { Plus, Mail, Calendar, Phone, FileText, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { EntitySheet } from "@/components/crm/EntitySheet";
import { FormInput } from "@/components/crm/FormInput";
import { FormSelect } from "@/components/crm/FormSelect";
import { SubmitButton } from "@/components/crm/SubmitButton";
import { ACTIVITY_TYPES } from "@/lib/constants";
import { createActivityAction, updateActivityAction, deleteActivityAction } from "./actions";
import type { getActivities } from "@/lib/dal";
type ActivityWithRelations = Awaited<ReturnType<typeof getActivities>>["activities"][number];

export function ActivitiesClient({
  activities, options
}: {
  activities: ActivityWithRelations[]; options: RelationshipOptions;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityWithRelations | null>(null);

  const handleOpenAdd = () => {
    setEditingActivity(null);
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (activity: ActivityWithRelations) => {
    setEditingActivity(activity);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      const result = await deleteActivityAction(id);
      if (!result.success) alert(result.error || "Unable to delete record.");
    }
  };

  const formAction = async (formData: FormData) => {
    let result;
    if (editingActivity) {
      result = await updateActivityAction(editingActivity.id, formData);
    } else {
      result = await createActivityAction(formData);
    }

    if (result.success) {
      setIsSheetOpen(false);
    } else {
      alert(result.error || "Validation failed.");
      console.error(result.fieldErrors);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Activity Timeline</h1>
          <p className="text-text-secondary text-sm mt-1">Track all interactions and events.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" />
          Log Activity
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-border-subtle p-6">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-subtle before:to-transparent">
          {activities.length === 0 && <p className="text-text-muted text-center py-4">No activities logged yet.</p>}
          {activities.map((activity) => {
            const Icon = activity.type === 'EMAIL' ? Mail :
                         activity.type === 'MEETING' ? Calendar :
                         activity.type === 'CALL' ? Phone : FileText;

            const entityName = activity.company?.name || activity.lead?.name || activity.contact?.name || activity.opportunity?.title || "No related entity";

            return (
              <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle bg-surface-elevated text-text-secondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-4 rounded-lg border border-border-subtle group-hover:border-accent/40 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">{activity.type}</span>
                    <div className="flex items-center gap-3">
                      <time className="text-xs text-text-muted">{new Date(activity.createdAt).toLocaleDateString('en-US')}</time>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <button onClick={() => handleOpenEdit(activity)} className="text-text-muted hover:text-text-primary p-1">
                          <Edit className="w-3 h-3" />
                        </button>
                        <button onClick={() => handleDelete(activity.id)} className="text-text-muted hover:text-red-500 p-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-text-primary text-sm">{activity.title}</h3>
                  <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                    <span className="font-medium">{entityName}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <EntitySheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={editingActivity ? "Edit Activity" : "Log Activity"}
      >
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <FormSelect
              name="type"
              label="Activity Type"
              options={ACTIVITY_TYPES}
              defaultValue={editingActivity?.type || "NOTE"}
            />
            <FormInput
              name="title"
              label="Title / Description"
              defaultValue={editingActivity?.title}
              required
            />
            {CRM_RELATION_FIELDS.map(field => <FormSelect key={field.name} name={field.name} label={field.label} options={options[field.key]} defaultValue={editingActivity?.[field.name] ?? ""} />)}
          </div>
          <div className="pt-4 flex justify-end">
            <SubmitButton label={editingActivity ? "Update Activity" : "Log Activity"} />
          </div>
        </form>
      </EntitySheet>
    </div>
  );
}
