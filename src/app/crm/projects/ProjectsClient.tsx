"use client";

import { Plus, Search, Filter, FolderKanban, MoreHorizontal, Clock, CheckCircle2, Edit, Trash2 } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { useState, useTransition } from "react";
import { createProjectAction, updateProjectAction, deleteProjectAction } from "./actions";

export function ProjectsClient({ projects, clients }: { projects: any[], clients: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const defaultProject = { name: "", clientId: "", budget: 0, status: "Planning", priority: "Normal" };
  const [newProject, setNewProject] = useState(defaultProject);

  const handleOpenAdd = () => {
    setNewProject(defaultProject);
    setEditingId(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setNewProject({
      name: project.name,
      clientId: project.clientId || "",
      budget: project.budget || 0,
      status: project.status,
      priority: project.priority
    });
    setEditingId(project.id);
    setActiveMenuId(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      startTransition(async () => {
        const result = await deleteProjectAction(id);
        if (!result.success) setError(result.error || "Unable to delete project.");
      });
    }
    setActiveMenuId(null);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", newProject.name);
      if (newProject.clientId) formData.append("clientId", newProject.clientId);
      formData.append("budget", newProject.budget.toString());
      formData.append("status", newProject.status);
      formData.append("priority", newProject.priority);

      let result;
      if (editingId) {
        result = await updateProjectAction(editingId, formData);
      } else {
        result = await createProjectAction(formData);
      }

      if (result.success) {
        setIsModalOpen(false);
      } else {
        setError(result.error || "Validation failed.");
      }
    });
  };

  const filteredProjects = projects.filter(project => !statusFilter || project.status === statusFilter).filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client?.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <Drawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Project" : "Create New Project"}
      >
        <form onSubmit={handleSaveProject} className="space-y-6">
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Project Name *</label>
                    <input required value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Client</label>
                    <select value={newProject.clientId} onChange={e => setNewProject({...newProject, clientId: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option value="">Select a client...</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.company?.name || "Unknown Company"}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Budget (₹)</label>
                    <input value={newProject.budget} onChange={e => setNewProject({...newProject, budget: Number(e.target.value)})} type="number" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
                    <select value={newProject.status} onChange={e => setNewProject({...newProject, status: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option value="Planning">Planning</option>
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
                    <select value={newProject.priority} onChange={e => setNewProject({...newProject, priority: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option value="High">High</option>
                      <option value="Normal">Normal</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-[var(--border-subtle)] flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] transition-colors font-medium" disabled={isPending}>Cancel</button>
                <button type="submit" className="px-6 py-2 font-medium bg-accent text-white rounded-lg hover:bg-accent/90 shadow-lg shadow-accent/20 glow-effect" disabled={isPending}>
                  {isPending ? "Saving..." : (editingId ? "Update Project" : "Create Project")}
                </button>
              </div>
            </form>
      </Drawer>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-sm">Projects</h1>
          <p className="text-text-secondary text-sm mt-1">Manage delivery, timelines, and budgets.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-surface-elevated border border-border-subtle rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <select aria-label="Filter status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm"><option value="">All statuses</option>{[...new Set(projects.map(record => record.status as string))].map(status => <option key={status}>{status}</option>)}</select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full glass p-12 text-center text-text-muted rounded-xl">
            No projects found matching your search.
          </div>
        ) : (
          filteredProjects.map((project) => {
            const completedTasks = project.tasks?.filter((t: any) => t.status === 'Done').length || 0;
            const totalTasks = project.tasks?.length || 0;
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return (
              <div key={project.id} className="glass rounded-xl p-5 hover:border-accent/40 transition-colors group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-surface-elevated rounded-md border border-border-subtle">
                      <FolderKanban className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        project.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                        project.status === 'Active' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-surface-elevated text-text-secondary'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === project.id ? null : project.id)}
                      className="text-text-muted hover:text-text-primary p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {activeMenuId === project.id && (
                      <div className="absolute right-0 top-6 z-50 w-32 bg-surface-elevated border border-border-subtle rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center gap-2"
                          onClick={() => handleOpenEdit(project)}
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-text-primary text-lg mb-1">{project.name}</h3>
                <p className="text-sm text-text-secondary mb-6">{project.client?.company?.name || "No Client Assigned"}</p>

                <div className="mt-auto space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-text-muted font-medium">Progress</span>
                      <span className="text-text-primary font-medium">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${project.status === 'Completed' ? 'bg-green-500' : 'bg-accent'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-text-muted">{completedTasks} / {totalTasks} tasks</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Budget</span>
                      <span className="text-sm font-medium text-text-primary">
                        {project.budget ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(project.budget) : "N/A"}
                      </span>
                    </div>

                    <div className="flex flex-col text-right">
                      <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Due</span>
                      <span className={`text-sm font-medium flex items-center justify-end gap-1 ${
                        project.status === 'Completed' ? 'text-green-500' : 'text-text-primary'
                      }`}>
                        {project.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5 text-text-muted" />}
                        {project.expectedCompletion ? new Date(project.expectedCompletion).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBD"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
