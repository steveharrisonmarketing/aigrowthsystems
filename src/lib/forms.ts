// Shared helpers for the form endpoints.
import { serverEnv } from './env';

/** A text value from submitted data: trimmed and cut to a sensible length. */
export function text(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

/** "example.co.uk" -> "https://example.co.uk/". Returns '' if it is not a web address. */
export function normaliseWebsite(value: string): string {
  if (!value) return '';
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    return url.hostname.includes('.') ? url.href : '';
  } catch {
    return '';
  }
}

export function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

/**
 * Ask Cloudflare Turnstile whether the spam check on the form was passed.
 * With no secret key set (your own computer before keys exist) the check is skipped.
 */
export async function passedSpamCheck(token: string, ip: string | null): Promise<boolean> {
  const secret = serverEnv.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn('Spam check skipped: TURNSTILE_SECRET_KEY is not set.');
    return true;
  }
  if (!token) return false;

  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const result = (await response.json()) as { success: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}
