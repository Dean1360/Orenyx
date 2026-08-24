/**
 * Legal page copy.
 *
 * Terms of Service and Privacy Policy are now counsel-approved text, supplied
 * by the client as Word documents (2026-08-19) and pasted verbatim below.
 * Refund & Cancellation and the DPA have NOT been drafted yet, so those two
 * still render as outlines marked pending.
 *
 * Do not paraphrase, renumber, or summarise the drafted clauses. If the client
 * sends a revised document, replace the text wholesale rather than editing it
 * clause by clause.
 *
 * TWO DELIBERATE DEVIATIONS from the supplied documents, both of which post-date
 * them (see commits 139643c and df5d2b3, 2026-08-23):
 *   - Entity name — the documents say "Orenyx Labs LLC"; the corrected
 *     sitewide entity is "Orenyx AI Engine LLC" (content/site.ts).
 *   - Contact addresses — the documents say support@motuslabs.co, which is the
 *     retired Motus domain. Routed to the live channels instead: general
 *     questions to operations@, privacy and legal requests to legal@.
 * Both are flagged for the client to confirm against counsel.
 */

export type LegalClause = {
  heading: string;
  /** Body paragraphs, in order. */
  body?: string[];
  /** Defined terms rendered as a list. */
  bullets?: { label: string; body: string }[];
};

export type LegalOutline = {
  title: string;
  crumb: string;
  description: string;
  titleTag: string;
  path: string;
  /** Counsel-approved effective date. Omitted while the page is an outline. */
  effective?: string;
  /**
   * Drafted, counsel-approved clauses. Presence of this switches the page
   * from outline mode to full-text mode.
   */
  clauses?: LegalClause[];
  /** Section headings counsel will fill in. Outline mode only. */
  sections?: string[];
  /** Extra note from the packet, rendered under the outline. */
  note?: string;
};

export const terms: LegalOutline = {
  title: 'Terms of Service',
  crumb: 'Terms of Service',
  titleTag: 'Terms of Service — Orenyx AI Engine™',
  description: 'Terms of Service for Orenyx AI Engine™, a product of Orenyx AI Engine LLC.',
  path: '/legal/terms',
  effective: 'August 2026',
  clauses: [
    {
      heading: 'Acceptance of Terms',
      body: [
        'By requesting access to, registering for, or using Orenyx AI Engine™ (the "Engine"), you agree to be bound by these Terms of Service. If you are agreeing on behalf of a company, you represent that you have authority to bind that company.',
      ],
    },
    {
      heading: 'Description of Service',
      body: [
        'Orenyx AI Engine™ is a unified decision and orchestration layer providing dispatch intelligence, bot orchestration, payment decisioning, context/state management, and API and webhook access. The Engine powers the broader Orenyx product ecosystem and is also made available as a standalone platform to outside companies.',
      ],
    },
    {
      heading: 'Account Registration & API Key Responsibility',
      body: [
        'You are responsible for maintaining the confidentiality of your account credentials and API keys. API keys are scoped per environment and tenant and can be rotated at any time. You are responsible for all activity conducted using your keys, and must notify us promptly of any suspected unauthorized use.',
      ],
    },
    {
      heading: 'Acceptable Use Policy',
      bullets: [
        {
          label: 'No Circumvention',
          body: 'You may not attempt to bypass rate limits, tenant isolation, or authentication controls.',
        },
        {
          label: 'No Misuse of Decisioning',
          body: 'You may not use the payment decision engine or dispatch engine for unlawful, deceptive, or fraudulent purposes.',
        },
        {
          label: 'No Overloading',
          body: 'You may not exceed documented rate limits in a manner that degrades service for other tenants.',
        },
        {
          label: 'No Unauthorized Resale',
          body: 'You may not resell or sublicense access to the Engine without our prior written consent.',
        },
      ],
    },
    {
      heading: 'Fees, Billing & Usage Overage',
      body: [
        'Plans are billed as a base platform fee plus usage across dispatch events, bot executions, payment decision calls, and API requests, consistent with the plan selected (Starter, Growth, or Enterprise) as described on our Pricing page. Usage above your plan’s included allowance is billed as overage at the published per-1,000-event rate for your plan; Enterprise overage terms are negotiated. Upgrades take effect immediately; downgrades take effect at the next billing cycle.',
      ],
    },
    {
      heading: 'Service Availability & SLA Disclaimers',
      body: [
        'Starter plans are provided on a best-effort uptime basis. Growth plans target 99.9% uptime. Enterprise plans target 99.95%+ uptime under a custom, SLA-backed contract. Current operational status is published on our Status page.',
      ],
    },
    {
      heading: 'Limitation of Liability',
      body: [
        'The Engine is provided "as is." To the maximum extent permitted by law, Orenyx AI Engine LLC is not liable for indirect, incidental, or consequential damages arising from use of the platform, including losses related to routing, dispatch, bot execution, or payment decisioning outcomes.',
      ],
    },
    {
      heading: 'Termination',
      body: [
        'You may stop using the Engine at any time. We may suspend or terminate access for violation of these Terms, including breaches of the Acceptable Use Policy, non-payment, or activity that threatens the security or integrity of the platform.',
      ],
    },
    {
      heading: 'Governing Law',
      body: [
        'These Terms are governed by the laws of the State of Wyoming, without regard to conflict-of-laws principles.',
      ],
    },
    {
      heading: 'Changes & Contact',
      body: [
        'We may update these Terms as the platform evolves. Continued use of the Engine after changes take effect constitutes acceptance of the revised Terms. Questions can be directed to operations@orenyxengine.com.',
      ],
    },
  ],
};

export const privacy: LegalOutline = {
  title: 'Privacy Policy',
  crumb: 'Privacy Policy',
  titleTag: 'Privacy Policy — Orenyx AI Engine™',
  description: 'How Orenyx AI Engine LLC collects, uses, retains, and shares data.',
  path: '/legal/privacy',
  effective: 'August 2026',
  clauses: [
    {
      heading: 'Overview',
      body: [
        'This Privacy Policy explains how Orenyx AI Engine LLC ("we," "us," or "our") collects, uses, and protects information in connection with the Orenyx AI Engine™ platform — the unified decision and orchestration layer behind dispatch routing, bot orchestration, and payment decisioning. It applies to our marketing site, API, dashboard, and related services.',
      ],
    },
    {
      heading: 'What Data We Collect',
      bullets: [
        {
          label: 'Account & Profile Data',
          body: 'Company name, contact name, email, use case, and estimated usage volume provided when requesting access or registering an account.',
        },
        {
          label: 'Usage & Event Data',
          body: 'API calls, dispatch events, bot executions, and payment decision calls processed through the engine, along with associated metadata needed for routing and billing.',
        },
        {
          label: 'Log & Diagnostic Data',
          body: 'Request logs, error codes, rate-limit activity, and webhook delivery records, used for observability and troubleshooting.',
        },
        {
          label: 'API Key & Authentication Data',
          body: 'API keys and authentication events, scoped per environment and tenant.',
        },
      ],
    },
    {
      heading: 'How We Use Data',
      bullets: [
        {
          label: 'Service Delivery',
          body: 'To route dispatch events, execute bot flows, and score payment decisions on your behalf.',
        },
        {
          label: 'Billing',
          body: 'To meter usage against your plan’s included allowance and calculate overage charges.',
        },
        {
          label: 'Security & Fraud Prevention',
          body: 'To monitor for suspicious activity and enforce per-tenant data isolation.',
        },
        {
          label: 'Product Improvement',
          body: 'To understand aggregate usage patterns and improve routing and decisioning accuracy over time.',
        },
      ],
    },
    {
      heading: 'Data Sharing With Sub-Processors',
      body: [
        'We do not sell personal information. We share data only with sub-processors who help us operate the platform — such as cloud hosting and infrastructure providers — under confidentiality and data-protection obligations, and with your own downstream systems when you configure webhooks or integrations to receive that data.',
      ],
    },
    {
      heading: 'Data Retention',
      bullets: [
        { label: 'Starter Plan', body: 'Basic logs retained for 7 days.' },
        { label: 'Growth Plan', body: 'Full logs retained for 30 days.' },
        {
          label: 'Enterprise Plan',
          body: 'Custom retention periods, including premium observability with extended retention as an add-on.',
        },
      ],
      body: [
        'Account and billing records are retained for as long as your account is active and as needed to meet financial and legal record-keeping requirements.',
      ],
    },
    {
      heading: 'Your Rights',
      bullets: [
        {
          label: 'Access',
          body: 'Request a copy of the personal data we hold about you or your organization.',
        },
        {
          label: 'Correction',
          body: 'Request correction of inaccurate account or contact information.',
        },
        {
          label: 'Deletion',
          body: 'Request deletion of your data, subject to billing and legal record-keeping needs.',
        },
        { label: 'Portability', body: 'Request an export of your data in a portable format.' },
      ],
      body: [
        'These rights are available to all users and are provided consistent with applicable data protection laws, including GDPR and CCPA where they apply.',
      ],
    },
    {
      heading: 'Cookies on the Marketing Site',
      body: [
        'Our marketing site uses cookies to keep the site functional and to understand aggregate visitor behavior. You can control cookies through your browser settings.',
      ],
    },
    {
      heading: 'Changes & Contact',
      body: [
        'We may update this Privacy Policy as the platform evolves. Material changes will be reflected with a new "Last Updated" date. Privacy requests and questions can be directed to legal@orenyxengine.com.',
      ],
    },
  ],
};

export const refund: LegalOutline = {
  title: 'Refund & Cancellation Policy',
  crumb: 'Refund & Cancellation',
  titleTag: 'Refund & Cancellation — Orenyx AI Engine™',
  description: 'Billing cycle, cancellation timing, refund eligibility, and proration rules.',
  path: '/legal/refund',
  sections: [
    'Monthly billing cycle and cancellation timing',
    'Refund eligibility (if any)',
    'Downgrade/upgrade proration rules',
  ],
};

export const dpa: LegalOutline = {
  title: 'Data Processing Agreement',
  crumb: 'Data Processing Agreement',
  titleTag: 'Data Processing Agreement — Orenyx AI Engine™',
  description: 'DPA for Enterprise customers handling regulated data.',
  path: '/legal/dpa',
  sections: [],
  note: 'Available on request, or as a download for Enterprise customers handling regulated data.',
};
