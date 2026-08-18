'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { primaryNav, utilityNav } from '@/content/site';
import { Logo } from '@/components/logo';

/**
 * Site header — two tiers, per the client comp.
 *
 *   1. Utility bar: dark navy, right-aligned. Log in reads as the primary
 *      action (filled violet), Status as secondary (outlined).
 *   2. Main bar: violet, dark nav text, active item underlined, and a dark
 *      "Get Started" pill on the right.
 *
 * The inline nav needs ~870px for eight links plus the logo and the CTA, so it
 * collapses to a drawer below `lg`. Both tiers stay on screen at every width —
 * only the link list moves into the drawer.
 */

/** Shared padding so both tiers line their content up on the same gutters. */
const BAR = 'mx-auto flex w-full max-w-[1180px] items-center px-4 sm:px-5 md:px-8';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* ── Utility bar ─────────────────────────────────── */}
      <div className="newbg-header">
        <div className={`${BAR} h-10 justify-end gap-2 sm:gap-3`}>
          {utilityNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[6px] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] sm:px-5 sm:text-[11px] ${i === 0
                  ? ' text-white  topbar-buttoncolor1'
                  : 'border border-white/30 topbar-buttoncolor2'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Main bar ────────────────────────────────────── */}
      <div className="header-violet bg-new-fix">
        {/* Bar height is driven by the logo: 80px + 12px of air top and bottom.
            Phones step the mark down to 56px so the sticky header does not eat
            a fifth of the viewport. */}
        <div className={`${BAR} h-[76px] justify-between gap-4 md:h-[104px]`}>
          <Link href="/" aria-label="Orenyx AI Engine™ — home" className="shrink-0">
            <Logo variant="header" priority fluid className="h-[56px] w-auto md:h-20" />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-4 lg:flex xl:gap-6"
          >
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`nav-link whitespace-nowrap text-[13px] font-medium transition-colors xl:text-sm ${active ? 'nav-link-active' : ''
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className=" shrink-0 thebutrrtonas-grd"
          >
            <div className="thebutrrtonas">
            Get Started
            <Arrow />
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            // White on the dark bar — the old ink-on-violet colours vanished
            // when the bar background moved to #0F172A.
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] border border-white/40 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {open ? (
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Drawer ──────────────────────────────────────── */}
      {open ? (
        <div
          id="mobile-nav"
          className="header-violet max-h-[calc(100dvh-116px)] overflow-y-auto border-t border-bg/20 md:max-h-[calc(100dvh-144px)] lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-[1180px] px-4 py-3 sm:px-5">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`nav-link block border-b border-bg/15 py-3 text-[15px] font-medium ${isActive(item.href) ? 'nav-link-active' : ''
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* No Get Started here — the main bar's button stays visible above
                the open drawer, so repeating it was redundant. */}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
