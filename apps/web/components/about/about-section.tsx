"use client";

import React from "react";
import { Display, Body, Label } from "@script2scale/ui";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";

const WORDS = ["IDEA.", "CREATE.", "REFINE.", "SCALE."];

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 max-w-7xl mx-auto border-b border-slate-800/80 space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <Label uppercase mono size="xs" className="text-emerald-400 block mb-2">Our Philosophy</Label>
          <Display size="xl" className="tracking-tighter">
            WE DON'T <span className="text-emerald-500 font-mono">/</span> JUST EDIT.
          </Display>
        </div>

        <Body size="lg" muted className="max-w-xl text-slate-300">
          Editing is just cut-and-splice. We engineer visual retention systems. Every frame, transition, and sound cue is tuned to hold audience attention and drive conversion.
        </Body>
      </div>

      {/* Animated Word Sequence */}
      <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {WORDS.map((word, idx) => (
          <div
            key={word}
            className={`p-6 rounded-2xl bg-surface-100 border border-slate-800 transition-all duration-700 ease-smooth-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <span className="text-3xl md:text-5xl font-black font-display text-white tracking-tight block">
              {word}
            </span>
            <span className="text-xs font-mono text-emerald-400 mt-2 block">
              PHASE 0{idx + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
