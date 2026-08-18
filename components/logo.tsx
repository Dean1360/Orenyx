'use client';
// Marked as a client module deliberately: this mark renders inside both the
// client header and the server footer/marquee. Under Next 15.5 that dual-graph
// import breaks the RSC client manifest at build time ("Could not find the
// module ... in the React Client Manifest"). It has no hooks, so the cost is nil.

import Image from 'next/image';

/**
 * Brand lockup.
 *
 * Raster on purpose — the mark is a 3D chrome orbital badge that cannot be
 * reproduced faithfully in vector. Source lives at public/brand/, currently a
 * magenta-marked PLACEHOLDER awaiting the real export from the client.
 *
 * Export a single PNG with transparency at 3x the largest rendered size
 * (480×216). Do NOT hand-export WebP — next/image negotiates AVIF/WebP per
 * request from this one source, so a pre-compressed input only loses quality.
 */

const SRC = '/brand/motus-ai-engine.png';

/** Intrinsic aspect ratio of the source asset. Update if the export changes.
    The current PNG is 196×135; the old 480/216 here predated it, which left
    next/image reserving the wrong box and over-requesting on `sizes`. */
const RATIO = 196 / 135;

/** Largest height each placement renders at, so next/image asks for the right
    intrinsic size. The header renders 56px on phones and 80px from md up. */
const sizes = {
  header: 90,
  marquee: 40,
  footer: 64,
} as const;

export function Logo({
  variant = 'header',
  priority = false,
  fluid = false,
  className = '',
}: {
  variant?: keyof typeof sizes;
  /** Set on the header instance only — it's the one in the initial viewport. */
  priority?: boolean;
  /**
   * Drop the inline height so `className` can size the mark per breakpoint.
   * The inline style would otherwise beat any utility class. `variant` still
   * sets the intrinsic dimensions next/image needs, so pick the one closest to
   * the largest rendered size.
   */
  fluid?: boolean;
  className?: string;
}) {
  const h = sizes[variant];

  return (
    <Image
      src={SRC}
      alt="Orenyx AI Engine™"
      width={Math.round(h * RATIO)}
      height={h}
      priority={priority}
      sizes={`${Math.round(h * RATIO)}px`}
      className={fluid ? `w-auto ${className}` : `h-auto w-auto ${className}`}
      style={fluid ? undefined : { height: h }}
    />
  );
}
