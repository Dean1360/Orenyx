/**
 * Security & Trust copy — from the client Builder Packet, section 9.
 *
 * Compliance claims are the one place on this site where a wrong word is a
 * legal problem, so anything the packet marked unconfirmed stays unconfirmed
 * here rather than being rounded up to a claim.
 */

export const headline = 'Built for infrastructure that handles real money and real customer data.';

export const dataSecurity = {
  heading: 'Data Security',
  points: [
    'Encryption in transit (TLS 1.2+) and at rest (AES-256)',
    'Strict per-tenant data isolation — no cross-tenant data access',
    'Role-based access control for dashboard and API key management',
  ],
};

export type ComplianceItem = {
  name: string;
  /** null = the packet flags the status as unconfirmed. */
  status: string | null;
  body: string | null;
  links?: { label: string; href: string }[];
};

export const compliance: { heading: string; items: ComplianceItem[] } = {
  heading: 'Compliance & Certifications',
  items: [
    {
      name: 'SOC 2 Type II',
      status: 'Actively pursuing',
      body: 'An audit is currently underway. Formal certification has not yet been issued.',
    },
    {
      name: 'PCI-DSS',
      status: 'Actively pursuing',
      // Orenyx Payment holds direct PCI scope; the engine itself only
      // touches adjacent, non-card data.
      body: 'An audit is currently underway for the payment module. Formal certification has not yet been issued.',
    },
    {
      name: 'GDPR / CCPA',
      status: 'Data handling practices documented',
      body: 'How personal data is collected, processed, retained, and deleted.',
      links: [
        { label: 'Privacy Policy', href: '/legal/privacy' },
        { label: 'Data Processing Agreement', href: '/legal/dpa' },
      ],
    },
  ],
};

export const reliability = {
  heading: 'Reliability',
  /** Architecture is unconfirmed in the packet. */
  items: [
    { body: 'Multi-region infrastructure', confirmed: false },
    { body: 'Status page with historical uptime', confirmed: true, href: '/status' },
    { body: 'Incident response process and customer notification policy', confirmed: false },
  ],
};

export const disclosure = {
  heading: 'Responsible Disclosure',
  lead: 'Report a vulnerability and we will acknowledge it and keep you updated through triage.',
  contact: 'legal@orenyxengine.com' as string | null,
  processConfirmed: false,
};
