import React from "react";
import { Metadata } from "next";
import { Display, Label, Button, Card } from "@script2scale/ui";

export const metadata: Metadata = {
  title: "About Us & Manifesto | Script2Scale",
  description: "Learn how Script2Scale combines cinematic storytelling, narrative retention engineering, and streamlined revision workflows into a growth engine for brands."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="border-b border-slate-800 pb-12 space-y-4">
          <Label uppercase mono size="xs" className="text-emerald-400 block tracking-widest">
            OUR MANIFESTO
          </Label>
          <Display size="2xl" className="tracking-tighter uppercase text-white leading-tight">
            WE DON'T <span className="text-emerald-500 font-mono">/</span> JUST EDIT.
          </Display>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-sans">
            Content should not just look good — it should do something. We build high-retention video post-production pipelines and visual assets engineered for growth, reach, and conversion.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="bordered" className="p-8 bg-surface-100/50 border-slate-800 space-y-4">
            <span className="font-mono text-emerald-400 text-xs font-bold block">01. STORY FIRST</span>
            <h3 className="text-xl font-bold text-white tracking-tight">Narrative Retention</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every cut, sound effect, and visual pattern interrupt is calculated to hook viewers in the first 3 seconds and sustain watch-time.
            </p>
          </Card>

          <Card variant="bordered" className="p-8 bg-surface-100/50 border-slate-800 space-y-4">
            <span className="font-mono text-emerald-400 text-xs font-bold block">02. MODULAR PIPELINE</span>
            <h3 className="text-xl font-bold text-white tracking-tight">Full-Stack Production</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              From commercial video editing to 3D motion graphics, high-CTR YouTube thumbnails, key art posters, and investor pitch decks.
            </p>
          </Card>

          <Card variant="bordered" className="p-8 bg-surface-100/50 border-slate-800 space-y-4">
            <span className="font-mono text-emerald-400 text-xs font-bold block">03. CLIENT PORTAL</span>
            <h3 className="text-xl font-bold text-white tracking-tight">Seamless Revisions</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              No endless email threads. Review watermarked video versions with frame-accurate timestamp feedback directly inside your Client Portal.
            </p>
          </Card>
        </div>

        {/* Conversion Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-surface-100 via-slate-900 to-slate-950 border border-slate-800 p-8 md:p-12 text-center space-y-6">
          <Display size="lg" className="tracking-tight text-white uppercase">
            READY TO SCALE YOUR CONTENT ENGINE?
          </Display>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
            Book a custom production roadmap for your brand today and start turning raw scripts into high-converting media.
          </p>
          <div>
            <a href="/start-a-project">
              <Button variant="magnetic-fill" size="lg">
                START A PROJECT TODAY →
              </Button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
