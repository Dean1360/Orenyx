import type { ReactNode } from 'react';
import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import type { LegalOutline } from '@/content/legal';

/**
 * Renders a legal page in one of two modes.
 *
 * FULL TEXT — the outline carries `clauses`, i.e. counsel-approved copy has
 * landed. Clauses render numbered, in order, exactly as supplied.
 *
 * OUTLINE — no `clauses` yet. The agreed section list renders with the body
 * marked as awaiting counsel, so the client can see the structure without a
 * reader being shown text that reads like it has legal force when it does not.
 *
 * Legal copy is pasted verbatim from the client's counsel-approved document.
 * Do not paraphrase, renumber clauses, or summarise.
 */
export function LegalPage({ outline }: { outline: LegalOutline }) {
  const clauses = outline.clauses ?? [];
  const sections = outline.sections ?? [];

  return (
    <>
      <PageHero crumb={outline.crumb} title={outline.title} />

      <Section>
        {/* margin-auto-left centres the measure inside the 1180px shell — without
            it the column pins to the left edge and the page reads lopsided
            against the full-width nav. Same utility the FAQ page uses. */}
        <article className="max-w-[860px] margin-auto-left">
          <p className="text-sm text-fg-muted">
            Last updated {outline.effective ?? <Placeholder>effective date</Placeholder>}
          </p>

          {clauses.length > 0 ? (
            <ol className="mt-10 space-y-12">
              {clauses.map((clause, i) => (
                <li key={clause.heading}>
                  <Reveal>
                    <h2 className="flex gap-4 font-bold text-white text-fontchnage">
                      <span className="font-mono text-violet-soft">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{clause.heading}</span>
                    </h2>

                    {clause.bullets ? (
                      <ul className="mt-6 space-y-4">
                        {clause.bullets.map((b) => (
                          <li
                            key={b.label}
                            className="rounded-[8px] border border-line-violet bg-bg-inset px-5 py-4 text-20px text-fg-soft"
                          >
                            <strong className="font-bold text-white">{b.label}</strong>
                            {' — '}
                            {b.body}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {clause.body?.map((p) => (
                      <p key={p} className="mt-6 text-20px leading-relaxed text-fg-soft">
                        {linkEmails(p)}
                      </p>
                    ))}
                  </Reveal>
                </li>
              ))}
            </ol>
          ) : (
            <>
              <div className="mt-8 rounded-[14px] border border-line-violet bg-bg-2/50 p-6 md:p-8">
                <p className="text-20px text-fg-soft">
                  <Placeholder>
                    full {outline.title.toLowerCase()} text — awaiting counsel-approved copy
                  </Placeholder>
                </p>
                {outline.note ? (
                  <p className="mt-4 text-20px text-fg-soft">{outline.note}</p>
                ) : null}
              </div>

              {sections.length > 0 ? (
                <Reveal>
                  <h2 className="mt-14 font0size font-bold text-white">Sections</h2>
                  <p className="mt-3 text-20px text-fg-soft">
                    The structure agreed in the Builder Packet. Counsel supplies the text for each.
                  </p>

                  <ol className="mt-8 space-y-4">
                    {sections.map((s, i) => (
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
            </>
          )}
        </article>
      </Section>
    </>
  );
}

/**
 * Makes contact addresses clickable without altering a character of the copy —
 * the text still reads exactly as counsel wrote it, the address is just wrapped
 * in a mailto. Trailing sentence punctuation is left outside the link.
 */
function linkEmails(text: string): ReactNode {
  const parts = text.split(/([\w.+-]+@[\w-]+\.[\w.-]+[\w])/g);

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`mailto:${part}`} className="text-violet-bright hover:underline">
        {part}
      </a>
    ) : (
      part
    ),
  );
}
