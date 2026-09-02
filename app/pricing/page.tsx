import { ButtonLink } from '@/components/ui/button';
import { FaqAccordion } from '@/components/faq-accordion';
import { PageHero } from '@/components/page-hero';
import { PricingEstimator } from '@/components/pricing-estimator';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { addOns, billableUnits, plans, pricingFaq, privateLicense } from '@/content/pricing';
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
        lead="Pay a base platform fee, plus usage across the events that matter to your business."
        title={
          <>
            Simple usage-based <span className="text-violet-soft">pricing</span>
            <br className="hidden md:block" /> that scales with you.
          </>
        }
      />

      {/* ── Plans ────────────────────────────────────────── */}
      <Section >
        <Reveal>
          <h2 className="heading-silver text-center h2Newfont font-bold md:text-[2.75rem]">
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
            <a href={privateLicense.contact.href} className="text-fg-soft underline">
              {privateLicense.contact.label}
            </a>
          </div>
        </Reveal>
      </Section>

      {/* ── Billable units + add-ons ─────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg text-violet-soft labelFFont">Billable units</p>
            <h2 className="heading-silver mt-3 h2Newfont font-bold leading-tight md:text-[2.75rem]">
              What the engine meters.
            </h2>
            <ul className="mt-8 space-y-5">
              {billableUnits.map((unit) => (
                <li key={unit} className="flex items-center gap-4 text-xl">
                  <svg width="50" height="50" viewBox="0 0 28 16" fill="none" aria-hidden="true">
                    <path
                      d="M1 8h24M20 3l5 5-5 5"
                      stroke="#8B7CFF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-35px font-bold">{unit}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-lg text-violet-soft labelFFont">Add-Ons</p>
            <div className="mt-6 space-y-4">
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
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <Section>
        <Reveal>
          <div className="rounded-panel bg-violet-gred p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <p className="text-lg text-white/75 labelFFont">Pricing</p>
                <h2 className="mt-3 h2Newfont font-bold leading-tight text-white md:text-[2.5rem]">
                  Frequently
                  <br />
                  Asked Questions
                </h2>
              </div>
              <FaqAccordion items={pricingFaq} />
            </div>
          </div>
        </Reveal>
      </Section>

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
