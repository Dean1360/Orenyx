import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { authentication, endpoints, errorCodes, overview, sandbox } from '@/content/developers';

export const metadata = pageMeta({
  titleTag: 'Authentication — Orenyx AI Engine™',
  title: 'Authentication',
  description:
    'API key authentication for Orenyx AI Engine™ — bearer tokens, per-environment scoping, and key rotation.',
  path: '/developers/authentication',
});

/* Content from the Builder Packet, section 7 (Authentication). No comp. */

const authErrors = errorCodes.filter((e) => e.code === '401' || e.code === '403');
const keyEndpoints = endpoints.filter((e) => e.path.startsWith('/auth/'));

export default function Page() {
  return (
    <>
      <PageHero
        crumb="Authentication"
        title="Authentication"
        lead={authentication.lead}
      />

      <Section>
        <Reveal>
          <div className="max-w-[860px] space-y-12">
            {/* ── Bearer header ────────────────────────── */}
            <div>
              <h2 className="font0size font-bold text-white">Sending your key</h2>
              <p className="mt-3 text-20px text-fg-soft">
                Every request carries the key in an Authorization header. Requests without one are
                rejected with a 401 before they reach the engine.
              </p>
              <div className="mt-6 overflow-x-auto rounded-[8px] border border-line-violet bg-bg-inset px-4 py-3">
                <code className="whitespace-nowrap font-mono text-[15px] text-violet-soft">
                  {authentication.header}
                </code>
              </div>
              {/* `whitespace-pre`, not `nowrap` — nowrap collapses the newlines
                  and the example renders as one unreadable line. */}
              <div className="mt-3 overflow-x-auto rounded-[8px] border border-line-violet bg-bg-inset px-4 py-3">
                <code className="whitespace-pre font-mono text-[15px] leading-relaxed text-fg-soft">
                  {`curl ${overview.baseUrl}/dispatch/events \\\n  -H "${authentication.header}" \\\n  -H "Content-Type: application/json"`}
                </code>
              </div>
              {!overview.baseUrlConfirmed ? (
                <p className="mt-3 text-sm">
                  <Placeholder>confirm the API domain before publishing</Placeholder>
                </p>
              ) : null}
            </div>

            {/* ── Scoping ──────────────────────────────── */}
            <div className="border-t border-line-violet pt-10">
              <h2 className="font0size font-bold text-white">Key scoping</h2>
              <ul className="mt-6 space-y-3">
                {authentication.points.map((p) => (
                  <li key={p} className="flex gap-3 text-20px text-fg-soft">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-bright"
                    />
                    {p}
                  </li>
                ))}
                {sandbox.points.map((p) => (
                  <li key={p} className="flex gap-3 text-20px text-fg-soft">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-bright"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Managing keys ────────────────────────── */}
            <div className="border-t border-line-violet pt-10">
              <h2 className="font0size font-bold text-white">Managing keys</h2>
              <ul className="mt-6 space-y-3">
                {keyEndpoints.map((e) => (
                  <li
                    key={e.path}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[8px] border border-line-violet bg-bg-inset px-5 py-4"
                  >
                    <code className="font-mono text-sm text-white">{e.method}</code>
                    <code className="font-mono text-[15px] text-violet-soft">{e.path}</code>
                    <span className="text-20px text-fg-soft">{e.purpose}</span>
                  </li>
                ))}
                <li className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[8px] border border-line-violet bg-bg-inset px-5 py-4">
                  <code className="font-mono text-sm text-white">POST</code>
                  <code className="font-mono text-[15px] text-violet-soft">/auth/keys/rotate</code>
                  <span className="text-20px text-fg-soft">Rotate an existing key</span>
                </li>
              </ul>
            </div>

            {/* ── Auth errors ──────────────────────────── */}
            <div className="border-t border-line-violet pt-10">
              <h2 className="font0size font-bold text-white">Authentication errors</h2>
              <dl className="mt-6 space-y-3">
                {authErrors.map((e) => (
                  <div
                    key={e.code}
                    className="flex flex-wrap gap-x-5 gap-y-1 rounded-[8px] border border-line-violet bg-bg-inset px-5 py-4"
                  >
                    <dt className="font-mono font-bold text-violet-soft">{e.code}</dt>
                    <dd className="text-20px text-fg-soft">{e.meaning}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/developers#errors"
                className="mt-6 inline-block text-20px text-violet-bright hover:underline"
              >
                All error codes →
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
