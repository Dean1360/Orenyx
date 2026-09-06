import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';
import { Shell } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: 'Orenyx — Two Ways to Run Your Business',
  title: 'Home',
  description:
    'Pick the level of automation you need: Orenyx Voice Dispatch for dispatch-only, or Orenyx AI Engine for full automation.',
  path: '/',
});

const paths = [
  {
    tag: 'Dispatch Only',
    name: 'Orenyx Voice Dispatch',
    body: 'Calls answered, jobs booked, techs routed, payments collected. For companies that want dispatch handled, not everything automated.',
    exploreLabel: 'Explore Voice Dispatch',
    exploreHref: '/voice-dispatch',
    pricingHref: '/pricing#voice-dispatch',
  },
  {
    tag: 'Full Automation',
    name: 'Orenyx AI Engine',
    body: 'Intelligent dispatch, payments, and automation in one place — calls, jobs, technician routing, invoicing, and follow-up, fully handled.',
    exploreLabel: 'Explore AI Engine',
    exploreHref: '/ai-engine',
    pricingHref: '/pricing#ai-engine',
  },
];

export default function HomePage() {
  return (
    <div className="hero-band relative overflow-hidden py-16 md:py-24">
      <Shell className="relative z-10 text-center">
        <p className="labelFFont text-sm font-extrabold uppercase tracking-wide text-white">
          Two ways to run Orenyx
        </p>
        <h1 className="mx-auto mt-2 max-w-[820px] text-4xl font-bold leading-[1.12] text-white md:text-[3.25rem]">
          Pick the level of automation you need
        </h1>

        <p className="mx-auto mt-6 max-w-[820px] text-lg font-bold leading-relaxed text-white md:text-2xl">
          Built for HVAC, plumbing, electrical, and other field-service businesses — every module
          that powers a live account, from the first call to the final payment.
        </p>

        <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border-2 border-violet-soft bg-white/10 px-7 py-3 text-center text-sm font-bold text-white md:text-lg">
          Both Run on Orenyx Engine
        </div>

        <div className="mx-auto mt-14 grid max-w-[1140px] gap-8 text-left md:grid-cols-2">
          {paths.map((path, i) => (
            <Reveal key={path.name} delay={i * 70}>
              <div className="flex h-full min-h-[520px] flex-col rounded-[20px] border border-line-violet bg-bg-2/70 p-10 backdrop-blur-[1px] md:p-12">
                <span className="mb-7 w-fit rounded-full border-2 border-line-violet bg-violet-bright/10 px-6 py-3 text-base font-extrabold uppercase tracking-wide text-white">
                  {path.tag}
                </span>
                <h2 className="text-2xl font-bold text-white md:text-[2rem]">{path.name}</h2>
                <p className="mt-4 flex-1 text-lg font-bold leading-relaxed text-white md:text-xl">
                  {path.body}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={path.exploreHref} variant="primary">
                    {path.exploreLabel}
                  </ButtonLink>
                  <ButtonLink href={path.pricingHref} variant="primary" arrow={false}>
                    Pricing
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </div>
  );
}
