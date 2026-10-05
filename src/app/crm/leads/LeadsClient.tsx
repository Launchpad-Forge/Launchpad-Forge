"use client";

import { Plus, Edit, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { SearchInput } from "@/components/crm/SearchInput";
import { FilterSelect } from "@/components/crm/FilterSelect";
import { DataTable } from "@/components/crm/DataTable";
import { Pagination } from "@/components/crm/Pagination";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { ActionMenu } from "@/components/crm/ActionMenu";
import { EntitySheet } from "@/components/crm/EntitySheet";
import { FormInput } from "@/components/crm/FormInput";
import { FormSelect } from "@/components/crm/FormSelect";
import { SubmitButton } from "@/components/crm/SubmitButton";
import { LEAD_STATUSES, LEAD_SOURCES, PRIORITIES } from "@/lib/constants";
import { createLeadAction, updateLeadAction, deleteLeadAction, convertLeadAction } from "./actions";
import type { LeadWithRelations } from "@/lib/dal";

export function LeadsClient({
  leads,
  page,
  totalPages
}: {
  leads: LeadWithRelations[];
  page: number;
  totalPages: number;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<LeadWithRelations | null>(null);

  const handleOpenEdit = (lead: LeadWithRelations) => {
    setEditingLead(lead);
    setIsSheetOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingLead(null);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      const result = await deleteLeadAction(id);
      if (!result.success) alert(result.error || "Unable to delete record.");
    }
  };

  const formAction = async (formData: FormData) => {
    let result;
    if (editingLead) {
      result = await updateLeadAction(editingLead.id, formData);
    } else {
      result = await createLeadAction(formData);
    }

    if (result.success) {
      setIsSheetOpen(false);
    } else {
      alert(result.error || "Validation failed. Please check the fields.");
      console.error(result.fieldErrors);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Leads</h1>
          <p className="text-text-secondary text-sm mt-1">Manage and track prospective clients.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput placeholder="Search leads by name, email..." />
        <FilterSelect name="status" options={LEAD_STATUSES} placeholder="Any Status" />
        <FilterSelect name="priority" options={PRIORITIES} placeholder="Any Priority" />
      </div>

      <DataTable
        headers={["Name", "Company", "Status", "Source", "Priority", "Created", ""]}
        isEmpty={leads.length === 0}
      >
        {leads.map((lead) => (
          <tr key={lead.id} className="hover:bg-surface-elevated/50 transition-colors group">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium text-text-primary">{lead.name}</div>
              <div className="text-sm text-text-secondary">{lead.email || "-"}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
              {lead.company?.name || lead.companyName || "-"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={lead.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
              {lead.source || "-"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center text-xs font-medium ${
                lead.priority === 'High' ? 'text-red-500' : 'text-text-secondary'
              }`}>
                {lead.priority}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
              {new Date(lead.createdAt).toLocaleDateString('en-US')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <ActionMenu
                items={[
                  ...(lead.status !== "Converted" ? [{ label: "Convert to opportunity", icon: ArrowRight, onClick: async () => { const result = await convertLeadAction(lead.id); if (!result.success) alert(result.error); } }] : []),
                  { label: "Edit", icon: Edit, onClick: () => handleOpenEdit(lead) },
                  { label: "Delete", icon: Trash2, onClick: () => handleDelete(lead.id), variant: "danger" }
                ]}
              />
            </td>
          </tr>
        ))}
      </DataTable>

      <Pagination page={page} totalPages={totalPages} baseUrl="/crm/leads" />

      <EntitySheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={editingLead ? "Edit Lead" : "Add Lead"}
      >
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              name="name"
              label="Full Name"
              defaultValue={editingLead?.name}
              required
            />
            <FormInput
              name="email"
              label="Email Address"
              type="email"
              defaultValue={editingLead?.email || ""}
            />
            <FormInput
              name="companyName"
              label="Company Name"
              defaultValue={editingLead?.companyName || ""}
            />
            <FormInput
              name="phone"
              label="Phone Number"
              defaultValue={editingLead?.phone || ""}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormSelect
                name="status"
                label="Status"
                options={LEAD_STATUSES}
                defaultValue={editingLead?.status || "New"}
              />
              <FormSelect
                name="source"
                label="Source"
                options={LEAD_SOURCES}
                defaultValue={editingLead?.source || ""}
              />
              <FormSelect
                name="priority"
                label="Priority"
                options={PRIORITIES}
                defaultValue={editingLead?.priority || "Normal"}
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <SubmitButton label={editingLead ? "Save Changes" : "Create Lead"} />
          </div>
        </form>
      </EntitySheet>
    </div>
  );
}
