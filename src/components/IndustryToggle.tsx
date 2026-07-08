'use client';

import { useState } from 'react';
import { useIndustryTheme } from '@/hooks/useIndustryTheme';
import type { IndustryTheme } from '@/lib/industry-theme-types';

export default function IndustryToggle({
  initialIndustry,
  labels,
}: {
  initialIndustry: IndustryTheme;
  labels: { industrial: string; green: string };
}) {
  const [active, setActive] = useState<IndustryTheme>(initialIndustry);
  const { selectIndustry } = useIndustryTheme();

  const handleSelect = (theme: IndustryTheme) => {
    setActive(theme);
    selectIndustry(theme);
  };

  return (
    <div className="inline-flex items-center border border-ink/15 p-1 gap-1">
      {(['industrial', 'green'] as const).map((theme) => (
        <button
          key={theme}
          onClick={() => handleSelect(theme)}
          className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-semibold transition-colors duration-300 ${
            active === theme ? 'bg-accent text-warm-white' : 'text-graphite hover:text-ink'
          }`}
        >
          {theme === 'industrial' ? labels.industrial : labels.green}
        </button>
      ))}
    </div>
  );
}
