# Brief – AI Growth Systems Website Build

**Version:** 2.0
**Date:** 9 October 2026
**Owner:** Steve Harrison, AI Growth Systems (aigrowthsystems.co.uk)
**Built with:** Claude Code
**Replaces:** v1.0 (6 October 2026)
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

A premium, dark, AI-quality website with **three main pages** and one job: **get small business owners to take the free AI assessment, then buy the £997 Full AI Assessment.**

| Page | Job |
|---|---|
| **Home** (`/`) | Very simple. One action: start the free AI assessment. Second action: buy the £997 Full AI Assessment |
| **Programmes** (`/programmes`) | Sells coaching programmes and productised AI builds |
| **Blog** (`/blog`) | Daily articles and videos showing real AI builds. Builds search traffic and audience |

Everything else on the site (sections 5 and 7) is a supporting page these three need: the assessment flow, checkout, an author page, legal pages.

**Success is measured by:**

1. Free assessments started
2. Free assessments completed
3. £997 assessments bought
4. Programme enquiries or sales

Every page and every test is judged against these numbers (section 13).

---

## 2. The business (context for all copy)

- **AI Growth Systems** helps businesses use AI to make more money.
- **It is consulting, not training.** Revenue comes from:
  - the £997 Full AI Assessment;
  - productised AI builds: one named problem, fixed scope, fixed price, fixed delivery time;
  - coaching programmes.

  Courses and general AI training are not sold.
- **Two lines of work:**
  - AI agents and automations that take over repetitive work;
  - AI-powered marketing that brings in more customers (ads, website conversion, follow-up, speed to lead).
- **Everything shown is something Steve actually does.** Content shows real builds in his own business and client work, never generic AI tutorials.
- **Audience now:** broad. Small and local UK businesses. It narrows later when the data shows who buys. Do not invent an ideal customer.
- **Prices shown on the site are tests.**
  - £997 is the first test price for the Full AI Assessment.
  - Prices can change based on the data.
  - Never use "price going up", countdowns or fake scarcity.
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
| Database | **Cloudflare D1** | Stores assessment submissions, results, report drafts, purchases, events | Free tier |
| Spam protection | **Cloudflare Turnstile** | Stops bots using the assessment (each one costs API money) | Free |
| AI for results and reports | **Anthropic API** (current Sonnet model, with web search and web fetch tools) | Researches the business, writes the instant result and the full audit draft | Pay per use (section 14) |
| Email list | **Kit** | Steve's choice. Automated sequences need a paid plan *(verify current price)* | Free to start |
| Sending emails from the site | **Resend** | Result emails to visitors, notifications to Steve *(verify free-plan limits)* | Free to start |
| Payments | **Stripe Checkout** | £997 assessment and later programmes. Hosted payment page, no shop software. Webhook confirms payment back to the site *(verify UK fees)* | Per sale |
| Booking calls | **Google Workspace appointment schedule** (comes with the info@ mailbox) *(verify it's on Business Starter)*. Fallback: **Cal.com** free plan | Lets £997 buyers book their call straight after paying | Included / free |
| Business mailbox | **info@aigrowthsystems.co.uk** on Google Workspace Business Starter *(verify UK price)* | Real mailbox, calendar, booking page | Paid |
| Analytics | **Cloudflare Web Analytics** + **Google Search Console** + our own D1 event log | No cookies needed for Cloudflare analytics, so no cookie banner for analytics *(verify API access on free plan)* | Free |
| Site search | **Pagefind** | Search box across blog posts | Free |
| Video hosting | **YouTube** (blog videos, click-to-load embed via youtube-nocookie) + **Cloudflare Stream** or self-hosted MP4/WebM for short silent hero loops *(verify Stream pricing; self-hosted is fine if under ~3 MB)* | Free hosting and YouTube ranking for long videos. Fast, ad-free loops for the design | Free / low |
| Visual assets | **Higgsfield** (connected to Claude) | Cinematic hero loop, section images, blog and video thumbnails | Paid credits. **Steve approves every brief and prompt before generation** |

**Domain:** registered at GoDaddy. At go-live, move the DNS to Cloudflare by changing the nameservers at GoDaddy; the domain stays registered at GoDaddy. **Recreate the email records (MX, SPF, DKIM, DMARC) for info@ in Cloudflare before switching**, or email will break.

---

## 5. Site map

```
/                              Home – free assessment + £997 offer
/assessment                    Free AI assessment – short multi-step form
/assessment/result/[id]        Instant result + £997 offer (private link, not indexed)
/full-assessment               £997 Full AI Assessment sales page (for ads, emails and the nav)
/full-assessment/booked        After payment: book your call
/programmes                    Coaching programmes + productised builds
/programmes/[slug]             One programme or build
/blog                          All posts (filter by category, search)
/blog/category/[category]      Category hub pages
/blog/[slug]                   Post page (article, or article + video)
/about                         Steve – short author page (needed for trust and Google)
/privacy  /cookies  /terms  /404
/sitemap.xml  /robots.txt  /rss.xml
```

**Main navigation:**

- Programmes · Blog · Full Assessment £997 · **[Free AI Assessment]** (gold button, sticky)
- On mobile: the logo plus the gold button always visible; everything else in a menu.

**Footer:**

- Programmes, Blog, About, Full Assessment
- Free AI group (Skool link)
- Newsletter sign-up
- info@ email
- Privacy, Cookies, Terms
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

Simple, like Acquisition.com: a few sections, one main action repeated.

1. **Header:**
   - wordmark, nav;
   - sticky gold "Free AI Assessment" button.
2. **Hero:**
   - Higgsfield cinematic loop in a rounded frame (asset H1, section 8).
   - Eyebrow pill: "Free AI assessment".
   - H1: one of the three options below, chosen by Steve.
   - Subheadline: "Tell us about your business. Get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve."
   - **Inline form start:** website address + email + gold button "Get my free assessment". This carries both values into `/assessment` step 2.
   - Small line under the button: "Free. No call needed. UK businesses."
   - **Headline options** (each names one specific problem, not "we implement AI"):
     - A: "HOW MANY HOURS A WEEK DOES ADMIN COST YOU?"
     - B: "STOP DOING THE SAME TASKS BY HAND EVERY WEEK."
     - C: "EVERY ENQUIRY YOU ANSWER LATE IS A SALE AT RISK."
3. **How it works:**
   - Eyebrow: "How it works".
   - H2: "3 STEPS. NO SALES CALL NEEDED."
   - Three cards:
     - (1) Answer a few questions about your business.
     - (2) Get your AI score and top 3 quick wins instantly.
     - (3) Steve reviews your business and emails your full audit.
   - Button.
4. **Calculator** (Higgsfield-style):
   - Eyebrow: "What it's costing you".
   - H2: "WHAT IS REPETITIVE WORK COSTING YOU?"
   - Sliders:
     - hours a week your team spends on repetitive tasks (1–60);
     - average hourly cost of that time (£10–£100).
   - Output: cost per year in a big gold number (= hours × cost × 48 working weeks), with a small bar chart over 12 months.
   - Label under it: "Your estimate, from your numbers. The free assessment shows where AI could take some of that work."
   - Button: "Find out what AI could take off your plate".
   - **This shows a cost the visitor already has. It never promises savings or income.**
5. **Full AI Assessment (£997):**
   - Eyebrow: "Go deeper".
   - H2: "THE FULL AI ASSESSMENT".
   - What's included (from section 10.1, once Steve confirms).
   - Big price "£997".
   - Guarantee line: "Your £997 comes off the price of any build or programme you buy within [X] days." (X to confirm.)
   - Buttons: primary "Get the Full Assessment — £997" → Stripe Checkout; secondary "See what's included" → `/full-assessment`.
6. **Your data stays safe:**
   - H2: "YOUR CLIENT DATA STAYS YOURS."
   - Three plain points on how Steve handles business data, which tools keep data private, and UK GDPR. Steve must confirm every claim (section 17).
   - Links to the blog's data-safety posts.
   - **Why this section:** data safety was the most repeated buyer worry across the competitor research.
7. **Latest builds:**
   - Eyebrow: "Real builds".
   - H2: "WATCH WHAT I'M BUILDING."
   - The 3 latest blog posts with videos, as cinematic video cards.
   - Link: "All posts".
8. **About Steve:**
   - Real photo.
   - 3–4 sentences: who he is, his marketing agency background (Google Ads, Facebook Ads, website conversion, email and SMS follow-up), and that everything shown is from his own business and client work.
   - Link to `/about`.
   - **Never claim he has run marketing for hundreds of businesses.**
9. **What I'm seeing in audits:**
   - Hidden until Steve has completed at least 5 audits.
   - Then: 3 patterns from real audits, written by Steve, with no client names unless they've agreed.
10. **Testimonials:**
    - Build the component but keep it hidden.
    - Show only real, attributable testimonials, with permission.
    - Never invent one.
11. **FAQ** (5–7 questions). Draft answers for Steve to approve:
    - Is it really free?
    - What do I get instantly, and what comes later?
    - How long until I get the full audit?
    - What's in the £997 Full Assessment and how is it different?
    - How does the £997 credit work?
    - Is my business data safe?
    - Do I need to be technical?
12. **Final call to action band:** H2 "FIND YOUR FIRST AI QUICK WIN.", gold button.
13. **Footer** (section 5).

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
  - main goal: More leads / More sales / Save time / Better follow-up / Other.
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
2. **Your top 3 quick wins.** Each one has:
   - the problem in plain words;
   - the AI fix, naming a tool type or real tool;
   - effort to set up (Low / Medium / High);
   - a rough time saving, **labelled "estimate"**, with the reasoning in one line.
3. **What happens next:** "Steve will review your business and email your full audit within [X working days]." (X to confirm.)
4. **The £997 offer:**
   - H2: "WANT THE FULL PICTURE NOW?"
   - what's included, the credit guarantee, the price;
   - button → Stripe Checkout.
   - Secondary: "Book a free 15-minute call instead" (only if Steve wants this; section 17).
5. **Secondary:** a link to the free AI group.

**Also:**

- The same result is emailed to the visitor (Resend) with a link back to this page.
- The page is private: not indexed by search engines, with a long random ID in the address.

### 7.4 Full AI Assessment (`/full-assessment`)

A sales page for ads and emails. Same design system. Sections:

1. Hero: "THE FULL AI ASSESSMENT — £997"
2. Who it's for
3. What's included (section 10.1)
4. A sample report preview, built for a clearly fictional business and labelled "Example"
5. How it works: pay → book your call → assessment delivered → £997 credited if you go ahead with a build or programme
6. The credit guarantee
7. About Steve
8. FAQ
9. Buy button

**After payment:** Stripe sends the buyer to `/full-assessment/booked`, which:

- thanks them;
- shows the booking calendar to choose their call;
- says what to prepare.

The Stripe webhook (Stripe's automatic message back to the site confirming payment) records the purchase in D1, tags them in Kit (`bought-full-assessment`) and emails Steve.

### 7.5 Programmes (`/programmes`)

Two groups of cards, Acquisition.com style (one image, one title, one line, one button each):

- **Coaching programmes:** Steve guides a business owner through putting AI into their business.
- **Productised AI builds:** one named problem, fixed scope, fixed price, fixed delivery time (for example, a missed-enquiry responder or a client-chasing automation). Only show builds Steve has actually defined.

**Each card has a status:**

- **Coming soon:**
  - button "Register interest" (email form, Kit tag `interest-[slug]`);
  - the interest count is recorded in D1 as demand data.
- **Live, buy online:** price (labelled clearly), button → Stripe Checkout.
- **Live, apply:** button "Apply" → short form + booking calendar, for programmes that need a call first.

**At launch, every card is "Coming soon"** until Steve defines it. Steve supplies names, descriptions and prices; never invent them.

**Above the cards:** "Not sure which fits? Start with the free AI assessment."

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
| H3 | Full Assessment section visual | 1200 × 900 | A premium printed report lying on a dark desk, gold light raking across its cover, blank cover (no text), shallow depth of field, #0B0B0D background, warm gold highlights #E3B341 |
| H4 | Data-safety section visual | 1200 × 900 | A softly glowing gold padlock made of light lines over an abstract dark network, #0B0B0D background, gold #E3B341 lines, subtle blue-grey secondary light at 10%, cinematic, minimal |
| H5 | Video thumbnail template background | 1280 × 720 | Dark cinematic gradient, #0B0B0D to #17181C, gold light leak from the right edge, space on the left two-thirds for Steve's cut-out photo and up to 4 words added in code |
| H6 | Programme card images (one per programme when defined) | 1200 × 900 | Brief per programme when Steve defines it |

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
- returns **structured JSON** (data in a fixed format the page can read): score, score meaning, 3 quick wins (problem, fix, tool, effort, estimated hours saved per week, one-line reasoning), and a list of what it couldn't verify.

**Score rubric** (drafted for Steve to approve; the model scores each 0–20):

| Area | What it looks at |
|---|---|
| Enquiry handling | How enquiries come in and how fast they're answered |
| Repetitive admin | Admin load for this business type and team size |
| Follow-up | Follow-up and repeat business |
| Content and marketing | Marketing and content workload |
| Current AI use | How much AI and automation the business already uses (inverted: less use = more opportunity) |

**Rules:**

- Every time estimate is labelled "estimate" with its reasoning.
- No promises of results, no money figures for income.
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
7. Next step: the £997 Full AI Assessment (link), with the credit guarantee

**Part B – for Steve only (never sent to the prospect):**

- fit score and why;
- which offer fits (Full Assessment, a productised build, or coaching);
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
| 0 | Your result + link |
| 2 | One quick win explained in more depth, with a build-log video |
| 5 | Full audit sent by Steve (manual) |
| 7 | The £997 Full Assessment: what's in it, and the credit |
| 14 | A real build story from the blog + free AI group link |

No fake deadlines.

---

## 10. Offers on the site

### 10.1 Full AI Assessment – £997 (test price)

**Draft of what's included, for Steve to confirm or change before launch:**

- 60-minute video call with Steve to map how the business runs
- A review of the business's processes, tools and marketing
- A written report: every place AI can save time or bring in customers, each with the tool, the cost and the effort
- A prioritised build plan: what to do first, second and third
- Delivered within [X] working days of the call

**Guarantee:** the £997 is credited in full against any productised build or coaching programme bought within [X] days.

**Payment:**

- Stripe Checkout, one payment.
- **VAT:** ask Steve whether he is VAT-registered. If he is, the page must say whether £997 includes VAT.
- Terms state the service is for businesses.

### 10.2 Programmes and builds

Defined by Steve later (section 7.5). Each is added by creating one content file and pasting its Stripe price ID.

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
  - Organization, Person (Steve), Article, BreadcrumbList, FAQPage, VideoObject, Service (Full Assessment), ItemList on hubs.
- Category hub pages linking to every post in the topic.
- Breadcrumbs, related posts, a redirects file so renamed pages never break.
- 404 page with search and popular posts.
- Descriptive image file names and alt text.
- Result pages and `/full-assessment/booked` set to noindex (hidden from search engines).
- Submit the sitemap in Search Console at go-live.

---

## 13. Tracking and learning from data

### 13.1 Events logged to D1

| Event | When |
|---|---|
| `hero_form_start` | Hero form started |
| `assessment_step_1` / `assessment_step_2` / `assessment_step_3` | Each form step completed |
| `result_viewed` | Result page viewed |
| `full_assessment_click` | £997 button clicked (with which page it was on) |
| `checkout_started` / `purchase_completed` | From the Stripe webhook |
| `call_booked` | Call booked |
| `programme_interest` | Register interest, by programme |
| `newsletter_signup` | Newsletter sign-up |

Each event is stored with source, UTM tags and page.

### 13.2 Weekly loop

1. A GitHub Action pulls Search Console, Cloudflare and D1 data weekly into `data/weekly/YYYY-MM-DD.json`.
2. `/weekly-review` writes `reports/weekly-YYYY-MM-DD.md`:
   - **funnel numbers:** visits → assessments started → completed → £997 bought, this week vs the last 4 weeks;
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
- **£997 price test:** the price is one setting in one file. Change it, and every page updates.

---

## 14. Running costs

All prices below must be re-checked at setup. Figures from v1.0 were checked 6 Oct 2026.

| Item | Cost | Confidence |
|---|---|---|
| Cloudflare hosting, D1, Turnstile, analytics | £0 on free plan | Moderate – check limits |
| GitHub | £0 | High |
| Kit | £0 to start; sequences need the paid Creator plan (listed at $33/month on 6 Oct 2026) | Verify |
| Resend | £0 up to 3,000 emails/month (6 Oct 2026) | Verify |
| Stripe | 1.5% + 20p per standard UK card payment (6 Oct 2026); about £15 on a £997 sale | Verify |
| Anthropic API | **Estimate: roughly $0.20–$0.50 per instant result plus $0.20–$0.50 per full audit draft.** Reasoning: a few page reads and searches each, at Sonnet pricing checked 6 Oct 2026. Set a monthly spend limit in the Anthropic Console | Low–moderate; measure in Phase 4 |
| Google Workspace (info@) | Check UK price | Not confirmed |
| Higgsfield | Credits per generation; check balance and cost before each | Not confirmed |
| Post drafting | Uses Steve's Claude plan in Claude Code | – |

---

## 15. Build phases

Stop after each phase, show Steve the result, and wait for approval.

**Phase 0 – Setup** (guide Steve step by step)

- Check Node.js and git; install if missing, explaining each command.
- Steve creates GitHub and Cloudflare accounts. Connect the repo to Cloudflare.
- Create the Astro project, `CLAUDE.md`, folder structure, `.env.example`, `.gitignore`.
- **Done when:** a "hello" page is live on a free Cloudflare preview address.

**Phase 1 – Design system and Home**

- Tokens, fonts, components (section 6), header, footer.
- Home page (7.1) with all three headline options switchable.
- The calculator.
- Placeholder visuals until the Higgsfield assets are approved.
- Write the Higgsfield briefs for H1–H5 and present them to Steve for approval and credits.
- **Done when:** Steve approves the look on his phone and desktop.

**Phase 2 – Free assessment and instant result**

- `/assessment` form → D1 + Turnstile.
- Anthropic instant result (9.1) → result page (7.3).
- Result email via Resend.
- Kit sign-up with consent.
- Event tracking (13.1).
- Steve sets an Anthropic spend limit first.
- **Done when:** Steve submits a test assessment for a real local business and sees a sensible result in under 60 seconds, and gets the email.

**Phase 3 – £997 checkout and full audit**

- `/full-assessment` page.
- Stripe Checkout (test mode first) + webhook.
- `/full-assessment/booked` with the booking calendar.
- Full audit draft emailed to Steve (9.2).
- `/test-assessment`, `/improve-audit-prompt`.
- **Done when:** a test purchase in Stripe test mode records in D1, books a call and emails Steve, and a full audit draft arrives in Steve's inbox.

**Phase 4 – Blog and content engine**

- Content collections and schemas, blog index, post page, category hubs, Pagefind search.
- Share images, all SEO items (section 12).
- `inbox/`, `proof-bank/`, `topics.csv`, templates, slash commands (11.7), `/drafts` page, daily scheduled rebuild.
- Kit follow-up emails (9.3) drafted for approval.
- Interview Steve to fill the first 5–10 proof-bank entries.
- Draft the first 7 posts (at least 3 from his material).
- **Done when:** Steve can drop a transcript in `inbox/`, run one command, review the draft and schedule it.

**Phase 5 – Programmes, About and legal**

- `/programmes` with "Coming soon" cards and register-interest.
- `/programmes/[slug]`.
- `/about` (interview Steve).
- Privacy, cookies and terms pages drafted for Steve to check (B2B terms for the £997 service).
- **Done when:** a register-interest test lands in Kit and D1.

**Phase 6 – Go live**

- info@ mailbox records.
- DNS move from GoDaddy to Cloudflare, step by step, with email records preserved.
- Connect aigrowthsystems.co.uk with HTTPS; redirect www to non-www.
- Switch Stripe to live mode.
- Search Console + sitemap; Cloudflare Web Analytics.
- Final mobile speed check.
- **Done when:** the site is live on the real domain, email still works, a real £1 test payment works and is refunded, and the sitemap is accepted.

**Phase 7 – Learning loop**

- Weekly data pull + `/weekly-review` (section 13).
- **Done when:** the weekly pull runs on its own and produces a report.

---

## 16. Rules that never change

- Never invent a price, statistic, case study, testimonial, client name, URL or result.
- Prices shown are tests. No fake urgency, no fake scarcity, no countdowns, no "someone just bought" pop-ups, no income claims.
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
| 1 | Which hero headline (A, B or C) launches first? (All three will be tested) | 1 |
| 2 | 2–3 real photos of you (headshot + working at your desk) | 1 |
| 3 | Instant result: how many working days until your full audit arrives? | 2 |
| 4 | What's included in the £997 Full Assessment (confirm or change 10.1), and how many working days to deliver it? | 3 |
| 5 | Credit guarantee window: how many days after the £997 can they use the credit? | 3 |
| 6 | Are you VAT-registered? Does £997 include VAT? | 3 |
| 7 | Do you also want a "free 15-minute call" option on the result page, or purchase only? | 3 |
| 8 | Booking tool: Google Workspace appointment schedule or Cal.com? | 3 |
| 9 | Data-safety claims: which tools and practices do you actually use with client data? (Every claim must be true) | 1 |
| 10 | Business legal details for the footer and terms: legal name, company number (if a limited company), address | 5 |
| 11 | First programmes and builds: names, one-line descriptions, prices, buy-online or apply | 5 |
| 12 | Current name of the free Skool group | 1 |
| 13 | YouTube channel and LinkedIn links for the About page | 5 |

---

## 18. Changes from v1.0

- **Pages:** cut to three main pages (Home, Programmes, Blog) plus the supporting pages they need. Removed the tools directory, `/videos`, `/start-here`, `/community` and digital products.
- **Design:** changed from "dark/gold inspired by jointherealworld.com" to a Higgsfield-style dark AI product look with gold, The Real World's cinematic video cards, and Acquisition.com's simple structure. New fonts: Space Grotesk headlines (uppercase), Inter body.
- **Free assessment:** now gives an instant AI score and top 3 quick wins on screen. Steve's reviewed full audit follows. The "never auto-send" rule now covers the full audit only.
- **£997 Full AI Assessment** added, sold online from the result page and its own page, with the fee credited against a build or programme.
- **Programmes page** for coaching programmes and productised builds. No training courses.
- **Content:** daily (one post a day), not two. Two industry-page templates and a data-safety category added from the competitor research.
- **Visuals:** Higgsfield asset list with approval rule.
- **Tracking:** a full funnel event log, headline A/B/C testing and a one-setting price test.
