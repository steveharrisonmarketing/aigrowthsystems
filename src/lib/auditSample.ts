// A sample audit. Used on the result page in review mode, and when no AI key is set.
import type { AuditResult } from './audit';

/** Shown when no AI key is set, so the whole journey can be tested without spending anything. */
export const sampleResult: AuditResult = {
  score: 72,
  scoreMeaning: 'Lots of room for AI to help you grow',
  wins: [
    {
      title: 'Replying to enquiries',
      problem: 'Enquiries wait until you’re free, and some go cold before you reply.',
      fix: 'An AI assistant answers every enquiry within minutes and books the follow-up.',
      tool: 'An AI assistant connected to your inbox and website form',
      helpsWith: 'New customers',
      effort: 'Low',
      hoursSavedPerWeek: 3,
      reasoning: 'Sample figure only.',
    },
    {
      title: 'Following up quotes',
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
      problem: 'Late payments get chased when you remember.',
      fix: 'Polite reminders go out on their own when a payment is late.',
      tool: 'The reminder feature in your accounting software',
      helpsWith: 'Getting paid sooner',
      effort: 'Medium',
      hoursSavedPerWeek: 1,
      reasoning: 'Sample figure only.',
    },
  ],
  firstStep:
    'Start with enquiries. Write down the five questions customers ask most, and your usual answers. That’s what the assistant learns from.',
  couldNotVerify: ['This is a sample result. No AI key is set, so nothing was analysed.'],
};
