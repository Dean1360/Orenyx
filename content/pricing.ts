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
  price: string;
  priceSuffix?: string;
  cta: { label: string; href: string };
  metered: MeteredRow[];
  features: string[];
  /** Numeric model for the estimator. Null for Enterprise. */
  model: { base: number; includedDispatch: number; overagePer1k: number } | null;
};

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$299',
    priceSuffix: '/mo',
    cta: { label: 'Request Access', href: '/contact' },
    metered: [
      { label: 'Included API calls/mo', value: '50,000' },
      { label: 'Dispatch events', value: '10,000/mo' },
      { label: 'Bot executions', value: '5,000/mo' },
      { label: 'Payment decision calls', value: '5,000/mo' },
      { label: 'Overage rate', value: '$3.00 / 1,000 events', accent: true },
    ],
    features: [
      'Routing Basic (rules-based)',
      'Shared, single environment',
      'Email, 48-hr response',
      'Basic logs (7-day retention)',
      'Best-effort uptime',
      'Standard integrations only',
    ],
    model: { base: 299, includedDispatch: 10000, overagePer1k: 3.0 },
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$1,499',
    priceSuffix: '/mo',
    cta: { label: 'Request Access', href: '/contact' },
    metered: [
      { label: 'Included API calls/mo', value: '500,000/mo' },
      { label: 'Dispatch events', value: '100,000/mo' },
      { label: 'Bot executions', value: '50,000/mo' },
      { label: 'Payment decision calls', value: '50,000/mo' },
      { label: 'Overage rate', value: '$0.50 / 1,000 events', accent: true },
    ],
    features: [
      'Routing Advanced (rules + AI)',
      'Shared, staging + production',
      'Email + chat, 24-hr response',
      'Full logs (30-day retention)',
      '99.9%',
      'Standard + priority support',
    ],
    model: { base: 1499, includedDispatch: 100000, overagePer1k: 0.5 },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    cta: { label: 'Request Access', href: '/contact' },
    metered: [
      { label: 'Included API calls/mo', value: 'Custom' },
      { label: 'Dispatch events', value: 'Custom' },
      { label: 'Bot executions', value: 'Custom' },
      { label: 'Payment decision calls', value: 'Custom' },
      { label: 'Overage rate', value: 'Negotiated', accent: true },
    ],
    features: [
      'Routing Advanced + custom models',
      'Dedicated environment',
      'Dedicated support, SLA-backed',
      'Premium observability (custom retention)',
      '99.95%+, custom contract',
      'Custom integrations',
    ],
    model: null,
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
