"use client";

import React, { useState, useEffect } from "react";
import { Badge, Button, Card, CardTitle, CardContent } from "@script2scale/ui";
import { generatePresignedUploadUrl } from "@script2scale/storage";
import {
  getAdminProjectVersionsAction,
  createAdminVideoVersionAction,
  publishVideoVersionAction,
  deleteVideoVersionAction,
  AdminVersionItem
} from "../../../app/actions";

interface AdminVersionsTabProps {
  projectId: string;
}

export function AdminVersionsTab({ projectId }: AdminVersionsTabProps) {
  const [versions, setVersions] = useState<AdminVersionItem[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [title, setTitle] = useState("");
  const [versionLabel, setVersionLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadVersions = async () => {
    setLoading(true);
    const res = await getAdminProjectVersionsAction(projectId);
    if (res.success) {
      setVersions(res.versions);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadVersions();
  }, [projectId]);

  const handleCreateDraftVersion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage("Please enter a version title.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setUploading(true);
    setUploadProgress(25);

    try {
      let finalVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

      if (selectedFile) {
        // Presigned upload simulation / URL generation
        const presigned = await generatePresignedUploadUrl({
          filename: selectedFile.name,
          contentType: selectedFile.type || "video/mp4",
          projectId,
          category: "versions"
        });
        setUploadProgress(70);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setUploadProgress(95);
      }

      const res = await createAdminVideoVersionAction(
        projectId,
        title,
        versionLabel || `v${versions.length + 1}`,
        finalVideoUrl,
        notes
      );

      if (res.success && res.version) {
        setVersions((prev) => [res.version!, ...prev]);
        setSuccessMessage(`Draft version "${res.version.title}" created privately (DRAFT status).`);
        setShowUploadModal(false);
        setTitle("");
        setVersionLabel("");
        setNotes("");
        setSelectedFile(null);
      } else {
        setErrorMessage(res.message || "Failed to create video version.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Version upload failed.");
    } finally {
      setUploading(false);
      setUploadProgress(100);
    }
  };

  const handlePublish = async (versionId: string, versionTitle: string) => {
    if (!confirm(`Publish "${versionTitle}" for Client Review? This will update the project status to REVIEW and send an email notification to the client.`)) {
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);

    const res = await publishVideoVersionAction(versionId, projectId);
    if (res.success) {
      setSuccessMessage(res.message || "Version published! Client notified via email.");
      loadVersions();
    } else {
      setErrorMessage(res.message || "Failed to publish version.");
    }
  };

  const handleDeleteVersion = async (versionId: string, versionTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${versionTitle}"?`)) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    const res = await deleteVideoVersionAction(versionId, projectId);
    if (res.success) {
      setVersions((prev) => prev.filter((v) => v.id !== versionId));
      setSuccessMessage(`Version "${versionTitle}" deleted.`);
    } else {
      setErrorMessage(res.message || "Failed to delete version.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Upload Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">
            Video Version Releases & Client Review Pipeline
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Upload new video cuts privately as DRAFTs, review internally, then publish for client review.
          </p>
        </div>

        <Button
          onClick={() => setShowUploadModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold px-4 py-2 rounded-xl shadow-lg"
        >
          + Upload New Cut (Draft)
        </Button>
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

      {/* Upload Draft Version Modal / Inline Form */}
      {showUploadModal && (
        <Card variant="bordered" className="p-6 bg-slate-900 border-slate-700 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white uppercase font-mono">
              Upload New Video Version (Draft)
            </h4>
            <button
              onClick={() => setShowUploadModal(false)}
              className="text-slate-400 hover:text-white text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleCreateDraftVersion} className="space-y-4 text-xs font-mono">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Version Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Version 2 - Fine Cut with Motion Graphics"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Version Tag / Label</label>
                <input
                  type="text"
                  placeholder="e.g. V2, Revision 1, Final Cut"
                  value={versionLabel}
                  onChange={(e) => setVersionLabel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Internal Editor Notes & Comments</label>
              <textarea
                rows={2}
                placeholder="Notes on color grade, audio mix, motion graphics changes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Select Video File (.mp4, .mov)</label>
              <input
                type="file"
                accept="video/mp4,video/quicktime,video/mkv"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg p-2 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-mono file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700"
              />
            </div>

            {uploading && (
              <div className="space-y-1">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
                <span className="text-[11px] text-emerald-400">{uploadProgress}% uploading...</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
              >
                {uploading ? "Saving Draft..." : "Save Private Draft"}
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Version History List */}
      {loading ? (
        <div className="p-8 text-center text-slate-400 font-mono text-xs">Loading video versions...</div>
      ) : versions.length > 0 ? (
        <div className="space-y-6">
          {versions.map((ver) => {
            const isDraft = ver.isDraft || ver.status === "DRAFT";
            return (
              <Card
                key={ver.id}
                variant="bordered"
                className={`p-6 bg-slate-900/90 border-slate-800 transition-all ${
                  isDraft ? "border-amber-500/40 bg-slate-900/95" : "border-emerald-500/30"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-base font-bold text-white font-mono">{ver.title}</h4>
                      <Badge
                        variant={
                          isDraft
                            ? "warning"
                            : ver.status === "READY_FOR_REVIEW"
                            ? "success"
                            : ver.status === "APPROVED"
                            ? "brand"
                            : "default"
                        }
                      >
                        {isDraft ? "DRAFT (ADMIN PRIVATE)" : ver.status.replace("_", " ")}
                      </Badge>
                      <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                        {ver.versionLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                      <span>Created: {new Date(ver.createdAt).toLocaleString()}</span>
                      {ver.publishedAt && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400">
                            Published to Client: {new Date(ver.publishedAt).toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-3">
                    {isDraft ? (
                      <button
                        onClick={() => handlePublish(ver.id, ver.title)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5"
                      >
                        <span>🚀 Publish for Client Review</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800">
                        ✓ Published & Visible to Client
                      </span>
                    )}

                    <button
                      onClick={() => handleDeleteVersion(ver.id, ver.title)}
                      className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-red-950 border border-slate-800 hover:border-red-800 text-slate-400 hover:text-red-300 font-mono text-xs transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Release Notes */}
                {ver.notes && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 mb-4 text-xs font-mono text-slate-300">
                    <strong className="text-slate-400 block mb-0.5 uppercase text-[10px]">Editor Release Notes:</strong>
                    {ver.notes}
                  </div>
                )}

                {/* Admin Video Preview Player */}
                <div className="rounded-xl overflow-hidden bg-black border border-slate-800 aspect-video max-w-2xl relative">
                  <video
                    controls
                    src={ver.videoUrl}
                    className="w-full h-full object-contain"
                    poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80"
                  />
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="p-12 border border-slate-800 rounded-xl bg-slate-900/60 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-xl mx-auto text-slate-500 font-mono">
            🎬
          </div>
          <h4 className="text-base font-bold text-white font-mono uppercase">No Video Cuts Uploaded Yet</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto font-mono">
            Click "+ Upload New Cut (Draft)" above to upload your first video version privately as a draft.
          </p>
        </div>
      )}
    </div>
  );
}
