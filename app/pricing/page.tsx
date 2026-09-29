import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { PricingEstimator } from '@/components/pricing-estimator';
import { VoiceDispatchPlans } from '@/components/voice-dispatch-plans';
import { AiEnginePlans } from '@/components/ai-engine-plans';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import {
  addOns,
  plans,
  operationalCompliance,
  privateLicense,
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

        <VoiceDispatchPlans />
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

        <AiEnginePlans />

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

        <Reveal delay={plans.length * 70 + 70}>
          <div className="mt-6 flex flex-col items-center gap-2 rounded-[14px] border border-line-violet bg-bg-2/50 p-6 text-center">
            <p className="text-lg font-bold text-violet-bright">
              {operationalCompliance.name} — {operationalCompliance.price}
            </p>
            <p className="text-sm text-fg-soft">{operationalCompliance.subtitle}</p>

            <ul className="mt-4 grid gap-3 text-left text-sm font-srs sm:grid-cols-2 lg:grid-cols-3">
              {operationalCompliance.features.map((f) => (
                <li key={f} className="flex gap-3 text-fg-soft">
                  <ArrowBullet />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a href={operationalCompliance.contact.href} className="mt-5 text-violet-bright underline">
              {operationalCompliance.contact.label}
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
