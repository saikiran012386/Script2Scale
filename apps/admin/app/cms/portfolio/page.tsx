"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Badge, Button, Card } from "@script2scale/ui";
import {
  getCmsPortfolioProjectsAction,
  toggleCmsPortfolioPublishedAction,
  toggleCmsPortfolioFeaturedAction,
  unpublishCmsPortfolioProjectAction,
  CmsPortfolioListItem
} from "../../actions";
import { DataTable } from "../../../components/data-table/data-table";
import { PortfolioEditorModal } from "../../../components/cms/portfolio-editor-modal";

const FILTER_TABS = ["ALL", "PUBLISHED", "DRAFTS", "FEATURED"] as const;

export default function CMSPortfolioPage() {
  const [projects, setProjects] = useState<CmsPortfolioListItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<CmsPortfolioListItem | null>(null);

  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await getCmsPortfolioProjectsAction(search, filter);
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProjects();
    }, 200);
    return () => clearTimeout(timer);
  }, [search, filter]);

  const handleTogglePublished = (id: string) => {
    setNotice(null);
    startTransition(async () => {
      const res = await toggleCmsPortfolioPublishedAction(id);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Status updated." });
        loadProjects();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to toggle status." });
      }
    });
  };

  const handleToggleFeatured = (id: string) => {
    setNotice(null);
    startTransition(async () => {
      const res = await toggleCmsPortfolioFeaturedAction(id);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Featured status updated." });
        loadProjects();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to toggle featured status." });
      }
    });
  };

  const handleUnpublish = (id: string) => {
    setNotice(null);
    startTransition(async () => {
      const res = await unpublishCmsPortfolioProjectAction(id);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Project unpublished." });
        loadProjects();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to unpublish." });
      }
    });
  };

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: CmsPortfolioListItem) => {
    setEditingProject(proj);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono text-brand-yellow uppercase tracking-widest block mb-1">
            PORTFOLIO CMS & CASE STUDY MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
            PORTFOLIO <span className="text-brand-yellow font-mono">/</span> SHOWCASE.
          </h1>
          <p className="text-sm text-slate-400">
            Publish and curate public portfolio projects, thumbnail art, video reels, and homepage featured highlights.
          </p>
        </div>

        <Button
          variant="magnetic-fill"
          size="sm"
          onClick={handleOpenAddModal}
          className="whitespace-nowrap"
        >
          + ADD PROJECT
        </Button>
      </div>

      {/* Action Notification Alert */}
      {notice && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border flex items-center justify-between ${
            notice.type === "success"
              ? "bg-brand-yellow/10 border-brand-yellow/50 text-brand-yellow"
              : "bg-red-950/60 border-red-500/60 text-red-300"
          }`}
        >
          <span>{notice.message}</span>
          <button onClick={() => setNotice(null)} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <Card variant="bordered" className="p-4 bg-slate-900/90 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, client, or category..."
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs font-mono text-slate-400 mr-1 uppercase">FILTER:</span>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors ${
                filter === tab
                  ? "bg-brand-yellow text-brand-black font-bold"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* Portfolio Projects Data Table */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 font-mono text-sm">
          Loading portfolio projects...
        </div>
      ) : (
        <DataTable
          data={projects}
          columns={[
            {
              header: "Media",
              accessorKey: (p) => (
                <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center shrink-0">
                  {p.thumbnailUrl ? (
                    <img
                      src={p.thumbnailUrl}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/work/acme-thumb.jpg";
                      }}
                    />
                  ) : (
                    <span className="text-[10px] font-mono text-slate-600">NO ART</span>
                  )}
                </div>
              )
            },
            {
              header: "Project Case Study",
              accessorKey: (p) => (
                <div>
                  <button
                    onClick={() => handleOpenEditModal(p)}
                    className="font-bold text-white hover:text-brand-yellow transition-colors text-left"
                  >
                    {p.title}
                  </button>
                  <p className="text-xs text-brand-yellow font-mono">{p.categoryLabel}</p>
                </div>
              )
            },
            {
              header: "Client & Year",
              accessorKey: (p) => (
                <div>
                  <span className="text-xs font-semibold text-slate-300 block">{p.client}</span>
                  <span className="text-[10px] font-mono text-slate-500">{p.year}</span>
                </div>
              )
            },
            {
              header: "Showcase Badges",
              accessorKey: (p) => (
                <div className="flex flex-wrap gap-1.5 items-center">
                  <Badge variant={p.isPublished ? "success" : "outline"} className="text-[10px] font-mono uppercase px-2 py-0.5">
                    {p.isPublished ? "PUBLISHED" : "DRAFT"}
                  </Badge>
                  {p.isFeatured && (
                    <Badge variant="brand" className="text-[10px] font-mono uppercase px-2 py-0.5">
                      ★ FEATURED
                    </Badge>
                  )}
                </div>
              )
            },
            {
              header: "Status Toggles",
              accessorKey: (p) => (
                <div className="flex items-center gap-2">
                  <button
                    disabled={isPending}
                    onClick={() => handleTogglePublished(p.id)}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
                      p.isPublished
                        ? "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
                        : "bg-brand-yellow/20 border-brand-yellow text-brand-yellow hover:bg-brand-yellow/30"
                    }`}
                  >
                    {p.isPublished ? "Set Draft" : "Publish"}
                  </button>

                  <button
                    disabled={isPending}
                    onClick={() => handleToggleFeatured(p.id)}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
                      p.isFeatured
                        ? "bg-brand-orange/20 border-brand-orange text-brand-orange"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {p.isFeatured ? "Unfeature" : "Feature"}
                  </button>
                </div>
              )
            },
            {
              header: "Actions",
              accessorKey: (p) => (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenEditModal(p)}
                    className="text-xs font-mono font-bold text-brand-yellow hover:underline"
                  >
                    EDIT
                  </button>

                  {p.isPublished && (
                    <button
                      disabled={isPending}
                      onClick={() => handleUnpublish(p.id)}
                      className="text-xs font-mono text-red-400 hover:underline"
                    >
                      UNPUBLISH
                    </button>
                  )}
                </div>
              )
            }
          ]}
        />
      )}

      {/* Portfolio Editor Modal */}
      <PortfolioEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={editingProject}
        onSuccess={() => {
          setIsModalOpen(false);
          loadProjects();
        }}
      />
    </div>
  );
}
