"use client";

import React, { useRef, useEffect } from "react";
import { Service } from "@script2scale/types";
import { Badge } from "@script2scale/ui";

export interface HoverPreviewWindowProps {
  service: Service | null;
  positionY?: number;
}

export function HoverPreviewWindow({ service, positionY = 0 }: HoverPreviewWindowProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Performance Guard: Lazy-load and play video ONLY when service is active/hovered
  useEffect(() => {
    if (service && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    } else if (!service && videoRef.current) {
      videoRef.current.pause();
    }
  }, [service]);

  const isVisible = Boolean(service);

  return (
    <div
      className={`absolute right-0 w-80 lg:w-96 pointer-events-none transition-all duration-300 ease-hero-ease z-30 hidden md:block ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}
      style={{
        top: `${positionY}px`
      }}
    >
      <div className="rounded-2xl overflow-hidden bg-surface-100 border border-slate-800 p-3 shadow-2xl backdrop-blur-xl">
        {/* Video / Media Display */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
          {service ? (
            <video
              ref={videoRef}
              src={service.previewMedia.url}
              muted
              loop
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-950 flex items-center justify-center font-mono text-xs text-slate-600">
              [PREVIEW PANEL]
            </div>
          )}

          {/* Floating Badge Overlay */}
          {service && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="brand" size="sm">
                PREVIEW LOOP
              </Badge>
            </div>
          )}
        </div>

        {/* Info Content */}
        {service && (
          <div className="p-3 space-y-2">
            <h4 className="text-sm font-bold text-white tracking-tight">{service.name}</h4>
            <p className="text-xs text-slate-400 line-clamp-2">{service.shortDesc}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {service.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
