'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { useIndustry } from '@/components/IndustryProvider';
import { pathwayCapabilities } from '@/data/capabilities';

/**
 * What the chosen pathway actually contains. Switching pathway re-populates
 * this in the same frame as the ground changes, so the choice made on the
 * Pathways state has a visible consequence rather than being decorative.
 *
 * Eight grid slots for six things: the photograph and the flagship capability
 * take two each, the remaining four take one. Slot count matches content
 * exactly, so no breakpoint leaves a blank tile.
 */
export default function CapabilitiesPanel({ locale }: { locale: Locale }) {
  const { industry } = useIndustry();
  const set = pathwayCapabilities[industry];

  return (
    <div className="panel-body">
      <div className="grid h-full min-h-0 grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[1.15fr_1fr]">
        <div className="relative min-h-[200px] bg-ground sm:col-span-2 lg:min-h-0">
          <Image
            key={set.image}
            src={set.image}
            alt={set.imageAlt[locale] ?? set.imageAlt.en}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="photo-grade object-cover"
          />
        </div>

        {set.capabilities.map((cap, i) => {
          const copy = cap[locale] ?? cap.en;
          return (
            <Link
              key={`${industry}-${copy.title}`}
              href={`/${locale}${cap.href}`}
              className={`group flex min-h-0 flex-col justify-between bg-ground p-6 transition-colors duration-200 hover:bg-ground-sunk lg:p-7 ${
                cap.featured ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="min-h-0">
                <h3
                  className={`font-ui font-semibold tracking-tight text-ink ${
                    cap.featured ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'
                  }`}
                >
                  {copy.title}
                </h3>
                <p className="mt-2 max-w-[38ch] font-ui text-[13px] leading-snug text-graphite">
                  {copy.body}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="spec-figure text-[11px] text-graphite">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[13px] text-graphite transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-accent"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
