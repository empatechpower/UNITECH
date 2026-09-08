import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Vertical } from '@/data/verticals';

/**
 * One vertical, one screen.
 *
 * All four verticals share this component because they share one shape in the
 * client's source document: a claim, a paragraph or three, and a register of
 * the sectors covered. Two of them render as a panel inside the home deck, two
 * as their own route; the only difference is what sits in the header strip.
 *
 * Layout is a header strip, an asymmetric intro row (photograph against copy),
 * and the register across the full width beneath. The register carries the most
 * items, so it gets the full measure rather than being squeezed into a column.
 *
 * Grid discipline: the register's column count is chosen so the item count
 * divides exactly, which is why it is computed rather than fixed. Where a
 * future edit to verticals.ts breaks divisibility, filler cells complete the
 * last row so the rule-coloured backing never shows through as a solid block.
 */

/** Largest column count in [5,4,3,2] that divides the item count exactly. */
function columnsFor(count: number): number {
  for (const c of [5, 4, 3, 2]) {
    if (count % c === 0) return c;
  }
  return 4;
}

const COLUMN_CLASS: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
};

export default function VerticalScreen({
  locale,
  vertical,
  rfqLabel,
  headerAction,
}: {
  locale: Locale;
  vertical: Vertical;
  rfqLabel: string;
  /** "Change pathway" on the deck panel; nothing on a standalone route. */
  headerAction?: React.ReactNode;
}) {
  const pick = (b: { en: string; zh: string }) => b[locale] ?? b.en;

  const cols = columnsFor(vertical.sectors.length);
  const remainder = vertical.sectors.length % cols;
  const fillers = remainder === 0 ? 0 : cols - remainder;

  return (
    <div className="panel-body flex flex-col">
      {/* Header strip: names the vertical, and on the deck offers the way out. */}
      <div className="screen-pad flex shrink-0 items-center justify-between gap-4 rule-b py-2.5">
        <h2 className="font-ui text-[13px] font-semibold tracking-tight text-ink">
          {pick(vertical.title)}
        </h2>
        {headerAction}
      </div>

      {/* Intro row. Photograph against the claim, asymmetric by design. */}
      <div className="grid shrink-0 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="relative min-h-[190px] overflow-hidden sm:min-h-[240px] lg:min-h-0">
          <Image
            key={vertical.image}
            src={vertical.image}
            alt={pick(vertical.imageAlt)}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="photo-grade object-cover"
          />
        </div>

        <div className="screen-pad flex min-h-0 flex-col justify-center gap-5 rule-t py-7 lg:border-t-0 lg:rule-l lg:py-8">
          <h1 className="screen-display max-w-[22ch] text-[clamp(1.375rem,2.5vw,2.125rem)]">
            {pick(vertical.tagline)}
          </h1>

          <div className="flex flex-col gap-3">
            {vertical.body.map((p) => (
              <p
                key={p.en}
                className="max-w-[58ch] font-ui text-[13px] leading-relaxed text-graphite lg:text-sm"
              >
                {pick(p)}
              </p>
            ))}
          </div>

          <div>
            <Link href={`/${locale}/contact-us`} className="ctl-solid">
              {rfqLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* The register. A spec list, not a card grid: this is what a buyer came
          to read, so it gets the full measure and the tightest type. */}
      <div className="shrink-0">
        <div className="screen-pad flex items-center justify-between gap-4 rule-t rule-b py-2">
          <p className="screen-label">{pick(vertical.registerHeading)}</p>
          <p className="spec-figure text-[11px] text-graphite">
            {String(vertical.sectors.length).padStart(2, '0')}
          </p>
        </div>

        <ul
          className={`grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 ${COLUMN_CLASS[cols]}`}
          role="list"
        >
          {vertical.sectors.map((s, i) => (
            <li
              key={s.en}
              className="flex items-start gap-3 bg-ground px-5 py-3 sm:px-6 lg:py-3.5"
            >
              <span className="spec-figure mt-px shrink-0 text-[10px] text-graphite">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-ui text-[12.5px] font-medium leading-snug tracking-tight text-ink">
                {pick(s)}
              </span>
            </li>
          ))}

          {/* Completes the final row so the backing rule never shows as a block.
              Zero of these at the current item counts. */}
          {Array.from({ length: fillers }, (_, i) => (
            <li key={`filler-${i}`} aria-hidden="true" className="hidden bg-ground lg:block" />
          ))}
        </ul>
      </div>
    </div>
  );
}
