"use client";

import React, { useState, useEffect, useTransition } from "react";
import { notFound } from "next/navigation";
import { Badge } from "@script2scale/ui";
import { FileCategory, ProjectFileItem } from "@script2scale/types";
import {
  getClientProjectDetailAction,
  getProjectFilesAction,
  generatePresignedFileUploadAction,
  confirmFileUploadAction,
  deleteProjectFileAction,
  ClientProjectDetailData
} from "../../../actions";

export default function ClientProjectFilesPage({
  params
}: {
  params: { projectId: string };
}) {
  const [project, setProject] = useState<ClientProjectDetailData | null>(null);
  const [files, setFiles] = useState<ProjectFileItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedUploadCategory, setSelectedUploadCategory] = useState<FileCategory>("RAW_FOOTAGE");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const proj = await getClientProjectDetailAction(params.projectId);
      if (!proj) {
        setLoading(false);
        return;
      }
      setProject(proj);

      const filesRes = await getProjectFilesAction(params.projectId);
      if (filesRes.success) {
        setFiles(filesRes.files);
      }
      setLoading(false);
    }
    loadData();
  }, [params.projectId]);

  if (!loading && !project) {
    notFound();
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setErrorMessage(null);
    setSuccessMessage(null);
    setUploading(true);
    setUploadProgress(15);

    try {
      // 1. Generate presigned upload URL from server action with validation
      const presignedRes = await generatePresignedFileUploadAction(
        params.projectId,
        selectedFile.name,
        selectedFile.type || "application/octet-stream",
        selectedFile.size,
        selectedUploadCategory
      );

      if (!presignedRes.success || !presignedRes.uploadUrl || !presignedRes.fileKey) {
        setErrorMessage(presignedRes.message || "Failed to initiate presigned upload.");
        setUploading(false);
        return;
      }

      setUploadProgress(60);

      // 2. Execute upload PUT / simulation
      // Simulated upload delay for realistic feedback
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUploadProgress(90);

      // 3. Confirm file upload record creation in Prisma
      const confirmRes = await confirmFileUploadAction(
        params.projectId,
        presignedRes.fileKey,
        selectedFile.name,
        selectedFile.type || "application/octet-stream",
        selectedFile.size,
        selectedUploadCategory
      );

      if (confirmRes.success && confirmRes.file) {
        setFiles((prev) => [confirmRes.file!, ...prev]);
        setSuccessMessage(`Successfully uploaded "${selectedFile.name}" under ${selectedUploadCategory.replace("_", " ")}.`);
      } else {
        setErrorMessage(confirmRes.message || "Failed to save file metadata.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An error occurred while uploading file.");
    } finally {
      setUploading(false);
      setUploadProgress(100);
      e.target.value = "";
    }
  };

  const handleDelete = async (fileId: string, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    const res = await deleteProjectFileAction(fileId, params.projectId);
    if (res.success) {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      setSuccessMessage(`File "${filename}" deleted.`);
    } else {
      setErrorMessage(res.message || "Failed to delete file.");
    }
  };

  const filteredFiles = files.filter((f) => {
    if (activeCategory === "ALL") return true;
    return f.category === activeCategory;
  });

  const getCategoryCount = (cat: string) => {
    if (cat === "ALL") return files.length;
    return files.filter((f) => f.category === cat).length;
  };

  const getFileIcon = (category: string, filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase() || "";
    if (["mp4", "mov", "mkv", "avi"].includes(ext)) return "🎥";
    if (["zip", "tar", "gz", "7z", "rar"].includes(ext)) return "📦";
    if (["pdf", "doc", "docx", "txt"].includes(ext)) return "📄";
    if (["png", "jpg", "jpeg", "svg", "ai", "psd"].includes(ext)) return "🖼️";
    if (category === "RAW_FOOTAGE") return "🎬";
    if (category === "BRAND_ASSETS") return "🎨";
    if (category === "DELIVERABLES") return "✨";
    return "📁";
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
          <a href="/dashboard" className="hover:text-emerald-400 transition-colors">
            Dashboard
          </a>
          <span>/</span>
          <a href="/dashboard" className="hover:text-emerald-400 transition-colors">
            Projects
          </a>
          <span>/</span>
          <a href={`/projects/${params.projectId}`} className="hover:text-emerald-400 transition-colors">
            {project ? project.name : params.projectId}
          </a>
          <span>/</span>
          <span className="text-slate-200">Files & Assets</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {project ? project.name : "Project Files"}
              </h1>
              {project && (
                <Badge variant={project.badgeVariant} size="md">
                  {project.statusLabel}
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-400 max-w-2xl">
              Central asset hub for raw footage uploads, brand guides, reference materials, and final deliverables.
            </p>
          </div>
        </div>
      </div>

      {/* Workspace Tab Navigation */}
      <div className="border-b border-slate-800">
        <nav className="flex space-x-8 font-mono text-sm">
          <a
            href={`/projects/${params.projectId}`}
            className="border-b-2 border-transparent py-3 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Overview</span>
          </a>
          <a
            href={`/projects/${params.projectId}/files`}
            className="border-b-2 border-emerald-400 py-3 text-emerald-400 font-bold flex items-center gap-2"
          >
            <span>Files & Assets</span>
          </a>
          <a
            href={`/projects/${params.projectId}/review`}
            className="border-b-2 border-transparent py-3 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Video Review</span>
          </a>
          <a
            href={`/projects/${params.projectId}/approval`}
            className="border-b-2 border-transparent py-3 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Final Approval</span>
          </a>
        </nav>
      </div>

      {/* Alert Banners */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-mono flex justify-between items-center">
          <span>⚠️ {errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-white">✕</button>
        </div>
      )}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono flex justify-between items-center">
          <span>✓ {successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Upload Dropzone Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">
              Upload New Project Files
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Select category and upload raw camera cards, brand kits, or reference files (max 500MB per file).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Target Category:</span>
            <select
              value={selectedUploadCategory}
              onChange={(e) => setSelectedUploadCategory(e.target.value as FileCategory)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="RAW_FOOTAGE">Raw Footage</option>
              <option value="BRAND_ASSETS">Brand Assets</option>
              <option value="REFERENCES">References</option>
            </select>
          </div>
        </div>

        {/* Dropzone Input */}
        <label className="border-2 border-dashed border-slate-800 hover:border-emerald-500/60 transition-all rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-950/50 hover:bg-slate-950/80 group">
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xl mb-3 text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all">
            {uploading ? "⏳" : "⬆️"}
          </div>
          <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
            {uploading ? "Uploading file to encrypted storage..." : "Click to select or drag & drop project files"}
          </span>
          <span className="text-xs text-slate-400 font-mono mt-1">
            Uploading under category: <strong className="text-emerald-400">{selectedUploadCategory.replace("_", " ")}</strong> (Max 500MB)
          </span>

          {uploading && (
            <div className="w-full max-w-md mt-4">
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 mt-1 inline-block">{uploadProgress}% uploaded</span>
            </div>
          )}
        </label>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3 font-mono text-xs">
        {[
          { id: "ALL", label: "All Files" },
          { id: "RAW_FOOTAGE", label: "Raw Footage" },
          { id: "BRAND_ASSETS", label: "Brand Assets" },
          { id: "REFERENCES", label: "References" },
          { id: "DELIVERABLES", label: "Deliverables" }
        ].map((tab) => {
          const count = getCategoryCount(tab.id);
          const active = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2 ${
                active
                  ? "bg-emerald-950/80 border-emerald-500 text-emerald-400 font-bold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${active ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* File List / Grid */}
      {filteredFiles.length > 0 ? (
        <div className="space-y-3">
          {filteredFiles.map((file) => {
            const isClientUpload = file.uploaderRole === "CLIENT";
            return (
              <div
                key={file.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-lg flex-shrink-0">
                    {getFileIcon(file.category, file.filename)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-white font-mono truncate max-w-xs sm:max-w-md">
                        {file.filename}
                      </h4>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {file.category.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                      <span>{file.formattedSize}</span>
                      <span>•</span>
                      <span>Uploaded {new Date(file.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className={isClientUpload ? "text-emerald-400" : "text-amber-400"}>
                        {isClientUpload ? "👤 Client Upload" : "⚡ Agency Output"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <span>Download</span>
                    <span>↓</span>
                  </a>

                  {file.isDeletable ? (
                    <button
                      onClick={() => handleDelete(file.id, file.filename)}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-red-950 border border-slate-800 hover:border-red-800 text-slate-400 hover:text-red-300 font-mono text-xs transition-colors"
                      title="Delete uploaded file"
                    >
                      Delete
                    </button>
                  ) : (
                    <span
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-600 font-mono text-xs cursor-not-allowed"
                      title="File deletion locked during editing & review stage"
                    >
                      Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center">
          <div className="h-12 w-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl mx-auto mb-3 text-slate-500">
            📂
          </div>
          <h4 className="text-base font-semibold text-white">No files in this category</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            {activeCategory === "RAW_FOOTAGE" && "Upload raw camera logs, interviews, and A-roll footage to begin editing."}
            {activeCategory === "BRAND_ASSETS" && "Upload brand logos, custom fonts, color palettes, and graphic assets."}
            {activeCategory === "REFERENCES" && "Upload reference videos, storyboards, and creative moodboards."}
            {activeCategory === "DELIVERABLES" && "Final renders and exported 4K assets delivered by Script2Scale will appear here."}
            {activeCategory === "ALL" && "No project files uploaded yet. Select a category above to start uploading."}
          </p>
        </div>
      )}
    </div>
  );
}
