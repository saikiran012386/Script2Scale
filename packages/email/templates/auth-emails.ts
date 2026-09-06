export function renderInvitationEmail(name: string, inviteUrl: string): string {
  return `
    <div style="font-family: sans-serif; color: #0f172a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #10b981; border-radius: 12px;">
      <h2 style="color: #059669; margin-top: 0;">Welcome to Script2Scale Client Portal!</h2>
      <p>Hi ${name},</p>
      <p>You've been invited to access your dedicated <strong>Script2Scale Client Portal workspace</strong> to review video versions, approve cuts, and track project timelines.</p>
      <div style="margin: 24px 0;">
        <a href="${inviteUrl}" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px;">
          ACTIVATE ACCOUNT & SET PASSWORD →
        </a>
      </div>
      <p style="font-size: 12px; color: #64748b;">This invitation link will expire in 48 hours. If you have any questions, reply directly to this email.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #64748b;">Script2Scale Client Portal Security</p>
    </div>
  `;
}

export function renderPasswordResetEmail(name: string, resetUrl: string): string {
  return `
    <div style="font-family: sans-serif; color: #0f172a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; margin-top: 0;">Password Reset Request</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password for your Script2Scale Client Portal account.</p>
      <div style="margin: 24px 0;">
        <a href="${resetUrl}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px;">
          RESET PASSWORD →
        </a>
      </div>
      <p style="font-size: 12px; color: #64748b;">This reset link expires in 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #64748b;">Script2Scale Client Portal Security</p>
    </div>
  `;
}
