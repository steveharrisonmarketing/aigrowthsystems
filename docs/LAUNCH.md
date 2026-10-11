# Launch checklist

Status key: [ ] to do · [x] done · [~] waiting on Steve. Tick items as they finish. Items marked BLOCKER must be done before the first real visitor pays or gets a result by email.

## Accounts and keys (Steve)
- [ ] BLOCKER Anthropic: spend limit set in the Console; key in Cloudflare as `ANTHROPIC_API_KEY` (and `ANTHROPIC_WORKSPACE_ID` only if Anthropic asks for it).
- [ ] BLOCKER Resend: account; domain aigrowthsystems.co.uk verified; key in Cloudflare as `RESEND_API_KEY`; `EMAIL_FROM` changed to info@aigrowthsystems.co.uk.
- [ ] BLOCKER Cloudflare Turnstile: real site key (build setting `PUBLIC_TURNSTILE_SITE_KEY`) and secret (Cloudflare secret `TURNSTILE_SECRET_KEY`). The test keys accept everything.
- [ ] BLOCKER Calendly: account; link pasted into `calendlyUrl` in `src/config/offer.ts`.
- [ ] BLOCKER Stripe: account; one payment link per paid offer pasted into each `checkoutUrl` in `src/config/offer.ts`. Decide how the £297 upgrade credit and instalments are handled (see below).
- [ ] Kit (optional at launch): account and sign-up form; then set `kitEnabled` to true in `src/config/site.ts`.

## Legal and trust (Steve, with a solicitor for the terms)
- [ ] BLOCKER Legal identity: sole trader ("AI Growth Systems is a trading name of Steve Harrison") or limited company, with a postal address on the site.
- [ ] BLOCKER Terms checked by a solicitor, and refund rules confirmed.
- [ ] BLOCKER Privacy notice: retention period confirmed; the list of services matches the ones in use.
- [ ] ICO registration checked and, if needed, paid.
- [ ] Every data-safety claim on the home page confirmed true.
- [ ] Company details in the footer.

## Website (Claude, with Steve's approval)
- [ ] BLOCKER Domain: DNS moved from GoDaddy to Cloudflare, with the mail records (MX, SPF, DKIM, DMARC) for info@ recreated first.
- [ ] BLOCKER Custom domain connected to the Worker, HTTPS on, www redirects to the bare domain.
- [ ] BLOCKER `showDraftNotes` set to false in `src/config/site.ts` (removes the draft notes and "do not index" block).
- [ ] BLOCKER End-to-end test on the live site with a real email: opt-in, questions, result, email received, booking link, payment link.
- [ ] Cloudflare free plan: confirm a long AI reply finishes on the live site (the free plan limits processing time per request). If not, decide on the paid Workers plan.
- [ ] About page: answers to the seven questions, photo.
- [ ] Blog: decide whether it launches empty or with real posts.
- [ ] PageSpeed check on mobile.
- [ ] Sitemap submitted in Google Search Console; Cloudflare Web Analytics on.

## Before paid ads
- [ ] Meta pixel and conversion events built, loading only after cookie consent. Check Meta's current rules and UK consent rules first, and get Steve's yes.
- [ ] Repository set to private on GitHub.

## Open decisions
- £297 upgrade credit: Stripe payment links cannot apply a credit automatically. Options: a Stripe coupon sent manually when someone upgrades, or invoice the upgrade net of £297.
- Instalments (3 × £897): payment links cannot easily take three separate payments. Options: a monthly subscription for three months, or offer only pay-in-full at launch.
- Cookie banner on the live site: it shows now and no marketing script loads. Confirm the wording is right before ads.
