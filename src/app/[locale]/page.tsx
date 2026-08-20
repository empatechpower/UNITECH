import { Suspense } from 'react';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import ScreenDeck from '@/components/screen/ScreenDeck';
import HomePanel from '@/components/homepage/panels/HomePanel';
import CapabilitiesPanel from '@/components/homepage/panels/CapabilitiesPanel';
import InsightsPanel from '@/components/homepage/panels/InsightsPanel';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);
  const t = dict.homepage;

  /* Panel ids and order must match the `states` list in the layout, which
     renders the selector for them as the site navigation. */
  const panels = [
    { id: 'home', content: <HomePanel locale={locale} dict={t} /> },
    {
      id: 'capabilities',
      content: (
        <CapabilitiesPanel
          locale={locale}
          pathwayLabels={{
            industrial: t.selector_industrial,
            green: t.selector_green,
          }}
          changeLabel={t.change_pathway}
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
