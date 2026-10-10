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
    '24/7 emergency intake and dispatch for water, fire, and mold restoration companies. Part of Orenyx Voice Dispatch, built on Orenyx Engine.',
  path: '/voice-dispatch/restoration',
});

const whatItDoes = [
  'Answers every call, text, and chat 24/7',
  'Collects the address, damage type, photos, and video',
  'Alerts the on-call crew instantly',
  'Escalates if no one confirms',
  'Books the visit automatically',
  'Sends arrival-time updates to the customer',
  'Creates the job automatically',
  'Handles restoration job codes and billing at closeout',
];

const safetyRules = [
  'Every water, fire, and mold call is treated as an emergency',
  'The AI never decides a call isn’t urgent',
  'When unsure, the AI hands the call to a person',
  'Your company sets the rules',
  'No insurance decisions',
];

const plans = [
  { name: 'Starter', price: '$499', note: 'For a single-location restoration company.' },
  { name: 'Pro', price: '$999', note: 'For growing crews with more calls and techs.', featured: true },
  { name: 'Multi-Location', price: '$1,999+', note: 'For franchise and multi-location operators.' },
];

export default function RestorationPage() {
  return (
    <>
      <PageHero
        crumb="Restoration"
        title="Restoration Dispatch"
        lead="Water • Fire • Mold. 24/7 emergency intake and dispatch for restoration companies, built on Orenyx Engine."
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
        <SectionHead eyebrow="Safety rules" title="Built to never miss an emergency." />
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
            <p className="text-lg font-bold text-violet-bright">Who it’s for</p>
            <p className="mt-3 text-base leading-relaxed text-white">
              Restoration companies with 2–50 techs and franchise locations.
            </p>
            <p className="mt-3 text-sm text-fg-soft">Launching first in Houston, then TX, FL, AZ, and CA.</p>
          </div>
        </Reveal>
      </Section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <Section id="pricing" tone="violet" className="scroll-mt-40">
        <SectionHead eyebrow="Pricing" title="Restoration Dispatch pricing" align="center" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <div
                className={`flex h-full flex-col rounded-[14px] border-2 p-7 text-center ${
                  p.featured ? 'border-white bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.25)]' : 'border-white/70 bg-white/5'
                }`}
              >
                <p className="text-lg font-bold text-white">{p.name}</p>
                <p className="mt-3 text-4xl font-bold tabular-nums text-white">
                  {p.price}
                  <span className="text-base font-semibold text-white/70">/mo</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-base font-bold text-white">Setup waived for the first 10 customers.</p>
      </Section>

      {/* ── Free audit CTA ───────────────────────────────── */}
      <Section id="audit" className="newpadding0 scroll-mt-40" tone="hero">
        <Reveal>
          <div className="rounded-panel newbg-cta px-8 py-16 text-center md:px-16">
            <h2 className="mx-auto text-3xl font-bold leading-tight h2Newfont text-white md:text-[2.5rem]">
              Free After-Hours Emergency Audit
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-base text-white/85">
              We call your line after hours and show you what you’re missing. Your audit is booked automatically.
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
