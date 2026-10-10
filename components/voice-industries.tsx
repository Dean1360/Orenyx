import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';

/** Voice Dispatch industries: HVAC, Plumbing, Restoration (links to its own page). */
const industries = [
  {
    name: 'HVAC',
    body: 'No-heat and no-cool calls answered, booked, and routed to the right tech.',
    href: null,
    icon: <path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1L19.1 4.9" />,
  },
  {
    name: 'Plumbing',
    body: 'Leaks, clogs, and no-hot-water calls handled day or night.',
    href: null,
    icon: <path d="M12 2.7C9 7 6 10.3 6 14a6 6 0 0 0 12 0c0-3.7-3-7-6-11.3z" />,
  },
  {
    name: 'Restoration (Water • Fire • Mold)',
    body: '24/7 emergency intake and dispatch for restoration companies.',
    href: '/voice-dispatch/restoration',
    icon: (
      <>
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M12 12.5c-1.3 1.8-2.3 3.1-2.3 4.4a2.3 2.3 0 0 0 4.6 0c0-1.3-1-2.6-2.3-4.4z" />
      </>
    ),
  },
];

export function VoiceIndustries() {
  return (
    <Section tone="dark">
      <SectionHead eyebrow="Voice Dispatch" title="Industries We Serve" align="center" silver />
      <p className="mt-4 text-center text-base text-fg-soft">HVAC • Plumbing • Restoration</p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {industries.map((ind, i) => {
          const card = (
            <div
              className={`flex h-full flex-col rounded-[14px] border bg-bg-2/50 p-6 ${
                ind.href ? 'border-violet-soft transition hover:bg-white/10' : 'border-line-violet'
              }`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-violet-bright">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ind.icon}
                </svg>
              </span>
              <p className="mt-4 text-lg font-bold text-white">{ind.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-soft">{ind.body}</p>
              {ind.href ? <p className="mt-auto pt-5 text-sm font-bold text-violet-bright">See Restoration Dispatch →</p> : null}
            </div>
          );
          return (
            <Reveal key={ind.name} delay={i * 70}>
              {ind.href ? (
                <Link href={ind.href} className="block h-full">
                  {card}
                </Link>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mx-auto mt-10 flex max-w-[820px] flex-col items-center gap-4 rounded-[14px] border border-violet-soft bg-white/5 p-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-lg font-bold text-white">Free After-Hours Emergency Audit</p>
            <p className="mt-1 text-sm text-white/75">We call your line after hours and show you what you’re missing.</p>
          </div>
          <Link
            href="/voice-dispatch/restoration#audit"
            className="shrink-0 rounded-full bg-violet-soft px-6 py-3 text-sm font-bold text-bg transition hover:bg-white"
          >
            Get the Free Audit →
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
