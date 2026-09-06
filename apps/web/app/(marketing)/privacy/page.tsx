import React from "react";
import { Metadata } from "next";
import { Display, Label, Card } from "@script2scale/ui";

export const metadata: Metadata = {
  title: "Privacy Policy | Script2Scale",
  description: "Script2Scale Privacy Policy detailing data collection, client portal security, and information handling practices."
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 space-y-3">
          <Label uppercase mono size="xs" className="text-brand-yellow block tracking-widest">
            LEGAL DISCLOSURE
          </Label>
          <Display size="2xl" className="tracking-tighter uppercase text-white">
            PRIVACY <span className="text-brand-orange font-mono">/</span> POLICY.
          </Display>
          <p className="text-sm font-mono text-slate-400">
            Last Updated: January 2026 · Script2Scale Post-Production Studio
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-slate-300 font-sans text-sm md:text-base leading-relaxed">
          <Card variant="bordered" className="p-8 bg-surface-100/40 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              01. Information We Collect
            </h3>
            <p>
              When you submit an inquiry through our project wizard at <a href="/start-a-project" className="text-brand-yellow underline">/start-a-project</a>, we collect your name, email address, phone number, company name, project requirements, budget range, and reference materials. This information is used strictly to prepare production proposals and deliver video post-production services.
            </p>
          </Card>

          <Card variant="bordered" className="p-8 bg-surface-100/40 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              02. Client Portal & Raw Media Security
            </h3>
            <p>
              Client video assets, raw footage, draft cuts, and feedback markers uploaded to the Script2Scale Client Portal are stored in encrypted cloud repositories. Access is restricted to authorized project team members and client accounts bound by confidentiality agreements.
            </p>
          </Card>

          <Card variant="bordered" className="p-8 bg-surface-100/40 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              03. Analytics & Sound Preferences
            </h3>
            <p>
              We store minimal local browser session preferences (such as your "ENTER WITH SOUND" audio preference) in <code className="font-mono text-brand-yellow text-xs bg-slate-900 px-2 py-1 rounded">localStorage</code> to ensure a seamless media playback experience across page navigations. We do not sell or share client data with third-party advertising brokers.
            </p>
          </Card>

          <Card variant="bordered" className="p-8 bg-surface-100/40 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              04. Contact & Data Inquiries
            </h3>
            <p>
              If you have questions regarding this Privacy Policy or wish to request data deletion, please contact our privacy compliance team at <a href="mailto:privacy@script2scale.com" className="text-brand-yellow underline">privacy@script2scale.com</a>.
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
