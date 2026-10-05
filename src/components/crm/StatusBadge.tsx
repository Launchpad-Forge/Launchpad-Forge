import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  // Leads & Opportunities
  "New": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Contacted": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Qualified": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Unqualified": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "Discovery": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "Proposal": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Negotiation": "bg-pink-500/10 text-pink-500 border-pink-500/20",
  "Won": "bg-green-500/10 text-green-500 border-green-500/20",
  "Lost": "bg-red-500/10 text-red-500 border-red-500/20",
  "Converted": "bg-green-500/10 text-green-500 border-green-500/20",

  // Projects & Tasks
  "Planning": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Active": "bg-accent/10 text-accent border-accent/20",
  "On Hold": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Completed": "bg-green-500/10 text-green-500 border-green-500/20",
  "Cancelled": "bg-red-500/10 text-red-500 border-red-500/20",
  "Todo": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "In Progress": "bg-accent/10 text-accent border-accent/20",
  "Done": "bg-green-500/10 text-green-500 border-green-500/20",
  "Blocked": "bg-red-500/10 text-red-500 border-red-500/20",

  // Invoices & Proposals
  "Draft": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "Sent": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Viewed": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Accepted": "bg-green-500/10 text-green-500 border-green-500/20",
  "Rejected": "bg-red-500/10 text-red-500 border-red-500/20",
  "Expired": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Partially Paid": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Paid": "bg-green-500/10 text-green-500 border-green-500/20",
  "Overdue": "bg-red-500/10 text-red-500 border-red-500/20",

  // Follow-ups
  "Pending": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Skipped": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "Rescheduled": "bg-blue-500/10 text-blue-500 border-blue-500/20",

  // General Company
  "Prospect": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Active Client": "bg-accent/10 text-accent border-accent/20",
  "Former Client": "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status] || "bg-surface-elevated text-text-secondary border-border-subtle";

  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors duration-300", style, className)}
    >
      {status}
    </motion.span>
  );
}
