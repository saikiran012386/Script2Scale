import { z } from "zod";

export const ServiceMediaSchema = z.object({
  type: z.enum(["video", "image"]),
  url: z.string(),
  posterUrl: z.string().optional()
});
export type ServiceMedia = z.infer<typeof ServiceMediaSchema>;

export const ServiceSubOfferingSchema = z.object({
  title: z.string(),
  description: z.string()
});
export type ServiceSubOffering = z.infer<typeof ServiceSubOfferingSchema>;

export const ServiceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  shortDesc: z.string(),
  longDesc: z.string().optional(),
  tags: z.array(z.string()),
  previewMedia: ServiceMediaSchema,
  features: z.array(z.string()).optional(),
  subOfferings: z.array(ServiceSubOfferingSchema).optional(),
  categoryFilterKey: z.enum(["VIDEO", "THUMBNAILS", "POSTERS", "BROCHURES"]).optional()
});
export type Service = z.infer<typeof ServiceSchema>;
