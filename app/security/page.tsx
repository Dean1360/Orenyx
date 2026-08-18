import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { compliance, dataSecurity, disclosure, headline, reliability } from '@/content/security';

export const metadata = pageMeta({
  titleTag: 'Security & Trust — Orenyx AI Engine™',
  title: 'Security & Trust',
  description: 'Data security, compliance, and reliability practices behind Orenyx AI Engine™.',
  path: '/security',
});

/* Content from the Builder Packet, section 9. No comp was supplied. */

export default function Page() {
  return (
    <>
      <PageHero crumb="Security & Trust" title="Security & Trust" lead={headline} />

      {/* ── Data security ────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead title={dataSecurity.heading} />
        </Reveal>

        <Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {dataSecurity.points.map((p) => (
              <li
                key={p}
                className="rounded-[14px] border border-line-violet bg-bg-2/50 p-6 text-20px text-fg-soft"
              >
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ── Compliance ───────────────────────────────────── */}
      <Section tone="inset">
        <Reveal>
          <SectionHead title={compliance.heading} />
        </Reveal>

        <Reveal>
          <dl className="mt-10 space-y-4">
            {compliance.items.map((c) => (
              <div
                key={c.name}
                className="rounded-[14px] border border-line-violet bg-bg-2/50 p-6 md:p-8"
              >
                <dt className="flex flex-wrap items-center gap-3">
                  <span className="text-fontchnage font-bold text-white">{c.name}</span>
                  <span className="text-sm text-violet-soft">
                    {c.status ?? <Placeholder>confirm {c.name} status</Placeholder>}
                  </span>
                </dt>
                <dd className="mt-4 text-20px text-fg-soft">
                  {c.body ?? (
                    <Placeholder>
                      {c.name} detail — how the engine handles this data
                    </Placeholder>
                  )}
                </dd>
                {c.links ? (
                  <dd className="mt-4 flex flex-wrap gap-5">
                    {c.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-20px text-violet-bright hover:underline"
                      >
                        {l.label} →
                      </Link>
                    ))}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* ── Reliability ──────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead title={reliability.heading} />
        </Reveal>

        <Reveal>
          <ul className="mt-10 space-y-4">
            {reliability.items.map((r) => (
              <li
                key={r.body}
                className="rounded-[14px] border border-line-violet bg-bg-2/50 p-6"
              >
                <p className="text-20px text-fg-soft">
                  {r.href ? (
                    <Link href={r.href} className="text-violet-bright hover:underline">
                      {r.body} →
                    </Link>
                  ) : (
                    r.body
                  )}
                </p>
                {!r.confirmed ? (
                  <p className="mt-3 text-sm">
                    <Placeholder>confirm before publishing</Placeholder>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ── Responsible disclosure ───────────────────────── */}
      <Section tone="inset">
        <Reveal>
          <SectionHead title={disclosure.heading} lead={disclosure.lead} />
        </Reveal>

        <Reveal>
          <div className="mt-10 rounded-[14px] border border-line-violet bg-bg-2/50 p-6 md:p-8">
            <p className="text-sm uppercase tracking-wider text-fg-muted">Security contact</p>
            <p className="mt-3 text-fontchnage font-bold text-white">
              {disclosure.contact ? (
                <a href={`mailto:${disclosure.contact}`} className="hover:underline">
                  {disclosure.contact}
                </a>
              ) : (
                <Placeholder>security contact address</Placeholder>
              )}
            </p>

            <p className="mt-8 text-sm uppercase tracking-wider text-fg-muted">
              Reporting process
            </p>
            <p className="mt-3 text-20px text-fg-soft">
              {disclosure.processConfirmed ? null : (
                <Placeholder>vulnerability reporting process — scope, timelines, safe harbour</Placeholder>
              )}
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
