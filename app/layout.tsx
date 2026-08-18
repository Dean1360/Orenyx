import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteLoader } from '@/components/site-loader';
import { site } from '@/content/site';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description:
    'Power Orenyx Voice Dispatch, Orenyx Dispatch, Orenyx Engine, Orenyx Payment, and your own systems with one unified AI infrastructure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Without JS the splash can never dismiss itself — never trap the page. */}
        <noscript>
          <style>{`.site-loader{display:none}`}</style>
        </noscript>
        <SiteLoader />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
