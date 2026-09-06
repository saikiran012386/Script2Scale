import React from "react";
import { cookies } from "next/headers";
import { verifySessionToken, AUTH_COOKIE_NAME } from "@script2scale/auth";
import { PortalSignOutButton } from "../components/sign-out-button";
import "./globals.css";

export const metadata = {
  title: "Script2Scale | Client Portal",
  description: "Private client review workspace & video delivery portal"
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  const session = token ? verifySessionToken(token) : null;
  const isAuthenticated = !!session;

  console.log(`[Portal Layout Audit] Checking session state:`, {
    tokenPresent: !!token,
    sessionUserId: session?.userId || "NONE",
    isAuthenticated
  });

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col justify-between">
        <header className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a href="/dashboard" className="text-lg font-bold tracking-tight text-white">
              SCRIPT<span className="text-brand-yellow">2</span>SCALE <span className="text-xs text-slate-400 font-mono">PORTAL</span>
            </a>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
              {isAuthenticated ? (
                <>
                  <a href="/dashboard" className="hover:text-white transition-colors">Projects</a>
                  <span className="text-slate-700">|</span>
                  <PortalSignOutButton />
                </>
              ) : (
                <a href="/login" className="text-brand-yellow font-mono text-xs font-bold hover:underline">
                  Client Sign In →
                </a>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto p-6">{children}</main>

        <footer className="border-t border-slate-800 py-6 px-6 text-center text-xs text-slate-500">
          Script2Scale Secure Client Portal • Interactive Client Review Environment
        </footer>
      </body>
    </html>
  );
}
