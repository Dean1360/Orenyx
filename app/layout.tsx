import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { ChatWidget } from '@/components/chat-widget';
import { SiteFooter } from '@/components/site-footer';
import { SiteLoader } from '@/components/site-loader';
import { site } from '@/content/site';
import { LanguageProvider, LANG_BOOT_SCRIPT } from '@/lib/i18n/language';
import './globals.css';
import './other-companies-layout.css';

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
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
        {/* Google Ads tag (gtag.js) — measurement ID AW-18533902384 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18533902384" />
        <script dangerouslySetInnerHTML={{ __html: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-18533902384');" }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <LanguageProvider>
        {/* Without JS the splash can never dismiss itself — never trap the page. */}
        <noscript>
          <style>{`.site-loader{display:none}`}</style>
        </noscript>
        <SiteLoader />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <ChatWidget />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
