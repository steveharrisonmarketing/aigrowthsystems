# AI Growth Systems website – rules for every session

Owner: Steve Harrison, AI Growth Systems (aigrowthsystems.co.uk).
Full brief: `docs/BRIEF.md` (v2.2, 10 October 2026). Read the relevant section before starting any phase.
This file captures the rules from brief sections 0, 4, 6, 9 and 16. If this file and the brief disagree, ask Steve.

**The funnel (v2.2):** Facebook ad → Free AI Growth Audit (instant score + top 3 quick wins, then Steve's reviewed audit) → free 30-minute call → AI Business Setup (6 weeks, done-for-you + coaching) → AI Partner (optional, monthly). The three main pages are Home, `/ai-business-setup` and Blog. Earlier offers (the £997 Full AI Assessment, AI Integration, the care plan, the Programmes page, online checkout) are gone; their addresses redirect to `/ai-business-setup`. Visitors always see the name "Free AI Growth Audit"; the page addresses stay `/assessment`.

**Build order:** design first. The Astro project, design system, Home and `/ai-business-setup` are built and reviewed on Steve's computer; GitHub and Cloudflare set-up follows.

## 1. How to work with Steve (brief section 0)

Steve has never built a website in code before and runs the business part-time (10–20 hours a week).

- **Plain English.** Before each step, say what you're about to do and why in one or two sentences. Explain any technical word the first time you use it.
- **One phase at a time.** Build the phases in brief section 15 in order. At the end of each phase, show Steve what was built and how to look at it, then **stop and wait for his approval** before starting the next phase.
- **Plan mode for big steps.** Show the plan, get a yes, then build.
- **Commit to git after every working change** with a clear message, so anything can be undone.
- **Secrets stay out of the code.** API keys go in `.env` (local, never committed) and Cloudflare secrets (live site). Tell Steve exactly where to paste each key. Never print a key back in chat.
- **Ask before anything that costs money:** paid plans, paid APIs, upgrades, and **every Higgsfield generation**. Steve approves every spend.
- **Verify before stating.** Any present-day fact (prices, plan limits, API details, tool features) must be checked against the official docs or pricing page at the time, not assumed. Items marked *(verify)* in the brief were not confirmed when it was written.
- **UK English** throughout the site and all copy.
- **Open questions** for Steve are in brief section 17. Ask each one at the phase where it's needed, not all at once.
- Read `LEARNINGS.md` (once it exists) before writing any new post, headline or call to action.

## 2. Rules that never change (brief section 16)

- Never invent a price, statistic, case study, testimonial, client name, URL or result.
- Prices shown are tests. No fake urgency, no fake scarcity, no countdowns, no "someone just bought" pop-ups, no income claims.
- Never promise more enquiries, sales, income or results. Nothing is presented as a guaranteed outcome; the only guarantee is about delivery and use, word for word: "Your first AI system is live by week 3, or I keep working free until it is. If by week 6 you're not using AI every week in at least 3 tasks, I'll coach you 1:1 until you are."
- Every price is a test kept in one settings file (`src/config/offer.ts`).
- Start dates and places left are real numbers typed into the settings file by Steve. Never invent them; hide the block if they're blank.
- The founding group price is labelled honestly: "founding group – first 6 businesses, in return for sharing results".
- Nothing non-essential (including the Meta pixel) loads before cookie consent.
- Instant results are automatic. **The full audit is never sent without Steve's approval.**
- Every blog post has something original from Steve. No generic AI tutorials.
- Every Higgsfield generation is approved by Steve first (brief, prompt, model and estimated credits shown before generating).
- Plain English. UK spelling. Avoid: leverage, synergy, utilise, facilitate, optimise.
- Keep it simple: fewest tools, fewest steps. If something needs a manual to explain, redesign it.
- Runnable by one person, part-time.
- Steve reviews everything before it goes live. Nothing is described as "finished"; it's "ready for your review".

Related copy rules from the brief:

- It is consulting, not training. Stand-alone courses and general AI training are not sold. AI Business Setup is AI set up in the business, with coaching to use it; never describe it as a course.
- Never claim Steve has run marketing for hundreds of businesses.
- The Skool group is called "free AI group" on the site. Confirm its current name with Steve before writing the name anywhere. It appears in the footer and thank-you page only.
- Testimonials, the stats bar and "What I'm seeing in audits" stay hidden until real data exists. Never type numbers in by hand.
- The calculator shows the value of enquiries the visitor already has at risk, from their own numbers, labelled "An estimate from your own numbers — not a promise of results." It never promises savings, sales or income.
- Every data-safety claim must be confirmed true by Steve.

## 3. Tech stack (brief section 4)

Use these tools and no others without asking Steve. Items marked *(verify)* must be checked against official docs before relying on them.

| Job | Tool |
|---|---|
| Site framework | Astro + Tailwind CSS. Content in Markdown. JavaScript "islands" only where needed |
| Animation | CSS animations first; Motion (motion.dev) only where CSS can't do it *(verify package name)* |
| Code storage | GitHub, private repo. Pushes trigger deploys |
| Hosting | Cloudflare – current recommended way to host Astro with server functions (Workers with static assets or Pages; *verify which*) |
| Database | Cloudflare D1 (submissions, results, report drafts, bookings, register-interest sign-ups, events) |
| Spam protection | Cloudflare Turnstile |
| AI for results and reports | Anthropic API, current Sonnet model, with web search and web fetch tools |
| Email list | Kit (sequences need a paid plan; *verify price*) |
| Transactional email | Resend *(verify free-plan limits)* |
| Payments | Stripe invoices sent by Steve after the discovery call. No online checkout and no Stripe webhook for now; keep buttons reading their destination from the settings file so payment can be added later |
| Booking calls | Cal.com free plan connected to Steve's Google Calendar *(recommended; confirm on official docs at the start of Phase 3)*; alternative Google Workspace appointment schedule |
| Ad tracking | Meta pixel + Meta Conversions API, only after cookie consent *(verify Meta's docs and UK consent rules, report to Steve, and get his yes before building)* |
| Mailbox | info@aigrowthsystems.co.uk on Google Workspace Business Starter |
| Analytics | Cloudflare Web Analytics + Google Search Console + our own D1 event log (no analytics cookies). The site still has a cookie consent banner because of the Meta pixel |
| Site search | Pagefind |
| Video | YouTube for blog videos (click-to-load via youtube-nocookie); Cloudflare Stream or self-hosted MP4/WebM for short silent hero loops (self-hosted fine under ~3 MB) |
| Visual assets | Higgsfield – paid credits, Steve approves every brief and prompt first |

**Domain:** registered at GoDaddy and stays there. At go-live, DNS moves to Cloudflare by changing nameservers. **Recreate the email records (MX, SPF, DKIM, DMARC) for info@ in Cloudflare before switching**, or email will break.

**One settings file:** `src/config/offer.ts` holds the AI Business Setup price (£2,497 test price), instalments (3 × £897), founding group price (£1,997) with its on/off switch and label, group cap (6), next group start date, places left, programme length (6 weeks), guarantee week (3), AI Partner price (£297/month test price) and the booking link. Every page and email reads from it. Never type these values anywhere else.

## 4. Design system (brief section 6)

**Direction:** dark, cinematic, premium. Higgsfield's dark product style + The Real World's gold buttons and cinematic video thumbnails + Acquisition.com's simplicity (one idea per section, lots of space).

### Colour tokens

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
| `--gold-glow` | `0 0 32px rgba(227,179,65,0.35)`; hover `0 0 48px rgba(227,179,65,0.5)` | Button glow |
| `--success` | `#22C55E` | Form success |
| `--error` | `#EF4444` | Form errors |

All text must pass WCAG AA contrast. Check `--muted` and `--subtle` on `--card` and lighten them if they fail.

### Type

- **Headlines:** Space Grotesk 700, uppercase, letter-spacing −0.04em, line-height 1.0–1.05. H1 64–80px desktop / 40–44px mobile. H2 40–48px desktop / 30–32px mobile.
- **Body:** Inter 400/500/600, 17–18px, line-height 1.65, colour `--muted`. Blog text: Inter 18px, max width ~720px, `--text` at 90%.
- **Big numbers:** Space Grotesk 700, 72–96px, filled with `--gold-gradient` via background-clip.
- Self-host both fonts via Fontsource. No calls to Google Fonts.

### Components

- **Eyebrow pill** above every H2: 12px Inter 600, gold text on `rgba(227,179,65,0.10)`, 1px gold border at 30%, fully rounded, padding 4px 10px.
- **Primary button:** `--gold-gradient` background, `#0B0B0D` text, Inter 600 16–18px, pill, padding 16px 28px, `--gold-glow`. Hover: brighter glow and 1px lift. At least 48px tall on mobile.
- **Secondary button:** transparent, 1px `--border`, white text, pill. Hover: border turns gold.
- **Cards:** `--card`, 1px `--border`, 20px radius, 24–32px padding. Optional top highlight (1px white at 6%).
- **Video card:** 16:9 thumbnail, 16px radius, centred white circular play button, title underneath. Nothing loads from YouTube until the click.
- **Section rhythm:** 120–160px vertical padding desktop, 72–96px mobile. Alternate `--bg` and `--bg-raised`. Thin gold gradient dividers sparingly.
- **Hero frame:** hero video inside a 24px rounded frame with a dark gradient over it so white text stays readable.

### Motion

- Sections fade and rise 16px into view once. Numbers count up when visible. Glow pulse on the hero button only.
- **Respect `prefers-reduced-motion`:** all animation off.
- No scroll-jacking. No parallax that slows phones.

### Logo, imagery, share images

- **Logo:** text wordmark "AI GROWTH SYSTEMS" in Space Grotesk 700 with "GROWTH" in `--gold-gradient`, until Steve supplies one.
- **Photos of Steve:** real photos only.
- **Share (Open Graph) images:** auto-generated per page, 1200 × 630, `#0B0B0D` background, gold eyebrow pill, page title in Space Grotesk uppercase, wordmark bottom left.
- Generated visuals: no fake people presented as clients, no readable text, no logos. All text is added in code.

### Performance

- Hero video under 3 MB, muted, looping, `playsinline`, with a poster image. On mobile with data saver on, show only the poster.
- All images through Astro's image component (WebP/AVIF, correct sizes).
- JavaScript only on the calculator, forms, result page and video cards.
- Target good Core Web Vitals on mobile. Check with PageSpeed Insights at the end of each phase.

## 5. Free assessment engine (brief section 9)

### Instant result (automatic)

- A server function calls the Anthropic API with the form answers. The model uses web fetch on the visitor's site (home, services, about, contact) and web search for public information, and returns **structured JSON**: score, score meaning, 3 quick wins (problem, fix, tool, effort, estimated hours saved per week, one-line reasoning), and a list of what it couldn't verify.
- **Score rubric** (each area 0–20, total 0–100; Steve approves the rubric): enquiry handling, repetitive admin, follow-up, content and marketing, current AI use (inverted: less use = more opportunity).
- One of the top 3 quick wins always assesses enquiry handling, using the form answers on how enquiries arrive and how fast they're answered.
- The result ends with "Your AI setup plan": the first automation (default: the Enquiry Responder) and the 3 assistants (customer replies, marketing, quotes from voice notes), each tailored to the visitor's answers. Then "Book your free call" and a link to `/ai-business-setup`.
- Every time estimate is labelled "estimate" with its reasoning.
- No promises of results. No money figures for income. Never promise more enquiries or sales.
- If the website can't be read, say so and base the result on the form answers.
- If the call fails or takes over 90 seconds, show a friendly message and email the result when it's ready.
- Save every result to D1.
- Protect API spend: Turnstile on the form, one assessment per email per 30 days, and a monthly spend limit set in the Anthropic Console.

### Full audit (Steve reviews before sending)

- Runs in the background after the instant result. The draft is emailed **to Steve only**, subject `Audit draft: [Business] – fit: High/Medium/Low`.
- **Part A – client-facing draft:** what the business does and how it makes money; where time and money are being lost; specific AI fixes with named tools and real costs (searched, with the date checked); rough expected impact labelled as an estimate with reasoning; what Steve would build first and why; anything that couldn't be verified; next step (book the free 30-minute call).
- **Part B – for Steve only, never sent to the prospect:** fit score and why; which automation to build first; likely objections; questions for a call; red flags.
- **Nothing in Part A or B is ever sent automatically.** Steve always edits and approves.
- Steve's final versions go in `audits/final/`. `/improve-audit-prompt` compares drafts with finals and suggests changes to the instructions.

### Follow-up emails (Kit)

- Only for people who ticked consent.
- Day 0 result + booking link; day 2 a build video of one quick win (text only until Steve has a real video); day 4 what happens on the call; day 7 AI Business Setup + guarantee + next start date; day 14 a real build story + free AI group link.
- No fake deadlines. Steve approves every email before it's used.
