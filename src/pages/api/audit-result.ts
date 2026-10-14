// Returns the result for one audit. The first call writes it (this is the slow part, while the
// visitor watches the loading screen); later calls return the saved copy.
import type { APIRoute } from 'astro';
import { serverEnv } from '../../lib/env';
import { text, json } from '../../lib/forms';
import { generateAudit, type AuditResult } from '../../lib/audit';
import { sendEmail } from '../../lib/email';
import { resultEmail, leadEmail } from '../../lib/auditEmail';
import { site } from '../../config/site';
import { withinLimit, LIMITS, HOUR } from '../../lib/rateLimit';

export const prerender = false;

interface Row {
  id: string;
  email: string;
  first_name: string;
  website: string | null;
  team_size: string;
  tasks: string;
  ai_use: string;
  challenge: string;
  more: string | null;
  marketing_consent: number;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  status: string;
  result_json: string | null;
  is_sample: number;
  attempts: number;
  email_status: string | null;
}

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  if (!(await withinLimit('result-ip', ip, LIMITS.resultPerIpPerHour, HOUR))) return json({ status: 'limited' }, 429);

  let id = '';
  try {
    id = text(((await request.json()) as { id?: unknown }).id, 60);
  } catch {}
  if (!/^[0-9a-f-]{36}$/.test(id)) return json({ status: 'missing' }, 404);

  const db = serverEnv.DB;
  let row: Row | null;
  try {
    row = await db.prepare('SELECT * FROM audits WHERE id = ?').bind(id).first<Row>();
  } catch (error) {
    console.error(`Audit ${id} could not be read:`, error);
    return json({ status: 'failed' }, 500);
  }
  if (!row) return json({ status: 'missing' }, 404);

  // emailed is true only when the email provider confirmed the audit email was sent.
  const payload = (result: AuditResult, sample: boolean, emailStatus: string | null) =>
    json({ status: 'done', firstName: row.first_name, sample, emailed: emailStatus === 'sent', result });

  if (row.status === 'done' && row.result_json) {
    try {
      return payload(JSON.parse(row.result_json), row.is_sample === 1, row.email_status);
    } catch {
      return json({ status: 'failed' }, 500);
    }
  }

  // Each paid AI run counts as an attempt. After the limit, the audit stays failed and no more runs happen.
  if ((row.attempts ?? 0) >= LIMITS.maxAttemptsPerAudit && row.status !== 'running') return json({ status: 'gave-up' }, 429);

  // Claim the job so two open tabs don't both pay for it. A claim older than 8 minutes is treated as abandoned
  // (a deep audit can take several minutes).
  let claim: { meta: { changes: number } };
  try {
  claim = await db
    .prepare(
      `UPDATE audits SET status = 'running', started_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now'), attempts = attempts + 1
       WHERE id = ? AND attempts < ? AND (status IN ('pending', 'failed') OR (status = 'running' AND started_at < strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-8 minutes')))`,
    )
    .bind(id, LIMITS.maxAttemptsPerAudit)
    .run();
  } catch (error) {
    console.error(`Audit ${id} could not be claimed:`, error);
    return json({ status: 'failed' }, 500);
  }
  if (claim.meta.changes === 0) return json({ status: 'running' });

  const answers = {
    firstName: row.first_name,
    website: row.website ?? '',
    teamSize: row.team_size,
    tasks: row.tasks,
    aiUse: row.ai_use,
    challenge: row.challenge,
    more: row.more ?? '',
  };

  try {
    const { result, sample, inputTokens, outputTokens } = await generateAudit(answers);
    const resultUrl = `${new URL(request.url).origin}/assessment/result?id=${id}`;

    // The result is saved before any email goes out, so a failed email never loses it.
    await db
      .prepare(`UPDATE audits SET status = 'done', result_json = ?, is_sample = ?, input_tokens = ?, output_tokens = ? WHERE id = ?`)
      .bind(JSON.stringify(result), sample ? 1 : 0, inputTokens, outputTokens, id)
      .run();

    let emailStatus: string | null = null;
    if (!sample) {
      emailStatus = await sendEmail({ to: row.email, replyTo: site.email, ...resultEmail(row.first_name, result, resultUrl) });
      // From here the result is saved, so a problem must not mark the audit failed (that would pay for it again).
      try {
        await db.prepare('UPDATE audits SET email_status = ? WHERE id = ?').bind(emailStatus, id).run();
        const utm = [row.utm_source, row.utm_campaign, row.utm_content].filter(Boolean).join(' / ');
        await sendEmail({
        to: serverEnv.AUDIT_NOTIFY_EMAIL,
        replyTo: row.email,
          ...leadEmail(row.email, answers, result, { utm, marketing: row.marketing_consent === 1, resultUrl }),
        });
      } catch (error) {
        console.error(`Audit ${id}: saved, but the follow-up step failed:`, error);
      }
    }
    return payload(result, sample, emailStatus);
  } catch (error) {
    console.error(`Audit ${id} failed:`, error);
    try {
      await db.prepare(`UPDATE audits SET status = 'failed' WHERE id = ? AND status = 'running'`).bind(id).run();
    } catch {}
    return json({ status: 'failed' }, 500);
  }
};
