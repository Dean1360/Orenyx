import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
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
  'You keep running your business exactly as you do today — Orenyx connects to your existing phone lines, scheduling tools, and payment systems, nothing gets ripped out or replaced on day one.',
  'We connect the Engine to what you already use — no one needs to visit your office, no new hardware, no starting over, no retraining your whole team overnight.',
  'You choose what it handles first — call routing, appointment booking, dispatch, or payment decisions, starting small.',
  "Your team stays in control — every decision the Engine makes can be seen and overridden. It's a second set of hands, not a replacement for your staff.",
  'You expand it at your own pace — as it earns trust, you decide what else it takes on, never forced, never automatic.',
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
      <Section pattern="dots" tone="hero">
        <Reveal>
          <h2 className="font-bold leading-[1.1] text-white text-[42px] md:text-[64px]">
            How Orenyx connects to your company
          </h2>
        </Reveal>

        <Reveal>
          <ul className="mt-10 space-y-10">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-bright"
                />
                <p className="font-35px font-bold leading-relaxed text-white">
                  {step}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Request Access</ButtonLink>
            <ButtonLink href="/pricing" variant="outline">
              View Pricing
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
