"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Badge, Button, Card, CardTitle, CardContent } from "@script2scale/ui";
import { getProjectDetailAction, updateProjectStatusAction } from "../../app/actions";
import { AdminFilesTab } from "./tabs/files-tab";
import { AdminVersionsTab } from "./tabs/versions-tab";
import { AdminApprovalTab } from "./tabs/approval-tab";

export interface ProjectWorkspaceViewProps {
  projectId: string;
}

const WORKSPACE_TABS = [
  { id: "overview", label: "OVERVIEW" },
  { id: "files", label: "FILES (0)" },
  { id: "versions", label: "VIDEO VERSIONS" },
  { id: "feedback", label: "FEEDBACK" },
  { id: "approval", label: "APPROVAL & DELIVERY" }
] as const;

const MILESTONES = [
  "DISCOVERY",
  "SCRIPTING",
  "PRODUCTION",
  "POST_PRODUCTION",
  "REVIEW",
  "APPROVED",
  "DELIVERED"
];

function getStatusBadgeVariant(status: string): "default" | "success" | "warning" | "brand" | "outline" {
  switch (status) {
    case "REVIEW":
      return "warning";
    case "APPROVED":
      return "brand";
    case "DELIVERED":
      return "outline";
    case "PRODUCTION":
    case "POST_PRODUCTION":
      return "success";
    default:
      return "default";
  }
}

export function ProjectWorkspaceView({ projectId }: ProjectWorkspaceViewProps) {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadWorkspace = async () => {
    setIsLoading(true);
    const result = await getProjectDetailAction(projectId);
    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWorkspace();
  }, [projectId]);

  const handleStatusUpdate = (newStatus: string) => {
    setNotice(null);
    startTransition(async () => {
      const res = await updateProjectStatusAction(projectId, newStatus);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Project status updated." });
        loadWorkspace();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to update status." });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono text-sm">
        Loading project workspace data...
      </div>
    );
  }

  if (!data || !data.project) {
    return (
      <div className="space-y-6">
        <a href="/projects" className="text-xs font-mono text-emerald-400 hover:underline">
          ← BACK TO PROJECTS DIRECTORY
        </a>
        <div className="p-12 border border-slate-800 rounded-2xl bg-slate-900 text-center space-y-3">
          <p className="text-lg font-bold text-white uppercase">Project Workspace Not Found</p>
          <p className="text-xs text-slate-400">The requested project workspace record does not exist.</p>
        </div>
      </div>
    );
  }

  const { project, client, inquiry, versions = [], files = [] } = data;
  const currentMilestoneIndex = MILESTONES.indexOf(project.status) !== -1 ? MILESTONES.indexOf(project.status) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Breadcrumb & Actions */}
      <div className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center justify-between">
          <a href="/projects" className="text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors">
            ← BACK TO PROJECTS PIPELINE
          </a>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            WORKSPACE ID: {project.id}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
                {project.name}
              </h1>
              <Badge variant={getStatusBadgeVariant(project.status)} className="text-xs font-mono uppercase px-2.5 py-0.5">
                {project.status}
              </Badge>
              {project.serviceType && (
                <Badge variant="outline" className="text-xs font-mono text-emerald-400 border-emerald-500/30">
                  {project.serviceType}
                </Badge>
              )}
            </div>

            <p className="text-xs font-mono text-slate-400">
              Assigned Client:{" "}
              <a href={`/clients/${client.id}`} className="text-emerald-400 hover:underline font-bold">
                {client.companyName || client.name}
              </a>
            </p>
          </div>

          {/* Status Advancement Button Group */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 uppercase hidden sm:inline">ADVANCE STAGE:</span>
            <select
              disabled={isPending}
              value={project.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs font-mono text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {MILESTONES.map((st) => (
                <option key={st} value={st}>
                  {st.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notice Alert */}
      {notice && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border flex items-center justify-between ${
            notice.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-300"
              : "bg-red-950/60 border-red-500/60 text-red-300"
          }`}
        >
          <span>{notice.message}</span>
          <button onClick={() => setNotice(null)} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Workspace Tab Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
        {WORKSPACE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-emerald-500 text-emerald-400 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            {tab.id === "files" ? `FILES (${files.length})` : tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Milestone Progress Bar */}
          <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                PRODUCTION MILESTONE PROGRESS
              </CardTitle>
              <span className="text-xs font-mono text-emerald-400">
                Step {currentMilestoneIndex + 1} of {MILESTONES.length}
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-2">
              {MILESTONES.map((st, idx) => (
                <div key={st} className="space-y-1.5 text-center">
                  <div
                    className={`h-2 rounded-full transition-colors ${
                      idx <= currentMilestoneIndex ? "bg-emerald-500" : "bg-slate-800"
                    }`}
                  />
                  <span
                    className={`text-[9px] font-mono block uppercase ${
                      idx === currentMilestoneIndex
                        ? "text-emerald-400 font-bold"
                        : idx < currentMilestoneIndex
                        ? "text-slate-300"
                        : "text-slate-600"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Overview Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
              <CardTitle className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                PROJECT SPECIFICATIONS
              </CardTitle>
              <CardContent className="p-0 space-y-2 text-xs font-mono text-slate-300">
                <p><strong className="text-white">Service Offering:</strong> {project.serviceType || "Video Editing"}</p>
                <p><strong className="text-white">Target Deadline:</strong> {project.deadline ? new Date(project.deadline).toLocaleDateString() : "Flexible / TBD"}</p>
                <p><strong className="text-white">Revision Limit:</strong> {project.revisionLimit} rounds</p>
                <p><strong className="text-white">Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>

            <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
              <CardTitle className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                CLIENT CONTACT & ACCESS
              </CardTitle>
              <CardContent className="p-0 space-y-2 text-xs font-mono text-slate-300">
                <p><strong className="text-white">Company:</strong> {client.companyName || client.name}</p>
                <p><strong className="text-white">Contact Name:</strong> {client.name}</p>
                <p><strong className="text-white">Email:</strong> {client.email}</p>
                {client.phone && <p><strong className="text-white">Phone:</strong> {client.phone}</p>}
              </CardContent>
            </Card>

            <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
              <CardTitle className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                CONVERTED INQUIRY RECORD
              </CardTitle>
              <CardContent className="p-0 space-y-2 text-xs font-mono text-slate-300">
                {inquiry ? (
                  <>
                    <p><strong className="text-white">Lead Name:</strong> {inquiry.fullName}</p>
                    <p><strong className="text-white">Requested Timeline:</strong> {inquiry.timeline || "N/A"}</p>
                    <p className="line-clamp-2 text-slate-400">{inquiry.projectDetails}</p>
                  </>
                ) : (
                  <p className="text-slate-500">Directly created by owner (No linked public inquiry record).</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Project Brief */}
          {project.description && (
            <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-2">
              <CardTitle className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                PROJECT BRIEF / OBJECTIVES
              </CardTitle>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Files Workspace (Prompt 21) */}
      {activeTab === "files" && (
        <AdminFilesTab projectId={projectId} />
      )}

      {/* Video Versions Workspace (Prompt 22) */}
      {activeTab === "versions" && (
        <AdminVersionsTab projectId={projectId} />
      )}

      {/* Feedback Placeholder (Prompt 23) */}
      {activeTab === "feedback" && (
        <Card variant="bordered" className="p-12 bg-slate-900/60 border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-emerald-400 font-mono text-xl">
            💬
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase">Frame-Accurate Client Feedback Feed</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Timecoded client comments, frame markers, drawing annotations, and resolution checkmarks will populate here in Prompt 23.
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-mono text-slate-500 border-slate-700">
            PROMPT 23 INTEGRATION PLACEHOLDER
          </Badge>
        </Card>
      )}

      {/* Approval & Delivery Workspace (Prompt 24) */}
      {activeTab === "approval" && (
        <AdminApprovalTab projectId={projectId} />
      )}
    </div>
  );
}
