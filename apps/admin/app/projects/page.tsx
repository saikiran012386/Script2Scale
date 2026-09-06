"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Badge, Button, Card } from "@script2scale/ui";
import {
  getProjectsAction,
  updateProjectStatusAction,
  ProjectListItem
} from "../actions";
import { DataTable } from "../../components/data-table/data-table";
import { CreateProjectModal } from "../../components/projects/create-project-modal";

const STATUS_TABS = [
  "ALL",
  "NEW",
  "IN PRODUCTION",
  "REVIEW",
  "APPROVAL",
  "COMPLETED"
] as const;

const PROJECT_STATUSES = [
  "INQUIRY",
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
    case "INQUIRY":
    case "DISCOVERY":
    case "SCRIPTING":
    default:
      return "default";
  }
}

export default function ProjectsDirectoryPage() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await getProjectsAction(search, statusFilter);
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProjects();
    }, 200);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleStatusChange = (projectId: string, newStatus: string) => {
    setNotice(null);
    startTransition(async () => {
      const res = await updateProjectStatusAction(projectId, newStatus);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Status updated." });
        loadProjects();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to update status." });
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono text-brand-yellow uppercase tracking-widest block mb-1">
            AGENCY PIPELINE & PRODUCTION
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
            PROJECTS <span className="text-brand-yellow font-mono">/</span> WORKSPACES.
          </h1>
          <p className="text-sm text-slate-400">
            Monitor video editing, thumbnail design, and client feedback workspaces.
          </p>
        </div>

        <Button
          variant="magnetic-fill"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap"
        >
          + CREATE PROJECT
        </Button>
      </div>

      {/* Action Alert */}
      {notice && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border flex items-center justify-between ${
            notice.type === "success"
              ? "bg-brand-yellow/10 border-brand-yellow/50 text-brand-yellow"
              : "bg-red-950/60 border-red-500/60 text-red-300"
          }`}
        >
          <span>{notice.message}</span>
          <button onClick={() => setNotice(null)} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <Card variant="bordered" className="p-4 bg-slate-900/90 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project name, service, or client..."
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs font-mono text-slate-400 mr-1 uppercase">PIPELINE:</span>
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors ${
                statusFilter === tab
                  ? "bg-brand-yellow text-brand-black font-bold"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* Projects Data Table */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 font-mono text-sm">
          Loading project workspaces...
        </div>
      ) : (
        <DataTable
          data={projects}
          columns={[
            {
              header: "Project Workspace",
              accessorKey: (p) => (
                <div>
                  <a href={`/projects/${p.id}`} className="font-bold text-white hover:text-brand-yellow transition-colors">
                    {p.name}
                  </a>
                  {p.serviceType && <p className="text-xs text-brand-yellow font-mono">{p.serviceType}</p>}
                </div>
              )
            },
            {
              header: "Client",
              accessorKey: (p) => (
                <div>
                  <a href={`/clients/${p.clientId}`} className="text-sm font-semibold text-slate-200 hover:text-brand-yellow">
                    {p.companyName || p.clientName}
                  </a>
                  {p.companyName && <p className="text-xs text-slate-500 font-mono">{p.clientName}</p>}
                </div>
              )
            },
            {
              header: "Status Milestone",
              accessorKey: (p) => (
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusBadgeVariant(p.status)} className="text-[10px] font-mono uppercase px-2 py-0.5">
                    {p.status}
                  </Badge>
                  <select
                    disabled={isPending}
                    value={p.status}
                    onChange={(e) => handleStatusChange(p.id, e.target.value)}
                    className="bg-slate-950 text-[10px] font-mono text-slate-300 border border-slate-800 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                  >
                    {PROJECT_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              )
            },
            {
              header: "Target Deadline",
              accessorKey: (p) => (
                <span className="font-mono text-xs text-slate-400">
                  {p.deadline ? new Date(p.deadline).toLocaleDateString() : "No deadline"}
                </span>
              )
            },
            {
              header: "Assets & Versions",
              accessorKey: (p) => (
                <div className="text-xs font-mono text-slate-400 space-x-2">
                  <span>v{p.versionsCount || 1}</span>
                  <span>•</span>
                  <span>{p.filesCount || 0} files</span>
                </div>
              )
            },
            {
              header: "Actions",
              accessorKey: (p) => (
                <a href={`/projects/${p.id}`} className="text-xs font-mono font-bold text-brand-yellow hover:underline">
                  OPEN WORKSPACE →
                </a>
              )
            }
          ]}
        />
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          loadProjects();
        }}
      />
    </div>
  );
}
