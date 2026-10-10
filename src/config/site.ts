// Site-wide wording and switches that are not prices (prices live in offer.ts).

export const site = {
  name: 'AI Growth Systems',
  email: 'info@aigrowthsystems.co.uk',
  auditName: 'Free AI Growth Audit',
  auditUrl: '/assessment',
  // The ad landing page: no menu, only the audit. Hidden from Google.
  landingUrl: '/free-audit',
  setupUrl: '/ai-business-setup',

  // The free AI group (Skool). Its name is confirmed with Steve before it is written anywhere.
  groupUrl: 'https://www.skool.com/we-teach-marketing-5052',

  // true while the site is being reviewed: shows dashed "Draft" notes on anything
  // that needs Steve's OK or real content. Must be false before go-live.
  showDraftNotes: true,

  nav: [
    { label: 'AI Business Setup', href: '/ai-business-setup' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ],

  // Headline test for the landing page and home page. To preview one, add ?h=a, ?h=b or ?h=c to the address.
  defaultHeadline: 'a' as 'a' | 'b' | 'c',
  headlines: {
    a: 'Find out where AI fits in your business. Free, in minutes.',
    b: 'See where AI could save you hours every week.',
    c: 'Your business, scored for AI. Top 3 quick wins on screen in minutes.',
  },

  heroSub:
    'Answer a few quick questions about your business. Get your AI score and your top 3 quick wins on screen in minutes, and by email.',
  auditSmallPrint: 'Free. About 2 minutes. UK businesses.',
};
