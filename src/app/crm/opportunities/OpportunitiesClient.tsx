"use client";

import { Plus, Filter } from "lucide-react";
import { useState } from "react";
import { SearchInput } from "@/components/crm/SearchInput";
import { FilterSelect } from "@/components/crm/FilterSelect";
import { EntitySheet } from "@/components/crm/EntitySheet";
import { FormInput } from "@/components/crm/FormInput";
import { FormSelect } from "@/components/crm/FormSelect";
import { SubmitButton } from "@/components/crm/SubmitButton";
import { PIPELINE_STAGES, PRIORITIES } from "@/lib/constants";
import { createOpportunityAction, updateOpportunityAction, deleteOpportunityAction } from "./actions";
import KanbanBoard from "@/components/modules/KanbanBoard";
import type { Prisma } from "@prisma/client";

type OpportunityWithRelations = Prisma.OpportunityGetPayload<{
  include: { company: true }
}>;

export function OpportunitiesClient({
  opportunities,
  companies
}: {
  opportunities: OpportunityWithRelations[];
  companies: { id: string, name: string }[];
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<OpportunityWithRelations | null>(null);

  const handleOpenEdit = (opportunity: OpportunityWithRelations) => {
    setEditingOpportunity(opportunity);
    setIsSheetOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingOpportunity(null);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this deal?")) {
      const result = await deleteOpportunityAction(id);
      if (!result.success) alert(result.error || "Unable to delete record.");
    }
  };

  const formAction = async (formData: FormData) => {
    let result;
    if (editingOpportunity) {
      result = await updateOpportunityAction(editingOpportunity.id, formData);
    } else {
      result = await createOpportunityAction(formData);
    }

    if (result.success) {
      setIsSheetOpen(false);
    } else {
      alert(result.error || "Validation failed. Please check the fields.");
      console.error(result.fieldErrors);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="heading-sm">Opportunities</h1>
          <p className="text-text-secondary text-sm mt-1">Manage deals and sales pipeline.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" />
          Add Deal
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 shrink-0">
        <SearchInput placeholder="Search deals by title..." />
        <FilterSelect name="priority" options={PRIORITIES} placeholder="Any Priority" />
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <KanbanBoard
          opportunities={opportunities}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </div>

      <EntitySheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={editingOpportunity ? "Edit Deal" : "Add Deal"}
      >
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <FormInput name="service" label="Service" defaultValue={editingOpportunity?.service ?? ""} />
            <FormInput
              name="title"
              label="Deal Title"
              defaultValue={editingOpportunity?.title}
              required
            />
            <FormSelect
              name="companyId"
              label="Company"
              options={companies.map(c => ({ label: c.name, value: c.id }))}
              defaultValue={editingOpportunity?.companyId || ""}
            />
            <FormInput
              name="estimatedValue"
              label="Estimated Value (₹)"
              type="number"
              defaultValue={editingOpportunity?.estimatedValue || 0}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormSelect
                name="stage"
                label="Pipeline Stage"
                options={PIPELINE_STAGES}
                defaultValue={editingOpportunity?.stage || "New"}
              />
              <FormSelect
                name="priority"
                label="Priority"
                options={PRIORITIES}
                defaultValue={editingOpportunity?.priority || "Normal"}
              />
            </div>
            <FormInput
              name="probability"
              label="Probability (%)"
              type="number"
              min="0"
              max="100"
              defaultValue={editingOpportunity?.probability || 20}
            />
          </div>
          <div className="pt-4 flex justify-end">
            <SubmitButton label={editingOpportunity ? "Save Changes" : "Create Deal"} />
          </div>
        </form>
      </EntitySheet>
    </div>
  );
}
