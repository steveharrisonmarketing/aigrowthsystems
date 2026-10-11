# Progress – AI Growth Systems website

Last updated: 11 October 2026. Plain-English summary of where things stand. No keys or secrets are kept in this file.

## Done

- **Fix 1 – audit security (PR #1, branch `fix/audit-security`):**
  - Typing someone's email no longer shows their audit. Only the visitor who made an audit gets its private link.
  - The spam check (Cloudflare Turnstile) is required and refuses the form if it can't check.
  - Each audit can run the paid AI at most 3 times.
  - Rate limits: 5 audits per connection per hour, 3 per email per day, and a cap on result-page checks.
  - The result page only says "we've emailed you" when the email really went.
  - The spam check resets after a failed submit, so answers aren't lost.
- **Fix 3 – launch clean-up (PR #2, branch `fix/launch-cleanup`, stacks on #1):**
  - Page addresses have no trailing slash everywhere (links, canonicals, sitemap), so no link redirects.
  - Old saved audits no longer show the sample "first week" steps as theirs.
  - The footer Newsletter section only shows once Kit is connected.
  - The example blog post and the made-up sample beside "What you get" on the home page are removed.
- **Steve's answers, applied on PR #2:**
  - Skool link kept as it is.
  - The sample audit on /free-audit is labelled "Sample audit — example only".
  - Legal identity shown as "Stephen Harrison trading as AI Growth Systems", with a note that sole-trader status still needs Steve's confirmation.
  - The law of England and Wales is confirmed in the terms.

## In progress – Fix 2 (Cloudflare)

- **Database:** migration `0002_security.sql` (adds only a column and a table, removes nothing) has been applied to the live database.
- **Spam check:** a free Turnstile widget (managed mode) was created for aigrowthsystems.co.uk, www.aigrowthsystems.co.uk and the workers.dev addresses, including preview addresses.
  - The public site key is the default in `src/pages/assessment.astro`.
  - The secret copy is stored safely off the repo.
  - **The secret is not yet set on the Worker.** Setting it now would make the audit form on the current `main` preview refuse every submission, because that build has no spam-check widget. Set it when PR #1 is merged and built.
- **Branch preview builds:** these fail in Cloudflare Workers Builds.
  - The KV storage id is now pinned in `wrangler.jsonc`, which fixed the upload step when it was run from the box.
  - Branch builds in Cloudflare still fail. The cause can't be seen yet: reading build logs needs the API token permission "Workers Builds Configuration: Read" (or a look at the build log in the dashboard).
- **Working preview of PR #2,** uploaded by hand (not live traffic): https://fix-launch-cleanup-aigrowthsystems.steveharrisonmarketing.workers.dev

## Waiting on Steve

1. Confirm sole-trader status.
2. Postal address (footer, privacy, terms).
3. ICO registration number.
4. Privacy: which services are actually used, and how long data is kept (24 months is only a suggestion).
5. Terms: approve the refund rules, and have an accountant check instalment pricing against consumer-credit rules.
6. Cookies: the Meta pixel (not installed yet).
7. Stripe payment links for each offer (no Stripe account yet).
8. Booking link (Calendly or Cal.com).
9. Sender email: verify the domain with Resend so emails come from aigrowthsystems.co.uk.
10. Approve the draft wording (offers, founder section, About, comparison, FAQ) and send a larger founder photo.
11. Kit account and key, for the newsletter and "register interest" forms.
12. Resend and Anthropic API keys added as Cloudflare secrets.

## Next steps

- Merge order: PR #1 into `work`, then PR #2, then `work` into `main` once Steve says yes.
- After PR #1 is built: set the Turnstile secret on the Worker and test one audit on a preview.
- Find and fix the cause of the branch-build failures (needs build-log access).
- **Rules:** never push to `main` without Steve's explicit yes. No change to noindex (`showDraftNotes`) or DNS without Steve's explicit approval.
