import { SignedUrlRequest, SignedUrlResponse } from "@script2scale/types";

export async function generateSignedVideoUrl(
  request: SignedUrlRequest
): Promise<SignedUrlResponse> {
  const expiresIn = request.expiresInSeconds ?? 3600;
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
  const folder = "preview";
  
  const signedUrl = `https://cdn.script2scale.com/videos/${request.versionId}/${folder}/stream.m3u8?token=mock_cdn_token&exp=${Math.floor(Date.now() / 1000) + expiresIn}`;

  return {
    signedUrl,
    expiresAt,
    watermarked: false
  };
}
