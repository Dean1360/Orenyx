/**
 * Pricing — verbatim from the client Figma.
 *
 * ⚠ THE TIER MATHS STILL DOES NOT WORK, and the Figma numbers make it worse.
 *
 * Dispatch events: Starter is $299 + $2.00/1k beyond 10,000.
 *                  Growth  is $1,499 + $1.50/1k beyond 100,000.
 * Break-even sits at roughly 2,140,000 dispatch events per month. Below that a
 * rational buyer stays on Starter and eats the overage — at 100,000 events
 * Starter costs about $479 against Growth's $1,499.
 *
 * The page therefore presents an upgrade path no customer at a realistic volume
 * should take. Either the Growth allowances need to be far larger, the overage
 * rates need to diverge harder, or Growth needs to be sold on capability
 * (advanced routing, staging env, SLA) rather than cost. Flagged, not patched —
 * these are the client's numbers to change.
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
      { label: 'Overage rate', value: '$2.00 / 1,000 events', accent: true },
    ],
    features: [
      'Routing Basic (rules-based)',
      'Shared, single environment',
      'Email, 48-hr response',
      'Basic logs (7-day retention)',
      'Best-effort uptime',
      'Standard integrations only',
    ],
    model: { base: 299, includedDispatch: 10000, overagePer1k: 2.0 },
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
      { label: 'Overage rate', value: '$1.50 / 1,000 events', accent: true },
    ],
    features: [
      'Routing Advanced (rules + AI)',
      'Shared, staging + production',
      'Email + chat, 24-hr response',
      'Full logs (30-day retention)',
      '99.9%',
      'Standard + priority support',
    ],
    model: { base: 1499, includedDispatch: 100000, overagePer1k: 1.5 },
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

/*
  ⚠ The Figma titles the second and third add-on identically
  ("Dedicated environment"). The third describes bespoke connectors, so its
  title is almost certainly meant to be "Custom integrations". Left as drawn.
*/
export const addOns = [
  { name: 'Premium Observability', body: 'Extended log retention, custom dashboards' },
  {
    name: 'Dedicated environment',
    body: 'Isolated infrastructure, available from Growth tier up',
  },
  {
    name: 'Dedicated environment',
    body: 'Bespoke connectors to internal or third-party systems',
  },
];

export const pricingFaq: { q: string; a: string | null }[] = [
  { q: 'What counts as an \u201cevent\u201d?', a: null },
  {
    q: 'Can I change plans anytime?',
    a: 'Yes, upgrades apply immediately; downgrades apply at the next billing cycle.',
  },
  { q: 'Is there a free trial?', a: null },
  { q: 'What happens if I exceed my included usage?', a: null },
];

/** Monthly cost by dispatch-event volume. Estimator only. */
export function monthlyCost(plan: Plan, events: number): number | null {
  if (!plan.model) return null;
  const { base, includedDispatch, overagePer1k } = plan.model;
  return base + (Math.max(0, events - includedDispatch) / 1000) * overagePer1k;
}
