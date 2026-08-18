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
 * Category selection is a state change, same as everywhere else on the site.
 * With no filter applied the lead article takes two slots so the grid fills
 * exactly; once filtered the grid simply carries fewer items.
 */
export default function ResourcesScreen({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Record<string, string>;
}) {
  const [filter, setFilter] = useState<Filter>('all');

  const categories = useMemo(() => {
    const used = new Set(resourceArticles.map((a) => a.category));
    return (Object.keys(categoryLabels) as ResourceCategoryKey[]).filter((c) => used.has(c));
  }, []);

  const articles = useMemo(
    () => (filter === 'all' ? resourceArticles : resourceArticles.filter((a) => a.category === filter)),
    [filter]
  );

  return (
    <div className="panel-body flex flex-col">
      <div className="screen-pad flex shrink-0 flex-wrap items-center gap-x-1 gap-y-2 rule-b py-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          data-active={filter === 'all'}
          className="ctl-state whitespace-nowrap px-3"
        >
          {dict.filter_all}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            data-active={filter === c}
            className="ctl-state whitespace-nowrap px-3"
          >
            {categoryLabels[c][locale] ?? categoryLabels[c].en}
          </button>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {articles.map((a, i) => {
          const copy = a[locale] ?? a.en;
          const lead = filter === 'all' && i === 0;
          return (
            <Link
              key={a.slug}
              href={`/${locale}/resources/${a.slug}`}
              className={`group relative flex min-h-[160px] flex-col justify-end overflow-hidden bg-ground ${
                lead ? 'sm:col-span-2' : ''
              }`}
            >
              <Image
                src={a.image}
                alt=""
                fill
                sizes={lead ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 100vw, 25vw'}
                className="photo-grade object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/5" />
              <span className="relative p-5 lg:p-6">
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                  {categoryLabels[a.category][locale] ?? categoryLabels[a.category].en}
                  <span className="mx-2">/</span>
                  {a.readTime} {dict.read_suffix}
                </span>
                <span
                  className={`mt-2 block font-ui font-semibold leading-snug tracking-tight text-white ${
                    lead ? 'text-xl lg:text-2xl' : 'line-clamp-3 text-[15px]'
                  }`}
                >
                  {copy.title}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
