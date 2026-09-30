"use client";

import { Plus, CheckCircle2, Clock, Calendar, AlertCircle, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState([
    { id: "1", title: "Send revised proposal", entity: "Acme Corp", due: "Today", priority: "High", status: "Pending" },
    { id: "2", title: "Check in on contract", entity: "GlobalTech", due: "Tomorrow", priority: "Normal", status: "Pending" },
    { id: "3", title: "Schedule kick-off meeting", entity: "StartUp Inc", due: "Next Week", priority: "Low", status: "Pending" },
    { id: "4", title: "Follow up on initial email", entity: "Innovate Inc", due: "Yesterday", priority: "High", status: "Overdue" },
  ]);

  const [activeTab, setActiveTab] = useState("Today");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultFollowUp = { title: "", entity: "", due: "Today", priority: "Normal" };
  const [newFollowUp, setNewFollowUp] = useState(defaultFollowUp);

  const handleOpenAdd = () => {
    setNewFollowUp(defaultFollowUp);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: any) => {
    setNewFollowUp({
      title: task.title,
      entity: task.entity,
      due: task.due,
      priority: task.priority
    });
    setEditingId(task.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setFollowUps(followUps.filter(f => f.id !== id));
  };

  const handleSaveFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFollowUp.title) return;
    
    if (editingId) {
      setFollowUps(followUps.map(f => f.id === editingId ? {
        ...f,
        title: newFollowUp.title,
        entity: newFollowUp.entity || "General",
        due: newFollowUp.due,
        priority: newFollowUp.priority
      } : f));
    } else {
      const task = {
        id: Date.now().toString(),
        title: newFollowUp.title,
        entity: newFollowUp.entity || "General",
        due: newFollowUp.due,
        priority: newFollowUp.priority,
        status: "Pending"
      };
      setFollowUps([task, ...followUps]);
    }
    
    setIsModalOpen(false);
    setNewFollowUp(defaultFollowUp);
    setEditingId(null);
  };

  const toggleStatus = (id: string) => {
    setFollowUps(followUps.map(f => f.id === id ? { ...f, status: f.status === 'Completed' ? 'Pending' : 'Completed' } : f));
  };

  const filteredFollowUps = followUps.filter(f => {
    if (activeTab === "Completed") return f.status === "Completed";
    if (f.status === "Completed") return false;
    if (activeTab === "Today") return f.due === "Today";
    if (activeTab === "Overdue") return f.status === "Overdue" || f.due === "Yesterday";
    if (activeTab === "Tomorrow") return f.due === "Tomorrow";
    if (activeTab === "Upcoming") return !["Today", "Tomorrow", "Yesterday"].includes(f.due);
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Follow-up" : "Schedule Follow-up"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveFollowUp} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Task / Title *</label>
                <input required value={newFollowUp.title} onChange={e => setNewFollowUp({...newFollowUp, title: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Related Entity (Client/Company)</label>
                <input value={newFollowUp.entity} onChange={e => setNewFollowUp({...newFollowUp, entity: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Due</label>
                  <select value={newFollowUp.due} onChange={e => setNewFollowUp({...newFollowUp, due: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>Next Week</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
                  <select value={newFollowUp.priority} onChange={e => setNewFollowUp({...newFollowUp, priority: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update" : "Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Follow-ups</h1>
          <p className="text-text-secondary text-sm mt-1">Don't let opportunities slip away.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Schedule Follow-up
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-border-subtle mb-6 overflow-x-auto">
        {["Today", "Overdue", "Tomorrow", "Upcoming", "Completed"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${tab === activeTab ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-subtle'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filteredFollowUps.length === 0 && (
          <p className="text-text-muted text-center py-8">No {activeTab.toLowerCase()} follow-ups.</p>
        )}
        {filteredFollowUps.map((task) => (
          <div key={task.id} className={`glass flex items-center justify-between p-4 rounded-lg border hover:border-accent/30 transition-colors group cursor-pointer ${task.status === 'Overdue' ? 'border-red-500/30 bg-red-500/5' : 'border-border-subtle'} ${task.status === 'Completed' ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-4">
              <button onClick={() => toggleStatus(task.id)} className={`mt-0.5 transition-colors ${task.status === 'Completed' ? 'text-green-500' : 'text-text-muted hover:text-accent'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <div>
                <h3 className={`font-medium group-hover:text-accent transition-colors ${task.status === 'Completed' ? 'line-through text-text-muted' : 'text-text-primary'}`}>{task.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                  <span className="font-medium">{task.entity}</span>
                  <span className={`flex items-center gap-1 ${task.status === 'Overdue' ? 'text-red-500 font-medium' : 'text-text-muted'}`}>
                    {task.status === 'Overdue' ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {task.due}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                    task.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-surface-elevated text-text-secondary'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleOpenEdit(task)} className="p-1.5 rounded-md hover:bg-surface-elevated text-text-muted hover:text-accent transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(task.id)} className="p-1.5 rounded-md hover:bg-surface-elevated text-text-muted hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
