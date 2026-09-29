/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import {
  complianceFields,
  displayValue,
  privateLicenseFields,
  toPricingLead,
  type InquiryField,
} from '@/content/inquiry-forms';
import { pricingStep } from '@/lib/orenyx-pricing';

/**
 * Shared handler for the Private License and Compliance inquiry forms.
 *
 * Sends two emails via Resend:
 *   1. An internal routing email to the Orenyx team with every answer PLUS
 *      the calculated price from the pricing calculator rules. Internal only.
 *   2. A confirmation email to the submitter with their answers — no prices.
 *
 * If RESEND_API_KEY is not set, this validates and logs only.
 */

export type InquiryKind = 'private-license' | 'compliance';

const KINDS: Record<InquiryKind, { title: string; fields: InquiryField[]; path: string; to: () => string; from: () => string }> = {
  'private-license': {
    title: 'Private License',
    fields: privateLicenseFields,
    path: '/private-license',
    to: () => process.env.PRIVATE_LICENSE_TO_EMAIL ?? 'private@orenyxengine.com',
    from: () => process.env.PRIVATE_LICENSE_FROM_EMAIL ?? 'Orenyx Private License <noreply@orenyxengine.com>',
  },
  compliance: {
    title: 'Standalone Operational Compliance',
    fields: complianceFields,
    path: '/compliance',
    to: () => process.env.COMPLIANCE_TO_EMAIL ?? process.env.PRIVATE_LICENSE_TO_EMAIL ?? 'private@orenyxengine.com',
    from: () => process.env.COMPLIANCE_FROM_EMAIL ?? process.env.PRIVATE_LICENSE_FROM_EMAIL ?? 'Orenyx <noreply@orenyxengine.com>',
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(v: string) {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const usd = (n: number) => (n < 0 ? '−$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');

async function sendEmail(params: { to: string; from: string; subject: string; text: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true as const };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) return { skipped: false as const, ok: false as const, detail: await res.text() };
  return { skipped: false as const, ok: true as const };
}

/** Internal-only price summary built from the pricing calculator rules. */
function priceSummary(result: any): { text: string[]; review: boolean } {
  const q = result?.quote ?? {};
  const out: string[] = [];
  if (q.status === 'route_to_subscription' || q.status === 'included') {
    out.push(q.message);
    return { text: out, review: false };
  }
  if (q.status !== 'quoted') {
    out.push('Could not calculate a price — some answers were missing. Check the answers above.');
    return { text: out, review: true };
  }
  if (q.product === 'private_license') {
    out.push(`Recommended: ${usd(q.recommended.firstYear)} first year, ${usd(q.recommended.renewal)}/year renewal`);
    out.push(`Range: ${usd(q.range.low.firstYear)} – ${usd(q.range.high.firstYear)} first year`);
    out.push(`${q.contractYears}-year contract total: ${usd(q.contractTotal)}`);
    for (const p of q.payment?.firstYearSchedule ?? []) out.push(`${p.label}: ${usd(p.amount)}`);
  } else {
    out.push(
      `Recommended: ${usd(q.recommended.monthly)}/month` + (q.recommended.setup ? ` + ${usd(q.recommended.setup)} setup` : ''),
    );
    if (q.upsell) out.push(`Upsell: ${q.upsell.message}`);
  }
  for (const l of q.lines ?? []) {
    const amt =
      l.firstYear !== undefined
        ? `${usd(l.firstYear)} first year / ${usd(l.renewal)} renewal`
        : `${usd(l.monthly)}/mo` + (l.setup ? ` + ${usd(l.setup)} setup` : '');
    out.push(`  • ${l.item}: ${l.note ?? amt}`);
  }
  if (result.requiresReview) {
    out.push('NEEDS YOUR REVIEW before quoting:');
    for (const r of result.reviewReasons ?? []) out.push(`  • ${r}`);
  }
  if (result.validUntil) out.push(`Quote valid until: ${String(result.validUntil).slice(0, 10)}`);
  out.push('No SOC 2, ISO or HIPAA certification included.');
  return { text: out, review: Boolean(result.requiresReview) };
}

export async function handleInquiry(request: Request, kind: InquiryKind) {
  const cfg = KINDS[kind];
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  if (typeof body.hp_field === 'string' && body.hp_field.length > 0) return NextResponse.json({ ok: true });

  const d: Record<string, string> = {};
  for (const f of cfg.fields) if (body[f.name] !== undefined) d[f.name] = String(body[f.name]).trim();

  const missing = cfg.fields.filter((f) => f.required && !d[f.name]).map((f) => f.label);
  if (missing.length) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}.` }, { status: 400 });
  }
  if (!EMAIL_RE.test(d.workEmail)) {
    return NextResponse.json({ error: 'Please provide a valid work email address.' }, { status: 400 });
  }

  const rows = cfg.fields
    .filter((f) => d[f.name])
    .map((f) => [f.label.replace(/ — optional$/, ''), displayValue(cfg.fields, f.name, d[f.name])] as const);
  const textLines = rows.map(([l, v]) => `${l}: ${v}`).join('\n');
  const htmlRows = rows
    .map(
      ([l, v]) => `<tr><td style="padding:8px 16px;border-bottom:1px solid #e5e0f5;color:#5b4d99;font-weight:600;vertical-align:top;">${esc(l)}</td><td style="padding:8px 16px;border-bottom:1px solid #e5e0f5;color:#1a1533;">${esc(v)}</td></tr>`,
    )
    .join('');

  let price = { text: ['Price could not be calculated.'], review: true };
  try {
    price = priceSummary(pricingStep(toPricingLead(kind, d)));
  } catch (err) {
    console.error(`[${kind}] pricing failed`, err);
  }

  const company = d.companyName;
  const subject = `${price.review ? '[REVIEW] ' : ''}${cfg.title} inquiry — ${company}`;
  const routingHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#1a1533;">New ${esc(cfg.title)} inquiry — ${esc(company)}</h2>
      <table style="border-collapse:collapse;width:100%;margin-top:12px;">${htmlRows}</table>
      <div style="margin-top:20px;padding:16px;border:2px solid #5b4d99;border-radius:8px;background:#f6f3ff;">
        <p style="margin:0 0 8px;font-weight:700;color:#5b4d99;">Calculated price — INTERNAL ONLY, do not forward to the client</p>
        <pre style="margin:0;white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;color:#1a1533;">${esc(price.text.join('\n'))}</pre>
      </div>
      <p style="margin-top:20px;color:#8a83a8;font-size:12px;">Submitted via orenyxengine.com${cfg.path}</p>
    </div>`;

  const routing = await sendEmail({
    to: cfg.to(),
    from: cfg.from(),
    subject,
    text: `New ${cfg.title} inquiry\n\n${textLines}\n\nCALCULATED PRICE — INTERNAL ONLY\n${price.text.join('\n')}`,
    html: routingHtml,
  });

  if (routing.skipped) {
    console.warn(`[${kind}] RESEND_API_KEY unset. Submission:`, d, price.text);
    return NextResponse.json({ ok: true, delivered: false });
  }
  if (!routing.ok) {
    console.error(`[${kind}] routing email failed:`, routing.detail);
    return NextResponse.json({ error: 'Delivery failed.' }, { status: 502 });
  }

  // Confirmation to the client — answers only, never prices.
  const first = d.fullName.split(' ')[0] || d.fullName;
  const confirmation = await sendEmail({
    to: d.workEmail,
    from: cfg.from(),
    subject: `We received your Orenyx ${cfg.title} inquiry`,
    text: `Thanks for reaching out, ${d.fullName}.\n\nWe received your ${cfg.title} inquiry for ${company}. The Orenyx team will review your details and follow up by email with pricing.\n\nWhat you submitted:\n${textLines}`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1533;"><h2>Thanks for reaching out, ${esc(first)}.</h2><p>We received your ${esc(cfg.title)} inquiry for <strong>${esc(company)}</strong>. The Orenyx team will review your details and follow up by email with pricing.</p><p style="margin-top:16px;"><strong>What you submitted:</strong></p><table style="border-collapse:collapse;width:100%;">${htmlRows}</table><p style="margin-top:20px;color:#4a4468;">If anything above needs correcting, just reply to this email.</p></div>`,
  });
  if (!confirmation.skipped && !confirmation.ok) console.error(`[${kind}] confirmation failed:`, confirmation.detail);

  return NextResponse.json({ ok: true, delivered: true });
}
