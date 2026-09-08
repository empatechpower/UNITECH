import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import VerticalScreen from '@/components/verticals/VerticalScreen';
import { verticals } from '@/data/verticals';
import { buildMetadata } from '@/lib/seo';

const vertical = verticals["part-supply"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  return buildMetadata({
    locale,
    path: '/part-supply',
    title: vertical.title[locale],
    description: vertical.tagline[locale],
  });
}

/**
 * One of the two cross-cutting verticals. Part supply serves buyers on either
 * pathway, so it deliberately does not paint a ground: the visitor keeps
 * whichever one they already chose.
 */
export default async function PartSupplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);

  return (
    <Screen>
      <VerticalScreen locale={locale} vertical={vertical} rfqLabel={dict.homepage.rfq_cta} />
    </Screen>
  );
}
