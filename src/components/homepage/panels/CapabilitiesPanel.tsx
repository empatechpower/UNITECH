'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { useIndustry } from '@/components/IndustryProvider';
import { pathwayVerticals } from '@/data/verticals';
import VerticalScreen from '@/components/verticals/VerticalScreen';

/**
 * The chosen pathway's vertical. Reached by choosing on the Home screen, never
 * from the nav, so it names the pathway it is showing and offers the way back:
 * a visitor deep-linking here otherwise has no way to tell which of the two
 * worlds they are looking at, or to leave it.
 *
 * The screen itself is VerticalScreen, shared with the two nav routes, because
 * all four verticals are the same shape in the client's source document.
 */
export default function CapabilitiesPanel({
  locale,
  changeLabel,
  rfqLabel,
}: {
  locale: Locale;
  changeLabel: string;
  rfqLabel: string;
}) {
  const { industry } = useIndustry();

  return (
    <VerticalScreen
      locale={locale}
      vertical={pathwayVerticals[industry]}
      rfqLabel={rfqLabel}
      headerAction={
        <Link href={`/${locale}`} scroll={false} className="link-mono">
          &larr; {changeLabel}
        </Link>
      }
    />
  );
}
