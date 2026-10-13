import { NextResponse } from 'next/server';

/** Receives inquiries and only reports success after configured delivery succeeds. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (typeof body.company_website === 'string' && body.company_website.length > 0) {
    return NextResponse.json({ ok: true });
  }
  const required = ['name', 'email', 'company', 'title', 'companyWebsite'] as const;
  const missing = required.filter((k) => typeof body[k] !== 'string' || String(body[k]).trim() === '');
  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}.` }, { status: 400 });
  }
  const to = process.env.REQUEST_ACCESS_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!to || !apiKey) {
    console.error('[request-access] Email delivery is not configured.');
    return NextResponse.json({ error: 'Inquiry delivery is unavailable. Please email info@orenyxengine.com directly.' }, { status: 503 });
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.REQUEST_ACCESS_FROM_EMAIL ?? 'Orenyx AI Engine™ <noreply@orenyxengine.com>',
        to,
        subject: `Orenyx inquiry — ${body.company}`,
        text: Object.entries(body).filter(([k]) => k !== 'company_website').map(([k, v]) => `${k}: ${v}`).join('\n'),
      }),
    });
    if (!res.ok) {
      console.error('[request-access] Email delivery failed with status:', res.status);
      return NextResponse.json({ error: 'Delivery failed.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    console.error('[request-access] Email delivery request failed.');
    return NextResponse.json({ error: 'Delivery failed.' }, { status: 502 });
  }
}
