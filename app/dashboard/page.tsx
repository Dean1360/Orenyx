import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { dashboardCategories, dashboardHero } from '@/content/dashboard';

export const metadata = pageMeta({
  titleTag: 'Your Dashboard — Orenyx AI Engine™',
  title: 'Your Dashboard',
  description:
    'Every tenant gets a full ORENYX dashboard covering jobs, technicians, scheduling, payments, customers, bots, reporting, and settings.',
  path: '/dashboard',
});

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-violet-bright"
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

function ArrowBullet() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-1 shrink-0 text-violet-bright"
    >
      <path
        d="M2 8h10M8.5 4.5L12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <>
      <PageHero crumb="Your Dashboard" title={dashboardHero.title} lead={dashboardHero.lead} />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dashboardCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 50}>
              <div className="flex h-full flex-col rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
                <div className="flex items-center gap-3">
                  <CheckIcon />
                  <p className="text-lg font-bold text-violet-bright">{cat.name}</p>
                </div>

                <ul className="mt-5 space-y-3 text-sm font-srs">
                  {cat.items.map((item) => (
                    <li key={item} className="flex gap-3 text-fg-soft">
                      <ArrowBullet />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
