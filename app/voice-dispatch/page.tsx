import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { voiceDispatchPlans } from '@/content/pricing';
import {
  callFlow,
  complianceNote,
  voiceDemoVideo,
  voiceFeatures,
  voiceHero,
  voicePricingNote,
} from '@/content/voice-dispatch';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: 'Voice Dispatch — Orenyx AI Engine™',
  title: 'Voice Dispatch',
  description:
    'Orenyx Voice Dispatch — the dispatch-only tier of Orenyx AI Engine. Calls answered, jobs booked, techs routed, priced by call volume.',
  path: '/voice-dispatch',
});

export default function VoiceDispatchPage() {
  return (
    <>
      <PageHero crumb="Voice Dispatch" title={voiceHero.title} lead={voiceHero.lead} />

      {/* ── Call flow ────────────────────────────────────── */}
      <Section tone="dark">
        <SectionHead eyebrow={callFlow.eyebrow} title={callFlow.title} align="center" silver />

        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {callFlow.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
                <span className="font-mono text-3xl font-bold tabular-nums text-violet-bright/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-lg font-bold text-white">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-soft">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Features ─────────────────────────────────────── */}
      <Section tone="violet">
        <SectionHead eyebrow="What's included" title="Everything the dispatch tier covers." />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {voiceFeatures.map((f, i) => (
            <Reveal key={f.name} delay={i * 70}>
              <div className="rounded-[14px] border border-white/15 bg-white/5 p-6">
                <p className="text-lg font-bold text-white">{f.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Compliance ───────────────────────────────────── */}
      <Section tone="dark">
        <Reveal>
          <div className="mx-auto max-w-[820px] rounded-[14px] border border-line-violet bg-bg-2/50 p-8 text-center">
            <p className="text-lg font-bold text-violet-bright">{complianceNote.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-fg-soft">{complianceNote.body}</p>
          </div>
        </Reveal>
      </Section>

      {/* ── Demo video placeholder ───────────────────────── */}
      <Section tone="dark">
        <SectionHead eyebrow="See it in action" title="Watch the dispatch flow." align="center" silver />
        <Reveal>
          <div className="mx-auto mt-8 flex max-w-[900px] flex-col items-center justify-center gap-3 rounded-[var(--radius-panel)] border border-dashed border-line-violet bg-bg-2/40 px-6 py-20 text-center">
            <span className="font-mono text-xs uppercase tracking-wide text-violet-soft">
              {voiceDemoVideo.label}
            </span>
            <p className="max-w-[520px] text-sm leading-relaxed text-fg-soft">{voiceDemoVideo.body}</p>
          </div>
        </Reveal>
      </Section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <Section tone="violet">
        <SectionHead
          eyebrow={voicePricingNote.eyebrow}
          title={voicePricingNote.title}
          lead={voicePricingNote.lead}
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {voiceDispatchPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 70}>
              <div
                className={`flex h-full flex-col rounded-[14px] border p-6 ${
                  plan.mostPopular
                    ? 'border-violet-bright bg-white/10'
                    : 'border-white/15 bg-white/5'
                }`}
              >
                {plan.mostPopular ? (
                  <span className="mb-2 w-fit rounded-full bg-violet-bright px-3 py-1 text-xs font-bold text-white">
                    Most popular
                  </span>
                ) : null}
                <p className="text-lg font-bold text-white">{plan.name}</p>
                <p className="mt-1 text-sm text-white/70">{plan.calls}</p>
                <p className="mt-4 text-2xl font-bold text-white">{plan.price}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/contact" variant="light">
            Request Access
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
