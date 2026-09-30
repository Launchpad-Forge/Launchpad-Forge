"use client";

import { Search, Bell, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import GlobalSearch from "@/components/modules/GlobalSearch";

export default function CrmHeader() {
  return (
    <header className="h-16 border-b border-border-subtle bg-surface/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-elevated">
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Global Search */}
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-text-secondary hover:text-accent transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center font-medium text-sm overflow-hidden cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}
