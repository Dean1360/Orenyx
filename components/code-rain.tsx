'use client';

import { useEffect, useRef } from 'react';

/**
 * Binary rain panel.
 *
 * Matched to the reference art rather than a generic matrix effect. The things
 * that make it read correctly:
 *
 *  - Columns vary in GLYPH SIZE, not just position. A uniform grid looks
 *    synthetic; mixed sizes give the field depth.
 *  - Columns sit in brightness TIERS. Roughly a quarter run bright violet, the
 *    rest recede. Without dim columns the panel reads as noise, not depth.
 *  - Each stream has a bright HEAD fading along its tail, so the eye can tell
 *    which way it is falling.
 *  - Characters flip occasionally mid-fall.
 *  - Top and bottom edges fade so the panel sits into the section.
 */

/* ────────────────────────────────────────────────────────────────
   TUNING — every dial for this effect lives here. Nothing below
   this block needs editing to change how the rain looks or moves.
   ──────────────────────────────────────────────────────────────── */

const TUNING = {
  /** Master speed. 1 = default. 0.5 = half speed, 2 = double. */
  speed: 5,

  /** Fall rate in px/sec before size is factored in. Higher = faster. */
  fallBase: 120,

  /** Random speed spread per column. 0 = every column identical. */
  fallJitter: 0.8,

  /** Horizontal gap between columns, px. Lower = denser field. */
  columnGap: 10,
  columnGapJitter: 14,

  /** Glyph size range, px. The spread is what gives the field depth. */
  sizeMin: 10,
  sizeMax: 22,

  /** Characters per stream. Longer = more trailing tail. */
  tailMin: 14,
  tailMax: 40,

  /** Chance per frame that a column flips one of its digits. */
  flipChance: 0.06,

  /** Share of columns at each brightness. Must sum to 1. */
  mix: { bright: 0.26, mid: 0.34, dim: 0.4 },
} as const;

type Column = {
  x: number;
  size: number;
  speed: number;
  head: number;
  len: number;
  /** 0 dim · 1 mid · 2 bright */
  tier: 0 | 1 | 2;
  chars: string[];
};

const TIER_ALPHA = [0.22, 0.5, 1] as const;
const BASE = { r: 124, g: 110, b: 255 };

const bit = () => (Math.random() > 0.5 ? '1' : '0');

export function CodeRain({
  className = '',
  /** Per-instance speed multiplier, applied on top of TUNING.speed. */
  speed = 1,
}: {
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let cols: Column[] = [];

    const rate = TUNING.speed * speed;

    function makeColumn(x: number): Column {
      // Size drives everything else — bigger glyphs fall slower and sit brighter.
      const size =
        TUNING.sizeMin + Math.round(Math.random() * (TUNING.sizeMax - TUNING.sizeMin));

      const roll = Math.random();
      const tier: 0 | 1 | 2 =
        roll < TUNING.mix.bright ? 2 : roll < TUNING.mix.bright + TUNING.mix.mid ? 1 : 0;

      const len =
        TUNING.tailMin + Math.floor(Math.random() * (TUNING.tailMax - TUNING.tailMin));

      return {
        x,
        size,
        tier,
        len,
        // Bigger glyphs read as nearer, so they fall slower — parallax.
        speed:
          (TUNING.fallBase - size) *
          (1 - TUNING.fallJitter / 2 + Math.random() * TUNING.fallJitter) *
          rate,
        head: -Math.random() * h * 1.6,
        chars: Array.from({ length: len }, bit),
      };
    }

    function build() {
      cols = [];
      // Slight jitter on x so the columns do not read as a printed grid.
      let x = 6;
      while (x < w + 20) {
        cols.push(makeColumn(x + (Math.random() * 6 - 3)));
        x += TUNING.columnGap + Math.random() * TUNING.columnGapJitter;
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    let last = performance.now();

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx!.fillStyle = '#0B1120';
      ctx!.fillRect(0, 0, w, h);
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';

      for (const col of cols) {
        if (!reduced) {
          col.head += col.speed * dt;
          // Recycle once the whole tail has cleared the bottom.
          if (col.head - col.len * col.size > h) {
            const fresh = makeColumn(col.x);
            Object.assign(col, fresh, { head: -fresh.len * fresh.size });
          }
          // Occasional flip keeps the field alive without being busy.
          if (Math.random() < TUNING.flipChance) {
            col.chars[Math.floor(Math.random() * col.chars.length)] = bit();
          }
        }

        ctx!.font = `${col.size}px ui-monospace, "SF Mono", monospace`;
        const alphaCap = TIER_ALPHA[col.tier];

        for (let i = 0; i < col.len; i++) {
          const y = col.head - i * col.size;
          if (y < -col.size || y > h + col.size) continue;

          // Brightest at the head, easing away down the tail.
          const t = i / col.len;
          const falloff = (1 - t) ** 1.8;
          const alpha = alphaCap * falloff;
          if (alpha < 0.02) continue;

          // The leading glyph runs hotter than the tint.
          if (i === 0 && col.tier === 2) {
            ctx!.fillStyle = `rgba(214,208,255,${Math.min(1, alpha + 0.25)})`;
          } else {
            ctx!.fillStyle = `rgba(${BASE.r},${BASE.g},${BASE.b},${alpha})`;
          }

          ctx!.fillText(col.chars[i], col.x, y);
        }
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed]);

  return (
    <div className={`relative main-s h-full overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={ref} className="block h-full w-full" />
      {/* Soften both edges so the panel sits into the section rather than on it. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg-inset to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg-inset to-transparent" />
    </div>
  );
}
