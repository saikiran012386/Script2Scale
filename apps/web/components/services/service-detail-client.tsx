"use client";

import React, { useState } from "react";
import { Display, Label, Button, Badge, Card } from "@script2scale/ui";
import { Service } from "@script2scale/types";
import { PortfolioProject } from "../../lib/projects-data";
import { ProjectCard } from "../selected-work/project-card";
import { ProjectVideoModal } from "../selected-work/project-video-modal";

export interface ServiceDetailClientProps {
  service: Service;
  matchingProjects: PortfolioProject[];
}

export function ServiceDetailClient({ service, matchingProjects }: ServiceDetailClientProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Split name for editorial styling if possible
  const nameParts = service.name.split(" ");
  const firstWord = nameParts[0].toUpperCase();
  const restOfName = nameParts.slice(1).join(" ").toUpperCase();

  return (
    <div className="py-12 md:py-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Top Breadcrumb */}
      <div>
        <a
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-brand-yellow transition-colors"
        >
          <span>←</span>
          <span>BACK TO ALL SERVICES</span>
        </a>
      </div>

      {/* Hero Section */}
      <div className="grid lg:grid-cols-12 gap-12 items-start border-b border-slate-800 pb-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Label uppercase mono size="xs" className="text-brand-yellow bg-brand-yellow/10 px-3 py-1 rounded-full border border-brand-yellow/30">
              SERVICE OFFERING
            </Label>
            {service.categoryFilterKey && (
              <Badge variant="brand" size="sm">
                {service.categoryFilterKey}
              </Badge>
            )}
          </div>

          <Display size="2xl" className="tracking-tighter uppercase leading-tight">
            {firstWord} <span className="text-brand-orange font-mono">/</span> {restOfName}.
          </Display>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-sans">
            {service.longDesc || service.shortDesc}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-slate-300 bg-surface-100 px-3.5 py-1.5 rounded-full border border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a href={`/start-a-project?service=${service.slug}`}>
              <Button variant="magnetic-fill" size="lg">
                BOOK THIS SERVICE →
              </Button>
            </a>
            <a href="#sub-offerings">
              <Button variant="outline" size="lg">
                EXPLORE CAPABILITIES
              </Button>
            </a>
          </div>
        </div>

        {/* Media Preview Box */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shadow-brand-yellow/10 group">
            <div className="aspect-video w-full relative">
              <video
                src={service.previewMedia.url}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-surface-100/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>PREVIEW DEMO REEL</span>
              <span className="text-brand-yellow font-bold">LIVE PREVIEW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Offerings & Capabilities Breakdown */}
      <div id="sub-offerings" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <Label uppercase mono size="xs" className="text-brand-yellow">
            CAPABILITIES & SPECIALIZATIONS
          </Label>
          <Display size="lg" className="tracking-tight">
            WHAT IS INCLUDED
          </Display>
        </div>

        {service.subOfferings && service.subOfferings.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {service.subOfferings.map((sub, idx) => (
              <Card
                key={sub.title}
                variant="bordered"
                className="p-6 space-y-3 bg-surface-100/50 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-brand-yellow font-bold">
                    0{idx + 1}.
                  </span>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {sub.title}
                  </h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {sub.description}
                </p>
              </Card>
            ))}
          </div>
        )}

        {/* Deliverables & Features Checklist */}
        {service.features && service.features.length > 0 && (
          <Card variant="bordered" className="p-8 bg-surface-100/30 border-slate-800 space-y-6">
            <h4 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              KEY DELIVERABLES & WORKFLOW SPECIFICATIONS
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <span className="text-brand-yellow text-base font-bold select-none">✓</span>
                  <span className="text-sm text-slate-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Matching Selected Work (Capped at 3) */}
      {matchingProjects.length > 0 && (
        <div className="space-y-8 border-t border-slate-800 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <Label uppercase mono size="xs" className="text-brand-yellow">
                PROVEN RESULTS
              </Label>
              <Display size="lg" className="tracking-tight">
                SELECTED {service.categoryFilterKey || "SERVICE"} WORK.
              </Display>
            </div>
            {service.categoryFilterKey && (
              <a
                href={`/work?category=${service.categoryFilterKey}`}
                className="text-xs font-mono font-bold text-brand-yellow hover:text-brand-orange transition-colors flex items-center gap-1"
              >
                <span>VIEW ALL {service.categoryFilterKey} PROJECTS</span>
                <span>→</span>
              </a>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {matchingProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Conversion Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-surface-100 via-slate-900 to-slate-950 border border-slate-800 p-8 md:p-12 text-center space-y-6">
        <Display size="md" className="tracking-tight text-white">
          READY TO ELEVATE YOUR CONTENT WITH {service.name.toUpperCase()}?
        </Display>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
          Tell us about your project vision, timeline, and goals. We will put together a custom proposal tailored to your needs.
        </p>
        <div>
          <a href={`/start-a-project?service=${service.slug}`}>
            <Button variant="magnetic-fill" size="lg">
              START A PROJECT WITH THIS SERVICE →
            </Button>
          </a>
        </div>
      </div>

      {/* Video Modal Player */}
      <ProjectVideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
