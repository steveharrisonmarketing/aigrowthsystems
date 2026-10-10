// ─────────────────────────────────────────────────────────────────────────
// THE ONE SETTINGS FILE
// Every offer, price and number on the site is read from here.
// Change a value, save, and every page updates. All prices are tests.
// Rule: only real numbers. Leave a value as null and its line hides itself.
//
// For each offer:
//   enabled      true = shown on the site, false = hidden everywhere
//   buy          'online' = buy button, 'call' = "Book your free call", 'both' = both buttons
//   checkoutUrl  the Stripe payment link for that offer. While it is '' the
//                buy button is replaced by "Book your free call".
// ─────────────────────────────────────────────────────────────────────────

export type BuyMode = 'online' | 'call' | 'both';

export const offer = {
  // One-off session offered straight after the free audit.
  session: {
    enabled: true,
    name: 'AI Action Session',
    price: 297,
    minutes: 120,
    summary: 'A 2-hour one-to-one call where we show you how to put your audit into practice.',
    includes: [
      'A 2-hour one-to-one video call',
      'Your top 3 quick wins from the audit, worked through step by step',
      'A recording of the call to keep',
    ],
    buy: 'online' as BuyMode,
    checkoutUrl: '',
  },

  // The main offer.
  setup: {
    enabled: true,
    name: 'AI Business Setup',
    weeks: 6,
    callMinutes: 60,
    setupSessionMinutes: 90,
    price: 2497,
    instalments: { count: 3, amount: 897 },
    guaranteeWeek: 3,
    summary: 'AI set up in your business in 6 weeks. We build it for you, then coach you one-to-one to use it.',
    buy: 'both' as BuyMode,
    checkoutUrl: '',
    checkoutUrlInstalments: '',

    founding: {
      enabled: true, // true = show the founding client price, false = hide it
      price: 1997,
      places: 5,
      taken: null as number | null, // real number only, e.g. 2. null hides "X of 5 taken"
      label: 'Founding client price – for our first 5 clients, in return for sharing your results.',
      checkoutUrl: '',
    },
  },

  quickStart: {
    enabled: true,
    name: 'AI Quick Start',
    price: 997,
    guaranteeDays: 14,
    summary: 'One automation built for you and two coaching calls to get you using it.',
    includes: ['1 automation built for you', 'Your business brain set up', '2 × 45-minute one-to-one coaching calls'],
    buy: 'both' as BuyMode,
    checkoutUrl: '',
  },

  partner: {
    enabled: true,
    name: 'AI Partner',
    pricePerMonth: 297,
    summary: 'Monthly one-to-one support that keeps your AI working and adds to it. Cancel any time.',
    includes: [
      'Monitoring and fixes for your automations',
      'A monthly 45-minute one-to-one call',
      'Coaching to build one new AI agent a month',
      'Message support',
      'New templates as they’re released',
    ],
    buy: 'call' as BuyMode,
    checkoutUrl: '',
  },

  // Digital product, coming soon. The price stays hidden while comingSoon is true.
  starterKit: {
    enabled: true,
    comingSoon: true,
    name: 'AI Starter Kit',
    price: null as number | null,
    summary: 'Templates and recorded guides to set up the basics yourself.',
    includes: ['Templates', 'A business brain template', 'Recorded setup guides'],
    buy: 'online' as BuyMode,
    checkoutUrl: '',
  },

  // "We’re taking on N new clients this month." Off by default. Real number only.
  capacity: {
    enabled: false,
    newClientsThisMonth: null as number | null,
  },

  // Where "Book your free call" goes. Becomes the booking calendar later.
  bookingUrl: '/book',

  // Shown beside prices, e.g. 'No VAT to add.' Leave '' to show nothing.
  vatNote: '',
};

export const gbp = (n: number) => '£' + n.toLocaleString('en-GB');

export const instalmentTotal = offer.setup.instalments.count * offer.setup.instalments.amount;

export const guarantee =
  `Your first AI system is live by week ${offer.setup.guaranteeWeek}, or we keep working free until it is. ` +
  `If by week ${offer.setup.weeks} you’re not using AI every week in at least 3 tasks, we’ll keep coaching you one-to-one until you are.`;

export const quickStartGuarantee = `Live within ${offer.quickStart.guaranteeDays} days, or we keep working free until it is.`;

export const doneForYou = [
  { title: `${offer.setup.setupSessionMinutes}-minute one-to-one setup session`, text: 'We map how your business runs and what to set up first.' },
  { title: 'Business AI workspace', text: 'Set up for your business, with the data-safety settings switched on.' },
  { title: 'Your “business brain” document', text: 'Your services, prices, tone and common questions, written down so AI can use them.' },
  { title: '3 custom assistants', text: 'One for customer replies, one for marketing, one that turns voice notes into quotes.' },
  { title: '1 automation, built and live', text: 'By default: instant replies to enquiries, a follow-up, and a text back when you miss a call.' },
  { title: 'One-page staff AI policy', text: 'What your team can and can’t put into AI tools, on a single page.' },
];

export const weeks = [
  { n: 1, topic: 'AI workspace + business brain' },
  { n: 2, topic: 'Enquiries & follow-up' },
  { n: 3, topic: 'Marketing' },
  { n: 4, topic: 'Admin' },
  { n: 5, topic: 'Your team' },
  { n: 6, topic: 'Results + next 90 days' },
];
