import Image from 'next/image';
import type { ReactNode } from 'react';

export function Shell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 md:px-8 ${className}`}>{children}</div>
  );
}

type Tone = 'dark' | 'violet' | 'inset';

/** CSS motifs. Free, no asset needed. */
export type Pattern = 'dots' | 'grid' | 'rings' | 'glow';

export type SectionBg = {
  /** Path under /public, e.g. '/bg/solution.png'. Optional. */
  src: string;
  /** 0–1. Keep low; body text has to stay readable on top. */
  opacity?: number;
  /** object-position, e.g. 'center', 'top right'. */
  position?: string;
};

const tones: Record<Tone, string> = {
  dark: 'bg-bg',
  violet: 'bg-violet',
  inset: 'bg-bg-inset',
};

const patterns: Record<Pattern, string> = {
  dots: 'bg-dots',
  grid: 'bg-grid',
  rings: 'bg-rings',
  glow: 'bg-glow',
};

/**
 * Page section.
 *
 * Backgrounds stack in this order, bottom to top:
 *   1. tone (flat colour)
 *   2. bg image, if given
 *   3. pattern, a CSS motif
 *   4. content
 *
 * Use `pattern` by default. Reach for `bg` only when the art is specific enough
 * that CSS can't express it — an exported render, a photo, a texture.
 *
 * Padding is HALF the section rhythm on each side (48px at md), so two
 * stacked sections meet with a single 96px gap rather than a doubled 192px
 * void — the client flagged the doubling on every page. Don't bump this back
 * without checking consecutive same-background sections.
 */
export function Section({
  children,
  tone = 'dark',
  pattern,
  bg,
  className = '',
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  pattern?: Pattern;
  bg?: SectionBg;
  className?: string;
  id?: string;
}) {
  const decorated = pattern || bg;

  return (
    <section
      id={id}
      className={`${tones[tone]} ${decorated ? 'relative overflow-hidden' : ''} ${
        pattern ? patterns[pattern] : ''
      } py-8 md:py-12 ${className}`}
    >
      {bg ? (
        <Image
          src={bg.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority={false}
          className="pointer-events-none select-none object-cover"
          style={{ opacity: bg.opacity ?? 0.3, objectPosition: bg.position ?? 'center' }}
        />
      ) : null}

      <Shell className={decorated ? 'relative z-10' : ''}>{children}</Shell>
    </section>
  );
}

/** Small label above a heading. Sentence case, violet-soft — as per Figma. */
export function Eyebrow({
  children,
  tone = 'violet',
}: {
  children: ReactNode;
  tone?: 'violet' | 'muted';
}) {
  return (
    <p className={`text-sm labelFFont ${tone === 'violet' ? 'text-violet-soft' : 'text-fg-muted'}`}>
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = 'left',
  silver = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  silver?: boolean;
}) {
  return (
    <div className={align === 'center' ? 'mx-auto text-center' : ''}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-2 text-3xl h2Newfont font-bold md:text-[2.75rem] md:leading-[1.12] ${
          silver ? 'heading-silver' : ''
        }`}
      >
        {title}
      </h2>
      {lead ? <div className="mt-4 text-lg newFont-Parra leading-relaxed text-fg-soft">{lead}</div> : null}
    </div>
  );
}
