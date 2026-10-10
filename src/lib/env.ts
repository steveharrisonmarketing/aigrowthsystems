// Settings and secrets available to the server code in src/pages/api.
// Values come from wrangler.jsonc ("vars"), .env on your own computer, and Cloudflare secrets when live.
import { env } from 'cloudflare:workers';

interface ServerEnv {
  DB: D1Database;
  AUDIT_NOTIFY_EMAIL: string;
  EMAIL_FROM: string;
  ANTHROPIC_API_KEY?: string;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

export const serverEnv = env as unknown as ServerEnv;
