"use client";

import React, { useState, useTransition } from "react";
import { Badge, Button, Card, CardTitle, CardContent } from "@script2scale/ui";
import { approveProjectAction, ProjectApprovalRecord } from "../../../actions";

interface ProjectApprovalViewProps {
  projectId: string;
  projectName: string;
  clientName: string;
  companyName?: string | null;
  latestVersion?: {
    id: string;
    versionNumber: number;
    title: string;
    videoUrl: string;
    thumbnailUrl?: string | null;
  } | null;
  initialApproval?: ProjectApprovalRecord | null;
  initialIsApproved: boolean;
}

export function ProjectApprovalView({
  projectId,
  projectName,
  clientName,
  companyName,
  latestVersion,
  initialApproval,
  initialIsApproved
}: ProjectApprovalViewProps) {
  const [isApproved, setIsApproved] = useState(initialIsApproved);
  const [approval, setApproval] = useState<ProjectApprovalRecord | null>(initialApproval || null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed) return;

    setErrorMessage(null);
    startTransition(async () => {
      const versionId = latestVersion?.id || "v2";
      const res = await approveProjectAction(projectId, versionId, notes);
      if (res.success && res.approval) {
        setApproval(res.approval);
        setIsApproved(true);
      } else {
        setErrorMessage(res.message || "Failed to submit final project approval.");
      }
    });
  };

  if (isApproved) {
    return (
      <Card variant="bordered" className="p-8 bg-slate-900/90 border-emerald-500/50 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Certificate Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-3xl shadow-lg shadow-emerald-950/80">
              🏆
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                PROJECT APPROVED & COMPLETED
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {projectName}
              </h2>
            </div>
          </div>

          <Badge variant="brand" size="md" className="self-start sm:self-auto font-mono uppercase px-3 py-1">
            ✓ DELIVERED
          </Badge>
        </div>

        {/* Sign-Off Certificate Audit Card */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Official Sign-Off Audit Trail
          </h3>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-3">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">APPROVED VERSION:</span>
                <span className="text-white font-bold text-sm">
                  {approval?.versionTitle || latestVersion?.title || "Version 2 Final Cut"}
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block uppercase">AUTHORIZED CLIENT SIGNER:</span>
                <span className="text-emerald-400 font-bold">
                  {approval?.approvedBy || clientName}
                </span>
                <span className="text-slate-400 text-[11px] block">
                  {companyName ? `(${companyName})` : ""}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">SIGN-OFF TIMESTAMP:</span>
                <span className="text-slate-200">
                  {approval?.approvedAt
                    ? new Date(approval.approvedAt).toLocaleString("en-US", {
                        dateStyle: "full",
                        timeStyle: "medium"
                      })
                    : new Date().toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block uppercase">DELIVERY STATUS:</span>
                <span className="text-emerald-400 font-bold">
                  Unwatermarked Master Renders Queued
                </span>
              </div>
            </div>
          </div>

          {approval?.notes && (
            <div className="pt-3 border-t border-slate-800 text-slate-300">
              <strong className="text-slate-400 block mb-0.5 text-[10px] uppercase">Sign-Off Notes:</strong>
              <p className="italic font-sans text-sm">"{approval.notes}"</p>
            </div>
          )}
        </div>

        {/* Master Asset Download Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white font-mono uppercase">Master Assets & Master Renders</h4>
            <p className="text-xs text-slate-300">
              Your unwatermarked 4K master files and project deliverables are accessible in the Files tab.
            </p>
          </div>

          <a
            href={`/projects/${projectId}/files`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold text-center shadow-lg transition-all"
          >
            Access Final Files →
          </a>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Overview Card */}
      <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl font-mono">
            📋
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-mono uppercase">
              Final Deliverable Sign-Off
            </h2>
            <p className="text-xs text-slate-400">
              Please review the latest cut below and confirm final project approval.
            </p>
          </div>
        </div>

        {/* Video Preview */}
        {latestVersion ? (
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 uppercase">Reviewing Cut:</span>
              <Badge variant="brand">Version v{latestVersion.versionNumber}</Badge>
            </div>
            <h3 className="text-sm font-bold text-white font-mono">{latestVersion.title}</h3>

            <div className="rounded-xl overflow-hidden bg-black border border-slate-800 aspect-video relative max-w-2xl">
              <video
                controls
                src={latestVersion.videoUrl}
                className="w-full h-full object-contain"
                poster={latestVersion.thumbnailUrl || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80"}
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-mono">No published video cut is ready for approval yet.</p>
        )}
      </Card>

      {/* Approval Form Card */}
      <Card variant="bordered" className="p-6 bg-slate-900/90 border-emerald-500/30 space-y-6">
        <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
          Approval Confirmation & Authorization
        </h3>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
          <p className="flex items-center gap-2 text-emerald-400 font-semibold">
            <span>✔</span>
            <span>By approving this cut, you confirm that all feedback and edit requests have been fulfilled.</span>
          </p>
          <p className="flex items-center gap-2 text-slate-300">
            <span>✔</span>
            <span>Uncompressed 4K master files without watermarks will be queued for immediate delivery.</span>
          </p>
          <p className="flex items-center gap-2 text-slate-400">
            <span>✔</span>
            <span>Project status will advance to DELIVERED (100% completion).</span>
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-mono">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleApprove} className="space-y-6 font-mono text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">
              Optional Sign-Off Remarks / Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Approved for campaign release! Excellent work team."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer group transition-colors hover:border-emerald-500/50">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-950"
            />
            <span className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
              I approve <strong className="text-emerald-400">{latestVersion ? `Version v${latestVersion.versionNumber}` : "Version v2"}</strong> as the final deliverable for <strong className="text-white">{projectName}</strong>.
            </span>
          </label>

          <Button
            type="submit"
            disabled={!isConfirmed || isPending}
            size="lg"
            className={`w-full py-3.5 text-sm font-bold font-mono transition-all ${
              isConfirmed
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/60"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
            }`}
          >
            {isPending ? "Submitting Approval..." : "APPROVE PROJECT →"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
