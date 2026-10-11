// The two emails sent when an audit is ready: the result to the visitor, and a lead note to us.
import type { AuditResult, AuditAnswers } from './audit';
import { escapeHtml as e } from './forms';
import { site } from '../config/site';
import { offer, gbp, planCredit } from '../config/offer';

export function resultEmail(firstName: string, result: AuditResult, resultUrl: string) {
  const subject = `Your AI Growth Audit: ${result.score} out of 100`;
  const wins = result.wins;
  const text =
    `Hi ${firstName},\n\nYour AI score is ${result.score} out of 100. ${result.scoreMeaning}.\n\n` +
    `Your top 3 quick wins\n\n` +
    wins
      .map(
        (w, i) =>
          `${i + 1}. ${w.title}\nWhat we saw: ${w.evidence}\nWhat it does: ${w.plainMeaning}\nNow: ${w.problem}\nWith AI: ${w.fix}\nTool: ${w.tool}\nHelps with: ${w.helpsWith}\n` +
          `Effort to set up: ${w.effort}\nEstimated time saved: about ${w.hoursSavedPerWeek} hours a week (${w.reasoning})`,
      )
      .join('\n\n') +
    `\n\nAn example made for your business: ${result.example.title}\n\nA customer writes:\n${result.example.customerMessage}\n\n` +
    `Your AI assistant drafts, for you to approve:\n${result.example.reply}\n\n${result.example.note}` +
    `\n\nWhere to start this week\n${result.firstWeek.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nSee your full audit online, with your strengths and how your score adds up: ${resultUrl}\n\n` +
    `Want help putting it in place? The ${offer.session.name} (${gbp(offer.session.price)}) turns this audit into a step-by-step plan. ${planCredit}\n` +
    `${site.url}${site.setupUrl}#plan-call\n\nTime savings are estimates, not promises.\n\n${site.name}`;

  const html =
    `<div style="font-family:sans-serif;font-size:16px;line-height:1.55;color:#111;max-width:600px">` +
    `<p>Hi ${e(firstName)},</p><p>Your AI score is <strong>${result.score} out of 100</strong>. ${e(result.scoreMeaning)}.</p>` +
    `<h2 style="font-size:18px">Your top 3 quick wins</h2>` +
    wins
      .map(
        (w, i) =>
          `<p><strong>${i + 1}. ${e(w.title)}</strong><br>What we saw: ${e(w.evidence)}<br>What it does: ${e(w.plainMeaning)}<br>Now: ${e(w.problem)}<br>With AI: ${e(w.fix)}<br>Tool: ${e(w.tool)}<br>` +
          `Helps with: ${e(w.helpsWith)}<br>Effort to set up: ${e(w.effort)}<br>` +
          `Estimated time saved: about ${w.hoursSavedPerWeek} hours a week (${e(w.reasoning)})</p>`,
      )
      .join('') +
    `<h2 style="font-size:18px">An example made for your business</h2><p><strong>${e(result.example.title)}</strong></p>` +
    `<p style="color:#555;margin-bottom:4px">A customer writes:</p><p style="background:#f3f3f3;padding:12px;border-radius:8px;white-space:pre-wrap">${e(result.example.customerMessage)}</p>` +
    `<p style="color:#555;margin-bottom:4px">Your AI assistant drafts, for you to approve:</p><p style="background:#fbf3dc;padding:12px;border-radius:8px;white-space:pre-wrap">${e(result.example.reply)}</p>` +
    `<p style="color:#666;font-size:14px">${e(result.example.note)}</p>` +
    `<h2 style="font-size:18px">Where to start this week</h2><ol style="padding-left:20px">${result.firstWeek.map((s) => `<li style="margin-bottom:6px">${e(s)}</li>`).join('')}</ol>` +
    `<p><a href="${e(resultUrl)}">See your full audit online</a>, including how your score adds up.</p>` +
    `<p><strong>Want help putting it in place?</strong> The ${e(offer.session.name)} (${gbp(offer.session.price)}) turns this audit into a step-by-step plan. ${e(planCredit)} ` +
    `<a href="${site.url}${site.setupUrl}#plan-call">See what’s included</a></p>` +
    `<p style="color:#666;font-size:14px">Time savings are estimates, not promises.</p><p>${e(site.name)}</p></div>`;

  return { subject, text, html };
}

export function leadEmail(email: string, a: AuditAnswers, result: AuditResult, extra: { utm: string; marketing: boolean; resultUrl: string }) {
  const rows: [string, string][] = [
    ['Name', a.firstName],
    ['Email', email],
    ['Website', a.website],
    ['Team size', a.teamSize],
    ['Takes the most time', a.tasks],
    ['Used AI before', a.aiUse],
    ['Biggest challenge', a.challenge],
    ['Anything else', a.more],
    ['Wants marketing emails', extra.marketing ? 'Yes' : 'No'],
    ['Ad tags', extra.utm],
    ['Score', String(result.score)],
    ['What the business does', result.businessSummary],
    ['Quick wins', result.wins.map((w) => `${w.title} (${w.evidence})`).join('\n')],
    ['How much we had to go on', result.confidence],
    ['Couldn’t check', result.couldNotVerify.join('\n')],
    ['Their result page', extra.resultUrl],
  ];
  const shown = rows.filter(([, v]) => v);
  return {
    subject: `New audit: ${a.firstName} – score ${result.score}`,
    text: shown.map(([k, v]) => `${k}: ${v}`).join('\n'),
    html:
      `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:15px">` +
      shown.map(([k, v]) => `<tr><td style="vertical-align:top;color:#555;white-space:nowrap"><strong>${e(k)}</strong></td><td style="white-space:pre-wrap">${e(v)}</td></tr>`).join('') +
      `</table>`,
  };
}
