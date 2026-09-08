import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { INDUSTRY_THEME_COOKIE } from '@/lib/industry-theme-types';
import { IndustryProvider } from '@/components/IndustryProvider';
import SiteNav from '@/components/SiteNav';
import { verticals } from '@/data/verticals';
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

/**
 * Without this, `[locale]` matched anything with a dot in it that the middleware
 * had waved through: /robots.txt, /sitemap.xml and /llms.txt all resolved here,
 * failed `isValidLocale`, silently fell back to English and returned the
 * homepage with a 200. Every such path was a duplicate of the home screen, and
 * crawlers asking for robots.txt were handed HTML.
 */
export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  /* Not a silent fallback to English. Every request that reaches this layout
     with an unknown locale is a URL that does not exist, and answering it with
     the English homepage at 200 is what turned /llms.txt, /foo.xml and every
     other dotted path the middleware waves through into a duplicate of the
     home screen. `dynamicParams = false` above states the same intent to the
     build; this enforces it at request time, which is what actually holds. */
  if (!isValidLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
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
            pathwaySlugs={[verticals.industrial.slug, verticals.green.slug]}
          />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          <Footer locale={locale} footer={dict.footer} />
        </IndustryProvider>
      </body>
    </html>
  );
}
