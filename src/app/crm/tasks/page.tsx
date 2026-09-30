"use client";

import { Plus, CheckSquare, Search, Filter, LayoutGrid, List, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { InteractiveCheck } from "@/components/ui/InteractiveCheck";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: "1", title: "Setup CI/CD pipeline", project: { name: "Custom CRM Development" },
      status: "Todo", priority: "High", dueDate: new Date(Date.now() + 86400000 * 2).toISOString()
    },
    {
      id: "2", title: "Design wireframes", project: { name: "E-Commerce Replatforming" },
      status: "In Progress", priority: "Normal", dueDate: new Date(Date.now() + 86400000 * 5).toISOString()
    },
    {
      id: "3", title: "Configure database schema", project: { name: "Custom CRM Development" },
      status: "Done", priority: "High", dueDate: new Date(Date.now() - 86400000 * 1).toISOString()
    },
    {
      id: "4", title: "Client feedback review", project: { name: "E-Commerce Replatforming" },
      status: "Blocked", priority: "Normal", dueDate: new Date().toISOString()
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultTask = { title: "", projectName: "", status: "Todo", priority: "Normal", dueDate: "" };
  const [newTask, setNewTask] = useState(defaultTask);

  const handleOpenAdd = () => {
    setNewTask(defaultTask);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: any) => {
    setNewTask({
      title: task.title,
      projectName: task.project?.name || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
    });
    setEditingId(task.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    
    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? {
        ...t,
        title: newTask.title,
        project: { name: newTask.projectName || "General" },
        status: newTask.status,
        priority: newTask.priority,
        dueDate: newTask.dueDate || t.dueDate
      } : t));
    } else {
      const task = {
        id: Date.now().toString(),
        title: newTask.title,
        project: { name: newTask.projectName || "General" },
        status: newTask.status,
        priority: newTask.priority,
        dueDate: newTask.dueDate || new Date().toISOString()
      };
      setTasks([task, ...tasks]);
    }
    
    setIsModalOpen(false);
    setNewTask(defaultTask);
    setEditingId(null);
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.project?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statuses = ["Todo", "In Progress", "Blocked", "Done"];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <h2 className="font-semibold">{editingId ? "Edit Task" : "Add New Task"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveTask} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Task Title *</label>
                    <input required value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Project Name</label>
                    <input value={newTask.projectName} onChange={e => setNewTask({...newTask, projectName: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
                    <select value={newTask.status} onChange={e => setNewTask({...newTask, status: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option>Todo</option>
                      <option>In Progress</option>
                      <option>Blocked</option>
                      <option>Done</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
                    <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option>High</option>
                      <option>Normal</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Due Date</label>
                    <input type="date" value={newTask.dueDate ? newTask.dueDate.split('T')[0] : ""} onChange={e => setNewTask({...newTask, dueDate: e.target.value ? new Date(e.target.value).toISOString() : ""})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 shadow-lg shadow-accent/20">
                  {editingId ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="heading-sm">Tasks</h1>
          <p className="text-text-secondary text-sm mt-1">Manage project deliverables and to-dos.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 shrink-0">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tasks..." 
            className="w-full bg-surface-elevated border border-border-subtle rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert("Advanced filtering coming soon!")} className="flex items-center gap-2 bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm font-medium hover:border-border-accent transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <div className="flex bg-surface-elevated border border-border-subtle rounded-md p-0.5">
            <button className="p-1.5 bg-background rounded shadow-sm text-text-primary">
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-text-muted hover:text-text-primary transition-colors">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full items-start">
          {statuses.map((status) => {
            const columnTasks = filteredTasks.filter((t) => t.status === status);
            
            return (
              <div key={status} className="flex-shrink-0 w-80 flex flex-col h-full bg-surface-elevated/30 rounded-xl p-4 border border-border-subtle">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm text-text-primary flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      status === 'Done' ? 'bg-green-500' :
                      status === 'In Progress' ? 'bg-blue-500' :
                      status === 'Blocked' ? 'bg-red-500' : 'bg-text-muted'
                    }`} />
                    {status}
                  </h3>
                  <span className="text-xs font-medium text-text-muted bg-surface-elevated px-2 py-0.5 rounded-full border border-border-subtle">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                  {columnTasks.map((task) => (
                    <div key={task.id} className="group glass-elevated p-4 rounded-lg cursor-grab active:cursor-grabbing border border-border-subtle hover:border-accent/40 transition-all hover:shadow-md">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                          task.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-surface-elevated text-text-secondary'
                        }`}>
                          {task.priority || 'Normal'}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleOpenEdit(task)} className="p-1 text-text-muted hover:text-accent rounded hover:bg-surface transition-colors">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(task.id)} className="p-1 text-text-muted hover:text-red-500 rounded hover:bg-surface transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-text-primary text-sm mb-1 leading-snug">{task.title}</h4>
                      <p className="text-xs text-text-secondary mb-4 line-clamp-1">{task.project?.name || "No Project"}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border-subtle/50">
                        <div className="flex items-center text-text-muted hover:text-accent transition-colors cursor-pointer" onClick={() => {
                          const updated = tasks.map(t => t.id === task.id ? { ...t, status: t.status === 'Done' ? 'Todo' : 'Done' } : t);
                          setTasks(updated);
                        }}>
                          <CheckSquare className={`w-4 h-4 ${task.status === 'Done' ? 'text-green-500' : ''}`} />
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-1 rounded-md bg-surface border ${
                          new Date(task.dueDate) < new Date() && status !== 'Done'
                            ? 'border-red-500/30 text-red-500' 
                            : 'border-border-subtle text-text-secondary'
                        }`}>
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "No Date"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
