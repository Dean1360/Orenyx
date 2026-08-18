import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { changelog, versioning } from '@/content/developers';

export const metadata = pageMeta({
  titleTag: 'Changelog — Orenyx AI Engine™',
  title: 'Changelog',
  description:
    'API changes, new endpoints, deprecations, and fixes for Orenyx AI Engine™, newest first.',
  path: '/developers/changelog',
});

/* Content from the Builder Packet, section 7. Every entry below is marked
   PLACEHOLDER in the packet — these are illustrative, not shipped releases. */

export default function Page() {
  return (
    <>
      <PageHero
        crumb="Changelog"
        title="Changelog"
        lead="API changes, new endpoints, deprecations, and fixes — newest first."
      />

      <Section>
        <Reveal>
          <div className="max-w-[860px]">
            <ol className="border-l border-line-violet">
              {changelog.map((c) => (
                <li key={c.version} className="relative pb-10 pl-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-violet-bright bg-bg"
                  />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="font0size font-bold text-white">{c.version}</h2>
                    <span className="text-sm text-fg-muted">
                      {c.date ?? <Placeholder>release date</Placeholder>}
                    </span>
                  </div>
                  <p className="mt-3 text-20px text-fg-soft">{c.body}</p>
                </li>
              ))}
            </ol>

            <p className="mt-4 text-sm">
              <Placeholder>
                confirm these entries — the packet lists them as illustrative, not shipped
              </Placeholder>
            </p>

            <div className="mt-12 rounded-[14px] border border-line-violet bg-bg-2/50 p-6 md:p-8">
              <p className="text-fontchnage font-bold text-white">Deprecation policy</p>
              <p className="mt-3 text-20px text-fg-soft">{versioning.body}</p>
              <Link
                href="/developers"
                className="mt-5 inline-block text-20px text-violet-bright hover:underline"
              >
                API docs →
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
