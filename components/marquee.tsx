import Image from 'next/image';
import { Shell } from '@/components/ui/section';
import { ecosystem } from '@/content/site';

/**
 * Ecosystem strip.
 *
 * Constrained to the page grid — the rule and background run full-bleed, but the
 * lockup and the scrolling names align to the same 1180px shell as every other
 * section, so the logo sits flush with the header logo above it.
 *
 * The lockup is pinned and does NOT move; only the names scroll.
 *
 * Seamless loop: the list repeats enough times to overflow the shell, that run
 * is duplicated, and the track translates exactly -50%. At the snap-back the
 * second copy sits precisely where the first began, so there is no seam.
 */

const REPEATS = 4;

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEATS }).flatMap((_, r) =>
        ecosystem.map((item) => (
          <span
            key={`${r}-${item.label}`}
            className="whitespace-nowrap px-8 text-sm font-medium text-violet-soft"
          >
            {item.label}
          </span>
        )),
      )}
    </div>
  );
}

export function EcosystemMarquee() {
  return (
    <div className="border-y border-line bg-bg-inset">
      <Shell>
        <div className="flex items-center gap-6 py-4">
          {/* Anchored lockup — never scrolls. */}
          <div className="flex shrink-0 items-center gap-6">
            {/* Old MOTUS wordmark swapped for the main mark in the Orenyx
                rebrand — this file carries the client's new ™ artwork. */}
            <Image
              src="/brand/motus-ai-engine.png"
              alt="Orenyx AI Engine™"
              width={140}
              height={40}
              priority={false}
              className="h-10 w-auto"
            />
            <span aria-hidden="true" className="h-8 w-px bg-violet" />
          </div>

          {/* Scrolling names */}
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="marquee-track flex w-max">
              <Run />
              <Run hidden />
            </div>

            {/* Fade both edges so names dissolve rather than clip. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg-inset to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg-inset to-transparent"
            />
          </div>
        </div>
      </Shell>
    </div>
  );
}