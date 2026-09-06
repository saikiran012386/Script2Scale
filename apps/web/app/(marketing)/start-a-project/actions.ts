"use server";

import { CreateInquirySchema, CreateInquiryInput } from "@script2scale/types";
import { prisma } from "@script2scale/database";
import {
  sendTransactionalEmail,
  renderInquiryReceivedEmail,
  renderAdminInquiryNotificationEmail
} from "@script2scale/email";

export interface SubmitInquiryResult {
  success: boolean;
  inquiryId?: string;
  errors?: Record<string, string>;
  message?: string;
}

export async function submitInquiryAction(data: CreateInquiryInput): Promise<SubmitInquiryResult> {
  try {
    // 1. Honeypot check (Spam Protection)
    if (data.honeypot && data.honeypot.trim() !== "") {
      console.warn("[Spam Protection] Honeypot field triggered. Silently rejecting payload.");
      return { success: true, inquiryId: `spm_${Date.now()}` };
    }

    // 2. Server-side Zod validation
    const validationResult = CreateInquirySchema.safeParse(data);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      return {
        success: false,
        errors: fieldErrors,
        message: "Please fix the highlighted validation errors before submitting."
      };
    }

    const validData = validationResult.data;

    // 3. Database Record Creation via Prisma
    let inquiryId = `inq_${Date.now()}`;
    try {
      const createdInquiry = await prisma.inquiry.create({
        data: {
          fullName: validData.fullName,
          email: validData.email,
          phone: validData.phone || null,
          company: validData.company || null,
          services: validData.services,
          budgetRange: validData.budgetRange || null,
          projectDetails: validData.projectDetails,
          timeline: validData.timeline || null,
          referenceLinks: validData.referenceLinks || null,
          status: "NEW"
        }
      });
      inquiryId = createdInquiry.id;
    } catch (dbError) {
      console.error("[Database Warning] Prisma write encountered issue:", dbError);
      inquiryId = `inq_${Date.now()}`;
    }

    // 4. Email Dispatch
    try {
      // Customer confirmation
      await sendTransactionalEmail({
        to: validData.email,
        subject: "We've received your project inquiry — Script2Scale",
        html: renderInquiryReceivedEmail(validData.fullName, validData.company)
      });

      // Internal admin alert
      await sendTransactionalEmail({
        to: "inquiries@script2scale.com",
        subject: `New Project Inquiry: ${validData.fullName} (${validData.services.join(", ")})`,
        html: renderAdminInquiryNotificationEmail(validData)
      });
    } catch (emailError) {
      console.error("[Email Error] Failed to dispatch inquiry emails:", emailError);
    }

    return {
      success: true,
      inquiryId
    };
  } catch (error: any) {
    console.error("[Server Action Error] submitInquiryAction failed:", error);
    return {
      success: false,
      message: "An unexpected error occurred on the server. Please try submitting again."
    };
  }
}
