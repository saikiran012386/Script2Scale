import React from "react";
import { Badge } from "@script2scale/ui";

interface VersionItem {
  id: string;
  versionNumber: number;
  title: string;
  videoUrl: string;
  status: string;
  createdAt: string;
  feedbackCount: number;
}

interface VersionHistoryListProps {
  versions?: VersionItem[];
  projectId?: string;
}

export function VersionHistoryList({ versions, projectId }: VersionHistoryListProps) {
  const items = versions || [
    {
      id: "v2",
      versionNumber: 2,
      title: "Version 2 - Fine Cut with Motion Graphics",
      videoUrl: "",
      status: "READY_FOR_REVIEW",
      createdAt: "2026-09-05T12:00:00.000Z",
      feedbackCount: 3
    },
    {
      id: "v1",
      versionNumber: 1,
      title: "Version 1 - Rough Assembly",
      videoUrl: "",
      status: "REVISION_REQUESTED",
      createdAt: "2026-09-01T10:00:00.000Z",
      feedbackCount: 5
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">
            Video Version History
          </h3>
          <p className="text-sm text-slate-300 font-medium mt-0.5">
            Iterative cuts, revisions, and feedback history
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
          {items.length} {items.length === 1 ? "Version" : "Versions"}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((v, idx) => {
          const isLatest = idx === 0;
          return (
            <div
              key={v.id || v.versionNumber}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isLatest
                  ? "bg-slate-950 border-emerald-500/40 shadow-emerald-950/20"
                  : "bg-slate-950/40 border-slate-800/80 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`h-9 w-9 rounded-lg flex-shrink-0 flex items-center justify-center font-mono font-bold text-sm ${
                    isLatest
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-slate-900 text-slate-400 border border-slate-800"
                  }`}
                >
                  v{v.versionNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{v.title}</h4>
                    {isLatest && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Latest
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>{new Date(v.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-slate-300">
                      💬 {v.feedbackCount} {v.feedbackCount === 1 ? "comment" : "comments"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <Badge
                  variant={
                    v.status === "READY_FOR_REVIEW"
                      ? "warning"
                      : v.status === "APPROVED"
                      ? "success"
                      : "default"
                  }
                >
                  {v.status.replace(/_/g, " ")}
                </Badge>

                {projectId && (
                  <a
                    href={`/projects/${projectId}/review?v=${v.versionNumber}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                      isLatest
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    {isLatest ? "Review Video →" : "View Cut"}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
