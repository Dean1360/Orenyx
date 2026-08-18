import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'light' | 'dark';

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-sm font-medium ' +
  'transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-violet text-white hover:bg-violet-deep',
  outline: 'border border-white/25 text-white hover:border-violet-bright hover:text-violet-soft',
  light: 'bg-white text-bg hover:bg-lavender',
  dark: 'bg-bg text-white hover:bg-bg-3',
};

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7h9M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  arrow = true,
  className = 'font-sizechange',
  children,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  arrow = true,
  className = ' ',
  children,
  ...rest
}: ComponentProps<'button'> & { variant?: Variant; arrow?: boolean }) {
  return (
    <button className={`${base}  ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
