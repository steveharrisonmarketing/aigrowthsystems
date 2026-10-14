// Site-wide wording and switches that are not prices (prices live in offer.ts).

export const site = {
  name: 'AI Growth Systems',
  url: 'https://aigrowthsystems.co.uk',
  founder: 'Steve Harrison',
  // Legal identity. Trading as a sole trader until a company is formed; update this and the footer,
  // privacy and terms pages together.
  legalName: 'Stephen Harrison',
  // Sole-trader status confirmed by Steve on 11 October 2026.
  tradingNote: 'Stephen Harrison trading as AI Growth Systems.',
  // Postal address: required by law on the site. Leave '' until it is confirmed; the footer then shows a draft note.
  postalAddress: '6 Glynde Avenue, Brighton, Sussex, BN2 8QR',
  // Pages listed in sitemap.xml. Stand-in pages are left out until they are real.
  sitemapPages: ['/', '/ai-business-setup', '/about'],
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

  // Kit (email list). Off until the Kit account and sign-up form are connected. While off, the
  // newsletter box and the "Register interest" form are hidden rather than left doing nothing.
  kitEnabled: false,

  // The cookie choice banner. Must be on before the Facebook pixel is added or any ads run.
  cookieBanner: true,

  nav: [
    { label: 'AI Business Setup', href: '/ai-business-setup' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ],

  // Headline test for the landing page and home page. To preview one, add ?h=a, ?h=b or ?h=c to the address.
  defaultHeadline: 'a' as 'a' | 'b' | 'c',
  headlines: {
    a: 'Find out where AI grows your business. Free, in minutes.',
    b: 'See where AI could save you hours every week.',
    c: 'Your business, scored for AI. Top 3 quick wins on screen in minutes.',
  },

  heroSub:
    'Answer a few quick questions & get your AI score and action report on screen in minutes.',
  auditSmallPrint: 'Free. About 2 minutes. UK businesses.',
};
