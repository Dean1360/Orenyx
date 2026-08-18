import Link from 'next/link';
import { FaqAccordion } from '@/components/faq-accordion';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { faq } from '@/content/faq';

export const metadata = pageMeta({
  titleTag: 'FAQ — Orenyx AI Engine™',
  title: 'FAQ',
  description:
    'Answers to common questions about Orenyx AI Engine™’s platform, pricing, and integrations.',
  path: '/faq',
});

/* Questions from the Builder Packet, section 12. The packet supplies no
   answers; see content/faq.ts for which are answered from signed-off copy and
   which are still open. */

export default function Page() {
  return (
    <>
      <PageHero
        crumb="FAQ"
        title="FAQ"
        lead="The questions we get asked most. More will be added as they come in."
      />

      <Section>
        <Reveal>
          <div className="max-w-[860px] margin-auto-left">
            <FaqAccordion items={faq} />

            <div className="mt-12 rounded-[14px] border border-line-violet bg-bg-2/50 p-6 md:p-8">
              <p className="text-fontchnage font-bold text-white">Still have a question?</p>
              <p className="mt-3 text-20px text-fg-soft">
                Ask us directly and we will get back to you.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-block text-20px text-violet-bright hover:underline"
              >
                Contact us →
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
