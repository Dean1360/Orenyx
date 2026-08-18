/**
 * Integrations copy — from the client Builder Packet, section 8.
 *
 * The native list is NOT repeated here — it reads from `ecosystem` in
 * content/site.ts, the same list the hero diagram and the marquee use, so the
 * product family can never say one thing on the home page and another here.
 * The packet named only four; the client has since confirmed seven.
 *
 * ⚠ The packet requires every integration to be labelled Live / Beta /
 * Roadmap and warns against "implying availability that doesn't exist yet" —
 * but supplies no statuses. Every `status` is therefore null and renders as a
 * placeholder. Filling them in with guesses is the exact failure the packet
 * is guarding against.
 */

import { ecosystem } from './site';

export type Status = 'Live' | 'Beta' | 'Roadmap';

export type Integration = {
  name: string;
  status: Status | null;
};

export const statusLegend: { status: Status; meaning: string }[] = [
  { status: 'Live', meaning: 'Available today on the plans listed.' },
  { status: 'Beta', meaning: 'Usable, with limited support while it stabilises.' },
  { status: 'Roadmap', meaning: 'Committed but not yet shipped.' },
];

export const nativeBlock = {
  heading: 'Orenyx Ecosystem Integrations',
  lead: 'Native, first-party. Built and maintained by Orenyx Labs.',
};

export const native: Integration[] = ecosystem.map((p) => ({ name: p.label, status: null }));

export const externalBlock = {
  heading: 'External Integrations',
  lead:
    'Category-level commitments, with representative examples to set expectations. ' +
    'Exact partners are confirmed before any named logo is published.',
};

export type Category = {
  category: string;
  /** Illustrative only — the packet marks each as unconfirmed. */
  examples: string[];
  confirmed: boolean;
  note?: string;
};

export const external: Category[] = [
  {
    category: 'CRMs',
    examples: ['Salesforce', 'HubSpot'],
    confirmed: false,
    note: 'Confirm which are supported today vs. on the roadmap.',
  },
  {
    category: 'Contact centers',
    examples: ['Twilio', 'Five9'],
    confirmed: false,
  },
  {
    category: 'Payment platforms',
    examples: ['Stripe', 'Orenyx Payment (native)'],
    confirmed: false,
  },
  {
    category: 'Custom enterprise systems',
    examples: [],
    confirmed: true,
    note: 'Available via API and webhooks. Dedicated integration support on the Enterprise plan.',
  },
];
