import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';

/**
 * One screen. The long-form paragraphs from the old scrolling page are cut to
 * the differentiator claim plus the three verticals, which is what a sourcing
 * buyer is actually reading this page to establish. The detail they carried
 * now lives on the service screens.
 */
export default function AboutScreen({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Record<string, string>;
}) {
  const stats = [
    { figure: dict.stat_partners, label: dict.stat_partners_label },
    { figure: dict.stat_taiwan, label: dict.stat_taiwan_label },
    { figure: dict.stat_markets, label: dict.stat_markets_label },
    { figure: dict.stat_verticals, label: dict.stat_verticals_label },
  ];

  const verticals = [
    { title: dict.vert_machinery, body: dict.vert_machinery_desc },
    { title: dict.vert_parts, body: dict.vert_parts_desc },
    { title: dict.vert_tech, body: dict.vert_tech_desc },
  ];

  return (
    <div className="panel-body flex flex-col">
      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="screen-pad flex flex-col justify-center py-10 lg:py-0 lg:pr-12">
          <h1 className="screen-display text-[clamp(1.9rem,4.4vw,3.5rem)]">{dict.headline}</h1>
          <p className="mt-4 max-w-[44ch] font-ui text-[15px] leading-relaxed text-graphite lg:text-base">
            {dict.para5}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 lg:max-w-xl">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="spec-figure block text-2xl lg:text-[28px]">{s.figure}</span>
                  <span className="mt-1 block font-ui text-[11px] leading-snug text-graphite">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9">
            <Link href={`/${locale}/contact-us`} className="ctl-solid">
              {dict.cta_button}
            </Link>
          </div>
        </div>

        <div className="relative min-h-[200px] rule-l lg:min-h-0">
          <Image
            src="/images/solutions/mechanical.jpg"
            alt={dict.taiwan_statement}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="photo-grade object-cover"
          />
        </div>
      </div>

      <div className="grid shrink-0 gap-px rule-t bg-rule sm:grid-cols-3">
        {verticals.map((v) => (
          <div key={v.title} className="screen-pad bg-ground py-4 lg:py-5">
            <h2 className="font-ui text-[13px] font-semibold tracking-tight text-ink">{v.title}</h2>
            <p className="mt-1 max-w-[42ch] font-ui text-[12px] leading-snug text-graphite">
              {v.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
