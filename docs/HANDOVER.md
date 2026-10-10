# Handover – where the build is

Last updated: 10 October 2026. Read this with `CLAUDE.md` and `docs/BRIEF.md` (v2.2) at the start of a session on a new computer. Update it whenever a phase finishes or the open items change.

## Done

- Brief v2.2 and `CLAUDE.md` written and committed.
- Phase 0, local half: Astro 7 project, Tailwind CSS 4, self-hosted fonts, `.env.example`, `.gitignore`.
- Phase 0, online half (10 October 2026):
  - GitHub: private repository `steveharrisonmarketing/aigrowthsystems`, branch `main`.
  - Cloudflare: hosted as a Worker with static assets (`wrangler.jsonc`), built by Workers Builds on every push to `main` (build `npm run build`, deploy `npx wrangler deploy`).
  - Preview address: https://aigrowthsystems.steveharrisonmarketing.workers.dev
  - The site is static for now. Astro's Cloudflare adapter is added in Phase 2 for server functions; check Cloudflare's and Astro's current docs first.
- Phase 1, ready for Steve's review (not yet approved):
  - design system in `src/styles/global.css`;
  - the one settings file `src/config/offer.ts`; site wording in `src/config/site.ts`;
  - industry variants in `src/data/industries.ts` (`?for=builders` etc.);
  - Home page `src/pages/index.astro` (headline preview with `?h=a|b|c`);
  - `/ai-business-setup` page;
  - stand-in pages for `/assessment`, `/book`, `/blog`, `/about`, `/privacy`, `/cookies`, `/terms`;
  - redirects for the hidden addresses in `astro.config.mjs`.

## 10 October 2026, later: direction changed (v2.3)

See the v2.3 block at the top of `CLAUDE.md`. Built and ready for Steve's review, not yet approved:

- `/free-audit` ad landing page (no menu, email opt-in, sample audit, 3 steps, FAQ).
- Home page rebuilt: audit first, 4 steps, offer cards, founder section, blog stand-in, FAQ.
- `/ai-business-setup` rebuilt as the offers page: one-to-one, five offers read from `src/config/offer.ts`.
- Buy buttons appear when a Stripe payment link is pasted into an offer's `checkoutUrl`.

The work order and the scores for each page are in `docs/REVIEW.md`. Work through that order; re-score after each round.

Audit engine (built 10 October 2026, tested locally with a sample result only):

- Flow: `/free-audit` or `/` → `/assessment` → `POST /api/audit` → `/assessment/result?id=…` → `POST /api/audit-result` (writes the audit on first call, then returns the saved copy).
- The site now uses Astro's Cloudflare adapter. The D1 database `aigrowthsystems` was created in Cloudflare on 10 October 2026, its id is in `wrangler.jsonc`, and migration `0001_audits.sql` has been applied to it (`npx wrangler d1 migrations apply aigrowthsystems --remote`; new migrations need the same command).
- **Live on the preview address since 10 October 2026:** `work` was merged into `main` and Cloudflare's automatic build published it (it takes about two minutes after a push). The live site has no API keys yet, so audits there return the sample result, no emails are sent and the spam check is skipped.
- The Windows PC is signed in to Cloudflare through `wrangler login`.
- Local database: `npm run db:local` creates it. Keys go in `.env` (see `.env.example`). With no `ANTHROPIC_API_KEY` a sample audit is returned; with no `RESEND_API_KEY` emails are skipped; with no Turnstile keys the spam check is skipped.
- **Audit quality push (10 October 2026, evening).** Steve's instruction: the audit is the most important part of the funnel; go for the best output even if it costs more and takes longer, and scale back later if volume demands it.
  - Model is now `claude-opus-5-5` at high effort, with web fetch (up to 8 pages) and web search (up to 5 searches), structured output. Settings are at the top of `src/lib/audit.ts`.
  - Every quick win must carry evidence ("What we saw"). The result also has a business summary, a five-area score breakdown, one worked example written for the business, "what this is based on", a confidence level, and an honest short form when there is little to go on.
  - Result page, email and sample updated to match. The loading screen now says it takes a few minutes.
  - **Still untested with a real key.** First real runs must measure time and cost. Known risk: Cloudflare's free plan allows 10 ms of processor time per request, and a long streamed AI reply may exceed it; if so the options are the Workers Paid plan (ask Steve first) or a lighter way of reading the reply.
  - Not built yet: a test bench that runs a list of test businesses and saves results side by side; a second "editor" pass over the draft.
- **Two tiers.** The website gives the instant audit (paid API). For qualified leads, `/deep-audit <email or audit id>` (in `.claude/commands/`) pulls the lead from the database and writes a deeper audit plus a call presentation into `audits/drafts/` using Steve's Claude plan. `audits/` is not saved to GitHub because it holds personal data, so drafts stay on the computer that made them.
- Not built yet: Kit sign-up, event log, Meta pixel, headline split test, Stripe, call booking.

The old folder `~/Desktop/Claude/aigrowthsystems-site` on the Mac is a separate, older build. Work in `~/Projects/aigrowthsystems`.

## Not done yet

- Phase 1 leftovers: Higgsfield briefs for H1–H5, each shown to Steve with model and estimated credits before any generation. PageSpeed check once the site is online.
- Phases 2–7 as in the brief.

## Waiting on Steve

Steve has seen the design on his phone and says it looks great. He has changes he wants to make and will list them in the next session (first session on his Mac). Phase 1 is not formally approved until those are done.

1. His list of design and content changes.
2. Approve or change the draft headings: "4 STEPS. IT STARTS WITH A FREE AUDIT." and "WHAT ARE SLOW REPLIES PUTTING AT RISK?"
3. Approve or change the comparison table wording and the FAQ answers.
4. Which tools and practices he really uses with client data (replaces the three placeholder data-safety points).
5. Two or three real photos of him.
6. First group start date and places left; whether the founding price switch stays on (it is on for review).
7. VAT: registered? Are £2,497 and £297 inc or ex VAT?

The rest of the open questions are in brief section 17.

## Things a new session should know

- `site.showDraftNotes` in `src/config/site.ts` is `true`: it shows dashed "Draft" notes and marks every page noindex. Set it to `false` before go-live.
- `--subtle` was lightened from `#6B6B6B` to `#8A8A8A` to pass WCAG AA on cards.
- The headline A/B/C switch and the `?for=` swap run in the browser for now. The one-per-visitor headline split moves to a server function once Cloudflare is connected.
- Run the site locally with `npm install` then `npm run dev` (http://localhost:4321).
- Working on two computers: pull the latest from GitHub before starting, push when stopping.
