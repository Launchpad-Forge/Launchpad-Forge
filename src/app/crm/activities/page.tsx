"use client";

import { Plus, Search, Filter, Activity, FileText, Mail, Phone, Calendar, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([
    { id: "1", type: "Email", title: "Sent introductory proposal", date: "Today, 10:30 AM", entity: "TechFlow Solutions", user: "Admin" },
    { id: "2", type: "Meeting", title: "Discovery Call", date: "Yesterday", entity: "Stellar E-commerce", user: "Admin" },
    { id: "3", type: "Note", title: "Updated budget requirements", date: "Oct 12", entity: "Acme Corp", user: "Admin" },
    { id: "4", type: "Call", title: "Followed up on invoice", date: "Oct 10", entity: "Innovate Inc", user: "Admin" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const defaultActivity = { type: "Email", title: "", entity: "" };
  const [newActivity, setNewActivity] = useState(defaultActivity);

  const handleOpenAdd = () => {
    setNewActivity(defaultActivity);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (activity: any) => {
    setNewActivity({
      type: activity.type,
      title: activity.title,
      entity: activity.entity
    });
    setEditingId(activity.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.title) return;
    
    if (editingId) {
      setActivities(activities.map(a => a.id === editingId ? {
        ...a,
        type: newActivity.type,
        title: newActivity.title,
        entity: newActivity.entity || "General"
      } : a));
    } else {
      const activity = {
        id: Date.now().toString(),
        type: newActivity.type,
        title: newActivity.title,
        date: "Just now",
        entity: newActivity.entity || "General",
        user: "Admin"
      };
      setActivities([activity, ...activities]);
    }
    
    setIsModalOpen(false);
    setNewActivity(defaultActivity);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Activity" : "Log Activity"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveActivity} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Activity Type</label>
                <select value={newActivity.type} onChange={e => setNewActivity({...newActivity, type: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                  <option>Email</option>
                  <option>Meeting</option>
                  <option>Note</option>
                  <option>Call</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Title / Description *</label>
                <input required value={newActivity.title} onChange={e => setNewActivity({...newActivity, title: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Related Entity (Client/Company)</label>
                <input value={newActivity.entity} onChange={e => setNewActivity({...newActivity, entity: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div className="pt-4 mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update Activity" : "Log Activity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Activity Timeline</h1>
          <p className="text-text-secondary text-sm mt-1">Track all interactions and events.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Log Activity
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-border-subtle p-6">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-subtle before:to-transparent">
          {activities.length === 0 && <p className="text-text-muted text-center py-4">No activities logged yet.</p>}
          {activities.map((activity, index) => {
            const Icon = activity.type === 'Email' ? Mail : 
                         activity.type === 'Meeting' ? Calendar :
                         activity.type === 'Call' ? Phone : FileText;
                         
            return (
              <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle bg-surface-elevated text-text-secondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-4 rounded-lg border border-border-subtle group-hover:border-accent/40 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">{activity.type}</span>
                    <div className="flex items-center gap-3">
                      <time className="text-xs text-text-muted">{activity.date}</time>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <button onClick={() => handleOpenEdit(activity)} className="text-text-muted hover:text-text-primary p-1">
                          <Edit className="w-3 h-3" />
                        </button>
                        <button onClick={() => handleDelete(activity.id)} className="text-text-muted hover:text-red-500 p-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-text-primary text-sm">{activity.title}</h3>
                  <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                    <span className="font-medium">{activity.entity}</span>
                    <span className="text-text-muted mx-1">•</span>
                    Logged by {activity.user}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
