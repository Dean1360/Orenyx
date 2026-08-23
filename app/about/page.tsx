import Image from 'next/image';
import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: 'About — Orenyx AI Engine LLC',
  title: 'About',
  description:
    'Orenyx AI Engine LLC builds AI-driven dispatch, automation, and payment infrastructure from Wyoming.',
  path: '/about',
});

const facts = [
  'Wyoming-based',
  'Focus: AI-driven dispatch, automation, and payment infrastructure',
  // Client (2026-08-08): no founder name on the site - company name only.
  'Orenyx AI Engine LLC',
];

/* Confirmed real copy — Builder Packet addendum, Section 4. Replaces the
   removed lorem "Company Story" section. Explicitly excludes founder
   bio/narrative and a milestones/timeline section per client decision. */
const whatWeDo =
  "Orenyx AI Engine is a unified decision and orchestration layer for dispatch, bot automation, and payment decisioning. Instead of stitching together separate tools for routing, automation, and payments, businesses run all of it through one connected intelligence layer — reducing the manual work, disconnected systems, and one-off integrations that slow teams down.";

const howItHelpsIntro =
  "Every business we work with faces the same core problem: automation that's fragmented across disconnected tools, manual routing that doesn't scale, and no central system tying decisions together. Orenyx AI Engine solves that by giving companies:";

const howItHelpsPoints = [
  'Intelligent dispatch routing that matches jobs, calls, or requests to the right resource automatically',
  'Bot orchestration that runs multi-step workflows without custom code for every integration',
  'Payment decisioning that automates billing, collections, and financial logic',
  'API-first architecture so the Engine plugs into existing systems rather than replacing them',
  "Context and state management that keeps every product in a company's stack working off the same shared intelligence",
];

const howItHelpsOutcome =
  'The result: less manual operational overhead, higher throughput, and automation that\'s standardized across a business instead of rebuilt from scratch for every new tool.';

const whoItsFor =
  "Orenyx AI Engine is built for companies running dispatch, field service, bot-driven, or payment-heavy operations who want one infrastructure layer handling the decisions behind those workflows — without needing an internal engineering team to build and maintain it themselves.";

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
              About Orenyx AI Engine LLC
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

      {/* ── What We Do ───────────────────────────── */}
      <Section pattern="dots">
        <Reveal>
          <SectionHead title="What We Do" />
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-[760px] font-p leading-relaxed text-fg-soft">{whatWeDo}</p>
        </Reveal>
      </Section>

      {/* ── How It Helps Other Companies ─────────────────── */}
      <Section tone="inset">
        <Reveal>
          <SectionHead title="How It Helps Other Companies" />
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-[760px] font-p leading-relaxed text-fg-soft">{howItHelpsIntro}</p>
        </Reveal>
        <Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {howItHelpsPoints.map((p) => (
              <li
                key={p}
                className="rounded-[14px] border border-line-violet bg-bg-2/50 p-6 text-base leading-relaxed text-fg-soft"
              >
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-[760px] font-p leading-relaxed text-fg-soft">{howItHelpsOutcome}</p>
        </Reveal>
      </Section>

      {/* ── Who It's Built For ────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead title="Who It's Built For" />
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-[760px] font-p leading-relaxed text-fg-soft">{whoItsFor}</p>
        </Reveal>
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

      {/* ── CTA ──────────────────────────────────────────── */}
      {/* Apply Now points at Careers. */}
      <Section className="pt-0">
        <Reveal>
          <div className="rounded-panel bg-violet-gred px-6 py-14 text-center md:px-14 md:py-16">
            <h2 className="mx-auto max-w-[720px] h2Newfont font-bold leading-tight text-white">
              Help us build the infrastructure behind dispatch, bots, and payments.
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
