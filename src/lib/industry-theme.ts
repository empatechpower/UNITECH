'use server';

import { cookies } from 'next/headers';
import { INDUSTRY_THEME_COOKIE, type IndustryTheme } from './industry-theme-types';

export async function setIndustryTheme(theme: IndustryTheme) {
  const cookieStore = await cookies();
  cookieStore.set(INDUSTRY_THEME_COOKIE, theme, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });
}
