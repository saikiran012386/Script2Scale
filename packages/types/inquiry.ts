import { z } from "zod";

export const CreateInquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required (minimum 2 characters)"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  services: z.array(z.string()).min(1, "Select at least one service"),
  budgetRange: z.string().optional(),
  projectDetails: z.string().min(10, "Please provide brief details about your project (minimum 10 characters)"),
  timeline: z.string().min(1, "Please select a target timeline"),
  referenceLinks: z.string().optional(),
  honeypot: z.string().optional()
});
export type CreateInquiryInput = z.infer<typeof CreateInquirySchema>;

export const InquiryStatusSchema = z.enum([
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "CONVERTED",
  "ARCHIVED"
]);
export type InquiryStatus = z.infer<typeof InquiryStatusSchema>;

export const InquirySchema = CreateInquirySchema.extend({
  id: z.string(),
  status: InquiryStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date()
});
export type Inquiry = z.infer<typeof InquirySchema>;
