'use client';

import { useMemo, useState } from 'react';
import { monthlyCost, plans } from '@/content/pricing';

const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/**
 * Estimates a monthly bill by dispatch-event volume. Client-side only —
 * nothing is charged and no request leaves the browser.
 */
export function PricingEstimator() {
  const [events, setEvents] = useState(50_000);

  const rows = useMemo(
    () =>
      plans
        .filter((p) => p.model)
        .map((p) => ({ plan: p, cost: monthlyCost(p, events) as number })),
    [events],
  );

  const cheapest = rows.reduce((a, b) => (b.cost < a.cost ? b : a), rows[0]);

  return (
    <div className="rounded-[14px] border border-line-violet bg-bg-2/60 p-6 md:p-8">
      <label htmlFor="events" className="text-sm text-violet-soft">
        Dispatch events per month
      </label>

      <output htmlFor="events" aria-live="polite" className="mt-2 block text-3xl font-bold">
        {events.toLocaleString('en-US')}
      </output>

      <input
        id="events"
        type="range"
        min={1000}
        max={2_500_000}
        step={1000}
        value={events}
        onChange={(e) => setEvents(Number(e.target.value))}
        className="mt-5 w-full accent-violet-bright"
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {rows.map(({ plan, cost }) => {
          const best = plan.id === cheapest.plan.id;
          return (
            <div
              key={plan.id}
              className={`rounded-[10px] border p-5 ${
                best ? 'border-violet-bright bg-violet/20' : 'border-line'
              }`}
            >
              <p className="text-sm text-violet-soft">{plan.name}</p>
              <p className="mt-2 text-2xl font-bold">{usd(cost)}</p>
              <p className="mt-1 text-sm text-fg-muted">
                {plan.model!.includedDispatch.toLocaleString('en-US')} included, then $
                {plan.model!.overagePer1k.toFixed(2)} per 1,000
              </p>
              {best ? (
                <p className="mt-3 text-sm text-violet-bright">Lowest at this volume</p>
              ) : null}
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-fg-muted">
        Estimate only, based on dispatch events. Final pricing is confirmed on your order form.
      </p>
    </div>
  );
}
