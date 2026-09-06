/** Status page copy — simple static status page, no live monitoring yet. */

export const statusIntro =
  'A quick look at the services behind Orenyx AI Engine™. This page is updated manually for now — automated, real-time monitoring is on the roadmap as we scale.';

export type StatusService = { name: string; description: string };

export const statusServices: StatusService[] = [
  {
    name: 'Orenyx Voice Dispatch',
    description: 'Call answering, IVR, and call routing.',
  },
  {
    name: 'Orenyx AI Engine',
    description: 'Dispatch, technician routing, and automation.',
  },
  {
    name: 'Payments',
    description: 'Stripe-connected billing, deposits, and payouts.',
  },
  {
    name: 'Dashboard & API',
    description: 'Tenant dashboard, integrations, and API access.',
  },
];

export const statusContact =
  "Experiencing an issue that isn't reflected here? ";
