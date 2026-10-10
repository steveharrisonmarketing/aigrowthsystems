# Review board

Each page is scored out of 10 against the same criteria after every round of changes. The target is 9 or more on every line before Steve's manual review of that page. Scores are a judgement made by reading the page as a cold visitor on desktop and phone; they are not measurements. Real conversion rates are only known once ads are running.

## Work order (agreed 10 October 2026)

1. Ad landing page (`/free-audit`) and its questionnaire
2. Home page
3. Offers page (`/ai-business-setup`)
4. Blog
5. About
6. The £297 offer: what's included, and whether each offer gets its own sales page
7. Buy buttons and payment links
8. "Book a call" links (Steve wants Calendly; the brief said Cal.com – confirm when we get there)
9. Steve's photo (Steve is working on a better one)

## Criteria

- **Accuracy:** matches the business model, offers and rules in `CLAUDE.md`. Nothing invented.
- **Cold-traffic conversion:** one clear action, obvious value, low effort, trust, no leaks.
- **SEO and AEO:** can rank in Google and be quoted by AI assistants (titles, structure, structured data, useful content).
- **Trust and legal:** privacy, cookies, terms, company details, true claims, UK consumer rules.
- **Speed and phone:** fast and easy on a phone.
- **Clarity:** plain English, simple, "we" voice.

## Round 1 – 10 October 2026

| Criterion | Landing | Home | Offers |
|---|---|---|---|
| Accuracy | 9 | 8 | 7 |
| Cold-traffic conversion | 7 | 7 | 6 |
| SEO and AEO | n/a (hidden from Google on purpose) | 6 | 6 |
| Trust and legal | 5 | 5 | 5 |
| Speed and phone | 8 | 8 | 8 |
| Clarity | 9 | 8 | 8 |

### Fixed in this round

- Landing: sample audit moved into the hero so the visitor sees what they get straight away; privacy line under the opt-in; a second button after the steps; header button jumps to the email box.
- Questionnaire page built (`/assessment`): Steve's six questions plus first name, no menu, email carried over from the opt-in.
- Structured data added: Organization on every page, FAQ on every FAQ, Service with prices on the offers page.
- `robots.txt`, `sitemap.xml` and a favicon added. Search engines stay blocked while `showDraftNotes` is on.
- Home FAQ now answers "What is the Free AI Growth Audit?" in one paragraph.
- Offers page: the standard price card now has its own button.

### What stops each score reaching 9

| Gap | Affects | Needs |
|---|---|---|
| The audit isn't connected: the questionnaire ends in a draft note | Conversion (all) | Build: server function, database, AI key (Steve: Anthropic account and spend limit) |
| No proof: no testimonials, results or real screenshot of an audit | Conversion (all) | Real audits first; then a real screenshot replaces the sample |
| Hero visual is a stand-in gradient | Conversion (landing, home) | Higgsfield brief approved by Steve, or a real screenshot |
| AI Action Session name and contents are a draft | Accuracy (offers, home) | Steve |
| Data-safety claims unconfirmed | Accuracy, trust | Steve |
| No buy buttons | Conversion (offers) | Steve: Stripe account and payment links |
| "Book your free call" goes to a stand-in | Conversion (offers, home) | Steve: Calendly account and link |
| Privacy, cookies and terms are stand-ins; no company details | Trust and legal | Draft pages (build) + Steve's legal details |
| No cookie banner or Meta pixel | Trust; ads can't be measured | Build before ads |
| Blog has no posts; About is a stand-in; no share images | SEO and AEO | Build + Steve's material |
| Speed not measured | Speed | PageSpeed test once pushed to the preview address |
| Founder photo is 200 pixels | Trust | Steve |
