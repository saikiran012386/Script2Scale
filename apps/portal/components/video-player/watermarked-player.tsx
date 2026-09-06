"use client";

import React, { useState } from "react";

export interface WatermarkedPlayerProps {
  versionTitle: string;
  versionNumber: number;
  clientName: string;
  videoUrl?: string;
}

export function WatermarkedPlayer({ versionTitle, versionNumber, clientName, videoUrl }: WatermarkedPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex flex-col justify-between p-4 group">
      {/* Watermark Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <span className="text-2xl md:text-4xl font-extrabold text-white uppercase tracking-widest rotate-[-15deg] select-none">
          {clientName} — PREVIEW ONLY — SCRIPT2SCALE
        </span>
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center text-xs font-mono bg-slate-950/80 px-4 py-2 rounded-lg border border-slate-800 text-slate-300">
        <span>{versionTitle} (v{versionNumber})</span>
        <span className="text-emerald-400">WATERMARKED PREVIEW STREAM</span>
      </div>

      {/* Center Play Placeholder */}
      <div className="relative z-10 flex items-center justify-center">
        <button className="h-16 w-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center text-2xl pl-1 shadow-lg hover:scale-105 transition-transform">
          ▶
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center gap-4 text-xs font-mono">
        <button className="text-slate-200 hover:text-emerald-400">PLAY</button>
        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer">
          <div className="bg-emerald-500 h-full w-1/3"></div>
        </div>
        <span className="text-slate-400">01:24 / 03:45</span>
      </div>
    </div>
  );
}
