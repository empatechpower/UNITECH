'use client';

import { useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { setIndustryTheme } from '@/lib/industry-theme';
import type { IndustryTheme } from '@/lib/industry-theme-types';

export function useIndustryTheme() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const selectIndustry = useCallback(
    (theme: IndustryTheme) => {
      document.documentElement.dataset.industry = theme;
      startTransition(async () => {
        await setIndustryTheme(theme);
        router.refresh();
      });
    },
    [router]
  );

  return { selectIndustry, isPending };
}
