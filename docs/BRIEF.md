# Brief – AI Growth Systems Website Build

**Version:** 2.2
**Date:** 10 October 2026
**Owner:** Steve Harrison, AI Growth Systems (aigrowthsystems.co.uk)
**Built with:** Claude Code
**Replaces:** v2.1 (9 October 2026)
**Status:** for Steve's review

---

## 0. Read this first (instructions for Claude Code)

Steve has **never built a website in code before**. He runs the business part-time (10–20 hours a week). Work with him like this:

- **Explain in plain English.** Before each step, say what you're about to do and why in one or two sentences. Explain any technical word the first time you use it.
- **One phase at a time.** Build the phases in section 15 in order. At the end of each phase:
  - show Steve what was built and how to look at it;
  - **stop and wait for his approval** before starting the next phase.
- **Use plan mode for big steps.** Show the plan, get a yes, then build.
- **Save progress constantly.** Commit to git after every working change with a clear message, so anything can be undone.
- **Keep secrets out of the code.**
  - API keys go in `.env` (local, never saved to git) and Cloudflare secrets (live site).
  - Tell Steve exactly where to paste each key.
  - Never print a key back in chat.
- **Ask before anything that costs money:** paid plans, paid APIs, upgrades, and **every Higgsfield generation** (credits). The budget for this build is not the constraint. Steve still approves every spend, and the finished site must be runnable by one person part-time.
- **Verify before stating.** Any present-day fact (prices, plan limits, API details, tool features) must be checked against the official docs or pricing page at the time, not assumed. Items marked *(verify)* were not confirmed when this brief was written.
- **UK English** throughout the site and all copy.
- **First task:** create `CLAUDE.md` in the project root, capturing the rules in sections 0, 4, 6, 9 and 16, so they apply in every future session. Keep this brief in the repo as `docs/BRIEF.md`.
- **Open questions** for Steve are listed in section 17. Ask each one at the phase where it's needed, not all at once.

---

## 1. What we're building

A premium, dark, AI-quality website with **three main pages** and one job: **get small business owners to take the Free AI Growth Audit, then book a free 30-minute call that leads to AI Business Setup.**

**The funnel:** Facebook ad → Free AI Growth Audit (instant score + top 3 quick wins, then Steve's reviewed audit) → free 30-minute call → AI Business Setup (6 weeks, done-for-you + coaching) → AI Partner (optional, monthly).

| Page | Job |
|---|---|
| **Home** (`/`) | One action: start the Free AI Growth Audit. Second action: see how AI Business Setup works |
| **AI Business Setup** (`/ai-business-setup`) | Sells the 6-week AI Business Setup and the AI Partner plan. One action: book the free call |
| **Blog** (`/blog`) | Daily articles and videos showing real AI builds. Builds search traffic and audience |

Everything else on the site (sections 5 and 7) is a supporting page these three need: the audit flow, call booking, an author page, legal pages.

**Naming:** the free assessment is called the **"Free AI Growth Audit"** everywhere a visitor sees it (buttons, labels, emails). Where this brief says "free assessment" or "free AI assessment", it means the Free AI Growth Audit. The page addresses stay `/assessment` and `/assessment/result/[id]`.

**Success is measured by:**

1. Free audits started
2. Free audits completed
3. Free calls booked
4. AI Business Setup enquiries or sales

Every page and every test is judged against these numbers (section 13).

---

## 2. The business (context for all copy)

- **AI Growth Systems** helps businesses use AI to make more money.
- **It is consulting, not training.** Revenue comes from:
  - AI Business Setup: a 6-week programme of done-for-you set-up plus group coaching, at a fixed price;
  - AI Partner: an optional monthly plan, cancel any time.

  Stand-alone courses and general AI training are not sold. AI Business Setup is AI set up in the business, with coaching to use it; never describe it as a course.
- **Two lines of work:**
  - AI agents and automations that take over repetitive work;
  - AI-powered marketing that brings in more customers (ads, website conversion, follow-up, speed to lead).
- **Everything shown is something Steve actually does.** Content shows real builds in his own business and client work, never generic AI tutorials.
- **Audience now:** broad. Small and local UK businesses. It narrows later when the data shows who buys. Do not invent an ideal customer.
- **Prices shown on the site are tests.**
  - £2,497 (AI Business Setup; founding group £1,997) and £297/month (AI Partner) are the first test prices.
  - Prices can change based on the data. They live in one settings file (section 10.3).
  - Never use "price going up", countdowns or fake scarcity.
  - Never promise more enquiries, sales or income.
- **Skool group:** URL is `skool.com/we-teach-marketing-5052`. Its name has changed several times, so **confirm the current name with Steve before writing it anywhere.** On the site, call it "free AI group". It appears in the footer and on the thank-you page only.

---

## 3. What we're borrowing from the reference sites

Steve asked for the site to be modelled on Acquisition.com, with the design quality of Higgsfield and The Real World, plus the best ideas from the UK competitor research ("Research - UK AI Competitor Analysis" v1.0, 9 Oct 2026).

| Source | Borrow | Do not copy |
|---|---|---|
| **Acquisition.com** | Very simple home page: one big question as the headline, one button, then a few stacked sections. Repeat the same main button through the page. Clear product cards with one button each. Short FAQ. Founder section | Big unverifiable numbers (we have none yet). Long legal disclaimer blocks as decoration |
| **Higgsfield** (affiliate page) | Near-black background. Sharp uppercase headlines with tight letter spacing (Space Grotesk). Small pill "eyebrow" labels above each heading ("How it works"). Dark rounded cards with soft borders. An **interactive calculator** with sliders. Big glowing numbers. Full-bleed hero image inside a rounded frame | Projecting money the visitor will *earn*. Our calculator shows what repetitive work currently *costs*, from the visitor's own numbers |
| **The Real World** | Cinematic video thumbnails with play buttons. Warm gradient gold pill buttons. Icon-pill section labels. Strong contrast between headline and muted body text | "98% sold out" scarcity, fake "someone just bought" pop-ups, countdowns, income claims, fear headlines ("Imminent AI takeover"). All are banned here, and fake urgency and fake reviews are illegal for UK businesses under the Digital Markets, Competition and Consumers Act 2024 |
| **All Sorted AI** (competitor) | Instant free result. A clearly labelled sample report. A public price with a guarantee. A "Why I built this" founder story. A "What I'm seeing in audits" section. Industry guide articles | An "As featured on" strip made of directory listings |
| **AI Expert / We Call Shotgun** (competitors) | Assessment in minutes with a score. A free online tool as a second way in | Generic fear headlines ("you're behind your competitors") |

**The gap we own:** none of the 10 competitors shows real AI builds on video. Build-log videos are the centrepiece of the blog and appear on the home page.

---

## 4. Tech stack

| Job | Tool | Why | Cost |
|---|---|---|---|
| Site framework | **Astro** + **Tailwind CSS** | Builds plain, very fast pages (good for Google). Content is simple Markdown files that Claude Code can write and edit at volume. Interactive parts (calculator, form, result page) load as small "islands" of JavaScript, only where needed | Free |
| Animation | **CSS animations** first; **Motion** (motion.dev) only where CSS can't do it *(verify current package name)* | Smooth, premium feel without slowing the site | Free |
| Code storage & history | **GitHub** (private repo) | Every change saved and reversible. Pushes trigger deploys | Free |
| Hosting | **Cloudflare** (use Cloudflare's current recommended way to host Astro with server functions: Workers with static assets or Pages; *verify which*) | Fast, includes server functions, database, spam protection and analytics in one provider | Free plan *(verify limits)* |
| Database | **Cloudflare D1** | Stores assessment submissions, results, report drafts, bookings, register-interest sign-ups, events | Free tier |
| Spam protection | **Cloudflare Turnstile** | Stops bots using the assessment (each one costs API money) | Free |
| AI for results and reports | **Anthropic API** (current Sonnet model, with web search and web fetch tools) | Researches the business, writes the instant result and the full audit draft | Pay per use (section 14) |
| Email list | **Kit** | Steve's choice. Automated sequences need a paid plan *(verify current price)* | Free to start |
| Sending emails from the site | **Resend** | Result emails to visitors, notifications to Steve *(verify free-plan limits)* | Free to start |
| Payments | **Stripe invoices**, sent by Steve after the discovery call | No online checkout and no Stripe webhook for now. Buttons take their destination from the one settings file (section 10.3), so online payment can be added later with a small change *(verify UK invoice fees)* | Per paid invoice |
| Booking calls | **Cal.com** free plan, connected to Steve's Google Calendar *(recommended; confirm on Cal.com's and Google's own docs at the start of Phase 3)*. Alternative: **Google Workspace appointment schedule** | An embedded calendar on the result page and `/ai-business-setup`. Cal.com can tell the site the moment a call is booked, which the Kit tag and the email to Steve depend on. No direct way was found for a Google appointment schedule to do that | Free *(verify)* |
| Business mailbox | **info@aigrowthsystems.co.uk** on Google Workspace Business Starter *(verify UK price)* | Real mailbox, calendar, booking page | Paid |
| Analytics | **Cloudflare Web Analytics** + **Google Search Console** + our own D1 event log | Cloudflare analytics needs no cookies. The Meta pixel does, so the site has a cookie consent banner (section 19) *(verify API access on free plan)* | Free |
| Ad tracking | **Meta pixel** + **Meta Conversions API**, both only after cookie consent (section 19) *(verify Meta's current docs and UK consent rules before building)* | Tells Facebook which ads lead to completed audits and booked calls | Free; ad spend is separate |
| Site search | **Pagefind** | Search box across blog posts | Free |
| Video hosting | **YouTube** (blog videos, click-to-load embed via youtube-nocookie) + **Cloudflare Stream** or self-hosted MP4/WebM for short silent hero loops *(verify Stream pricing; self-hosted is fine if under ~3 MB)* | Free hosting and YouTube ranking for long videos. Fast, ad-free loops for the design | Free / low |
| Client recordings and templates | *Not decided (section 17).* Options: a private **Skool** area, or unlisted YouTube + a shared Google Drive folder | Where AI Business Setup clients find call recordings and templates | Skool: Hobby $9/month or Pro $99/month (skool.com/pricing, checked 10 Oct 2026). YouTube + Drive: included |
| Visual assets | **Higgsfield** (connected to Claude) | Cinematic hero loop, section images, blog and video thumbnails | Paid credits. **Steve approves every brief and prompt before generation** |

**Domain:** registered at GoDaddy. At go-live, move the DNS to Cloudflare by changing the nameservers at GoDaddy; the domain stays registered at GoDaddy. **Recreate the email records (MX, SPF, DKIM, DMARC) for info@ in Cloudflare before switching**, or email will break.

---

## 5. Site map

```
/                              Home – Free AI Growth Audit + AI Business Setup
/assessment                    Free AI Growth Audit – short multi-step form
/assessment/result/[id]        Instant result + book a free call (private link, not indexed)
/ai-business-setup             AI Business Setup sales page (for ads, emails and the nav)
/ai-integration                Hidden – redirects to /ai-business-setup
/programmes                    Hidden – redirects to /ai-business-setup
/programmes/[slug]             Hidden – redirects to /ai-business-setup
/full-assessment               Hidden – redirects to /ai-business-setup
/blog                          All posts (filter by category, search)
/blog/category/[category]      Category hub pages
/blog/[slug]                   Post page (article, or article + video)
/about                         Steve – short author page (needed for trust and Google)
/privacy  /cookies  /terms  /404
/sitemap.xml  /robots.txt  /rss.xml
```

**Main navigation:**

- AI Business Setup · Blog · **[Free AI Growth Audit]** (gold button, sticky)
- On mobile: the logo plus the gold button always visible; everything else in a menu.

**Footer:**

- AI Business Setup, Blog, About
- Free AI group (Skool link)
- Newsletter sign-up
- info@ email
- Privacy, Cookies, Terms, Cookie settings (reopens the consent banner; section 19)
- Company details (ask Steve: legal name, company number if a limited company, registered address)

**Removed from v1.0:**

- the `/tools` directory, `/videos`, `/start-here` and `/community` pages;
- the digital products page.

Videos live inside blog posts. Tools are covered in blog posts ("Tool reviews" category). This keeps the site to three main pages.

---

## 6. Design system

**Direction:** dark, cinematic and premium, with the look of a top-tier AI product. Base it on Higgsfield's dark product style, add The Real World's gold buttons and cinematic video thumbnails, and lay it out with Acquisition.com's simplicity: one idea per section and lots of space.

### 6.1 Colour tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0B0B0D` | Page background |
| `--bg-raised` | `#131417` | Alternate section background |
| `--card` | `#17181C` | Cards, panels |
| `--card-hover` | `#1E1F24` | Card hover, inputs |
| `--border` | `rgba(255,255,255,0.08)` | 1px card and input borders |
| `--text` | `#F5F5F4` | Headlines and main text |
| `--muted` | `#A3A3A3` | Body text under headlines |
| `--subtle` | `#6B6B6B` | Small print, captions |
| `--gold` | `#E3B341` | Primary accent, links, highlights |
| `--gold-light` | `#F6D27A` | Gradient top, hover |
| `--gold-dark` | `#B8861B` | Gradient bottom, pressed |
| `--gold-gradient` | `linear-gradient(180deg, #F6D27A 0%, #E3B341 55%, #B8861B 100%)` | Primary buttons, big numbers |
| `--gold-glow` | `0 0 32px rgba(227,179,65,0.35)` | Button glow; `0 0 48px rgba(227,179,65,0.5)` on hover |
| `--success` | `#22C55E` | Form success |
| `--error` | `#EF4444` | Form errors |

All text must pass WCAG AA contrast (the readability standard). Check `--muted` and `--subtle` on `--card`, and adjust lighter if they fail.

### 6.2 Type

- **Headlines:** Space Grotesk 700, **uppercase**, letter-spacing −0.04em, line-height 1.0–1.05.
  - H1: 64–80px desktop, 40–44px mobile.
  - H2: 40–48px desktop, 30–32px mobile.
- **Body:** Inter 400/500/600, 17–18px, line-height 1.65, colour `--muted`. Blog text: Inter 18px, max width ~720px, colour `--text` at 90%.
- **Big numbers** (calculator, score): Space Grotesk 700, 72–96px, filled with `--gold-gradient` via background-clip.
- Self-host both fonts via Fontsource (no calls to Google Fonts).

### 6.3 Components

- **Eyebrow pill:** small label above every H2, for example "How it works", "Your result", "What's included".
  - Style: 12px Inter 600, gold text on `rgba(227,179,65,0.10)`, 1px gold border at 30%, fully rounded, padding 4px 10px.
- **Primary button:**
  - Style: `--gold-gradient` background, `#0B0B0D` text, Inter 600 16–18px, fully rounded (pill), padding 16px 28px, `--gold-glow`.
  - Hover: brighter glow and 1px lift.
  - Must be at least 48px tall on mobile.
- **Secondary button:** transparent background, 1px `--border`, white text, pill. Hover: border turns gold.
- **Cards:** `--card`, 1px `--border`, 20px radius, 24–32px padding. Optional subtle top highlight (1px white at 6%).
- **Video card** (from The Real World):
  - 16:9 cinematic thumbnail, 16px radius, centred white circular play button, title underneath;
  - clicking loads the YouTube embed (nothing loads from YouTube until the click).
- **Section rhythm:**
  - 120–160px vertical padding desktop, 72–96px mobile;
  - alternate `--bg` and `--bg-raised`;
  - thin gold gradient divider lines are allowed sparingly.
- **Hero frame** (from Higgsfield): the hero video sits inside a rounded (24px) frame with a dark gradient over it so white text stays readable.

### 6.4 Motion

- Sections fade and rise 16px into view as they scroll in (once only).
- Numbers count up when visible.
- Button glow pulses gently on the hero button only.
- **Respect `prefers-reduced-motion`:** turn all animation off for visitors who have asked their device for less motion.
- No scroll-jacking, no parallax that slows phones.

### 6.5 Logo, imagery and share images

- **Logo:** none yet. Use a text wordmark "AI GROWTH SYSTEMS" in Space Grotesk 700, with "GROWTH" in `--gold-gradient`, until Steve supplies one.
- **Photos of Steve:** real photos only. Ask Steve for 2–3 (section 17).
- **Share images:** auto-generate an Open Graph image (the picture shown when a link is shared on social media) for every page. Spec: `#0B0B0D` background, gold eyebrow pill, page title in Space Grotesk uppercase, wordmark bottom left, 1200 × 630.

### 6.6 Performance rules (premium look must stay fast)

- Hero video: under 3 MB, muted, looping, `playsinline`, with a poster image. On mobile, show only the poster image if the visitor's data saver is on.
- All images through Astro's image component (WebP/AVIF, correct sizes).
- JavaScript only on the calculator, forms, result page and video cards.
- Target good Core Web Vitals (Google's page-speed scores) on mobile. Check with PageSpeed Insights at the end of each phase.

---

## 7. Page specs

### 7.1 Home (`/`)

One main action repeated: start the Free AI Growth Audit. Second action: see how AI Business Setup works. Prices, dates and places are read from the one settings file (section 10.3).

1. **Header:**
   - wordmark, nav;
   - sticky gold "Free AI Growth Audit" button.
2. **Hero:**
   - Higgsfield cinematic loop in a rounded frame (asset H1, section 8).
   - Eyebrow pill: "Free AI Growth Audit".
   - H1: one of the three options below.
   - Subheadline: "Tell us about your business. Get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve."
   - **Industry variants:** with `?for=[industry]` in the address, the subheadline swaps to name that industry (section 19.4). The default stays general.
   - **Inline form start:** website address + email + gold button "Get my free AI Growth Audit". This carries both values into `/assessment` step 2.
   - Small line under the button: "Free. UK businesses."
   - **Headline options** (A/B/C test; A is the default):
     - A: "AI SET UP IN YOUR BUSINESS IN 6 WEEKS."
     - B: "YOU DON'T NEED TO LEARN AI. YOU NEED IT SET UP FOR YOU."
     - C: "EVERY ENQUIRY YOU ANSWER LATE IS ONE A COMPETITOR CAN ANSWER FIRST."
3. **How it works:**
   - Eyebrow: "How it works".
   - H2: draft "4 STEPS. IT STARTS WITH A FREE AUDIT." (Steve to approve; section 17).
   - Four cards:
     - (1) Free AI Growth Audit – your score and top 3 quick wins in minutes.
     - (2) Free 30-minute call – Steve walks you through your audit and your setup plan.
     - (3) AI Business Setup – AI set up in your business in 6 weeks.
     - (4) AI Partner – optional monthly support that keeps it working and improving.
   - Button.
4. **Set up for you, not dumped on you** (comparison):
   - Eyebrow: "Why this is different".
   - H2: "SET UP FOR YOU, NOT DUMPED ON YOU."
   - Three columns: learn it yourself / AI agency / AI Business Setup.
   - Rows are plain descriptions (who does the set-up, whether it's built around your business, whether your team learns to use it, whether the price is fixed). Drafted for Steve to approve. No invented prices or statistics about the alternatives.
   - Link: "How AI Business Setup works" → `/ai-business-setup`.
5. **6-week overview:**
   - Eyebrow: "The 6 weeks".
   - H2: "WHAT HAPPENS IN 6 WEEKS."
   - The six weeks from section 10.1 in one compact row or table.
   - Button: "See the full plan" → `/ai-business-setup`.
6. **Guarantee:**
   - Eyebrow: "The guarantee".
   - The guarantee wording from section 10.1, word for word.
7. **AI Partner:**
   - Eyebrow: "After the 6 weeks".
   - Short summary and price from section 10.2. "Cancel any time."
8. **Calculator** (Higgsfield-style) – an enquiries calculator:
   - Eyebrow: "What it's costing you".
   - H2: draft "WHAT ARE SLOW REPLIES PUTTING AT RISK?" (Steve to approve; section 17).
   - Sliders:
     - enquiries a week you miss or reply to late (0–50);
     - average value of a job/sale (£50–£5,000).
   - Output: "value of enquiries at risk per year" in a big gold number (= enquiries × value × 48), with a small bar chart over 12 months.
   - Label under it: "An estimate from your own numbers — not a promise of results." Shown directly under the number at normal body size, never as small print.
   - Button: "Find out where you're losing enquiries".
   - **This shows a value the visitor already has at risk, from their own numbers. It never promises savings, sales or income.**
9. **Your data stays safe:**
   - H2: "YOUR CLIENT DATA STAYS YOURS."
   - Three plain points on how Steve handles business data, which tools keep data private, and UK GDPR. Steve must confirm every claim (section 17).
   - Links to the blog's data-safety posts.
   - **Why this section:** data safety was the most repeated buyer worry across the competitor research.
10. **Latest builds:**
    - Eyebrow: "Real builds".
    - H2: "WATCH WHAT I'M BUILDING."
    - The 3 latest blog posts with videos, as cinematic video cards.
    - Link: "All posts".
11. **About Steve:**
    - Real photo.
    - 3–4 sentences: who he is, his marketing agency background (Google Ads, Facebook Ads, website conversion, email and SMS follow-up), and that everything shown is from his own business and client work.
    - Link to `/about`.
    - **Never claim he has run marketing for hundreds of businesses.**
12. **What I'm seeing in audits:**
    - Hidden until Steve has completed at least 5 audits.
    - Then: 3 patterns from real audits, written by Steve, with no client names unless they've agreed.
13. **Testimonials:**
    - Build the component but keep it hidden.
    - Show only real, attributable testimonials, with permission.
    - Never invent one.
14. **FAQ.** Draft answers for Steve to approve:
    - Is it really free?
    - What do I get instantly, and what comes later?
    - How long until I get the full audit?
    - What happens on the free call?
    - What does AI Business Setup cost?
    - What if I'm not technical?
    - Is my business data safe?
15. **Final call to action band:** H2 "FIND YOUR FIRST AI QUICK WIN.", gold button.
16. **Footer** (section 5).

**Stats bar** (as on Acquisition.com): build it but keep it hidden. Turn it on only when real numbers exist (for example, "assessments completed"), pulled from D1. Never type numbers in by hand.

### 7.2 Free assessment (`/assessment`)

Multi-step form with a progress bar, mobile-first, about 2 minutes. Fewer questions mean more completions.

- **Step 1:**
  - website address;
  - email;
  - first name.
- **Step 2:**
  - business type: dropdown of ~15 common small-business types plus "Other";
  - team size: Just me / 2–5 / 6–20 / 21–50 / 50+;
  - main goal: More leads / More sales / Save time / Better follow-up / Other;
  - "How do enquiries reach you?" (tick boxes: phone, website form, email, Facebook/Instagram, Google, WhatsApp, other);
  - "How fast do you usually reply?" (within minutes / within an hour / same day / next day or later / not sure).
- **Step 3:**
  - "What eats most of your week?" (short text);
  - tools you use now (optional, tick boxes: Gmail/Outlook, WhatsApp, a CRM, Xero/QuickBooks, a booking system, social media, other);
  - consent tick box: "Send me my assessment and occasional emails" (Kit sign-up only if ticked);
  - privacy notice link.
- **Hidden fields:**
  - source page;
  - UTM parameters (tracking tags in ad links, e.g. from Facebook ads);
  - referrer;
  - timestamp.
- **Spam check:** Turnstile.
- **Limit:** one assessment per email per 30 days (protects API spend).

### 7.3 Instant result (`/assessment/result/[id]`)

On submit, the visitor goes straight to the result page. A loading screen shows progress while the AI works, with steps ticking off:

- "Reading your website…"
- "Looking at your business type…"
- "Finding quick wins…"

Target is under 60 seconds.

The page shows:

1. **AI Opportunity Score** (0–100):
   - big gold number with a circular gauge;
   - one-line meaning: "Lots of room for AI to help" / "Some clear opportunities" / "Already using AI well".
2. **Your top 3 quick wins.** One of the three always assesses enquiry handling (section 9.1). Each one has:
   - the problem in plain words;
   - the AI fix, naming a tool type or real tool;
   - effort to set up (Low / Medium / High);
   - a rough time saving, **labelled "estimate"**, with the reasoning in one line.
3. **What happens next:** "Steve will review your business and email your full audit within [X working days]." (X to confirm.)
4. **"Your AI setup plan"** – the page finishes with this, tailored to their answers (section 9.1):
   - the first automation Steve would build (default: the Enquiry Responder);
   - the 3 assistants: customer replies, marketing, and quotes from voice notes, each with one line on how it would be used in this business.
5. **Book the call:**
   - Main button: "Book your free call" → the embedded booking calendar (section 4).
   - Under the button: "Steve will walk you through your full audit and your AI setup plan. No obligation."
   - Link: "See how AI Business Setup works" → `/ai-business-setup`.
6. **Secondary:** a link to the free AI group.

**After booking:**

- a confirmation screen, plus a confirmation email to the visitor;
- Kit tag `call-booked`;
- an email to Steve with the booking details and the audit result attached;
- the booking saved in D1 with `utm_source`, `utm_campaign` and `utm_content`;
- event `call_booked` (and Meta "CallBooked" if the visitor consented; section 19).

**Also:**

- The same result is emailed to the visitor (Resend) with a link back to this page.
- The page is private: not indexed by search engines, with a long random ID in the address.
- There is no online payment on the site for now. Steve invoices clients by Stripe invoice after the call.

### 7.4 AI Business Setup (`/ai-business-setup`)

The sales page for ads, emails and the nav. Same design system. It replaces `/ai-integration` from v2.1. Every price, date and number of places is read from the one settings file (section 10.3).

Sections:

1. **Hero:** "AI SET UP IN YOUR BUSINESS IN 6 WEEKS"
2. **Who it's for:** UK owner-run service businesses, 2–20 staff
3. **The problem.** One line here changes for industry landing variants (section 19.4)
4. **Comparison table:** learn it yourself / AI agency / AI Business Setup. Plain descriptions drafted for Steve to approve; no invented prices or statistics about the alternatives
5. **Done for you** list (section 10.1)
6. **6-week table** (section 10.1)
7. **Price + payment options** (section 10.1). Both totals are shown plainly: pay in full, or the instalment total. The founding group price shows only when the founding switch is on, with its honest label
8. **Guarantee** (section 10.1), word for word
9. **Next group start date + places left** – from the settings file. **Real numbers only, never fake.** If either is blank, this block hides itself
10. **AI Partner** (section 10.2)
11. **About Steve**
12. **FAQ:**
    - What happens on the call?
    - What if I'm not technical?
    - Is my data safe?
    - How much time does it take me each week?
    - What happens after 6 weeks?
13. **Button "Book your free call"** (the same booking calendar as the result page)

**Tracking:** event `setup_page_view` when the page is viewed. Event `founding_interest` when a visitor clicks "Book your free call" from the founding group price block.

**Never promise income, enquiries or results** anywhere on this page.

### 7.5 Programmes (`/programmes`) – hidden

There is no Programmes page in v2.2. `/programmes`, `/programmes/[slug]`, `/ai-integration` and `/full-assessment` redirect to `/ai-business-setup` (section 5). None of these pages was built, so nothing was deleted.

### 7.6 Blog (`/blog`)

- Grid of post cards with category filter and search (Pagefind).
- Video posts show the cinematic video card; text posts show a generated cover image.
- Featured post at the top.
- Categories (starting set; Steve can change):
  - Build Logs
  - AI Automations & Agents
  - AI Marketing
  - Industry Guides
  - AI & Data Safety
  - Tool Reviews

**Post page:**

- title, date, updated date, reading time, author (Steve, linked to `/about`);
- YouTube video at the top if there is one;
- contents list for long posts;
- free assessment box mid-way and at the end;
- newsletter box (secondary);
- 3 related posts;
- breadcrumbs.

### 7.7 About (`/about`)

A short page for trust and Google's author signals:

- real photo;
- Steve's background;
- how he works;
- what he's building now;
- links to YouTube and LinkedIn.

Interview Steve with 5–8 questions to write it.

---

## 8. Visual assets (Higgsfield)

**Rule:** before any generation, show Steve the brief, the prompt, the model and the estimated credits, and wait for his yes. Image models make visuals only; all text is added in code afterwards.

| ID | Asset | Size | Draft prompt (for Steve to approve) |
|---|---|---|---|
| H1 | Home hero loop, 6–8 s, seamless, silent | 1920 × 1080 (16:9) master, cropped to 1080 × 1350 for mobile | Cinematic slow dolly shot across a small UK business workspace at dusk: a laptop on a wooden desk, soft screen glow, abstract streams of warm gold light (#E3B341 to #F6D27A) flowing from the laptop into the room like data. Near-black background (#0B0B0D), shallow depth of field, anamorphic lens look, subtle film grain, moody low-key lighting, no people's faces, no readable text or logos. Keep the left 50% darker for headline text |
| H2 | "How it works" card visuals ×3 | 800 × 600 | Same palette and lighting as H1. (1) A hand typing on a laptop, gold rim light. (2) A glowing gold circular gauge floating above a desk. (3) An email arriving on a phone screen, gold glow, no readable text. Dark background #0B0B0D, soft 35% bloom, no logos |
| H3 | AI Business Setup section visual | 1200 × 900 | A tidy small-business desk at dusk seen from above: a laptop, a phone and a notebook, joined by thin streams of gold light as if being wired together, no people's faces, no readable text or logos, shallow depth of field, #0B0B0D background, warm gold highlights #E3B341 |
| H4 | Data-safety section visual | 1200 × 900 | A softly glowing gold padlock made of light lines over an abstract dark network, #0B0B0D background, gold #E3B341 lines, subtle blue-grey secondary light at 10%, cinematic, minimal |
| H5 | Video thumbnail template background | 1280 × 720 | Dark cinematic gradient, #0B0B0D to #17181C, gold light leak from the right edge, space on the left two-thirds for Steve's cut-out photo and up to 4 words added in code |
| H6 | Parked in v2.2 (was programme card images; the Programmes page is hidden) | – | – |

**Style rules for every asset:**

- palette `#0B0B0D` / `#17181C` / `#E3B341` / `#F6D27A`;
- warm key light, cinematic;
- no fake people presented as clients, no readable text, no logos.

**Thumbnails** follow the project's thumbnail rules:

- Steve's real face with a clear expression;
- one visual of the result;
- four words max;
- high contrast;
- 1280 × 720, under 2 MB.

---

## 9. Free assessment engine

### 9.1 Instant result (automatic)

A server function calls the Anthropic API with the form answers. The model:

- uses web fetch on the visitor's website (home, services, about, contact);
- uses web search for public information (reviews, Google Business Profile);
- returns **structured JSON** (data in a fixed format the page can read): score, score meaning, 3 quick wins (problem, fix, tool, effort, estimated hours saved per week, one-line reasoning), an AI setup plan (the first automation and the three assistants, each tailored to the answers), and a list of what it couldn't verify.

**Score rubric** (drafted for Steve to approve; the model scores each 0–20):

| Area | What it looks at |
|---|---|
| Enquiry handling | How enquiries come in and how fast they're answered |
| Repetitive admin | Admin load for this business type and team size |
| Follow-up | Follow-up and repeat business |
| Content and marketing | Marketing and content workload |
| Current AI use | How much AI and automation the business already uses (inverted: less use = more opportunity) |

**Rules:**

- One of the top 3 quick wins must always assess enquiry handling, using the answers to "How do enquiries reach you?" and "How fast do you usually reply?".
- The result ends with "Your AI setup plan": the first automation Steve would build (default: the Enquiry Responder) and the 3 assistants from section 10.1 (customer replies, marketing, quotes from voice notes), each with one line tailored to the visitor's answers. Only name what Steve has defined in section 10.
- Every time estimate is labelled "estimate" with its reasoning.
- No promises of results, no money figures for income. Never promise more enquiries or sales.
- If the website can't be read, say so and base the result on the form answers.
- If the call fails or takes over 90 seconds, show a friendly message and email the result when it's ready.
- Save every result to D1.

### 9.2 Full audit (Steve reviews before sending)

Runs in the background after the instant result. It drafts the full audit and emails it to Steve with the subject `Audit draft: [Business] – fit: High/Medium/Low`.

**Part A – client-facing draft:**

1. What the business does and how it makes money
2. Where time and money are being lost
3. Specific AI fixes for each, with named tools and real costs (searched, with the date checked)
4. Rough expected impact, labelled as an estimate with reasoning
5. What Steve would build first and why
6. Anything that couldn't be verified
7. Next step: book the free 30-minute call (link)

**Part B – for Steve only (never sent to the prospect):**

- fit score and why;
- which automation to build first;
- likely objections;
- questions for a call;
- red flags.

**Steve always edits and approves the full audit before it's sent.** Nothing in Part A or B is ever sent automatically.

**Improving the drafts:**

- When Steve sends a final version, he pastes it into `audits/final/`.
- `/improve-audit-prompt` compares drafts with his finals and suggests changes to the instructions, so drafts get closer to what he actually sends.

### 9.3 Follow-up emails (Kit)

Only for people who ticked consent. Written in Phase 4, for Steve to approve:

| Day | Email |
|---|---|
| 0 | Your result + booking link |
| 2 | A build video of one quick win (text only until Steve has a real video) |
| 4 | What happens on the call |
| 7 | AI Business Setup + guarantee + next start date (from the settings file) |
| 14 | A real build story + free AI group link |

No fake deadlines.

---

## 10. Offers on the site

**The offer stack:**

1. **Free AI Growth Audit** – instant score + top 3 quick wins, then Steve's reviewed audit (section 9).
2. **Free 30-minute call** – booked from the result page or `/ai-business-setup`.
3. **AI Business Setup** – section 10.1.
4. **AI Partner** – section 10.2.

Every price is a test.

### 10.1 AI Business Setup – £2,497 (test price)

**6 weeks, done-for-you + coaching.**

**Price:** £2,497, or 3 × £897 (£2,691 in total). Show both totals plainly.

**Group:** capped at 6 businesses.

**Founding group price:** £1,997, switched on or off in the settings file. Label it honestly: "founding group – first 6 businesses, in return for sharing results". "Sharing results" means permission to publish a real, attributable testimonial or case study.

**Done for you:**

- a 90-minute 1:1 setup session;
- a business AI workspace with data-safety settings;
- a "business brain" document;
- 3 custom assistants: customer replies, marketing, and quotes from voice notes;
- 1 automation built and live (default: the Enquiry Responder);
- a one-page staff AI policy.

**Done with you – weekly 75-minute group calls:**

| Week | Topic |
|---|---|
| 1 | Workspace + business brain |
| 2 | Enquiries & follow-up |
| 3 | Marketing |
| 4 | Admin |
| 5 | Your team |
| 6 | Results + next 90 days |

Plus recordings, templates, and message support between calls.

**Guarantee:** "Your first AI system is live by week 3, or I keep working free until it is. If by week 6 you're not using AI every week in at least 3 tasks, I'll coach you 1:1 until you are."

**Never promise income, enquiries or results.** The guarantee is about delivery and use only.

**Describe it as** AI set up in the business, with coaching to use it. Never describe it as a course (section 2).

**Payment:**

- No online checkout for now. Steve sends a Stripe invoice after the call.
- **VAT:** ask Steve whether he is VAT-registered. If he is, the page must say whether £2,497 and £297 include VAT.
- Terms state the service is for businesses, and set out the payment options, the guarantee and the founding group terms.

### 10.2 AI Partner – £297/month (test price)

Cancel any time. Includes:

- monitoring and fixes;
- a monthly group call;
- a monthly 30-minute 1:1;
- one improvement or new assistant a month;
- new templates.

### 10.3 One settings file

All prices, dates and places live in **one settings file** (`src/config/offer.ts`), so Steve can change them in one place:

- AI Business Setup price (£2,497), instalment count and amount (3 × £897);
- founding group price (£1,997), the founding on/off switch, and the founding label;
- group cap (6), next group start date, places left;
- programme length (6 weeks) and the guarantee week (3);
- AI Partner price (£297/month);
- the booking link.

Change a value there and every page, email and structured-data label updates.

**Real numbers only.** The start date and places left are typed in by Steve and never invented. If either is blank, the block that shows it hides itself.

Buttons also take their destination from this file, so online payment can be added later by changing one line.

---

## 11. Content system

### 11.1 Volume and rule

- **Publish daily** (at least one post a day): articles, and articles with videos.
- **Every post must contain something original from Steve:** a build, a number, a screenshot or an opinion.
  - Google's spam policies penalise "scaled content", meaning many pages produced mainly to rank and adding nothing new.
  - The proof-bank rule (11.3) keeps daily volume safe.
- **Time check, an estimate:** reviewing 7 drafts a week at 15–20 minutes each is about 2–2.5 hours of Steve's week.

### 11.2 Where content lives

```
src/content/posts/        one file per post (video posts have a youtubeId)
src/content/programmes/   one file per programme or build
inbox/                    Steve drops raw material: YouTube transcripts, build notes, screenshots, voice-note transcripts
proof-bank/               Steve's real builds, numbers, screenshots and opinions – one file per item, reused across posts
content-plan/topics.csv   topic, target search phrase, category, type, priority, status
templates/                one template per post type
```

### 11.3 Post fields (required unless marked optional)

`title`, `description` (≤155 characters), `slug`, `category`, `tags`, `type`, `targetPhrase` (main search phrase), `status` (draft / review / published), `publishDate`, `updated`, `author`, `originalElement` (required: what's Steve's own), `sources` (links for any facts or figures), `youtubeId` (optional), `faq` (optional), `coverImage` (optional; falls back to the generated share image).

**Post types:**

- build-log
- how-to
- tool-review
- comparison
- industry-guide
- data-safety
- cost-guide

### 11.4 Two templates from the competitor research

These target high-intent searches. Run one per industry, starting with the industries that request the most assessments:

- **"AI tools for [industry] UK: what actually works in [year]"**
- **"Is it safe for a UK [industry] to use ChatGPT with client data?"**

### 11.5 Rules for every post

- Plain English, UK spelling, written for a smart small business owner who hasn't worked in AI.
- Never invent a statistic, price, case study, client, quote or result. Every figure links to its source; every tool price says "checked [date]".
- Answer the search question in the first 2–3 sentences, then go deeper.
- At least 3 internal links plus a link to the category hub.
- Main call to action: the free assessment. Secondary: newsletter.
- No duplicate topics. Check existing posts for the same search phrase first.

### 11.6 Publishing flow

1. Drafts are created with `status: review` and a future `publishDate`.
2. Steve reviews them on a local `/drafts` page that exists only on his computer.
3. Steve edits or asks for changes, then sets `status: published`.
4. A scheduled daily rebuild (GitHub Action → Cloudflare deploy) releases one post a day on its date. Steve can approve a week's posts in one sitting.

### 11.7 Slash commands (in `.claude/commands/`)

| Command | What it does |
|---|---|
| `/post-from-material [files]` | Draft a post from files in `inbox/` |
| `/post-from-topic [row]` | Draft from `topics.csv`, pulling from `proof-bank/`. Marked `NEEDS-STEVE` and blocked from publishing if there's nothing original |
| `/batch-posts [n]` | Draft n posts from the highest-priority topics |
| `/industry-pages [industry]` | Draft both 11.4 templates for one industry |
| `/plan-topics` | Suggest topics from Search Console data and gaps; check duplicates; append to `topics.csv` for approval |
| `/publish-check [slug]` | Run the quality checklist and SEO checks; report pass or fail |
| `/new-programme [name]` | Create a programme or build page from Steve's details |
| `/thumbnail-brief [slug]` | Write a Higgsfield brief and prompt for a post thumbnail, for Steve to approve before generating |
| `/test-assessment [url]` | Run the instant result and full audit against a test business |
| `/improve-audit-prompt` | Compare drafts with Steve's finals and suggest improvements |
| `/weekly-review` | Section 13 |

---

## 12. Technical SEO

- Clean addresses, one canonical address per page.
- Automatic `sitemap.xml`, `robots.txt`, RSS feed.
- Unique title (≤60 characters) and description per page.
- Structured data (labels in the page code that help Google understand it):
  - Organization, Person (Steve), Article, BreadcrumbList, FAQPage, VideoObject, Service (AI Business Setup), ItemList on hubs.
- Category hub pages linking to every post in the topic.
- Breadcrumbs, related posts, a redirects file so renamed pages never break. It sends `/ai-integration`, `/programmes`, `/programmes/[slug]` and `/full-assessment` to `/ai-business-setup`.
- 404 page with search and popular posts.
- Descriptive image file names and alt text.
- Result pages, including the booking confirmation screen, set to noindex (hidden from search engines).
- Submit the sitemap in Search Console at go-live.

---

## 13. Tracking and learning from data

### 13.1 Events logged to D1

| Event | When |
|---|---|
| `hero_form_start` | Hero form started |
| `assessment_step_1` / `assessment_step_2` / `assessment_step_3` | Each form step completed |
| `result_viewed` | Result page viewed |
| `setup_page_view` | `/ai-business-setup` page viewed |
| `founding_interest` | "Book your free call" clicked from the founding group price block |
| `call_booked` | Call booked |
| `newsletter_signup` | Newsletter sign-up |

Each event is stored with source, UTM tags (`utm_source`, `utm_campaign`, `utm_content`) and page. Every audit and every booking also stores these three UTM tags. `utm_content` carries the ad hook ID.

There are no checkout or purchase events: there is no online payment for now. The v2.1 events `ai_integration_view`, `integration_interest` and `programme_interest` are retired because their pages are hidden.

### 13.2 Weekly loop

1. A GitHub Action pulls Search Console, Cloudflare and D1 data weekly into `data/weekly/YYYY-MM-DD.json`.
2. `/weekly-review` writes `reports/weekly-YYYY-MM-DD.md`:
   - **funnel numbers:** visits → audits started → completed → calls booked, this week vs the last 4 weeks;
   - **per hook (`utm_content`):** audits completed and calls booked; and, once Steve has entered ad spend in `data/ad-spend.csv`, cost per completed audit and cost per booked call (section 19.5);
   - pages close to page one of Google (positions 8–20);
   - pages with high impressions and low clicks;
   - pages with traffic but no assessments;
   - new search phrases;
   - **up to 10 proposed actions**, ranked, each with the number behind it.
3. Steve approves changes. Each change is logged in `data/changes.csv`.
4. Four weeks later, the result is checked and recorded in `LEARNINGS.md`.
5. Claude Code reads `LEARNINGS.md` before writing any new post, headline or call to action.

**Small numbers rule:** until there's enough data (likely the first few months), the review says so plainly rather than drawing conclusions from tiny numbers.

### 13.3 Tests the site must support

- **Headline A/B/C** on the home page: one version per visitor, kept for that visitor. Note: Cloudflare has no built-in A/B tool on the free plan *(verify)*, so build a simple cookie-free split in a server function.
- **Price test:** the AI Business Setup price, instalments, founding price and AI Partner price are settings in one file (section 10.3). Change one, and every page updates.

---

## 14. Running costs

All prices below must be re-checked at setup. Figures from v1.0 were checked 6 Oct 2026.

| Item | Cost | Confidence |
|---|---|---|
| Cloudflare hosting, D1, Turnstile, analytics | £0 on free plan | Moderate – check limits |
| GitHub | £0 | High |
| Kit | £0 to start; sequences need the paid Creator plan (listed at $33/month on 6 Oct 2026) | Verify |
| Resend | £0 up to 3,000 emails/month (6 Oct 2026) | Verify |
| Stripe | Invoices sent by Steve; fee per paid invoice not yet checked | Verify |
| Anthropic API | **Estimate: roughly $0.20–$0.50 per instant result plus $0.20–$0.50 per full audit draft.** Reasoning: a few page reads and searches each, at Sonnet pricing checked 6 Oct 2026. Set a monthly spend limit in the Anthropic Console | Low–moderate; measure in Phase 4 |
| Google Workspace (info@) | Check UK price | Not confirmed |
| Higgsfield | Credits per generation; check balance and cost before each | Not confirmed |
| Cal.com (booking) | £0 on the free plan | Verify |
| Client area for recordings and templates | Not decided. If Skool: Hobby $9/month or Pro $99/month (skool.com/pricing, checked 10 Oct 2026). If YouTube + Google Drive: £0 | Checked 10 Oct 2026 |
| Facebook ads | Steve's own ad spend, entered in `data/ad-spend.csv`. The Meta pixel and Conversions API are free | – |
| Post drafting | Uses Steve's Claude plan in Claude Code | – |

---

## 15. Build phases

Stop after each phase, show Steve the result, and wait for approval.

**Build order (v2.2):** design first. The local half of Phase 0 (the Astro project and folders on Steve's computer) and all of Phase 1 are built and reviewed locally. The online half of Phase 0 (GitHub, Cloudflare, the "hello" preview address) follows when Steve has created the accounts.

**Phase 0 – Setup** (guide Steve step by step)

- Check Node.js and git; install if missing, explaining each command.
- Steve creates GitHub and Cloudflare accounts. Connect the repo to Cloudflare.
- Create the Astro project, `CLAUDE.md`, folder structure, `.env.example`, `.gitignore`.
- **Done when:** a "hello" page is live on a free Cloudflare preview address.

**Phase 1 – Design system and Home**

- Tokens, fonts, components (section 6), header, footer.
- The one settings file (10.3) and the industry variants data file (19.4).
- Home page (7.1) with all three headline options switchable (default A).
- The enquiries calculator.
- `/ai-business-setup` page (7.4), with "Book your free call" on a clearly marked placeholder until the calendar is wired in Phase 3.
- Placeholder visuals until the Higgsfield assets are approved.
- Write the Higgsfield briefs for H1–H5 and present them to Steve for approval and credits.
- **Done when:** Steve approves the look on his phone and desktop.

**Phase 2 – Free assessment and instant result**

- `/assessment` form → D1 + Turnstile.
- Anthropic instant result (9.1) → result page (7.3).
- Result email via Resend.
- Kit sign-up with consent.
- Event tracking (13.1), with `utm_source`, `utm_campaign` and `utm_content` stored with every audit.
- Steve sets an Anthropic spend limit first.
- **Done when:** Steve submits a test assessment for a real local business and sees a sensible result in under 60 seconds, and gets the email.

**Phase 3 – Call booking and full audit**

- Confirm the booking tool on official docs first (section 4) and tell Steve what was found.
- Wire the booking calendar into `/ai-business-setup` (built in Phase 1), with the `setup_page_view` and `founding_interest` events.
- Result page booking: embedded calendar, confirmation screen and email, Kit tag `call-booked`, email to Steve with the audit result attached, booking saved in D1 with UTM tags (7.3).
- Full audit draft emailed to Steve (9.2).
- `/test-assessment`, `/improve-audit-prompt`.
- No Stripe Checkout and no Stripe webhook. Steve invoices by Stripe invoice after the call.
- **Done when:** a test booking from a result page records in D1, tags the contact in Kit and emails Steve with the audit result, and a full audit draft arrives in Steve's inbox.

**Phase 4 – Blog and content engine**

- Content collections and schemas, blog index, post page, category hubs, Pagefind search.
- Share images, all SEO items (section 12).
- `inbox/`, `proof-bank/`, `topics.csv`, templates, slash commands (11.7), `/drafts` page, daily scheduled rebuild.
- Kit follow-up emails (9.3) drafted for approval.
- Interview Steve to fill the first 5–10 proof-bank entries.
- Draft the first 7 posts (at least 3 from his material).
- **Done when:** Steve can drop a transcript in `inbox/`, run one command, review the draft and schedule it.

**Phase 5 – About, legal and ads readiness**

- Redirects from the hidden addresses to `/ai-business-setup` (section 5).
- `/about` (interview Steve).
- Privacy, cookies and terms pages drafted for Steve to check (B2B terms for AI Business Setup: payment options, the guarantee, the founding group, AI Partner).
- Cookie consent banner (19.1).
- Meta pixel after consent, with "AuditCompleted" and "CallBooked" (19.2).
- Meta Conversions API: report findings on Meta's docs and UK consent rules to Steve first; build only after his yes (19.2).
- **Done when:** the hidden addresses redirect, and nothing from Meta loads until Accept is clicked.

**Phase 6 – Go live**

- info@ mailbox records.
- DNS move from GoDaddy to Cloudflare, step by step, with email records preserved.
- Connect aigrowthsystems.co.uk with HTTPS; redirect www to non-www.
- Search Console + sitemap; Cloudflare Web Analytics.
- Check on the live site that the Meta pixel stays silent until Accept, and that both conversions fire after it.
- Final mobile speed check.
- **Done when:** the site is live on the real domain, email still works, a real test booking works end to end, and the sitemap is accepted.

**Phase 7 – Learning loop**

- Weekly data pull + `/weekly-review` (section 13).
- `data/ad-spend.csv` for Steve's ad spend per hook, and the per-hook report (19.5).
- **Done when:** the weekly pull runs on its own and produces a report.

---

## 16. Rules that never change

- Never invent a price, statistic, case study, testimonial, client name, URL or result.
- Prices shown are tests. No fake urgency, no fake scarcity, no countdowns, no "someone just bought" pop-ups, no income claims.
- Never promise more enquiries, sales or income. Nothing is presented as a guaranteed outcome; the only guarantee is about delivery (section 10.1).
- Every price is a test kept in one settings file (section 10.3).
- Start dates and places left are real numbers typed into the settings file by Steve. Never invent them; hide the block if they're blank.
- Nothing non-essential (including the Meta pixel) loads before cookie consent.
- Instant results are automatic. **The full audit is never sent without Steve's approval.**
- Every blog post has something original from Steve. No generic AI tutorials.
- Every Higgsfield generation is approved by Steve first.
- Plain English. UK spelling. Avoid: leverage, synergy, utilise, facilitate, optimise.
- Keep it simple: fewest tools, fewest steps. If something needs a manual to explain, redesign it.
- Runnable by one person, part-time.
- Steve reviews everything before it goes live. Nothing is described as "finished"; it's "ready for your review".

---

## 17. Open questions for Steve (ask at the phase shown)

| # | Question | Phase |
|---|---|---|
| 1 | Hero headline: A is the default. Confirm, or pick B or C to launch first. (All three will be tested) | 1 |
| 2 | 2–3 real photos of you (headshot + working at your desk) | 1 |
| 3 | Instant result: how many working days until your full audit arrives? | 2 |
| 4 | VAT: are you VAT-registered, and are £2,497 and £297 inc or ex VAT? | 1 |
| 5 | First group start date, and how many places are left. Does the founding price switch start on or off? | 1 |
| 6 | Your call availability, and booking tool confirmation (Cal.com connected to your Google Calendar is recommended; section 4) | 3 |
| 7 | Where recordings and templates live: a private Skool area or similar. Skool pricing checked on skool.com/pricing, 10 Oct 2026: Hobby $9/month (10% fee on payments taken through Skool), Pro $99/month (2.9% fee). Not yet confirmed: whether a private client area can sit inside the existing free group. No-cost alternative: unlisted YouTube + a shared Google Drive folder | 3 |
| 8 | Which industries get landing variants first | 1 |
| 9 | Data-safety claims: which tools and practices do you actually use with client data? (Every claim must be true) | 1 |
| 10 | Business legal details for the footer and terms: legal name, company number (if a limited company), address | 5 |
| 11 | Instalments: 3 × £897 is £194 more than paying in full. Charging more for instalments may bring consumer-credit rules into play for sole traders and small partnerships. Check with your accountant or solicitor | 5 |
| 12 | Current name of the free Skool group | 1 |
| 13 | YouTube channel and LinkedIn links for the About page | 5 |
| 14 | Approve or change the draft "How it works" heading "4 STEPS. IT STARTS WITH A FREE AUDIT." | 1 |
| 15 | Approve or change the draft calculator heading "WHAT ARE SLOW REPLIES PUTTING AT RISK?" | 1 |
| 16 | Approve the comparison table rows (learn it yourself / AI agency / AI Business Setup) and the home page FAQ answers | 1 |

---

## 18. Changes

### Changes from v2.1 (v2.2, 10 October 2026)

- **New main offer:** AI Business Setup – 6 weeks, done-for-you + coaching, £2,497 or 3 × £897, group capped at 6, founding group price £1,997 on a switch. Followed by AI Partner at £297/month, cancel any time.
- **Offer stack:** Free AI Growth Audit → free 30-minute call → AI Business Setup → AI Partner.
- **AI Integration (£1,997) and the £199/month care plan removed.** The Enquiry Responder stays as the default automation inside AI Business Setup.
- **New page `/ai-business-setup`.** `/ai-integration`, `/programmes`, `/programmes/[slug]` and `/full-assessment` are hidden and redirect to it. None had been built, so no files were deleted.
- **Three main pages are now** Home, AI Business Setup and Blog. Nav: AI Business Setup · Blog · [Free AI Growth Audit].
- **Home page:** new headlines A/B/C (default A) and a new section order: how it works (4 steps), comparison, 6-week overview, guarantee, AI Partner, enquiries calculator, data safety, latest builds, about Steve, FAQ, final call to action.
- **Result page:** finishes with "Your AI setup plan" (first automation + 3 assistants), then "Book your free call" and a link to `/ai-business-setup`.
- **Full audit draft:** Part A's next step is the call. Part B is fit score, which automation to build, likely objections.
- **New guarantee:** first AI system live by week 3, and 1:1 coaching if AI isn't in weekly use in at least 3 tasks by week 6.
- **One settings file** now holds every price, the founding switch, the group cap, the next start date, places left and the booking link. Start dates and places are real numbers only.
- **Kit emails:** new D0, D2, D4, D7, D14 sequence.
- **Events:** `setup_page_view` and `founding_interest` added; `ai_integration_view`, `integration_interest` and `programme_interest` retired.
- **Tracking from v2.1 kept:** consent banner, Meta pixel after consent, AuditCompleted + CallBooked, UTM hook tracking, industry variants, per-hook weekly reporting.
- **Build order:** the local half of Phase 0, the design system, Home and `/ai-business-setup` are built first on Steve's computer. GitHub and Cloudflare set-up follows.
- **Section 2:** "consulting, not training" reworded so AI Business Setup (set-up plus coaching) fits; stand-alone courses are still not sold.
- **Open questions:** replaced with the v2.2 list in section 17.

### Changes from v2.0 (v2.1, 9 October 2026)

- **New funnel:** Facebook ad → Free AI Growth Audit → free 30-minute discovery call → AI Integration (fixed price) → optional monthly care plan.
- **£997 Full AI Assessment removed** from the whole site: `/full-assessment`, `/full-assessment/booked`, the £997 home section, nav link, FAQ answers, emails and tracking events. None of it had been built, so no files were deleted.
- **Stripe Checkout and the Stripe webhook removed** from the build plan for now. Steve invoices clients by Stripe invoice after the call. Buttons read their destination from the settings file so online payment can be added later.
- **Result page:** main action is now "Book your free 30-minute call" with an embedded calendar. Booking triggers a confirmation, Kit tag `call-booked` and an email to Steve with the audit result.
- **New page `/ai-integration`** (replaces `/full-assessment`): the Enquiry Responder at £1,997 fixed, 50/50 payment, "live in 14 days" guarantee, optional £199/month care plan, Admin Assistant as coming soon.
- **One settings file** for price, payment split, timeline, care-plan price and booking link.
- **Home page:** new headline options (default A), enquiries calculator, AI Integration section, new 3 steps, new FAQ. Nav is now AI Integration · Programmes · Blog · [Free AI Growth Audit].
- **Free audit form:** two new questions on how enquiries arrive and how fast they're answered. One quick win always assesses enquiry handling. The result ends with "The first system I'd build for you:".
- **Full audit draft:** Part A's next step is the call / AI Integration. Part B adds which system fits first, likely price and fit score.
- **Programmes page:** AI Integration cards first, then coaching programmes.
- **Ads readiness (new section 19):** cookie consent banner, Meta pixel and Conversions API after consent, hook tracking by UTM tags, industry landing variants, per-hook weekly reporting with ad spend.
- **Events:** checkout and purchase events removed; `ai_integration_view` and `integration_interest` added; `call_booked` kept.
- **Kit emails:** new sequence on days 0, 2, 4, 7 and 14.
- **Booking tool:** Cal.com recommended over Google Workspace appointment schedule, to be confirmed on official docs in Phase 3.
- **Open questions:** the £997 questions replaced; new questions 14–17 added for points this change raised.

### Changes from v1.0 (v2.0, 9 October 2026)

- **Pages:** cut to three main pages (Home, Programmes, Blog) plus the supporting pages they need. Removed the tools directory, `/videos`, `/start-here`, `/community` and digital products.
- **Design:** changed from "dark/gold inspired by jointherealworld.com" to a Higgsfield-style dark AI product look with gold, The Real World's cinematic video cards, and Acquisition.com's simple structure. New fonts: Space Grotesk headlines (uppercase), Inter body.
- **Free assessment:** now gives an instant AI score and top 3 quick wins on screen. Steve's reviewed full audit follows. The "never auto-send" rule now covers the full audit only.
- **£997 Full AI Assessment** added, sold online from the result page and its own page, with the fee credited against a build or programme. *(Removed in v2.1.)*
- **Programmes page** for coaching programmes and productised builds. No training courses.
- **Content:** daily (one post a day), not two. Two industry-page templates and a data-safety category added from the competitor research.
- **Visuals:** Higgsfield asset list with approval rule.
- **Tracking:** a full funnel event log, headline A/B/C testing and a one-setting price test.

---

## 19. Ads readiness (needed before Facebook ads)

### 19.1 Cookie consent banner

- UK rules: **Accept / Reject / Settings**, with equal prominence.
- Nothing non-essential loads before consent. Cloudflare Web Analytics uses no cookies and is not affected.
- The choice can be changed at any time from a "Cookie settings" link in the footer.
- The `/cookies` and `/privacy` pages describe the Meta pixel and Conversions API.

### 19.2 Meta pixel and Conversions API

- The Meta pixel loads **only after consent**.
- Custom conversion **"AuditCompleted"** fires when the result page loads. **"CallBooked"** fires on booking.
- Meta's Conversions API (server-side) sends the same two events, **only for visitors who consented**.
- **Before building:** check Meta's current docs and the UK consent rules, report the findings to Steve, and wait for his yes.

### 19.3 Hook tracking

- Store `utm_source`, `utm_campaign` and `utm_content` with every audit and every booking in D1.
- Steve puts the ad hook ID in `utm_content`.

### 19.4 Industry landing variants

- If the address has `?for=builders` (or `plumbers`, `dentists`, `estate-agents`, `accountants`, `salons`, `gyms`), swap:
  - the hero subheadline on the home page;
  - one line of the problem section on `/ai-business-setup`.
- The wording for each industry lives in one data file Steve can edit (`src/data/industries.ts`).
- With no `?for=`, or an unknown value, the general wording shows.
- Never invent a statistic or claim about an industry.

### 19.5 Weekly review per hook

The weekly review (section 13.2) reports, per hook (`utm_content`):

- audits completed;
- calls booked;
- once Steve has entered ad spend in `data/ad-spend.csv`: cost per completed audit and cost per booked call.

The small numbers rule (section 13.2) applies.
