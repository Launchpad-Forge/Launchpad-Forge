"use client";

import { Plus, Search, Filter, MoreHorizontal, FileText, Send, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ProposalsPage() {
  const [proposals, setProposals] = useState([
    {
      id: "1", proposalNumber: "PRP-2026-001", title: "E-Commerce Replatforming",
      company: { name: "TechFlow Solutions" }, status: "Sent", 
      total: 250000, validUntil: new Date(Date.now() + 86400000 * 7).toISOString(),
      createdAt: new Date().toISOString()
    },
    {
      id: "2", proposalNumber: "PRP-2026-002", title: "Custom CRM Development",
      company: { name: "Stellar" }, status: "Accepted", 
      total: 450000, validUntil: new Date(Date.now() + 86400000 * 3).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "3", proposalNumber: "PRP-2026-003", title: "AI Automation Retainer",
      company: { name: "GrowthMasters" }, status: "Draft", 
      total: 50000, validUntil: new Date(Date.now() + 86400000 * 14).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultProposal = { title: "", companyName: "", total: 0, status: "Draft", validUntil: "" };
  const [newProposal, setNewProposal] = useState(defaultProposal);

  const handleOpenAdd = () => {
    setNewProposal(defaultProposal);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proposal: any) => {
    setNewProposal({
      title: proposal.title,
      companyName: proposal.company?.name || "",
      total: proposal.total,
      status: proposal.status,
      validUntil: proposal.validUntil || ""
    });
    setEditingId(proposal.id);
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProposals(proposals.filter(p => p.id !== id));
    setActiveMenuId(null);
  };

  const handleSaveProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProposal.title) return;
    
    if (editingId) {
      setProposals(proposals.map(p => p.id === editingId ? {
        ...p,
        title: newProposal.title,
        company: { name: newProposal.companyName || "Unknown" },
        status: newProposal.status,
        total: Number(newProposal.total),
        validUntil: newProposal.validUntil || p.validUntil
      } : p));
    } else {
      const proposal = {
        id: Date.now().toString(),
        proposalNumber: `PRP-2026-${String(proposals.length + 1).padStart(3, '0')}`,
        title: newProposal.title,
        company: { name: newProposal.companyName || "Unknown" },
        status: newProposal.status,
        total: Number(newProposal.total),
        validUntil: newProposal.validUntil || new Date(Date.now() + 86400000 * 14).toISOString(),
        createdAt: new Date().toISOString()
      };
      setProposals([proposal, ...proposals]);
    }
    
    setIsModalOpen(false);
    setNewProposal(defaultProposal);
    setEditingId(null);
  };

  const filteredProposals = proposals.filter(proposal => 
    proposal.proposalNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.company?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Proposal" : "Create New Proposal"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProposal} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Proposal Title *</label>
                    <input required value={newProposal.title} onChange={e => setNewProposal({...newProposal, title: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Client Company Name</label>
                    <input value={newProposal.companyName} onChange={e => setNewProposal({...newProposal, companyName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Total Amount (₹) *</label>
                    <input required value={newProposal.total} onChange={e => setNewProposal({...newProposal, total: Number(e.target.value)})} type="number" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
                    <select value={newProposal.status} onChange={e => setNewProposal({...newProposal, status: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option>Draft</option>
                      <option>Sent</option>
                      <option>Accepted</option>
                      <option>Declined</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Valid Until</label>
                    <input type="date" value={newProposal.validUntil ? newProposal.validUntil.split('T')[0] : ""} onChange={e => setNewProposal({...newProposal, validUntil: e.target.value ? new Date(e.target.value).toISOString() : ""})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update Proposal" : "Save Proposal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Proposals</h1>
          <p className="text-text-secondary text-sm mt-1">Create, send, and track business proposals.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Create Proposal
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search proposals by ID, title, or client..." 
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
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Proposal ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Title & Client</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Valid Until</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    No proposals found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProposals.map((proposal) => (
                  <tr key={proposal.id} className="hover:bg-surface-elevated/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-text-primary bg-surface-elevated px-2.5 py-1 rounded-md border border-border-subtle">
                        <FileText className="w-3.5 h-3.5 text-accent" />
                        {proposal.proposalNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-text-primary">{proposal.title}</div>
                      <div className="text-sm text-text-secondary">{proposal.company?.name || "Unknown"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        proposal.status === 'Accepted' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        proposal.status === 'Sent' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        'bg-surface-elevated text-text-secondary border-border-subtle'
                      }`}>
                        {proposal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-text-primary">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(proposal.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {new Date(proposal.validUntil).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <div className="flex items-center justify-end gap-2">
                        {proposal.status === 'Draft' && (
                          <button onClick={() => {
                            const updated = proposals.map(p => p.id === proposal.id ? { ...p, status: 'Sent' } : p);
                            setProposals(updated);
                          }} className="text-text-muted hover:text-accent p-1.5 rounded bg-surface-elevated border border-border-subtle opacity-0 group-hover:opacity-100 transition-all" title="Send Proposal">
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === proposal.id ? null : proposal.id)}
                          className="text-text-muted hover:text-text-primary p-1 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {activeMenuId === proposal.id && (
                        <div className="absolute right-8 top-10 z-50 w-32 bg-surface-elevated border border-border-subtle rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95">
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center gap-2"
                            onClick={() => handleOpenEdit(proposal)}
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                            onClick={() => handleDelete(proposal.id)}
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
