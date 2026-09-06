import React from "react";
import "./globals.css";

export const metadata = {
  title: "Script2Scale Admin Panel",
  description: "Internal operations and CMS management workspace"
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased flex min-h-screen">
        <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hidden md:flex">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xl font-bold tracking-tight text-white">S2S<span className="text-emerald-500">.ADMIN</span></span>
            </div>
            <nav className="space-y-1 text-sm font-medium text-slate-300">
              <a href="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">Dashboard</a>
              <a href="/inquiries" className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">Inquiries</a>
              <a href="/clients" className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">Clients</a>
              <a href="/projects" className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">Projects</a>
              <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">CMS Management</div>
              <a href="/cms/homepage" className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">Homepage</a>
              <a href="/cms/portfolio" className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">Portfolio</a>
              <a href="/cms/services" className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">Services</a>
              <a href="/cms/settings" className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">Settings</a>
            </nav>
          </div>
          <div className="pt-6 border-t border-slate-800 text-xs text-slate-500">
            Script2Scale v1.0.0
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-slate-800 bg-slate-900/40 px-6 flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-400">Admin Control Center</h2>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono text-slate-300">Owner Session Active</span>
            </div>
          </header>
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
