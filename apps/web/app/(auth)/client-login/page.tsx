import React from "react";
import { Metadata } from "next";
import { Display, Label } from "@script2scale/ui";
import { ClientLoginForm } from "../../../components/auth/client-login-form";

export const metadata: Metadata = {
  title: "Client Portal Login | Script2Scale",
  description: "Sign in to your Script2Scale Client Portal workspace to access video versions, timeline progress, and interactive review tools."
};

export default function ClientLoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Top Header Handoff */}
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2 font-mono text-sm font-bold text-white hover:text-brand-yellow transition-colors">
          <span>←</span>
          <span>SCRIPT2SCALE</span>
        </a>
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          CLIENT PORTAL GATEWAY
        </span>
      </div>

      {/* Center Auth Card */}
      <div className="w-full max-w-md mx-auto my-auto py-12 space-y-8">
        <div className="text-center space-y-3">
          <Label uppercase mono size="xs" className="text-brand-yellow block tracking-widest">
            AUTHENTICATED WORKSPACE
          </Label>
          <Display size="2xl" className="tracking-tighter uppercase text-white">
            CLIENT <span className="text-brand-orange font-mono">/</span> LOGIN.
          </Display>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            Enter your email and password to access active video versions, watermark reviews, and project milestones.
          </p>
        </div>

        {/* Client Login Form */}
        <ClientLoginForm
          portalUrl="http://localhost:3002/login"
          forgotPasswordHref="/forgot-password"
        />
      </div>

      {/* Footer System Notice */}
      <div className="w-full max-w-6xl mx-auto text-center border-t border-slate-900 pt-6">
        <p className="text-xs font-mono text-slate-600">
          Protected Workspace · Script2Scale Post-Production Architecture · 2026
        </p>
      </div>
    </main>
  );
}
