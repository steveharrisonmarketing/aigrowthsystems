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

See the v2.3 block at the top of `CLAUDE.md`. Built and ready for Steve's review, not yet approved and not pushed:

- `/free-audit` ad landing page (no menu, email opt-in, sample audit, 3 steps, FAQ).
- Home page rebuilt: audit first, 4 steps, offer cards, founder section, blog stand-in, FAQ.
- `/ai-business-setup` rebuilt as the offers page: one-to-one, five offers read from `src/config/offer.ts`.
- Buy buttons appear when a Stripe payment link is pasted into an offer's `checkoutUrl`.

The work order and the scores for each page are in `docs/REVIEW.md`. Work through that order; re-score after each round.

The old folder `~/Desktop/Claude/aigrowthsystems-site` on the Mac is a separate, older build. Work in `~/Projects/aigrowthsystems`.

## Not done yet

- Phase 1 leftovers: Higgsfield briefs for H1–H5, each shown to Steve with model and estimated credits before any generation. PageSpeed check once the site is online.
- Phases 2–7 as in the brief.

## Waiting on Steve

1. Does the look work? Changes to either page?
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
