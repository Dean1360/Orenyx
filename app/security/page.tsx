import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import {
  apiSecurity,
  billingTransparency,
  compliance,
  dataSecurity,
  headline,
  intro,
  reliability,
} from '@/content/security';
import type { LabelledPoint } from '@/content/security';

export const metadata = pageMeta({
  titleTag: 'Security & Trust — Orenyx AI Engine™',
  title: 'Security & Trust',
  description: 'Data security, compliance, and reliability practices behind Orenyx AI Engine™.',
  path: '/security',
});

/* Copy from the client's Compliance Page document (2026-08-19). No comp was supplied. */

/** Label — body card, the repeating unit across most sections on this page. */
function PointCard({ point }: { point: LabelledPoint }) {
  return (
    <li className="rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
      <p className="text-fontchnage font-bold text-white">{point.label}</p>
      <p className="mt-3 text-20px text-fg-soft">{point.body}</p>
    </li>
  );
}

export default function Page() {
  return (
    <>
      <PageHero crumb="Security & Trust" title="Security & Trust" lead={headline} />

      {/* ── Data security ────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead title={dataSecurity.heading} lead={intro} />
        </Reveal>

        <Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {dataSecurity.points.map((p) => (
              <PointCard key={p.label} point={p} />
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
                    <Placeholder>{c.name} detail — how the engine handles this data</Placeholder>
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

        <Reveal>
          <p className="mt-8 max-w-[860px] text-20px leading-relaxed text-fg-soft">
            {compliance.footnote}
          </p>
        </Reveal>
      </Section>

      {/* ── Reliability & uptime ─────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead title={reliability.heading} />
        </Reveal>

        <Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {reliability.plans.map((p) => (
              <PointCard key={p.label} point={p} />
            ))}
          </ul>
        </Reveal>

        <Reveal>
          {reliability.body.map((p) => (
            <p key={p} className="mt-8 max-w-[860px] text-20px leading-relaxed text-fg-soft">
              {p}
            </p>
          ))}
          <p className="mt-6">
            <Link
              href={reliability.statusHref}
              className="text-20px text-violet-bright hover:underline"
            >
              View platform status →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* ── API & key security ───────────────────────────── */}
      <Section tone="inset">
        <Reveal>
          <SectionHead title={apiSecurity.heading} />
        </Reveal>

        <Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {apiSecurity.points.map((p) => (
              <PointCard key={p.label} point={p} />
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ── Billing & usage transparency ─────────────────── */}
      <Section>
        <Reveal>
          <SectionHead title={billingTransparency.heading} />
        </Reveal>

        <Reveal>
          <p className="mt-8 max-w-[860px] text-20px leading-relaxed text-fg-soft">
            {billingTransparency.body}
          </p>
        </Reveal>
      </Section>

    </>
  );
}
