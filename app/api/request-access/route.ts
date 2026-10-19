import { NextResponse } from 'next/server';

/**
 * Receives inquiries and stores them in the Orenyx Engine lead pipeline
 * (Orenyx Main tenant), where they are scored and visible in the portal.
 * Optionally also emails the submission via Resend when configured —
 * storage in the Engine is the primary, always-on path.
 */

const LEAD_ENDPOINT = 'https://portal.orenyxengine.com/api/v1/triggers/lead';
const ORENYX_MAIN_TENANT_ID = 'cmqpsghtg0000fvmgr0vowgsa';

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
  // Honeypot: bots that fill the hidden field get a fake success.
  if (typeof body.company_website === 'string' && body.company_website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const required = ['name', 'email', 'company'] as const;
  const missing = required.filter((k) => typeof body[k] !== 'string' || String(body[k]).trim() === '');
  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}.` }, { status: 400 });
  }
  const str = (v: unknown) => (typeof v === 'string' && v.trim() !== '' ? v.trim() : '');

  const nameParts = str(body.name).split(/\s+/);
  const detailLines = [
    str(body.company) ? `Company: ${str(body.company)}` : '',
    str(body.title) ? `Title: ${str(body.title)}` : '',
    str(body.companyWebsite) ? `Website: ${str(body.companyWebsite)}` : '',
    str(body.useCase) ? `Use case: ${str(body.useCase)}` : '',
    str(body.volume) ? `Volume: ${str(body.volume)}` : '',
    str(body.selectedPlan) ? `Plan of interest: ${str(body.selectedPlan)}` : '',
    str(body.message) ? `Message: ${str(body.message)}` : '',
  ].filter(Boolean);

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenantId: ORENYX_MAIN_TENANT_ID,
        email: str(body.email),
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        message: detailLines.join('\n'),
        source: 'orenyxengine.com',
      }),
    });
    if (!res.ok) {
      console.error('[request-access] Engine lead intake failed with status:', res.status);
      return NextResponse.json({ error: 'Delivery failed. Please email info@orenyxengine.com directly.' }, { status: 502 });
    }

    // Optional inbox notification — only when Resend is configured.
    // Storage above already succeeded, so a failure here must not fail the form.
    const to = process.env.REQUEST_ACCESS_TO_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    if (to && apiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: process.env.REQUEST_ACCESS_FROM_EMAIL ?? 'Orenyx AI Engine™ <noreply@orenyxengine.com>',
            to,
            subject: `Orenyx inquiry — ${str(body.company)}`,
            text: detailLines.join('\n'),
          }),
        });
      } catch (err) {
        console.error('[request-access] Optional email notification failed:', err);
      }
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[request-access] Engine lead intake request failed:', err);
    return NextResponse.json({ error: 'Delivery failed. Please email info@orenyxengine.com directly.' }, { status: 502 });
  }
}
