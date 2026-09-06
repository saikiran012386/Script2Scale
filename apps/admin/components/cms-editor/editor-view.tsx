import React from "react";
import { Button, Card, CardTitle, CardContent } from "@script2scale/ui";

export function CMSEditorView({ section }: { section: string }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white capitalize">CMS Editor: {section}</h1>
          <p className="text-sm text-slate-400">Update marketing website content without modifying code.</p>
        </div>
        <Button variant="primary">Save Changes</Button>
      </div>
      <Card variant="bordered">
        <CardTitle className="mb-4">Content Fields</CardTitle>
        <CardContent className="space-y-4 p-0">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Headline Text</label>
            <input defaultValue="From Raw Scripts to High-Converting Video Assets" className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Subheadline Description</label>
            <textarea rows={3} defaultValue="We partner with modern brands and creators to engineer high-retention commercial video systems at scale." className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
