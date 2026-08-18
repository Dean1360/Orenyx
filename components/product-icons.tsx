import type { ReactNode } from 'react';
import type { IconName } from '@/content/site';

/**
 * Line-art glyphs for the hero diagram nodes.
 *
 * Each is drawn on a 24×24 grid with stroke only, so one `transform` can place
 * and scale it inside the SVG without any raster asset. Keep new glyphs to the
 * same weight (1.7) and grid — they sit side by side and mismatched weights
 * read as a mistake.
 */
const glyphs: Record<IconName, ReactNode> = {
  wallet: (
    <>
      <path d="M3.5 8.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2z" />
      <path d="M18.5 10.5h2.5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2.5a2 2 0 0 1 0-4z" />
      <path d="M3.5 8.5 15 5" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-6l-4.5 4v-4H6a2 2 0 0 1-2-2z" />
      <path d="M9 10h.01" />
      <path d="M12 10h.01" />
      <path d="M15 10h.01" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 7.5a1 1 0 0 1 1-1h9.5a1 1 0 0 1 1 1v9h-11.5z" />
      <path d="M14 10.5h3.4l3.1 3.2v3.3H14z" />
      <circle cx="7" cy="17.6" r="1.9" />
      <circle cx="17.2" cy="17.6" r="1.9" />
      <path d="M8.9 17.6h6.4" />
    </>
  ),
  people: (
    <>
      <path d="M9 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.2a2.6 2.6 0 0 1 0 5.1" />
      <path d="M17 14.2a4.8 4.8 0 0 1 3.5 4.6" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5v14" />
      <path d="M12 6.5A3 3 0 0 0 6.6 8 2.6 2.6 0 0 0 5 12.4 2.8 2.8 0 0 0 7.4 17 3 3 0 0 0 12 18.5" />
      <path d="M12 6.5A3 3 0 0 1 17.4 8 2.6 2.6 0 0 1 19 12.4a2.8 2.8 0 0 1-2.4 4.6A3 3 0 0 1 12 18.5" />
      <path d="M9 10.5h1.5" />
      <path d="M13.5 13.5H15" />
    </>
  ),
  mic: (
    <>
      <path d="M12 3.5a3 3 0 0 1 3 3v5.5a3 3 0 0 1-6 0V6.5a3 3 0 0 1 3-3z" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
      <path d="M12 18v3" />
      <path d="M9 21h6" />
    </>
  ),
  cloud: (
    <>
      <path d="M6.6 16.5a3.6 3.6 0 0 1 .5-7.2 5.1 5.1 0 0 1 9.6 1.2 3.5 3.5 0 0 1-.4 7z" />
      <path d="M8.5 16.5v2" />
      <path d="M12 16.5v3" />
      <path d="M15.5 16.5v2" />
      <circle cx="8.5" cy="19.4" r="1.1" />
      <circle cx="12" cy="20.4" r="1.1" />
      <circle cx="15.5" cy="19.4" r="1.1" />
    </>
  ),
};

/**
 * The cloud carries the letters API, per the client's reference art. Text can't
 * live in the stroke-only group above — it needs a fill — so it rides alongside.
 */
const overlays: Partial<Record<IconName, ReactNode>> = {
  cloud: (
    <text
      x="12"
      y="14.4"
      textAnchor="middle"
      fontSize="5.6"
      fontWeight="700"
      fill="currentColor"
      stroke="none"
    >
      API
    </text>
  ),
};

/** Placed by the caller: `transform` positions and scales the 24×24 grid. */
export function ProductIcon({
  name,
  transform,
  strokeWidth = 1.7,
  filter,
  color = '#EFE9FF',
}: {
  name: IconName;
  transform: string;
  strokeWidth?: number;
  filter?: string;
  color?: string;
}) {
  return (
    <g transform={transform} filter={filter} color={color}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyphs[name]}
      </g>
      {overlays[name] ?? null}
    </g>
  );
}
