import { z } from "zod";

export const FileCategorySchema = z.enum([
  "RAW_FOOTAGE",
  "BRAND_ASSETS",
  "REFERENCES",
  "DELIVERABLES"
]);
export type FileCategory = z.infer<typeof FileCategorySchema>;

export interface ProjectFileItem {
  id: string;
  projectId: string;
  category: FileCategory;
  filename: string;
  fileUrl: string;
  fileKey?: string | null;
  fileSize: number;
  formattedSize: string;
  mimeType: string;
  uploaderId?: string | null;
  uploaderRole: "CLIENT" | "OWNER";
  createdAt: string;
  isDeletable?: boolean;
}

export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB

export function validateFileForCategory(
  filename: string,
  contentType: string,
  sizeInBytes: number,
  category: FileCategory
): { valid: boolean; error?: string } {
  if (sizeInBytes > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size (${formatFileSize(sizeInBytes)}) exceeds the 500MB maximum limit.`
    };
  }

  const ext = filename.split(".").pop()?.toLowerCase() || "";

  switch (category) {
    case "RAW_FOOTAGE": {
      const allowedExts = ["mp4", "mov", "mkv", "avi", "prores", "wav", "mp3", "m4v", "aac"];
      const isVideoAudio =
        contentType.startsWith("video/") ||
        contentType.startsWith("audio/") ||
        allowedExts.includes(ext);
      if (!isVideoAudio) {
        return {
          valid: false,
          error: "Raw Footage category only accepts video (.mp4, .mov, .mkv, .avi) or audio (.wav, .mp3) files."
        };
      }
      break;
    }
    case "BRAND_ASSETS": {
      const allowedExts = ["png", "jpg", "jpeg", "svg", "ai", "psd", "eps", "pdf", "ttf", "otf", "zip"];
      const isBrand =
        contentType.startsWith("image/") ||
        contentType.includes("pdf") ||
        contentType.includes("zip") ||
        allowedExts.includes(ext);
      if (!isBrand) {
        return {
          valid: false,
          error: "Brand Assets category accepts images (.png, .jpg, .svg), design source files (.ai, .psd, .eps, .pdf), fonts (.ttf, .otf), or archives (.zip)."
        };
      }
      break;
    }
    case "REFERENCES": {
      const allowedExts = ["pdf", "png", "jpg", "jpeg", "mp4", "mov", "txt", "docx", "zip"];
      const isRef =
        contentType.startsWith("image/") ||
        contentType.startsWith("video/") ||
        contentType.includes("pdf") ||
        allowedExts.includes(ext);
      if (!isRef) {
        return {
          valid: false,
          error: "References category accepts documents (.pdf, .txt, .docx), reference media (.mp4, .png), or archives (.zip)."
        };
      }
      break;
    }
    case "DELIVERABLES": {
      const allowedExts = ["mp4", "mov", "zip", "png", "jpg", "jpeg"];
      const isDeliv =
        contentType.startsWith("video/") ||
        contentType.startsWith("image/") ||
        allowedExts.includes(ext);
      if (!isDeliv) {
        return {
          valid: false,
          error: "Deliverables category accepts final exported video (.mp4, .mov), images, or master archives (.zip)."
        };
      }
      break;
    }
  }

  return { valid: true };
}

export function canClientDeleteFile(
  uploaderRole: "CLIENT" | "OWNER",
  projectStatus: string
): boolean {
  if (uploaderRole !== "CLIENT") return false;
  // Client can delete their uploads during early stages before post-production edit begins
  const earlyStages = ["INQUIRY", "DISCOVERY", "SCRIPTING", "PRODUCTION"];
  return earlyStages.includes(projectStatus);
}
