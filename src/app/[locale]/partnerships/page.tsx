import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import VerticalScreen from '@/components/verticals/VerticalScreen';
import { verticals } from '@/data/verticals';

const vertical = verticals.partnerships;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  return {
    title: `${vertical.title[locale]} | UNITECH`,
    description: vertical.tagline[locale],
  };
}

/**
 * One of the two cross-cutting verticals. It carries the union of the sectors
 * from both pathways, so it deliberately does not paint a ground: the visitor
 * keeps whichever one they already chose.
 */
export default async function PartnershipsPage({
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
