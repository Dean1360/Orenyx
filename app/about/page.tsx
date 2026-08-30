import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: 'How It Works — Orenyx AI Engine™',
  title: 'How It Works',
  description:
    'How Orenyx AI Engine connects to your existing business, in your control, at your pace.',
  path: '/about',
});

/* PREVIEW DRAFT — not yet approved. Replaces the old About page content
   with a step-by-step "How It Works" narrative aimed at the #1 objection
   non-technical / AI-wary business owners raise: fear that AI will replace
   their team or take over decisions they can't see or undo. */

const reassurance =
  "Orenyx doesn't replace your business — it plugs into the one you already run. You stay in control of what it touches, and nothing changes until you say so.";

const steps = [
  {
    number: '01',
    title: 'You keep running your business exactly as you do today',
    body: 'Orenyx connects to your existing phone lines, scheduling tools, and payment systems — nothing gets ripped out or replaced on day one.',
  },
  {
    number: '02',
    title: 'We connect the Engine to what you already use',
    body: 'No new hardware, no starting over, no retraining your whole team overnight.',
  },
  {
    number: '03',
    title: 'You choose what it handles first',
    body: 'Call routing, appointment booking, dispatch, or payment decisions — starting small.',
  },
  {
    number: '04',
    title: 'Your team stays in control',
    body: "Every decision the Engine makes can be seen and overridden. It's a second set of hands, not a replacement for your staff.",
  },
  {
    number: '05',
    title: 'You expand it at your own pace',
    body: 'As it earns trust, you decide what else it takes on — never forced, never automatic.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="How It Works"
        title="How It Works"
        lead={reassurance}
      />

      {/* ── Step-by-step connection flow ─────────────────── */}
      <Section pattern="dots">
        <Reveal>
          <SectionHead title="How Orenyx connects to your company" />
        </Reveal>

        <Reveal>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2">
            {steps.map((step) => (
              <li
                key={step.number}
                className="rounded-[14px] border border-line-violet bg-bg-2/50 p-6 md:p-7"
              >
                <span className="text-sm font-bold tracking-wider text-violet-bright">
                  {step.number}
                </span>
                <h3 className="mt-2 text-xl font-bold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-fg-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <Section className="pt-0">
        <Reveal>
          <div className="rounded-panel bg-violet-gred px-6 py-14 text-center md:px-14 md:py-16">
            <h2 className="mx-auto max-w-[720px] h2Newfont font-bold leading-tight text-white">
              See it running on your own accounts before you commit to more.
            </h2>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact" variant="light">
                Request Access
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
