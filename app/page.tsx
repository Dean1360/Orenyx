import { ButtonLink } from '@/components/ui/button';
import { EngineDiagram } from '@/components/engine-diagram';
import { HeroVideo } from '@/components/hero-video';
import { Reveal } from '@/components/reveal';
import { Shell } from '@/components/ui/section';
import { OtherCompanies } from '@/components/other-companies';
import { pageMeta } from '@/lib/seo';
import { operationalCompliance, privateLicense } from '@/content/pricing';

export const metadata = pageMeta({
  titleTag: 'Orenyx — Voice Dispatch and Business Automation',
  title: 'Home',
  description: 'Call answering, booking, dispatch, and business automation for home-service companies. Explore Voice Dispatch, AI Engine, private deployment, and operational protections.',
  path: '/',
});

const extraOffers = [
  { ...privateLicense, subtitle: 'Get your own private ORENYX deployment, scoped to your organization’s needs. Tell us about your business, and our team will follow up with pricing.' },
  { ...operationalCompliance, subtitle: 'Keep your data, bots, and customers separated and protected with data isolation, API-key security, bot sandboxing, and audit logs. Available on its own or as an AI Engine add-on.' },
];

const paths = [
  {
    tag: 'Focused Dispatch',
    name: 'Orenyx Voice Dispatch',
    body: 'Handle calls, book jobs, route technicians, and collect payments—all through one focused dispatch solution for your home-service business.',
    exploreLabel: 'Explore Voice Dispatch',
    exploreHref: '/voice-dispatch',
    pricingHref: '/voice-dispatch#pricing',
  },
  {
    tag: 'Broader Automation',
    name: 'Orenyx AI Engine',
    body: 'Bring dispatch, payments, invoicing, and customer follow-up together to keep more of your daily operations moving with less manual work.',
    exploreLabel: 'Explore AI Engine',
    exploreHref: '/ai-engine',
    pricingHref: '/ai-engine#pricing',
  },
];

export default function HomePage() {
  return (
    <>
      <div className="hero-band home-pagebanner relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24">
        <Shell className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-white md:text-[2rem]">Orenyx — Call Answering, Booking, Dispatch, and Business Automation</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-white/90">Choose focused Voice Dispatch or the broader Orenyx AI Engine for your home-service business. Private deployment and standalone operational protections are also available.</p>
          <div className="mt-5">
            <HeroVideo />
          </div>
          <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border-2 border-violet-soft bg-white/10 px-8 py-4 text-center text-lg font-extrabold text-white md:text-2xl">
            Both Main Packages Include Voice Dispatch
          </div>
          <div className="mx-auto mt-14 grid max-w-[1140px] gap-8 text-left md:grid-cols-2">
            {paths.map((path, i) => (
              <Reveal key={path.name} delay={i * 70}>
                <div className="flex h-full min-h-[520px] flex-col rounded-[20px] border border-line-violet bg-bg-2/70 p-10 backdrop-blur-[1px] md:p-12">
                  <span className="mb-7 w-fit rounded-full border-2 border-line-violet bg-violet-bright/10 px-6 py-3 text-base font-extrabold uppercase tracking-wide text-white">{path.tag}</span>
                  <h2 className="text-2xl font-bold text-white md:text-[2rem]">{path.name}</h2>
                  <p className="mt-4 flex-1 text-lg font-bold leading-relaxed text-white md:text-xl">{path.body}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href={path.exploreHref} variant="primary">{path.exploreLabel}</ButtonLink>
                    <ButtonLink href={path.pricingHref} variant="primary" arrow={false}>Pricing</ButtonLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-[1140px]">
            <h2 className="text-2xl font-bold text-white md:text-[2rem]">Private Deployment &amp; Operational Protection</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">Need your own private deployment or operational protections without the broader AI Engine package? Explore these additional offerings.</p>
          </div>
          <div className="mx-auto mt-8 grid max-w-[1140px] gap-8 text-left md:grid-cols-2">
            {extraOffers.map((offer, i) => (
              <Reveal key={offer.name} delay={(paths.length + i) * 70}>
                <div className="flex h-full flex-col rounded-[20px] border border-line-violet bg-bg-2/70 p-8 backdrop-blur-[1px] md:p-10">
                  <h3 className="text-xl font-bold text-white md:text-2xl">{offer.name} — {offer.price}</h3>
                  <p className="mt-2 text-base font-bold text-violet-soft">{offer.subtitle}</p>
                  <ul className="mt-6 grid flex-1 content-start gap-3 text-base text-white/90 sm:grid-cols-2">
                    {offer.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[2px] text-violet-bright">{f.startsWith('No ') ? '–' : '✓'}</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ButtonLink href={offer.contact.href} variant="primary">{offer.contact.label}</ButtonLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
        <div className="carveimage"></div>
        <div className="mx-auto mt-12 max-w-[420px] md:max-w-[1180px]">
          <EngineDiagram />
        </div>
      </div>
      <OtherCompanies />
    </>
  );
}
