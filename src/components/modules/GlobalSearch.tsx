"use client";

import { useState, useEffect } from "react";
import { Search, FileText, Users, Building, Briefcase, Command, FolderKanban, CheckSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Quick action links
  const quickLinks = [
    { name: "Create Lead", icon: <Users className="w-4 h-4" />, href: "/crm/leads", type: "Action" },
    { name: "Create Proposal", icon: <FileText className="w-4 h-4" />, href: "/crm/proposals", type: "Action" },
    { name: "Log Invoice", icon: <FileText className="w-4 h-4" />, href: "/crm/invoices", type: "Action" },
  ];

  // Modules navigation
  const modules = [
    { name: "Leads", icon: <Users className="w-4 h-4" />, href: "/crm/leads", type: "Module" },
    { name: "Companies", icon: <Building className="w-4 h-4" />, href: "/crm/companies", type: "Module" },
    { name: "Opportunities", icon: <Briefcase className="w-4 h-4" />, href: "/crm/opportunities", type: "Module" },
    { name: "Projects", icon: <FolderKanban className="w-4 h-4" />, href: "/crm/projects", type: "Module" },
    { name: "Tasks", icon: <CheckSquare className="w-4 h-4" />, href: "/crm/tasks", type: "Module" },
  ];

  const allResults = [...quickLinks, ...modules];
  const filteredResults = query 
    ? allResults.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.type.toLowerCase().includes(query.toLowerCase()))
    : quickLinks;

  if (!isOpen) {
    return (
      <div 
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-elevated rounded-md border border-border-subtle/50 w-full max-w-md text-sm text-text-muted hover:border-border-accent transition-colors cursor-text group"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1">Search or jump to...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] font-medium opacity-50 group-hover:opacity-100 transition-opacity">
          <Command className="w-3 h-3" />K
        </kbd>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="fixed left-1/2 top-1/4 -translate-x-1/2 -translate-y-4 z-50 w-full max-w-2xl bg-surface border border-border-subtle rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-border-subtle bg-surface-elevated/30">
          <Search className="w-5 h-5 text-text-muted" />
          <input
            autoFocus
            type="text"
            className="flex-1 bg-transparent border-none outline-none px-3 text-text-primary placeholder:text-text-muted"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] font-medium text-text-muted bg-surface-elevated px-2 py-1 rounded border border-border-subtle">
            ESC
          </kbd>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-text-muted text-sm">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(result.href);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-surface-elevated hover:text-accent transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 text-text-primary group-hover:text-accent">
                    <span className="text-text-muted group-hover:text-accent/70 transition-colors">
                      {result.icon}
                    </span>
                    {result.name}
                  </div>
                  <span className="text-xs text-text-muted font-medium bg-surface px-1.5 py-0.5 rounded border border-border-subtle group-hover:border-accent/20">
                    {result.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="px-4 py-2 border-t border-border-subtle bg-surface-elevated/30 flex justify-between items-center text-[10px] text-text-muted">
          <span>Launchpad Forge Global Search</span>
          <span className="flex items-center gap-2">
            <span>Use <kbd className="font-mono bg-surface border border-border-subtle px-1 rounded">↑</kbd> <kbd className="font-mono bg-surface border border-border-subtle px-1 rounded">↓</kbd> to navigate</span>
            <span><kbd className="font-mono bg-surface border border-border-subtle px-1 rounded">↵</kbd> to select</span>
          </span>
        </div>
      </div>
    </>
  );
}
