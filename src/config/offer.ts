// ─────────────────────────────────────────────────────────────────────────
// THE ONE SETTINGS FILE
// Every price, date and number of places on the site is read from here.
// Change a value, save, and every page updates. All prices are tests.
// Rule: only real numbers. Leave a value blank and its block hides itself.
// ─────────────────────────────────────────────────────────────────────────

export const offer = {
  setup: {
    name: 'AI Business Setup',
    weeks: 6,
    price: 2497,
    instalments: { count: 3, amount: 897 },
    groupCap: 6,

    founding: {
      enabled: true, // true = show the founding group price, false = hide it
      price: 1997,
      label: 'Founding group – first 6 businesses, in return for sharing results',
    },

    // Next group. Leave as '' and null until you have real values.
    nextGroupStart: '', // e.g. '2026-11-09'
    placesLeft: null as number | null, // e.g. 4

    guaranteeWeek: 3,
  },

  partner: {
    name: 'AI Partner',
    pricePerMonth: 297,
  },

  // Where "Book your free call" goes. Becomes the booking calendar in Phase 3.
  bookingUrl: '/book',

  // Shown beside prices once Steve confirms, e.g. 'Prices exclude VAT.'
  vatNote: '',
};

export const gbp = (n: number) => '£' + n.toLocaleString('en-GB');

export const instalmentTotal = offer.setup.instalments.count * offer.setup.instalments.amount;

// The guarantee, word for word from the brief (section 10.1).
export const guarantee =
  `Your first AI system is live by week ${offer.setup.guaranteeWeek}, or I keep working free until it is. ` +
  `If by week ${offer.setup.weeks} you're not using AI every week in at least 3 tasks, I'll coach you 1:1 until you are.`;

export const doneForYou = [
  { title: '90-minute 1:1 setup session', text: 'Steve maps how your business runs and what to set up first.' },
  { title: 'Business AI workspace', text: 'Set up for your business, with the data-safety settings switched on.' },
  { title: 'Your “business brain” document', text: 'What your business does, how you talk and how you work, written down so AI can use it.' },
  { title: '3 custom assistants', text: 'One for customer replies, one for marketing, one that turns voice notes into quotes.' },
  { title: '1 automation, built and live', text: 'By default the Enquiry Responder, so new enquiries get a fast reply and a follow-up.' },
  { title: 'One-page staff AI policy', text: 'What your team can and can’t put into AI tools, on a single page.' },
];

export const weeks = [
  { n: 1, topic: 'Workspace + business brain' },
  { n: 2, topic: 'Enquiries & follow-up' },
  { n: 3, topic: 'Marketing' },
  { n: 4, topic: 'Admin' },
  { n: 5, topic: 'Your team' },
  { n: 6, topic: 'Results + next 90 days' },
];

export const groupCallMinutes = 75;

export const partnerIncludes = [
  'Monitoring and fixes',
  'A monthly group call',
  'A monthly 30-minute 1:1',
  'One improvement or new assistant a month',
  'New templates',
];

export function nextGroupText(): string | null {
  const { nextGroupStart } = offer.setup;
  if (!nextGroupStart) return null;
  const d = new Date(nextGroupStart + 'T12:00:00');
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
