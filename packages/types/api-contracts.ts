import { z } from "zod";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export const SignedUrlRequestSchema = z.object({
  versionId: z.string(),
  expiresInSeconds: z.number().int().positive().optional().default(3600),
  watermark: z.boolean().optional().default(true)
});
export type SignedUrlRequest = z.infer<typeof SignedUrlRequestSchema>;

export const SignedUrlResponseSchema = z.object({
  signedUrl: z.string().url(),
  expiresAt: z.string(),
  watermarked: z.boolean()
});
export type SignedUrlResponse = z.infer<typeof SignedUrlResponseSchema>;
