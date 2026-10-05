"use client";

import React from "react";
import { Calendar, Mail, Phone, MessageSquare, CheckCircle2 } from "lucide-react";

export type ActivityType = "email" | "call" | "meeting" | "note" | "task";

export interface TimelineActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
  completed?: boolean;
}

interface ActivityTimelineProps {
  activities: TimelineActivity[];
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "email":
      return <Mail size={14} className="text-[var(--accent)]" />;
    case "call":
      return <Phone size={14} className="text-[var(--accent)]" />;
    case "meeting":
      return <Calendar size={14} className="text-[var(--accent)]" />;
    case "note":
      return <MessageSquare size={14} className="text-[var(--accent)]" />;
    case "task":
      return <CheckCircle2 size={14} className="text-[var(--accent)]" />;
    default:
      return <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />;
  }
};

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-[var(--text-muted)] text-sm italic py-4">
        No recent activities.
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4">
      {activities.map((activity, index) => (
        <div key={activity.id} className="relative pl-12 pb-8">
          {/* Vertical Timeline Line */}
          {index !== activities.length - 1 && (
            <div className="absolute left-[15px] top-8 bottom-[-8px] w-[2px] bg-[var(--border-subtle)]" />
          )}

          {/* Timeline Dot/Icon */}
          <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-accent)] flex items-center justify-center z-10 shadow-[0_0_10px_var(--accent-glow)]">
             {getActivityIcon(activity.type)}
          </div>

          {/* Activity Content Card */}
          <div className="glass p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors duration-300 shadow-sm">
            <div className="flex justify-between items-start mb-2">
               <h4 className="heading-sm text-[var(--text-primary)] font-medium">{activity.title}</h4>
               <span className="text-xs text-[var(--text-muted)] whitespace-nowrap ml-2">{activity.date}</span>
            </div>
            <p className="body-md text-[var(--text-secondary)]">
              {activity.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
