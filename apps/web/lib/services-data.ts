import { Service } from "@script2scale/types";

export const SERVICES_DATA: Service[] = [
  {
    id: "srv-1",
    slug: "video-editing",
    name: "Commercial Video Editing",
    shortDesc: "Pacing, narrative hooks, soundscapes, & high-retention post-production cuts.",
    longDesc: "A complete post-production pipeline engineered for viral reach, high viewer retention, and visual polish across commercial, short-form, and long-form video formats.",
    tags: ["Short-form", "Long-form", "Reels", "Commercials"],
    categoryFilterKey: "VIDEO",
    previewMedia: {
      type: "video",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    features: [
      "Frame-accurate narrative pacing",
      "Custom sound effects & music mix",
      "Subtitles & graphic callouts",
      "Multi-aspect ratio outputs (16:9, 9:16, 1:1)"
    ],
    subOfferings: [
      {
        title: "Short-Form & Reels",
        description: "Fast-paced, hook-driven edits engineered specifically for TikTok, IG Reels, and YouTube Shorts."
      },
      {
        title: "YouTube Long-Form",
        description: "In-depth narrative structuring, pattern interrupts, animated callouts, and immersive audio soundscapes."
      },
      {
        title: "Commercial & Brand Films",
        description: "High-end cinematic cuts, professional color grading, and broadcast-ready sound mastering."
      },
      {
        title: "Promotional Teasers",
        description: "High-impact trailer and product teaser edits designed to maximize launch conversion."
      }
    ]
  },
  {
    id: "srv-2",
    slug: "thumbnail-design",
    name: "High-CTR Thumbnail Design",
    shortDesc: "High-contrast YouTube & social thumbnails engineered for maximum click-through rates.",
    longDesc: "Eye-catching, high-contrast visual engineering designed to stand out on crowded feeds and maximize click-through rate (CTR) on YouTube and social media.",
    tags: ["YouTube", "CTR Optimization", "3D Composition"],
    categoryFilterKey: "THUMBNAILS",
    previewMedia: {
      type: "video",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    features: [
      "Visual hierarchy & focal point engineering",
      "Facial expression enhancement & cutouts",
      "A/B testing variant sets",
      "Custom typography & color pop"
    ],
    subOfferings: [
      {
        title: "YouTube Thumbnail Sets",
        description: "A/B testing variant pairs with high-contrast typography and high-emotion visual hooks."
      },
      {
        title: "3D Visual Compositing",
        description: "Dynamic lighting, depth of field effects, and custom 3D element rendering in Cinema 4D."
      },
      {
        title: "Subject Cutouts & Retouching",
        description: "Professional skin retouches, expression tuning, and custom rim lighting overlays."
      }
    ]
  },
  {
    id: "srv-3",
    slug: "poster-design",
    name: "Cinematic Poster Design",
    shortDesc: "Key-art poster designs for film launches, brand campaigns, and event announcements.",
    longDesc: "Cinematic key art and poster design crafted for film premieres, music launches, brand campaigns, and high-impact physical or digital event marketing.",
    tags: ["Key Art", "Print & Digital", "Campaigns"],
    categoryFilterKey: "POSTERS",
    previewMedia: {
      type: "video",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    features: [
      "Ultra-high resolution master prints",
      "Custom composite artwork",
      "Digital billboard adaptation",
      "Brand typography integration"
    ],
    subOfferings: [
      {
        title: "Cinematic Film Key Art",
        description: "High-resolution master poster art tailored for theatrical release, festivals, and streaming platforms."
      },
      {
        title: "Event & Concert Posters",
        description: "Bold typography and striking visual layouts optimized for live event announcements and tour posters."
      },
      {
        title: "Digital Campaign Key Assets",
        description: "Adaptations across digital billboards, social headers, and multi-format promotional campaigns."
      }
    ]
  },
  {
    id: "srv-4",
    slug: "brochure-design",
    name: "Brand Brochure & Pitch Design",
    shortDesc: "Editorial pitch decks, investor brochures, and brand catalogs built to convert.",
    longDesc: "High-converting editorial pitch decks, investor proposals, and corporate brochures that present your brand narrative with undeniable authority.",
    tags: ["Pitch Decks", "Corporate Catalogs", "Editorial Layout"],
    categoryFilterKey: "BROCHURES",
    previewMedia: {
      type: "video",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4"
    },
    features: [
      "Multi-page PDF & print layouts",
      "Interactive digital flipbook exports",
      "Infographic & data visualization",
      "Brand identity compliance"
    ],
    subOfferings: [
      {
        title: "Investor Pitch Decks",
        description: "Story-driven presentation layouts designed to clearly present key financial metrics and vision."
      },
      {
        title: "Corporate & Brand Catalogs",
        description: "Multi-page PDF and print-ready collateral with high-end editorial typography."
      },
      {
        title: "Interactive Flipbooks",
        description: "Digital publication layouts featuring embedded interactive links and multimedia elements."
      }
    ]
  }
];
