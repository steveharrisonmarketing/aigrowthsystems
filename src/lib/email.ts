// Sends email through Resend (https://resend.com/docs/api-reference/emails/send-email).
// With no RESEND_API_KEY set, emails are skipped, not sent.
import { serverEnv } from './env';

export type EmailStatus = 'sent' | 'skipped' | 'failed';

interface Email {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendEmail(email: Email): Promise<EmailStatus> {
  const key = serverEnv.RESEND_API_KEY;
  if (!key) {
    console.log(`Email skipped (no RESEND_API_KEY set): ${email.subject}`);
    return 'skipped';
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: serverEnv.EMAIL_FROM,
        to: [email.to],
        subject: email.subject,
        html: email.html,
        text: email.text,
        reply_to: email.replyTo,
      }),
    });
    if (!response.ok) {
      console.error(`Email failed (${response.status}): ${await response.text()}`);
      return 'failed';
    }
    return 'sent';
  } catch (error) {
    console.error('Email failed:', error);
    return 'failed';
  }
}
