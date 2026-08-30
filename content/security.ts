/**
 * Security & Trust copy.
 *
 * Superseded the Builder Packet section 9 outline on 2026-08-24 with the
 * client's "Orenyx AI Engine — Compliance Page" document (2026-08-19).
 *
 * Compliance claims are the one place on this site where a wrong word is a
 * legal problem, so anything neither the document nor the packet confirms
 * stays unconfirmed here rather than being rounded up to a claim.
 *
 * NOTE ON CERTIFICATION LANGUAGE: the compliance document says only that
 * formal certification status is "available to Enterprise customers on
 * request". The explicit "audit underway / not yet issued" wording below is
 * kept from commit 139643c (2026-08-23), which post-dates the document and
 * finalised this language deliberately. It is the more conservative of the
 * two, so it wins. The document's Enterprise due-diligence sentence is added
 * underneath rather than replacing it.
 *
 * The document uses the retired support@motuslabs.co address throughout;
 * contacts below route to the live legal@orenyxengine.com channel instead.
 */

export const headline = 'Built for infrastructure that handles real money and real customer data.';

export const intro =
  'Orenyx AI Engine™ sits behind dispatch, bot, and payment decisions for the businesses that rely on it. Security, tenant isolation, and operational transparency are treated as core product requirements, not add-ons.';

export type LabelledPoint = { label: string; body: string };

export const dataSecurity: { heading: string; points: LabelledPoint[] } = {
  heading: 'Data Security',
  points: [
    {
      label: 'Encryption',
      body: 'Data is encrypted in transit (TLS 1.2+) and at rest (AES-256).',
    },
    {
      label: 'Tenant Isolation',
      body: 'Strict per-tenant data isolation — no cross-tenant data access.',
    },
    {
      label: 'Access Control',
      body: 'Role-based access control governs dashboard and API key management.',
    },
  ],
};

export type ComplianceItem = {
  name: string;
  /** null = status is unconfirmed. */
  status: string | null;
  body: string | null;
  links?: { label: string; href: string }[];
};

export const compliance: { heading: string; items: ComplianceItem[]; footnote: string } = {
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
  footnote:
    'We align our data handling practices with recognized frameworks including SOC 2 and PCI-DSS principles for platforms that process payment-related decisioning, and document GDPR/CCPA-aligned data handling practices consistent with our Privacy Policy. Formal certification status is available to Enterprise customers on request as part of the onboarding and due-diligence process.',
};

export const reliability: {
  heading: string;
  plans: LabelledPoint[];
  body: string[];
  statusHref: string;
} = {
  heading: 'Reliability & Uptime',
  plans: [
    { label: 'Starter', body: 'Best-effort uptime.' },
    { label: 'Growth', body: '99.9% uptime target.' },
    { label: 'Enterprise', body: '99.95%+ uptime target, under a custom SLA-backed contract.' },
  ],
  body: [
    'Current platform status and any active incidents are published on our Status page. In the event of an incident affecting customer data or service availability, affected customers are notified as part of our incident response process.',
  ],
  statusHref: '/status',
};

export const apiSecurity: { heading: string; points: LabelledPoint[] } = {
  heading: 'API & Key Security',
  points: [
    {
      label: 'Scoped Keys',
      body: 'API keys are scoped per environment and tenant, and can be rotated at any time via the API key management endpoint.',
    },
    {
      label: 'Signed Webhooks',
      body: 'Webhook payloads are signed with an HMAC signature header so recipients can verify authenticity.',
    },
    {
      label: 'Rate Limiting',
      body: 'Per-plan rate limits protect the platform and other tenants from overload; Enterprise plans support custom limits.',
    },
  ],
};

export const billingTransparency = {
  heading: 'Billing & Usage Transparency',
  body: 'Usage is metered transparently across dispatch events, bot executions, payment decision calls, and API requests. Sandbox environments are provided with test API keys, and sandbox activity does not incur usage charges or count toward billed events.',
};

