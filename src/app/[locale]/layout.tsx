import { cookies } from 'next/headers';
import { Fraunces, Archivo } from 'next/font/google';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { INDUSTRY_THEME_COOKIE } from '@/lib/industry-theme-types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);
  const cookieStore = await cookies();
  const industry = cookieStore.get(INDUSTRY_THEME_COOKIE)?.value === 'green' ? 'green' : 'industrial';

  return (
    <html lang={locale} data-industry={industry} className={`${fraunces.variable} ${archivo.variable}`}>
      <body className="antialiased">
        <Header locale={locale} nav={dict.nav} />
        <main className="min-h-screen">{children}</main>
        <Footer locale={locale} nav={dict.nav} footer={dict.footer} common={dict.common} industry={industry} />
      </body>
    </html>
  );
}
