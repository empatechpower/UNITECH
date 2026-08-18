'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import {
  categoryLabels,
  resourceArticles,
  type ResourceCategoryKey,
} from '@/data/resources';

type Filter = ResourceCategoryKey | 'all';

/**
 * The whole editorial library, filtered by category. This replaced the separate
 * Resources index, so it carries every article rather than a selection.
 *
 * Unfiltered, the lead takes two of the eight grid slots so seven articles fill
 * the grid exactly. Filtered views simply carry fewer cards.
 */
export default function InsightsPanel({
  locale,
  title,
  filterAllLabel,
  readSuffix,
}: {
  locale: Locale;
  title: string;
  filterAllLabel: string;
  readSuffix: string;
}) {
  const [filter, setFilter] = useState<Filter>('all');

  const categories = useMemo(() => {
    const used = new Set(resourceArticles.map((a) => a.category));
    return (Object.keys(categoryLabels) as ResourceCategoryKey[]).filter((c) => used.has(c));
  }, []);

  const articles = useMemo(
    () =>
      filter === 'all'
        ? resourceArticles
        : resourceArticles.filter((a) => a.category === filter),
    [filter]
  );

  return (
    <div className="panel-body flex flex-col">
      <div className="screen-pad flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 lg:py-3.5">
        <h2 className="screen-display text-[clamp(1.2rem,2.2vw,1.6rem)]">{title}</h2>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
          <button
            type="button"
            onClick={() => setFilter('all')}
            data-active={filter === 'all'}
            className="ctl-state whitespace-nowrap px-2.5"
          >
            {filterAllLabel}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              data-active={filter === c}
              className="ctl-state whitespace-nowrap px-2.5"
            >
              {categoryLabels[c][locale] ?? categoryLabels[c].en}
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-1 gap-px rule-t bg-rule sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {articles.map((a, i) => {
          const copy = a[locale] ?? a.en;
          const lead = filter === 'all' && i === 0;
          return (
            <Link
              key={a.slug}
              href={`/${locale}/resources/${a.slug}`}
              className={`group flex min-h-0 flex-col bg-ground ${lead ? 'sm:col-span-2' : ''}`}
            >
              <div className="relative min-h-[110px] flex-1 overflow-hidden">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes={
                    lead
                      ? '(max-width: 640px) 100vw, 50vw'
                      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                  }
                  className="photo-grade object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex h-[100px] shrink-0 flex-col justify-start p-4 lg:h-[108px] lg:p-5">
                <p className="spec-figure text-[10px] uppercase tracking-[0.16em] text-graphite">
                  {categoryLabels[a.category][locale] ?? categoryLabels[a.category].en}
                  <span className="mx-2 text-rule-strong">/</span>
                  {a.readTime} {readSuffix}
                </p>
                <h3
                  className={`mt-1.5 line-clamp-2 font-ui font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent ${
                    lead ? 'text-base lg:text-lg' : 'text-[14px]'
                  }`}
                >
                  {copy.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
