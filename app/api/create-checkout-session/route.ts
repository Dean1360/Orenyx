import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { plans, voiceDispatchPlans } from '@/content/pricing';

/**
 * Creates a real Stripe Checkout Session for a plan and returns its hosted
 * payment URL. Only works once Cliff has:
 *   1. Added STRIPE_SECRET_KEY to the server environment, and
 *   2. Created a recurring Price in Stripe for the plan and set its ID in
 *      the env var named by that plan's `stripePriceEnvVar` in
 *      content/pricing.ts (optionally also `stripeOnboardingPriceEnvVar`
 *      for a one-time Price covering the onboarding fee).
 *
 * Until both are set for a given plan, this returns 503 and the client
 * falls back to the existing manual request-access flow.
 */
function findPlanConfig(planId: string) {
  const aiPlan = plans.find((p) => p.id === planId);
  if (aiPlan) {
    return {
      priceEnvVar: aiPlan.stripePriceEnvVar,
      onboardingPriceEnvVar: aiPlan.stripeOnboardingPriceEnvVar,
    };
  }
  const voicePlan = voiceDispatchPlans.find((p) => p.id === planId);
  if (voicePlan) {
    return {
      priceEnvVar: voicePlan.stripePriceEnvVar,
      onboardingPriceEnvVar: voicePlan.stripeOnboardingPriceEnvVar,
    };
  }
  return null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  const planId = typeof body.planId === 'string' ? body.planId : '';
  const config = planId ? findPlanConfig(planId) : null;

  if (!config || !config.priceEnvVar) {
    return NextResponse.json(
      { error: 'This plan is not set up for automatic checkout yet.' },
      { status: 400 },
    );
  }

  const priceId = process.env[config.priceEnvVar];
  if (!priceId) {
    return NextResponse.json(
      { error: 'Payments are not configured for this plan yet.', configured: false },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: 'Payments are not configured yet.', configured: false },
      { status: 503 },
    );
  }

  const onboardingPriceId = config.onboardingPriceEnvVar
    ? process.env[config.onboardingPriceEnvVar]
    : undefined;

  const origin = request.headers.get('origin') ?? new URL(request.url).origin;
  const email = typeof body.email === 'string' ? body.email : undefined;
  const name = typeof body.name === 'string' ? body.name : '';
  const company = typeof body.company === 'string' ? body.company : '';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [
        { price: priceId, quantity: 1 },
        ...(onboardingPriceId ? [{ price: onboardingPriceId, quantity: 1 }] : []),
      ],
      metadata: { planId, name, company },
      subscription_data: { metadata: { planId, name, company } },
      success_url: `${origin}/thank-you?paid=1`,
      cancel_url: `${origin}/checkout?plan=${planId}`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a checkout URL.' }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[create-checkout-session] Stripe error:', err);
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 502 });
  }
}
