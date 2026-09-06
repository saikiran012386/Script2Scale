export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendTransactionalEmail(payload: SendEmailPayload): Promise<{ messageId: string }> {
  console.log(`[Email] Dispatching email to ${payload.to} | Subject: ${payload.subject}`);
  return { messageId: `msg_${Date.now()}` };
}
