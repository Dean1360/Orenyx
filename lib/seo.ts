import type { Metadata } from 'next';
import { site } from '@/content/site';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /**
   * Exact <title> when the Builder Packet specifies one, e.g.
   * "API Docs — Orenyx AI Engine™". Overrides the `title — site.name` default.
   * Keep these ≤60 characters, per the packet's SEO table.
   */
  titleTag?: string;
  noIndex?: boolean;
};

/** One place to build per-page metadata so titles and OG tags never drift. */
export function pageMeta({
  title,
  description,
  path,
  titleTag,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = titleTag ?? (path === '/' ? site.name : `${title} — ${site.name}`);

  return {
    /*
      `absolute` matters. The root layout declares a title template of
      "%s — Orenyx AI Engine™"; without this, every page rendered as
      "About — Orenyx AI Engine™ — Orenyx AI Engine™" and blew past the 60-char
      budget the packet sets for title tags.
    */
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: 'website',
      // PLACEHOLDER — client has not supplied an Open Graph share image.
      images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
