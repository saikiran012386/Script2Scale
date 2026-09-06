import { FileCategory } from "@script2scale/types";

export interface PresignedUploadOptions {
  filename: string;
  contentType: string;
  projectId: string;
  category?: FileCategory | string;
  expiresInSeconds?: number;
}

export interface PresignedUploadResult {
  uploadUrl: string;
  fileKey: string;
  expiresAt: string;
}

export async function generatePresignedUploadUrl(
  options: PresignedUploadOptions
): Promise<PresignedUploadResult> {
  const expiresIn = options.expiresInSeconds ?? 3600;
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
  const folderCategory = (options.category || "raw_footage").toString().toLowerCase();
  const sanitizedFilename = options.filename.replace(/[^a-zA-Z0-9_.-]/g, "_");
  const fileKey = `projects/${options.projectId}/${folderCategory}/${Date.now()}-${sanitizedFilename}`;

  // S3/R2 presigned upload URL stub generator
  const uploadUrl = `https://storage.script2scale.com/${fileKey}?signature=mock_upload_signature&expires=${expiresIn}`;

  return {
    uploadUrl,
    fileKey,
    expiresAt
  };
}

export async function generateSignedDownloadUrl(
  fileKey: string,
  filename: string,
  expiresInSeconds = 3600
): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const encodedName = encodeURIComponent(filename);
  return `https://storage.script2scale.com/${fileKey}?response-content-disposition=attachment%3Bfilename%3D${encodedName}&signature=mock_download_token&expires=${expires}`;
}

export interface UploadMediaAssetResult {
  fileKey: string;
  publicUrl: string;
}

export async function uploadMediaAsset(
  file: File | { name: string; type: string; size?: number },
  folder = "portfolio/media"
): Promise<UploadMediaAssetResult> {
  const presigned = await generatePresignedUploadUrl({
    filename: file.name,
    contentType: file.type,
    projectId: folder.replace(/[^a-zA-Z0-9-]/g, "-")
  });

  const isVideo = file.type.startsWith("video/") || file.name.endsWith(".mp4") || file.name.endsWith(".mov");
  const fallbackUrl = isVideo
    ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    : "/images/work/acme-thumb.jpg";

  return {
    fileKey: presigned.fileKey,
    publicUrl: fallbackUrl
  };
}
