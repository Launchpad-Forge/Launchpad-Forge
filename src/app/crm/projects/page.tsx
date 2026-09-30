"use client";

import { Plus, Search, Filter, FolderKanban, MoreHorizontal, Clock, CheckCircle2, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: "1", name: "E-Commerce Replatforming", status: "Active", 
      client: { company: { name: "TechFlow Solutions" } },
      budget: 250000, priority: "High", 
      startDate: "2026-09-20T10:00:00Z",
      expectedCompletion: "2026-11-15T10:00:00Z",
      tasks: [{ status: "Done" }, { status: "Done" }, { status: "In Progress" }, { status: "Todo" }]
    },
    {
      id: "2", name: "Custom CRM Development", status: "Planning", 
      client: { company: { name: "Stellar" } },
      budget: 450000, priority: "Normal", 
      startDate: "2026-09-30T10:00:00Z",
      expectedCompletion: "2026-12-30T10:00:00Z",
      tasks: [{ status: "Todo" }, { status: "Todo" }]
    },
    {
      id: "3", name: "Q3 SEO Optimization", status: "Completed", 
      client: { company: { name: "GrowthMasters" } },
      budget: 50000, priority: "Low", 
      startDate: "2026-08-01T10:00:00Z",
      expectedCompletion: "2026-09-28T10:00:00Z",
      tasks: [{ status: "Done" }, { status: "Done" }, { status: "Done" }]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultProject = { name: "", clientName: "", budget: 0, status: "Planning", priority: "Normal" };
  const [newProject, setNewProject] = useState(defaultProject);

  const handleOpenAdd = () => {
    setNewProject(defaultProject);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setNewProject({
      name: project.name,
      clientName: project.client?.company?.name || "",
      budget: project.budget,
      status: project.status,
      priority: project.priority
    });
    setEditingId(project.id);
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    setActiveMenuId(null);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;
    
    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? {
        ...p,
        name: newProject.name,
        client: { company: { name: newProject.clientName || "Unknown" } },
        budget: Number(newProject.budget),
        status: newProject.status,
        priority: newProject.priority
      } : p));
    } else {
      const project = {
        id: Date.now().toString(),
        name: newProject.name,
        client: { company: { name: newProject.clientName || "Unknown" } },
        budget: Number(newProject.budget),
        status: newProject.status,
        priority: newProject.priority,
        startDate: new Date().toISOString(),
        expectedCompletion: new Date(Date.now() + 86400000 * 30).toISOString(),
        tasks: []
      };
      setProjects([project, ...projects]);
    }
    
    setIsModalOpen(false);
    setNewProject(defaultProject);
    setEditingId(null);
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client?.company?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Project" : "Create New Project"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProject} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Project Name *</label>
                    <input required value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Client / Company Name</label>
                    <input value={newProject.clientName} onChange={e => setNewProject({...newProject, clientName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
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
                      <option>Planning</option>
                      <option>Active</option>
                      <option>On Hold</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
                    <select value={newProject.priority} onChange={e => setNewProject({...newProject, priority: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
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
                  {editingId ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
        <button onClick={() => alert("Advanced filtering coming soon!")} className="flex items-center gap-2 bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm font-medium hover:border-border-accent transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
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
                        {project.expectedCompletion ? new Date(project.expectedCompletion).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "TBD"}
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
