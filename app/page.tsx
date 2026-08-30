import { ButtonLink } from '@/components/ui/button';
import { CodeRain } from '@/components/code-rain';
import { EcosystemMarquee } from '@/components/marquee';
import { EngineDiagram } from '@/components/engine-diagram';
import { Logo } from '@/components/logo';
import Image from 'next/image';
import { Placeholder } from '@/components/ui/placeholder';
import { ProblemList } from '@/components/problem-list';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead, Shell } from '@/components/ui/section';
import { ecosystem } from '@/content/site';
import { pageMeta } from '@/lib/seo';
import {
  businessValue,
  capabilityOverview,
  closingCta,
  ecosystemBlock,
  hero,
  problems,
  solution,
  testimonials,
} from '@/content/home';

export const metadata = pageMeta({
  titleTag: 'Orenyx AI Engine™ — Unified AI for Dispatch, Payments & Bots',
  title: 'Home',
  description:
    'The AI decision layer behind Orenyx Voice Dispatch, Orenyx Dispatch, and Orenyx Payment — now available as a standalone platform.',
  path: '/',
});

export default function HomePage() {
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

          <p className="mx-auto mt-6 max-w-[600px] text-base leading-relaxed text-white/85">
            {hero.lead}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="outline">
              {hero.secondary.label}
            </ButtonLink>
          </div>


        </Shell>
        <div className="carveimage"></div>
        <div className="mx-auto mt-12 max-w-[420px] md:max-w-[1180px]">
          <EngineDiagram />
        </div>
      </div>

      <EcosystemMarquee />

      {/* ── Problem split ────────────────────────────────── */}
      <div className="grid lg:grid-cols-2">
        <div className="bg-violet px-6 py-16 md:px-14 md:py-24">
          <div className="ml-auto max-w-[560px]">
            <p className="text-sm labelFFont text-white/70">{problems.eyebrow}</p>
            <h2 className="mt-2 h2Newfont text-3xl font-bold leading-tight text-white md:text-[2.5rem]">
              {problems.title[0]}
              <br />
              {problems.title[1]}
            </h2>

            <ProblemList items={problems.items} />
          </div>
        </div>

        <div className="relative min-h-[280px] lg:min-h-0">
          <CodeRain className="absolute inset-0" />
        </div>
      </div>

      {/* ── Solution ─────────────────────────────────────── */}
      <Section pattern="dots">
        <Reveal>
          <SectionHead eyebrow={solution.eyebrow} title={solution.title} lead={solution.lead} />
        </Reveal>

        <Reveal>
          <div className="mt-12 grid border-l box-BG border-t border-line-violet sm:grid-cols-2 lg:grid-cols-3">
            {solution.capabilities.map((cap) => (
              <div
                key={cap.name}
                className="border-b relative-newZed border-r border-line-violet p-8 transition-colors hover:bg-bg-2"
              >
                <div className="mb-6  grid h-11 w-11 place-items-center overflow-hidden rounded-[8px] border border-line-violet">
                  <Image
                    src={cap.icon}
                    alt=""
                    width={44}
                    height={44}
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <h3 className="new-font-size">{cap.name}</h3>
              </div>
            ))}

            <div className="flex items-center relative-newZed justify-center border-b border-r border-line-violet p-8">
              <ButtonLink href="/features" variant="outline" arrow={false}>
                View All ↗
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Ecosystem ────────────────────────────────────── */}
      <Section pattern="rings">
        <Reveal>
          <SectionHead
            align="center"
            silver
            eyebrow={ecosystemBlock.eyebrow}
            title={
              <>
                {ecosystemBlock.title[0]}
                <br />
                {ecosystemBlock.title[1]}
              </>
            }
            lead={ecosystemBlock.lead}
          />
        </Reveal>

        <Reveal>
          {/* Smooth continuous logo carousel — same mechanism as the name
              marquee under the hero: the list is rendered twice and the track
              slides -50%, so the loop is seamless; linear timing means no
              speed-up/slow-down. Hover pauses it (see .marquee-track).

              Names come from the shared product list. The ARTWORK does not —
              there is no per-product logo for the renamed products or for
              Orenyx API yet, so these alternate the two existing files and the
              real marks still need to come from the client. */}
          <div className="relative mt-14 overflow-hidden">
            <div className="marquee-track flex w-max items-center">
              {[0, 1].map((half) => (
                <div
                  key={half}
                  aria-hidden={half === 1 || undefined}
                  className="flex items-center"
                >
                  {ecosystem.map((product, i) => (
                    <div key={product.label} className="mr-20 flex shrink-0 flex-col items-center">
                      <Image
                        src={i % 2 ? '/brand/logoDispatch.png' : '/brand/motus-ai-engine.png'}
                        alt={half === 0 ? product.label : ''}
                        width={200}
                        height={80}
                        className="h-20 w-auto object-contain myimage-width"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Business value ───────────────────────────────── */}
      <Section tone="violet">
        <Reveal>
          <div className="text-center">
            <p className="text-sm  labelFFont text-white/70">{businessValue.eyebrow}</p>
            <h2 className="mt-2 h2Newfont font-bold text-white md:text-[2.5rem]">
              {businessValue.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {businessValue.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              {/* Second card is inverted in the Figma. */}
              <div
                className={`h-full min-h-[220px] rounded-[10px] p-6 bg-lavender text-bg`}
              >
                <div className={`mb-auto ${i === 1 ? 'text-violet-bright' : 'text-bg'}`}>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={200}
                    height={80}
                    className="h-20 w-auto object-contain myimage-width business-value-icon"
                  />
                </div>
                <h3 className="newFont-Parra font-bold leading-tight font-dark">{item.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Full capability overview ─────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead
            align="center"
            eyebrow={capabilityOverview.eyebrow}
            title={capabilityOverview.title}
            lead={capabilityOverview.lead}
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

      {/* ── Testimonials ─────────────────────────────────── */}
      <Section pattern="glow">
        <Reveal>
          <p className="labelFFont text-violet-soft">{testimonials.eyebrow}</p>
          <h2 className="heading-silver mt-2 max-w-[920px] h2Newfont font-bold leading-tight md:text-[2.5rem]">
            {testimonials.title[0]}
            <br />
            {testimonials.title[1]}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="h-full rounded-[10px] bg-lavender p-6 text-bg">
                <p className="text-sm leading-relaxed">
                  {item.quote}
                </p>
                <div className="testimonail-author">
                  <div className="authoresname">
                    <h3 className="authname">
                      {item.name}
                    </h3>
                    <p className="jobtitle">
                      {item.title}
                    </p>
                  </div>
                  <div className="authores-imageas">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={80}
                      className="testimonals"
                    /></div>

                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <Section className="newpadding0 " >
        <Reveal>
          <div className="rounded-panel newbg-cta px-8 py-16 text-center md:px-16" >
            <h2 className="mx-auto  text-3xl font-bold leading-tight h2Newfont text-white md:text-[2.5rem]">
              {closingCta.title}
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href={closingCta.primary.href} variant="dark">
                {closingCta.primary.label}
              </ButtonLink>
              <ButtonLink href={closingCta.secondary.href} variant="light">
                {closingCta.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
