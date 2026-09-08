import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import VerticalScreen from '@/components/verticals/VerticalScreen';
import { verticals } from '@/data/verticals';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, graph, verticalServiceSchema } from '@/lib/structured-data';

const vertical = verticals.industrial;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  return buildMetadata({
    locale,
    path: `/${vertical.slug}`,
    title: vertical.title[locale],
    description: vertical.tagline[locale],
  });
}

/**
 * One of the two pathway grounds, and one of the two routes added so that all
 * four verticals are addressable. Industrial Manufacturing previously rendered only as a
 * panel of the home screen behind `?view=capabilities`, which is one URL to a
 * crawler and showed whichever pathway the cookie held. Its ten sectors were at least reachable that way, being the cookie default.

 *
 * The ground is declared by the middleware, which sets the industry cookie when
 * a request lands here, so a visitor arriving from a search result or an AI
 * citation gets the right ground on first paint rather than a flash of the
 * other one.
 *
 * It is deliberately not in the nav: the pathway is chosen from the fork on
 * Home. "Change pathway" is the way back, so nobody deep-linking here is
 * stranded without knowing there is another world to see.
 */
export default async function IndustrialManufacturingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);

  return (
    <Screen>
      <JsonLd
        data={graph(
          verticalServiceSchema(locale, vertical),
          breadcrumbSchema(locale, dict.nav.home, [
            { name: vertical.title[locale], path: `/${vertical.slug}` },
          ])
        )}
      />
      <VerticalScreen
        locale={locale}
        vertical={vertical}
        rfqLabel={dict.homepage.rfq_cta}
        headerAction={
          <Link href={`/${locale}`} className="link-mono">
            &larr; {dict.homepage.change_pathway}
          </Link>
        }
      />
    </Screen>
  );
}
