import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import Screen from '@/components/screen/Screen';
import { services } from '@/data/services';

/**
 * The hub is no longer in the primary navigation, since the Capabilities state
 * on the home screen does that job. It stays as a real route because the URL
 * already exists and carries search value, and it lists every service area
 * regardless of which pathway the visitor chose.
 */
export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);

  return (
    <Screen>
      <div className="panel-body grid min-h-0 grid-cols-1 gap-px bg-rule sm:grid-cols-2">
        {services.map((s) => {
          const section = dict[s.dictKey] as Record<string, string>;
          return (
            <Link
              key={s.slug}
              href={`/${locale}/services/${s.slug}`}
              className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden bg-ground"
            >
              <Image
                src={s.hero}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="photo-grade object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/5" />
              <span className="relative p-6 lg:p-8">
                <span className="block font-ui text-2xl font-semibold tracking-tight text-white lg:text-3xl">
                  {section.page_title}
                </span>
                <span className="mt-2 block max-w-[46ch] font-ui text-[13px] leading-snug text-white/75">
                  {section.hero_subtext ?? section.subtitle}
                </span>
                <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                  {s.areas.length} {locale === 'zh' ? '項專業領域' : 'areas'}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </Screen>
  );
}
