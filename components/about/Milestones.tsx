'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Milestones timeline.
 *
 * Cards alternate either side of a centre rail, with a connector dot where each
 * one meets it.
 *
 * The client's Figma draws the SAME animation in two states: 2005/2007 square
 * on the rail (after), 2008/2009 scattered — tilted and pushed away from the
 * rail (before). So every card enters scattered and settles square as it
 * scrolls into view. `tilt` is the entrance angle; cards without one fall back
 * to the comp's angles (-6° left, -8° right).
 *
 * Cards render fully visible in the server HTML; GSAP applies the resting state
 * on mount. If the script fails or is blocked the visitor still reads the
 * timeline rather than seeing an empty column.
 *
 * Below `lg` the rail moves to the left edge and every card stacks against it —
 * alternating sides at phone width leaves too little room for the body copy.
 */

export type Milestone = {
  year: string;
  title: string;
  body: string;
  tag: string;
  /** Entrance skew angle in degrees. Defaults to the comp's: -6 left, -8 right. */
  tilt?: number;
};

export function Milestones({ items }: { items: Milestone[] }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Rail draws down as the section scrolls.
        gsap.fromTo(
          '[data-rail]',
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.5,
            },
          },
        );

        /*
          One SCRUBBED timeline per milestone — card, connector line and ring
          dot all mapped onto the same stretch of scroll. Nothing here runs on
          a timer, so nothing can be caught mid-flight: a half-grown line or a
          frozen tilted card is impossible, because every element's pose is a
          pure function of scroll position. Scrolling back up replays it in
          reverse.

          Order across the scrub window: the card slides in first, the line
          then grows out of the rail to meet it, and the ring pops last.
        */
        const isLg = window.matchMedia('(min-width: 1024px)').matches;

        gsap.utils.toArray<HTMLElement>('[data-milestone]').forEach((li) => {
          const card = li.querySelector<HTMLElement>('[data-card]');
          const connector = li.querySelector<HTMLElement>('[data-connector]');
          const dot = li.querySelector<HTMLElement>('[data-dot]');
          if (!card || !connector || !dot) return;

          const left = card.dataset.side === 'left';
          // No data-tilt attribute -> comp default. An explicit 0 is honoured
          // (that card enters square). `|| fallback` would be wrong here: the
          // attribute value "0" is a truthy string.
          const raw = card.dataset.tilt;
          const tilt = raw !== undefined ? Number(raw) : left ? -6 : -8;
          // The line grows out of the rail towards its card, so it is anchored
          // at the rail end: on the card's side at lg, always leftwards below.
          const origin = left && isLg ? 'right center' : 'left center';

          gsap
            .timeline({
              scrollTrigger: {
                trigger: li,
                start: 'top 96%',
                end: 'top 58%',
                scrub: 0.4,
              },
            })
            .fromTo(
              card,
              // Before, as the comp draws 2008/2009: sheared. The entrance is
              // exactly `transform: skew(ax)` per the client — skew and fade
              // only, no translation mixed into the transform.
              //
              // immediateRender on all three: children of a timeline don't
              // paint their from-state until the first tick, which leaves one
              // frame of settled cards before the scrub takes hold.
              { opacity: 0, skewX: tilt },
              { opacity: 1, skewX: 0, ease: 'power2.out', immediateRender: true },
            )
            .fromTo(
              connector,
              { scaleX: 0 },
              { scaleX: 1, transformOrigin: origin, ease: 'none', immediateRender: true },
              '<55%',
            )
            .fromTo(
              dot,
              { scale: 0 },
              { scale: 1, ease: 'back.out(2)', immediateRender: true },
              '<40%',
            );
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Finished state, no movement and no skew — the shear only exists as
        // an entrance, and sheared text is harder to read anyway.
        gsap.set('[data-card]', { opacity: 1, skewX: 0 });
        gsap.set('[data-dot]', { scale: 1 });
        gsap.set('[data-connector]', { scaleX: 1 });
        gsap.set('[data-rail]', { scaleY: 1 });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative mt-14">
      {/* Centre rail */}
      <div
        aria-hidden="true"
        data-rail
        className="absolute left-4 top-0 h-full w-px bg-violet lg:left-1/2 lg:-translate-x-1/2"
      />

      <ol className="relative space-y-8 lg:space-y-4">
        {items.map((item, i) => {
          const side = i % 2 === 0 ? 'left' : 'right';

          return (
            <li
              key={item.year}
              data-milestone
              className="relative flex flex-col pl-12 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:pl-0"
            >
              {/* Rail-to-card connector — per the Figma close-up the card is
                  physically attached to the rail by a short line into a ring. */}
              <span
                aria-hidden="true"
                data-connector
                data-side={side}
                className={`absolute top-[35px] h-[2px] w-8 bg-violet ${
                  side === 'left' ? 'left-4 lg:left-auto lg:right-1/2' : 'left-4 lg:left-1/2'
                }`}
              />

              {/* Ring dot on the rail */}
              <span
                aria-hidden="true"
                data-dot
                className="absolute left-4 top-7 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 border-violet-bright bg-bg lg:left-1/2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-bright" />
              </span>

              <div className={side === 'left' ? 'lg:col-start-1' : 'lg:col-start-2'}>
                <article
                  data-card
                  data-side={side}
                  data-tilt={item.tilt}
                  // Soft violet halo plus a drop shadow, per the comp close-up.
                  className="rounded-[14px] border border-line-violet bg-bg-2/40 p-6 shadow-[0_0_26px_rgba(139,124,255,0.28),0_14px_34px_rgba(0,0,0,0.5)]"
                >
                  {/* Sizes per the client: year 56, title 35, body 24, tag 18.
                      The named classes are the site's fluid clamps with those
                      ceilings, so phones still scale down. */}
                  <p className="h2Newfont font-bold leading-none text-violet-soft">{item.year}</p>
                  <h3 className="mt-2 newFont-Parra font-bold text-white">{item.title}</h3>
                  <p className="mt-3 labelFFont leading-relaxed text-fg-soft">{item.body}</p>
                  <span className="mt-4 inline-block rounded-pill bg-violet px-4 py-1.5 text-[18px] font-semibold uppercase tracking-wider text-white shadow-[0_2px_14px_rgba(109,79,227,0.65)]">
                    {item.tag}
                  </span>
                </article>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}