"use client";

import { Plus, Edit2, X, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { createServiceAction, updateServiceAction, deleteServiceAction, seedCatalogServicesAction } from "./actions";

export default function ServicesClient({ initialServices }: { initialServices: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultService = { title: "", description: "", details: "" };
  const [newService, setNewService] = useState(defaultService);

  const handleOpenAdd = () => {
    setNewService(defaultService);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleSeed = () => {
    startTransition(async () => {
      await seedCatalogServicesAction();
    });
  };

  const handleOpenEdit = (service: any) => {
    setNewService({
      title: service.title,
      description: service.description || "",
      details: Array.isArray(service.details) ? service.details.join(", ") : service.details
    });
    setEditingId(service.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteServiceAction(id);
    });
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title) return;
    
    startTransition(async () => {
      const payload = {
        title: newService.title,
        description: newService.description,
        details: newService.details.split(',').map((d: string) => d.trim()).filter(Boolean)
      };

      if (editingId) {
        await updateServiceAction(editingId, payload);
      } else {
        await createServiceAction(payload);
      }
      
      setIsModalOpen(false);
      setNewService(defaultService);
      setEditingId(null);
    });
  };

  const services = initialServices;

  return (    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Service" : "Add New Service"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveService} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Service Title *</label>
                <input required value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <textarea rows={3} value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Deliverables (comma separated)</label>
                <input value={newService.details} onChange={e => setNewService({...newService, details: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" placeholder="E.g., Web Design, SEO, Hosting" />
              </div>
              <div className="pt-4 mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update Service" : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Services</h1>
          <p className="text-text-secondary text-sm mt-1">Manage your agency service offerings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={isPending}
            className="flex items-center gap-2 bg-surface-elevated hover:bg-surface border border-border-subtle hover:border-accent text-text-secondary hover:text-text-primary px-3 py-2 rounded-md font-medium text-xs transition-colors"
          >
            Sync Standard Catalog
          </button>
          <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services.map((service) => (
          <div key={service.id} className="glass rounded-xl p-6 relative group border hover:border-accent/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button onClick={() => handleOpenEdit(service)} className="p-2 text-text-muted hover:text-accent rounded-md hover:bg-surface-elevated transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(service.id)} className="p-2 text-text-muted hover:text-red-500 rounded-md hover:bg-surface-elevated transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-4xl font-bold text-accent/20 mb-4">{service.number}</div>
            <h3 className="text-lg font-bold text-text-primary mb-2 tracking-tight">{service.title}</h3>
            <p className="text-sm text-text-secondary mb-6 line-clamp-3">{service.description}</p>
            
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Deliverables</h4>
              {service.details.map((detail: string, i: number) => (
                <div key={i} className="text-xs text-text-primary flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
