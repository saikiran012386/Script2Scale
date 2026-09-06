"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Display, Body, Label, Button, Card, CardTitle, CardContent } from "@script2scale/ui";
import { getPublishedProjects, PortfolioProject, ProjectCategory } from "../../../lib/projects-data";
import { ProjectCard } from "../../../components/selected-work/project-card";
import { ProjectVideoModal } from "../../../components/selected-work/project-video-modal";

const FILTER_TABS: Array<{ label: string; value: ProjectCategory | "ALL" }> = [
  { label: "ALL", value: "ALL" },
  { label: "VIDEO", value: "VIDEO" },
  { label: "THUMBNAILS", value: "THUMBNAILS" },
  { label: "POSTERS", value: "POSTERS" },
  { label: "BROCHURES", value: "BROCHURES" }
];

function WorkPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // URL search-param-driven filter state
  const rawCat = searchParams.get("category")?.toUpperCase();
  const currentCategory: ProjectCategory | "ALL" =
    FILTER_TABS.some((tab) => tab.value === rawCat) ? (rawCat as ProjectCategory) : "ALL";

  const handleSelectFilter = (val: ProjectCategory | "ALL") => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "ALL") {
      params.delete("category");
    } else {
      params.set("category", val);
    }
    router.push(`/work?${params.toString()}`, { scroll: false });
  };

  const publishedProjects = getPublishedProjects();
  const filteredProjects =
    currentCategory === "ALL"
      ? publishedProjects
      : publishedProjects.filter((p: PortfolioProject) => p.category === currentCategory);

  return (
    <div className="py-12 md:py-20 px-6 max-w-7xl mx-auto space-y-12">
      {/* Page Hero */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <Label uppercase mono size="xs" className="text-emerald-400 block">Portfolio Archive</Label>
        <Display size="2xl" className="tracking-tighter">
          OUR <span className="text-emerald-500 font-mono">/</span> WORK.
        </Display>
        <Body size="lg" muted className="max-w-2xl text-slate-300">
          Browse our complete archive of commercial video productions, 3D motion graphics, high-CTR thumbnails, key art posters, and investor brochures.
        </Body>
      </div>

      {/* URL-Param Driven Filter Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {FILTER_TABS.map((tab) => {
            const isActive = currentCategory === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => handleSelectFilter(tab.value)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all whitespace-nowrap border ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40"
                    : "bg-surface-100 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-slate-500 hidden sm:block whitespace-nowrap">
          {filteredProjects.length} {filteredProjects.length === 1 ? "PROJECT" : "PROJECTS"}
        </span>
      </div>

      {/* Project Grid / Empty State */}
      {filteredProjects.length === 0 ? (
        <Card variant="bordered" className="p-12 text-center max-w-md mx-auto my-12 space-y-4">
          <CardTitle>No Projects Found</CardTitle>
          <CardContent className="p-0">
            <Body size="sm" muted>
              No projects found in category <strong className="text-white">{currentCategory}</strong>.
            </Body>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectFilter("ALL")}
              className="mt-6"
            >
              Reset Filter to All
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project: PortfolioProject) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={(p: PortfolioProject) => setSelectedProject(p)}
            />
          ))}
        </div>
      )}

      {/* Video Modal with Background Audio Ducking */}
      <ProjectVideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500 font-mono text-xs">LOADING PORTFOLIO...</div>}>
      <WorkPageContent />
    </Suspense>
  );
}
