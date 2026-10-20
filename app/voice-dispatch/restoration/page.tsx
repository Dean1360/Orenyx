import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { HeroVideo } from '@/components/hero-video';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: 'Restoration Dispatch — Orenyx Voice Dispatch',
  title: 'Restoration Dispatch',
  description:
    'Orenyx Voice Dispatch configured for water, fire, and mold restoration companies. Every emergency call answered, captured, and turned into a booked job.',
  path: '/voice-dispatch/restoration',
});

/**
 * Voice Dispatch for restoration companies. Nothing restoration-specific has
 * been built — this page presents the existing Voice Dispatch product as it
 * applies to restoration work, without claiming features that do not exist
 * (photo/video intake, escalation chains, arrival-time updates, or
 * restoration-only pricing).
 */
const whatItDoes = [
  'Answers every call, 24/7',
  'Captures the address and the details of the damage',
  'Alerts the on-call technician',
  'Books the visit automatically',
  'Sends the customer a confirmation',
  'Creates the job automatically',
  'Handles job codes and billing at closeout',
  'Runs on the same engine as the rest of your work',
];

const safetyRules = [
  'Every water, fire, and mold call is answered, day or night',
  'The AI follows the rules your company sets',
  'When a call needs a person, it transfers live',
  'Your team keeps full control of every decision',
];

export default function RestorationPage() {
  return (
    <>
      <PageHero
        crumb="Restoration"
        title="Restoration Dispatch"
        lead="Water • Fire • Mold. Orenyx Voice Dispatch configured for restoration companies — every emergency call answered, captured, and turned into a booked job."
      />

      {/* ── Ad video ─────────────────────────────────────── */}
      <Section tone="dark">
        <Reveal>
          <SectionHead eyebrow="Watch" title="See it in 15 seconds." align="center" silver />
          <div className="mx-auto mt-8 max-w-[760px] overflow-hidden rounded-[var(--radius-panel)] border border-line-violet">
            <HeroVideo src="/videos/restoration-ad.mp4" poster="/videos/restoration-ad-poster.jpg" />
          </div>
        </Reveal>
      </Section>

      {/* ── What it does ─────────────────────────────────── */}
      <Section tone="dark">
        <SectionHead eyebrow="What it does" title="Every emergency call, handled." align="center" silver />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {whatItDoes.map((item, i) => (
            <Reveal key={item} delay={i * 50}>
              <div className="flex h-full items-start gap-4 rounded-[14px] border border-line-violet bg-bg-2/50 p-5">
                <span className="font-mono text-xl font-bold tabular-nums text-violet-bright/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base font-semibold text-white">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Safety rules ─────────────────────────────────── */}
      <Section tone="violet">
        <SectionHead eyebrow="How it works" title="Built to never miss an emergency." />
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {safetyRules.map((rule, i) => (
            <Reveal key={rule} delay={i * 50}>
              <li className="flex h-full items-start gap-3 rounded-[14px] border border-white/15 bg-white/5 p-5 text-white">
                <svg className="mt-0.5 shrink-0 text-violet-soft" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-base">{rule}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Who it's for ─────────────────────────────────── */}
      <Section tone="dark">
        <Reveal>
          <div className="mx-auto max-w-[820px] rounded-[14px] border border-line-violet bg-bg-2/50 p-8 text-center">
            <p className="text-lg font-bold text-violet-bright">Who it&rsquo;s for</p>
            <p className="mt-3 text-base leading-relaxed text-white">
              Restoration companies with 2&ndash;50 techs and franchise locations.
            </p>
            <p className="mt-3 text-sm text-fg-soft">Launching first in Houston, then TX, FL, AZ, and CA.</p>
          </div>
        </Reveal>
      </Section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <Section id="pricing" tone="violet" className="scroll-mt-40">
        <SectionHead
          eyebrow="Pricing"
          title="Same plans as Voice Dispatch"
          align="center"
        />
        <Reveal>
          <div className="mx-auto mt-8 max-w-[640px] rounded-[14px] border border-white/15 bg-white/5 p-8 text-center">
            <p className="text-base leading-relaxed text-white">
              Restoration companies use the same Voice Dispatch plans — every
              feature, every tier. See the plans and check out on the Voice
              Dispatch page.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/voice-dispatch#pricing" variant="dark">
                See the plans
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Free audit CTA ───────────────────────────────── */}
      <Section id="audit" className="newpadding0 scroll-mt-40" tone="hero">
        <Reveal>
          <div className="rounded-panel newbg-cta px-8 py-16 text-center md:px-16">
            <h2 className="mx-auto text-3xl font-bold leading-tight h2Newfont text-white md:text-[2.5rem]">
              Free After-Hours Emergency Audit
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-base text-white/85">
              We call your line after hours and show you what you&rsquo;re missing.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" variant="dark">
                Book My Free Audit
              </ButtonLink>
              <ButtonLink href="/voice-dispatch" variant="outline">
                Back to Voice Dispatch
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
