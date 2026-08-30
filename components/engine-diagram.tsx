import type { CSSProperties } from 'react';
import { ecosystem } from '@/content/site';

/**
 * Hero diagram — the Orenyx products wired into one central engine.
 *
 * Built to the client's minimal comp: plain outline cards (no icons), a
 * rounded-square hub with a gradient "AI", and thin elbow connectors. Three
 * cards down each side, one centred below the hub. The only glow is the soft
 * bloom behind the hub.
 *
 * Motion, all CSS (see globals.css, `.orb-*`):
 *   SWEEP — a highlight runs each connector, staggered per card
 *   RIDER — a dot travels hub -> card on the same clock
 *   PULSE — the hub bloom breathes
 *
 * No background rect — the SVG composites onto the hero band.
 */

const W = 1838;
const H = 1234;

const CARD = { w: 274, h: 132, r: 14 };
/** Rounded-square die. */
const HUB = { x: 826, y: 541, w: 186, h: 186, r: 30 };
const HUB_CX = HUB.x + HUB.w / 2;
const HUB_CY = HUB.y + HUB.h / 2;

type Slot = { x: number; y: number; wire: string; len: number };

/*
  12-box layout, added 2026-08-30 (client-directed): a box above the hub, a
  box below it, and five nested positions down each side — an outer card and
  an inner card share the top and bottom rows (each on its own elbow lane and
  landing point on the hub so neither line hides behind the other's card),
  plus one inner card on the row level with the hub. Coordinates below were
  laid out with a small geometry script rather than hand-derived formulas,
  since the outer/inner lanes need independent turn columns and landing
  points; kept as literal values here for clarity. Order matches `ecosystem`.
  Wires run card -> hub.
*/
const slots: Slot[] = [
  { x: 782, y: 74, wire: `M919,206 V541`, len: 335 },
  { x: 40, y: 246, wire: `M314,312 H658 Q678,312 678,332 V551 Q678,571 698,571 H826`, len: 380 },
  { x: 364, y: 342, wire: `M638,408 H704 Q724,408 724,428 V579 Q724,599 744,599 H826`, len: 340 },
  { x: 364, y: 568, wire: `M638,634 H826`, len: 188 },
  { x: 364, y: 794, wire: `M638,860 H704 Q724,860 724,840 V689 Q724,669 744,669 H826`, len: 340 },
  { x: 40, y: 890, wire: `M314,956 H658 Q678,956 678,936 V717 Q678,697 698,697 H826`, len: 380 },
  {
    x: 1200,
    y: 342,
    wire: `M1200,408 H1134 Q1114,408 1114,428 V579 Q1114,599 1094,599 H1012`,
    len: 340,
  },
  {
    x: 1524,
    y: 246,
    wire: `M1524,312 H1180 Q1160,312 1160,332 V551 Q1160,571 1140,571 H1012`,
    len: 380,
  },
  { x: 1200, y: 568, wire: `M1200,634 H1012`, len: 188 },
  {
    x: 1200,
    y: 794,
    wire: `M1200,860 H1134 Q1114,860 1114,840 V689 Q1114,669 1094,669 H1012`,
    len: 340,
  },
  {
    x: 1524,
    y: 890,
    wire: `M1524,956 H1180 Q1160,956 1160,936 V717 Q1160,697 1140,697 H1012`,
    len: 380,
  },
  { x: 782, y: 1062, wire: `M919,1062 V727`, len: 335 },
];

/*
  Names come from the shared product list, never from here — the client asked
  that the cards, the marquee and the banner all read the same. Adding a
  product without giving it a slot should stop the build rather than silently
  drop it off the diagram.
*/
if (slots.length !== ecosystem.length) {
  throw new Error(
    `engine-diagram: ${ecosystem.length} products in content/site.ts but ` +
      `${slots.length} card slots. Add geometry for the new product.`,
  );
}

const cards = ecosystem.map((product, i) => ({
  product,
  ...slots[i],
  delay: +((i * 3) / ecosystem.length).toFixed(2),
}));

const ARIA = `${ecosystem.map((p) => p.label).join(', ')} all connected to a central AI engine.`;

export function EngineDiagram({ className = '' }: { className?: string }) {
  return (
    <>
      <BoxDiagram className={`hidden md:block ${className}`} />
      <StackDiagram className={`md:hidden ${className}`} />
    </>
  );
}

/* ── Shared paint ──────────────────────────────────── */

function Paint({ suffix }: { suffix: string }) {
  return (
    <defs>
      <linearGradient id={`ai-fill${suffix}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CFC6FF" />
        <stop offset="100%" stopColor="#6D4FE3" />
      </linearGradient>
      <linearGradient id={`die-edge${suffix}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C9BFFF" />
        <stop offset="100%" stopColor="#6D4FE3" />
      </linearGradient>
      <filter id={`bloom${suffix}`} x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="20" />
      </filter>
    </defs>
  );
}

/* ── Wide layout ───────────────────────────────────── */

function BoxDiagram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={ARIA}
    >
      <Paint suffix="" />

      {/* Resting wires */}
      <g fill="none" stroke="#7466D9" strokeWidth="2" strokeLinecap="round">
        {cards.map((c) => (
          <path key={`wire-${c.product.label}`} d={c.wire} />
        ))}
      </g>

      {/* Sweeps */}
      <g fill="none" stroke="#D6D0FF" strokeWidth="2.4" strokeLinecap="round">
        {cards.map((c) => (
          <path
            key={`sweep-${c.product.label}`}
            className="orb-sweep"
            d={c.wire}
            strokeDasharray={`${c.len} ${c.len}`}
            opacity="0.95"
            style={{ '--len': String(c.len), animationDelay: `${c.delay}s` } as CSSProperties}
          />
        ))}
      </g>

      {/* Riders — hub outward (paths run card -> hub, so the ride reverses) */}
      <g fill="#E4DFFF">
        {cards.map((c) => (
          <circle
            key={`rider-${c.product.label}`}
            className="orb-rider-rev"
            r="4.5"
            style={
              { offsetPath: `path("${c.wire}")`, animationDelay: `${c.delay}s` } as CSSProperties
            }
          />
        ))}
      </g>

      {/* Hub */}
      <g>
        <rect
          className="orb-pulse"
          x={HUB.x}
          y={HUB.y}
          width={HUB.w}
          height={HUB.h}
          rx={HUB.r}
          fill="#8B7CFF"
          opacity="0.5"
          filter="url(#bloom)"
        />
        <rect
          x={HUB.x}
          y={HUB.y}
          width={HUB.w}
          height={HUB.h}
          rx={HUB.r}
          fill="#10162B"
          stroke="url(#die-edge)"
          strokeWidth="2.6"
        />
        <image
          href="/brand/motus-ai-engine.png"
          x={HUB_CX - 75}
          y={HUB_CY - 45}
          width={150}
          height={90}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      {/* Cards */}
      {cards.map((c) => {
        const cx = c.x + CARD.w / 2;
        const mid = c.y + CARD.h / 2;
        return (
          <g key={c.product.label}>
            <rect
              x={c.x}
              y={c.y}
              width={CARD.w}
              height={CARD.h}
              rx={CARD.r}
              fill="#121A30"
              stroke="#8B7CFF"
              strokeWidth="1.6"
              strokeOpacity="0.75"
            />
            <text
              x={cx}
              y={mid - 12}
              textAnchor="middle"
              className="orb-label"
            >
              {c.product.lines[0]}
              <tspan x={cx} dy="34">
                {c.product.lines[1]}
              </tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Narrow: the stack ─────────────────────────────── */

const S = { w: 380, hubY: 84, hubSize: 116, firstY: 216, pitch: 82, cardX: 24, cardW: 332, cardH: 64 };
const S_H = S.firstY + (ecosystem.length - 1) * S.pitch + S.cardH + 20;

/**
 * The wide layout is 1200 units across; on a 375px phone its labels fall
 * under 9px on screen. Below `md` this takes over: hub on top, one outline
 * card per product in the same minimal style.
 */
function StackDiagram({ className = '' }: { className?: string }) {
  const rowY = (i: number) => S.firstY + i * S.pitch;
  const cx = S.w / 2;
  const hubX = cx - S.hubSize / 2;

  return (
    <svg
      viewBox={`0 0 ${S.w} ${S_H}`}
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={ARIA}
    >
      <Paint suffix="-s" />

      {/* Spine, hub down through every card */}
      <path
        d={`M${cx},${S.hubY + S.hubSize / 2} V${rowY(ecosystem.length - 1)}`}
        fill="none"
        stroke="#7466D9"
        strokeWidth="1.8"
      />

      {/* Hub */}
      <g>
        <rect
          className="orb-pulse"
          x={hubX}
          y={S.hubY - S.hubSize / 2}
          width={S.hubSize}
          height={S.hubSize}
          rx="22"
          fill="#8B7CFF"
          opacity="0.5"
          filter="url(#bloom-s)"
        />
        <rect
          x={hubX}
          y={S.hubY - S.hubSize / 2}
          width={S.hubSize}
          height={S.hubSize}
          rx="22"
          fill="#10162B"
          stroke="url(#die-edge-s)"
          strokeWidth="2"
        />
        <image
          href="/brand/motus-ai-engine.png"
          x={cx - 45}
          y={S.hubY - 27}
          width={90}
          height={54}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      {/* Cards */}
      {ecosystem.map((product, i) => {
        const y = rowY(i);
        return (
          <g key={product.label}>
            <rect
              x={S.cardX}
              y={y}
              width={S.cardW}
              height={S.cardH}
              rx="12"
              fill="#121A30"
              stroke="#8B7CFF"
              strokeWidth="1.4"
              strokeOpacity="0.75"
            />
            <text x={cx} y={y + S.cardH / 2 + 6} textAnchor="middle" className="orb-label-s">
              {product.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
