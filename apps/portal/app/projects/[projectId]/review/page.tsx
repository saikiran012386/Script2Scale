import React from "react";
import { notFound } from "next/navigation";
import { Badge } from "@script2scale/ui";
import { getClientProjectDetailAction, getProjectApprovalAction } from "../../../actions";
import { WatermarkedPlayer } from "../../../../components/video-player/watermarked-player";
import { FeedbackForm } from "../../../../components/feedback-form/feedback-form";
import { VersionHistoryList } from "../../../../components/version-history/version-list";

export default async function VideoReviewPage({
  params
}: {
  params: { projectId: string };
}) {
  const project = await getClientProjectDetailAction(params.projectId);
  if (!project) {
    notFound();
  }

  const approvalData = await getProjectApprovalAction(params.projectId);
  const isApproved = approvalData.isApproved || project.status === "DELIVERED" || project.status === "APPROVED";
  const latestVersion = project.versions[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
          <a href="/dashboard" className="hover:text-brand-yellow transition-colors">
            Dashboard
          </a>
          <span>/</span>
          <a href="/dashboard" className="hover:text-brand-yellow transition-colors">
            Projects
          </a>
          <span>/</span>
          <a href={`/projects/${project.id}`} className="hover:text-brand-yellow transition-colors truncate">
            {project.name}
          </a>
          <span>/</span>
          <span className="text-slate-200">Video Review</span>
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
              Frame-accurate video playback, revision notes, and release version history.
            </p>
          </div>

          <div>
            <a
              href={`/projects/${project.id}/approval`}
              className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm font-mono shadow-lg shadow-brand-orange/20 transition-all inline-flex items-center gap-2"
            >
              <span>{isApproved ? "View Final Sign-Off ✓" : "Approve Cut & Finalize →"}</span>
            </a>
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
            className="border-b-2 border-brand-yellow py-3 text-brand-yellow font-bold flex items-center gap-2"
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

      {/* Main Review Workspace Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WatermarkedPlayer
            versionTitle={latestVersion ? latestVersion.title : "Acme Brand Anthem Cut v2"}
            versionNumber={latestVersion ? latestVersion.versionNumber : 2}
            clientName={project.client.companyName || project.client.name}
            videoUrl={latestVersion?.videoUrl}
          />
          <FeedbackForm timestampSeconds={84} isLocked={isApproved} />
        </div>
        <div className="space-y-6">
          <VersionHistoryList versions={project.versions} projectId={project.id} />
        </div>
      </div>
    </div>
  );
}
