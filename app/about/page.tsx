import Image from 'next/image';
import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { Milestones, type Milestone } from '@/components/about/Milestones';
import InteractiveStats from '@/components/about/InteractiveStats';

export const metadata = pageMeta({
  titleTag: 'About — Orenyx Labs LLC',
  title: 'About',
  description:
    'Orenyx Labs LLC builds AI-driven dispatch, automation, and payment infrastructure from Wyoming.',
  path: '/about',
});

/* Verbatim from the Figma. Company Story and the stat labels are lorem in the
   comp, so they stay as placeholders until the client supplies real copy. */
const facts = [
  'Wyoming-based',
  'Focus: AI-driven dispatch, automation, and payment infrastructure',
  // Client (2026-08-08): no founder name on the site - company name only.
  'Orenyx Labs LLC',
];

const stats = {
  items: [
    { name: '20+', label: 'Years of Experience' },
    { name: '90%', label: 'Customer Satisfaction' },
    { name: '80%', label: 'Operational Efficiency' },
    { name: '100+', label: 'Happy Clients' }
  ]
};

/* Verbatim from the Figma. Only five tiles here, and there are now seven
   products in content/site.ts — Orenyx Influencer Connect™, Orenyx NIL Engine and
   Orenyx API have no tile or artwork on this page yet. Flagged for the client. */
const ecosystem = [
  { name: 'Orenyx AI Engine™', icon: '/bg/aboutimage5.png' },
  { name: 'Orenyx Payment', icon: '/bg/about-image1.png' },
  { name: 'Orenyx Voice Dispatch', icon: '/bg/aboutimage2.png' },
  { name: 'Orenyx Dispatch', icon: '/bg/aboutimage3.png' },
  { name: 'Orenyx Engine', icon: '/bg/aboutimage4.png' },
];
/* PLACEHOLDER — years, titles and tags are from the Figma; all body copy is
   still lorem and the dates need confirming with the client.
   `tilt` is each card's ENTRANCE angle (the Figma's scattered before-state);
   every card settles square on the rail once scrolled into view. */
const milestones: Milestone[] = [
  {
    year: '2005',
    title: 'Orenyx Labs LLC founded',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    tag: 'Company',
  },
  {
    year: '2007',
    title: 'First product launch',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    tag: 'Product',
  },
  {
    year: '2008',
    title: 'Ecosystem expands',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    tag: 'Company',
    tilt: -6,
  },
  {
    year: '2009',
    title: 'Engine spin-out',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    tag: 'Platform',
    tilt: -8,
  },
];
function FactIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-white Icon-box"
    >
      <circle cx="13" cy="13" r="11.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 13h9M14 10l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" title="About Us" />

      {/* ── Company facts panel ──────────────────────────── */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-[14px] bg-violet-bgfred px-7 py-12 md:px-12">
            <h2 className="max-w-[400px]  font-bold leading-tight text-white h2Newfont ">
              About Orenyx Labs LLC
            </h2>

            {/* The old MOTUS wordmark art lived here — pulled for the Orenyx
                rebrand. Drop an Orenyx wordmark export back in when the client
                supplies one. */}

            <ul className="mt-10 divide-y divide-white/25 border-t border-white/25">
              {facts.map((fact) => (
                <li key={fact} className="fact-row flex gap-5 py-6">
                  <FactIcon />
                  <span className="text-xl font-bold leading-snug text-white newFont-Parra">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* ── Company story ────────────────────────────────── */}
      <Section pattern="dots">
        <Reveal>
          <p className="text-lg text-violet-soft labelFFont">About Us</p>
          <h2 className="heading-silver mt-2 h2Newfont font-bold ">Company Story</h2>
        </Reveal>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 font-p leading-relaxed text-fg-soft">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Image src="/bg/company-barnd.png" width={1536} height={1024} sizes="(min-width: 1024px) 560px, 100vw" className="rounded-[14px]" alt="" />
          </Reveal>
        </div>

        {/* ── Stats ──────────────────────────────────────── */}
        <InteractiveStats items={stats.items} />
      </Section>

      <section className="echosystem">
        <Reveal>
          <div className="mx-auto w-full max-w-[1180px] px-5 md:px-8 relative z-10 py-8 md:py-12">
            <h2 className="text-3xl font-bold leading-tight h2Newfont text-white">Ecosystem</h2>
            <div className="mt-10 grid items-start gap-12 lg:grid-cols-3">
              {ecosystem.map((value) => (
                <div key={value.name} className="ecosystem-item">
                  <h3 className="font-bold font0size text-fg-silver max-w-[250px]">{value.name}</h3>
                  <div className="mt-2 text-lg text-fg-soft ">
                    <Image src={value.icon} alt={value.name} width={1453} height={1082} sizes="(min-width: 1024px) 360px, 100vw" className="ecosystem-image" />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </Reveal>
      </section>
      <Section pattern="dots">
  <Reveal>
    <h2 className="heading-silver h2Newfont font-bold">Milestones</h2>
    <p className="mt-4 max-w-[640px] font-p leading-relaxed text-fg-soft">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut.
    </p>
  </Reveal>

  <Milestones items={milestones} />
</Section>

      {/* ── CTA ──────────────────────────────────────────── */}
      {/* Heading is lorem in the Figma — kept verbatim, like Company Story,
          until the client supplies real copy. Apply Now points at Careers. */}
      <Section className="pt-0">
        <Reveal>
          <div className="rounded-panel bg-violet-gred px-6 py-14 text-center md:px-14 md:py-16">
            <h2 className="mx-auto max-w-[720px] h2Newfont font-bold leading-tight text-white">
              Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
            </h2>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/careers" variant="light">
                Apply Now
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
