import React from "react";
import { HeroSection } from "../../components/hero/hero-section";
import { SelectedWorkGrid } from "../../components/selected-work/work-grid";
import { ServicePreview } from "../../components/services/service-preview";
import { AboutSection } from "../../components/about/about-section";
import { WhySection } from "../../components/why/why-section";
import { ProcessSteps } from "../../components/process/process-steps";
import { TestimonialsSection } from "../../components/testimonials/testimonials-section";
import { FinalCTASection } from "../../components/cta/final-cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div id="selected-work">
        <SelectedWorkGrid />
      </div>
      <ServicePreview />
      <AboutSection />
      <WhySection />
      <ProcessSteps />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
}
