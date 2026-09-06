"use client";

import React, { useState } from "react";
import { Display, Body } from "@script2scale/ui";
import { Service } from "@script2scale/types";
import { SERVICES_DATA } from "../../lib/services-data";
import { ServiceRow } from "./service-row";
import { HoverPreviewWindow } from "./hover-preview-window";

export function ServicePreview() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [previewTop, setPreviewTop] = useState<number>(0);

  const handleHoverStart = (service: Service, top: number) => {
    setActiveService(service);
    setPreviewTop(top);
  };

  const handleHoverEnd = () => {
    setActiveService(null);
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-8">
        <Display size="xl" className="tracking-tighter">
          OUR <span className="text-emerald-500 font-mono">/</span> EXPERTISE
        </Display>
        <Body size="md" muted className="mt-2 max-w-2xl">
          Full-stack video production, motion graphics, and graphic design packages built to elevate your brand presence.
        </Body>
      </div>

      {/* Services List with Hover-Preview Surface */}
      <div className="relative space-y-2">
        {SERVICES_DATA.map((service, idx) => (
          <ServiceRow
            key={service.id}
            service={service}
            index={idx}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />
        ))}

        {/* Fixed-Position Desktop Hover Preview Window */}
        <HoverPreviewWindow service={activeService} positionY={previewTop} />
      </div>
    </section>
  );
}
