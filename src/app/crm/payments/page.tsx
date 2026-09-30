"use client";

import { Plus, Search, Filter, ArrowUpRight, ArrowDownRight, X, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([
    {
      id: "1", amount: 125000, date: new Date(Date.now() - 86400000 * 2).toISOString(),
      method: "Bank Transfer", reference: "REF-9988221",
      invoice: { invoiceNumber: "INV-2026-001", client: { company: { name: "TechFlow Solutions" } } }
    },
    {
      id: "2", amount: 50000, date: new Date(Date.now() - 86400000 * 15).toISOString(),
      method: "Stripe", reference: "ch_1N9xZ2",
      invoice: { invoiceNumber: "INV-2026-002", client: { company: { name: "Stellar" } } }
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultPayment = { amount: 0, method: "Bank Transfer", reference: "", invoiceNumber: "", clientName: "" };
  const [newPayment, setNewPayment] = useState(defaultPayment);

  const handleOpenAdd = () => {
    setNewPayment(defaultPayment);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (payment: any) => {
    setNewPayment({
      amount: payment.amount,
      method: payment.method,
      reference: payment.reference,
      invoiceNumber: payment.invoice?.invoiceNumber || "",
      clientName: payment.invoice?.client?.company?.name || ""
    });
    setEditingId(payment.id);
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPayments(payments.filter(p => p.id !== id));
    setActiveMenuId(null);
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayment.amount || !newPayment.clientName) return;
    
    if (editingId) {
      setPayments(payments.map(p => p.id === editingId ? {
        ...p,
        amount: Number(newPayment.amount),
        method: newPayment.method,
        reference: newPayment.reference || p.reference,
        invoice: {
          invoiceNumber: newPayment.invoiceNumber || p.invoice.invoiceNumber,
          client: { company: { name: newPayment.clientName } }
        }
      } : p));
    } else {
      const payment = {
        id: Date.now().toString(),
        amount: Number(newPayment.amount),
        date: new Date().toISOString(),
        method: newPayment.method,
        reference: newPayment.reference || `REF-${Math.floor(Math.random() * 1000000)}`,
        invoice: { 
          invoiceNumber: newPayment.invoiceNumber || `INV-2026-${String(payments.length + 3).padStart(3, '0')}`, 
          client: { company: { name: newPayment.clientName } } 
        }
      };
      setPayments([payment, ...payments]);
    }
    
    setIsModalOpen(false);
    setNewPayment(defaultPayment);
    setEditingId(null);
  };

  const filteredPayments = payments.filter(p => 
    p.invoice.client.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Payment" : "Record Payment"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSavePayment} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Amount (₹) *</label>
                  <input required value={newPayment.amount} onChange={e => setNewPayment({...newPayment, amount: Number(e.target.value)})} type="number" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Method</label>
                  <select value={newPayment.method} onChange={e => setNewPayment({...newPayment, method: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                    <option>Bank Transfer</option>
                    <option>Stripe</option>
                    <option>PayPal</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Client Name *</label>
                <input required value={newPayment.clientName} onChange={e => setNewPayment({...newPayment, clientName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Invoice Number</label>
                  <input value={newPayment.invoiceNumber} onChange={e => setNewPayment({...newPayment, invoiceNumber: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" placeholder="e.g. INV-2026-003" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Reference Number</label>
                  <input value={newPayment.reference} onChange={e => setNewPayment({...newPayment, reference: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" placeholder="Auto-generated if empty" />
                </div>
              </div>
              <div className="pt-4 mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update Payment" : "Save Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Payments</h1>
          <p className="text-text-secondary text-sm mt-1">Track incoming revenue and payment history.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Record Payment
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search payments by reference, client, or invoice..." 
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
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Client & Invoice</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Reference</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    No payments found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-surface-elevated/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                      {new Date(payment.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-text-primary">{payment.invoice?.client?.company?.name || "Unknown Client"}</div>
                      <div className="text-sm text-text-secondary">Ref: {payment.invoice?.invoiceNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-surface-elevated border border-border-subtle">
                        {payment.method || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-text-muted">
                      {payment.reference || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="inline-flex items-center gap-1 font-semibold text-green-500">
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(payment.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === payment.id ? null : payment.id)}
                        className="text-text-muted hover:text-text-primary p-1 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {activeMenuId === payment.id && (
                        <div className="absolute right-8 top-10 z-50 w-32 bg-surface-elevated border border-border-subtle rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95">
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center gap-2"
                            onClick={() => handleOpenEdit(payment)}
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                            onClick={() => handleDelete(payment.id)}
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
