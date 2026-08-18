import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';

/** Column 1 carries the claim, column 2 the evidence. Nothing is centred. */
export default function OverviewPanel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Record<string, string>;
}) {
  const pillars = [
    { title: dict.advantage_precision_title, body: dict.advantage_precision_desc },
    { title: dict.advantage_innovation_title, body: dict.advantage_innovation_desc },
    { title: dict.advantage_reach_title, body: dict.advantage_reach_desc },
  ];

  return (
    <div className="panel-body flex flex-col">
      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="screen-pad flex flex-col justify-center py-10 lg:py-0 lg:pr-12">
          <h1 className="screen-display text-[clamp(2rem,5.2vw,4.25rem)]">
            {dict.hero_headline_1}
            <br />
            {dict.hero_headline_2}
          </h1>

          <p className="mt-6 max-w-[46ch] font-ui text-[15px] leading-relaxed text-graphite lg:text-base">
            {dict.selector_industrial_desc}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/contact-us`} className="ctl-solid">
              {dict.rfq_cta}
            </Link>
            <Link href={`/${locale}/services`} className="ctl-outline">
              {dict.hero_cta}
            </Link>
          </div>
        </div>

        <div className="relative min-h-[220px] rule-l lg:min-h-0">
          <Image
            src="/images/homepage-editorial/hero.png"
            alt={dict.hero_eyebrow}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="photo-grade object-cover"
          />
        </div>
      </div>

      {/* Evidence rail. Three claims a buyer can check, not decoration. */}
      <div className="screen-pad grid shrink-0 rule-t sm:grid-cols-3">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className={`py-4 lg:py-5 ${i > 0 ? 'sm:rule-l sm:pl-6' : ''} ${
              i < pillars.length - 1 ? 'sm:pr-6' : ''
            }`}
          >
            <h2 className="font-ui text-[13px] font-semibold tracking-tight text-ink">
              {p.title}
            </h2>
            <p className="mt-1 font-ui text-[12px] leading-snug text-graphite">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
