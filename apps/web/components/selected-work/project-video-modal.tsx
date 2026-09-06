"use client";

import React, { useEffect, useRef } from "react";
import { PortfolioProject } from "../../lib/projects-data";
import { useAudio } from "../audio/audio-provider";
import { Badge, Button } from "@script2scale/ui";

export interface ProjectVideoModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export function ProjectVideoModal({ project, onClose }: ProjectVideoModalProps) {
  const { pauseForVideo, resumeAfterVideo } = useAudio();
  const modalRef = useRef<HTMLDivElement>(null);

  // Audio ducking integration test on mount/unmount
  useEffect(() => {
    if (project) {
      pauseForVideo();
      // Lock body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (project) {
        resumeAfterVideo();
        document.body.style.overflow = "";
      }
    };
  }, [project, pauseForVideo, resumeAfterVideo]);

  // Keyboard accessibility: Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-4 md:p-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <div className="relative w-full max-w-5xl bg-surface-100 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Control Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-800 bg-surface-0/60">
          <div>
            <Badge variant="brand" size="sm">{project.category} — {project.year}</Badge>
            <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white mt-1">
              {project.title}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Client: {project.client}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="Close project viewer"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {project.fullVideoUrl ? (
            <video
              src={project.fullVideoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-slate-500 font-mono text-sm">
              [FULL RES SHOWCASE VIDEO PLAYER — {project.title}]
            </div>
          )}
        </div>

        {/* Footer Details */}
        <div className="p-4 md:p-6 bg-surface-0/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
          <p className="text-slate-300 max-w-2xl">{project.description}</p>
          <a href={`/work/${project.slug}`}>
            <Button variant="outline" size="sm">
              Read Full Case Study →
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
