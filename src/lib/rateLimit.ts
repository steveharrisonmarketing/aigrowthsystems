// Simple rate limits stored in the D1 database (no extra Cloudflare product or paid plan needed).
// Each call adds one to a counter for (hashed key, current time window) and says whether the limit is passed.
import { serverEnv } from './env';

async function sha256(value: string): Promise<string> {
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** The limits used by the audit endpoints. Change the numbers here. */
export const LIMITS = {
  auditPerIpPerHour: 5,
  auditPerEmailPerDay: 3,
  resultPerIpPerHour: 300, // the result page checks every 4 seconds while an audit is being written
  maxAttemptsPerAudit: 3, // paid AI runs per audit, including retries after a failure
};

/**
 * Returns true when this request is still within the limit.
 * Fails closed: if the counter cannot be read or written, the request is refused.
 */
export async function withinLimit(scope: string, value: string, limit: number, windowSeconds: number): Promise<boolean> {
  try {
    const key = await sha256(`${scope}:${value}`);
    const window = String(Math.floor(Date.now() / 1000 / windowSeconds));
    const row = await serverEnv.DB.prepare(
      `INSERT INTO rate_limits (key, window, count) VALUES (?, ?, 1)
       ON CONFLICT (key, window) DO UPDATE SET count = count + 1
       RETURNING count`,
    )
      .bind(key, window)
      .first<{ count: number }>();
    return !!row && row.count <= limit;
  } catch (error) {
    console.error('Rate limit check failed (refusing the request):', error);
    return false;
  }
}

export const HOUR = 3600;
export const DAY = 86400;
