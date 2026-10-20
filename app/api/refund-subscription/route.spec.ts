import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * Unit tests for the owner-only subscription refund endpoint.
 *
 * Stripe is mocked entirely — no network, no charges. Each test stubs the
 * pieces the endpoint reads (the invoice's lines, the invoice's payments,
 * the refunds already issued) and asserts what the endpoint refunds and
 * what it keeps.
 */

const stripeMock = vi.hoisted(() => ({
  invoicesList: vi.fn(),
  invoicesRetrieve: vi.fn(),
  invoicePaymentsList: vi.fn(),
  refundsList: vi.fn(),
  refundsCreate: vi.fn(),
}));

const getStripeMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/stripe', () => ({
  getStripe: getStripeMock,
}));

import { POST } from './route';

/** A signed-in-style request body helper. */
function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/refund-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

/** A paid subscription invoice: $749 plan + $22.47 fee. */
function makeInvoice(overrides: Record<string, unknown> = {}) {
  return {
    id: 'in_test_1',
    status: 'paid',
    parent: {
      type: 'subscription_details',
      subscription_details: { subscription: 'sub_test_1' },
    },
    lines: {
      data: [
        { description: 'Orenyx Engine', amount: 74900 },
        { description: 'Orenyx Engine fee (3%)', amount: 2247 },
      ],
    },
    ...overrides,
  };
}

/** The default Stripe shape: a paid invoice paid by pi_test_1. */
function defaultStripe() {
  stripeMock.invoicesList.mockResolvedValue({ data: [makeInvoice()] });
  stripeMock.invoicesRetrieve.mockResolvedValue(makeInvoice());
  stripeMock.invoicePaymentsList.mockResolvedValue({
    data: [{ payment: { payment_intent: 'pi_test_1' } }],
  });
  stripeMock.refundsList.mockResolvedValue({ data: [] });
  stripeMock.refundsCreate.mockImplementation(({ amount }: { amount: number }) =>
    Promise.resolve({ id: 're_test_1', status: 'succeeded', amount }),
  );
}

beforeEach(() => {
  vi.stubEnv('REFUND_SECRET', 'test-secret');
  getStripeMock.mockReset();
  getStripeMock.mockReturnValue({
    invoices: {
      list: stripeMock.invoicesList,
      retrieve: stripeMock.invoicesRetrieve,
    },
    invoicePayments: { list: stripeMock.invoicePaymentsList },
    refunds: {
      list: stripeMock.refundsList,
      create: stripeMock.refundsCreate,
    },
  });
  for (const fn of Object.values(stripeMock)) fn.mockReset();
  defaultStripe();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('the refund endpoint guard', () => {
  it('refuses everything when REFUND_SECRET is not configured', async () => {
    vi.stubEnv('REFUND_SECRET', '');

    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: 'Refunds are not configured.' });
    expect(getStripeMock).not.toHaveBeenCalled();
  });

  it('refuses a request with the wrong secret', async () => {
    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'wrong' }),
    );

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: 'Not authorized.' });
    expect(getStripeMock).not.toHaveBeenCalled();
  });

  it('refuses a request without a subscription ID', async () => {
    const res = await POST(makeRequest({ secret: 'test-secret' }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: 'A subscription ID is required.',
    });
  });

  it('refuses a malformed request body', async () => {
    const res = await POST(makeRequest('not json'));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Malformed request body.' });
  });

  it('refuses when Stripe is not configured', async () => {
    getStripeMock.mockReturnValue(null);

    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: 'Payments are not configured.' });
  });
});

describe('the refund rule: the price is refunded, the 3% fee is kept', () => {
  it('refunds the plan price and keeps the fee', async () => {
    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ok: true,
      refundId: 're_test_1',
      refundedCents: 74900,
      feeKeptCents: 2247,
      invoiceId: 'in_test_1',
    });
    expect(stripeMock.refundsCreate).toHaveBeenCalledWith({
      payment_intent: 'pi_test_1',
      amount: 74900,
    });
  });

  it('refunds only what remains after an earlier refund', async () => {
    stripeMock.refundsList.mockResolvedValue({
      data: [{ id: 're_earlier', status: 'succeeded', amount: 30000 }],
    });

    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.refundedCents).toBe(44900); // 74900 - 30000
    expect(body.feeKeptCents).toBe(2247);
    expect(stripeMock.refundsCreate).toHaveBeenCalledWith({
      payment_intent: 'pi_test_1',
      amount: 44900,
    });
  });

  it('ignores refunds that did not succeed when computing the cap', async () => {
    stripeMock.refundsList.mockResolvedValue({
      data: [{ id: 're_pending', status: 'pending', amount: 74900 }],
    });

    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.refundedCents).toBe(74900);
  });

  it('refuses once the price is already fully refunded', async () => {
    stripeMock.refundsList.mockResolvedValue({
      data: [{ id: 're_earlier', status: 'succeeded', amount: 74900 }],
    });

    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error:
        'The price has already been fully refunded — only the nonrefundable fee remains.',
    });
    expect(stripeMock.refundsCreate).not.toHaveBeenCalled();
  });

  it('refunds a legacy invoice in full when it has no fee line', async () => {
    stripeMock.invoicesList.mockResolvedValue({
      data: [
        makeInvoice({
          lines: { data: [{ description: 'Orenyx Engine', amount: 74900 }] },
        }),
      ],
    });

    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.refundedCents).toBe(74900);
    expect(body.feeKeptCents).toBe(0); // no fee is invented
  });

  it('does not report success when Stripe does not confirm the refund', async () => {
    stripeMock.refundsCreate.mockResolvedValue({
      id: 're_test_1',
      status: 'pending',
      amount: 74900,
    });

    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.error).toContain('did not succeed');
  });
});

describe('finding the payment to refund', () => {
  it('refunds the latest paid invoice when none is specified', async () => {
    await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(stripeMock.invoicesList).toHaveBeenCalledWith({
      subscription: 'sub_test_1',
      status: 'paid',
      limit: 1,
    });
    expect(stripeMock.invoicesRetrieve).not.toHaveBeenCalled();
  });

  it('refunds a specific invoice when one is given', async () => {
    const res = await POST(
      makeRequest({
        subscriptionId: 'sub_test_1',
        invoiceId: 'in_test_1',
        secret: 'test-secret',
      }),
    );

    expect(stripeMock.invoicesRetrieve).toHaveBeenCalledWith('in_test_1');
    expect(res.status).toBe(200);
  });

  it('refuses an invoice that belongs to a different subscription', async () => {
    stripeMock.invoicesRetrieve.mockResolvedValue(
      makeInvoice({
        parent: {
          type: 'subscription_details',
          subscription_details: { subscription: 'sub_other' },
        },
      }),
    );

    const res = await POST(
      makeRequest({
        subscriptionId: 'sub_test_1',
        invoiceId: 'in_test_1',
        secret: 'test-secret',
      }),
    );

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: 'That invoice does not belong to this subscription.',
    });
    expect(stripeMock.refundsCreate).not.toHaveBeenCalled();
  });

  it('refuses when there is no paid invoice', async () => {
    stripeMock.invoicesList.mockResolvedValue({ data: [] });

    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({
      error: 'No paid invoice found for this subscription.',
    });
  });

  it('refuses when the invoice has no payment intent', async () => {
    stripeMock.invoicePaymentsList.mockResolvedValue({
      data: [{ payment: {} }],
    });

    const res = await POST(
      makeRequest({ subscriptionId: 'sub_test_1', secret: 'test-secret' }),
    );

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: 'The invoice has no payment to refund.',
    });
    expect(stripeMock.refundsCreate).not.toHaveBeenCalled();
  });
});
