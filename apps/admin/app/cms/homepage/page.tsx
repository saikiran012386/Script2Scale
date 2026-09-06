"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button, Card } from "@script2scale/ui";
import {
  getCmsHomepageContentAction,
  saveCmsHomepageContentAction,
  CmsHomepageData
} from "../../actions";

export default function CMSHomepageEditor() {
  const [data, setData] = useState<CmsHomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getCmsHomepageContentAction().then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await saveCmsHomepageContentAction(formData);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Homepage copy updated." });
        const updated = await getCmsHomepageContentAction();
        setData(updated);
      } else {
        setNotice({ type: "error", message: res.message || "Failed to update homepage copy." });
      }
    });
  };

  if (isLoading || !data) {
    return <div className="p-12 text-center text-slate-400 font-mono text-sm">Loading Homepage CMS...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
          WEBSITE CONTENT MANAGEMENT
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
          HOMEPAGE <span className="text-emerald-500 font-mono">/</span> HERO & COPY.
        </h1>
        <p className="text-sm text-slate-400">
          Edit public marketing copy for the homepage hero section, call-to-action buttons, and Selected Work showcase header.
        </p>
      </div>

      {/* Alert Notice */}
      {notice && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border flex items-center justify-between ${
            notice.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-300"
              : "bg-red-950/60 border-red-500/60 text-red-300"
          }`}
        >
          <span>{notice.message}</span>
          <button onClick={() => setNotice(null)} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Hero Header & Copy */}
        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-emerald-500 font-mono">01.</span> Hero Section Copy
          </h2>

          <div>
            <label htmlFor="heroBadge" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              HERO TOP BADGE TEXT
            </label>
            <input
              id="heroBadge"
              name="heroBadge"
              type="text"
              defaultValue={data.heroBadge}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="heroTitleLine1" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                TITLE LINE 1
              </label>
              <input
                id="heroTitleLine1"
                name="heroTitleLine1"
                type="text"
                defaultValue={data.heroTitleLine1}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>

            <div>
              <label htmlFor="heroTitleLine2" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                TITLE LINE 2 (HIGHLIGHT)
              </label>
              <input
                id="heroTitleLine2"
                name="heroTitleLine2"
                type="text"
                defaultValue={data.heroTitleLine2}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>
          </div>

          <div>
            <label htmlFor="heroSubtitle" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              HERO SUBTITLE / PARAGRAPH
            </label>
            <textarea
              id="heroSubtitle"
              name="heroSubtitle"
              rows={3}
              defaultValue={data.heroSubtitle}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </Card>

        {/* Section 2: Call-to-Action Buttons */}
        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-emerald-500 font-mono">02.</span> Action Buttons & Links
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="heroPrimaryCtaText" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                PRIMARY CTA LABEL
              </label>
              <input
                id="heroPrimaryCtaText"
                name="heroPrimaryCtaText"
                type="text"
                defaultValue={data.heroPrimaryCtaText}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="heroPrimaryCtaLink" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                PRIMARY CTA TARGET URL
              </label>
              <input
                id="heroPrimaryCtaLink"
                name="heroPrimaryCtaLink"
                type="text"
                defaultValue={data.heroPrimaryCtaLink}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-300 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="heroSecondaryCtaText" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                SECONDARY CTA LABEL
              </label>
              <input
                id="heroSecondaryCtaText"
                name="heroSecondaryCtaText"
                type="text"
                defaultValue={data.heroSecondaryCtaText}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="heroSecondaryCtaLink" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                SECONDARY CTA TARGET URL
              </label>
              <input
                id="heroSecondaryCtaLink"
                name="heroSecondaryCtaLink"
                type="text"
                defaultValue={data.heroSecondaryCtaLink}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-300 font-mono"
              />
            </div>
          </div>
        </Card>

        {/* Section 3: Selected Work & Media Asset */}
        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-emerald-500 font-mono">03.</span> Showcase & Media Reels
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="selectedWorkTitle" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                SELECTED WORK SECTION TITLE
              </label>
              <input
                id="selectedWorkTitle"
                name="selectedWorkTitle"
                type="text"
                defaultValue={data.selectedWorkTitle}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>

            <div>
              <label htmlFor="heroMediaUrl" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                HERO BACKGROUND VIDEO URL
              </label>
              <input
                id="heroMediaUrl"
                name="heroMediaUrl"
                type="text"
                defaultValue={data.heroMediaUrl}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="selectedWorkSubtitle" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              SELECTED WORK DESCRIPTION
            </label>
            <textarea
              id="selectedWorkSubtitle"
              name="selectedWorkSubtitle"
              rows={2}
              defaultValue={data.selectedWorkSubtitle}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </Card>

        {/* Form Action Bar */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
          <Button type="submit" variant="magnetic-fill" size="md" disabled={isPending}>
            {isPending ? "SAVING CHANGES..." : "SAVE HOMEPAGE COPY →"}
          </Button>
        </div>
      </form>
    </div>
  );
}
