"use client";

import React, { useState, useEffect } from "react";
import { Badge, Card, CardTitle, CardContent } from "@script2scale/ui";
import { FileCategory, ProjectFileItem } from "@script2scale/types";
import {
  getAdminProjectFilesAction,
  adminGeneratePresignedUploadAction,
  adminConfirmFileUploadAction,
  adminDeleteProjectFileAction
} from "../../../app/actions";

interface AdminFilesTabProps {
  projectId: string;
}

export function AdminFilesTab({ projectId }: AdminFilesTabProps) {
  const [files, setFiles] = useState<ProjectFileItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedUploadCategory, setSelectedUploadCategory] = useState<FileCategory>("DELIVERABLES");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    setLoading(true);
    const res = await getAdminProjectFilesAction(projectId);
    if (res.success) {
      setFiles(res.files);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFiles();
  }, [projectId]);

  const handleAdminFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setErrorMessage(null);
    setSuccessMessage(null);
    setUploading(true);
    setUploadProgress(20);

    try {
      const presignedRes = await adminGeneratePresignedUploadAction(
        projectId,
        selectedFile.name,
        selectedFile.type || "application/octet-stream",
        selectedFile.size,
        selectedUploadCategory
      );

      if (!presignedRes.success || !presignedRes.uploadUrl || !presignedRes.fileKey) {
        setErrorMessage(presignedRes.message || "Failed to generate presigned upload URL.");
        setUploading(false);
        return;
      }

      setUploadProgress(70);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setUploadProgress(90);

      const confirmRes = await adminConfirmFileUploadAction(
        projectId,
        presignedRes.fileKey,
        selectedFile.name,
        selectedFile.type || "application/octet-stream",
        selectedFile.size,
        selectedUploadCategory
      );

      if (confirmRes.success && confirmRes.file) {
        setFiles((prev) => [confirmRes.file!, ...prev]);
        setSuccessMessage(`Uploaded "${selectedFile.name}" as ${selectedUploadCategory.replace("_", " ")}.`);
      } else {
        setErrorMessage(confirmRes.message || "Failed to confirm upload.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Admin upload error occurred.");
    } finally {
      setUploading(false);
      setUploadProgress(100);
      e.target.value = "";
    }
  };

  const handleDelete = async (fileId: string, filename: string) => {
    if (!confirm(`Admin Override: Delete file "${filename}" from project?`)) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    const res = await adminDeleteProjectFileAction(fileId, projectId);
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
    if (["png", "jpg", "jpeg", "svg"].includes(ext)) return "🖼️";
    if (category === "DELIVERABLES") return "✨";
    return "📁";
  };

  return (
    <div className="space-y-6">
      {/* Alert Banners */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-mono flex justify-between items-center">
          <span>⚠️ {errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-white">✕</button>
        </div>
      )}
      {successMessage && (
        <div className="p-4 rounded-xl bg-brand-yellow/10 border border-brand-yellow/40 text-brand-yellow text-xs font-mono flex justify-between items-center">
          <span>✓ {successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="text-brand-yellow hover:text-white">✕</button>
        </div>
      )}

      {/* Admin File Upload Panel */}
      <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              ADMIN FILE MANAGEMENT & ASSET DELIVERY
            </CardTitle>
            <p className="text-xs text-slate-300 mt-1">
              Upload deliverables, project exports, or reference files directly to project storage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Target Category:</span>
            <select
              value={selectedUploadCategory}
              onChange={(e) => setSelectedUploadCategory(e.target.value as FileCategory)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-yellow"
            >
              <option value="DELIVERABLES">Deliverables / Output</option>
              <option value="RAW_FOOTAGE">Raw Footage</option>
              <option value="BRAND_ASSETS">Brand Assets</option>
              <option value="REFERENCES">References</option>
            </select>
          </div>
        </div>

        <label className="border-2 border-dashed border-slate-800 hover:border-brand-yellow/60 transition-all rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-950/50 hover:bg-slate-950/80 group">
          <input type="file" onChange={handleAdminFileUpload} disabled={uploading} className="hidden" />
          <div className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-lg mb-2 text-slate-400 group-hover:text-brand-yellow transition-colors">
            {uploading ? "⏳" : "⚡"}
          </div>
          <span className="text-xs font-semibold text-white group-hover:text-brand-yellow transition-colors font-mono">
            {uploading ? "Uploading file..." : `Upload file as ${selectedUploadCategory.replace("_", " ")}`}
          </span>
          <span className="text-[11px] text-slate-500 font-mono mt-1">Max upload limit: 500MB</span>
        </label>
      </Card>

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
                  ? "bg-brand-yellow/10 border-brand-yellow text-brand-yellow font-bold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${active ? "bg-brand-yellow/20 text-brand-yellow" : "bg-slate-800 text-slate-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Files List */}
      {loading ? (
        <div className="p-8 text-center text-slate-400 font-mono text-xs">Loading project files...</div>
      ) : filteredFiles.length > 0 ? (
        <div className="space-y-3">
          {filteredFiles.map((file) => {
            const isClient = file.uploaderRole === "CLIENT";
            return (
              <div
                key={file.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-base flex-shrink-0">
                    {getFileIcon(file.category, file.filename)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white truncate max-w-xs sm:max-w-md">{file.filename}</h4>
                      <Badge variant="outline" className="text-[10px] uppercase">
                        {file.category.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 mt-1 text-[11px]">
                      <span>{file.formattedSize}</span>
                      <span>•</span>
                      <span>Uploaded {new Date(file.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className={isClient ? "text-brand-yellow" : "text-brand-orange font-bold"}>
                        {isClient ? "Client Upload" : "⚡ Agency Output"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-brand-orange hover:bg-brand-orange-light text-white font-bold transition-colors"
                  >
                    Download ↓
                  </a>
                  <button
                    onClick={() => handleDelete(file.id, file.filename)}
                    className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 border border-slate-800 rounded-xl bg-slate-900/60 text-center space-y-2">
          <p className="text-sm font-bold text-white font-mono">No Files Found</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto font-mono">
            No project files exist in the "{activeCategory.replace("_", " ")}" category.
          </p>
        </div>
      )}
    </div>
  );
}
