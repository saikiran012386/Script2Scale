export const EASINGS = {
  hero: [0.16, 1, 0.3, 1] as const,
  smooth: [0.25, 1, 0.5, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const
};

export const DURATIONS = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  hero: 1.2
};

export const MOTION_PRESETS = {
  heroReveal: {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: DURATIONS.hero, ease: EASINGS.hero }
    }
  },
  compressReveal: {
    hidden: { opacity: 0, scale: 1.05, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: DURATIONS.slow, ease: EASINGS.smooth }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.normal, ease: EASINGS.smooth }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  }
};
