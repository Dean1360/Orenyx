/**
 * FAQ copy — questions from the client Builder Packet, section 12.
 *
 * The packet supplies questions only, no answers. Where an answer is already
 * stated somewhere the client has signed off on — the pricing table, the
 * Security section, the ecosystem copy — it is answered here and the source is
 * noted. Everything else stays null and renders as a placeholder, because
 * guessing at differentiation or liability copy on the client's behalf is not
 * something a website build should do.
 */

export type FaqItem = { q: string; a: string | null };

export const faq: FaqItem[] = [
  {
    q: 'What is Orenyx AI Engine™, in one sentence?',
    // Source: site.footerBlurb + home ecosystem copy.
    a: 'A unified decision and orchestration layer for dispatch, bots, and payments — one engine that every product in your stack shares instead of each reinventing its own logic.',
  },
  {
    q: 'How is this different from building automation in-house?',
    a: null,
  },
  {
    q: 'How is this different from Zapier/Make or a generic workflow tool?',
    a: null,
  },
  {
    q: 'Do I need to use other Orenyx products to use the AI Engine?',
    // Source: home ecosystemBlock — "available as a standalone platform".
    a: 'No. The engine powers the Orenyx ecosystem, but it is available as a standalone platform and connects to your own systems through the API and webhooks.',
  },
  {
    q: 'What does “payment decisioning” actually mean, and who is liable for the decision?',
    // Deliberately unanswered — liability wording needs counsel, not a copywriter.
    a: null,
  },
  {
    q: 'How is my data isolated from other tenants?',
    // Source: Security & Trust section of the packet.
    a: 'Strict per-tenant isolation, with no cross-tenant data access. Data is encrypted in transit (TLS 1.2+) and at rest (AES-256), and sandbox and production environments hold isolated data with no cross-environment leakage.',
  },
  {
    q: 'What happens if I exceed my plan’s included usage?',
    // Source: pricing plans — overage rates per 1,000 events.
    a: 'Usage above your plan’s included allowance is billed as overage: $3.00 per 1,000 events on Starter and $0.50 per 1,000 on Growth. Enterprise overage is negotiated. Nothing stops working when you cross the line.',
  },
  {
    q: 'Is there a free trial or sandbox?',
    // Sandbox is confirmed in the packet; a free trial is not mentioned anywhere.
    a: 'Every account includes a sandbox environment with test API keys. Sandbox events do not incur usage charges and are clearly flagged in logs.',
  },
  {
    q: 'How long does integration typically take?',
    a: null,
  },
  {
    q: 'What support do I get, and how fast is response time per plan?',
    // Source: pricing plan feature lists.
    a: 'Starter includes email support with a 48-hour response target. Growth adds chat and a 24-hour target. Enterprise is dedicated support, SLA-backed.',
  },
];
