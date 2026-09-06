import { generateSignedVideoUrl } from "@script2scale/storage";
import { SignedUrlResponse } from "@script2scale/types";

export async function fetchPrivateVideoAccess(
  versionId: string,
  isWatermarked: boolean = true
): Promise<SignedUrlResponse> {
  return generateSignedVideoUrl({
    versionId,
    watermark: isWatermarked,
    expiresInSeconds: 7200
  });
}
