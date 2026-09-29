import Image from 'next/image';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { comparisonRows, coreModules, technicalHighlights } from '@/content/features';

/** Core Modules, Technical Highlights and Comparison sections.
 *  Shared by /features and the How They Work page (/about). */
export function FeaturesSections() {
  const [first, second, ...rest] = coreModules;

  return (
    <>
      {/* ── Core modules ─────────────────────────────────── */}
      <Section >
        <Reveal>
          <h2 className="heading-silver text-center h2Newfont font-bold">
            Core Modules
          </h2>
        </Reveal>

        <Reveal>
          <div className="mt-12 border-2  border-line-violet rounded-[14px] md:mt-16 overflow-hidden backgtound-imageboxUnique">
            {/* Top row: two wide cards */}
            <div className="grid md:grid-cols-2">
              {[first, second].map((m) => (
                <article key={m.name} className="border-b border-r border-line-violet p-8 box-article-featureBox">
                  <div className="imagesfeatuire">
                   <Image src={m.icon} width={128} height={128} className="icon-imagebox" alt={m.name} />
                   </div>
                  <div className="font-big font-bold leading-tight text-violet-bright">{m.name}</div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-fg-soft">
                    {m.body}
                  </p>
                </article>
              ))}
            </div>

            {/* Bottom row: three cards */}
            <div className="grid md:grid-cols-3">
              {rest.map((m, i) => (
                <article key={m.name} className="border-b border-r border-line-violet p-8 box-article-featureBox">
                   <div className="imagesfeatuire">
                    <Image src={m.icon} width={128} height={128} className="icon-imagebox" alt={m.name} />
                    </div>
                  <div
                    className={`font-big font-bold leading-tight ${
                      i === 1 ? 'text-white' : 'text-violet-bright'
                    }`}
                  >
                    {m.name}
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-fg-soft">
                    {m.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Technical highlights ─────────────────────────── */}
      <Section className="bgnones">
        <Reveal>
          <h2 className="heading-silver text-3xl h2Newfont font-bold md:text-[2.75rem]">
            Technical Highlights
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {technicalHighlights.map((h, i) => (
            <Reveal key={h.name} delay={i * 60}>
              <div className="h-full overflow-hidden border-topmanage border border-line-violet">
                <div className="px-4 py-3 bg-violet text-white" >
                  <div className="text-fontchnage font-bold leading-tight">{h.name}</div>
                </div>
                <p className="px-4 py-5 text-sm leading-relaxed text-fg-soft">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Comparison ───────────────────────────────────── */}
      <Section  className="bgnones">
        <Reveal>
          <h2 className="heading-silver h2Newfont text-3xl font-bold md:text-[2.75rem]">
            Comparison Callout
          </h2>
        </Reveal>

        <Reveal>
          {/* Three columns of prose will not compress below ~560px without
              becoming unreadable, so the table scrolls sideways instead. */}
          <div className="mt-10 overflow-x-auto rounded-[14px] border border-line-violet">
            <table className="w-full min-w-[560px] text-left custom-tablecolor">
              <caption className="sr-only">
                Building the decision layer yourself compared with Orenyx AI Engine™.
              </caption>
              <thead>
                <tr className="bg-violet text-white">
                  <th scope="col" className="w-1/3 px-6 py-5" />
                  <th scope="col" className="px-6 py-5 text-xl font-bold">
                    Build it yourself
                  </th>
                  <th scope="col" className="px-6 py-5 text-xl font-bold">
                    Orenyx AI Engine™
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row} className={i % 2 ? 'bg-bg-2' : 'bg-bg-3/60'}>
                    <th scope="row" className="px-6 py-5 text-sm font-bold text-white">
                      {row}
                    </th>
                    <td className="px-6 py-5 text-sm">
                     1
                    </td>
                    <td className="px-6 py-5 text-sm">
                   2
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
