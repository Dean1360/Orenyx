/**
 * Legal page outlines — from the client Builder Packet, section 13.
 *
 * These are SECTION HEADINGS ONLY. The packet marks every one of these pages
 * "[PLACEHOLDER — have counsel draft/review full legal text]", so the pages
 * render the agreed structure and state plainly that the text is pending.
 * Nothing here is drafted legal copy and none of it should be treated as such.
 */

export type LegalOutline = {
  title: string;
  crumb: string;
  description: string;
  titleTag: string;
  path: string;
  /** Section headings counsel will fill in. */
  sections: string[];
  /** Extra note from the packet, rendered under the outline. */
  note?: string;
};

export const terms: LegalOutline = {
  title: 'Terms of Service',
  crumb: 'Terms of Service',
  titleTag: 'Terms of Service — Orenyx AI Engine™',
  description: 'Terms of Service for Orenyx AI Engine™, a product of Orenyx AI Engine LLC.',
  path: '/legal/terms',
  sections: [
    'Acceptance of terms',
    'Description of service',
    'Account registration & API key responsibility',
    'Acceptable use policy (prohibited uses)',
    'Fees, billing, and usage overage terms',
    'Service availability / SLA disclaimers by plan',
    'Limitation of liability',
    'Termination',
    'Governing law (Wyoming)',
  ],
};

export const privacy: LegalOutline = {
  title: 'Privacy Policy',
  crumb: 'Privacy Policy',
  titleTag: 'Privacy Policy — Orenyx AI Engine™',
  description: 'How Orenyx AI Engine LLC collects, uses, retains, and shares data.',
  path: '/legal/privacy',
  sections: [
    'What data is collected (account data, usage/event data, log data)',
    'How data is used',
    'Data sharing with sub-processors (e.g. hosting providers)',
    'Data retention periods per plan',
    'User rights (access, deletion, portability) — GDPR/CCPA',
    'Cookie usage on the marketing site',
    'Contact for privacy requests',
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
