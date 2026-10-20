import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';

/**
 * Refunds an Orenyx Engine subscription payment — the plan's price only.
 * The 3% Orenyx Engine fee is nonrefundable and is kept.
 *
 * This is an owner-only action, guarded by a shared secret: the request
 * must carry the REFUND_SECRET env var's value. Without it (or without
 * the env var configured at all) the route refuses.
 *
 * The refund targets the subscription's most recent paid invoice (or a
 * specific invoice when invoiceId is given). The refund amount comes
 * from that invoice's own lines — never from the plan's current price,
 * which can change after a payment. The fee lines are identified by
 * their product name ("Orenyx Engine fee"); an invoice from before the
 * fee existed has no fee line and refunds in full.
 *
 * The cap: the refundable amount is the invoice's price lines minus the
 * refunds already issued against that payment, so a second call refunds
 * only the remainder and a double refund cannot happen.
 */
export async function POST(request: Request) {
  // 1. The guard: only the owner, with the secret.
  const secret = process.env.REFUND_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'Refunds are not configured.' },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Malformed request body.' },
      { status: 400 },
    );
  }

  if (body.secret !== secret) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 401 });
  }

  const subscriptionId =
    typeof body.subscriptionId === 'string' ? body.subscriptionId : '';
  const invoiceId =
    typeof body.invoiceId === 'string' ? body.invoiceId : '';
  if (!subscriptionId) {
    return NextResponse.json(
      { error: 'A subscription ID is required.' },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: 'Payments are not configured.' },
      { status: 503 },
    );
  }

  try {
    // 2. The invoice to refund: the one given, or the latest paid one.
    //    (The subscription reference on an invoice lives under
    //    parent.subscription_details in the current Stripe SDK.)
    const invoiceSubscriptionIdOf = (inv: Stripe.Invoice): string | null => {
      const sub = inv.parent?.subscription_details?.subscription;
      if (typeof sub === 'string') return sub;
      return sub && typeof sub === 'object' ? sub.id : null;
    };
    let invoice: Stripe.Invoice | undefined;
    if (invoiceId) {
      invoice = await stripe.invoices.retrieve(invoiceId);
      const invoiceSubscriptionId = invoiceSubscriptionIdOf(invoice);
      if (invoiceSubscriptionId !== subscriptionId) {
        return NextResponse.json(
          { error: 'That invoice does not belong to this subscription.' },
          { status: 400 },
        );
      }
    } else {
      const invoices = await stripe.invoices.list({
        subscription: subscriptionId,
        status: 'paid',
        limit: 1,
      });
      invoice = invoices.data[0];
    }
    if (!invoice) {
      return NextResponse.json(
        { error: 'No paid invoice found for this subscription.' },
        { status: 404 },
      );
    }

    // 3. The invoice's lines — the price versus the 3% fee. The fee
    //    lines are identified by their description (the fee product's
    //    name); an older invoice with no fee line refunds in full.
    let priceCents = 0;
    let feeCents = 0;
    for (const line of invoice.lines.data) {
      const description = line.description ?? '';
      if (description.includes('Orenyx Engine fee')) {
        feeCents += line.amount;
      } else {
        priceCents += line.amount;
      }
    }

    // 4. The payment to refund against. The current Stripe API exposes
    //    the payment intent on the invoice's payments (not directly on
    //    the invoice), so list them and take the successful one.
    const invoicePayments = await stripe.invoicePayments.list({
      invoice: invoice.id,
    });
    let paymentIntentId: string | null = null;
    for (const payment of invoicePayments.data) {
      const pi = payment.payment?.payment_intent;
      if (typeof pi === 'string' && pi.length > 0) {
        paymentIntentId = pi;
        break;
      }
    }
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'The invoice has no payment to refund.' },
        { status: 400 },
      );
    }

    // 5. The cap — the refunds already issued against this payment.
    const refunds = await stripe.refunds.list({
      payment_intent: paymentIntentId,
    });
    let alreadyRefundedCents = 0;
    for (const refund of refunds.data) {
      if (refund.status === 'succeeded') {
        alreadyRefundedCents += refund.amount;
      }
    }
    const remainingCents = priceCents - alreadyRefundedCents;
    if (remainingCents <= 0) {
      return NextResponse.json(
        {
          error:
            'The price has already been fully refunded — only the nonrefundable fee remains.',
        },
        { status: 400 },
      );
    }

    // 6. Issue the refund: the remaining price. The fee is kept.
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: remainingCents,
    });
    if (refund.status !== 'succeeded') {
      // Stripe did not confirm the refund — nothing is recorded, so it
      // can be retried once the reason is understood.
      return NextResponse.json(
        {
          error: `The refund did not succeed (Stripe status: ${refund.status}) — nothing was recorded.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      refundId: refund.id,
      refundedCents: remainingCents,
      feeKeptCents: feeCents,
      invoiceId: invoice.id,
    });
  } catch (err) {
    console.error('[refund-subscription] Stripe error:', err);
    return NextResponse.json(
      { error: 'Could not process the refund.' },
      { status: 502 },
    );
  }
}
