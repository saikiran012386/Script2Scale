import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Display, Body, Label, Badge, Button, Card, CardHeader, CardTitle, CardContent } from "@script2scale/ui";
import { getPublishedProjects, getProjectBySlug, PortfolioProject } from "../../../../lib/projects-data";

export async function generateStaticParams() {
  return getPublishedProjects().map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found | Script2Scale"
    };
  }

  return {
    title: `${project.title} — Case Study | Script2Scale`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Script2Scale Video Case Study`,
      description: project.description,
      images: [{ url: project.thumbnailUrl }]
    }
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const published = getPublishedProjects();
  const nextProject = published.find((p) => p.slug === project.nextSlug) || published[0];
  const prevProject = published.find((p) => p.slug === project.prevSlug) || published[published.length - 1];

  return (
    <div className="py-16 md:py-24 px-6 max-w-6xl mx-auto space-y-12">
      {/* Back Link */}
      <a
        href="/work"
        className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1"
      >
        ← BACK TO ALL WORK ARCHIVE
      </a>

      {/* Case Study Header */}
      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex gap-2">
          <Badge variant="brand">{project.categoryLabel}</Badge>
          <Badge variant="outline">{project.year}</Badge>
        </div>
        <Display size="2xl" className="tracking-tighter">
          {project.title}
        </Display>
        <Body size="lg" muted className="max-w-3xl">
          {project.description}
        </Body>
      </div>

      {/* Primary Video / Media Hero */}
      <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        {project.fullVideoUrl ? (
          <video
            src={project.fullVideoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-sm text-slate-500">
            [FULL RES SHOWCASE VIDEO PLAYER — {project.title}]
          </div>
        )}
      </div>

      {/* Metadata Row: CLIENT, SERVICE, YEAR, TOOLS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-surface-100 border border-slate-800">
        <div>
          <Label uppercase mono size="xs">CLIENT</Label>
          <p className="text-sm font-bold text-white mt-1">{project.client}</p>
        </div>
        <div>
          <Label uppercase mono size="xs">SERVICE</Label>
          <p className="text-sm font-bold text-white mt-1">{project.categoryLabel}</p>
        </div>
        <div>
          <Label uppercase mono size="xs">YEAR</Label>
          <p className="text-sm font-bold text-white mt-1">{project.year}</p>
        </div>
        <div>
          <Label uppercase mono size="xs">TOOLS USED</Label>
          <div className="flex flex-wrap gap-1 mt-1">
            {project.tools.map((t) => (
              <span key={t} className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative Section: WHAT WE DID & RESULT */}
      <div className="grid md:grid-cols-2 gap-8 pt-4">
        <Card variant="bordered" className="p-8 space-y-4">
          <CardHeader className="p-0">
            <Label uppercase mono size="xs" className="text-emerald-400">PRODUCTION NARRATIVE</Label>
            <CardTitle className="text-xl mt-1">What We Did</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Body size="md" muted>
              {project.narrative}
            </Body>
          </CardContent>
        </Card>

        <Card variant="bordered" className="p-8 space-y-4">
          <CardHeader className="p-0">
            <Label uppercase mono size="xs" className="text-emerald-400">OUTCOME & IMPACT</Label>
            <CardTitle className="text-xl mt-1">Performance Results</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Body size="md" className="text-emerald-400 font-semibold">
              {project.results}
            </Body>
          </CardContent>
        </Card>
      </div>

      {/* Sequential Next / Previous Navigation */}
      <div className="pt-12 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
        <a
          href={`/work/${prevProject.slug}`}
          className="group flex flex-col items-start p-4 rounded-xl border border-slate-800 bg-surface-100 hover:border-slate-700 w-full sm:w-auto transition-colors"
        >
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">← PREVIOUS PROJECT</span>
          <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">
            {prevProject.title}
          </span>
        </a>

        <a
          href={`/work/${nextProject.slug}`}
          className="group flex flex-col items-end p-4 rounded-xl border border-slate-800 bg-surface-100 hover:border-slate-700 w-full sm:w-auto transition-colors"
        >
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">NEXT PROJECT →</span>
          <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">
            {nextProject.title}
          </span>
        </a>
      </div>

      {/* Bottom CTA */}
      <div className="pt-8 text-center">
        <a href="/start-a-project">
          <Button variant="magnetic-fill" size="lg" className="px-8">
            START A PROJECT LIKE THIS →
          </Button>
        </a>
      </div>
    </div>
  );
}
