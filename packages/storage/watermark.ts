export interface WatermarkOptions {
  sourceVideoKey: string;
  watermarkText?: string;
  clientName?: string;
  opacity?: number;
}

export interface WatermarkJobResult {
  jobId: string;
  outputKey: string;
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
}

export async function triggerWatermarkPipeline(
  options: WatermarkOptions
): Promise<WatermarkJobResult> {
  const watermarkText = options.watermarkText ?? `PROPERTY OF SCRIPT2SCALE - ${options.clientName ?? "PREVIEW"}`;
  const outputKey = options.sourceVideoKey.replace("/raw/", "/watermarked/");

  console.log(`[Storage] Triggering watermark job for key: ${options.sourceVideoKey} with label: ${watermarkText}`);

  return {
    jobId: `wm_${Date.now()}`,
    outputKey,
    status: "QUEUED"
  };
}
