"use client";

import { Plus, Search, Filter, FileText, Send, MoreHorizontal, Download, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([
    {
      id: "1", invoiceNumber: "INV-2026-001", status: "Paid", 
      client: { company: { name: "TechFlow Solutions" } }, project: { name: "E-Commerce Replatforming" },
      total: 12500, issueDate: new Date(Date.now() - 86400000 * 30).toISOString(), dueDate: new Date(Date.now() - 86400000 * 15).toISOString()
    },
    {
      id: "2", invoiceNumber: "INV-2026-002", status: "Overdue", 
      client: { company: { name: "Stellar" } }, project: { name: "Custom CRM Development" },
      total: 22500, issueDate: new Date(Date.now() - 86400000 * 45).toISOString(), dueDate: new Date(Date.now() - 86400000 * 15).toISOString()
    },
    {
      id: "3", invoiceNumber: "INV-2026-003", status: "Sent", 
      client: { company: { name: "GrowthMasters" } }, project: { name: "Q3 SEO Optimization" },
      total: 5000, issueDate: new Date(Date.now() - 86400000 * 5).toISOString(), dueDate: new Date(Date.now() + 86400000 * 10).toISOString()
    },
    {
      id: "4", invoiceNumber: "INV-2026-004", status: "Draft", 
      client: { company: { name: "Innovate Inc" } }, project: null,
      total: 8000, issueDate: null, dueDate: null
    }
  ] as any[]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultInvoice = { clientName: "", projectName: "", total: 0, status: "Draft", dueDate: "" };
  const [newInvoice, setNewInvoice] = useState(defaultInvoice);

  const handleOpenAdd = () => {
    setNewInvoice(defaultInvoice);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (invoice: any) => {
    setNewInvoice({
      clientName: invoice.client?.company?.name || "",
      projectName: invoice.project?.name || "",
      total: invoice.total,
      status: invoice.status,
      dueDate: invoice.dueDate || ""
    });
    setEditingId(invoice.id);
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter(i => i.id !== id));
    setActiveMenuId(null);
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setInvoices(invoices.map(inv => inv.id === editingId ? {
        ...inv,
        client: { company: { name: newInvoice.clientName || "Unknown" } },
        project: { name: newInvoice.projectName || "General" },
        status: newInvoice.status,
        total: Number(newInvoice.total),
        dueDate: newInvoice.dueDate || inv.dueDate
      } : inv));
    } else {
      const invoice = {
        id: Date.now().toString(),
        invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
        client: { company: { name: newInvoice.clientName || "Unknown" } },
        project: { name: newInvoice.projectName || "General" },
        status: newInvoice.status,
        total: Number(newInvoice.total),
        issueDate: new Date().toISOString(),
        dueDate: newInvoice.dueDate || new Date(Date.now() + 86400000 * 14).toISOString()
      };
      setInvoices([invoice, ...invoices]);
    }
    
    setIsModalOpen(false);
    setNewInvoice(defaultInvoice);
    setEditingId(null);
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.client?.company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.project?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Invoice" : "Create New Invoice"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveInvoice} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Client Name *</label>
                    <input required value={newInvoice.clientName} onChange={e => setNewInvoice({...newInvoice, clientName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Project Name</label>
                    <input value={newInvoice.projectName} onChange={e => setNewInvoice({...newInvoice, projectName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Total Amount (₹) *</label>
                    <input required value={newInvoice.total} onChange={e => setNewInvoice({...newInvoice, total: Number(e.target.value)})} type="number" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
                    <select value={newInvoice.status} onChange={e => setNewInvoice({...newInvoice, status: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option>Draft</option>
                      <option>Sent</option>
                      <option>Paid</option>
                      <option>Overdue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Due Date</label>
                    <input type="date" value={newInvoice.dueDate ? newInvoice.dueDate.split('T')[0] : ""} onChange={e => setNewInvoice({...newInvoice, dueDate: e.target.value ? new Date(e.target.value).toISOString() : ""})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update Invoice" : "Create Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Invoices</h1>
          <p className="text-text-secondary text-sm mt-1">Manage billing, collect payments, and track revenue.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search invoices by number or client..." 
            className="w-full bg-surface-elevated border border-border-subtle rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button onClick={() => alert("Advanced filtering coming soon!")} className="flex items-center gap-2 bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm font-medium hover:border-border-accent transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="glass p-4 rounded-xl border border-border-subtle">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Overdue</p>
          <p className="text-xl font-bold text-red-500">₹22,500</p>
        </div>
        <div className="glass p-4 rounded-xl border border-border-subtle">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Outstanding</p>
          <p className="text-xl font-bold text-orange-500">₹5,000</p>
        </div>
        <div className="glass p-4 rounded-xl border border-border-subtle">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Draft</p>
          <p className="text-xl font-bold text-text-secondary">₹8,000</p>
        </div>
        <div className="glass p-4 rounded-xl border border-border-subtle">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Paid (This Month)</p>
          <p className="text-xl font-bold text-green-500">₹12,500</p>
        </div>
      </div>

      <div className="glass rounded-xl overflow-visible border border-border-subtle pb-20">
        <div className="overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-elevated/30">
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Client & Project</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    No invoices found. Create your first invoice.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-surface-elevated/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-text-primary bg-surface-elevated px-2.5 py-1 rounded-md border border-border-subtle">
                        <FileText className="w-3.5 h-3.5 text-accent" />
                        {invoice.invoiceNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-text-primary">{invoice.client?.company?.name || "Unknown Client"}</div>
                      <div className="text-sm text-text-secondary">{invoice.project?.name || "No Project"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        invoice.status === 'Paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        invoice.status === 'Overdue' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                        invoice.status === 'Sent' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        'bg-surface-elevated text-text-secondary border-border-subtle'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-text-primary">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(invoice.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <div className="flex items-center justify-end gap-2">
                        {invoice.status === 'Draft' && (
                          <button onClick={() => {
                            const updated = invoices.map(inv => inv.id === invoice.id ? { ...inv, status: 'Sent' } : inv);
                            setInvoices(updated);
                          }} className="text-text-muted hover:text-accent p-1.5 rounded bg-surface-elevated border border-border-subtle opacity-0 group-hover:opacity-100 transition-all" title="Send Invoice">
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button className="text-text-muted hover:text-text-primary p-1 opacity-0 group-hover:opacity-100 transition-all">
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === invoice.id ? null : invoice.id)}
                          className="text-text-muted hover:text-text-primary p-1 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {activeMenuId === invoice.id && (
                        <div className="absolute right-8 top-10 z-50 w-32 bg-surface-elevated border border-border-subtle rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95">
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center gap-2"
                            onClick={() => handleOpenEdit(invoice)}
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                            onClick={() => handleDelete(invoice.id)}
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
