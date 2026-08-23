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
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Developers', href: '/developers' },
  { label: 'Integrations', href: '/integrations' },
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
      { label: 'Integrations', href: '/integrations' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'API Docs', href: '/developers' },
      { label: 'Authentication', href: '/developers/authentication' },
      { label: 'Changelog', href: '/developers/changelog' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'FAQ', href: '/faq' },
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
 * The product family, in the order they sit around the AI hub on the home page
 * (left column top-to-bottom, then right column, then the box below the hub).
 *
 * SINGLE SOURCE OF TRUTH. The hero diagram, the marquee strip below the banner,
 * the banner paragraph and the ecosystem logos all read from this one list —
 * the client asked for those to match, and they had drifted apart. Add or
 * rename a product here and every one of them follows.
 *
 * Naming history (client-directed, 2026-08-08): all products carry the Orenyx
 * brand. "Social Mention BOT" became Orenyx Engine and "Zyntriq Dispatch"
 * became Orenyx Dispatch — Zyntriq is gone entirely, including its old
 * outbound link.
 */
export const ecosystem: Product[] = [
  { label: 'Orenyx Payment', lines: ['Orenyx', 'Payment'], icon: 'wallet', href: '#' },
  { label: 'Orenyx Engine', lines: ['Orenyx', 'Engine'], icon: 'chat', href: '#' },
  {
    label: 'Orenyx Dispatch',
    lines: ['Orenyx', 'Dispatch'],
    icon: 'truck',
    href: '#',
  },
  {
    label: 'Orenyx Influencer Connect™',
    lines: ['Orenyx Influencer', 'Connect™'],
    icon: 'people',
    href: '#',
  },
  { label: 'Orenyx NIL Engine', lines: ['Orenyx NIL', 'Engine'], icon: 'brain', href: '#' },
  { label: 'Orenyx Voice Dispatch', lines: ['Orenyx Voice', 'Dispatch'], icon: 'mic', href: '#' },
  { label: 'Orenyx API', lines: ['Orenyx', 'API'], icon: 'cloud', href: '#' },
];
