"use client";

import { Plus, CheckSquare, Search, Filter, LayoutGrid, List, Edit, Trash2 } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { useState, useTransition } from "react";
import { createTaskAction, updateTaskAction, deleteTaskAction } from "./actions";

export function TasksClient({ tasks, projects }: { tasks: any[], projects: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const defaultTask = { title: "", projectId: "", status: "Todo", priority: "Normal", dueDate: "" };
  const [newTask, setNewTask] = useState(defaultTask);

  const handleOpenAdd = () => {
    setNewTask(defaultTask);
    setEditingId(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: any) => {
    setNewTask({
      title: task.title,
      projectId: task.projectId || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? String(task.dueDate).slice(0, 10) : ""
    });
    setEditingId(task.id);
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      startTransition(async () => {
        const result = await deleteTaskAction(id);
        if (!result.success) setError(result.error || "Unable to delete task.");
      });
    }
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", newTask.title);
      if (newTask.projectId) formData.append("projectId", newTask.projectId);
      formData.append("status", newTask.status);
      formData.append("priority", newTask.priority);
      if (newTask.dueDate) formData.append("dueDate", newTask.dueDate);

      let result;
      if (editingId) {
        result = await updateTaskAction(editingId, formData);
      } else {
        result = await createTaskAction(formData);
      }

      if (result.success) {
        setIsModalOpen(false);
      } else {
        setError(result.error || "Validation failed.");
      }
    });
  };

  const toggleTaskStatus = (task: any) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("status", task.status === 'Done' ? 'Todo' : 'Done');
      const result = await updateTaskAction(task.id, formData);
      if (!result.success) setError(result.error || "Unable to update task.");
    });
  };

  const filteredTasks = tasks.filter(task => !statusFilter || task.status === statusFilter).filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.project?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statuses = ["Todo", "In Progress", "Blocked", "Done"];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col relative">
      <Drawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Task" : "Add New Task"}
      >
        <form onSubmit={handleSaveTask} className="space-y-6">
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Task Title *</label>
                    <input required value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} type="text" className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Project Name *</label>
                    <select required value={newTask.projectId} onChange={e => setNewTask({...newTask, projectId: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option value="">Select a project...</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
                    <select value={newTask.status} onChange={e => setNewTask({...newTask, status: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Blocked">Blocked</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
                    <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors">
                      <option value="High">High</option>
                      <option value="Normal">Normal</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Due Date</label>
                    <input type="date" value={newTask.dueDate ? newTask.dueDate.split('T')[0] : ""} onChange={e => setNewTask({...newTask, dueDate: e.target.value ? new Date(e.target.value).toISOString() : ""})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-[var(--border-subtle)] flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] transition-colors font-medium" disabled={isPending}>Cancel</button>
                <button type="submit" className="px-6 py-2 font-medium bg-accent text-white rounded-lg hover:bg-accent/90 shadow-lg shadow-accent/20 glow-effect" disabled={isPending}>
                  {isPending ? "Saving..." : (editingId ? "Update Task" : "Create Task")}
                </button>
              </div>
            </form>
      </Drawer>

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
          <select aria-label="Filter status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm"><option value="">All statuses</option>{[...new Set(tasks.map(record => record.status as string))].map(status => <option key={status}>{status}</option>)}</select>
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
                          <button onClick={() => handleOpenEdit(task)} className="p-1 text-text-muted hover:text-accent rounded hover:bg-surface transition-colors" disabled={isPending}>
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(task.id)} className="p-1 text-text-muted hover:text-red-500 rounded hover:bg-surface transition-colors" disabled={isPending}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-medium text-text-primary text-sm mb-1 leading-snug">{task.title}</h4>
                      <p className="text-xs text-text-secondary mb-4 line-clamp-1">{task.project?.name || "No Project"}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-border-subtle/50">
                        <div className="flex items-center text-text-muted hover:text-accent transition-colors cursor-pointer" onClick={() => toggleTaskStatus(task)}>
                          <CheckSquare className={`w-4 h-4 ${task.status === 'Done' ? 'text-green-500' : ''}`} />
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-1 rounded-md bg-surface border ${
                          task.dueDate && new Date(task.dueDate) < new Date() && status !== 'Done'
                            ? 'border-red-500/30 text-red-500'
                            : 'border-border-subtle text-text-secondary'
                        }`}>
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "No Date"}
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
