'use client';

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Layout, Smartphone, Brain, Workflow, Database, Shield } from "lucide-react";
import * as icons from "lucide-react";
import { createPortfolioProjectAction, updatePortfolioProjectAction, deletePortfolioProjectAction, seedCatalogPortfolioAction } from "./actions";

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

type PortfolioProjectItem = {
  icon: string;
  label: string;
};

type PortfolioProject = {
  id: string;
  title: string;
  subtitle: string;
  label: string;
  gradient: string;
  items: Json;
};

export default function PortfolioClient({ initialProjects }: { initialProjects: PortfolioProject[] }) {
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    subtitle: "",
    label: "CONCEPT PROJECT",
    gradient: "linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface-elevated), var(--accent) 5%) 100%)",
    items: "" // comma separated for now
  });
  const [isPending, startTransition] = useTransition();

  const handleSeed = () => {
    startTransition(async () => {
      await seedCatalogPortfolioAction();
      window.location.reload();
    });
  };

  const handleSaveProject = async () => {
    startTransition(async () => {
      try {
        const itemPairs = newProject.items.split(',').map((item) => item.trim()).filter(Boolean);
        const parsedItems = itemPairs.map(item => {
          // simple parsing: Icon:Label
          const parts = item.split(':');
          if (parts.length >= 2) return { icon: parts[0].trim(), label: parts[1].trim() };
          return { icon: "Star", label: item };
        });

        const payload = {
          title: newProject.title,
          subtitle: newProject.subtitle,
          label: newProject.label,
          gradient: newProject.gradient,
          items: parsedItems
        };

        if (editingId) {
          await updatePortfolioProjectAction(editingId, payload);
          setProjects(projects.map(p => p.id === editingId ? { ...p, ...payload, id: editingId, items: parsedItems as any } : p));
        } else {
          const res = await createPortfolioProjectAction(payload);
          setProjects([...projects, { ...res, items: res.items as any }]);
        }
      } catch (err) {
        console.error("Failed to save project", err);
      } finally {
        setEditingId(null);
        setIsAdding(false);
        setNewProject({ title: "", subtitle: "", label: "CONCEPT PROJECT", gradient: "", items: "" });
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      startTransition(async () => {
        try {
          await deletePortfolioProjectAction(id);
          setProjects(projects.filter(p => p.id !== id));
        } catch (err) {
          console.error("Failed to delete project", err);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Portfolio Projects</h2>
          <p className="text-[var(--text-secondary)]">Manage landing page case studies</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={isPending}
            className="bg-surface-elevated hover:bg-surface border border-border-subtle hover:border-accent text-text-secondary hover:text-text-primary px-3 py-2 rounded-lg text-xs font-medium transition-colors"
          >
            Sync Standard Projects
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setNewProject({ title: "", subtitle: "", label: "CONCEPT PROJECT", gradient: "linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface-elevated), var(--accent) 5%) 100%)", items: "" });
              setIsAdding(true);
            }}
            disabled={isPending}
            className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Plus size={18} />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-surface-elevated border border-border-subtle p-6 rounded-xl space-y-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-semibold text-foreground">
            {editingId ? "Edit Project" : "Add New Project"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[var(--text-secondary)] font-medium">Title</label>
              <input
                value={newProject.title}
                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full bg-[var(--background)] border border-border-subtle rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="e.g. Restaurant Operating System"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[var(--text-secondary)] font-medium">Label</label>
              <input
                value={newProject.label}
                onChange={e => setNewProject({ ...newProject, label: e.target.value })}
                className="w-full bg-[var(--background)] border border-border-subtle rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="e.g. CONCEPT PROJECT"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-[var(--text-secondary)] font-medium">Subtitle</label>
              <textarea
                value={newProject.subtitle}
                onChange={e => setNewProject({ ...newProject, subtitle: e.target.value })}
                className="w-full bg-[var(--background)] border border-border-subtle rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-[var(--accent)] transition-colors h-24"
                placeholder="End-to-end management system with QR ordering..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-[var(--text-secondary)] font-medium">Gradient Background</label>
              <input
                value={newProject.gradient}
                onChange={e => setNewProject({ ...newProject, gradient: e.target.value })}
                className="w-full bg-[var(--background)] border border-border-subtle rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface-elevated), var(--accent) 5%) 100%)"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-[var(--text-secondary)] font-medium">Items (Format: IconName:Label, comma separated)</label>
              <textarea
                value={newProject.items}
                onChange={e => setNewProject({ ...newProject, items: e.target.value })}
                className="w-full bg-[var(--background)] border border-border-subtle rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-[var(--accent)] transition-colors h-24"
                placeholder="QrCode:QR Ordering, ChefHat:Kitchen, BarChart3:Analytics"
              />
              <p className="text-xs text-[var(--text-muted)]">Use lucide-react icon names (e.g. QrCode, Database, CheckSquare).</p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              disabled={isPending}
              className="px-4 py-2 text-[var(--text-secondary)] hover:text-foreground transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProject}
              disabled={isPending || !newProject.title}
              className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Project"}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projects.map((project) => {
           let itemsList = Array.isArray(project.items) ? project.items : [];
           return (
            <div key={project.id} className="bg-surface border border-border-subtle rounded-xl p-6 group hover:border-[var(--accent)]/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[var(--accent)] uppercase">
                    {project.label}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mt-1">{project.title}</h3>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingId(project.id);
                      setIsAdding(false);
                      setNewProject({
                        title: project.title,
                        subtitle: project.subtitle,
                        label: project.label,
                        gradient: project.gradient,
                        items: itemsList.map((i: any) => `${i.icon}:${i.label}`).join(', ')
                      });
                    }}
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-[var(--text-secondary)] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-2">
                {project.subtitle}
              </p>
              
              <div className="p-4 rounded-lg bg-surface-elevated flex flex-wrap gap-2">
                {itemsList.map((item: any, i: number) => {
                  const IconComponent = icons[item.icon as keyof typeof icons] as any;
                  return (
                    <div key={i} className="flex items-center gap-2 bg-[var(--background)] px-2 py-1 rounded border border-border-subtle text-xs">
                       {IconComponent ? <IconComponent size={14} className="text-[var(--accent)]"/> : null}
                       <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
           );
        })}
      </div>
    </div>
  );
}
