"use client";

import React from "react";
import { Display, Body, Button, Label } from "@script2scale/ui";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";

export function FinalCTASection() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 max-w-7xl mx-auto text-center">
      <div className="bg-surface-100 border border-slate-800 rounded-3xl p-10 md:p-20 relative overflow-hidden space-y-8 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,195,0,0.12)_0,transparent_70%)] pointer-events-none" />

        <Label uppercase mono size="xs" className="text-brand-yellow block">Next Steps</Label>

        <div className="space-y-4">
          <Display size="2xl" className="tracking-tighter">
            HAVE AN <span className="text-brand-orange font-mono">/</span> IDEA?
          </Display>
          <Body size="lg" muted className="max-w-xl mx-auto text-slate-300">
            Tell us about your vision, timeline, and goals. We'll assemble a tailored production strategy and quote within 24 hours.
          </Body>
        </div>

        <div className="pt-4">
          <a href="/start-a-project" className="inline-block">
            <Button variant="magnetic-fill" size="lg" className="px-10 py-4 text-lg">
              START A PROJECT →
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
