"use client";

import { Plus, Search, Filter, MoreHorizontal, X, Trash2, Edit } from "lucide-react";
import { useState } from "react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([
    {
      id: "1", name: "Alex Mercer", companyName: "TechFlow Solutions", 
      email: "alex@techflow.io", source: "Website", status: "New", 
      createdAt: "2026-09-30T10:00:00.000Z", priority: "High"
    },
    {
      id: "2", name: "Sarah Chen", companyName: "Stellar E-commerce", 
      email: "sarah@stellar.co", source: "Referral", status: "Contacted", 
      createdAt: "2026-09-29T10:00:00.000Z", priority: "Normal"
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  
  const defaultLead = { name: "", email: "", companyName: "", status: "New", source: "Website", priority: "Normal" };
  const [newLead, setNewLead] = useState(defaultLead);

  const handleOpenEdit = (lead: any) => {
    setNewLead({
      name: lead.name, email: lead.email, companyName: lead.companyName || "",
      status: lead.status, source: lead.source || "Website", priority: lead.priority
    });
    setEditingLeadId(lead.id);
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setNewLead(defaultLead);
    setEditingLeadId(null);
    setIsModalOpen(true);
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name) return;
    
    if (editingLeadId) {
      setLeads(leads.map(l => l.id === editingLeadId ? { ...l, ...newLead } : l));
    } else {
      const lead = {
        ...newLead,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setLeads([lead, ...leads]);
    }
    
    setIsModalOpen(false);
    setNewLead(defaultLead);
    setEditingLeadId(null);
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
    setActiveMenuId(null);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingLeadId ? "Edit Lead" : "Add New Lead"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveLead} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Full Name *</label>
                    <input required value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                    <input value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} type="email" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Company Name</label>
                    <input value={newLead.companyName} onChange={e => setNewLead({...newLead, companyName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Lead Status</label>
                    <select value={newLead.status} onChange={e => setNewLead({...newLead, status: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Qualified</option>
                      <option>Lost</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Lead Source</label>
                    <select value={newLead.source} onChange={e => setNewLead({...newLead, source: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option>Website</option>
                      <option>Referral</option>
                      <option>Cold Outreach</option>
                      <option>Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Priority Level</label>
                    <select value={newLead.priority} onChange={e => setNewLead({...newLead, priority: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option>High</option>
                      <option>Normal</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingLeadId ? "Update Lead" : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Leads</h1>
          <p className="text-text-secondary text-sm mt-1">Manage and track prospective clients.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, company, or email..." 
            className="w-full bg-surface-elevated border border-border-subtle rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button onClick={() => alert("Advanced filtering will be active in the next phase!")} className="flex items-center gap-2 bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm font-medium hover:border-border-accent transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="glass rounded-xl overflow-visible border border-border-subtle pb-20">
        <div className="overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-elevated/30">
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-muted">
                    No leads found matching your search.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-elevated/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-text-primary">{lead.name}</div>
                      <div className="text-sm text-text-secondary">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {lead.companyName || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        lead.status === 'New' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        lead.status === 'Contacted' ? 'bg-accent/10 text-accent border-accent/20' :
                        'bg-surface-elevated text-text-secondary border-border-subtle'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {lead.source || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center text-xs font-medium ${
                        lead.priority === 'High' ? 'text-red-500' : 'text-text-secondary'
                      }`}>
                        {lead.priority || "Normal"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {typeof lead.createdAt === 'string' ? lead.createdAt.split('T')[0] : new Date(lead.createdAt).toISOString().split('T')[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === lead.id ? null : lead.id)}
                        className="text-text-muted hover:text-accent p-1 opacity-0 group-hover:opacity-100 transition-all rounded-md hover:bg-surface-elevated focus:opacity-100"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {activeMenuId === lead.id && (
                        <div className="absolute right-8 top-10 z-50 w-32 bg-surface-elevated border border-border-subtle rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95">
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center gap-2"
                            onClick={() => handleOpenEdit(lead)}
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                            onClick={() => handleDeleteLead(lead.id)}
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
