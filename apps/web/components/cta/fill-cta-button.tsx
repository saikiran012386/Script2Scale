import React from "react";
import { Button } from "@script2scale/ui";

export function FillCTAButton() {
  return (
    <section className="py-24 px-6 text-center bg-slate-900/60 border-t border-slate-800">
      <h2 className="text-4xl font-extrabold text-white mb-4">Ready to scale your video assets?</h2>
      <p className="text-slate-400 max-w-xl mx-auto mb-8">
        Tell us about your project vision, timeline, and goals. We'll assemble a custom proposal.
      </p>
      <a href="/start-a-project">
        <Button variant="magnetic-fill" size="lg" className="px-8 py-4 text-lg">
          Start a Project →
        </Button>
      </a>
    </section>
  );
}
