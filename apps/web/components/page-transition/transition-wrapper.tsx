"use client";

import React from "react";

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in transition-opacity duration-300">
      {children}
    </div>
  );
}
