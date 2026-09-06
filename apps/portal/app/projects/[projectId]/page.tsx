import React from "react";
import { notFound } from "next/navigation";
import { Badge } from "@script2scale/ui";
import { getClientProjectDetailAction } from "../../actions";
import { ProjectTimeline } from "../../../components/timeline/project-timeline";
import { VersionHistoryList } from "../../../components/version-history/version-list";

export default async function ProjectOverviewPage({
  params
}: {
  params: { projectId: string };
}) {
  const project = await getClientProjectDetailAction(params.projectId);

  if (!project) {
    notFound();
  }

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
          <span className="text-slate-200 truncate">{project.name}</span>
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
              {project.description || "Client production workspace and milestone tracking."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {latestVersion ? (
              <a
                href={`/projects/${project.id}/review?v=${latestVersion.versionNumber}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm font-mono shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2"
              >
                <span>Review Video v{latestVersion.versionNumber}</span>
                <span>→</span>
              </a>
            ) : (
              <a
                href={`/projects/${project.id}/files`}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm font-mono transition-all"
              >
                Upload Assets →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Workspace Tab Navigation */}
      <div className="border-b border-slate-800">
        <nav className="flex space-x-8 font-mono text-sm">
          <a
            href={`/projects/${project.id}`}
            className="border-b-2 border-emerald-400 py-3 text-emerald-400 font-bold flex items-center gap-2"
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
            className="border-b-2 border-transparent py-3 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Final Approval</span>
          </a>
        </nav>
      </div>

      {/* 6-Step Production Timeline */}
      <ProjectTimeline timeline={project.timeline} projectStatus={project.status} />

      {/* Workspace Overview Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Version History */}
        <div className="lg:col-span-2 space-y-6">
          <VersionHistoryList versions={project.versions} projectId={project.id} />
        </div>

        {/* Right Column (1 Col): Project Details & Specifications */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-4">
              Project Overview
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Client</span>
                <span className="text-white font-semibold">
                  {project.client.companyName || project.client.name}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Service</span>
                <span className="text-emerald-400 font-semibold">{project.serviceType || "Custom"}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Target Deadline</span>
                <span className="text-slate-200">
                  {project.deadline
                    ? new Date(project.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })
                    : "Flexible"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Revision Budget</span>
                <span className="text-slate-200">{project.revisionLimit || 3} Included</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Last Activity</span>
                <span className="text-slate-400">{project.updatedRelative}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-3">
              Assets & Documents
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Raw footage, script documents, branding guides, and export files for this project.
            </p>
            <a
              href={`/projects/${project.id}/files`}
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono font-semibold text-slate-200 transition-colors"
            >
              <span>Manage Project Files</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
