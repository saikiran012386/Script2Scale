import { CreateInquiryInput } from "@script2scale/types";

export function renderInquiryReceivedEmail(fullName: string, company?: string): string {
  return `
    <div style="font-family: sans-serif; color: #0f172a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; rounded: 12px;">
      <h2 style="color: #059669;">Thank you for reaching out to Script2Scale!</h2>
      <p>Hi ${fullName},</p>
      <p>We've received your project inquiry${company ? ` for <strong>${company}</strong>` : ''}. Our production team is reviewing your project requirements and will get back to you within 24 business hours with a custom roadmap and proposal.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #64748b;">Script2Scale Video Production & Scaling Studio</p>
    </div>
  `;
}

export function renderAdminInquiryNotificationEmail(inquiry: CreateInquiryInput): string {
  const serviceList = inquiry.services.join(", ");
  return `
    <div style="font-family: sans-serif; color: #0f172a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #10b981; border-radius: 12px;">
      <h2 style="color: #059669; margin-top: 0;">🚀 New Project Inquiry Received</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 140px;">Client Name:</td>
          <td style="padding: 8px 0;">${inquiry.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td>
        </tr>
        ${inquiry.phone ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Phone / WhatsApp:</td>
          <td style="padding: 8px 0;">${inquiry.phone}</td>
        </tr>` : ''}
        ${inquiry.company ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Company / Brand:</td>
          <td style="padding: 8px 0;">${inquiry.company}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Services Requested:</td>
          <td style="padding: 8px 0; font-weight: bold; color: #059669;">${serviceList}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Timeline / Deadline:</td>
          <td style="padding: 8px 0;">${inquiry.timeline}</td>
        </tr>
        ${inquiry.budgetRange ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Budget Range:</td>
          <td style="padding: 8px 0;">${inquiry.budgetRange}</td>
        </tr>` : ''}
      </table>
      <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-radius: 8px;">
        <h4 style="margin-top: 0; color: #334155;">Project Details:</h4>
        <p style="white-space: pre-wrap; margin: 0; font-size: 13px; color: #334155;">${inquiry.projectDetails}</p>
      </div>
      ${inquiry.referenceLinks ? `
      <div style="margin-top: 12px; font-size: 13px;">
        <strong>Reference Links / Notes:</strong> ${inquiry.referenceLinks}
      </div>` : ''}
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #64748b;">Script2Scale Admin Notification System</p>
    </div>
  `;
}
