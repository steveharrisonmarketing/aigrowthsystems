// Receives the audit questions: spam check, one audit per email per 30 days, save, hand back the result id.
import type { APIRoute } from 'astro';
import { serverEnv } from '../../lib/env';
import { text, isEmail, normaliseWebsite, passedSpamCheck, json } from '../../lib/forms';

export const prerender = false;

const TEAM_SIZES = ['Just me', '2–5', '6–20', '20+'];
const AI_USE = ['Not yet', 'A little', 'Regularly'];

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, message: 'The form could not be read. Please try again.' }, 400);
  }

  // A hidden box real visitors never see. If it is filled in, a bot did it.
  if (text(body.company_fax)) return json({ ok: false, message: 'Please try again.' }, 400);

  if (!(await passedSpamCheck(text(body.turnstileToken, 4000), request.headers.get('cf-connecting-ip')))) {
    return json({ ok: false, message: 'The spam check did not pass. Please refresh the page and try again.' }, 400);
  }

  const email = text(body.email, 254).toLowerCase();
  const firstName = text(body.firstName, 100);
  const website = normaliseWebsite(text(body.website, 300));
  const teamSize = text(body.teamSize, 20);
  const tasks = text(body.tasks, 1500);
  const aiUse = text(body.aiUse, 20);
  const challenge = text(body.challenge, 100);
  const more = text(body.more, 1500);

  if (!isEmail(email)) return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  if (!firstName || !tasks || !challenge) return json({ ok: false, message: 'Please answer every question that isn’t marked optional.' }, 400);
  if (!TEAM_SIZES.includes(teamSize)) return json({ ok: false, message: 'Please choose a team size.' }, 400);
  if (!AI_USE.includes(aiUse)) return json({ ok: false, message: 'Please tell us whether you’ve used AI tools before.' }, 400);

  try {
    // One audit per email every 30 days protects the AI budget. A repeat visit gets the earlier result.
    const recent = await serverEnv.DB.prepare(
      `SELECT id FROM audits WHERE email = ? AND status != 'failed' AND is_sample = 0 AND created_at > strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-30 days')
       ORDER BY created_at DESC LIMIT 1`,
    )
      .bind(email)
      .first<{ id: string }>();
    if (recent) return json({ ok: true, id: recent.id, existing: true });

    const id = crypto.randomUUID();
    await serverEnv.DB.prepare(
      `INSERT INTO audits (id, email, first_name, website, team_size, tasks, ai_use, challenge, more, marketing_consent,
                           source_page, referrer, utm_source, utm_campaign, utm_content)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        id, email, firstName, website, teamSize, tasks, aiUse, challenge, more, body.marketing === true ? 1 : 0,
        text(body.sourcePage, 300), text(body.referrer, 500), text(body.utm_source, 200), text(body.utm_campaign, 200), text(body.utm_content, 200),
      )
      .run();
    return json({ ok: true, id });
  } catch (error) {
    console.error('Could not save the audit:', error);
    return json({ ok: false, message: 'Sorry, something went wrong saving your answers. Please try again in a minute.' }, 500);
  }
};
