import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import OEMPageClient from './OEMPageClient';

export default async function OEMProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);

  return <OEMPageClient dict={dict} locale={locale} />;
}
