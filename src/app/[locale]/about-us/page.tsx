import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import AboutScreen from '@/components/about/AboutScreen';

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
    path: '/about-us',
    title: seo.about_title,
    description: seo.about_description,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);

  return (
    <Screen>
      <AboutScreen locale={locale} dict={dict.about} />
    </Screen>
  );
}
