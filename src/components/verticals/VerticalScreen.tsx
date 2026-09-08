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
 * Layout is a header strip over two columns: a tall photograph on the left, and
 * on the right the claim, the copy, the call to action and then the register,
 * all in one reading column.
 *
 * **The register belongs in the copy column, directly under the call to action.**
 * It used to run full-width along the foot of the screen, below both columns,
 * which read as a footer and buried the one thing a procurement buyer came for.
 * Keeping it in the same column as the claim is what makes it read as the
 * continuation of that argument rather than as page furniture.
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
      <div className="grid lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] 2xl:grid-cols-2">
        <div className="relative min-h-[190px] overflow-hidden sm:min-h-[240px] lg:min-h-0">
          <Image
            key={vertical.image}
            src={vertical.image}
            alt={pick(vertical.imageAlt)}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectPosition: vertical.imagePosition ?? 'center' }}
            className="photo-grade object-cover"
          />
        </div>

        <div className="flex min-h-0 flex-col rule-t lg:border-t-0 lg:rule-l">
          <div className="screen-pad flex shrink-0 flex-col gap-4 py-6 lg:gap-3.5 lg:py-5">
          <h1 className="screen-display max-w-[36ch] text-[clamp(1.375rem,2.1vw,1.9rem)]">
            {pick(vertical.tagline)}
          </h1>

          <div className="flex flex-col gap-3">
            {vertical.body.map((p) => (
              <p
                key={p.en}
                className="max-w-[68ch] font-ui text-[13px] leading-relaxed text-graphite"
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

        {/* The register, in the same column and immediately under the action.
            Its own padding is tighter than the prose above it so the cells stay
            wide enough to read: it is a table under an argument, not more
            prose. Nothing may be inserted between the action and this block. */}
        <div className="flex items-center justify-between gap-4 rule-t rule-b px-5 py-2 sm:px-8 lg:px-12 lg:py-1.5">
          <p className="screen-label">{pick(vertical.registerHeading)}</p>
          <p className="spec-figure text-[11px] text-graphite">
            {String(vertical.sectors.length).padStart(2, '0')}
          </p>
        </div>

        <ul className="register-grid rule-b grid bg-ground" role="list">
          {vertical.sectors.map((s, i) => (
            <li
              key={s.en}
              className="flex items-start gap-2.5 border-b border-r border-rule bg-ground px-5 py-2.5 sm:px-8 lg:px-5 lg:py-1.5 xl:px-6"
            >
              <span className="spec-figure mt-px shrink-0 text-[10px] text-graphite">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-ui text-[12.5px] font-medium leading-snug tracking-tight text-ink">
                {pick(s)}
              </span>
            </li>
          ))}

          {/* Completes the final row so the backing rule never shows as a solid
              block. Zero of these at the current item counts. */}
          {Array.from({ length: fillers }, (_, i) => (
            <li key={`filler-${i}`} aria-hidden="true" className="hidden bg-ground lg:block" />
          ))}
        </ul>

        {/* Leftover height lands below the register, against the full-height
            photograph. Never above it: that gap is what made it read as a
            footer. */}
        <div className="hidden lg:block lg:flex-1" aria-hidden="true" />
        </div>
      </div>

    </div>
  );
}
