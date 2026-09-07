import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { PricingEstimator } from '@/components/pricing-estimator';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import {
  addOns,
  plans,
  privateLicense,
  voiceDispatchPlans,
} from '@/content/pricing';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: 'Pricing — Orenyx AI Engine™',
  title: 'Pricing',
  description:
    'Usage-based pricing for dispatch events, bot executions, and payment decisions. Starter, Growth, and Enterprise plans.',
  path: '/pricing',
});

function ArrowBullet() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-1 shrink-0 text-violet-bright"
    >
      <path
        d="M2 8h10M8.5 4.5L12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumb="Pricing"
        lead="Compare Orenyx Voice Dispatch and Orenyx AI Engine side by side. Each plan includes usage limits — additional usage beyond those limits is billed at the listed overage rate."
        title={
          <>
            Simple usage-based <span className="text-violet-soft">pricing</span>
            <br className="hidden md:block" /> that scales with you.
          </>
        }
      />

      {/* ── Voice Dispatch plans ──────────────────────────── */}
      <Section id="voice-dispatch" tone="violet">
        <Reveal>
          <p className="labelFFont text-center text-sm font-bold uppercase tracking-wide text-white/70">
            Orenyx Voice Dispatch
          </p>
          <h2 className="mt-2 text-center h2Newfont font-bold text-white md:text-[2.75rem]">
            Dispatch-only pricing.
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-lg newFont-Parra leading-relaxed text-white/85">
            Priced by AI call minutes instead of API/bot usage — pick the tier that matches how
            much talk time you need each month.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 pricechnasgeFont">
          {voiceDispatchPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 70} className="h-full">
              <div className="pricechnageFont flex h-full flex-col rounded-[14px] border-2 border-white/30 bg-bg/50 p-8">
                {plan.mostPopular ? (
                  <span className="mb-2 w-fit rounded-full bg-violet-bright px-3 py-1 text-xs font-bold text-bg">
                    Most popular
                  </span>
                ) : null}
                <p className="text-xl font-bold text-white">{plan.name}</p>
                <p className="mt-1 text-sm text-white/70">{plan.minutes}</p>
                <p className="mt-1 text-xs text-white/60">{plan.overage}</p>

                <p className="mt-3 whitespace-nowrap text-3xl font-bold text-white sm:text-[2rem]">
                  {plan.price}
                </p>
                <p className="mt-1 text-xs text-white/60">{plan.onboarding}</p>

                <ButtonLink href={`/checkout?plan=${plan.id}`} className="mt-6 w-full">
                  Check Out
                </ButtonLink>

                <ul className="mt-6 space-y-3 text-sm font-srs">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 font-medium text-white/90">
                      <ArrowBullet />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── AI Engine plans ──────────────────────────────── */}
      <Section id="ai-engine">
        <Reveal>
          <p className="labelFFont text-center text-sm font-bold uppercase tracking-wide text-violet-soft">
            Orenyx AI Engine
          </p>
          <h2 className="heading-silver mt-2 text-center h2Newfont font-bold md:text-[2.75rem]">
            Plan Comparison
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 pricechnasgeFont">
          {plans.map((plan, i) => (
            <Reveal key={plan.id}  delay={i * 70}>
              <div className="pricechnageFont flex h-full flex-col rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
                <p className="text-lg font-bold text-violet-bright">{plan.name}</p>
                {plan.subtitle ? (
                  <p className="mt-1 text-sm text-fg-soft">{plan.subtitle}</p>
                ) : null}

                <p className="mt-3 pricens font-bold">
                  {plan.price}
                  {plan.priceSuffix ? (
                    <span className="text-lg font-medium vaiolatecolor">{plan.priceSuffix}</span>
                  ) : null}
                </p>
                <p className="mt-1 text-xs text-fg-soft">{plan.onboarding}</p>

                <ButtonLink href={plan.cta.href} className="mt-6 w-full">
                  {plan.cta.label}
                </ButtonLink>

                <dl className="mt-7 space-y-3 border-b border-line pb-6 text-sm">
                  {plan.metered.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-fg-soft">{row.label}</dt>
                      <dd
                        className={`text-right font-medium ${
                          row.accent ? 'text-violet-bright' : 'text-white'
                        }`}
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 space-y-3 text-sm font-srs">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-fg-soft">
                      <ArrowBullet />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={plans.length * 70}>
          <div className="mt-6 flex flex-col items-center gap-2 rounded-[14px] border border-line-violet bg-bg-2/50 p-6 text-center">
            <p className="text-lg font-bold text-violet-bright">
              {privateLicense.name} — {privateLicense.price}
            </p>
            <p className="text-sm text-fg-soft">{privateLicense.subtitle}</p>

            <ul className="mt-4 grid gap-3 text-left text-sm font-srs sm:grid-cols-2 lg:grid-cols-3">
              {privateLicense.features.map((f) => (
                <li key={f} className="flex gap-3 text-fg-soft">
                  <ArrowBullet />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a href={privateLicense.contact.href} className="mt-5 text-violet-bright underline">
              {privateLicense.contact.label}
            </a>
          </div>
        </Reveal>
      </Section>

      {/* ── Add-Ons ──────────────────────────── */}
      <Section>
        <Reveal>
          <p className="text-lg text-violet-soft labelFFont">Add-Ons</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {addOns.map((addon, i) => (
              <div
                key={`${addon.name}-${i}`}
                className="rounded-[10px] border border-line-violet bg-bg-2/50 p-6"
              >
                <h3 className="font-35px font-bold">{addon.name}</h3>
                <p className="mt-2 text-20px text-fg-soft">{addon.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      {/* ── Estimator ────────────────────────────────────── */}
      <Section className="dnones">
        <Reveal>
          <p className="text-sm text-violet-soft">Estimator</p>
          <h2 className="heading-silver mt-2 text-3xl font-bold md:text-[2.5rem]">
            Work out your monthly cost
          </h2>
          <div className="mt-8">
            <PricingEstimator />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
