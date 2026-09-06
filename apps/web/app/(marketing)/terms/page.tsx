import React from "react";
import { Metadata } from "next";
import { Display, Label, Card } from "@script2scale/ui";

export const metadata: Metadata = {
  title: "Terms of Service | Script2Scale",
  description: "Script2Scale Terms of Service outlining project engagement guidelines, IP rights, review milestones, and asset licensing."
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 space-y-3">
          <Label uppercase mono size="xs" className="text-brand-yellow block tracking-widest">
            TERMS OF ENGAGEMENT
          </Label>
          <Display size="2xl" className="tracking-tighter uppercase text-white">
            TERMS <span className="text-brand-orange font-mono">/</span> OF SERVICE.
          </Display>
          <p className="text-sm font-mono text-slate-400">
            Last Updated: January 2026 · Script2Scale Commercial Agreements
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-slate-300 font-sans text-sm md:text-base leading-relaxed">
          <Card variant="bordered" className="p-8 bg-surface-100/40 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              01. Scope of Post-Production Services
            </h3>
            <p>
              Script2Scale provides modular video editing, 3D motion graphics, high-CTR thumbnail design, poster key art, and editorial brochure design packages. Detailed deliverables, timeline milestones, and revision limits are specified in each client's approved project proposal.
            </p>
          </Card>

          <Card variant="bordered" className="p-8 bg-surface-100/40 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              02. Client Portal Review & Watermarking
            </h3>
            <p>
              Draft cuts delivered for client review via the Script2Scale Client Portal feature timecode overlays and dynamic watermarks. Final unwatermarked master exports are unlocked and delivered upon formal project approval and final invoice settlement.
            </p>
          </Card>

          <Card variant="bordered" className="p-8 bg-surface-100/40 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              03. Intellectual Property & Asset Licensing
            </h3>
            <p>
              Upon final payment receipt, clients receive full commercial ownership of final rendered video exports and design master files, subject to third-party stock music and font licensing agreements outlined in the project scope.
            </p>
          </Card>

          <Card variant="bordered" className="p-8 bg-surface-100/40 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              04. Inquiries & Legal Support
            </h3>
            <p>
              For legal inquiries or commercial contract customization, please reach out to <a href="mailto:legal@script2scale.com" className="text-brand-yellow underline">legal@script2scale.com</a>.
            </p>
          </Card>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
          <a href="/" className="hover:text-brand-yellow transition-colors">
            ← RETURN TO HOMEPAGE
          </a>
          <span>Script2Scale Studio</span>
        </div>
      </div>
    </main>
  );
}
