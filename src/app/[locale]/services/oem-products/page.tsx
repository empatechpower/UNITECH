import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import ServiceScreen from '@/components/services/ServiceScreen';
import { getService } from '@/data/services';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);
  const service = getService('oem-products');
  if (!service) notFound();

  return (
    <Screen>
      <ServiceScreen
        locale={locale}
        service={service}
        dict={dict.oem}
        contactCta={dict.nav.contact}
      />
    </Screen>
  );
}
