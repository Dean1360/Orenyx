import { ButtonLink } from '@/components/ui/button';
import { DemoVideo } from '@/components/demo-video';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { closingCta } from '@/content/home';
import {
  callFlow,
  complianceNote,
  voiceFeatures,
  voiceHero,
} from '@/content/voice-dispatch';
import { pageMeta } from '@/lib/seo';

const voiceDashboardCategories = [
  {
    name: 'Calls',
    items: [
      'Full call logs with transcripts',
      'Listen back to recorded calls',
      'See how each call was routed',
    ],
  },
  {
    name: 'Routing & IVR',
    items: [
      'Manage call routing rules and fallback paths',
      'Configure IVR menus and multi-line / multi-location routing',
      'Set business hours and after-hours handling',
    ],
  },
  {
    name: 'Analytics',
    items: [
      'Call volume and answer-rate reporting',
      'Call-to-job conversion (when paired with Orenyx AI Engine)',
      'Export reports and manage notification settings',
    ],
  },
];

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

      {/* ── Demo video ───────────────────────────────────── */}
      <Section tone="dark">
        <Reveal>
          <div className="mx-auto flex max-w-[92%] items-center justify-center gap-2 rounded-full border-2 border-violet-soft bg-white/10 px-5 py-3 text-center text-sm font-bold text-white sm:w-max sm:max-w-none sm:px-7 sm:text-lg md:text-xl">
            24/7 Coverage — Never Miss an Emergency Call or Booking
          </div>

          <p className="mx-auto mt-8 max-w-[600px] text-center text-xl font-semibold text-white/85 md:text-2xl">
            Watch how Orenyx handles a dispatch call, step by step.
          </p>

          <div className="mx-auto mt-8 max-w-[900px] overflow-hidden rounded-[var(--radius-panel)] border border-line-violet">
            <DemoVideo src="/videos/voice-dispatch-demo.mp4" />
          </div>
        </Reveal>
      </Section>

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

      {/* ── Closing CTA ──────────────────────────────────── */}
      <Section className="newpadding0 " tone="hero">
        <Reveal>
          <div className="rounded-panel newbg-cta px-8 py-16 text-center md:px-16">
            <h2 className="mx-auto  text-3xl font-bold leading-tight h2Newfont text-white md:text-[2.5rem]">
              {closingCta.title}
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/pricing#voice-dispatch" variant="dark">
                Pricing
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Your Voice Dispatch dashboard ────────────────── */}
      <Section>
        <SectionHead
          align="center"
          title="Your Voice Dispatch Dashboard"
          lead="Every account gets a dashboard for the calls the Engine answers and routes on your behalf."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {voiceDashboardCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 60}>
              <div className="flex h-full flex-col rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
                <p className="text-lg font-bold text-violet-bright">{cat.name}</p>
                <ul className="mt-5 space-y-3 text-sm font-srs">
                  {cat.items.map((item) => (
                    <li key={item} className="text-fg-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
