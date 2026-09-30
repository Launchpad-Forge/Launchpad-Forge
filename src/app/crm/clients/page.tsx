"use client";

import { Plus, Search, Filter, MoreHorizontal, ExternalLink, ShieldCheck, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ClientsPage() {
  const [clients, setClients] = useState([
    {
      id: "1", status: "Active", 
      company: { name: "TechFlow Solutions", website: "techflow.io", industry: "SaaS" },
      proposals: [{ id: "p1", status: "Accepted" }],
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString()
    },
    {
      id: "2", status: "Active", 
      company: { name: "Stellar E-commerce", website: "stellar.co", industry: "Retail" },
      proposals: [{ id: "p2", status: "Accepted" }, { id: "p3", status: "Accepted" }],
      createdAt: new Date(Date.now() - 86400000 * 180).toISOString()
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultClient = { companyName: "", website: "", industry: "", status: "Active" };
  const [newClient, setNewClient] = useState(defaultClient);

  const handleOpenAdd = () => {
    setNewClient(defaultClient);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: any) => {
    setNewClient({
      companyName: client.company?.name || "",
      website: client.company?.website || "",
      industry: client.company?.industry || "",
      status: client.status
    });
    setEditingId(client.id);
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
    setActiveMenuId(null);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.companyName) return;
    
    if (editingId) {
      setClients(clients.map(c => c.id === editingId ? {
        ...c,
        status: newClient.status,
        company: { name: newClient.companyName, website: newClient.website, industry: newClient.industry }
      } : c));
    } else {
      const client = {
        id: Date.now().toString(),
        status: newClient.status,
        company: { name: newClient.companyName, website: newClient.website, industry: newClient.industry },
        proposals: [],
        createdAt: new Date().toISOString()
      };
      setClients([client, ...clients]);
    }
    
    setIsModalOpen(false);
    setNewClient(defaultClient);
    setEditingId(null);
  };

  const filteredClients = clients.filter(c => 
    c.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Client" : "Onboard New Client"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveClient} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Company Name *</label>
                <input required value={newClient.companyName} onChange={e => setNewClient({...newClient, companyName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Website</label>
                  <input value={newClient.website} onChange={e => setNewClient({...newClient, website: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" placeholder="e.g. example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Industry</label>
                  <input value={newClient.industry} onChange={e => setNewClient({...newClient, industry: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
                <select value={newClient.status} onChange={e => setNewClient({...newClient, status: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Onboarding</option>
                </select>
              </div>
              <div className="pt-4 mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update Client" : "Save Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Clients</h1>
          <p className="text-text-secondary text-sm mt-1">Manage active clients and ongoing relationships.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Onboard Client
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search clients..." 
            className="w-full bg-surface-elevated border border-border-subtle rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button onClick={() => alert("Advanced filtering coming soon!")} className="flex items-center gap-2 bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm font-medium hover:border-border-accent transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.length === 0 ? (
          <div className="col-span-full glass p-12 text-center text-text-muted rounded-xl">
            No clients found matching your search.
          </div>
        ) : (
          filteredClients.map((client) => (
            <div key={client.id} className="glass rounded-xl p-6 hover:border-accent/40 transition-colors group flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent-dim flex items-center justify-center border border-accent/20">
                      <ShieldCheck className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
                        {client.company?.name || "Unknown Company"}
                        {client.status === 'Active' && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                      </h3>
                      <p className="text-sm text-text-secondary">{client.company?.industry || "Industry N/A"}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === client.id ? null : client.id)}
                      className="text-text-muted hover:text-accent p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    
                    {activeMenuId === client.id && (
                      <div className="absolute right-0 top-6 z-50 w-32 bg-surface-elevated border border-border-subtle rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95">
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center gap-2"
                          onClick={() => handleOpenEdit(client)}
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                          onClick={() => handleDelete(client.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-surface-elevated/50 p-3 rounded-lg border border-border-subtle">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Client Since</p>
                    <p className="font-medium text-text-primary text-sm">
                      {new Date(client.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="bg-surface-elevated/50 p-3 rounded-lg border border-border-subtle">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Proposals</p>
                    <p className="font-medium text-text-primary text-sm">
                      {client.proposals?.length || 0} Accepted
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                <Link href={`https://${client.company?.website}`} target="_blank" className="text-sm text-text-secondary hover:text-accent flex items-center gap-1 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  {client.company?.website || "No website"}
                </Link>
                <button className="text-sm font-medium text-accent hover:underline">
                  View Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
