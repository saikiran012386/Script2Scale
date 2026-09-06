"use client";

import React, { useEffect, useState } from "react";
import { Card, CardTitle, CardContent, Button, Badge } from "@script2scale/ui";
import {
  getDashboardStatsAction,
  getRecentActivitiesAction,
  DashboardStats,
  ActivityItem
} from "../actions";
import { ActivityFeed } from "../../components/dashboard/activity-feed";
import { InviteClientModal } from "../../components/clients/invite-client-modal";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    activeClients: 0,
    activeProjects: 0,
    newInquiries: 0,
    pendingReviews: 0
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const loadDashboardData = async () => {
    setIsLoading(true);
    const [fetchedStats, fetchedActivities] = await Promise.all([
      getDashboardStatsAction(),
      getRecentActivitiesAction(8)
    ]);
    setStats(fetchedStats);
    setActivities(fetchedActivities);
    setIsLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-brand-yellow uppercase tracking-widest">
              AGENCY OPERATIONS HUB
            </span>
            <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-700">
              OWNER SESSION
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
            ADMIN <span className="text-brand-yellow font-mono">/</span> DASHBOARD.
          </h1>
          <p className="text-sm text-slate-400">
            Real-time operations status across client accounts, project pipelines, and pending reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="magnetic-fill"
            size="sm"
            onClick={() => setIsInviteOpen(true)}
            className="whitespace-nowrap"
          >
            + INVITE CLIENT
          </Button>
          <a href="/inquiries">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              INQUIRIES ({stats.newInquiries})
            </Button>
          </a>
          <a href="/projects">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              PROJECTS ({stats.activeProjects})
            </Button>
          </a>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 hover:border-slate-700 transition-colors">
          <CardTitle className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
            ACTIVE CLIENTS
          </CardTitle>
          <CardContent className="p-0 flex items-baseline justify-between">
            <span className="text-4xl font-black text-white">
              {isLoading ? "…" : stats.activeClients}
            </span>
            <a href="/clients" className="text-xs text-brand-yellow hover:underline font-mono">
              DIRECTORY →
            </a>
          </CardContent>
        </Card>

        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 hover:border-slate-700 transition-colors">
          <CardTitle className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
            ACTIVE PROJECTS
          </CardTitle>
          <CardContent className="p-0 flex items-baseline justify-between">
            <span className="text-4xl font-black text-brand-yellow">
              {isLoading ? "…" : stats.activeProjects}
            </span>
            <a href="/projects" className="text-xs text-brand-yellow hover:underline font-mono">
              PIPELINE →
            </a>
          </CardContent>
        </Card>

        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 hover:border-slate-700 transition-colors">
          <CardTitle className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
            NEW INQUIRIES
          </CardTitle>
          <CardContent className="p-0 flex items-baseline justify-between">
            <span className="text-4xl font-black text-sky-400">
              {isLoading ? "…" : stats.newInquiries}
            </span>
            <a href="/inquiries" className="text-xs text-sky-400 hover:underline font-mono">
              REVIEW →
            </a>
          </CardContent>
        </Card>

        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 hover:border-slate-700 transition-colors">
          <CardTitle className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
            PENDING REVIEWS
          </CardTitle>
          <CardContent className="p-0 flex items-baseline justify-between">
            <span className="text-4xl font-black text-brand-orange">
              {isLoading ? "…" : stats.pendingReviews}
            </span>
            <a href="/projects" className="text-xs text-brand-orange hover:underline font-mono">
              VERSIONS →
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed Section */}
      <ActivityFeed activities={activities} />

      {/* Invite Client Modal */}
      <InviteClientModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onSuccess={loadDashboardData}
      />
    </div>
  );
}
