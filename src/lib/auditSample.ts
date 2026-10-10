// A sample audit. Used on the result page in review mode, and when no AI key is set.
// It is for an invented business ("a small plumbing firm") and is always labelled as a sample.
import type { AuditResult } from './audit';

/** Shown when no AI key is set, so the whole journey can be tested without spending anything. */
export const sampleResult: AuditResult = {
  businessSummary:
    'Sample only: an invented plumbing and heating firm with four staff, serving homeowners in one town. A real audit describes your business here, from your website and answers.',
  score: 72,
  scoreMeaning: 'Lots of room for AI to help you grow',
  scoreBreakdown: [
    { area: 'Enquiries and sales', score: 17, why: 'Sample: the contact page has a form and a phone number, with no way to book.' },
    { area: 'Repetitive admin', score: 14, why: 'Sample: quotes and invoices were named as the biggest use of time.' },
    { area: 'Follow-up and repeat business', score: 15, why: 'Sample: nothing on the site invites past customers back.' },
    { area: 'Marketing and content', score: 10, why: 'Sample: the last news post is over a year old.' },
    { area: 'AI use today', score: 16, why: 'Sample: the answers say AI has only been tried once or twice.' },
  ],
  wins: [
    {
      title: 'Replying to enquiries',
      evidence: 'Sample: your contact page says “we aim to reply within 2 working days”, and the only ways in are a form and a phone line.',
      problem: 'Enquiries wait until you’re off a job, and some go cold before you reply.',
      fix: 'An AI assistant drafts a reply to every form enquiry within minutes, asks the two questions you always ask, and offers a call-back time.',
      tool: 'An AI assistant connected to your inbox and website form',
      helpsWith: 'New customers',
      effort: 'Low',
      hoursSavedPerWeek: 3,
      reasoning: 'Sample figure only.',
    },
    {
      title: 'Following up quotes',
      evidence: 'Sample: you told us quotes take the most time, and that nobody chases them once they’re sent.',
      problem: 'Quotes go out, then nobody chases them.',
      fix: 'Every quote gets a follow-up message a few days later, written in your voice.',
      tool: 'An automation tool connected to your quoting or email system',
      helpsWith: 'Quotes turned into work',
      effort: 'Low',
      hoursSavedPerWeek: 2,
      reasoning: 'Sample figure only.',
    },
    {
      title: 'Chasing invoices',
      evidence: 'Sample: you named late payments under “anything else”.',
      problem: 'Late payments get chased when you remember.',
      fix: 'Polite reminders go out on their own when a payment is late.',
      tool: 'The reminder feature in your accounting software',
      helpsWith: 'Getting paid sooner',
      effort: 'Medium',
      hoursSavedPerWeek: 1,
      reasoning: 'Sample figure only.',
    },
  ],
  example: {
    title: 'Sample: a reply to a boiler enquiry',
    customerMessage: 'Hi, our boiler keeps losing pressure. Can someone come and look this week? We’re in the town centre.',
    reply:
      'Hi, thanks for getting in touch, and sorry to hear about the boiler. Losing pressure is something we see a lot and can usually sort in one visit. ' +
      'Could you tell me the make of the boiler and roughly how old it is? One of the team will then confirm the earliest slot this week and call you to book it in.',
    note: 'Sample: a real example uses the services and tone from your own website, and never invents a price or a time slot.',
  },
  firstStep:
    'Start with enquiries. Write down the five questions customers ask most, and your usual answers. That’s what the assistant learns from.',
  basedOn: ['This is a sample. A real audit lists the pages we read and the public information we found.'],
  confidence: 'Low',
  couldNotVerify: ['This is a sample result. No AI key is set, so nothing was analysed.'],
};
