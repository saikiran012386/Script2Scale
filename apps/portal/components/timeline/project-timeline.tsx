import React from "react";
import { TimelineStep, getProjectTimelineSteps } from "@script2scale/types";

interface ProjectTimelineProps {
  timeline?: {
    steps: TimelineStep[];
    activeStepIndex: number;
    percentComplete: number;
  };
  projectStatus?: string;
}

export function ProjectTimeline({ timeline, projectStatus }: ProjectTimelineProps) {
  const activeTimeline =
    timeline || getProjectTimelineSteps(projectStatus || "REVIEW");
  const { steps, percentComplete } = activeTimeline;

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">
            Production Timeline & Progress
          </h3>
          <p className="text-sm text-slate-300 font-medium mt-0.5">
            Stage-by-stage tracker from kickoff to final 4K delivery
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-xs text-slate-400 font-mono">Progress</span>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-yellow to-brand-orange transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <span className="text-xs font-bold text-brand-yellow font-mono">
            {percentComplete}%
          </span>
        </div>
      </div>

      {/* Desktop Horizontal Stepper */}
      <div className="hidden lg:block relative my-4">
        {/* Connection Line */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-800 -z-0" />
        <div
          className="absolute top-5 left-6 h-0.5 bg-brand-yellow/60 transition-all duration-500 -z-0"
          style={{
            width: `${Math.max(0, Math.min(100, ((activeTimeline.activeStepIndex - 1) / 5) * 100))}%`
          }}
        />

        <div className="grid grid-cols-6 gap-2 relative z-10">
          {steps.map((step) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";

            return (
              <div key={step.id} className="flex flex-col items-center text-center group">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all shadow-md ${
                    isCompleted
                      ? "bg-brand-yellow text-brand-black border border-brand-yellow/40 shadow-brand-yellow/10"
                      : isCurrent
                      ? "bg-brand-yellow/20 text-brand-yellow border-2 border-brand-yellow animate-pulse shadow-brand-yellow/20"
                      : "bg-slate-950 text-slate-500 border border-slate-800"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.stepNumber
                  )}
                </div>
                <span
                  className={`text-xs font-semibold mt-3 ${
                    isCurrent
                      ? "text-brand-yellow"
                      : isCompleted
                      ? "text-slate-200"
                      : "text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 line-clamp-2 max-w-[120px]">
                  {step.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet Vertical Stepper */}
      <div className="lg:hidden flex flex-col gap-4 mt-2">
        {steps.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";

          return (
            <div key={step.id} className="flex items-start gap-4 relative">
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-4 top-8 bottom-0 w-0.5 ${
                    isCompleted ? "bg-brand-yellow" : "bg-slate-800"
                  }`}
                />
              )}
              <div
                className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-mono font-bold transition-all z-10 ${
                  isCompleted
                    ? "bg-brand-yellow text-brand-black"
                    : isCurrent
                    ? "bg-brand-yellow/20 text-brand-yellow border-2 border-brand-yellow animate-pulse"
                    : "bg-slate-950 text-slate-500 border border-slate-800"
                }`}
              >
                {isCompleted ? "✓" : step.stepNumber}
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-semibold ${
                      isCurrent
                        ? "text-brand-yellow"
                        : isCompleted
                        ? "text-slate-200"
                        : "text-slate-500"
                    }`}
                  >
                    {step.label}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
