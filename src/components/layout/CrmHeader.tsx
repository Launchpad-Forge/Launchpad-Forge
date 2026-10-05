"use client";

import Link from "next/link";
import { Bell, Menu, Moon, Sun, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import GlobalSearch from "@/components/modules/GlobalSearch";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSidebar } from "./SidebarContext";

export default function CrmHeader({ name }: { name: string }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { toggleCollapse, toggleMobile } = useSidebar();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="h-16 border-b border-border-subtle bg-surface/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => window.innerWidth < 768 ? toggleMobile() : toggleCollapse()}
          className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-elevated"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden md:flex items-center text-sm font-medium text-text-muted">
          {pathSegments.map((segment, idx) => (
            <div key={idx} className="flex items-center">
              {idx > 0 && <ChevronRight className="w-4 h-4 mx-1 opacity-50" />}
              <span className={idx === pathSegments.length - 1 ? "text-text-primary capitalize" : "capitalize"}>
                {segment.replace(/-/g, " ")}
              </span>
            </div>
          ))}
        </div>
        
        {/* Global Search */}
        <div className="ml-4 flex-1 max-w-md">
          <GlobalSearch />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="p-2 text-text-secondary hover:text-accent transition-colors">
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <Link href="/crm/follow-ups" aria-label="View follow-ups" className="p-2 text-text-secondary hover:text-accent transition-colors relative">
          <Bell className="w-5 h-5" />
        </Link>
        
        <div className="w-8 h-8 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center font-medium text-sm overflow-hidden cursor-pointer">
          {name.slice(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
