export type AnalyticsEvent =
  | { name: "INQUIRY_SUBMITTED"; properties: { service: string; budget: string } }
  | { name: "VIDEO_VERSION_REVIEWED"; properties: { versionId: string; timestamp: number } }
  | { name: "PROJECT_APPROVED"; properties: { projectId: string; clientId: string } };

export function trackEvent(event: AnalyticsEvent): void {
  console.log(`[Analytics] Tracked event: ${event.name}`, event.properties);
}
