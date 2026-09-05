/**
 * Pricing — final, confirmed values (August 2026).
 *
 * Base fees and included allowances are locked from the original packet.
 * Overage rates were corrected from the original draft ($2.00 / $1.50 per 1k)
 * because that pairing put the Starter/Growth break-even at ~2,140,000 events
 * per month — no realistic customer would ever see a reason to upgrade.
 *
 * Corrected rates ($3.00 Starter / $0.50 Growth) move the break-even to
 * roughly 470,000 events/month, just past the point where a growing customer
 * would naturally start feeling Starter's overage cost.
 */

export type MeteredRow = { label: string; value: string; accent?: boolean };

export type Plan = {
  id: string;
  name: string;
  subtitle?: string;
  price: string;
  priceSuffix?: string;
  cta: { label: string; href: string };
  metered: MeteredRow[];
  features: string[];
  /** Numeric model for the estimator. Null when there's no fixed per-event math. */
  model: { base: number; includedDispatch: number; overagePer1k: number } | null;
};

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'For small service companies beginning automation',
    price: '$499',
    priceSuffix: '/mo',
    cta: { label: 'Request Access', href: '/contact' },
    metered: [
      { label: 'API calls', value: '50,000 / month' },
      { label: 'Dispatch events', value: '10,000 / month' },
      { label: 'Bot executions', value: '5,000 / month' },
      { label: 'Payment decision calls', value: '5,000 / month' },
      { label: 'Overage rate', value: '$3.00 per 1,000 events', accent: true },
    ],
    features: [
      'Routing Basic (rules-based technician matching)',
      'Shared, single-tenant environment',
      'Email support (48-hour response)',
      'Basic logs (7-day retention)',
      'Best-effort uptime',
      'Standard integrations only (Stripe, Plivo/Twilio, Google Places, Email/SMS)',
      'Basic reporting dashboard',
    ],
    model: { base: 499, includedDispatch: 10000, overagePer1k: 3.0 },
  },
  {
    id: 'professional',
    name: 'Professional',
    subtitle: 'For mid-size companies needing stronger automation',
    price: '$899',
    priceSuffix: '/mo',
    cta: { label: 'Request Access', href: '/contact' },
    metered: [
      { label: 'API calls', value: '150,000 / month' },
      { label: 'Dispatch events', value: '25,000 / month' },
      { label: 'Bot executions', value: '15,000 / month' },
      { label: 'Payment decision calls', value: '10,000 / month' },
      { label: 'Overage rate', value: '$2.50 per 1,000 events', accent: true },
    ],
    features: [
      'Routing Advanced — rules + AI technician matching (skill + availability + area + license)',
      'Shared staging + production environments',
      'Email + chat support (24-hour response)',
      'Full logs (30-day retention)',
      '99.5% uptime SLA',
      'Standard + priority integrations',
      'Enhanced reporting suite',
      'Faster job processing + higher concurrency',
    ],
    model: { base: 899, includedDispatch: 25000, overagePer1k: 2.5 },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'For multi-location operators and franchise groups',
    price: '$2,500',
    priceSuffix: '/mo',
    cta: { label: 'Request Access', href: '/contact' },
    metered: [
      { label: 'API calls', value: '500,000 / month' },
      { label: 'Dispatch events', value: '100,000 / month' },
      { label: 'Bot executions', value: '50,000 / month' },
      { label: 'Payment decision calls', value: '25,000 / month' },
      { label: 'Overage rate', value: '$2.00 per 1,000 events', accent: true },
    ],
    features: [
      'Full Technician Routing Engine',
      'Full Appointment Booking Engine',
      'Compliance Bot',
      'Orenyx Credits Ledger',
      'Upsell + Follow-Up Bots',
      'Multi-tenant isolation',
      'Dedicated staging + production environments',
      'Email + chat + priority support (8-hour response)',
      '90-day log retention',
      '99.9% uptime SLA',
      'Custom integrations',
      'Dedicated success manager',
      'Full reporting suite (Ops, Revenue, Compliance, Dispatch, Payments)',
    ],
    model: { base: 2500, includedDispatch: 100000, overagePer1k: 2.0 },
  },
];

export const privateLicense = {
  name: 'Private License',
  subtitle: 'For companies wanting their own private ORENYX deployment',
  price: 'Contact for Pricing',
  features: [
    'Private, isolated deployment',
    'Full Field Ops Engine (11 modules)',
    'Technician Routing Engine',
    'Appointment Booking Engine',
    'Payment Engine',
    'Compliance Bot',
    'Orenyx Credits Ledger',
    'Upsell & Follow-Up Bots',
    'API Builder Packet',
    'Multi-tenant isolation',
    '12-month support',
    'Annual renewal: $150k\u2013$300k',
  ],
  contact: { label: 'info@orenyxengine.com', href: 'mailto:info@orenyxengine.com' },
};

export type VoicePlan = {
  id: string;
  name: string;
  calls: string;
  price: string;
  mostPopular?: boolean;
};

/**
 * Orenyx Voice Dispatch — dispatch-only tier, priced by call volume rather
 * than the API/bot usage metrics used for the Full Automation Engine plans
 * above. Each tier steps up in call volume and gets a better effective rate
 * per call than the one before it.
 */
export const voiceDispatchPlans: VoicePlan[] = [
  { id: 'voice-starter', name: 'Starter', calls: 'Up to 500 calls/mo', price: '$99\u2013149/mo' },
  {
    id: 'voice-growth',
    name: 'Growth',
    calls: 'Up to 2,500 calls/mo',
    price: '$299/mo',
    mostPopular: true,
  },
  { id: 'voice-scale', name: 'Scale', calls: 'Up to 10,000 calls/mo', price: '$799/mo' },
  {
    id: 'voice-enterprise',
    name: 'Enterprise',
    calls: 'Unlimited calls',
    price: '$1,999\u20134,000/mo',
  },
];

export const billableUnits = [
  'Dispatch events',
  'Bot executions',
  'Payment decision calls',
  'API requests',
];

export const addOns = [
  { name: 'Premium Observability', body: 'Extended log retention, custom dashboards' },
  {
    name: 'Dedicated environment',
    body: 'Isolated infrastructure, available from Growth tier up',
  },
  {
    name: 'Custom integrations',
    body: 'Bespoke connectors to internal or third-party systems',
  },
];

export const pricingFaq: { q: string; a: string | null }[] = [
  {
    q: 'What counts as a billable event?',
    a: 'An event is any billable unit that passes through Orenyx AI Engine \u2014 a dispatch event, a bot execution, a payment decision call, or an API request beyond your plan\u2019s included allowance.',
  },
  {
    q: 'Can I change plans anytime?',
    a: 'Yes. Upgrades take effect immediately, with the new plan\u2019s fee applied to your next invoice. Downgrades take effect at the start of your next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'There\u2019s no separate paid-plan free trial. You can test Orenyx AI Engine hands-on in a sandbox environment using test API keys, for as long as you need, at no cost \u2014 no credit card required.',
  },
  {
    q: 'What happens if I exceed my included usage?',
    a: 'You\u2019re billed at your plan\u2019s overage rate for the additional events \u2014 there\u2019s no hard cutoff unless you configure your own usage limits.',
  },
];

/** Monthly cost by dispatch-event volume. Estimator only. */
export function monthlyCost(plan: Plan, events: number): number | null {
  if (!plan.model) return null;
  const { base, includedDispatch, overagePer1k } = plan.model;
  return base + (Math.max(0, events - includedDispatch) / 1000) * overagePer1k;
}
