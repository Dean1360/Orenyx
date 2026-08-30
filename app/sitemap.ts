import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

const routes = [
  '/',
  '/features',
  '/pricing',
  '/use-cases',
  '/developers',
  '/developers/authentication',
  '/developers/changelog',
  '/case-study',
  '/careers',
  '/security',
  '/about',
  '/contact',
  '/faq',
  '/status',
  '/legal/terms',
  '/legal/privacy',
  '/legal/refund',
  '/legal/dpa',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
