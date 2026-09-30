"use client";

import { Plus, Search, Filter, MoreHorizontal, Mail, Phone, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: "1", name: "David Chen", jobTitle: "CTO", 
      companyName: "Innovate Inc", email: "david@innovate.co", phone: "+1 (555) 123-4567",
      createdAt: "2026-09-30T10:00:00.000Z", location: "San Francisco, CA"
    },
    {
      id: "2", name: "Emma Watson", jobTitle: "Marketing Director", 
      companyName: "GrowthMasters", email: "emma@growthmasters.io", phone: "+44 7700 900077",
      createdAt: "2026-09-29T10:00:00.000Z", location: "London, UK"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const defaultContact = { name: "", jobTitle: "", companyName: "", email: "", phone: "", location: "" };
  const [newContact, setNewContact] = useState(defaultContact);

  const handleOpenAdd = () => {
    setNewContact(defaultContact);
    setEditingContactId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (contact: any) => {
    setNewContact({
      name: contact.name, jobTitle: contact.jobTitle || "", companyName: contact.companyName || "",
      email: contact.email || "", phone: contact.phone || "", location: contact.location || ""
    });
    setEditingContactId(contact.id);
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name) return;

    if (editingContactId) {
      setContacts(contacts.map(c => c.id === editingContactId ? { ...c, ...newContact } : c));
    } else {
      setContacts([{ ...newContact, id: Date.now().toString(), createdAt: new Date().toISOString() }, ...contacts]);
    }
    
    setIsModalOpen(false);
    setNewContact(defaultContact);
    setEditingContactId(null);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    setActiveMenuId(null);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingContactId ? "Edit Contact" : "Add New Contact"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveContact} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Full Name *</label>
                    <input required value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Job Title</label>
                    <input value={newContact.jobTitle} onChange={e => setNewContact({...newContact, jobTitle: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Company</label>
                    <input value={newContact.companyName} onChange={e => setNewContact({...newContact, companyName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                    <input value={newContact.email} onChange={e => setNewContact({...newContact, email: e.target.value})} type="email" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
                    <input value={newContact.phone} onChange={e => setNewContact({...newContact, phone: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Location</label>
                    <input value={newContact.location} onChange={e => setNewContact({...newContact, location: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingContactId ? "Update Contact" : "Save Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Contacts</h1>
          <p className="text-text-secondary text-sm mt-1">Manage people and relationships.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search contacts by name, company, or email..." 
            className="w-full bg-surface-elevated border border-border-subtle rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button onClick={() => alert("Advanced filtering coming in next phase!")} className="flex items-center gap-2 bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm font-medium hover:border-border-accent transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-32">
        {filteredContacts.length === 0 ? (
          <div className="col-span-full glass p-12 text-center text-text-muted rounded-xl">
            No contacts found matching your search.
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="glass rounded-xl p-5 hover:border-accent/50 transition-all group relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center font-bold text-accent border border-border-subtle">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{contact.name}</h3>
                    <p className="text-xs text-text-secondary">{contact.jobTitle}</p>
                  </div>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setActiveMenuId(activeMenuId === contact.id ? null : contact.id)}
                    className="text-text-muted hover:text-accent p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-surface-elevated"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  {activeMenuId === contact.id && (
                    <div className="absolute right-0 top-8 z-50 w-32 bg-surface-elevated border border-border-subtle rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95">
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center gap-2"
                        onClick={() => handleOpenEdit(contact)}
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-4 flex justify-center"><div className="w-1.5 h-1.5 rounded-full bg-border-subtle group-hover:bg-accent transition-colors" /></span>
                  <span className="font-medium text-text-primary">{contact.companyName || "No Company"}</span>
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
    </div>
  );
}
