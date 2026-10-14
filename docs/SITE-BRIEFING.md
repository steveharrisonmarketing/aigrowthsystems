# AI Growth Systems website – site briefing

Snapshot of what the site contains, for use as background in other projects. Written 14 October 2026 from the branch `fix/launch-cleanup`. Prices and offers come from `src/config/offer.ts`; if they change there, this briefing is out of date.

## The business and the funnel

AI Growth Systems helps UK business owners put AI to work in their business. It is run by Stephen (Steve) Harrison as a sole trader, trading as AI Growth Systems. Contact: info@aigrowthsystems.co.uk. Domain: aigrowthsystems.co.uk.

The site has one main job: turn cold traffic from Facebook ads into free audits.

**Funnel:** Facebook ad → ad landing page (`/free-audit`) → email opt-in → 1–2 minute questionnaire → instant AI audit on screen and by email → offer of the £297 AI Growth Plan Call (and a free 30-minute call). Steve follows up qualified leads by hand with a deeper audit.

**Ladder:** Audit (free) → Plan (£297 call) → Setup (£2,497, done for you).

**Audience:** broad, all UK businesses. No industry-specific wording.

## How the site talks

- Always "we", never "I". Steve is named only in the founder section, in the third person.
- Plain English, UK spelling, short sentences.
- No income claims and no money figures. Benefits are shown as time saved, in hours, labelled as estimates.
- No fake urgency, countdowns or scarcity. Founding places and capacity numbers only appear when real numbers are entered.
- It is AI set up in the business with coaching to use it. Never described as a course.

## Pages

| Page | Address | Purpose | Menu |
|---|---|---|---|
| Ad landing page | `/free-audit` | Only the free audit. Nothing about paid offers. Hidden from Google | No menu |
| Home | `/` | Free audit first, then a route to the paid offers | Yes |
| Audit questions | `/assessment` | The questionnaire | No menu |
| Audit result | `/assessment/result?id=…` | The visitor's own audit, then the Plan Call offer. Private, hidden from Google | No menu |
| Offers | `/ai-business-setup` | All paid offers | Yes |
| Blog | `/blog` | Real builds and guides. Currently has no posts | Yes |
| About | `/about` | The business and its founder. Draft, waiting on Steve's answers | Yes |
| Book a call | `/book` | Stand-in until the Calendly link is added | Yes |
| Privacy, Cookies, Terms | `/privacy`, `/cookies`, `/terms` | Legal pages, drafts with gaps marked | Yes |

Menu: AI Business Setup · Blog · About · [Free AI Growth Audit] gold button.

## Ad landing page (`/free-audit`)

1. **Hero:** headline "Find out where AI grows your business. Free, in minutes." Subheadline "Answer a few quick questions & get your AI score and action report on screen in minutes." Email box and button "Get my free AI Growth Audit". Small print "Free. About 2 minutes. UK businesses." with a privacy link. A clearly labelled sample audit sits beside it.
2. **What you get:** your AI score, your top 3 quick wins, where to start.
3. **How it works, 3 steps:** enter your email; answer a few quick questions (about 2 minutes); get your audit on screen and by email.
4. **Why take it:** "You know AI could help. You don't know where to start." Built from your answers; plain English; specific tools and first steps.
5. **FAQ:** Is it really free? What's the catch? How long does it take? Do I need to be technical? Do I need a website? What happens to my information?
6. **Final call to action:** "Find your first AI quick win." with the email box again.

Two other headlines are stored for a future split test: "See where AI could save you hours every week." and "Your business, scored for AI. Top 3 quick wins on screen in minutes."

## Home page (`/`)

1. Hero: same headline, subheadline and email box as the landing page.
2. What you get.
3. How it works: "Audit. Plan. Setup." Free AI Growth Audit → AI Growth Plan Call → AI Business Setup.
4. Work with us: "Want help putting it in place?" Two cards only: AI Growth Plan Call (£297, "We show you how") first, AI Business Setup (£2,497, "We do it for you") beside it. "Not sure which? Start with the free audit."
5. Founder section (see below).
6. Latest blog posts (hidden while there are none).
7. FAQ: What is the Free AI Growth Audit? Is the audit really free? How long does it take? Do I need to be technical? What happens after the audit? What does it cost to work with you? What happens to my information?
8. Final call to action with the email box.

Testimonials and "what we're seeing in audits" are built but hidden until real ones exist.

## Founder section

Heading: "AI that grows the business, not automations for their own sake." AI Growth Systems was founded by Steve Harrison, with more than 10 years in marketing (Google Ads, Facebook Ads, websites that convert, email and SMS follow-up), who now puts AI to work inside businesses. The point: plenty of people can build an automation; far fewer know which ones help a business grow. We start with how you win and keep customers, then set up the AI that supports it. Uses a real photo of Steve (a larger one is to come).

## The Free AI Growth Audit

**Opt-in:** email only.

**Questionnaire (about 2 minutes):** first name; email; website (optional); team size (Just me / 2–5 / 6–20 / 20+); what tasks take the most time (free text); have you used AI tools before (Not yet / A little / Regularly); biggest challenge right now (buttons); anything else (optional); optional tick box for occasional marketing emails.

**What the audit contains:**
- What we understood about the business.
- What it already does well (2–3 strengths).
- An AI score out of 100, made of five areas scored 0–20: enquiries and sales; repetitive admin; follow-up and repeat business; marketing and content; AI use today (less use means more opportunity). Each area has a one-line reason and a bar.
- Estimated hours a week back (total of the three wins).
- Top 3 quick wins, each with: what we saw (evidence), what the tool does in plain English, what happens now, what it looks like with AI, the tool to use, which part of the business it helps (e.g. new customers), effort to set up, and estimated hours saved with the reasoning.
- One worked example made for the business: a realistic customer message and the reply an AI assistant would draft.
- Where to start this week: three small steps, each under an hour.
- What the audit is based on, how confident it is, and what we couldn't check.
- A "Save as PDF" button.
- Then the next step: the AI Growth Plan Call offer, with a link to AI Business Setup.

**How it is made:** Claude (Anthropic API, model Opus 5.5 at medium effort) reads up to 4 pages of the visitor's website and runs up to 2 web searches, then writes the audit. It takes about 1 minute and costs roughly $0.45–$0.80 per audit. Results are saved in a Cloudflare D1 database and emailed to the visitor (Resend). A note with the lead's answers and score is emailed to info@.

**Protection:** spam check (Cloudflare Turnstile), rate limits per connection and per email, at most 3 paid AI runs per audit, and only the person who made an audit gets its private link. Anthropic spend limit planned at about £20 a week.

## Paid offers

All one-to-one, start any week. No groups at launch. Every price is a test.

| Offer | Price | What's included | How it's bought | Where shown |
|---|---|---|---|---|
| **AI Growth Plan Call** | £297 one-off | 2-hour one-to-one video call; what the audit found and how to act on each quick win; a written action plan afterwards; a recording of the call | Buy online | Home, offers page, audit result |
| **AI Business Setup** (main offer) | £2,497, or 3 × £897 (£2,691 total). Founding client price £1,997 for the first 5 clients, in return for sharing their results | See below | Buy online or book a free call | Home, offers page |
| **AI Quick Start** | £997 | 1 automation built for you; your business brain set up; 2 × 45-minute one-to-one coaching calls | Buy online or book a free call | Offers page only |
| **AI Partner** | £297 a month, cancel any time | Monitoring and fixes for your automations; a monthly 45-minute one-to-one call; coaching to build one new AI agent a month; message support; new templates | Book a call ("Ask about AI Partner on your free call"). For clients who finished Setup or Quick Start | Offers page only |
| **AI Starter Kit** | No price yet | Templates, a business brain template, recorded setup guides | Coming soon | Offers page only |

**Plan Call credit:** upgrade to AI Business Setup or AI Quick Start within 30 days of the call and the full £297 comes off the price. It also applies with the founding client price.

### AI Business Setup in detail

"AI set up in your business in 6 weeks. We build it for you, then coach you one-to-one to use it."

- **For:** UK owner-run businesses with 2–20 staff, new to AI. **Not for:** businesses already using AI at an advanced level.
- **Done for you:** 90-minute one-to-one setup session; business AI workspace with data-safety settings on; a "business brain" document (services, prices, tone, common questions); 3 custom assistants (customer replies, marketing, quotes from voice notes); 1 automation built and live (default: instant replies to enquiries, a follow-up, and a text back when you miss a call); a one-page staff AI policy.
- **Done with you:** 6 weekly 60-minute one-to-one calls. Week 1 AI workspace and business brain; week 2 enquiries and follow-up; week 3 marketing; week 4 admin; week 5 your team; week 6 results and next 90 days. Plus recordings, templates and message support between calls.
- **How we measure your return:** time baseline in week 1, measured again in week 6, and a one-page Return Report in hours.
- **Time needed from the client:** about 1–2 hours a week.
- **Guarantee, word for word:** "Your first AI system is live by week 3, or we keep working free until it is. If by week 6 you're not using AI every week in at least 3 tasks, we'll keep coaching you one-to-one until you are."
- **AI Quick Start guarantee:** "Live within 14 days, or we keep working free until it is."
- Guarantees cover delivery and use, never extra enquiries, sales or income.

### Offers page order (`/ai-business-setup`)

Hero → who it's for / not for → the problem → comparison (learn it yourself / AI agency / AI Business Setup) → done for you → done with you (6-week table) → how we measure your return → guarantee → price and payment options (founding client price when switched on) → "Not ready for 6 weeks? Start smaller." (AI Growth Plan Call first, then AI Quick Start) → AI Partner → AI Starter Kit (coming soon) → founder section → FAQ → "See what we'd set up first." with "Book your free call".

Offers page FAQ: What happens on the free call? I'm not technical – is that OK? How much of my time does it take each week? Is my business data safe? I took the AI Growth Plan Call – do I pay full price? Can I start straight away? What happens after 6 weeks? What if it doesn't work for my business?

## Legal and trust

- Footer: "Stephen Harrison trading as AI Growth Systems." Postal address still needed.
- Privacy notice, cookies page and terms are drafts. The terms cover: business customers only; prices and payment; Plan Call credit; founding client price; guarantees; refunds (move a call with 24 hours' notice; Plan Call refundable up to 48 hours before; Setup and Quick Start refundable within 7 days if the setup session hasn't happened; instalments stay due; AI Partner cancel any time, no part-month refunds); no guaranteed results; liability capped at the fees paid in the last 12 months; law of England and Wales. Not VAT-registered, so no VAT is added.
- Cookie banner with Accept / Reject / Settings at equal size. No marketing scripts are installed yet; the Meta pixel will only load after Accept.

## Not live yet / still to do

- The new site is on the preview address only; aigrowthsystems.co.uk still shows the old Lovable site.
- Not yet connected: Stripe payment links (so every button says "Book your free call"), Calendly, Resend (emails), the live Anthropic key, the live spam-check secret, Kit (newsletter and "register interest" forms are hidden until then), the Meta pixel.
- Draft notes and "do not index" are on until launch.
- Waiting on Steve: postal address, sole-trader confirmation, ICO check, approval of draft wording, a larger photo, About page answers, a solicitor's check of the terms.
- Open decisions: how the £297 credit is applied in Stripe; whether instalments are offered at launch.
