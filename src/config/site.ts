// Site-wide wording and switches that are not prices (prices live in offer.ts).

export const site = {
  name: 'AI Growth Systems',
  email: 'info@aigrowthsystems.co.uk',
  auditName: 'Free AI Growth Audit',
  auditUrl: '/assessment',
  setupUrl: '/ai-business-setup',

  // The free AI group (Skool). Its name is confirmed with Steve before it is written anywhere.
  groupUrl: 'https://www.skool.com/we-teach-marketing-5052',

  // true while the site is being reviewed: shows dashed "Draft" notes on anything
  // that needs Steve's OK or real content. Must be false before go-live.
  showDraftNotes: true,

  nav: [
    { label: 'AI Business Setup', href: '/ai-business-setup' },
    { label: 'Blog', href: '/blog' },
  ],

  // Home page headline test. To preview one, add ?h=a, ?h=b or ?h=c to the address.
  defaultHeadline: 'a' as 'a' | 'b' | 'c',
  headlines: {
    a: 'AI set up in your business in 6 weeks.',
    b: 'You don’t need to learn AI. You need it set up for you.',
    c: 'Every enquiry you answer late is one a competitor can answer first.',
  },

  heroSub:
    'Tell us about your business. Get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve.',
};
