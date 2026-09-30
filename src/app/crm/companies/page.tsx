"use client";

import { Plus, Search, Filter, MoreHorizontal, Globe, Users, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([
    {
      id: "1", name: "Acme Corporation", website: "acme.com", 
      industry: "Manufacturing", companySize: "200-500", location: "New York, NY",
      contacts: [{ id: "c1" }, { id: "c2" }],
      opportunities: [{ id: "o1", stage: "Won" }]
    },
    {
      id: "2", name: "StartupIO", website: "startup.io", 
      industry: "Software", companySize: "10-50", location: "Remote",
      contacts: [{ id: "c3" }],
      opportunities: [{ id: "o2", stage: "Proposal" }]
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultCompany = { name: "", website: "", industry: "", location: "" };
  const [newCompany, setNewCompany] = useState(defaultCompany);

  const handleOpenAdd = () => {
    setNewCompany(defaultCompany);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (company: any) => {
    setNewCompany({
      name: company.name,
      website: company.website || "",
      industry: company.industry || "",
      location: company.location || ""
    });
    setEditingId(company.id);
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCompanies(companies.filter(c => c.id !== id));
    setActiveMenuId(null);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.name) return;
    
    if (editingId) {
      setCompanies(companies.map(c => c.id === editingId ? { ...c, ...newCompany } : c));
    } else {
      const company = {
        id: Date.now().toString(),
        name: newCompany.name,
        website: newCompany.website,
        industry: newCompany.industry,
        location: newCompany.location,
        contacts: [],
        opportunities: []
      };
      setCompanies([company, ...companies]);
    }
    
    setIsModalOpen(false);
    setNewCompany(defaultCompany);
    setEditingId(null);
  };

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Company" : "Add New Company"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCompany} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Company Name *</label>
                    <input required value={newCompany.name} onChange={e => setNewCompany({...newCompany, name: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Website</label>
                    <input value={newCompany.website} onChange={e => setNewCompany({...newCompany, website: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" placeholder="e.g. example.com" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Industry</label>
                    <input value={newCompany.industry} onChange={e => setNewCompany({...newCompany, industry: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Location</label>
                    <input value={newCompany.location} onChange={e => setNewCompany({...newCompany, location: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update Company" : "Save Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Companies</h1>
          <p className="text-text-secondary text-sm mt-1">Track organizations and accounts.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search companies by name or industry..." 
            className="w-full bg-surface-elevated border border-border-subtle rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button onClick={() => alert("Advanced filtering coming soon!")} className="flex items-center gap-2 bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm font-medium hover:border-border-accent transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="glass rounded-xl overflow-visible border border-border-subtle pb-20">
        <div className="overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-elevated/30">
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Industry</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Contacts</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Deals</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    No companies found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-surface-elevated/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-text-primary flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-accent-dim text-accent flex items-center justify-center text-xs font-bold">
                          {company.name.charAt(0)}
                        </div>
                        {company.name}
                      </div>
                      {company.website && (
                        <div className="text-xs text-text-secondary mt-1 flex items-center gap-1 ml-8">
                          <Globe className="w-3 h-3" />
                          <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{company.website}</a>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {company.industry || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {company.location || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center bg-surface-elevated text-text-primary text-xs font-medium px-2.5 py-0.5 rounded-full border border-border-subtle">
                        {company.contacts?.length || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center bg-surface-elevated text-text-primary text-xs font-medium px-2.5 py-0.5 rounded-full border border-border-subtle">
                        {company.opportunities?.length || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === company.id ? null : company.id)}
                        className="text-text-muted hover:text-accent p-1 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {activeMenuId === company.id && (
                        <div className="absolute right-8 top-10 z-50 w-32 bg-surface-elevated border border-border-subtle rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95">
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center gap-2"
                            onClick={() => handleOpenEdit(company)}
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                            onClick={() => handleDelete(company.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
