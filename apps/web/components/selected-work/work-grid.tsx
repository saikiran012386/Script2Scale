"use client";

import React, { useState } from "react";
import { Display, Body, Button } from "@script2scale/ui";
import { getFeaturedProjects, PortfolioProject } from "../../lib/projects-data";
import { ProjectCard } from "./project-card";
import { ProjectVideoModal } from "./project-video-modal";

export function SelectedWorkGrid() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "Commercial Video", "3D Motion & Video", "Documentary Video", "Product Explainer Video"];

  const featuredProjects = getFeaturedProjects();
  const filteredProjects = activeCategory === "ALL"
    ? featuredProjects
    : featuredProjects.filter((p) => p.category === activeCategory || p.categoryLabel === activeCategory);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <Display size="xl" className="tracking-tighter">
            SELECTED <span className="text-emerald-500 font-mono">/</span> WORK
          </Display>
          <Body size="md" muted className="mt-2 max-w-xl">
            A curated showcase of commercial films, 3D motion graphics, and high-retention video systems built for industry leaders.
          </Body>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white border-emerald-500 font-bold"
                  : "bg-surface-100 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Grid Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* View All Work Link */}
      <div className="text-center pt-8">
        <a href="/work">
          <Button variant="outline" size="lg" className="px-8">
            EXPLORE COMPLETE ARCHIVE →
          </Button>
        </a>
      </div>

      {/* Full-Screen Video Viewer Modal */}
      <ProjectVideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
