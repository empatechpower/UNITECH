'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { ServiceDefinition } from '@/data/services';

/**
 * Master and detail inside one screen. The index on the left is the state
 * selector; the detail on the right is the state. This keeps a page with eight
 * sub-areas on a single screen without introducing a second navigation bar.
 */
export default function ServiceScreen({
  locale,
  service,
  dict,
  contactCta,
}: {
  locale: Locale;
  service: ServiceDefinition;
  dict: Record<string, string>;
  contactCta: string;
}) {
  const [active, setActive] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const area = service.areas[active];

  /* On desktop the detail sits beside the list and updates in place. On a
     phone it sits below it, so a tap would change something off-screen and
     read as a dead control. Bring the detail into view instead. */
  const select = (i: number) => {
    setActive(i);
    if (window.matchMedia('(max-width: 1023px)').matches) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="panel-body grid lg:min-h-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="flex flex-col lg:min-h-0">
        <div className="screen-pad shrink-0 py-6 lg:py-8">
          <h1 className="screen-display text-[clamp(1.5rem,3vw,2.25rem)]">{dict.page_title}</h1>
          <p className="mt-3 max-w-[42ch] font-ui text-[13px] leading-relaxed text-graphite">
            {dict.hero_subtext ?? dict.subtitle}
          </p>
        </div>

        <ul className="flex-1 rule-t lg:min-h-0 lg:overflow-y-auto" role="list">
          {service.areas.map((a, i) => (
            <li key={a.titleKey}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={i === active}
                className={`screen-pad flex w-full items-center justify-between gap-4 rule-b py-3.5 text-left transition-colors duration-200 ${
                  i === active ? 'bg-ground-sunk' : 'hover:bg-ground-sunk/60'
                }`}
              >
                <span className="flex items-baseline gap-4">
                  <span className="spec-figure text-[11px] text-graphite">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-ui text-[15px] font-semibold tracking-tight ${
                      i === active ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {dict[a.titleKey]}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`font-mono text-[13px] transition-colors ${
                    i === active ? 'text-accent' : 'text-graphite'
                  }`}
                >
                  &rarr;
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="screen-pad shrink-0 rule-t py-4">
          <Link href={`/${locale}/contact-us`} className="ctl-solid">
            {contactCta}
          </Link>
        </div>
      </div>

      <div ref={detailRef} className="relative flex min-h-[260px] scroll-mt-2 flex-col rule-l lg:min-h-0">
        <div className="relative min-h-[180px] flex-1 lg:min-h-0">
          <Image
            key={area.image}
            src={area.image}
            alt={dict[area.titleKey]}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="photo-grade object-cover"
          />
        </div>
        <div className="screen-pad shrink-0 rule-t bg-ground py-5 lg:py-6">
          <h2 className="font-ui text-xl font-semibold tracking-tight text-ink lg:text-2xl">
            {dict[area.titleKey]}
          </h2>
          <p className="mt-2 max-w-[70ch] font-ui text-[13px] leading-relaxed text-graphite">
            {dict[area.descKey]}
          </p>
        </div>
      </div>
    </div>
  );
}
