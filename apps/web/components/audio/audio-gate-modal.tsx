"use client";

import React from "react";
import { useAudio } from "./audio-provider";
import { Button, Display, Body } from "@script2scale/ui";

export function AudioGateModal() {
  const { hasEntered, enterWithSound, enterMuted } = useAudio();

  if (hasEntered) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl animate-fade-in">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
          Audio Experience Gate
        </span>
        <Display size="md">Script2Scale Studio</Display>
        <Body size="sm" muted>
          Our studio experience includes an ambient background track. Choose your audio preference to enter.
        </Body>
        <div className="flex flex-col gap-3 pt-2">
          <Button variant="magnetic-fill" size="lg" onClick={enterWithSound} className="w-full">
            Enter With Sound 🔊
          </Button>
          <Button variant="ghost" size="md" onClick={enterMuted} className="w-full text-slate-400">
            Continue Muted 🔇
          </Button>
        </div>
      </div>
    </div>
  );
}
