// Runs on the result page: asks the server for this visitor's audit and fills the page in.
// Everything from the server is placed as plain text, never as HTML.

interface Win {
  [key: string]: string | number;
}
// The newer fields are optional so that audits saved before they existed still display.
interface Result {
  score: number;
  scoreMeaning: string;
  wins: Win[];
  firstWeek?: string[];
  strengths?: string[];
  couldNotVerify: string[];
  businessSummary?: string;
  scoreBreakdown?: { area: string; score: number; why: string }[];
  example?: { title: string; customerMessage: string; reply: string; note: string };
  basedOn?: string[];
  confidence?: string;
}

const $ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const show = (el: HTMLElement | null, on: boolean) => el && (el.hidden = !on);
const el = (tag: string, text: string, className = '') => {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
};
const setText = (sel: string, text: string) => {
  const node = $(sel);
  if (node) node.textContent = text;
};

const confidenceText: Record<string, string> = {
  High: 'We had plenty to go on, so this audit is specific to your business.',
  Medium: 'We had some information to go on. Tell us more and we can be more specific.',
  Low: 'We had very little to go on, so this audit is short. Tell us more and we can be much more specific.',
};

function fill(data: { firstName: string; sample: boolean; emailed?: boolean; result: Result }) {
  const r = data.result;
  document.querySelectorAll<HTMLElement>('[data-score]').forEach((el) => (el.textContent = String(r.score)));
  $('[data-ring]')?.style.setProperty('--score', `${r.score}%`);
  const name = $('[data-name]');
  if (name) name.textContent = data.firstName ? `${data.firstName}, here’s your audit. ` : '';
  const meaning = $('[data-meaning]');
  if (meaning) meaning.textContent = r.scoreMeaning.replace(/\.$/, '') + '.';

  document.querySelectorAll<HTMLElement>('[data-wins] > li').forEach((li, i) => {
    const win = r.wins[i];
    if (!win) return li.remove();
    li.querySelectorAll<HTMLElement>('[data-w]').forEach((field) => (field.textContent = String(win[field.dataset.w!] ?? '')));
    show(li.querySelector<HTMLElement>('.win-evidence'), Boolean(win.evidence));
  });

  const hours = r.wins.reduce((sum, w) => sum + Number(w.hoursSavedPerWeek || 0), 0);
  // Rounded to the nearest half hour. Hours only: no money figures are shown.
  setText('[data-time-back]', `About ${Math.round(hours * 2) / 2} hours a week back, estimated from your answers.`);

  show($('[data-strengths-wrap]'), Boolean(r.strengths?.length));
  const strengths = $('[data-strengths]');
  if (strengths && r.strengths?.length) strengths.replaceChildren(...r.strengths.map((t) => el('li', t)));

  const week = $('[data-first-week]');
  // Audits saved before firstWeek existed have none: hide the section rather than show the sample steps as theirs.
  if (week && r.firstWeek?.length) week.replaceChildren(...r.firstWeek.map((t) => el('li', t)));
  show($('[data-first-week-wrap]'), !!r.firstWeek?.length);

  show($('[data-business-wrap]'), Boolean(r.businessSummary));
  setText('[data-business]', r.businessSummary ?? '');

  const breakdown = $('[data-breakdown]');
  show($('[data-breakdown-wrap]'), Boolean(r.scoreBreakdown?.length));
  if (breakdown && r.scoreBreakdown?.length) {
    breakdown.replaceChildren(
      ...r.scoreBreakdown.map((b) => {
        const li = document.createElement('li');
        const n = el('span', String(b.score), 'score-area-n');
        n.append(el('small', '/20'));
        const body = document.createElement('span');
        body.append(el('strong', b.area), document.createElement('br'), b.why);
        const bar = document.createElement('span');
        bar.className = 'score-bar';
        bar.setAttribute('aria-hidden', 'true');
        bar.append(Object.assign(document.createElement('i'), { style: `width: ${(b.score / 20) * 100}%` }));
        body.append(bar);
        li.append(n, body);
        return li;
      }),
    );
  }

  show($('[data-example-wrap]'), Boolean(r.example?.reply));
  if (r.example) {
    setText('[data-example-title]', r.example.title);
    setText('[data-example-customer]', r.example.customerMessage);
    setText('[data-example-reply]', r.example.reply);
    setText('[data-example-note]', r.example.note);
  }

  const based = $('[data-based]');
  show($('[data-based-wrap]'), Boolean(r.basedOn?.length));
  if (based && r.basedOn?.length) based.replaceChildren(...r.basedOn.map((t) => el('li', t)));
  const confidence = $('[data-confidence]');
  if (confidence && r.confidence && confidenceText[r.confidence] && !data.sample) {
    confidence.textContent = confidenceText[r.confidence];
    show(confidence, true);
  }

  const list = $('[data-unverified]');
  if (list && r.couldNotVerify.length) {
    list.replaceChildren(...r.couldNotVerify.map((t) => Object.assign(document.createElement('li'), { textContent: t })));
    show($('[data-unverified-wrap]'), true);
  }
  show($('[data-sample-note]'), data.sample);
  // Only say we emailed it when the server confirmed the email was sent.
  show($('[data-emailed]'), !data.sample && data.emailed === true);
  show($('[data-not-emailed]'), !data.sample && data.emailed !== true);
}

export function runResultPage() {
  const result = $('[data-result]');
  const loading = $('[data-loading]');
  const problem = $('[data-problem]');
  const id = new URLSearchParams(location.search).get('id');

  if (!id) {
    // No audit to show. In review mode the sample stays on screen; on the live site go to the start.
    if (result?.dataset.review !== 'yes') location.replace('/assessment');
    return;
  }

  const steps = [...document.querySelectorAll<HTMLElement>('[data-step]')];
  let timer = 0;
  const startSteps = () => {
    steps.forEach((s) => s.classList.remove('is-done', 'is-active'));
    let n = 0;
    steps[0]?.classList.add('is-active');
    timer = window.setInterval(() => {
      if (n >= steps.length - 1) return;
      steps[n].classList.replace('is-active', 'is-done');
      steps[++n].classList.add('is-active');
    }, 12000);
  };

  const fail = (message?: string) => {
    clearInterval(timer);
    const text = $('[data-problem-text]');
    if (text && message) text.textContent = message;
    show(loading, false);
    show(problem, true);
  };

  async function load(tries = 0): Promise<void> {
    try {
      const response = await fetch('/api/audit-result', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.status === 'done') {
        clearInterval(timer);
        fill(data);
        show(loading, false);
        show(result, true);
        document.dispatchEvent(new CustomEvent('audit-completed'));
      } else if (data.status === 'running' && tries < 150) {
        setTimeout(() => load(tries + 1), 4000);
      } else if (data.status === 'gave-up') {
        fail('We couldn’t write this audit after several tries. Please email us and we’ll look into it.');
      } else if (data.status === 'limited') {
        fail('Too many requests from this connection. Please wait a few minutes and try again.');
      } else if (data.status === 'missing') {
        fail('We couldn’t find that audit. The link may be incomplete.');
      } else {
        fail();
      }
    } catch {
      fail('We couldn’t reach the server. Check your connection and try again.');
    }
  }

  const start = () => {
    show(result, false);
    show(problem, false);
    show(loading, true);
    startSteps();
    load();
  };
  $('[data-retry]')?.addEventListener('click', start);
  $('[data-print]')?.addEventListener('click', () => window.print());
  start();
}
