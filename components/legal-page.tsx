import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import type { LegalOutline } from '@/content/legal';

/**
 * Renders a legal page from its agreed outline.
 *
 * The four legal pages differ only in their section list, so they share this.
 * Each heading is shown with its body marked as awaiting counsel — a reader
 * (and the client) can see the structure without being shown text that reads
 * like it has legal force when it does not.
 *
 * Legal copy must be pasted verbatim from the client's counsel-approved
 * document. Do not paraphrase, renumber clauses, or summarise.
 */
export function LegalPage({ outline }: { outline: LegalOutline }) {
  return (
    <>
      <PageHero crumb={outline.crumb} title={outline.title} />

      <Section>
        <article className="max-w-[860px]">
          <p className="text-sm text-fg-muted">
            Last updated <Placeholder>effective date</Placeholder>
          </p>

          <div className="mt-8 rounded-[14px] border border-line-violet bg-bg-2/50 p-6 md:p-8">
            <p className="text-20px text-fg-soft">
              <Placeholder>
                full {outline.title.toLowerCase()} text — awaiting counsel-approved copy
              </Placeholder>
            </p>
            {outline.note ? <p className="mt-4 text-20px text-fg-soft">{outline.note}</p> : null}
          </div>

          {outline.sections.length > 0 ? (
            <Reveal>
              <h2 className="mt-14 font0size font-bold text-white">Sections</h2>
              <p className="mt-3 text-20px text-fg-soft">
                The structure agreed in the Builder Packet. Counsel supplies the text for each.
              </p>

              <ol className="mt-8 space-y-4">
                {outline.sections.map((s, i) => (
                  <li
                    key={s}
                    className="flex gap-4 rounded-[8px] border border-line-violet bg-bg-inset px-5 py-4"
                  >
                    <span className="font-mono text-sm text-violet-soft">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-20px text-fg-soft">{s}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}
        </article>
      </Section>
    </>
  );
}
