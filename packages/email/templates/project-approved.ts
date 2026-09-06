export function renderProjectApprovedEmail(
  clientName: string,
  companyName: string | undefined | null,
  projectName: string,
  versionNumber: number,
  versionTitle: string,
  approvedAt: string
): string {
  const formattedCompany = companyName ? ` (${companyName})` : "";
  return `
    <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6;">
      <div style="background-color: #064e3b; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">🎉 PROJECT APPROVED & DELIVERED</h1>
      </div>
      <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Hi Team,</p>
        <p>Great news! <strong>${clientName}</strong>${formattedCompany} has officially submitted final approval for <strong>${projectName}</strong>.</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 8px 0;"><strong>Approved Cut:</strong> Version v${versionNumber} - ${versionTitle}</p>
          <p style="margin: 0 0 8px 0;"><strong>Approval Date:</strong> ${new Date(approvedAt).toLocaleString()}</p>
          <p style="margin: 0;"><strong>Status:</strong> COMPLETED / DELIVERED ✓</p>
        </div>

        <p>Project feedback has been locked and milestone status is now set to <strong>DELIVERED</strong>.</p>
        
        <p style="margin-top: 24px;">
          <a href="http://localhost:3001/projects" style="background-color: #0f172a; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">View in Admin Workspace →</a>
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 12px; color: #64748b;">Script2Scale Platform System Notification</p>
      </div>
    </div>
  `;
}
