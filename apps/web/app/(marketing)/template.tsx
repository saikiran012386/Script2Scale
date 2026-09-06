"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "@script2scale/ui";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsTransitioning(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <div className="relative min-h-screen">
      {/* Route Transition Overlay */}
      {isTransitioning && !prefersReduced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-1 font-mono font-extrabold text-2xl tracking-widest text-brand-yellow animate-pulse">
            <span>S</span>
            <span className="text-brand-orange">2</span>
            <span>S</span>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className={`transition-opacity duration-300 ${isTransitioning && !prefersReduced ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </div>
  );
}
