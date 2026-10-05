"use client";

import { Plus, Edit, Trash2, Globe } from "lucide-react";
import { useState } from "react";
import { SearchInput } from "@/components/crm/SearchInput";
import { FilterSelect } from "@/components/crm/FilterSelect";
import { DataTable } from "@/components/crm/DataTable";
import { Pagination } from "@/components/crm/Pagination";
import { ActionMenu } from "@/components/crm/ActionMenu";
import { EntitySheet } from "@/components/crm/EntitySheet";
import { FormInput } from "@/components/crm/FormInput";
import { FormSelect } from "@/components/crm/FormSelect";
import { SubmitButton } from "@/components/crm/SubmitButton";
import { COMPANY_STATUSES } from "@/lib/constants";
import { createCompanyAction, updateCompanyAction, deleteCompanyAction } from "./actions";
import type { Prisma } from "@prisma/client";

type CompanyWithRelations = Prisma.CompanyGetPayload<{
  include: { _count: { select: { contacts: true; opportunities: true; leads: true } } }
}>;

export function CompaniesClient({
  companies,
  page,
  totalPages
}: {
  companies: CompanyWithRelations[];
  page: number;
  totalPages: number;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<CompanyWithRelations | null>(null);

  const handleOpenEdit = (company: CompanyWithRelations) => {
    setEditingCompany(company);
    setIsSheetOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingCompany(null);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      const result = await deleteCompanyAction(id);
      if (!result.success) alert(result.error || "Unable to delete record.");
    }
  };

  const formAction = async (formData: FormData) => {
    let result;
    if (editingCompany) {
      result = await updateCompanyAction(editingCompany.id, formData);
    } else {
      result = await createCompanyAction(formData);
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
          <h1 className="heading-sm">Companies</h1>
          <p className="text-text-secondary text-sm mt-1">Track organizations and accounts.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput placeholder="Search companies by name or industry..." />
        <FilterSelect name="status" options={COMPANY_STATUSES} placeholder="Any Status" />
      </div>

      <DataTable
        headers={["Company", "Industry", "Location", "Status", "Contacts", "Deals", ""]}
        isEmpty={companies.length === 0}
      >
        {companies.map((company) => (
          <tr key={company.id} className="hover:bg-surface-elevated/50 transition-colors group">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium text-text-primary flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-accent-dim text-accent flex items-center justify-center text-xs font-bold uppercase">
                  {company.name.charAt(0)}
                </div>
                {company.name}
              </div>
              {company.website && (
                <div className="text-xs text-text-secondary mt-1 flex items-center gap-1 ml-8">
                  <Globe className="w-3 h-3" />
                  <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    {company.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
              {company.industry || "-"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
              {company.location || "-"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
              <span className={`inline-flex items-center text-xs font-medium ${
                company.status === 'Active Client' ? 'text-accent' :
                company.status === 'Former Client' ? 'text-text-muted' : 'text-blue-500'
              }`}>
                {company.status || "Prospect"}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex items-center justify-center bg-surface-elevated text-text-primary text-xs font-medium px-2.5 py-0.5 rounded-full border border-border-subtle">
                {company._count.contacts}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex items-center justify-center bg-surface-elevated text-text-primary text-xs font-medium px-2.5 py-0.5 rounded-full border border-border-subtle">
                {company._count.opportunities}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <ActionMenu
                items={[
                  { label: "Edit", icon: Edit, onClick: () => handleOpenEdit(company) },
                  { label: "Delete", icon: Trash2, onClick: () => handleDelete(company.id), variant: "danger" }
                ]}
              />
            </td>
          </tr>
        ))}
      </DataTable>

      <Pagination page={page} totalPages={totalPages} baseUrl="/crm/companies" />

      <EntitySheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={editingCompany ? "Edit Company" : "Add Company"}
      >
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              name="name"
              label="Company Name"
              defaultValue={editingCompany?.name}
              required
            />
            <FormInput
              name="website"
              label="Website"
              defaultValue={editingCompany?.website || ""}
              placeholder="https://example.com"
            />
            <FormInput
              name="industry"
              label="Industry"
              defaultValue={editingCompany?.industry || ""}
            />
            <FormInput
              name="location"
              label="Location"
              defaultValue={editingCompany?.location || ""}
            />
            <FormSelect
              name="status"
              label="Status"
              options={COMPANY_STATUSES}
              defaultValue={editingCompany?.status || "Prospect"}
            />
          </div>
          <div className="pt-4 flex justify-end">
            <SubmitButton label={editingCompany ? "Save Changes" : "Create Company"} />
          </div>
        </form>
      </EntitySheet>
    </div>
  );
}
