import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { statusContact, statusIntro, statusServices } from '@/content/status';

export const metadata = pageMeta({
  title: 'Status',
  description: 'Service status for Orenyx AI Engine™.',
  path: '/status',
});

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-ok"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6 10.2l2.4 2.4L14 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <PageHero crumb="Status" title="Status" lead={statusIntro} />

      <Section>
        <Reveal>
          <div className="mx-auto flex max-w-[820px] items-center gap-3 rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
            <CheckIcon />
            <p className="text-lg font-bold text-white">All Systems Operational</p>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 max-w-[820px] space-y-4">
          {statusServices.map((service, i) => (
            <Reveal key={service.name} delay={i * 60}>
              <div className="flex items-center justify-between gap-4 rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
                <div>
                  <p className="font-bold text-white">{service.name}</p>
                  <p className="mt-1 text-sm text-fg-soft">{service.description}</p>
                </div>
                <span className="flex shrink-0 items-center gap-2 rounded-full border border-ok/40 bg-ok/10 px-3 py-1 text-xs font-bold text-ok">
                  <CheckIcon />
                  Operational
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <p className="mx-auto mt-10 max-w-[820px] text-center text-sm text-fg-soft">
            {statusContact}
            <Link href="/contact" className="text-violet-bright underline">
              Contact us
            </Link>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
