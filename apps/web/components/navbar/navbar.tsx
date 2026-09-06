"use client";

import React, { useState } from "react";
import { useScrollProgress } from "../../hooks/use-scroll-progress";
import { Button } from "@script2scale/ui";

const NAV_ITEMS = [
  { href: "/work", label: "WORK", hoverLabel: "VIEW WORK" },
  { href: "/services", label: "SERVICES", hoverLabel: "OUR SERVICES" },
  { href: "/about", label: "ABOUT", hoverLabel: "OUR STORY" }
];

export function Navbar() {
  const scrollProgress = useScrollProgress();
  const isScrolled = scrollProgress > 0.02;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <>
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-slate-950 focus:font-bold focus:rounded-lg"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-slate-950/85 backdrop-blur-lg border-b border-slate-800/80 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="/"
            className="group flex items-center gap-1.5 text-xl font-extrabold tracking-tighter text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
          >
            <span className="font-display">SCRIPT</span>
            <span className="text-emerald-500 font-mono transition-transform duration-300 group-hover:scale-125">
              2
            </span>
            <span className="font-display">SCALE</span>
          </a>

          {/* Navigation Links with Micro-interaction */}
          <nav className="flex items-center gap-8 text-xs font-mono font-bold tracking-wider">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative py-1 text-slate-300 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                <span className="inline-block transition-transform duration-200">
                  {hoveredIdx === idx ? item.hoverLabel : item.label}
                </span>
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-emerald-400 transition-all duration-200 ${
                    hoveredIdx === idx ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Right Action & Client Login */}
          <div className="flex items-center gap-4">
            <a
              href="/client-login"
              className="hidden sm:inline-block text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-2 py-1"
            >
              CLIENT LOGIN
            </a>
            <a href="/start-a-project">
              <Button variant="magnetic-fill" size="sm">
                START A PROJECT →
              </Button>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
