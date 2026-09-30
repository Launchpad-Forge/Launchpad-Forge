"use client";

import { Plus, Search, Filter, X } from "lucide-react";
import KanbanBoard from "@/components/modules/KanbanBoard";
import { useState } from "react";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([
    {
      id: "1", title: "Website Redesign", company: { name: "Acme Corp" },
      estimatedValue: 150000, stage: "New", priority: "Normal", probability: 20
    },
    {
      id: "2", title: "E-Commerce App", company: { name: "Stellar" },
      estimatedValue: 450000, stage: "Discovery", priority: "High", probability: 50
    },
    {
      id: "3", title: "Custom CRM", company: { name: "GrowthMasters" },
      estimatedValue: 280000, stage: "Proposal", priority: "Normal", probability: 70
    },
    {
      id: "4", title: "AI Chatbot", company: { name: "Innovate Inc" },
      estimatedValue: 120000, stage: "Negotiation", priority: "Low", probability: 85
    },
    {
      id: "5", title: "SEO Audit", company: { name: "TechFlow" },
      estimatedValue: 50000, stage: "Qualified", priority: "Normal", probability: 40
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultDeal = { title: "", companyName: "", estimatedValue: 0, stage: "New", priority: "Normal", probability: 20 };
  const [newDeal, setNewDeal] = useState(defaultDeal);

  const handleOpenAdd = () => {
    setNewDeal(defaultDeal);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (deal: any) => {
    setNewDeal({
      title: deal.title,
      companyName: deal.company?.name || "",
      estimatedValue: deal.estimatedValue,
      stage: deal.stage,
      priority: deal.priority,
      probability: deal.probability
    });
    setEditingId(deal.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setOpportunities(opportunities.filter(d => d.id !== id));
  };

  const handleSaveDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.title) return;
    
    if (editingId) {
      setOpportunities(opportunities.map(o => o.id === editingId ? {
        ...o,
        title: newDeal.title,
        company: { name: newDeal.companyName || "Unknown" },
        estimatedValue: Number(newDeal.estimatedValue),
        stage: newDeal.stage,
        priority: newDeal.priority,
        probability: Number(newDeal.probability)
      } : o));
    } else {
      const deal = {
        id: Date.now().toString(),
        title: newDeal.title,
        company: { name: newDeal.companyName || "Unknown" },
        estimatedValue: Number(newDeal.estimatedValue),
        stage: newDeal.stage,
        priority: newDeal.priority,
        probability: Number(newDeal.probability)
      };
      setOpportunities([deal, ...opportunities]);
    }
    
    setIsModalOpen(false);
    setNewDeal(defaultDeal);
    setEditingId(null);
  };

  const filteredDeals = opportunities.filter(deal => 
    deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.company?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Deal" : "Add New Deal"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveDeal} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Deal Title *</label>
                    <input required value={newDeal.title} onChange={e => setNewDeal({...newDeal, title: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Company Name</label>
                    <input value={newDeal.companyName} onChange={e => setNewDeal({...newDeal, companyName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Estimated Value (₹)</label>
                    <input value={newDeal.estimatedValue} onChange={e => setNewDeal({...newDeal, estimatedValue: Number(e.target.value)})} type="number" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Pipeline Stage</label>
                    <select value={newDeal.stage} onChange={e => setNewDeal({...newDeal, stage: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option>New</option>
                      <option>Discovery</option>
                      <option>Proposal</option>
                      <option>Negotiation</option>
                      <option>Won</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
                    <select value={newDeal.priority} onChange={e => setNewDeal({...newDeal, priority: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option>High</option>
                      <option>Normal</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Probability (%)</label>
                    <input value={newDeal.probability} onChange={e => setNewDeal({...newDeal, probability: Number(e.target.value)})} type="number" min="0" max="100" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update Deal" : "Save Deal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="heading-sm">Opportunities</h1>
          <p className="text-text-secondary text-sm mt-1">Manage deals and sales pipeline.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Add Deal
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 shrink-0">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search deals by title or company..." 
            className="w-full bg-surface-elevated border border-border-subtle rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button onClick={() => alert("Advanced filtering coming soon!")} className="flex items-center gap-2 bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm font-medium hover:border-border-accent transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 overflow-x-auto pb-4">
        <KanbanBoard opportunities={filteredDeals} onEdit={handleOpenEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
