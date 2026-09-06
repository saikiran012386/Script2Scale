import React from "react";
import { AudioProvider } from "../../components/audio/audio-provider";
import { AudioGateModal } from "../../components/audio/audio-gate-modal";
import { AudioController } from "../../components/audio/audio-controller";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      <div className="min-h-screen flex flex-col justify-between bg-surface-0 text-slate-100">
        <AudioGateModal />
        <Navbar />
        
        <main id="main-content" className="flex-1 pt-24">
          {children}
        </main>

        <Footer />
        <AudioController />
      </div>
    </AudioProvider>
  );
}
