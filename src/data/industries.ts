// Industry landing variants. Used when an ad link ends in ?for=builders (etc.).
// heroSub    – replaces the subheadline in the home page hero.
// problemLine – replaces one line of the problem section on /ai-business-setup.
// Edit the wording here. Never add a statistic or a claim about results.
// With no ?for=, or an unknown value, the general wording shows.

export const industries: Record<string, { name: string; heroSub: string; problemLine: string }> = {
  builders: {
    name: 'Builders',
    heroSub:
      'Built for building firms. Tell us about your business and get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve.',
    problemLine: 'Enquiries arrive while you’re on site, and the quotes wait until the evening.',
  },
  plumbers: {
    name: 'Plumbers',
    heroSub:
      'Built for plumbing and heating firms. Tell us about your business and get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve.',
    problemLine: 'Calls come in while you’re on a job, and ringing back waits until you’re done.',
  },
  dentists: {
    name: 'Dentists',
    heroSub:
      'Built for dental practices. Tell us about your practice and get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve.',
    problemLine: 'New-patient enquiries arrive while the front desk is busy with the patients in front of them.',
  },
  'estate-agents': {
    name: 'Estate agents',
    heroSub:
      'Built for estate agents. Tell us about your agency and get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve.',
    problemLine: 'Valuation and viewing enquiries arrive in the evening and at weekends, when the office is closed.',
  },
  accountants: {
    name: 'Accountants',
    heroSub:
      'Built for accountancy practices. Tell us about your practice and get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve.',
    problemLine: 'Chasing clients for paperwork takes hours that nobody can bill for.',
  },
  salons: {
    name: 'Salons',
    heroSub:
      'Built for salons. Tell us about your salon and get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve.',
    problemLine: 'Messages and booking requests arrive while everyone has a client in the chair.',
  },
  gyms: {
    name: 'Gyms',
    heroSub:
      'Built for gyms and studios. Tell us about your gym and get your AI score and top 3 quick wins on screen in minutes — then a full audit reviewed by Steve.',
    problemLine: 'Membership enquiries arrive while the team is on the gym floor.',
  },
};

export const defaultProblemLine =
  'Enquiries arrive while you’re with a customer, on a job or off for the night.';
