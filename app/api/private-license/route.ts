import { NextResponse } from 'next/server';

/**
 * Receives Private License inquiry submissions from /private-license.
 *
 * Sends two emails via Resend:
 *   1. A structured, easy-to-read routing email to the Orenyx Private
 *      License inbox (private@orenyxengine.com by default) so the sales
 *      team can review the inquiry before scheduling a follow-up.
 *   2. A confirmation email back to the submitter.
 *
 * If RESEND_API_KEY is not set, this validates and logs only — same
 * fallback behavior as /api/request-access.
 */

const FIELD_LABELS: Record<string, string> = {
  fullName: 'Full Name',
  workEmail: 'Work Email',
  companyName: 'Company Name',
  industry: 'Industry',
  expectedScale: 'Expected Scale (Nodes/Users)',
  deploymentType: 'Deployment Type',
  timeline: 'Timeline',
  referralSource: 'How did you hear about us',
  notes: 'Notes',
};

const FIELD_ORDER = Object.keys(FIELD_LABELS);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendEmail(params: { to: string; from: string; subject: string; text: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true as const };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const detail = await res.text();
    return { skipped: false as const, ok: false as const, detail };
  }
  return { skipped: false as const, ok: true as const };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Accept quietly, deliver nothing.
  if (typeof body.hp_field === 'string' && body.hp_field.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const required = [
    'fullName',
    'workEmail',
    'companyName',
    'industry',
    'expectedScale',
    'deploymentType',
    'timeline',
  ] as const;

  const missing = required.filter((k) => !body[k] || String(body[k]).trim() === '');
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.map((k) => FIELD_LABELS[k] ?? k).join(', ')}.` },
      { status: 400 },
    );
  }

  const workEmail = String(body.workEmail).trim();
  if (!EMAIL_RE.test(workEmail)) {
    return NextResponse.json({ error: 'Please provide a valid work email address.' }, { status: 400 });
  }

  const companyName = String(body.companyName).trim();

  const to = process.env.PRIVATE_LICENSE_TO_EMAIL ?? 'private@orenyxengine.com';
  const from = process.env.PRIVATE_LICENSE_FROM_EMAIL ?? 'Orenyx Private License <noreply@orenyxengine.com>';

  // ── Structured routing email for the sales team ──────────────────────────
  const rows = FIELD_ORDER.filter((k) => body[k] !== undefined && String(body[k]).trim() !== '').map(
    (k) => [FIELD_LABELS[k], String(body[k]).trim()] as const,
  );

  const textLines = rows.map(([l, v]) => `${l}: ${v}`).join('\n');
  const htmlRows = rows
    .map(
      ([l, v]) => `
        <tr>
          <td style="padding:8px 16px;border-bottom:1px solid #e5e0f5;color:#5b4d99;font-weight:600;white-space:nowrap;vertical-align:top;">${escapeHtml(l)}</td>
          <td style="padding:8px 16px;border-bottom:1px solid #e5e0f5;color:#1a1533;">${escapeHtml(v)}</td>
        </tr>`,
    )
    .join('');

  const routingHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#1a1533;">New Private License inquiry — ${escapeHtml(companyName)}</h2>
      <p style="color:#4a4468;">A prospect submitted the Private License discovery form. Review and qualify before scheduling a follow-up.</p>
      <table style="border-collapse:collapse;width:100%;margin-top:12px;">${htmlRows}</table>
      <p style="margin-top:20px;color:#8a83a8;font-size:12px;">Submitted via orenyxengine.com/private-license</p>
    </div>`;

  const routingResult = await sendEmail({
    to,
    from,
    subject: `Private License inquiry — ${companyName}`,
    text: `New Private License inquiry\n\n${textLines}`,
    html: routingHtml,
  });

  if (routingResult.skipped) {
    console.warn('[private-license] No delivery configured (RESEND_API_KEY unset). Submission:', body);
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!routingResult.ok) {
    console.error('[private-license] Routing email failed:', routingResult.detail);
    return NextResponse.json({ error: 'Delivery failed.' }, { status: 502 });
  }

  // ── Confirmation email back to the submitter ─────────────────────────────
  const fullName = String(body.fullName).trim();
  const confirmationHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1533;">
      <h2>Thanks for reaching out, ${escapeHtml(fullName.split(' ')[0] || fullName)}.</h2>
      <p>We received your Private License inquiry for <strong>${escapeHtml(companyName)}</strong>. The Orenyx team will review your details and follow up by email to discuss deployment scope and pricing.</p>
      <p style="margin-top:16px;"><strong>What you submitted:</strong></p>
      <table style="border-collapse:collapse;width:100%;">${htmlRows}</table>
      <p style="margin-top:20px;color:#4a4468;">If anything above needs correcting, just reply to this email.</p>
      <p style="margin-top:20px;color:#8a83a8;font-size:12px;">Orenyx Private License Team</p>
    </div>`;

  const confirmationResult = await sendEmail({
    to: workEmail,
    from,
    subject: 'We received your Orenyx Private License inquiry',
    text: `Thanks for reaching out, ${fullName}.\n\nWe received your Private License inquiry for ${companyName}. The Orenyx team will review your details and follow up by email.\n\nWhat you submitted:\n${textLines}`,
    html: confirmationHtml,
  });

  if (!confirmationResult.skipped && !confirmationResult.ok) {
    // The lead already reached sales — don't fail the whole request over the
    // courtesy confirmation email, just log it for follow-up.
    console.error('[private-license] Confirmation email failed:', confirmationResult.detail);
  }

  return NextResponse.json({ ok: true, delivered: true });
}
