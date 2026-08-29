import Link from 'next/link';
import type { ReactNode } from 'react';
import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import {
  authentication,
  endpoints,
  errorCodes,
  gettingStarted,
  orenyxCredits,
  overview,
  rateLimitHeaders,
  rateLimits,
  sandbox,
  sdkNote,
  sdkRoadmap,
  versioning,
  webhooks,
} from '@/content/developers';

export const metadata = pageMeta({
  titleTag: 'API Docs — Orenyx AI Engine™',
  title: 'API Docs',
  description:
    'REST API and webhook documentation for Orenyx AI Engine™ — authentication, endpoints, rate limits, and SDKs.',
  path: '/developers',
});

/* Content from the Builder Packet, section 7. Layout follows the established
   inner-page pattern — no comp was supplied for this page. */

function Block({
  id,
  heading,
  lead,
  children,
}: {
  id: string;
  heading: string;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-40 border-t border-line-violet pt-10 first:border-0 first:pt-0">
      <h2 className="font0size font-bold text-white">{heading}</h2>
      {lead ? <p className="mt-3 max-w-[760px] text-20px text-fg-soft">{lead}</p> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[8px] border border-line-violet bg-bg-inset px-4 py-3">
      <code className="whitespace-nowrap font-mono text-[15px] text-violet-soft">{children}</code>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((p) => (
        <li key={p} className="flex gap-3 text-20px text-fg-soft">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-bright" />
          {p}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        crumb="Developers"
        title="API Docs"
        lead="Everything the engine does is available as a REST endpoint or a webhook event."
      />

      <Section>
        <Reveal>
          <div className="space-y-12">
            {/* ── Overview ─────────────────────────────── */}
            <Block id="overview" heading="Overview" lead={overview.lead}>
              <p className="mb-3 text-sm uppercase tracking-wider text-fg-muted">
                {overview.baseUrlLabel}
              </p>
              <Code>{overview.baseUrl}</Code>
              {!overview.baseUrlConfirmed ? (
                <p className="mt-3 text-sm">
                  <Placeholder>confirm the API domain before publishing</Placeholder>
                </p>
              ) : null}
            </Block>

            {/* ── Authentication ───────────────────────── */}
            <Block id="authentication" heading="Authentication" lead={authentication.lead}>
              <Code>{authentication.header}</Code>
              <Bullets items={authentication.points} />
              <Link
                href="/developers/authentication"
                className="mt-6 inline-block text-20px text-violet-bright hover:underline"
              >
                Authentication guide →
              </Link>
            </Block>

            {/* ── Core endpoints ───────────────────────── */}
            <Block id="endpoints" heading="Core Endpoints">
              <div className="overflow-x-auto rounded-[14px] border border-line-violet">
                <table className="w-full min-w-[560px] text-left custom-tablecolor">
                  <caption className="sr-only">Core Orenyx AI Engine™ API endpoints.</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Endpoint
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Method
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoints.map((e) => (
                      <tr key={e.path}>
                        <th scope="row" className="px-6 py-4 font-mono font-normal text-violet-soft">
                          {e.path}
                          {e.isNew ? (
                            <span className="ml-2 rounded-[4px] bg-violet px-2 py-0.5 align-middle text-[11px] font-semibold uppercase tracking-wider text-white">
                              New
                            </span>
                          ) : null}
                        </th>
                        <td className="whitespace-nowrap px-6 py-4 font-mono text-white">
                          {e.method}
                        </td>
                        <td className="px-6 py-4">{e.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Block>

            {/* ── Rate limits ──────────────────────────── */}
            <Block id="rate-limits" heading="Rate Limits">
              <div className="grid gap-4 sm:grid-cols-3">
                {rateLimits.map((r) => (
                  <div
                    key={r.plan}
                    className="rounded-[14px] border border-line-violet bg-bg-2/50 p-6"
                  >
                    <p className="text-sm uppercase tracking-wider text-violet-soft">{r.plan}</p>
                    <p className="mt-3 text-fontchnage font-bold text-white">{r.limit}</p>
                    <p className="mt-1 text-20px text-fg-soft">{r.burst}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-20px text-fg-soft">
                Rate limit headers are returned on every response:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {rateLimitHeaders.map((h) => (
                  <code
                    key={h}
                    className="rounded-[6px] border border-line-violet bg-bg-inset px-3 py-1.5 font-mono text-sm text-violet-soft"
                  >
                    {h}
                  </code>
                ))}
              </div>
            </Block>

            {/* ── Error codes ──────────────────────────── */}
            <Block id="errors" heading="Error Codes">
              <div className="overflow-x-auto rounded-[14px] border border-line-violet">
                <table className="w-full min-w-[420px] text-left custom-tablecolor">
                  <caption className="sr-only">HTTP status codes returned by the API.</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Code
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Meaning
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorCodes.map((e) => (
                      <tr key={e.code}>
                        <th scope="row" className="px-6 py-4 font-mono font-bold text-violet-soft">
                          {e.code}
                        </th>
                        <td className="px-6 py-4">{e.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Block>

            {/* ── Webhooks ─────────────────────────────── */}
            <Block id="webhooks" heading="Webhooks" lead="Event types:">
              <div className="flex flex-wrap gap-2">
                {webhooks.eventTypes.map((e) => (
                  <code
                    key={e}
                    className="rounded-[6px] border border-line-violet bg-bg-inset px-3 py-1.5 font-mono text-sm text-violet-soft"
                  >
                    {e}
                  </code>
                ))}
              </div>
              <Bullets items={webhooks.points} />
            </Block>

            {/* ── Orenyx Credits ────────────────────────── */}
            <Block id="orenyx-credits" heading="Orenyx Credits" lead={orenyxCredits.lead}>
              <p className="max-w-[760px] text-20px text-fg-soft">{orenyxCredits.body}</p>
            </Block>

            {/* ── Versioning ───────────────────────────── */}
            <Block id="versioning" heading="API Versioning" lead={versioning.lead}>
              <p className="max-w-[760px] text-20px text-fg-soft">{versioning.body}</p>
              <Link
                href="/developers/changelog"
                className="mt-6 inline-block text-20px text-violet-bright hover:underline"
              >
                Changelog →
              </Link>
            </Block>

            {/* ── SDK roadmap ──────────────────────────── */}
            <Block id="sdks" heading="SDK Roadmap">
              <ul className="space-y-3">
                {sdkRoadmap.map((s) => (
                  <li
                    key={s.name}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-line-violet bg-bg-2/50 px-5 py-4"
                  >
                    <span className="text-fontchnage font-bold text-white">{s.name}</span>
                    <span className="text-20px text-fg-soft">
                      {s.date ?? <Placeholder>target date</Placeholder>}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[760px] text-20px text-fg-soft">{sdkNote}</p>
            </Block>

            {/* ── Sandbox ──────────────────────────────── */}
            <Block id="sandbox" heading="Sandbox / Test Mode" lead={sandbox.lead}>
              <Bullets items={sandbox.points} />
            </Block>

            {/* ── Getting started ──────────────────────── */}
            <Block id="getting-started" heading="Getting Started">
              <ol className="space-y-4">
                {gettingStarted.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-violet bg-bg-inset font-mono text-sm text-violet-soft">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-20px text-fg-soft">{step}</span>
                  </li>
                ))}
              </ol>
            </Block>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
