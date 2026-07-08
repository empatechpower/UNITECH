'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { resourceArticles, categoryLabels, type ResourceCategoryKey } from '@/data/resources';

interface ResourcesPageClientProps {
  locale: string;
  dict: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filter_all: string;
    read_suffix: string;
    featured_label: string;
  };
}

type Locale = 'en' | 'zh';

export default function ResourcesPageClient({ locale, dict }: ResourcesPageClientProps) {
  const lang: Locale = locale === 'zh' ? 'zh' : 'en';
  const [active, setActive] = useState<ResourceCategoryKey | 'all'>('all');

  const featured = resourceArticles[0];
  const rest = resourceArticles.slice(1);

  const filtered = useMemo(() => {
    if (active === 'all') return rest;
    return resourceArticles.filter((a) => a.category === active);
  }, [active, rest]);

  const categories: (ResourceCategoryKey | 'all')[] = [
    'all',
    'taiwan-manufacturing',
    'sustainability',
    'industry-insights',
    'case-studies',
    'whitepapers',
  ];

  return (
    <section className="relative bg-warm-white font-ui">
      {/* Header */}
      <div className="section-padding max-w-[1440px] mx-auto pt-32 md:pt-40 pb-14 md:pb-16">
        <p className="eyebrow mb-6">{dict.eyebrow}</p>
        <h1 className="editorial-heading text-4xl sm:text-6xl md:text-7xl max-w-3xl mb-6">{dict.title}</h1>
        <p className="text-graphite text-base md:text-lg max-w-xl leading-relaxed">{dict.subtitle}</p>
      </div>

      {/* Featured article — only in "all" view */}
      {active === 'all' && (
        <div className="section-padding max-w-[1440px] mx-auto mb-14 md:mb-20">
          <Link href={`/${locale}/resources/${featured.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              <div className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden order-1">
                <Image
                  src={featured.image}
                  alt={featured[lang].title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="order-2">
                <div className="flex items-center gap-3 mb-4 text-[11px] tracking-[0.15em] uppercase font-semibold">
                  <span className="text-accent">{dict.featured_label}</span>
                  <span className="text-graphite">·</span>
                  <span className="text-graphite">{categoryLabels[featured.category][lang]}</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-ink leading-snug tracking-[-0.01em] mb-4 group-hover:text-accent transition-colors duration-300">
                  {featured[lang].title}
                </h2>
                <p className="text-graphite text-sm md:text-base leading-relaxed mb-5 max-w-lg">
                  {featured[lang].excerpt}
                </p>
                <span className="text-graphite text-xs tracking-wide">
                  {featured.readTime} {dict.read_suffix}
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Category filter */}
      <div className="section-padding max-w-[1440px] mx-auto mb-10 md:mb-12">
        <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-semibold border transition-colors duration-300 ${
                active === cat
                  ? 'bg-accent text-warm-white border-accent'
                  : 'bg-transparent text-graphite border-concrete hover:border-ink/30 hover:text-ink'
              }`}
            >
              {cat === 'all' ? dict.filter_all : categoryLabels[cat][lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Magazine grid */}
      <div className="section-padding max-w-[1440px] mx-auto pb-20 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6"
          >
            {filtered.map((article) => (
              <Link key={article.slug} href={`/${locale}/resources/${article.slug}`} className="group block">
                <div className="relative aspect-[4/3] mb-5 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article[lang].title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex items-center gap-3 mb-2 text-[11px] tracking-[0.15em] uppercase text-accent font-semibold">
                  <span>{categoryLabels[article.category][lang]}</span>
                  <span className="text-graphite">·</span>
                  <span className="text-graphite normal-case tracking-normal font-normal">
                    {article.readTime} {dict.read_suffix}
                  </span>
                </div>
                <h3 className="font-editorial text-xl text-ink leading-snug tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
                  {article[lang].title}
                </h3>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
