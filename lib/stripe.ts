import Stripe from 'stripe';

/**
 * Lazily-created Stripe client. Returns null when STRIPE_SECRET_KEY is not
 * yet configured on the server, so callers can gracefully fall back to the
 * manual request-access flow instead of throwing.
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}
