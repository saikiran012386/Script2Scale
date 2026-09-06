"use client";

import React, { useState, useEffect } from "react";
import { Badge, Button, Card, CardTitle, CardContent } from "@script2scale/ui";
import { getAdminProjectApprovalAction, AdminApprovalDetails } from "../../../app/actions";

interface AdminApprovalTabProps {
  projectId: string;
}

export function AdminApprovalTab({ projectId }: AdminApprovalTabProps) {
  const [data, setData] = useState<AdminApprovalDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const loadApproval = async () => {
    setLoading(true);
    const res = await getAdminProjectApprovalAction(projectId);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    loadApproval();
  }, [projectId]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono text-xs">
        Loading client approval details...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 border border-slate-800 rounded-xl bg-slate-900 text-center font-mono text-xs text-slate-400">
        Unable to load approval details for project.
      </div>
    );
  }

  const { isApproved, approvalRecord, latestVersion, projectName, status } = data;

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">
            Client Sign-Off & Legal Delivery Record
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Tracks client final approval status, sign-off timestamp, and master asset delivery authorization.
          </p>
        </div>

        <Badge
          variant={isApproved ? "brand" : "warning"}
          className="text-xs font-mono uppercase px-3 py-1 self-start sm:self-auto"
        >
          {isApproved ? "✓ APPROVED & DELIVERED" : `STATUS: ${status.replace("_", " ")}`}
        </Badge>
      </div>

      {isApproved ? (
        /* APPROVED STATE - LEGAL SIGN-OFF CERTIFICATE */
        <Card variant="bordered" className="p-8 bg-slate-900/90 border-brand-yellow/40 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

          {/* Certificate Badge Header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-brand-yellow/50 flex items-center justify-center text-brand-yellow text-2xl shadow-lg shadow-black/60">
              🏆
            </div>
            <div>
              <span className="text-[10px] font-mono text-brand-yellow uppercase tracking-widest font-bold">
                OFFICIAL CLIENT SIGN-OFF CERTIFICATE
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight uppercase">
                {projectName} — FINAL DELIVERABLE APPROVED
              </h2>
            </div>
          </div>

          {/* Sign-Off Audit Grid */}
          <div className="grid md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs">
            <div className="space-y-3">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">APPROVED VERSION:</span>
                <span className="text-white font-bold">
                  Version v{approvalRecord?.versionNumber || 2} — {approvalRecord?.versionTitle || "Final Cut"}
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block uppercase">APPROVED BY CLIENT:</span>
                <span className="text-brand-yellow font-bold">
                  {approvalRecord?.approvedByName || "Client Authorized Signer"}
                </span>
                <span className="text-slate-400 text-[11px] block">
                  ({approvalRecord?.approvedByEmail || "client@acme.com"})
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">TIMESTAMP OF SIGN-OFF:</span>
                <span className="text-slate-200">
                  {approvalRecord?.approvedAt
                    ? new Date(approvalRecord.approvedAt).toLocaleString("en-US", {
                        dateStyle: "full",
                        timeStyle: "medium"
                      })
                    : new Date().toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block uppercase">PROJECT STATUS:</span>
                <span className="text-brand-yellow font-bold">DELIVERED (Timeline 100% Complete)</span>
              </div>
            </div>
          </div>

          {/* Notes / Legal Remarks */}
          {approvalRecord?.notes && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-slate-300">
              <strong className="text-slate-400 block mb-1 uppercase text-[10px]">Client Sign-Off Remarks:</strong>
              <p className="italic">"{approvalRecord.notes}"</p>
            </div>
          )}

          {/* Next Steps for Admin */}
          <div className="p-4 rounded-xl bg-brand-yellow/10 border border-brand-yellow/40 text-xs font-mono text-brand-yellow space-y-2">
            <p className="font-bold flex items-center gap-2">
              <span>✓ Deliverables Released</span>
            </p>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              The client has confirmed final approval. Upload clean unwatermarked master exports under the <strong>DELIVERABLES</strong> category in the Files tab if you haven't already.
            </p>
          </div>
        </Card>
      ) : (
        /* PENDING STATE - AWAITING CLIENT SIGN-OFF */
        <Card variant="bordered" className="p-8 bg-slate-900/90 border-slate-800 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-brand-orange/40 flex items-center justify-center text-brand-orange text-xl font-mono">
              ⏳
            </div>
            <div>
              <span className="text-[10px] font-mono text-brand-orange uppercase tracking-widest font-bold">
                SIGN-OFF PENDING
              </span>
              <h3 className="text-lg font-bold text-white font-mono uppercase">
                Awaiting Final Client Approval
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-mono">
            When the client views version cuts in their Client Portal, they can navigate to their <strong>Final Approval</strong> tab to check the sign-off box and authorize project completion.
          </p>

          {latestVersion ? (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 uppercase">Latest Cut Sent to Client:</span>
                <Badge variant="success">Version v{latestVersion.versionNumber}</Badge>
              </div>
              <p className="text-white font-bold">{latestVersion.title}</p>
              <div className="rounded-lg overflow-hidden bg-black border border-slate-800 aspect-video max-w-lg">
                <video
                  controls
                  src={latestVersion.videoUrl}
                  className="w-full h-full object-contain"
                  poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80"
                />
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
              No video version has been published for review yet. Upload and publish a cut under the <strong>VIDEO VERSIONS</strong> tab first.
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
