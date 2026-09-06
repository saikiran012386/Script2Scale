import React from "react";
import { Metadata } from "next";
import { ServicePreview } from "../../../components/services/service-preview";

export const metadata: Metadata = {
  title: "Services & Capabilities | Script2Scale",
  description: "Explore our modular video production, thumbnail design, key-art poster, and editorial brochure design packages engineered for growth and scale."
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-12 pb-24">
      <ServicePreview />
    </main>
  );
}
