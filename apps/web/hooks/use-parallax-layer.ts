"use client";

import { useState, useEffect } from "react";
import { useDeviceType } from "./use-device-type";
import { useReducedMotion } from "@script2scale/ui";

export function useParallaxLayer(depth: number = 5) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { isMobile } = useDeviceType();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (isMobile || prefersReduced || typeof window === "undefined") {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const mouseX = (e.clientX - centerX) / centerX; // Range -1 to 1
      const mouseY = (e.clientY - centerY) / centerY; // Range -1 to 1

      setOffset({
        x: mouseX * depth,
        y: mouseY * depth
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [depth, isMobile, prefersReduced]);

  if (isMobile || prefersReduced) {
    return {
      style: {} as React.CSSProperties
    };
  }

  return {
    style: {
      transform: `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`,
      transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "transform"
    } as React.CSSProperties
  };
}
