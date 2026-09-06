import { z } from "zod";

export const ProjectStatusSchema = z.enum([
  "INQUIRY",
  "DISCOVERY",
  "SCRIPTING",
  "PRODUCTION",
  "POST_PRODUCTION",
  "REVIEW",
  "APPROVED",
  "DELIVERED"
]);
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const VideoVersionStatusSchema = z.enum([
  "DRAFT",
  "PROCESSING",
  "WATERMARKED",
  "READY_FOR_REVIEW",
  "REVISION_REQUESTED",
  "APPROVED"
]);
export type VideoVersionStatus = z.infer<typeof VideoVersionStatusSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  slug: z.string(),
  clientId: z.string(),
  status: ProjectStatusSchema,
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
export type Project = z.infer<typeof ProjectSchema>;

export const VideoVersionSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  versionNumber: z.number().int().positive(),
  versionLabel: z.string().optional(),
  title: z.string(),
  videoUrl: z.string().url(),
  watermarkedUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  durationSeconds: z.number().optional(),
  status: VideoVersionStatusSchema,
  notes: z.string().optional(),
  uploadedBy: z.string().optional(),
  publishedAt: z.date().optional(),
  createdAt: z.date()
});
export type VideoVersion = z.infer<typeof VideoVersionSchema>;

export const FeedbackMarkerSchema = z.object({
  id: z.string(),
  versionId: z.string(),
  authorId: z.string(),
  timestampSeconds: z.number().nonnegative(),
  comment: z.string().min(1, "Comment cannot be empty"),
  resolved: z.boolean().default(false),
  createdAt: z.date()
});
export type FeedbackMarker = z.infer<typeof FeedbackMarkerSchema>;

export function getClientStatusLabel(status: string): {
  label: string;
  badgeVariant: "default" | "success" | "warning" | "brand" | "outline";
} {
  switch (status) {
    case "INQUIRY":
      return { label: "Inquiry Received", badgeVariant: "default" };
    case "DISCOVERY":
      return { label: "Project Onboarding", badgeVariant: "default" };
    case "SCRIPTING":
      return { label: "Scripting & Concept", badgeVariant: "default" };
    case "PRODUCTION":
      return { label: "In Production", badgeVariant: "brand" };
    case "POST_PRODUCTION":
      return { label: "Post-Production Edit", badgeVariant: "brand" };
    case "REVIEW":
      return { label: "Ready For Your Review", badgeVariant: "warning" };
    case "APPROVED":
      return { label: "Approved & Rendering", badgeVariant: "success" };
    case "DELIVERED":
      return { label: "Final Assets Delivered", badgeVariant: "outline" };
    default:
      return { label: status, badgeVariant: "default" };
  }
}

export function formatRelativeTime(dateInput: Date | string | number): string {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  return date.toLocaleDateString();
}

export interface TimelineStep {
  stepNumber: number;
  id: string;
  label: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

export function getProjectTimelineSteps(
  projectStatus: string,
  latestVersionStatus?: string
): { steps: TimelineStep[]; activeStepIndex: number; percentComplete: number } {
  let activeStep = 1;

  if (projectStatus === "DELIVERED") {
    activeStep = 6;
  } else if (projectStatus === "APPROVED") {
    activeStep = 6;
  } else if (latestVersionStatus === "REVISION_REQUESTED") {
    activeStep = 5;
  } else if (projectStatus === "REVIEW" || latestVersionStatus === "READY_FOR_REVIEW") {
    activeStep = 4;
  } else if (projectStatus === "POST_PRODUCTION" || projectStatus === "PRODUCTION") {
    activeStep = 3;
  } else if (projectStatus === "SCRIPTING") {
    activeStep = 2;
  } else {
    activeStep = 1;
  }

  const isDelivered = projectStatus === "DELIVERED";

  const rawSteps = [
    {
      stepNumber: 1,
      id: "project_started",
      label: "Project Started",
      description: "Kickoff, discovery & onboarding"
    },
    {
      stepNumber: 2,
      id: "assets_received",
      label: "Assets Received",
      description: "Raw footage, scripts & branding uploaded"
    },
    {
      stepNumber: 3,
      id: "editing",
      label: "Editing",
      description: "Video editing, motion graphics & audio sync"
    },
    {
      stepNumber: 4,
      id: "client_review",
      label: "Client Review",
      description: "Frame-accurate review & feedback"
    },
    {
      stepNumber: 5,
      id: "revision",
      label: "Revision",
      description: "Notes & requested edits implementation"
    },
    {
      stepNumber: 6,
      id: "final_approval",
      label: "Final Approval",
      description: "Final render & 4K asset delivery"
    }
  ];

  const steps: TimelineStep[] = rawSteps.map((step) => {
    let stepStatus: "completed" | "current" | "upcoming" = "upcoming";
    if (isDelivered) {
      stepStatus = "completed";
    } else if (step.stepNumber < activeStep) {
      stepStatus = "completed";
    } else if (step.stepNumber === activeStep) {
      stepStatus = "current";
    } else {
      stepStatus = "upcoming";
    }
    return { ...step, status: stepStatus };
  });

  const completedCount = isDelivered ? 6 : activeStep - 1;
  const percentComplete = Math.round((completedCount / 6) * 100);

  return {
    steps,
    activeStepIndex: activeStep,
    percentComplete
  };
}
