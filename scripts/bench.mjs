// Test bench: runs real audits against the site running on this computer and saves each result.
// Each run spends Anthropic credit. Start the site first (npm run dev), then:
//   node scripts/bench.mjs https://example.co.uk [more addresses...]
// Results are saved in audits/bench/<date-time>/ (not uploaded to GitHub).
// Answers are the same plain, assumed answers for every site unless a JSON file is given:
//   node scripts/bench.mjs --file audits/test-businesses.json
//   where the file is a list like [{ "website": "...", "teamSize": "2–5", "tasks": "...", "aiUse": "A little", "challenge": "...", "more": "" }]
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const BASE = process.env.BENCH_URL || 'http://localhost:4321';
// Opus 5.5 list prices in US dollars per million tokens (checked 10 October 2026). Web searches are charged on top.
const PRICE_IN = 4;
const PRICE_OUT = 20;

const ASSUMED = { teamSize: '2–5', tasks: 'Replying to enquiries and messages', aiUse: 'A little', challenge: 'Getting more customers', more: '' };

const args = process.argv.slice(2);
let cases;
if (args[0] === '--file') {
  cases = JSON.parse(readFileSync(args[1], 'utf8')).map((c) => ({ ...ASSUMED, assumed: false, ...c }));
} else {
  cases = args.map((website) => ({ ...ASSUMED, website, assumed: true }));
}
if (!cases.length) {
  console.error('Give at least one website address.');
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
const outDir = path.join('audits', 'bench', stamp);
mkdirSync(outDir, { recursive: true });

const post = async (url, body) => {
  const response = await fetch(BASE + url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  return { status: response.status, data: await response.json().catch(() => ({})) };
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function tokens(id) {
  try {
    const out = execFileSync(
      process.execPath,
      ['node_modules/wrangler/bin/wrangler.js', 'd1', 'execute', 'aigrowthsystems', '--local', '--json', '--command', `SELECT input_tokens, output_tokens, is_sample FROM audits WHERE id = '${id}'`],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    );
    return JSON.parse(out)[0].results[0];
  } catch {
    return null;
  }
}

const summary = [];
for (const c of cases) {
  const name = new URL(c.website.startsWith('http') ? c.website : 'https://' + c.website).hostname.replace(/^www\./, '');
  console.log(`\n${name}: starting…`);
  const started = Date.now();

  const created = await post('/api/audit', {
    email: `bench-${Date.now()}@aigrowthsystems.co.uk`,
    firstName: 'Test',
    website: c.website,
    teamSize: c.teamSize,
    tasks: c.tasks,
    aiUse: c.aiUse,
    challenge: c.challenge,
    more: c.more,
    turnstileToken: 'bench',
    sourcePage: 'bench',
  });
  if (!created.data.ok) {
    console.log(`${name}: could not start – ${created.data.message || created.status}`);
    summary.push({ name, error: created.data.message || `status ${created.status}` });
    continue;
  }

  const id = created.data.id;
  let result;
  for (let i = 0; i < 200; i++) {
    result = await post('/api/audit-result', { id }).catch((e) => ({ status: 0, data: { status: 'error', message: String(e) } }));
    if (result.data.status !== 'running') break;
    await sleep(4000);
  }
  const seconds = Math.round((Date.now() - started) / 1000);

  if (result.data.status !== 'done') {
    console.log(`${name}: failed after ${seconds}s (${result.data.status})`);
    summary.push({ name, seconds, error: result.data.status });
    continue;
  }

  const t = tokens(id) || {};
  const cost = t.input_tokens != null ? (t.input_tokens * PRICE_IN + t.output_tokens * PRICE_OUT) / 1e6 : null;
  const r = result.data.result;
  writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify({ case: c, id, seconds, tokens: t, costUsd: cost, sample: result.data.sample, result: r }, null, 2));

  const md = [
    `# ${name}`,
    ``,
    `Time: ${seconds}s · Tokens in: ${t.input_tokens ?? '?'} · Tokens out: ${t.output_tokens ?? '?'} · Cost before search fees: ${cost != null ? '$' + cost.toFixed(2) : '?'}${result.data.sample ? ' · SAMPLE (no AI key)' : ''}`,
    `Answers ${c.assumed ? 'assumed' : 'supplied'}: team ${c.teamSize}; takes most time: ${c.tasks}; AI use: ${c.aiUse}; challenge: ${c.challenge}${c.more ? '; more: ' + c.more : ''}`,
    ``,
    `## What we understood`,
    r.businessSummary,
    ``,
    `## Score: ${r.score} – ${r.scoreMeaning} (confidence: ${r.confidence})`,
    ...r.scoreBreakdown.map((b) => `- ${b.area}: ${b.score}/20 – ${b.why}`),
    ``,
    `## Quick wins`,
    ...r.wins.flatMap((w, i) => [
      `### ${i + 1}. ${w.title}`,
      `- What we saw: ${w.evidence}`,
      `- Now: ${w.problem}`,
      `- With AI: ${w.fix}`,
      `- What you'd use: ${w.tool}`,
      `- Helps with: ${w.helpsWith} · Effort: ${w.effort} · About ${w.hoursSavedPerWeek} hours a week (${w.reasoning})`,
      ``,
    ]),
    `## Example: ${r.example.title}`,
    `Customer: ${r.example.customerMessage}`,
    ``,
    `Draft reply: ${r.example.reply}`,
    ``,
    `Note: ${r.example.note}`,
    ``,
    `## Where to start`,
    r.firstStep,
    ``,
    `## Based on`,
    ...r.basedOn.map((x) => `- ${x}`),
    ``,
    `## Couldn't check`,
    ...(r.couldNotVerify.length ? r.couldNotVerify.map((x) => `- ${x}`) : ['- Nothing listed']),
    ``,
  ].join('\n');
  writeFileSync(path.join(outDir, `${name}.md`), md);
  console.log(`${name}: done in ${seconds}s, ${t.input_tokens ?? '?'} in / ${t.output_tokens ?? '?'} out, ${cost != null ? '$' + cost.toFixed(2) : 'cost unknown'}`);
  summary.push({ name, seconds, input: t.input_tokens, output: t.output_tokens, costUsd: cost, sample: result.data.sample });
}

writeFileSync(path.join(outDir, '_summary.json'), JSON.stringify(summary, null, 2));
console.log(`\nSaved in ${outDir}`);
