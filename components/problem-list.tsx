'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * The numbered problem list, revealed one item at a time as the section
 * scrolls through the viewport.
 *
 * Two things worth knowing about how this is wired:
 *
 * 1. The list renders FULLY VISIBLE in the server HTML. GSAP dims the items on
 *    mount, not CSS. If the script fails, is blocked, or the user is on a slow
 *    connection, they get four legible problem statements rather than a blank
 *    violet panel. Never hide content in CSS and rely on JS to bring it back.
 *
 * 2. `scrub` ties progress to scroll position rather than firing a fixed
 *    animation on entry — so the reveal tracks the user's scroll and reverses
 *    when they scroll back up.
 */

export function ProblemList({ items }: { items: readonly string[] }) {
  const root = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]');

        // Resting state, applied by JS so no-JS users keep the content.
        gsap.set(rows, { opacity: 0.18, y: 28 });
        gsap.set('[data-num]', { opacity: 0.25, scale: 0.92 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 82%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        });

        rows.forEach((row) => {
          const num = row.querySelector('[data-num]');
          tl.to(row, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
            // Slight overlap so the numeral leads its line in.
            .to(num, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, '<0.1');
        });
      });

      // Reduced motion: no movement, no scrub — just the finished state.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-row]', { opacity: 1, y: 0 });
        gsap.set('[data-num]', { opacity: 1, scale: 1 });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <ol ref={root} className="mt-12  listfont space-y-8 md:space-y-10">
      {items.map((item, i) => (
        <li key={item} data-row className="flex items-start gap-2 md:gap-2">
          <span
            data-num
            aria-hidden="true"
            className="w-[68px] shrink-0 font-mono text-5xl font-bold leading-none tabular-nums text-white/45 md:w-[88px] md:text-6xl mina-number"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="pt-1 text-lg leading-snug text-white md:pt-2 md:text-xl">{item}</span>
        </li>
      ))}
    </ol>
  );
}
