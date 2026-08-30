import { NextResponse } from 'next/server';

/**
 * Receives Request Access submissions.
 *
 * PLACEHOLDER — the client has not confirmed a destination inbox or a sending
 * provider. Until then this validates and logs. Wire the marked block to Resend
 * (or whatever he picks) and set REQUEST_ACCESS_TO_EMAIL before launch.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Accept quietly, deliver nothing.
  if (typeof body.company_website === 'string' && body.company_website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const required = ['name', 'email', 'company', 'title', 'companyWebsite'] as const;
  const missing = required.filter((k) => !body[k] || String(body[k]).trim() === '');

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}.` },
      { status: 400 },
    );
  }

  const to = process.env.REQUEST_ACCESS_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !apiKey) {
    console.warn('[request-access] No delivery configured. Submission:', body);
    return NextResponse.json({ ok: true, delivered: false });
  }

  // ── Delivery ────────────────────────────────────────────────────────────
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Resend rejects a `from` on any domain not verified in the account, so
      // this is overridable: use `onboarding@resend.dev` to test before the
      // orenyxengine.com DNS records are in place.
      from: process.env.REQUEST_ACCESS_FROM_EMAIL ?? 'Orenyx AI Engine™ <noreply@orenyxengine.com>',
      to,
      subject: `Access request — ${body.company}`,
      text: Object.entries(body)
        .filter(([k]) => k !== 'company_website')
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n'),
    }),
  });

  if (!res.ok) {
    console.error('[request-access] Delivery failed:', await res.text());
    return NextResponse.json({ error: 'Delivery failed.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
