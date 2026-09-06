"use client";

import React, { useState } from "react";
import { Button } from "@script2scale/ui";

interface FeedbackFormProps {
  timestampSeconds?: number;
  isLocked?: boolean;
}

export function FeedbackForm({ timestampSeconds = 84, isLocked = false }: FeedbackFormProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked || !comment.trim()) return;
    alert(`Feedback submitted at ${timestampSeconds}s: "${comment}"`);
    setComment("");
  };

  if (isLocked) {
    return (
      <div className="p-5 bg-slate-900/90 border border-emerald-500/40 rounded-xl space-y-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <span>🔒</span>
          <span>Feedback Submissions Locked</span>
        </div>
        <p className="text-slate-300 leading-relaxed font-sans text-xs">
          This project has received official final client sign-off and is now in <strong>DELIVERED</strong> status. Further revision feedback submissions are closed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
      <div className="flex justify-between items-center text-slate-400">
        <span className="font-semibold text-white">Add Timecoded Note</span>
        <span className="text-emerald-400">Marker: {timestampSeconds}s</span>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        placeholder="Enter your edit request or comment for this timestamp..."
        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
      />
      <Button type="submit" size="sm" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
        Submit Revision Note
      </Button>
    </form>
  );
}
