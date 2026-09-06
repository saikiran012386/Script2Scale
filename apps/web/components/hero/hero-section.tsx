"use client";

import React from "react";
import { Display, Body, Button, Badge } from "@script2scale/ui";
import { useParallaxLayer } from "../../hooks/use-parallax-layer";
import { useScrollProgress } from "../../hooks/use-scroll-progress";

export function HeroSection() {
  const scrollProgress = useScrollProgress();
  
  // Parallax layer depths
  const glowLayer = useParallaxLayer(3);
  const textLayer = useParallaxLayer(6);
  const floatCard1 = useParallaxLayer(14);
  const floatCard2 = useParallaxLayer(22);
  const floatBadge = useParallaxLayer(28);

  // Scroll compression calculation (0 to 1)
  const compressRatio = Math.min(1, scrollProgress * 4);
  const scale = 1 - compressRatio * 0.08;
  const translateY = compressRatio * -40;
  const opacity = 1 - compressRatio * 0.85;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-surface-0 border-b border-slate-800/80 pt-16">
      {/* Background Parallax Layer: Radial Glow & Grid */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={glowLayer.style}
      >
        <div className="h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      </div>

      {/* Main Container with Scroll-out Compress Effect */}
      <div
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-8"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
          opacity,
          transition: "transform 0.1s linear, opacity 0.1s linear"
        }}
      >
        {/* Badge Layer */}
        <div style={floatBadge.style}>
          <Badge variant="brand" size="md" className="shadow-lg shadow-emerald-950/40">
            VIDEO PRODUCTION & POST-STUDIO
          </Badge>
        </div>

        {/* Headline & Text Parallax Layer */}
        <div style={textLayer.style} className="space-y-6 max-w-4xl">
          <Display size="2xl" className="leading-[0.95] tracking-tighter">
            FROM SCRIPT <span className="text-emerald-500 font-mono">/</span> TO SCALE
          </Display>
          <Body size="lg" muted className="max-w-2xl mx-auto text-slate-300">
            We engineer high-retention commercial video systems, motion graphics, and post-production workflows for brands scaling to market leadership.
          </Body>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <a href="/start-a-project">
            <Button variant="magnetic-fill" size="lg" className="w-full sm:w-auto px-8">
              START A PROJECT →
            </Button>
          </a>
          <a href="/work">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
              VIEW OUR WORK
            </Button>
          </a>
        </div>
      </div>

      {/* Floating Video/Media Layer 1 (Left - Desktop Only) */}
      <div
        className="absolute left-8 bottom-16 hidden lg:block z-20 pointer-events-none"
        style={floatCard1.style}
      >
        <div className="w-64 aspect-video rounded-xl bg-surface-100 border border-slate-700/80 p-2 shadow-2xl backdrop-blur-md opacity-80 rotate-[-4deg] transition-all hover:rotate-0 hover:opacity-100">
          <div className="h-full w-full rounded-lg bg-slate-900 flex items-center justify-center text-[11px] font-mono text-emerald-400">
            [PREVIEW // COMMERCIAL CUT]
          </div>
        </div>
      </div>

      {/* Floating Video/Media Layer 2 (Right - Desktop Only) */}
      <div
        className="absolute right-8 top-28 hidden lg:block z-20 pointer-events-none"
        style={floatCard2.style}
      >
        <div className="w-72 aspect-video rounded-xl bg-surface-100 border border-slate-700/80 p-2 shadow-2xl backdrop-blur-md opacity-85 rotate-[5deg] transition-all hover:rotate-0 hover:opacity-100">
          <div className="h-full w-full rounded-lg bg-slate-900 flex items-center justify-center text-[11px] font-mono text-emerald-400">
            [PREVIEW // 3D MOTION SYSTEM]
          </div>
        </div>
      </div>
    </section>
  );
}
