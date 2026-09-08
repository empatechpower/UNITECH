import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { SITE_URL } from '@/lib/seo';

/**
 * Every indexable route, in both locales, each entry carrying the full set of
 * language alternates so the pair is declared here as well as in the page's
 * own hreflang.
 *
 * Two things are deliberately absent:
 *
 * - `/[locale]/resources`, which is a redirect to the Insights state.
 * - `/[locale]/resources/[slug]`, the seven articles. They are placeholder copy
 *   and currently carry `noindex`; a sitemap entry would contradict that. They
 *   go back in when the client supplies real material.
 *
 * The home screen's `?view=` state is not listed either. Insights is a state of
 * one URL, not a URL, and canonicalises to the home screen. Capabilities used
 * to be the same and is now the two pathway routes below.
 */
const ROUTES = [
  '',
  '/industrial-manufacturing',
  '/green-manufacturing',
  '/partnerships',
  '/part-supply',
  '/about-us',
  '/contact-us',
] as const;

/* The home screen is the entry point; the four verticals are the pages a
   procurement buyer arrives on from a search or an AI answer. */
const PRIORITY: Record<string, number> = {
  '': 1,
  '/industrial-manufacturing': 0.9,
  '/green-manufacturing': 0.9,
  '/partnerships': 0.9,
  '/part-supply': 0.9,
  '/about-us': 0.7,
  '/contact-us': 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    ROUTES.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: PRIORITY[path] ?? 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l === 'zh' ? 'zh-TW' : l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
