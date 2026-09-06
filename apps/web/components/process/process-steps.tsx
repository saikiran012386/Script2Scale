"use client";

import React, { useState, useRef } from "react";
import { Display, Body, Label } from "@script2scale/ui";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";
import { useDeviceType } from "../../hooks/use-device-type";

export interface ProcessStepItem {
  id: string;
  stepNumber: string;
  title: string;
  desc: string;
  previewUrl: string;
}

const PROCESS_STEPS: ProcessStepItem[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "Discovery & Hook Strategy",
    desc: "Auditing brand objectives, audience retention curves, and key messaging hooks.",
    previewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "Scripting & Storyboarding",
    desc: "Crafting scene-by-scene script beats, visual storyboards, and audio cues.",
    previewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "Assembly & Motion Edit",
    desc: "Building the narrative assembly cut with kinetic motion graphics and UI overlays.",
    previewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "Color & Sound Mastering",
    desc: "Hollywood LUT color grading, dialogue leveling, and custom sound design.",
    previewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4"
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "Final Master Delivery",
    desc: "Publishing uncompressed multi-aspect master exports and archiving raw project files.",
    previewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  }
];

export function ProcessSteps() {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [activeStep, setActiveStep] = useState<ProcessStepItem | null>(null);
  const [mobileExpandedStep, setMobileExpandedStep] = useState<string | null>(null);
  const { isMobile } = useDeviceType();

  const handleMouseEnter = (step: ProcessStepItem) => {
    if (!isMobile) setActiveStep(step);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setActiveStep(null);
  };

  const handleStepClick = (stepId: string) => {
    if (isMobile) {
      setMobileExpandedStep(mobileExpandedStep === stepId ? null : stepId);
    }
  };

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 max-w-7xl mx-auto border-b border-slate-800/80 space-y-12">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-8">
        <Label uppercase mono size="xs" className="text-brand-yellow block mb-2">Workflow System</Label>
        <Display size="xl" className="tracking-tighter">
          HOW <span className="text-brand-orange font-mono">/</span> WE WORK.
        </Display>
        <Body size="md" muted className="mt-2 max-w-xl">
          Five structured phases engineered for rapid turnaround, frame-accurate revisions, and zero production drag.
        </Body>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {PROCESS_STEPS.map((step, idx) => (
          <div
            key={step.id}
            onMouseEnter={() => handleMouseEnter(step)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleStepClick(step.id)}
            className={`p-6 md:p-8 rounded-2xl bg-surface-100 border border-slate-800/80 hover:border-brand-yellow/50 transition-all cursor-pointer ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start md:items-center gap-6">
                <span className="font-mono text-3xl font-black text-brand-yellow">{step.stepNumber}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{step.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{step.desc}</p>
                </div>
              </div>
              <span className="text-sm font-mono text-slate-500 hidden md:block">STAGE 0{idx + 1}</span>
            </div>

            {/* Mobile Inline Video Preview */}
            {isMobile && mobileExpandedStep === step.id && (
              <div className="mt-4 pt-4 border-t border-slate-800 animate-fade-in">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                  <video src={step.previewUrl} controls autoPlay playsInline className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
