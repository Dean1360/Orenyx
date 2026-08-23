import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { RequestAccessForm } from '@/components/request-access-form';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { site } from '@/content/site';

export const metadata = pageMeta({
  titleTag: 'Request Access — Orenyx AI Engine™',
  title: 'Contact Us',
  description:
    'Request access to Orenyx AI Engine™ and start routing dispatch, bot, and payment decisions through one platform.',
  path: '/contact',
});

/**
 * Three ways in, per the comp. All three now route to the same confirmed
 * address — no separate sales@/security@ inbox was ever set up, and the
 * Builder Packet addendum (Section 9) consolidates them to legal@orenyxengine.com.
 */
const channels = [
  { heading: 'Sales Inquiries:', email: site.supportEmail, highlight: false },
  { heading: 'Contact Support', email: site.supportEmail, highlight: false },
  { heading: 'Security Disclosures', email: site.supportEmail, highlight: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHero crumb="Contact Us" title="Contact Us" />

      {/* ── Request Access panel ─────────────────────────── */}
      <Section>
        <Reveal>
          <div className="contact-panel rounded-panel px-6 py-10 sm:px-10 md:px-12 md:py-14 lg:px-16">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="h2Newfont font-bold leading-[1.15] text-white">
                  Let&apos;s talk about
                  <br />
                  what you&apos;re building.
                </h2>
                <p className="mt-6 max-w-[520px] text-lg font-bold leading-relaxed text-white newFont-Parra">
                  Whether you&apos;re evaluating Orenyx AI Engine for your own operations, exploring a
                  White-Label partnership, or scoping a custom workflow, tell us what you need and
                  we&apos;ll get back to you.
                </p>
              </div>

              <RequestAccessForm />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Direct channels ──────────────────────────────── */}
      <Section className="newpadding0">
        <Reveal>
          <div className="grid border-l border-t border-line-violet sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c) => (
              <div
                key={c.heading}
                /* At sm the grid is 2-up, which strands the third tile alone on
                   its own row — let it span the full width there instead. */
                className={`flex min-h-[260px] flex-col justify-between border-b border-r border-line-violet p-8 md:min-h-[320px] md:p-10 ${
                  c.highlight ? 'bg-violet-bright sm:col-span-2 lg:col-span-1' : 'bg-bg'
                }`}
              >
                <h3
                  className={`font0size font-bold leading-tight ${
                    c.highlight ? 'text-bg' : 'text-violet-bright'
                  }`}
                >
                  {c.heading}
                </h3>

                <div className="mt-10 flex items-end justify-between gap-4">
                  {c.email ? (
                    <a
                      href={`mailto:${c.email}`}
                      className={`text-20px break-all hover:underline ${
                        c.highlight ? 'text-bg' : 'text-white'
                      }`}
                    >
                      {c.email}
                    </a>
                  ) : (
                    <span className="text-20px">
                      <Placeholder>{c.heading.replace(':', '')} address</Placeholder>
                    </span>
                  )}

                  {c.highlight ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-5 w-5 shrink-0 stroke-bg"
                      fill="none"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12 12 4M6 4h6v6" />
                    </svg>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
