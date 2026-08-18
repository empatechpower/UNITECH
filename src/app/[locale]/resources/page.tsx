import { redirect } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

/**
 * The Resources index is gone; the Insights state on the home screen carries
 * the full article library and its category filter now.
 *
 * This stays as a redirect rather than a 404 because the URL is already public
 * and every article still lives beneath it at /resources/[slug].
 */
export default async function ResourcesIndexRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  redirect(`/${locale}?view=insights`);
}
