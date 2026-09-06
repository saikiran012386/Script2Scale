import React from "react";

export default function ProjectFeedbackSection({ projectId }: { projectId: string }) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-2">Timecoded Feedback & Comments</h3>
      <p className="text-sm text-slate-400 font-mono">Target Project: {projectId}</p>
    </div>
  );
}
