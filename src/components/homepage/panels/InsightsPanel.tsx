import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { categoryLabels, resourceArticles } from '@/data/resources';

/**
 * Every article, not a selection: eight grid slots for seven pieces, with the
 * lead taking two, so the grid fills exactly at each breakpoint. The card foot
 * is a fixed height so image bottoms line up across a row regardless of how
 * long a title runs.
 */
export default function InsightsPanel({
  locale,
  dict,
  readSuffix,
}: {
  locale: Locale;
  dict: Record<string, string>;
  readSuffix: string;
}) {
  return (
    <div className="panel-body flex flex-col">
      <div className="screen-pad flex shrink-0 flex-wrap items-baseline justify-between gap-4 py-4 lg:py-5">
        <h2 className="screen-display text-[clamp(1.3rem,2.6vw,1.9rem)]">
          {dict.resources_title}
        </h2>
        <Link
          href={`/${locale}/resources`}
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-graphite underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          {dict.resources_cta}
        </Link>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {resourceArticles.map((a, i) => {
          const copy = a[locale] ?? a.en;
          const lead = i === 0;
          return (
            <Link
              key={a.slug}
              href={`/${locale}/resources/${a.slug}`}
              className={`group flex min-h-0 flex-col bg-ground ${lead ? 'sm:col-span-2' : ''}`}
            >
              <div className="relative min-h-[120px] flex-1 overflow-hidden">
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
              <div className="flex h-[104px] shrink-0 flex-col justify-start p-4 lg:h-[112px] lg:p-5">
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
