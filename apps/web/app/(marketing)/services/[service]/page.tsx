import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Service } from "@script2scale/types";
import { SERVICES_DATA } from "../../../../lib/services-data";
import { getPublishedProjects, PortfolioProject } from "../../../../lib/projects-data";
import { ServiceDetailClient } from "../../../../components/services/service-detail-client";

interface PageProps {
  params: { service: string };
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service: Service) => ({
    service: service.slug
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = SERVICES_DATA.find((s: Service) => s.slug === params.service);
  if (!service) {
    return {
      title: "Service Not Found | Script2Scale",
      description: "The requested service could not be found."
    };
  }
  return {
    title: `${service.name} | Script2Scale Services`,
    description: service.longDesc || service.shortDesc
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = SERVICES_DATA.find((s: Service) => s.slug === params.service);

  if (!service) {
    notFound();
  }

  // Filter matching published projects by categoryFilterKey, capped at 3
  const matchingProjects = getPublishedProjects().filter(
    (p: PortfolioProject) => p.category === service.categoryFilterKey
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-black text-white">
      <ServiceDetailClient service={service} matchingProjects={matchingProjects} />
    </main>
  );
}
