import Image from 'next/image';
import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: 'Use Cases — Orenyx AI Engine™',
  title: 'Use Cases',
  description:
    'See how teams use Orenyx AI Engine™ for dispatch operations, payments and risk, bot orchestration, and enterprise workflows.',
  path: '/use-cases',
});

const zigzagBlocks = [
  {
    title: "Dispatch Operations",
    drescription: "Route calls, tickets, and tasks using AI Engine logic instead of static rule trees. Example: a support ticket is automatically routed to the right team based on urgency, customer tier, and current agent load.",
    image: "/bg/dispatch.png",
  },
  {
    title: "Bot Orchestration",
    drescription: "Central logic layer for Orenyx Engine and other bots. Example: a single conversation flowdefinition powers a bot across voice, SMS, and web chat without rebuilding logic per channel.",
    image: "/bg/botpay.png",
  },
  {
    title: "Payments & Risk",
    drescription: "Score and route payment events (paired with Orenyx Payment). Example: a transaction is evaluated in real time and routed to the appropriate processor or flagged for manual review based on risk score.",
    image: "/bg/payment.png",
  },
  {
    title: "Enterprise Workflows",
    drescription: "Replace scattered scripts with one unified engine. Example: consolidate a dozen disconnected internal automation scripts into a single, observable, auditable engine. ",
    image: "/bg/workflow.png",
  }
]

/* No Figma comp for this page. Layout follows the established inner-page
   pattern; all copy awaits the Builder Packet or the client. */

export default function Page() {
  return (
    <>
      <PageHero
        crumb="Use Cases"

        title={
          <>
            One engine,   <span className="text-violet-soft">four</span>  categories
            <br className="hidden md:block" /> of problems solved.
          </>
        }
      />

      <Section>
        <Reveal>
          <div className="space-y-4 leading-relaxed text-fg-soft">
            {zigzagBlocks.map((block, i) => (
              <div key={i} className="zigzagBlocks">
                {/* w-1/2 was unconditional, so when the row stacked on mobile
                    each child still only took half the screen — the squeezed
                    single-word-per-line column. Full width below lg; the
                    zigzag alternation only exists at lg where there ARE two
                    columns. */}
                <div className="flex w-full flex-col gap-8 align-center lg:flex-row lg:gap-10">
                  <div className="textbox-case w-full lg:w-1/2">
                    <h3 className="font-35px"> {block.title} </h3>
                    <p>
                      {block.drescription}
                    </p>
                  </div>
                  <div
                    className={`textbox-case w-full lg:w-1/2 ${
                      i % 2 === 0 ? '' : 'lg:order-first'
                    }`}
                  >
                    <Image src={block.image} alt="" width={1630} height={965} sizes="(min-width: 1024px) 580px, 100vw" className="w-full rounded-[14px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
