import { cookies } from 'next/headers';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { INDUSTRY_THEME_COOKIE } from '@/lib/industry-theme-types';
import { IndustryProvider } from '@/components/IndustryProvider';
import SiteNav from '@/components/SiteNav';
import Footer from '@/components/Footer';

/* One family carries display, UI and specs. IBM Plex was commissioned as an
   engineering typeface, which is the register this site needs. Traditional
   Chinese resolves through the system CJK stack declared in globals.css. */
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
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
  const industry =
    cookieStore.get(INDUSTRY_THEME_COOKIE)?.value === 'green' ? 'green' : 'industrial';

  /* The home screen's states double as the site's primary navigation, so the
     list lives here rather than in the page. Order defines the nav order, and
     the first entry is the default state at the bare `/` URL.

     Capabilities is deliberately absent: it is reached by choosing a pathway
     on the Home screen, not by picking it off the nav. */
  const states = [
    { id: 'home', label: dict.homepage.deck_overview },
    { id: 'insights', label: dict.homepage.deck_insights },
  ];

  return (
    <html
      lang={locale === 'zh' ? 'zh-TW' : 'en'}
      data-industry={industry}
      className={`${plexSans.variable} ${plexMono.variable}`}
    >
      {/*
        A flex column of exactly one viewport. Screen-mode pages fill `main`
        and never scroll; pages still awaiting migration scroll the document
        as before, because <Screen> is what opts a page into the fixed shell.
      */}
      <body className="flex min-h-[100dvh] flex-col bg-ground font-ui antialiased">
        <IndustryProvider initialIndustry={industry}>
          <SiteNav
            locale={locale}
            nav={dict.nav}
            states={states}
          />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          <Footer locale={locale} footer={dict.footer} />
        </IndustryProvider>
      </body>
    </html>
  );
}
