'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { setIndustryTheme } from '@/lib/industry-theme';
import type { IndustryTheme } from '@/lib/industry-theme-types';

interface IndustryContextValue {
  industry: IndustryTheme;
  setIndustry: (theme: IndustryTheme) => void;
  isPending: boolean;
}

const IndustryContext = createContext<IndustryContextValue | null>(null);

/**
 * Holds the chosen pathway client-side so every panel retints and re-populates
 * in the same frame. The cookie write still happens, but nothing waits on it:
 * a server round-trip to change which capabilities are listed would read as lag
 * on what is meant to feel like a state change.
 *
 * Seeded from the cookie during SSR, so first paint is already correct.
 */
export function IndustryProvider({
  initialIndustry,
  children,
}: {
  initialIndustry: IndustryTheme;
  children: React.ReactNode;
}) {
  const [industry, setLocal] = useState<IndustryTheme>(initialIndustry);
  const [isPending, startTransition] = useTransition();

  const setIndustry = useCallback((theme: IndustryTheme) => {
    setLocal(theme);
    document.documentElement.dataset.industry = theme;
    startTransition(async () => {
      await setIndustryTheme(theme);
    });
  }, []);

  const value = useMemo(
    () => ({ industry, setIndustry, isPending }),
    [industry, setIndustry, isPending]
  );

  return <IndustryContext.Provider value={value}>{children}</IndustryContext.Provider>;
}

export function useIndustry() {
  const ctx = useContext(IndustryContext);
  if (!ctx) throw new Error('useIndustry must be used inside IndustryProvider');
  return ctx;
}
