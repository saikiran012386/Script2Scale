export function renderVersionReadyEmail(
  clientName: string,
  projectName: string,
  versionNumber: number,
  reviewUrl: string
): string {
  return `
    <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto;">
      <h2>New Video Version Ready for Review</h2>
      <p>Hi ${clientName},</p>
      <p>Version v${versionNumber} for <strong>${projectName}</strong> is now ready for your review and feedback.</p>
      <p><a href="${reviewUrl}" style="background-color: #16a34a; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block;">Review Version v${versionNumber}</a></p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #64748b;">Script2Scale Client Portal</p>
    </div>
  `;
}
