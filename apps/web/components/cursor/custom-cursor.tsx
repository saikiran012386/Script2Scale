"use client";

import React from "react";
import { useCursorPosition } from "../../hooks/use-cursor-position";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

export function CustomCursor() {
  const { x, y } = useCursorPosition();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 h-4 w-4 rounded-full border border-emerald-400 bg-emerald-500/20 transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate3d(${x - 8}px, ${y - 8}px, 0)`
      }}
    />
  );
}
