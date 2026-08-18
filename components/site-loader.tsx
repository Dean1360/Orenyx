'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Splash loader — the client's logo over the site's dark navy, breathing
 * inside a violet bloom, with a shimmer bar beneath.
 *
 * Timing: server-rendered visible, so it covers the page from the very first
 * paint with no flash of unstyled content. Once the window has loaded (or
 * immediately, if it already had by hydration) it stays up to a minimum of
 * 600ms — long enough to read as a deliberate splash rather than a flicker —
 * then fades and unmounts.
 *
 * If JavaScript never runs, the <noscript> rule in globals.css hides it, so
 * the site is never trapped behind an overlay.
 */

const MIN_SHOW_MS = 600;
const FADE_MS = 450;

export function SiteLoader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const shownAt = performance.now();
    let fadeTimer: ReturnType<typeof setTimeout>;
    let goneTimer: ReturnType<typeof setTimeout>;

    const dismiss = () => {
      const wait = Math.max(0, MIN_SHOW_MS - (performance.now() - shownAt));
      fadeTimer = setTimeout(() => {
        setFading(true);
        goneTimer = setTimeout(() => setGone(true), FADE_MS);
      }, wait);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss, { once: true });
    }

    return () => {
      window.removeEventListener('load', dismiss);
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-label="Loading Orenyx AI Engine™"
      className={`site-loader ${fading ? 'site-loader--out' : ''}`}
    >
      <div className="site-loader__stack">
        <div className="site-loader__glow" aria-hidden="true" />
        <Image
          src="/brand/motus-ai-engine.png"
          alt="Orenyx AI Engine™"
          width={528}
          height={318}
          priority
          className="site-loader__logo"
        />
        <div className="site-loader__bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
