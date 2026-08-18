import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import { resourceArticles, categoryLabels, getResourceArticle } from '@/data/resources';

export async function generateStaticParams() {
  return resourceArticles.map((a) => ({ slug: a.slug }));
}

/**
 * The one documented exception to the fixed-screen rule: article bodies are
 * prose and cannot be made to fit a viewport honestly. The screen frame still
 * holds, but the reading column scrolls inside it rather than the page
 * scrolling, so the chrome stays put.
 */
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

  const copy = article[lang];

  return (
    <Screen>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="flex min-h-0 flex-col overflow-y-auto">
          <div className="screen-pad py-8 lg:py-10">
            <Link
              href={`/${locale}/resources`}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite transition-colors hover:text-accent"
            >
              &larr; {t.back_link}
            </Link>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
              {categoryLabels[article.category][lang]}
              <span className="mx-2 text-rule-strong">/</span>
              {article.readTime} {t.read_suffix}
            </p>

            <h1 className="screen-display mt-3 text-[clamp(1.6rem,3.2vw,2.6rem)]">
              {copy.title}
            </h1>

            <p className="mt-5 max-w-[62ch] font-ui text-[15px] leading-relaxed text-ink">
              {copy.excerpt}
            </p>

            <div className="mt-6 space-y-5 rule-t pt-6">
              {copy.body.map((para, i) => (
                <p key={i} className="max-w-[68ch] font-ui text-[15px] leading-relaxed text-graphite">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 rule-t pt-6">
              <h2 className="font-ui text-lg font-semibold tracking-tight text-ink">
                {t.article_cta_title}
              </h2>
              <Link href={`/${locale}/contact-us`} className="ctl-solid mt-4">
                {t.article_cta_button}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative order-first min-h-[220px] rule-l lg:order-none lg:min-h-0">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="photo-grade object-cover"
          />
        </div>
      </div>
    </Screen>
  );
}
