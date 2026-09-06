"use client";

import React from "react";
import { Display, Label } from "@script2scale/ui";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";

export function WhySection() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 max-w-7xl mx-auto border-b border-slate-800/80">
      <div className="bg-surface-100/60 border border-slate-800/80 rounded-3xl p-8 md:p-16 relative overflow-hidden text-center space-y-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,195,0,0.1)_0,transparent_60%)] pointer-events-none" />

        <Label uppercase mono size="xs" className="text-brand-yellow block">The Script2Scale Difference</Label>

        <div className="space-y-4 max-w-4xl mx-auto">
          <div
            className={`transition-all duration-700 ease-smooth-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Display size="xl" className="text-slate-400 leading-tight">
              CONTENT SHOULD NOT JUST LOOK GOOD.
            </Display>
          </div>

          <div
            className={`transition-all duration-700 ease-smooth-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Display size="2xl" className="text-brand-yellow leading-tight">
              IT SHOULD DO SOMETHING.
            </Display>
          </div>
        </div>
      </div>
    </section>
  );
}
