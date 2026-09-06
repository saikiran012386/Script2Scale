"use client";

import React from "react";
import { Display, Body, Label, Card, CardContent } from "@script2scale/ui";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  projectTag: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    quote: "Script2Scale completely elevated our brand launch film. The pacing and retention strategy doubled our organic watch time compared to previous campaigns.",
    author: "Sarah Jenkins",
    role: "VP of Marketing",
    company: "Acme Corp",
    projectTag: "Acme Brand Anthem"
  },
  {
    id: "test-2",
    quote: "The frame-accurate feedback loop in the client portal made revisions effortless. We shipped our product reveal film 4 days ahead of schedule.",
    author: "David Chen",
    role: "Co-Founder & CEO",
    company: "NeoTech Systems",
    projectTag: "NeoTech OS Launch"
  },
  {
    id: "test-3",
    quote: "Cinematic quality meets SaaS speed. Script2Scale is the only video agency we trust with our tier-one product announcements.",
    author: "Elena Rostova",
    role: "Head of Brand Strategy",
    company: "Lumina AI",
    projectTag: "Lumina SaaS System"
  }
];

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 max-w-7xl mx-auto border-b border-slate-800/80 space-y-12">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-8">
        <Label uppercase mono size="xs" className="text-brand-yellow block mb-2">Testimonials</Label>
        <Display size="xl" className="tracking-tighter">
          CLIENT <span className="text-brand-orange font-mono">/</span> FEEDBACK.
        </Display>
        <Body size="md" muted className="mt-2 max-w-xl">
          What founders, YouTube creators, and brand directors say about our post-production systems.
        </Body>
      </div>

      {/* Horizontally Scrollable Cards Container */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-800 snap-x snap-mandatory">
        {TESTIMONIALS_DATA.map((t, idx) => (
          <div
            key={t.id}
            className={`min-w-[320px] md:min-w-[420px] max-w-lg flex-1 snap-start transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <Card variant="bordered" className="h-full flex flex-col justify-between p-8 bg-surface-100/90 border-slate-800 hover:border-slate-700">
              <CardContent className="p-0 space-y-6">
                <span className="text-xs font-mono text-brand-yellow uppercase tracking-wider block">
                  [{t.projectTag}]
                </span>
                <p className="text-lg text-slate-200 leading-relaxed font-sans italic">
                  "{t.quote}"
                </p>
              </CardContent>

              <div className="pt-6 border-t border-slate-800/80 mt-6">
                <p className="text-sm font-bold text-white">{t.author}</p>
                <p className="text-xs text-slate-400 mt-0.5">{t.role} • {t.company}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
