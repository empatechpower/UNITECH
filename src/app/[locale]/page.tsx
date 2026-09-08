import { Suspense } from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import ScreenDeck from '@/components/screen/ScreenDeck';
import HomePanel from '@/components/homepage/panels/HomePanel';
import InsightsPanel from '@/components/homepage/panels/InsightsPanel';
import { verticals } from '@/data/verticals';

/* The home screen's `?view=` states are states of this URL, not URLs of their
   own, so they all canonicalise here. Capabilities and Insights get their own
   identity from their own routes, not from a query string. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const { seo } = await getDictionary(locale);
  return buildMetadata({
    locale,
    path: '',
    title: seo.home_title,
    description: seo.home_description,
    bareTitle: true,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);
  const t = dict.homepage;

  /* Panel ids and order must match the `states` list in the layout, which
     renders the selector for them as the site navigation.

     Capabilities used to be a third panel here. It is a pair of real routes
     now, because as a `?view=` state it was one URL to a crawler and rendered
     only whichever pathway the cookie held, which left Green Manufacturing's
     sectors out of every crawl. Old `?view=capabilities` links are redirected
     by the middleware. */
  const panels = [
    {
      id: 'home',
      content: (
        <HomePanel
          locale={locale}
          dict={t}
          pathwayHrefs={{
            industrial: `/${locale}/${verticals.industrial.slug}`,
            green: `/${locale}/${verticals.green.slug}`,
          }}
        />
      ),
    },
    {
      id: 'insights',
      content: (
        <InsightsPanel
          locale={locale}
          title={t.resources_title}
          filterAllLabel={dict.resources.filter_all}
          readSuffix={dict.resources.read_suffix}
        />
      ),
    },
  ];

  return (
    <Screen>
      <Suspense fallback={null}>
        <ScreenDeck panels={panels} />
      </Suspense>
    </Screen>
  );
}
