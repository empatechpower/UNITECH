import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';
import { INDUSTRY_THEME_COOKIE, type IndustryTheme } from '@/lib/industry-theme-types';
import { pathwayRoutes, pathwayVerticals } from '@/data/verticals';

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
