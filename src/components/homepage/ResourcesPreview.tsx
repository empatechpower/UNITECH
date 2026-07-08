'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { resourceArticles, categoryLabels } from '@/data/resources';

interface ResourcesPreviewProps {
  locale: string;
  dict: {
    resources_eyebrow: string;
    resources_title: string;
    resources_cta: string;
  };
  readSuffix: string;
}

export default function ResourcesPreview({ locale, dict, readSuffix }: ResourcesPreviewProps) {
  const lang: 'en' | 'zh' = locale === 'zh' ? 'zh' : 'en';
  const cards = resourceArticles.slice(0, 3);

  return (
    <section className="relative bg-paper font-ui py-20 md:py-28">
      <div className="section-padding max-w-[1440px] mx-auto mb-10 md:mb-14 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-5">{dict.resources_eyebrow}</p>
          <h2 className="editorial-heading text-3xl sm:text-5xl md:text-6xl">{dict.resources_title}</h2>
        </div>
        <a
          href={`/${locale}/resources`}
          className="hidden md:inline-flex items-center gap-2 text-ink text-xs tracking-[0.2em] uppercase font-semibold shrink-0 hover:text-accent transition-colors duration-300"
        >
          {dict.resources_cta} →
        </a>
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid section-padding max-w-[1440px] mx-auto grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <ResourceCard key={c.slug} article={c} lang={lang} locale={locale} readSuffix={readSuffix} index={i} />
        ))}
      </div>

      {/* Mobile: swipeable carousel */}
      <div className="md:hidden section-padding">
        <Carousel opts={{ align: 'start' }}>
          <CarouselContent>
            {cards.map((c, i) => (
              <CarouselItem key={c.slug} className="basis-[80%]">
                <ResourceCard article={c} lang={lang} locale={locale} readSuffix={readSuffix} index={i} mobile />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="section-padding max-w-[1440px] mx-auto mt-10 md:hidden">
        <a
          href={`/${locale}/resources`}
          className="inline-flex items-center gap-2 text-ink text-xs tracking-[0.2em] uppercase font-semibold"
        >
          {dict.resources_cta} →
        </a>
      </div>
    </section>
  );
}

function ResourceCard({
  article,
  lang,
  locale,
  readSuffix,
  index,
  mobile,
}: {
  article: (typeof resourceArticles)[number];
  lang: 'en' | 'zh';
  locale: string;
  readSuffix: string;
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.a
      href={`/${locale}/resources/${article.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: mobile ? 0 : index * 0.1 }}
      className="group block"
    >
      <div className="relative aspect-[4/3] mb-5 overflow-hidden">
        <Image
          src={article.image}
          alt={article[lang].title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 80vw"
        />
      </div>
      <div className="flex items-center gap-3 mb-2 text-[11px] tracking-[0.15em] uppercase text-accent font-semibold">
        <span>{categoryLabels[article.category][lang]}</span>
        <span className="text-graphite">·</span>
        <span className="text-graphite normal-case tracking-normal font-normal">
          {article.readTime} {readSuffix}
        </span>
      </div>
      <h3 className="font-editorial text-xl text-ink leading-snug tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
        {article[lang].title}
      </h3>
    </motion.a>
  );
}
