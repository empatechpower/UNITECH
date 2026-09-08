import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import ContactScreen from '@/components/contact/ContactScreen';

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
    path: '/contact-us',
    title: seo.contact_title,
    description: seo.contact_description,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);

  return (
    <Screen>
      <ContactScreen locale={locale} dict={dict.contact} />
    </Screen>
  );
}
