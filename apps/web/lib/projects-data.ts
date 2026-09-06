export type ProjectCategory = "VIDEO" | "THUMBNAILS" | "POSTERS" | "BROCHURES";

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  description: string;
  narrative: string;
  tools: string[];
  results: string;
  thumbnailUrl: string;
  previewVideoUrl?: string;
  fullVideoUrl?: string;
  nextSlug: string;
  prevSlug: string;
  isPublished?: boolean;
  isFeatured?: boolean;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "proj-1",
    slug: "acme-brand-anthem",
    title: "Acme Brand Anthem 2026",
    client: "Acme Corporation",
    category: "VIDEO",
    categoryLabel: "Commercial Video",
    year: "2026",
    description: "High-impact brand anthem film engineered for Q3 global launch across digital and broadcast channels.",
    narrative: "We developed a 90-second cinematic brand anthem focused on fast-paced visual hooks in the first 3 seconds, custom soundscapes, and color grading tuned for mobile OLED displays.",
    tools: ["DaVinci Resolve", "Premiere Pro", "After Effects", "iZotope RX"],
    results: "Achieved 2.4x higher average watch time and a 14.8% CTR across digital premiere channels.",
    thumbnailUrl: "/images/work/acme-thumb.jpg",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    fullVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    nextSlug: "neo-tech-product-launch",
    prevSlug: "apex-capital-brochure",
    isPublished: true,
    isFeatured: true
  },
  {
    id: "proj-2",
    slug: "neo-tech-product-launch",
    title: "NeoTech OS Launch Film",
    client: "NeoTech Systems",
    category: "VIDEO",
    categoryLabel: "3D Motion & Video",
    year: "2025",
    description: "Kinetic 3D product reveal showcasing next-generation operating system UI capabilities.",
    narrative: "Engineered a 3D glassmorphism interface reveal in Cinema 4D and Redshift, syncing micro-interactions with a custom electronic soundtrack.",
    tools: ["Cinema 4D", "Redshift", "After Effects", "Logic Pro X"],
    results: "Generated over 1.2M organic impressions within 48 hours of product reveal.",
    thumbnailUrl: "/images/work/neotech-thumb.jpg",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    fullVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    nextSlug: "horizon-docuseries",
    prevSlug: "acme-brand-anthem",
    isPublished: true,
    isFeatured: true
  },
  {
    id: "proj-3",
    slug: "horizon-docuseries",
    title: "Horizon Founder Series",
    client: "Horizon Ventures",
    category: "VIDEO",
    categoryLabel: "Documentary Video",
    year: "2025",
    description: "Cinematic documentary series exploring founder journeys behind breakthrough technology companies.",
    narrative: "Produced a 3-part documentary short featuring multi-cam interview lighting, narrative sound editing, and archival footage integration.",
    tools: ["Premiere Pro", "DaVinci Resolve", "Audition"],
    results: "Selected for premiere showcase at VC Founder Summit 2025.",
    thumbnailUrl: "/images/work/horizon-thumb.jpg",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    fullVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    nextSlug: "lumina-ai-explainer",
    prevSlug: "neo-tech-product-launch",
    isPublished: true,
    isFeatured: true
  },
  {
    id: "proj-4",
    slug: "lumina-ai-explainer",
    title: "Lumina AI Platform System",
    client: "Lumina AI",
    category: "VIDEO",
    categoryLabel: "Product Explainer Video",
    year: "2026",
    description: "Sleek SaaS explainer video combining UI screen capture animations with high-retention narration.",
    narrative: "Created an animated explainer combining vector motion design, screen recording polish, and AI workflow visual diagrams.",
    tools: ["After Effects", "Figma", "Premiere Pro"],
    results: "Increased landing page free-trial conversion rate by +32%.",
    thumbnailUrl: "/images/work/lumina-thumb.jpg",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4",
    fullVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4",
    nextSlug: "cyberpunk-creator-thumbnail",
    prevSlug: "horizon-docuseries",
    isPublished: true,
    isFeatured: true
  },
  {
    id: "proj-5",
    slug: "cyberpunk-creator-thumbnail",
    title: "Cyberpunk Creator Thumbnail Set",
    client: "Nexus Gaming Channel",
    category: "THUMBNAILS",
    categoryLabel: "High-CTR Thumbnails",
    year: "2026",
    description: "High-contrast 3D thumbnail suite generating 14.8% CTR for premiere series launch.",
    narrative: "Designed 6 high-contrast 3D thumbnails focusing on vibrant neon lighting, expressive facial cutouts, and readable mobile typography.",
    tools: ["Photoshop", "Blender", "Lightroom"],
    results: "Drove 14.8% average click-through rate, outperforming channel baseline by 3.2x.",
    thumbnailUrl: "/images/work/thumbnail-set.jpg",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    fullVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    nextSlug: "velocity-gaming-thumbnails",
    prevSlug: "lumina-ai-explainer",
    isPublished: true,
    isFeatured: false
  },
  {
    id: "proj-6",
    slug: "velocity-gaming-thumbnails",
    title: "Velocity Esports Pack",
    client: "Velocity Esports",
    category: "THUMBNAILS",
    categoryLabel: "Esports Thumbnails",
    year: "2025",
    description: "Custom facial expression composite set designed for high-engagement YouTube gaming uploads.",
    narrative: "Built an automated thumbnail template library for weekly tournament coverage with instant color swap controls.",
    tools: ["Photoshop", "Illustrator"],
    results: "Reduced weekly thumbnail production turnaround time from 4 hours to 30 minutes.",
    thumbnailUrl: "/images/work/esports-thumb.jpg",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    fullVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    nextSlug: "solaris-movie-poster",
    prevSlug: "cyberpunk-creator-thumbnail",
    isPublished: true,
    isFeatured: false
  },
  {
    id: "proj-7",
    slug: "solaris-movie-poster",
    title: "Solaris Movie Key Art Poster",
    client: "Solaris Pictures",
    category: "POSTERS",
    categoryLabel: "Key Art Poster",
    year: "2026",
    description: "Ultra-high resolution theatrical key-art poster for IMAX cinema release.",
    narrative: "Created key-art poster illustration and typography layout for theatrical print distribution and digital billboards.",
    tools: ["Photoshop", "InDesign", "Lightroom"],
    results: "Featured on premiere entertainment billboards across Los Angeles and New York.",
    thumbnailUrl: "/images/work/solaris-poster.jpg",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    fullVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    nextSlug: "apex-capital-brochure",
    prevSlug: "velocity-gaming-thumbnails",
    isPublished: true,
    isFeatured: false
  },
  {
    id: "proj-8",
    slug: "apex-capital-brochure",
    title: "Apex Capital Investor Brochure",
    client: "Apex Capital",
    category: "BROCHURES",
    categoryLabel: "Corporate Brochure",
    year: "2026",
    description: "32-page premium investor brochure and interactive flipbook for Series B funding round.",
    narrative: "Designed a 32-page investor deck and printed brochure combining financial charts, brand typography, and interactive digital flipbook controls.",
    tools: ["InDesign", "Illustrator", "Figma"],
    results: "Supported successful $18M Series B capital raise.",
    thumbnailUrl: "/images/work/apex-brochure.jpg",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    fullVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    nextSlug: "acme-brand-anthem",
    prevSlug: "solaris-movie-poster",
    isPublished: true,
    isFeatured: false
  }
];

export function getAllPortfolioProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS;
}

export function getPublishedProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.isPublished !== false);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.isPublished !== false && p.isFeatured !== false);
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug && p.isPublished !== false);
}

export function addOrUpdatePortfolioProject(projectData: Partial<PortfolioProject> & { title: string; category: ProjectCategory }): PortfolioProject {
  const existingIndex = projectData.id ? PORTFOLIO_PROJECTS.findIndex((p) => p.id === projectData.id) : -1;
  const slug = projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const categoryLabelMap: Record<ProjectCategory, string> = {
    VIDEO: "Video Commercial",
    THUMBNAILS: "High-CTR Thumbnails",
    POSTERS: "Key Art & Posters",
    BROCHURES: "Corporate Print & Digital"
  };

  if (existingIndex >= 0) {
    const updated: PortfolioProject = {
      ...PORTFOLIO_PROJECTS[existingIndex],
      ...projectData,
      slug,
      categoryLabel: categoryLabelMap[projectData.category] || projectData.category
    };
    PORTFOLIO_PROJECTS[existingIndex] = updated;
    return updated;
  } else {
    const newProject: PortfolioProject = {
      id: projectData.id || `proj-${Date.now()}`,
      slug,
      title: projectData.title,
      client: projectData.client || "Client",
      category: projectData.category,
      categoryLabel: categoryLabelMap[projectData.category] || projectData.category,
      year: projectData.year || new Date().getFullYear().toString(),
      description: projectData.description || "",
      narrative: projectData.narrative || "",
      tools: projectData.tools || [],
      results: projectData.results || "",
      thumbnailUrl: projectData.thumbnailUrl || "/images/work/acme-thumb.jpg",
      previewVideoUrl: projectData.previewVideoUrl,
      fullVideoUrl: projectData.fullVideoUrl,
      nextSlug: PORTFOLIO_PROJECTS[0]?.slug || "acme-brand-anthem",
      prevSlug: PORTFOLIO_PROJECTS[PORTFOLIO_PROJECTS.length - 1]?.slug || "apex-capital-brochure",
      isPublished: projectData.isPublished !== undefined ? projectData.isPublished : true,
      isFeatured: projectData.isFeatured !== undefined ? projectData.isFeatured : false
    };
    PORTFOLIO_PROJECTS.unshift(newProject);
    return newProject;
  }
}

export function toggleProjectPublished(id: string): PortfolioProject | null {
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);
  if (project) {
    project.isPublished = !project.isPublished;
    return project;
  }
  return null;
}

export function toggleProjectFeatured(id: string): PortfolioProject | null {
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);
  if (project) {
    project.isFeatured = !project.isFeatured;
    return project;
  }
  return null;
}

export function unpublishProject(id: string): PortfolioProject | null {
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);
  if (project) {
    project.isPublished = false;
    return project;
  }
  return null;
}

