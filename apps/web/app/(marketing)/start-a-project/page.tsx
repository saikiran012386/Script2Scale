import React, { Suspense } from "react";
import { Metadata } from "next";
import { InquiryWizard } from "../../../components/inquiry/inquiry-wizard";

export const metadata: Metadata = {
  title: "Start a Project | Script2Scale",
  description: "Fill out our project inquiry wizard to get a custom video production, thumbnail design, or graphic branding proposal tailored for your brand."
};

export default function StartAProjectPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-8 pb-20">
      <Suspense fallback={
        <div className="py-24 text-center space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-500">LOADING INQUIRY FORM...</p>
        </div>
      }>
        <InquiryWizard />
      </Suspense>
    </main>
  );
}
