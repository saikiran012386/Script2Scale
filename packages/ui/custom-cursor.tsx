"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useReducedMotion } from "./hooks/use-reduced-motion";

export interface CustomCursorProps {
  dotClassName?: string;
  ringClassName?: string;
}

export function CustomCursor({ dotClassName = "", ringClassName = "" }: CustomCursorProps) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, select, textarea, [data-cursor-hover]")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Ring */}
      <div
        className={`fixed h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-yellow/60 bg-brand-yellow/10 transition-transform duration-100 ease-out ${
          isHovered ? "scale-150 border-brand-orange bg-brand-orange/20" : "scale-100"
        } ${ringClassName}`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHovered ? 1.5 : 1})`
        }}
      />
      {/* Inner Dot */}
      <div
        className={`fixed h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-yellow ${dotClassName}`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      />
    </div>
  );
}
