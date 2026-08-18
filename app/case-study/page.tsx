import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Case Study',
  description: 'How teams deploy Orenyx AI Engine™ as their decision layer.',
  path: '/case-study',
});

/*
  The Figma comp for this page is entirely lorem ipsum — it is a layout
  template, not content. Structure is reproduced faithfully: alternating violet
  H2 sections with body copy, and two inset pull-out panels. Every string is a
  placeholder because there is nothing real to place yet.

  Also unresolved: this page is reachable from the breadcrumb in the comp but
  appears in no navigation menu. Ask the client where it should be linked from —
  likely a Case Studies index under Use Cases.
*/

export default function CaseStudyPage() {
  return (
    <>
      <PageHero
        crumb="Case Study"
        title={<Placeholder>case study title</Placeholder>}
      />

      <Section>
        <article className="max-w-[1000px] space-y-12">
          {[1, 2].map((n) => (
            <Reveal key={n}>
              <h2 className="text-2xl font-bold text-violet-bright md:text-3xl">
                <Placeholder>section {n} heading</Placeholder>
              </h2>
              <p className="mt-4 leading-relaxed text-fg-soft">
                <Placeholder>section {n} body copy</Placeholder>
              </p>
            </Reveal>
          ))}

          <Reveal>
            <aside className="rounded-[14px] bg-violet/25 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                <Placeholder>pull-out panel heading</Placeholder>
              </h2>
              <p className="mt-4 leading-relaxed text-fg-soft">
                <Placeholder>pull-out panel body copy</Placeholder>
              </p>
            </aside>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-bold text-violet-bright md:text-3xl">
              <Placeholder>results heading</Placeholder>
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-fg-soft">
              <p>
                <Placeholder>results paragraph 1</Placeholder>
              </p>
              <p>
                <Placeholder>results paragraph 2</Placeholder>
              </p>
              <p>
                <Placeholder>results paragraph 3</Placeholder>
              </p>
            </div>
          </Reveal>

          <Reveal>
            <aside className="rounded-[14px] bg-violet/25 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                <Placeholder>closing panel heading</Placeholder>
              </h2>
              <p className="mt-4 leading-relaxed text-fg-soft">
                <Placeholder>closing panel body copy</Placeholder>
              </p>
            </aside>
          </Reveal>
        </article>
      </Section>
    </>
  );
}
