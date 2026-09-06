import { ButtonLink } from '@/components/ui/button';
import { DemoVideo } from '@/components/demo-video';
import { Logo } from '@/components/logo';
import Image from 'next/image';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead, Shell } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { capabilityOverview, closingCta, hero, solution } from '@/content/home';
import { dashboardCategories, dashboardHero } from '@/content/dashboard';

export const metadata = pageMeta({
  titleTag: 'Orenyx AI Engine™ — Unified AI for Dispatch, Payments & Bots',
  title: 'Orenyx AI Engine',
  description:
    'The AI decision layer behind Orenyx Voice Dispatch, Orenyx Dispatch, and Orenyx Payment — now available as a standalone platform.',
  path: '/ai-engine',
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

export default function AiEnginePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="hero-band home-pagebanner relative overflow-hidden">
        <Shell className="relative z-10 py-16 text-center md:py-20">
          <h1 className="homepage-title mx-auto max-w-[906px] text-4xl font-bold leading-[1.12] md:text-[3.25rem]">
            {hero.titleBefore}
            <span className="text-violet-soft">{hero.titleAccent}</span>
            {hero.titleAfter}
          </h1>

          <div className="mx-auto mt-6 flex max-w-[92%] items-center justify-center gap-2 rounded-full border-2 border-violet-soft bg-white/10 px-5 py-3 text-center text-sm font-bold text-white sm:w-max sm:max-w-none sm:px-7 sm:text-lg md:text-xl">
            24/7 Coverage — Never Miss an Emergency Call or Booking
          </div>

          <p className="mx-auto mt-8 text-xl font-semibold text-white/85 md:text-2xl">
            Watch how Orenyx handles a real job, step by step.
          </p>

          <div className="mx-auto mt-4 max-w-[900px] overflow-hidden rounded-[var(--radius-panel)] border border-line-violet">
            <DemoVideo />
          </div>

        </Shell>
      </div>

      {/* ── Solution ─────────────────────────────────────── */}
      <Section pattern="dots" tone="hero">
        <Reveal>
          <SectionHead eyebrow={solution.eyebrow} title={solution.title} lead={solution.lead} />
        </Reveal>

        <Reveal>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-lg newFont-Parra font-bold leading-relaxed text-white">
            Now you can upscale your business at any time.
          </p>
        </Reveal>

      </Section>

      {/* ── Full capability overview ─────────────────────── */}
      <Section tone="hero">
        <Reveal>
          <SectionHead
            align="center"
            eyebrow={capabilityOverview.eyebrow}
            title={capabilityOverview.title}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityOverview.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 40}>
              <div className="h-full overflow-hidden border-topmanage border border-line-violet">
                <div className="px-4 py-3 bg-violet text-white">
                  <div className="text-fontchnage font-bold leading-tight">{item.name}</div>
                </div>
                <p className="px-4 py-5 text-sm leading-relaxed text-fg-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Your AI Engine dashboard ──────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead align="center" title={dashboardHero.title} lead={dashboardHero.lead} />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dashboardCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 50}>
              <div className="flex h-full flex-col rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
                <p className="text-lg font-bold text-violet-bright">{cat.name}</p>
                <ul className="mt-5 space-y-3 text-sm font-srs">
                  {cat.items.map((item) => (
                    <li key={item} className="flex gap-3 text-fg-soft">
                      <ArrowBullet />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>


      {/* ── Closing CTA ──────────────────────────────────── */}
      <Section className="newpadding0 " tone="hero">
        <Reveal>
          <div className="rounded-panel newbg-cta px-8 py-16 text-center md:px-16" >
            <h2 className="mx-auto  text-3xl font-bold leading-tight h2Newfont text-white md:text-[2.5rem]">
              {closingCta.title}
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href={closingCta.cta.href} variant="dark">
                {closingCta.cta.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
