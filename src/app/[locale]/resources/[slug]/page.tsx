import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { resourceArticles, categoryLabels, getResourceArticle } from '@/data/resources';

export async function generateStaticParams() {
  return resourceArticles.map((a) => ({ slug: a.slug }));
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const lang: 'en' | 'zh' = locale === 'zh' ? 'zh' : 'en';
  const dict = await getDictionary(locale);
  const t = dict.resources;

  const article = getResourceArticle(slug);
  if (!article) notFound();

  const related = resourceArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article className="relative bg-warm-white font-ui">
        <div className="section-padding max-w-[900px] mx-auto pt-32 md:pt-40 pb-10 md:pb-14">
          <Link
            href={`/${locale}/resources`}
            className="inline-flex items-center gap-2 text-graphite text-xs tracking-[0.15em] uppercase font-semibold hover:text-accent transition-colors duration-300 mb-8"
          >
            ← {t.back_link}
          </Link>

          <div className="flex items-center gap-3 mb-6 text-[11px] tracking-[0.15em] uppercase font-semibold">
            <span className="text-accent">{categoryLabels[article.category][lang]}</span>
            <span className="text-graphite">·</span>
            <span className="text-graphite normal-case tracking-normal font-normal">
              {article.readTime} {t.read_suffix}
            </span>
          </div>

          <h1 className="editorial-heading text-3xl sm:text-5xl md:text-6xl mb-6 leading-[1.05]">
            {article[lang].title}
          </h1>
          <p className="text-graphite text-lg leading-relaxed max-w-2xl">{article[lang].excerpt}</p>
        </div>

        <div className="section-padding max-w-[1200px] mx-auto mb-14 md:mb-20">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={article.image}
              alt={article[lang].title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1200px) 1200px, 100vw"
            />
          </div>
        </div>

        <div className="section-padding max-w-[720px] mx-auto pb-24 md:pb-32">
          {article[lang].body.map((paragraph, i) => (
            <p key={i} className="text-ink/90 text-base md:text-lg leading-loose mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* CTA */}
      <section className="relative bg-ink font-ui py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-technical opacity-[0.08]" />
        <div className="absolute inset-0 mesh-glow opacity-60" />
        <div className="relative z-10 text-center section-padding">
          <h2 className="editorial-heading !text-white text-2xl sm:text-4xl md:text-5xl mb-10">
            {t.article_cta_title}
          </h2>
          <Link
            href={`/${locale}/contact-us`}
            className="btn-editorial !bg-warm-white !text-ink hover:!bg-accent hover:!text-warm-white"
          >
            {t.article_cta_button}
          </Link>
        </div>
      </section>

      {/* Related articles */}
      <section className="relative bg-warm-white font-ui py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <p className="eyebrow mb-10">{t.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6">
            {related.map((a) => (
              <Link key={a.slug} href={`/${locale}/resources/${a.slug}`} className="group block">
                <div className="relative aspect-[4/3] mb-5 overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a[lang].title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="flex items-center gap-3 mb-2 text-[11px] tracking-[0.15em] uppercase text-accent font-semibold">
                  <span>{categoryLabels[a.category][lang]}</span>
                </div>
                <h3 className="font-editorial text-lg text-ink leading-snug tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
                  {a[lang].title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
