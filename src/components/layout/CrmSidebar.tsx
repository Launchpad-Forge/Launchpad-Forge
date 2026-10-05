"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "./SidebarContext";
import {
  LayoutDashboard,
  Users,
  Building2,
  Target,
  Briefcase,
  FileText,
  CreditCard,
  Settings,
  FolderKanban,
  CheckSquare,
  Activity,
  Calendar,
  Layers,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/crm", icon: LayoutDashboard },
  {
    name: "CRM",
    items: [
      { name: "Leads", href: "/crm/leads", icon: Target },
      { name: "Contacts", href: "/crm/contacts", icon: Users },
      { name: "Companies", href: "/crm/companies", icon: Building2 },
      { name: "Opportunities", href: "/crm/opportunities", icon: Briefcase },
    ],
  },
  {
    name: "Sales",
    items: [
      { name: "Proposals", href: "/crm/proposals", icon: FileText },
      { name: "Services", href: "/crm/services", icon: Layers },
      { name: "Portfolio", href: "/crm/portfolio", icon: Briefcase },
    ],
  },
  {
    name: "Clients",
    items: [
      { name: "Clients", href: "/crm/clients", icon: Users },
    ],
  },
  {
    name: "Delivery",
    items: [
      { name: "Projects", href: "/crm/projects", icon: FolderKanban },
      { name: "Tasks", href: "/crm/tasks", icon: CheckSquare },
    ],
  },
  {
    name: "Finance",
    items: [
      { name: "Invoices", href: "/crm/invoices", icon: FileText },
      { name: "Payments", href: "/crm/payments", icon: CreditCard },
    ],
  },
  { name: "Activities", href: "/crm/activities", icon: Activity },
  { name: "Follow-ups", href: "/crm/follow-ups", icon: Calendar },
  { name: "Settings", href: "/crm/settings", icon: Settings },
];

export default function CrmSidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebar();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 256,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed md:relative z-50 h-full border-r border-border-subtle bg-surface flex flex-col overflow-hidden whitespace-nowrap",
          "transition-transform duration-300 md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-border-subtle shrink-0">
          <Link href="/crm" className="font-bold text-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-white shrink-0">
              LF
            </div>
            {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="tracking-tight">Forge CRM</motion.span>}
          </Link>
        </div>

      <nav className="flex-1 py-6 px-4 space-y-8">
        {/* Top level items */}
        <div className="space-y-1">
          {navigation.map((item) => {
            if ("items" in item) return null;
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "text-accent" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-accent-dim rounded-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3 w-full" title={isCollapsed ? item.name : undefined}>
                  {Icon && <Icon className="w-5 h-5 shrink-0" />}
                  {!isCollapsed && <span>{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Grouped items */}
        {navigation.map((group) => {
          if (!("items" in group)) return null;
          
          return (
            <div key={group.name} className="space-y-1">
              {!isCollapsed && (
                <h3 className="px-3 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  {group.name}
                </h3>
              )}
              {group.items?.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "text-accent" 
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-accent-dim rounded-md"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-3 w-full" title={isCollapsed ? item.name : undefined}>
                      <Icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>
      </motion.aside>
    </>
  );
}
