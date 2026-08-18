import Link from 'next/link';
import type { ReactNode } from 'react';
import { Shell } from '@/components/ui/section';

/** Inner-page hero: violet haze, ring motif, centred title, breadcrumb. */
export function PageHero({
  title,
  lead,
  crumb,
}: {
  title: ReactNode;
  lead?: ReactNode;
  crumb: string;
}) {
  return (
    <div className="hero-band ring-motif relative overflow-hidden innerPageBanner">
      <Shell className="relative z-10 py-20 text-center md:py-28">
        <h1 className="heading-silver text-4xl font-bold leading-[1.1] innerpage-title md:text-6xl">{title}</h1>
        {lead ? (
          <p className="mx-auto mt-5 max-w-[637px] text-banner-inner leading-relaxed text-white/90">{lead}</p>
        ) : null}
        <nav aria-label="Breadcrumb" className="mt-6">
          <ol className="flex justify-center gap-1 text-breadcrumb">
            <li>
              <Link href="/" className="text-violet-soft hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-violet-soft">
              /
            </li>
            <li aria-current="page" className="text-violet-bright">
              {crumb}
            </li>
          </ol>
        </nav>
      </Shell>
    </div>
  );
}
