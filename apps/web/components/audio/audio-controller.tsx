"use client";

import React from "react";
import { useAudio } from "./audio-provider";

export function AudioController() {
  const { hasEntered, isPlaying, isMuted, volume, isDucked, togglePlay, toggleMute, setVolume } = useAudio();

  if (!hasEntered) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-slate-900/90 border border-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-full text-xs font-mono text-slate-300 shadow-2xl transition-all hover:border-emerald-500/50">
      {isDucked ? (
        <span className="text-amber-400 font-bold animate-pulse">DUCKED (VIDEO PLAYING)</span>
      ) : (
        <>
          <button
            onClick={togglePlay}
            className="hover:text-emerald-400 focus:outline-none transition-colors font-semibold"
            aria-label={isPlaying ? "Pause background music" : "Play background music"}
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>

          <span className="text-slate-700">|</span>

          <button
            onClick={toggleMute}
            className="hover:text-emerald-400 focus:outline-none transition-colors font-semibold"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? "MUTED" : "SOUND ON"}
          </button>

          {!isMuted && (
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-12 h-1 accent-emerald-500 bg-slate-800 rounded cursor-pointer hidden sm:block"
              aria-label="Volume slider"
            />
          )}
        </>
      )}
    </div>
  );
}
