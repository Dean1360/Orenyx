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

const W = 1200;
const H = 856;

const CARD = { w: 274, h: 132, r: 14 };
/** Rounded-square die. */
const HUB = { x: 498, y: 277, w: 186, h: 186, r: 30 };
const HUB_CX = HUB.x + HUB.w / 2;
const HUB_CY = HUB.y + HUB.h / 2;

const LEFT_X = 56;
const RIGHT_X = W - LEFT_X - CARD.w;
const LEFT_EDGE = LEFT_X + CARD.w;

/** Card tops per row; middle row centres on the hub. */
const ROW_Y = [74, HUB_CY - CARD.h / 2, 537];
const rowMid = (i: number) => ROW_Y[i] + CARD.h / 2;

/** Where the elbowed rows meet the hub's side, inset from its corners. */
const PAD_TOP = HUB.y + 50;
const PAD_BOT = HUB.y + HUB.h - 50;

/** Elbow turn columns, between the cards and the hub. */
const TURN_L = 416;
const TURN_R = W - TURN_L;
const R_ARC = 20;

const BOTTOM_Y = 703;

type Slot = { x: number; y: number; wire: string; len: number };

/* Approximate path lengths, for the sweep dash. */
const ELBOW_LEN = 340;
const MID_LEN = HUB.x - LEFT_EDGE;
const BOTTOM_LEN = BOTTOM_Y - (HUB.y + HUB.h);

/*
  Geometry in the same order as `ecosystem`: left column top-to-bottom, right
  column top-to-bottom, bottom centre. Wires run card -> hub.
*/
const slots: Slot[] = [
  {
    x: LEFT_X,
    y: ROW_Y[0],
    wire: `M${LEFT_EDGE},${rowMid(0)} H${TURN_L - R_ARC} Q${TURN_L},${rowMid(0)} ${TURN_L},${rowMid(0) + R_ARC} V${PAD_TOP - R_ARC} Q${TURN_L},${PAD_TOP} ${TURN_L + R_ARC},${PAD_TOP} H${HUB.x}`,
    len: ELBOW_LEN,
  },
  {
    x: LEFT_X,
    y: ROW_Y[1],
    wire: `M${LEFT_EDGE},${HUB_CY} H${HUB.x}`,
    len: MID_LEN,
  },
  {
    x: LEFT_X,
    y: ROW_Y[2],
    wire: `M${LEFT_EDGE},${rowMid(2)} H${TURN_L - R_ARC} Q${TURN_L},${rowMid(2)} ${TURN_L},${rowMid(2) - R_ARC} V${PAD_BOT + R_ARC} Q${TURN_L},${PAD_BOT} ${TURN_L + R_ARC},${PAD_BOT} H${HUB.x}`,
    len: ELBOW_LEN,
  },
  {
    x: RIGHT_X,
    y: ROW_Y[0],
    wire: `M${RIGHT_X},${rowMid(0)} H${TURN_R + R_ARC} Q${TURN_R},${rowMid(0)} ${TURN_R},${rowMid(0) + R_ARC} V${PAD_TOP - R_ARC} Q${TURN_R},${PAD_TOP} ${TURN_R - R_ARC},${PAD_TOP} H${HUB.x + HUB.w}`,
    len: ELBOW_LEN,
  },
  {
    x: RIGHT_X,
    y: ROW_Y[1],
    wire: `M${RIGHT_X},${HUB_CY} H${HUB.x + HUB.w}`,
    len: MID_LEN,
  },
  {
    x: RIGHT_X,
    y: ROW_Y[2],
    wire: `M${RIGHT_X},${rowMid(2)} H${TURN_R + R_ARC} Q${TURN_R},${rowMid(2)} ${TURN_R},${rowMid(2) - R_ARC} V${PAD_BOT + R_ARC} Q${TURN_R},${PAD_BOT} ${TURN_R - R_ARC},${PAD_BOT} H${HUB.x + HUB.w}`,
    len: ELBOW_LEN,
  },
  {
    x: HUB_CX - CARD.w / 2,
    y: BOTTOM_Y,
    wire: `M${HUB_CX},${BOTTOM_Y} V${HUB.y + HUB.h}`,
    len: BOTTOM_LEN,
  },
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
        <text
          x={HUB_CX}
          y={HUB_CY + 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#ai-fill)"
          fontSize="104"
          fontWeight="800"
          letterSpacing="-2"
        >
          AI
        </text>
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
        <text
          x={cx}
          y={S.hubY + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#ai-fill-s)"
          fontSize="58"
          fontWeight="800"
          letterSpacing="-1"
        >
          AI
        </text>
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
