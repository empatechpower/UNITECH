'use client';

import Image from 'next/image';
import { useIndustry } from '@/components/IndustryProvider';
import type { IndustryTheme } from '@/lib/industry-theme-types';

/**
 * The fork. Choosing here does not just tint an accent: it swaps the ground,
 * the texture and the photographic grade for the whole site, and persists.
 */
export default function PathwaysPanel({ dict }: { dict: Record<string, string> }) {
  const { industry: active, setIndustry: choose } = useIndustry();

  const options: {
    key: IndustryTheme;
    title: string;
    body: string;
    image: string;
  }[] = [
    {
      key: 'industrial',
      title: dict.selector_industrial,
      body: dict.selector_industrial_desc,
      image: '/images/homepage-editorial/selector-industrial.png',
    },
    {
      key: 'green',
      title: dict.selector_green,
      body: dict.selector_green_desc,
      image: '/images/homepage-editorial/selector-green.png',
    },
  ];

  return (
    <div className="panel-body flex flex-col">
      <div className="screen-pad shrink-0 py-6 lg:py-8">
        <h2 className="screen-display max-w-[18ch] text-[clamp(1.5rem,3.4vw,2.75rem)]">
          {dict.selector_question}
        </h2>
      </div>

      <div className="grid min-h-0 flex-1 rule-t lg:grid-cols-2">
        {options.map((o, i) => (
          <button
            key={o.key}
            type="button"
            onClick={() => choose(o.key)}
            aria-pressed={active === o.key}
            className={`group relative min-h-[200px] overflow-hidden text-left transition-opacity duration-300 lg:min-h-0 ${
              i > 0 ? 'rule-t lg:border-t-0 lg:rule-l' : ''
            } ${active === o.key ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
          >
            <Image
              src={o.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="photo-grade object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />

            <span className="relative flex h-full flex-col justify-end p-6 lg:p-8">
              <span className="block font-ui text-xl font-semibold tracking-tight text-white lg:text-2xl">
                {o.title}
              </span>
              <span className="mt-2 block max-w-[42ch] font-ui text-[13px] leading-snug text-white/75">
                {o.body}
              </span>
              <span
                className={`mt-4 inline-flex w-fit items-center border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                  active === o.key
                    ? 'border-white bg-white text-ink'
                    : 'border-white/45 text-white group-hover:border-white'
                }`}
              >
                {dict.selector_cta}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
