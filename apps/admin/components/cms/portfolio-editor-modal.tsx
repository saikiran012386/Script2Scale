"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button, Modal } from "@script2scale/ui";
import { uploadMediaAsset } from "@script2scale/storage";
import {
  saveCmsPortfolioProjectAction,
  CmsPortfolioListItem
} from "../../app/actions";
import { ProjectCategory } from "../../../web/lib/projects-data";

export interface PortfolioEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: CmsPortfolioListItem | null;
  onSuccess?: () => void;
}

const CATEGORY_OPTIONS: Array<{ label: string; value: ProjectCategory }> = [
  { label: "Commercial Video (VIDEO)", value: "VIDEO" },
  { label: "High-CTR Thumbnails (THUMBNAILS)", value: "THUMBNAILS" },
  { label: "Key Art & Posters (POSTERS)", value: "POSTERS" },
  { label: "Corporate Brochures (BROCHURES)", value: "BROCHURES" }
];

export function PortfolioEditorModal({
  isOpen,
  onClose,
  project,
  onSuccess
}: PortfolioEditorModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("VIDEO");
  const [client, setClient] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [description, setDescription] = useState("");
  const [narrative, setNarrative] = useState("");
  const [tools, setTools] = useState("");
  const [results, setResults] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("/images/work/acme-thumb.jpg");
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setCategory(project.category || "VIDEO");
      setClient(project.client || "");
      setYear(project.year || new Date().getFullYear().toString());
      setDescription(project.description || "");
      setNarrative(project.narrative || "");
      setTools(project.tools ? project.tools.join(", ") : "");
      setResults(project.results || "");
      setThumbnailUrl(project.thumbnailUrl || "/images/work/acme-thumb.jpg");
      setPreviewVideoUrl(project.previewVideoUrl || "");
      setIsPublished(project.isPublished !== false);
      setIsFeatured(project.isFeatured !== false);
    } else {
      setTitle("");
      setCategory("VIDEO");
      setClient("");
      setYear(new Date().getFullYear().toString());
      setDescription("");
      setNarrative("");
      setTools("");
      setResults("");
      setThumbnailUrl("/images/work/acme-thumb.jpg");
      setPreviewVideoUrl("");
      setIsPublished(true);
      setIsFeatured(false);
    }
    setMessage(null);
  }, [project, isOpen]);

  const handleThumbnailFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingThumbnail(true);
    try {
      const res = await uploadMediaAsset(file, "portfolio/thumbnails");
      setThumbnailUrl(res.publicUrl);
    } catch (err) {
      setMessage({ type: "error", text: "Thumbnail upload failed." });
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingVideo(true);
    try {
      const res = await uploadMediaAsset(file, "portfolio/videos");
      setPreviewVideoUrl(res.publicUrl);
    } catch (err) {
      setMessage({ type: "error", text: "Video upload failed." });
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    if (!title || !category) {
      setMessage({ type: "error", text: "Title and Category are required." });
      return;
    }

    const formData = new FormData();
    if (project?.id) formData.append("id", project.id);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("client", client);
    formData.append("year", year);
    formData.append("description", description);
    formData.append("narrative", narrative);
    formData.append("tools", tools);
    formData.append("results", results);
    formData.append("thumbnailUrl", thumbnailUrl);
    formData.append("previewVideoUrl", previewVideoUrl);
    formData.append("isPublished", isPublished ? "true" : "false");
    formData.append("isFeatured", isFeatured ? "true" : "false");

    startTransition(async () => {
      const res = await saveCmsPortfolioProjectAction(formData);
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Project saved." });
        if (onSuccess) onSuccess();
        setTimeout(() => onClose(), 600);
      } else {
        setMessage({ type: "error", text: res.message || "Failed to save project." });
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? `EDIT PORTFOLIO: ${project.title}` : "ADD NEW PORTFOLIO CASE STUDY"}
    >
      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin">
        <p className="text-xs text-slate-400">
          Manage showcase case studies, thumbnail art, preview reels, and status toggles for public website.
        </p>

        {message && (
          <div
            className={`p-3 rounded-xl text-xs font-mono border ${
              message.type === "success"
                ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-300"
                : "bg-red-950/60 border-red-500/60 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="portfolio-title" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                PROJECT TITLE <span className="text-emerald-400">*</span>
              </label>
              <input
                id="portfolio-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cyberpunk Creator Thumbnail Set"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="portfolio-category" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                CATEGORY <span className="text-emerald-400">*</span>
              </label>
              <select
                id="portfolio-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="portfolio-client" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                CLIENT NAME
              </label>
              <input
                id="portfolio-client"
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Nexus Gaming"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="portfolio-year" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                RELEASE YEAR
              </label>
              <input
                id="portfolio-year"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="portfolio-desc" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              SHORT CARD DESCRIPTION
            </label>
            <input
              id="portfolio-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-impact commercial video engineered for global launch..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="portfolio-narrative" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              WHAT WE DID (PRODUCTION NARRATIVE)
            </label>
            <textarea
              id="portfolio-narrative"
              rows={3}
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder="We developed a 90-second cinematic brand anthem focused on fast-paced visual hooks..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="portfolio-tools" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                TOOLS USED (COMMA-SEPARATED)
              </label>
              <input
                id="portfolio-tools"
                type="text"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                placeholder="DaVinci Resolve, Premiere Pro, After Effects"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="portfolio-results" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                PERFORMANCE METRICS / RESULTS
              </label>
              <input
                id="portfolio-results"
                type="text"
                value={results}
                onChange={(e) => setResults(e.target.value)}
                placeholder="Achieved 2.4x higher watch time & 14.8% CTR"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Media Presigned Upload: Thumbnail Image */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-slate-300">
                THUMBNAIL IMAGE (PRESIGNED UPLOAD)
              </label>
              <span className="text-[10px] font-mono text-emerald-400">
                {isUploadingThumbnail ? "UPLOADING TO STORAGE..." : "IMAGE READY"}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailFileUpload}
                className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700 cursor-pointer"
              />
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="/images/work/acme-thumb.jpg"
                className="flex-1 rounded-lg bg-surface-100 border border-slate-800 px-2 py-1 text-xs text-slate-300 font-mono"
              />
            </div>
          </div>

          {/* Media Presigned Upload: Preview Video */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-slate-300">
                PREVIEW VIDEO REEL (PRESIGNED UPLOAD)
              </label>
              <span className="text-[10px] font-mono text-emerald-400">
                {isUploadingVideo ? "UPLOADING VIDEO..." : "VIDEO READY"}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileUpload}
                className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700 cursor-pointer"
              />
              <input
                type="text"
                value={previewVideoUrl}
                onChange={(e) => setPreviewVideoUrl(e.target.value)}
                placeholder="https://commondatastorage.googleapis.com/.../video.mp4"
                className="flex-1 rounded-lg bg-surface-100 border border-slate-800 px-2 py-1 text-xs text-slate-300 font-mono"
              />
            </div>
          </div>

          {/* Toggles: Published & Featured */}
          <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-surface-100 border border-slate-800">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-500 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="text-xs font-mono font-bold text-white block">PUBLISHED</span>
                <span className="text-[10px] text-slate-400 block">Visible on public showcase archive</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-500 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="text-xs font-mono font-bold text-white block">FEATURED</span>
                <span className="text-[10px] text-slate-400 block">Highlights on Homepage Selected Work</span>
              </div>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              CANCEL
            </Button>
            <Button type="submit" variant="magnetic-fill" size="sm" disabled={isPending}>
              {isPending ? "SAVING PORTFOLIO..." : project ? "UPDATE CASE STUDY →" : "PUBLISH CASE STUDY →"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
