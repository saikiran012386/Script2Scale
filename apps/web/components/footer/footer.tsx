import React from "react";
import { Display, Label } from "@script2scale/ui";

export interface FooterNavLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  companyName?: string;
  copyrightYear?: number;
  tagline?: string;
  navLinks?: FooterNavLink[];
  serviceLinks?: FooterNavLink[];
  legalLinks?: FooterNavLink[];
  socialLinks?: FooterNavLink[];
}

export function Footer({
  companyName = "Script2Scale Studio",
  copyrightYear = new Date().getFullYear(),
  tagline = "Modular video production, 3D motion graphics, high-CTR thumbnail design, & editorial collateral built for scale.",
  navLinks = [
    { label: "HOMEPAGE", href: "/" },
    { label: "PORTFOLIO WORK", href: "/work" },
    { label: "SERVICES ARCHIVE", href: "/services" },
    { label: "OUR MANIFESTO", href: "/about" },
    { label: "START A PROJECT", href: "/start-a-project" }
  ],
  serviceLinks = [
    { label: "Commercial Video Editing", href: "/services/video-editing" },
    { label: "High-CTR Thumbnail Design", href: "/services/thumbnail-design" },
    { label: "Cinematic Poster Key Art", href: "/services/poster-design" },
    { label: "Brand Brochure & Pitch Decks", href: "/services/brochure-design" }
  ],
  legalLinks = [
    { label: "Client Portal Login", href: "/client-login" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Visual Style Guide", href: "/style-guide" }
  ],
  socialLinks = [
    { label: "TWITTER / X", href: "https://x.com" },
    { label: "YOUTUBE", href: "https://youtube.com" },
    { label: "VIMEO", href: "https://vimeo.com" },
    { label: "LINKEDIN", href: "https://linkedin.com" }
  ]
}: FooterConfig) {
  return (
    <footer className="border-t border-slate-800 bg-black text-slate-400 py-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="/" className="inline-block group">
              <span className="text-2xl font-extrabold tracking-tighter text-white font-display group-hover:text-emerald-400 transition-colors">
                SCRIPT<span className="text-emerald-500 font-mono">2</span>SCALE
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-sans">
              {tagline}
            </p>
            <div className="pt-2">
              <a
                href="/start-a-project"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>BOOK A PRODUCTION ROADMAP</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="md:col-span-2 space-y-3">
            <Label uppercase mono size="xs" className="text-emerald-400 block tracking-widest">
              NAVIGATION
            </Label>
            <ul className="space-y-2 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3 space-y-3">
            <Label uppercase mono size="xs" className="text-emerald-400 block tracking-widest">
              SERVICES OFFERED
            </Label>
            <ul className="space-y-2 text-xs font-mono">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Portal Column */}
          <div className="md:col-span-2 space-y-3">
            <Label uppercase mono size="xs" className="text-emerald-400 block tracking-widest">
              CLIENT & LEGAL
            </Label>
            <ul className="space-y-2 text-xs font-mono">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <p>© {copyrightYear} {companyName}. All rights reserved.</p>

          <div className="flex flex-wrap gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
