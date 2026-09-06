import React from "react";
import "./globals.css";
import { constructMetadata } from "../lib/seo";
import { CustomCursor } from "../components/cursor/custom-cursor";

export const metadata = constructMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-brand-yellow selection:text-brand-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
