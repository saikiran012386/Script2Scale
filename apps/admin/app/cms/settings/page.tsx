"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button, Card } from "@script2scale/ui";
import {
  getCmsSettingsAction,
  saveCmsSettingsAction,
  CmsSettingsData
} from "../../actions";

export default function CMSSettingsPage() {
  const [settings, setSettings] = useState<CmsSettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getCmsSettingsAction().then((data) => {
      setSettings(data);
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await saveCmsSettingsAction(formData);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Global settings saved." });
        const updated = await getCmsSettingsAction();
        setSettings(updated);
      } else {
        setNotice({ type: "error", message: res.message || "Failed to save settings." });
      }
    });
  };

  if (isLoading || !settings) {
    return <div className="p-12 text-center text-slate-400 font-mono text-sm">Loading Global Settings CMS...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
          GLOBAL PLATFORM CONFIGURATION
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
          GLOBAL <span className="text-emerald-500 font-mono">/</span> SETTINGS & FOOTER.
        </h1>
        <p className="text-sm text-slate-400">
          Manage contact channels, notification emails, social media profile URLs, and global footer metadata across public website apps.
        </p>
      </div>

      {/* Notice Alert */}
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
        {/* Section 1: Contact & Notifications */}
        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-emerald-500 font-mono">01.</span> Contact Channels & Email Alerts
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactEmail" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                PUBLIC CONTACT EMAIL
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                defaultValue={settings.contactEmail}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>

            <div>
              <label htmlFor="notificationEmail" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                INTERNAL INQUIRY ALERTS EMAIL
              </label>
              <input
                id="notificationEmail"
                name="notificationEmail"
                type="email"
                defaultValue={settings.notificationEmail}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                PHONE NUMBER
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                defaultValue={settings.phone}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                STUDIO LOCATIONS / ADDRESS
              </label>
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={settings.address}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Social Media Handles */}
        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-emerald-500 font-mono">02.</span> Social Media Links
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="instagramUrl" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                INSTAGRAM URL
              </label>
              <input
                id="instagramUrl"
                name="instagramUrl"
                type="text"
                defaultValue={settings.instagramUrl}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="twitterUrl" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                TWITTER / X URL
              </label>
              <input
                id="twitterUrl"
                name="twitterUrl"
                type="text"
                defaultValue={settings.twitterUrl}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="youtubeUrl" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                YOUTUBE CHANNEL URL
              </label>
              <input
                id="youtubeUrl"
                name="youtubeUrl"
                type="text"
                defaultValue={settings.youtubeUrl}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="linkedinUrl" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                LINKEDIN COMPANY URL
              </label>
              <input
                id="linkedinUrl"
                name="linkedinUrl"
                type="text"
                defaultValue={settings.linkedinUrl}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </Card>

        {/* Section 3: Footer Brand Copy & Copyright */}
        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-emerald-500 font-mono">03.</span> Footer Copy & Legal Metadata
          </h2>

          <div>
            <label htmlFor="footerBlurb" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              FOOTER BRAND STATEMENT / BLURB
            </label>
            <textarea
              id="footerBlurb"
              name="footerBlurb"
              rows={2}
              defaultValue={settings.footerBlurb}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="copyrightText" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              COPYRIGHT NOTICE STATEMENT
            </label>
            <input
              id="copyrightText"
              name="copyrightText"
              type="text"
              defaultValue={settings.copyrightText}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </Card>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
          <Button type="submit" variant="magnetic-fill" size="md" disabled={isPending}>
            {isPending ? "SAVING..." : "SAVE GLOBAL SETTINGS →"}
          </Button>
        </div>
      </form>
    </div>
  );
}
