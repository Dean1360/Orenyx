/** Orenyx Voice Dispatch — content for the dedicated product page on the AI Engine site. */

export const voiceHero = {
  title: 'Orenyx Voice Dispatch',
  lead: 'The dispatch-only tier of Orenyx AI Engine — calls answered, jobs booked, techs routed, payments collected, and follow-ups handled. For companies that want dispatch handled, not everything automated.',
};

export const callFlow = {
  eyebrow: 'How it works',
  title: 'From ringing phone to dispatched technician, in one call.',
  steps: [
    {
      title: 'Call comes in',
      body: 'The AI voice agent answers instantly, day or night — no queue, no voicemail.',
    },
    {
      title: 'Job details captured',
      body: 'Name, issue, location, and urgency are captured in a natural conversation and checked against your service rules.',
    },
    {
      title: 'Technician matched',
      body: 'The job is matched to the right technician by region and availability, with an estimated ETA.',
    },
    {
      title: 'Ticket dispatched',
      body: 'A ticket is created, the technician is notified, and the customer gets an automated status update.',
    },
  ],
};

export const voiceFeatures = [
  {
    name: 'Call answering',
    body: 'Every inbound call is answered instantly, including nights and weekends — no hold music, no voicemail, no missed jobs after hours.',
  },
  {
    name: 'Job booking',
    body: 'Jobs are booked using your existing intake rules and service area, with no re-entry and no dropped leads.',
  },
  {
    name: 'Technician matching',
    body: 'Technicians are matched and dispatched automatically based on region, availability, and skill.',
  },
  {
    name: 'Ticket dispatch',
    body: 'A dispatch ticket is opened automatically the moment a technician is matched, with the customer notified in the same call.',
  },
];

export const complianceNote = {
  title: 'Built with call-compliance rules in mind',
  body: 'Call handling is designed around documented consent and Do-Not-Call practices under TCPA. Compliance controls that apply to your account are detailed in our Terms of Service.',
};

export const voiceDemoVideo = {
  status: 'coming-soon' as const,
  label: 'Demo video coming soon',
  body: 'A short walkthrough of the call flow above — phone rings, the AI answers, the job gets booked, and a technician is dispatched — will go here once it\u2019s produced.',
};

export const voicePricingNote = {
  eyebrow: 'Pricing',
  title: 'Priced by call volume, not usage tiers.',
  lead: 'Orenyx Voice Dispatch is priced separately from the Full Automation Engine plans above — by how many calls you handle each month, not by API or bot usage.',
};
