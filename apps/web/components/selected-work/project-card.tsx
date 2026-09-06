"use client";

import React, { useState } from "react";
import { PortfolioProject } from "../../lib/projects-data";
import { Badge } from "@script2scale/ui";
import { useDeviceType } from "../../hooks/use-device-type";

export interface ProjectCardProps {
  project: PortfolioProject;
  onSelectProject: (project: PortfolioProject) => void;
}

export function ProjectCard({ project, onSelectProject }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const { hasTouch } = useDeviceType();

  const handleClick = (e: React.MouseEvent) => {
    // If on touch device and not active yet, first tap reveals details
    if (hasTouch && !isTouchActive) {
      e.preventDefault();
      setIsTouchActive(true);
      return;
    }
    onSelectProject(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectProject(project);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsTouchActive(false);
      }}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-surface-100 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-surface-0 transition-all duration-300"
    >
      {/* Thumbnail / Video Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        {/* Placeholder / Video Layer */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 flex items-center justify-center transition-transform duration-500 ease-out ${
            isHovered || isTouchActive ? "scale-105" : "scale-100"
          }`}
        >
          <div className="text-center p-4">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-1">
              [{project.category}]
            </span>
            <span className="text-slate-600 font-mono text-xs">
              {project.title}
            </span>
          </div>
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Badge variant="brand" size="sm">
            {project.year}
          </Badge>
        </div>

        {/* Hover / Tap Action Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end transition-all duration-300 ${
            isHovered || isTouchActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90"
          }`}
        >
          <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase mb-1 block">
            {project.client}
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-300 mt-2 line-clamp-2">
            {project.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>VIEW PROJECT</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
