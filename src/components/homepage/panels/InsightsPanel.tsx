import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { categoryLabels, resourceArticles } from '@/data/resources';

export default function InsightsPanel({
  locale,
  dict,
  readSuffix,
}: {
  locale: Locale;
  dict: Record<string, string>;
  readSuffix: string;
}) {
  const articles = resourceArticles.slice(0, 3);

  return (
    <div className="panel-body flex flex-col">
      <div className="screen-pad flex shrink-0 flex-wrap items-baseline justify-between gap-4 py-5 lg:py-6">
        <h2 className="screen-display text-[clamp(1.4rem,3vw,2.25rem)]">
          {dict.resources_title}
        </h2>
        <Link
          href={`/${locale}/resources`}
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-graphite underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          {dict.resources_cta}
        </Link>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-px bg-rule md:grid-cols-3">
        {articles.map((a) => {
          const copy = a[locale] ?? a.en;
          return (
            <Link
              key={a.slug}
              href={`/${locale}/resources/${a.slug}`}
              className="group flex min-h-0 flex-col bg-ground"
            >
              <div className="relative min-h-[150px] flex-1">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="photo-grade object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex h-[118px] shrink-0 flex-col justify-start p-5 lg:h-[128px] lg:p-6">
                <p className="spec-figure text-[10px] uppercase tracking-[0.16em] text-graphite">
                  {categoryLabels[a.category][locale] ?? categoryLabels[a.category].en}
                  <span className="mx-2 text-rule-strong">/</span>
                  {a.readTime} {readSuffix}
                </p>
                <h3 className="mt-2 line-clamp-2 font-ui text-base font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
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
