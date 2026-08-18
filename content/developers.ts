/**
 * Developers / API Docs copy — from the client Builder Packet, section 7.
 *
 * Anything the packet marked [PLACEHOLDER] is carried through as `null` and
 * rendered with the <Placeholder> marker, so scripts-check-placeholders.mjs
 * still gates launch on it.
 */

export const overview = {
  lead: 'API-first platform — everything is accessible via endpoints and webhooks.',
  baseUrlLabel: 'Base URL',
  /** PLACEHOLDER — the packet flags the domain as unconfirmed. */
  // Orenyx-pattern placeholder after the rebrand — still unconfirmed, and the
  // page still flags it. The real API domain must come from the client.
  baseUrl: 'https://api.orenyxaiengine.com/v1',
  baseUrlConfirmed: false,
};

export const authentication = {
  lead: 'API key–based authentication via an Authorization header.',
  header: 'Authorization: Bearer <API_KEY>',
  points: [
    'Keys are scoped per environment (sandbox vs. production) and per tenant.',
    'Key rotation is supported via the dashboard or the /auth/keys/rotate endpoint.',
  ],
};

export type Endpoint = {
  path: string;
  method: string;
  purpose: string;
  /** Flagged "(new)" in the packet — worth badging so the client can see them. */
  isNew?: boolean;
};

export const endpoints: Endpoint[] = [
  { path: '/dispatch/events', method: 'POST', purpose: 'Submit a dispatch event for routing' },
  { path: '/bots/execute', method: 'POST', purpose: 'Trigger a bot flow execution' },
  {
    path: '/payments/decision',
    method: 'POST',
    purpose: 'Request a payment risk/routing decision',
  },
  { path: '/context/state', method: 'GET/POST', purpose: 'Read or update shared context/state' },
  {
    path: '/webhooks/subscribe',
    method: 'POST',
    purpose: 'Register a webhook endpoint',
    isNew: true,
  },
  { path: '/auth/keys', method: 'GET/POST', purpose: 'Manage API keys', isNew: true },
];

export const rateLimits = [
  { plan: 'Starter', limit: '10 requests/second', burst: 'burst to 30' },
  { plan: 'Growth', limit: '50 requests/second', burst: 'burst to 150' },
  { plan: 'Enterprise', limit: 'Custom limits', burst: '—' },
];

export const rateLimitHeaders = ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'];

export const errorCodes = [
  { code: '400', meaning: 'Malformed request / validation error' },
  { code: '401', meaning: 'Invalid or missing API key' },
  { code: '403', meaning: 'Valid key, insufficient permissions' },
  { code: '404', meaning: 'Resource not found' },
  { code: '429', meaning: 'Rate limit exceeded' },
  { code: '500', meaning: 'Internal engine error' },
  { code: '503', meaning: 'Service temporarily unavailable' },
];

export const webhooks = {
  eventTypes: [
    'dispatch.completed',
    'bot.execution.completed',
    'payment.decision.completed',
    'context.updated',
  ],
  points: [
    'Signed payloads (HMAC signature header) for verification.',
    'Automatic retry with exponential backoff on failed deliveries, up to 5 attempts.',
  ],
};

export const versioning = {
  lead: 'URL-based versioning (/v1/, /v2/).',
  body:
    'Deprecated versions are supported for a minimum of 12 months after a new version ships, ' +
    'with advance notice via the Changelog and email.',
};

/** Target dates are PLACEHOLDER in the packet. */
export const sdkRoadmap: { name: string; date: string | null }[] = [
  { name: 'Node.js SDK', date: null },
  { name: 'Python SDK', date: null },
];

export const sdkNote =
  'Until SDKs ship, all functionality is available via plain REST calls — examples are provided ' +
  'in cURL, Node, and Python in the docs.';

export const sandbox = {
  lead: 'Every account includes a sandbox environment with test API keys.',
  points: [
    'Sandbox events do not incur usage charges and are clearly flagged in logs.',
    'Sandbox and production use isolated data — no cross-environment leakage.',
  ],
};

export const gettingStarted = [
  'Create account',
  'Generate API key (sandbox key issued automatically)',
  'Send first dispatch event (sandbox)',
  'View logs',
  'Request production access and generate a production key',
  'Go live',
];

/**
 * Reverse-chronological feed. Every entry is PLACEHOLDER in the packet — the
 * version numbers and descriptions are illustrative, not shipped releases.
 */
export const changelog: { version: string; body: string; date: string | null }[] = [
  { version: 'v1.2', body: 'Added /webhooks/subscribe endpoint', date: null },
  { version: 'v1.1', body: 'Added rate-limit headers to all responses', date: null },
  { version: 'v1.0', body: 'Initial public release', date: null },
];
