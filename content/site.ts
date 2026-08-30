/**
 * Site-wide constants.
 * Nav and footer structure mirror the client Figma exactly.
 */

export const site = {
  name: 'Orenyx AI Engine™',
  company: 'Orenyx AI Engine LLC',
  registeredIn: 'Wyoming',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orenyxengine.com',
  supportEmail: 'operations@orenyxengine.com',
  footerBlurb:
    'Orenyx AI Engine™ — unified decision plus orchestration layer for dispatch, bots, and payments.',
} as const;

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Security & Trust', href: '/security' },
] as const;

/** Thin bar above the header. */
export const utilityNav = [
  { label: 'Log in', href: '/login' },
  { label: 'Status', href: '/status' },
] as const;

export const footerNav = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'How It Works', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Refund & Cancellation Policy', href: '/legal/refund' },
      { label: 'Data Processing Agreement', href: '/legal/dpa' },
    ],
  },
] as const;

/** Line-art glyph drawn in each hero-diagram node. See components/product-icons.tsx. */
export type IconName = 'wallet' | 'chat' | 'truck' | 'people' | 'brain' | 'mic' | 'cloud';

export type Product = {
  label: string;
  /** Two-line split for the hero diagram boxes. */
  lines: [string, string];
  icon: IconName;
  href: string;
};

/**
 * The product family, laid out around the AI hub on the home page: one box
 * above the hub, five nested positions down the left side (an outer-top,
 * inner-top, inner-mid, inner-bottom and outer-bottom), a mirrored five on
 * the right, and one box below the hub — 12 total.
 *
 * SINGLE SOURCE OF TRUTH. The hero diagram, the marquee strip below the banner,
 * the banner paragraph and the ecosystem logos all read from this one list —
 * the client asked for those to match, and they had drifted apart. Add or
 * rename a product here and every one of them follows.
 *
 * Updated 2026-08-30 (client-directed): the 7 legacy product-name boxes were
 * replaced with the 12 platform capabilities from the "Everything Orenyx runs
 * for you" homepage section, so the hero diagram and that section read as one
 * consistent list.
 */
export const ecosystem: Product[] = [
  { label: 'Reporting & Analytics', lines: ['Reporting &', 'Analytics'], icon: 'cloud', href: '#' },
  { label: 'Call-to-Job Handoff', lines: ['Call-to-Job', 'Handoff'], icon: 'truck', href: '#' },
  { label: 'Appointment Booking', lines: ['Appointment', 'Booking'], icon: 'chat', href: '#' },
  {
    label: 'Technician Routing & Dispatch',
    lines: ['Technician', 'Dispatch'],
    icon: 'truck',
    href: '#',
  },
  { label: 'Compliance Checks', lines: ['Compliance', 'Checks'], icon: 'brain', href: '#' },
  {
    label: 'Cancellation & Revenue Recovery',
    lines: ['Cancellation', 'Recovery'],
    icon: 'wallet',
    href: '#',
  },
  { label: 'Customer Payments', lines: ['Customer', 'Payments'], icon: 'wallet', href: '#' },
  {
    label: 'Orenyx Credits (Payouts)',
    lines: ['Orenyx Credits', '(Payouts)'],
    icon: 'wallet',
    href: '#',
  },
  {
    label: 'Membership & Warranty Plans',
    lines: ['Membership &', 'Warranty Plans'],
    icon: 'people',
    href: '#',
  },
  {
    label: 'Maintenance Reminders & Follow-Up',
    lines: ['Maintenance', 'Follow-Up'],
    icon: 'mic',
    href: '#',
  },
  {
    label: 'Upsell & Advanced Support',
    lines: ['Upsell &', 'Advanced Support'],
    icon: 'people',
    href: '#',
  },
  {
    label: 'Automated Business Onboarding',
    lines: ['Automated', 'Onboarding'],
    icon: 'cloud',
    href: '#',
  },
];
