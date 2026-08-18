import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import {
  external,
  externalBlock,
  native,
  nativeBlock,
  statusLegend,
  type Status,
} from '@/content/integrations';

export const metadata = pageMeta({
  titleTag: 'Integrations — Orenyx AI Engine™',
  title: 'Integrations',
  description:
    'Connect Orenyx AI Engine™ to the Orenyx ecosystem, CRMs, contact centers, and payment platforms.',
  path: '/integrations',
});

/* Content from the Builder Packet, section 8. No comp was supplied. */

const statusTone: Record<Status, string> = {
  Live: 'border-ok/50 bg-ok/10 text-ok',
  Beta: 'border-violet-bright/50 bg-violet-bright/10 text-violet-soft',
  Roadmap: 'border-fg-muted/40 bg-fg-muted/10 text-fg-muted',
};

function StatusBadge({ status }: { status: Status | null }) {
  if (!status) {
    return (
      <span className="text-xs">
        <Placeholder>status</Placeholder>
      </span>
    );
  }
  return (
    <span
      className={`rounded-[4px] border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusTone[status]}`}
    >
      {status}
    </span>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        crumb="Integrations"
        title="Integrations"
        lead="One engine, wired into the systems you already run."
      />

      {/* ── Orenyx ecosystem ──────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead title={nativeBlock.heading} lead={nativeBlock.lead} />
        </Reveal>

        <Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {native.map((n) => (
              <div
                key={n.name}
                className="flex items-center justify-between gap-4 rounded-[14px] border border-line-violet bg-bg-2/50 p-6"
              >
                <span className="text-fontchnage font-bold text-white">{n.name}</span>
                <StatusBadge status={n.status} />
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── External ─────────────────────────────────────── */}
      <Section tone="inset">
        <Reveal>
          <SectionHead title={externalBlock.heading} lead={externalBlock.lead} />
        </Reveal>

        <Reveal>
          <div className="mt-10 space-y-4">
            {external.map((c) => (
              <div key={c.category} className="rounded-[14px] border border-line-violet bg-bg-2/50 p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-fontchnage font-bold text-white">{c.category}</h3>
                  {c.examples.length > 0 ? <StatusBadge status={null} /> : null}
                </div>

                {c.examples.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.examples.map((e) => (
                      <span
                        key={e}
                        className="rounded-[6px] border border-line-violet bg-bg-inset px-3 py-1.5 text-sm text-fg-soft"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                ) : null}

                {c.note ? <p className="mt-5 text-20px text-fg-soft">{c.note}</p> : null}

                {!c.confirmed ? (
                  <p className="mt-4 text-sm">
                    <Placeholder>confirm {c.category.toLowerCase()} partners before publishing</Placeholder>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── Status legend ────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead
            title="Integration Status"
            lead="Every integration carries one of three labels, so nothing on this page implies availability that does not exist yet."
          />
        </Reveal>

        <Reveal>
          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {statusLegend.map((s) => (
              <div key={s.status} className="rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
                <dt>
                  <StatusBadge status={s.status} />
                </dt>
                <dd className="mt-4 text-20px text-fg-soft">{s.meaning}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>
    </>
  );
}
