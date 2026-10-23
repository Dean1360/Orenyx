import { NextRequest, NextResponse } from 'next/server';

/**
 * The site-wide password gate.
 *
 * The site is private until launch: a visitor without the gate cookie
 * sees a password prompt instead of the site. Entering the correct
 * password sets a cookie (30 days) and lets them through. The same
 * effect as an nginx basic-auth gate, implemented as middleware because
 * the site runs on Vercel (no server config to edit).
 *
 * The gate password comes from ENGINE_GATE_PASSWORD (set in Vercel),
 * with a fallback for local development.
 */

const GATE_PASSWORD = process.env.ENGINE_GATE_PASSWORD ?? 'orenyx2026';
const COOKIE_NAME = 'engine_gate_ok';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function middleware(req: NextRequest) {
  // The launch switch: set ENGINE_GATE_ENABLED=false in Vercel to make
  // the site public (the gate bypassed). Default (unset or 'true'): the
  // gate is on — the site is private.
  if (process.env.ENGINE_GATE_ENABLED === 'false') {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;

  // The password submission (the gate form posts here).
  if (req.method === 'POST' && pathname === '/__gate') {
    let password = '';
    try {
      const form = await req.formData();
      password = String(form.get('password') ?? '');
    } catch {
      password = '';
    }
    if (password === GATE_PASSWORD) {
      const res = NextResponse.redirect(new URL('/', req.url), 303);
      res.cookies.set(COOKIE_NAME, 'ok', {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
      });
      return res;
    }
    return gatePage('That password is not right - try again.');
  }

  // Already authenticated: let them through.
  if (req.cookies.get(COOKIE_NAME)?.value === 'ok') {
    return NextResponse.next();
  }

  // Not authenticated: the gate.
  return gatePage();
}

/**
 * The gate page: a simple, dark password prompt that matches the site.
 */
function gatePage(message = ''): NextResponse {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Orenyx Engine</title>
<style>
  body { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; background: #0b0d14; color: #e8eaf0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
  .card { background: #151925; border: 1px solid #232936; border-radius: 12px; padding: 2rem; max-width: 380px; width: 90%; box-sizing: border-box; }
  h1 { font-size: 1.15rem; margin: 0 0 .4rem; font-weight: 600; }
  p { color: #9aa3b5; font-size: .85rem; line-height: 1.5; margin: 0 0 1rem; }
  input { width: 100%; box-sizing: border-box; background: #11141d; border: 1px solid #232936; border-radius: 8px; padding: .65rem .8rem; color: #e8eaf0; font-size: 1rem; margin-bottom: .75rem; outline: none; }
  input:focus { border-color: #8b5cf6; }
  button { width: 100%; background: #8b5cf6; border: none; border-radius: 8px; padding: .65rem; color: #fff; font-size: 1rem; font-weight: 600; cursor: pointer; }
  button:hover { background: #7c4cf0; }
  .err { color: #f87171; font-size: .85rem; margin: .75rem 0 0; }
</style>
</head>
<body>
  <div class="card">
    <h1>Orenyx Engine</h1>
    <p>This site is private. Enter the password to continue.</p>
    <form method="post" action="/__gate">
      <input type="password" name="password" placeholder="Password" autocomplete="current-password" autofocus required>
      <button type="submit">Enter</button>
    </form>
    ${message ? `<p class="err">${message}</p>` : ''}
  </div>
</body>
</html>`;
  return new NextResponse(html, {
    status: 401,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

/**
 * Run the middleware on everything except the static assets (the Next.js
 * build output, the favicon, and the app icons). The gate submission
 * route (/__gate) is handled inside the middleware itself.
 */
export const config = {
  matcher: ['/((?!_next|favicon.ico|icon.png|apple-icon.png).*)'],
};
