"use client";

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "@script2scale/ui";

export function useScrollReveal(threshold: number = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, prefersReduced]);

  return { ref, isVisible };
}
