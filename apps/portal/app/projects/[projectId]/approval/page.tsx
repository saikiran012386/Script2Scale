import React from "react";
import { notFound } from "next/navigation";
import { Badge } from "@script2scale/ui";
import { getClientProjectDetailAction, getProjectApprovalAction } from "../../../actions";
import { ProjectApprovalView } from "./approval-view";

export default async function ProjectApprovalPage({
  params
}: {
  params: { projectId: string };
}) {
  const project = await getClientProjectDetailAction(params.projectId);
  if (!project) {
    notFound();
  }

  const approvalData = await getProjectApprovalAction(params.projectId);
  const latestVersion = project.versions[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
          <a href="/dashboard" className="hover:text-emerald-400 transition-colors">
            Dashboard
          </a>
          <span>/</span>
          <a href="/dashboard" className="hover:text-emerald-400 transition-colors">
            Projects
          </a>
          <span>/</span>
          <a href={`/projects/${project.id}`} className="hover:text-emerald-400 transition-colors truncate">
            {project.name}
          </a>
          <span>/</span>
          <span className="text-slate-200">Final Approval</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {project.name}
              </h1>
              <Badge variant={project.badgeVariant} size="md">
                {project.statusLabel}
              </Badge>
              {project.serviceType && (
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                  {project.serviceType}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400 max-w-2xl">
              Final project sign-off and master asset delivery authorization.
            </p>
          </div>
        </div>
      </div>

      {/* Workspace Tab Navigation */}
      <div className="border-b border-slate-800">
        <nav className="flex space-x-8 font-mono text-sm">
          <a
            href={`/projects/${project.id}`}
            className="border-b-2 border-transparent py-3 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Overview</span>
          </a>
          <a
            href={`/projects/${project.id}/files`}
            className="border-b-2 border-transparent py-3 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Files & Assets</span>
          </a>
          <a
            href={`/projects/${project.id}/review`}
            className="border-b-2 border-transparent py-3 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Video Review</span>
          </a>
          <a
            href={`/projects/${project.id}/approval`}
            className="border-b-2 border-emerald-400 py-3 text-emerald-400 font-bold flex items-center gap-2"
          >
            <span>Final Approval</span>
          </a>
        </nav>
      </div>

      {/* Main Interactive Approval View */}
      <ProjectApprovalView
        projectId={project.id}
        projectName={project.name}
        clientName={project.client.name}
        companyName={project.client.companyName}
        latestVersion={latestVersion}
        initialApproval={approvalData.approval}
        initialIsApproved={approvalData.isApproved || project.status === "DELIVERED" || project.status === "APPROVED"}
      />
    </div>
  );
}
