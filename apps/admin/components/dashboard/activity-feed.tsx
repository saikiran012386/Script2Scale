"use client";

import React from "react";
import { Card, CardTitle, Badge } from "@script2scale/ui";
import { ActivityItem } from "../../app/actions";

export interface ActivityFeedProps {
  activities: ActivityItem[];
}

function getActivityBadgeVariant(action: string): "default" | "success" | "warning" | "danger" | "outline" {
  switch (action) {
    case "CLIENT_INVITED":
      return "success";
    case "PROJECT_CREATED":
      return "default";
    case "INQUIRY_CREATED":
      return "warning";
    case "CLIENT_DISABLED":
      return "danger";
    case "CLIENT_DELETED":
      return "danger";
    default:
      return "outline";
  }
}

function formatRelativeTime(dateString: Date | string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <CardTitle className="text-white text-lg font-bold">Recent System Activity</CardTitle>
          <p className="text-xs text-slate-400">Live operational audit trail across clients, inquiries, and projects.</p>
        </div>
        <Badge variant="outline" className="text-brand-yellow border-brand-yellow/30">
          LIVE AUDIT
        </Badge>
      </div>

      {activities.length === 0 ? (
        <div className="py-12 text-center space-y-2">
          <p className="text-sm font-mono text-slate-400">No activity logged yet.</p>
          <p className="text-xs text-slate-500">
            System events (client invitations, inquiry submissions, project milestones) will record here.
          </p>
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          {activities.map((item) => (
            <div key={item.id} className="flex items-start gap-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="mt-0.5">
                <Badge variant={getActivityBadgeVariant(item.action)} className="text-[10px] uppercase font-mono px-2 py-0.5">
                  {item.action.replace("_", " ")}
                </Badge>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm text-slate-200 leading-snug">{item.description}</p>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                  <span>{item.actorName || "System"}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(item.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
