import Link from 'next/link';
import { footerNav, site } from '@/content/site';
import { Logo } from '@/components/logo';

/** Violet outer band with a dark rounded panel inset, per the Figma. */
export function SiteFooter() {
  return (
    <footer className=" bg-footergred px-4 pt-10 md:px-6">
      <div className="mx-auto max-w-[1180px] rounded-panel bg-bg-inset px-6 py-14 md:px-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_repeat(4,minmax(0,1fr))]">
          {/* Centred at every width, per the comp — the logo sits centred with
              the blurb centred beneath it, beside the left-aligned columns. */}
          <div className="flex flex-col items-center text-center">
            <Logo variant="footer" />
            <p className="mt-6 max-w-[280px] text-sm leading-relaxed text-fg-muted">
              {site.footerBlurb}
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              {/* Short accent bar beneath, drawn by ::after — see globals. */}
              <p className="footer-heading text-sm font-bold text-violet-bright">
                {group.heading}
              </p>
              <ul className="mt-3 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-fg-soft hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tight strip, per the comp — ~14px of air each side of the line. */}
      <p className="py-3.5 text-center text-sm font-semibold text-white">
        © {new Date().getFullYear()} {site.company}. All rights reserved.
      </p>
    </footer>
  );
}
