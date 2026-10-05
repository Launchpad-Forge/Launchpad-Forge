"use client";

import { Plus, Edit, Trash2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { SearchInput } from "@/components/crm/SearchInput";
import { Pagination } from "@/components/crm/Pagination";
import { ActionMenu } from "@/components/crm/ActionMenu";
import { EntitySheet } from "@/components/crm/EntitySheet";
import { FormInput } from "@/components/crm/FormInput";
import { FormSelect } from "@/components/crm/FormSelect";
import { SubmitButton } from "@/components/crm/SubmitButton";
import { createContactAction, updateContactAction, deleteContactAction } from "./actions";
import type { Prisma } from "@prisma/client";

type ContactWithRelations = Prisma.ContactGetPayload<{
  include: { company: true; _count: { select: { opportunities: true; activities: true } } }
}>;

export function ContactsClient({
  contacts,
  companies,
  page,
  totalPages
}: {
  contacts: ContactWithRelations[];
  companies: { id: string, name: string }[];
  page: number;
  totalPages: number;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactWithRelations | null>(null);

  const handleOpenEdit = (contact: ContactWithRelations) => {
    setEditingContact(contact);
    setIsSheetOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingContact(null);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      const result = await deleteContactAction(id);
      if (!result.success) alert(result.error || "Unable to delete record.");
    }
  };

  const formAction = async (formData: FormData) => {
    let result;
    if (editingContact) {
      result = await updateContactAction(editingContact.id, formData);
    } else {
      result = await createContactAction(formData);
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
          <h1 className="heading-sm">Contacts</h1>
          <p className="text-text-secondary text-sm mt-1">Manage people and relationships.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput placeholder="Search contacts by name, email, or title..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {contacts.length === 0 ? (
          <div className="col-span-full glass p-12 text-center text-text-muted rounded-xl">
            No contacts found matching your search.
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="glass rounded-xl p-5 hover:border-accent/50 transition-all group relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center font-bold text-accent border border-border-subtle uppercase">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{contact.name}</h3>
                    <p className="text-xs text-text-secondary">{contact.jobTitle || "No Title"}</p>
                  </div>
                </div>
                <div className="relative">
                  <ActionMenu
                    items={[
                      { label: "Edit", icon: Edit, onClick: () => handleOpenEdit(contact) },
                      { label: "Delete", icon: Trash2, onClick: () => handleDelete(contact.id), variant: "danger" }
                    ]}
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-4 flex justify-center"><div className="w-1.5 h-1.5 rounded-full bg-border-subtle group-hover:bg-accent transition-colors" /></span>
                  <span className="font-medium text-text-primary">{contact.company?.name || "No Company"}</span>
                </div>
                {contact.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors truncate">{contact.email}</a>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-text-muted" />
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} baseUrl="/crm/contacts" />

      <EntitySheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={editingContact ? "Edit Contact" : "Add Contact"}
      >
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              name="name"
              label="Full Name"
              defaultValue={editingContact?.name}
              required
            />
            <FormInput
              name="jobTitle"
              label="Job Title"
              defaultValue={editingContact?.jobTitle || ""}
            />
            <FormSelect
              name="companyId"
              label="Company"
              options={companies.map(c => ({ label: c.name, value: c.id }))}
              defaultValue={editingContact?.companyId || ""}
            />
            <FormInput
              name="email"
              label="Email Address"
              type="email"
              defaultValue={editingContact?.email || ""}
            />
            <FormInput
              name="phone"
              label="Phone Number"
              defaultValue={editingContact?.phone || ""}
            />
            <FormInput
              name="location"
              label="Location"
              defaultValue={editingContact?.location || ""}
            />
          </div>
          <div className="pt-4 flex justify-end">
            <SubmitButton label={editingContact ? "Save Changes" : "Create Contact"} />
          </div>
        </form>
      </EntitySheet>
    </div>
  );
}
