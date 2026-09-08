'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { useIndustry } from '@/components/IndustryProvider';
import type { IndustryTheme } from '@/lib/industry-theme-types';

/**
 * The landing screen and the fork in one. Column 1 carries the claim, column 2
 * the choice, and the rail beneath carries the evidence.
 *
 * Choosing a pathway does two things at once: it swaps the ground, texture,
 * accent and photographic grade for the whole site, and it moves the visitor
 * into that pathway's capabilities. Pushing rather than replacing the URL means
 * the back button returns here, which is the natural way out of a wrong turn.
 */
export default function HomePanel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Record<string, string>;
}) {
  const { industry: active, setIndustry } = useIndustry();
  const router = useRouter();

  const choose = (theme: IndustryTheme) => {
    setIndustry(theme);
    router.push(`/${locale}?view=capabilities`, { scroll: false });
  };

  const pathways: {
    key: IndustryTheme;
    title: string;
    desc: string;
    image: string;
  }[] = [
    {
      key: 'industrial',
      title: dict.selector_industrial,
      desc: dict.selector_industrial_desc,
      image: '/images/homepage-editorial/selector-industrial.png',
    },
    {
      key: 'green',
      title: dict.selector_green,
      desc: dict.selector_green_desc,
      image: '/images/homepage-editorial/selector-green.png',
    },
  ];

  const pillars = [
    { title: dict.advantage_precision_title, body: dict.advantage_precision_desc },
    { title: dict.advantage_innovation_title, body: dict.advantage_innovation_desc },
    { title: dict.advantage_reach_title, body: dict.advantage_reach_desc },
  ];

  return (
    <div className="panel-body flex flex-col">
      <div className="grid flex-1 lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="screen-pad flex flex-col justify-center py-10 lg:py-0 lg:pr-12">
          <h1 className="screen-display text-[clamp(2rem,4.6vw,3.75rem)]">
            {dict.hero_headline_1}
            <br />
            {dict.hero_headline_2}
          </h1>

          <p className="mt-6 max-w-[50ch] font-ui text-[15px] leading-relaxed text-graphite lg:text-base">
            {dict.hero_intro}
          </p>

          <div className="mt-8">
            <Link href={`/${locale}/contact-us`} className="ctl-solid">
              {dict.rfq_cta}
            </Link>
          </div>
        </div>

        {/* The fork. Two panels, one per pathway, stacked in the column the
            hero photograph used to occupy. */}
        <div className="flex min-h-0 flex-col rule-l">
          <p className="screen-pad shrink-0 rule-b py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite">
            {dict.selector_question}
          </p>

          {pathways.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => choose(p.key)}
              aria-current={active === p.key}
              className={`group relative min-h-[170px] flex-1 overflow-hidden text-left transition-opacity duration-300 lg:min-h-0 ${
                i > 0 ? 'rule-t' : ''
              } ${active === p.key ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
            >
              <Image
                src={p.image}
                alt=""
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="photo-grade object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/58 via-45% to-transparent" />

              <span className="relative flex h-full flex-col justify-end p-5 lg:p-6">
                <span className="flex items-center justify-between gap-4">
                  <span className="font-ui text-lg font-semibold tracking-tight text-white lg:text-xl">
                    {p.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[15px] text-white/70 transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-white"
                  >
                    &rarr;
                  </span>
                </span>
                <span className="mt-1.5 block max-w-[46ch] font-ui text-[12.5px] leading-snug text-white/85">
                  {p.desc}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Evidence rail. Three claims a buyer can check, not decoration. */}
      <div className="screen-pad grid shrink-0 rule-t sm:grid-cols-3">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className={`py-4 lg:py-5 ${i > 0 ? 'sm:rule-l sm:pl-6' : ''} ${
              i < pillars.length - 1 ? 'sm:pr-6' : ''
            }`}
          >
            <h2 className="font-ui text-[13px] font-semibold tracking-tight text-ink">
              {p.title}
            </h2>
            <p className="mt-1 font-ui text-[12px] leading-snug text-graphite">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
