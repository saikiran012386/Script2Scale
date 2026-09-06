"use client";

import React, { useEffect, useState } from "react";
import { Badge, Button, Card, CardTitle, CardContent } from "@script2scale/ui";
import {
  getClientDashboardAction,
  ClientDashboardData
} from "../actions";

export default function ClientDashboardPage() {
  const [dashboardData, setDashboardData] = useState<ClientDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getClientDashboardAction().then((data) => {
      setDashboardData(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !dashboardData) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono text-sm">
        Loading client workspace...
      </div>
    );
  }

  const { user, client, projects } = dashboardData;
  const firstName = (user.name || user.email.split("@")[0] || "CLIENT").toUpperCase();

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto">
      {/* Personalized Header & Subtitle */}
      <div className="border-b border-slate-800 pb-8 space-y-2">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
          CLIENT PORTAL WORKSPACE
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">
          HELLO, {firstName}.
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Welcome to your dedicated Script2Scale post-production portal
          {client?.companyName ? <strong className="text-slate-300"> ({client.companyName})</strong> : null}.
          Track active edits, review video versions, and inspect project timelines.
        </p>
      </div>

      {/* Scoped Project List Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white tracking-tight uppercase flex items-center gap-3">
            YOUR PROJECTS <span className="text-xs font-mono font-normal text-slate-500">({projects.length})</span>
          </h2>
          {projects.length > 0 && (
            <span className="text-xs font-mono text-emerald-400">
              ● Live Real-Time Status Scoped
            </span>
          )}
        </div>

        {projects.length === 0 ? (
          /* Clean Empty State */
          <Card variant="bordered" className="p-12 text-center max-w-lg mx-auto bg-slate-900/80 border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-emerald-400 font-mono text-lg">
              🚀
            </div>
            <CardTitle className="text-xl text-white font-bold">No Active Projects Yet</CardTitle>
            <CardContent className="p-0 space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                Welcome to your Script2Scale Client Portal! Your post-production workspace will appear here as soon as onboarding commences.
              </p>
              <a href="mailto:hello@script2scale.com">
                <Button variant="outline" size="sm" className="mt-2 font-mono">
                  CONTACT ACCOUNT MANAGER →
                </Button>
              </a>
            </CardContent>
          </Card>
        ) : (
          /* Scoped Project Cards Grid */
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <Card key={proj.id} variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-colors">
                <div className="space-y-4">
                  {/* Card Title & Badges */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <a href={`/projects/${proj.id}`} className="group block">
                        <CardTitle className="text-lg text-white group-hover:text-emerald-400 transition-colors font-bold">
                          {proj.name}
                        </CardTitle>
                      </a>
                      {proj.serviceType && (
                        <span className="text-xs font-mono text-emerald-400 block">
                          {proj.serviceType}
                        </span>
                      )}
                    </div>

                    <Badge variant={proj.badgeVariant} className="text-[10px] font-mono uppercase px-2.5 py-1 whitespace-nowrap">
                      {proj.statusLabel}
                    </Badge>
                  </div>

                  {/* Project Description */}
                  {proj.description && (
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  )}

                  {/* Metadata Row: Version & Relative Time */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>
                      {proj.latestVersionNumber ? `Latest Cut: v${proj.latestVersionNumber}` : "Version: v1"}
                    </span>
                    <span className="text-slate-500">
                      {proj.updatedRelative}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {proj.hasPendingReview ? (
                    <a href={`/projects/${proj.id}/review`} className="flex-1">
                      <Button variant="magnetic-fill" size="sm" className="w-full text-xs font-mono">
                        REVIEW LATEST VIDEO →
                      </Button>
                    </a>
                  ) : (
                    <a href={`/projects/${proj.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs font-mono text-emerald-400 border-emerald-500/60 hover:bg-emerald-950/40">
                        OPEN WORKSPACE →
                      </Button>
                    </a>
                  )}

                  <a href={`/projects/${proj.id}`}>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs font-mono">
                      TIMELINE
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
