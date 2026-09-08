import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';

/**
 * The canonical origin. Everything machine-readable on this site resolves
 * against it: canonicals, hreflang, the sitemap and the Organization schema.
 *
 * It is deliberately the client's own domain rather than the Vercel URL the
 * site currently deploys to. Citations and authority accrue to a hostname, so
 * pointing them anywhere else means redoing the work at launch and stranding
 * whatever has been earned in the meantime.
 */
export const SITE_URL = 'https://umtt.com.tw';

export const SITE_NAME = 'UNITECH Manufacturing Technologies Taiwan';

/** BCP 47 tags for `hreflang`, keyed by our internal locale segment. */
const HREFLANG: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-TW',
};

/** Open Graph locale identifiers, which use underscores rather than hyphens. */
const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  zh: 'zh_TW',
};

/**
 * `path` is the route below the locale segment, with a leading slash or empty
 * for the home screen: '', '/about-us', '/resources/some-slug'.
 */
export interface SeoInput {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Suppresses the `| UNITECH` suffix, for titles that already carry the brand. */
  bareTitle?: boolean;
  /** Keeps a page out of search and out of AI answers. */
  noindex?: boolean;
  type?: 'website' | 'article';
}

/**
 * Builds a page's metadata with its canonical and its full hreflang set.
 *
 * Every route must go through this. Before it existed, twelve of the site's
 * URLs shared the root layout's single title and description, including all
 * seven articles and the whole of /zh, which was titled in English. Nothing
 * carried a canonical, so the query-string states on the home screen were
 * indistinguishable from the home screen itself.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  bareTitle = false,
  noindex = false,
  type = 'website',
}: SeoInput): Metadata {
  const url = `/${locale}${path}`;

  /* hreflang must list every locale including this one, and x-default points
     at English as the entry point for an unmatched language. */
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[HREFLANG[l]] = `/${l}${path}`;
  }
  languages['x-default'] = `/${locales[0]}${path}`;

  return {
    title: bareTitle ? title : `${title} | UNITECH`,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...(noindex
      ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
      : {}),
  };
}
