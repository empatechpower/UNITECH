import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';
import { INDUSTRY_THEME_COOKIE, type IndustryTheme } from '@/lib/industry-theme-types';
import { pathwayRoutes, pathwayVerticals } from '@/data/verticals';
import { identifyCrawler } from '@/lib/ai-crawlers';

/**
 * One structured line per AI crawler arrival, and nothing for human traffic.
 *
 * The site has no analytics, so without this there is no way to tell whether
 * the robots.txt policy did anything: whether the search crawlers we allowed
 * are actually arriving, which routes they take, and whether the two new
 * pathway routes get fetched at all. Counting only the bots in the shared
 * table keeps the log signal rather than noise.
 *
 * The prefix is there to be grepped. In Vercel's log viewer, filter on
 * "[ai-crawler]"; every line is self-contained JSON.
 *
 * Caveat worth knowing before reading a zero as bad news: runtime logs are
 * retained for a limited window and are not a durable store. Keeping a history
 * beyond that window needs a log drain, which is a dashboard setting rather
 * than anything this repo can configure.
 */
function logCrawler(request: NextRequest, pathname: string) {
  const crawler = identifyCrawler(request.headers.get('user-agent'));
  if (!crawler) return;
  console.log(
    `[ai-crawler] ${JSON.stringify({
      bot: crawler.agent,
      kind: crawler.kind,
      path: pathname,
      at: new Date().toISOString(),
    })}`
  );
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return;
  }

  logCrawler(request, pathname);

  const locale = locales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));

  if (!locale) {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const segment = pathname.slice(locale.length + 2).split('/')[0];

  /* Capabilities used to be a state of the home screen rather than a URL, which
     is exactly why Green Manufacturing was invisible: `?view=` is one page to a
     crawler, and the panel rendered whichever pathway the cookie held. Those
     links are public, so they resolve to the pathway the visitor already chose
     rather than breaking. */
  if (!segment && searchParams.get('view') === 'capabilities') {
    const theme = readTheme(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/${pathwayVerticals[theme].slug}`;
    url.search = '';
    return NextResponse.redirect(url);
  }

  /* Landing on a pathway route is itself a choice of ground, however the
     visitor got there: a deep link, a search result or an AI citation, none of
     which carry the cookie. Setting it here rather than on the client is what
     keeps first paint correct. The request cookie is mutated so this render
     reads the new value; the response cookie persists it for the next one. */
  const theme = pathwayRoutes[segment];
  if (theme && readTheme(request) !== theme) {
    request.cookies.set(INDUSTRY_THEME_COOKIE, theme);
    const response = NextResponse.next({ request });
    response.cookies.set(INDUSTRY_THEME_COOKIE, theme, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }
}

function readTheme(request: NextRequest): IndustryTheme {
  return request.cookies.get(INDUSTRY_THEME_COOKIE)?.value === 'green' ? 'green' : 'industrial';
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};
