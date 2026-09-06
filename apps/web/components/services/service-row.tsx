"use client";

import React, { useState, useRef } from "react";
import { Service } from "@script2scale/types";
import { useDeviceType } from "../../hooks/use-device-type";

export interface ServiceRowProps {
  service: Service;
  index: number;
  onHoverStart: (service: Service, rowTop: number) => void;
  onHoverEnd: () => void;
}

export function ServiceRow({ service, index, onHoverStart, onHoverEnd }: ServiceRowProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isMobile } = useDeviceType();

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
    const top = rowRef.current ? rowRef.current.offsetTop : 0;
    onHoverStart(service, top);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    // Debounce hover-out by 150ms to prevent flicker when moving quickly between rows
    exitTimeoutRef.current = setTimeout(() => {
      onHoverEnd();
    }, 150);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Mobile tap-to-expand inline preview fallback
    if (isMobile) {
      if (!isMobileExpanded) {
        e.preventDefault();
        setIsMobileExpanded(true);
        return;
      }
    }
  };

  const indexStr = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative border-b border-slate-800 transition-colors hover:border-emerald-500/50"
    >
      <a
        href={`/services/${service.slug}`}
        onClick={handleClick}
        className="flex flex-col md:flex-row md:items-center justify-between py-8 px-4 md:px-6 transition-all duration-200 hover:bg-slate-900/40 rounded-xl"
      >
        {/* Left Info */}
        <div className="flex items-start md:items-center gap-6">
          <span className="font-mono text-xl font-bold text-emerald-500 group-hover:text-emerald-400 transition-colors">
            {indexStr}
          </span>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-emerald-400 transition-colors tracking-tight">
              {service.name}
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl group-hover:text-slate-300 transition-colors">
              {service.shortDesc}
            </p>
          </div>
        </div>

        {/* Right Tags & Arrow */}
        <div className="flex items-center gap-6 mt-4 md:mt-0 pl-12 md:pl-0">
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-slate-400 bg-surface-100 px-3 py-1 rounded-full border border-slate-800 group-hover:border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-2xl text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all">
            →
          </span>
        </div>
      </a>

      {/* Mobile Inline Expanded Preview Fallback */}
      {isMobile && isMobileExpanded && (
        <div className="p-4 bg-surface-100 rounded-xl mb-4 border border-slate-800 space-y-3 animate-fade-in">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <video
              src={service.previewMedia.url}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          {service.features && (
            <ul className="space-y-1 text-xs text-slate-300 list-disc pl-4">
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          <a
            href={`/services/${service.slug}`}
            className="inline-block w-full text-center py-2 bg-emerald-600 text-white font-mono text-xs rounded-lg font-bold"
          >
            VIEW SERVICE DETAILS →
          </a>
        </div>
      )}
    </div>
  );
}
