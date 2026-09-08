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
 * Layout is a header strip, then an intro row of photograph against copy, then
 * the register filling everything beneath it.
 *
 * **The register sits directly under the copy and owns the rest of the screen.**
 * It used to come after an intro row that grew to fill the height, which left a
 * void under the call to action and pressed the register flush against the
 * status bar as a thin strip. It read as page furniture, and the sectors are
 * the one thing a procurement buyer came to read. So the intro row is now sized
 * by its own content and the register takes the remaining height, its rows
 * sharing that space equally. Do not give the intro row `flex-1`: that is the
 * change that reintroduces the void.
 *
 * Because the register spans the full width it stays short enough to fit, which
 * a column could not do. Sixteen items need four columns of four rows; in the
 * width of a single column they became eight rows and overflowed the screen.
 *
 * Grid discipline: the column count is chosen so the item count divides exactly,
 * which is why it is computed rather than fixed. Where a future edit to
 * verticals.ts breaks divisibility, filler cells complete the last row, because
 * the grid draws its hairlines as a 1px gap over a rule-coloured backing and a
 * missing cell would otherwise show as a solid block.
 */

/**
 * Columns for the register, chosen so the item count divides exactly AND the
 * resulting row count is near three.
 *
 * Divisibility alone is not enough. The register stretches its rows to fill the
 * height, so four items across four columns became a single 450px row of nearly
 * empty cells that read as content failing to load. Aiming at three rows keeps
 * cells close to a sensible height whether the vertical has four sectors or
 * sixteen. Ties go to the wider grid, which scans better.
 */
function columnsFor(count: number): number {
  const divisors = [5, 4, 3, 2].filter((c) => count % c === 0);
  if (!divisors.length) return 4;
  return divisors.reduce((best, c) =>
    Math.abs(count / c - 3) < Math.abs(count / best - 3) ? c : best
  );
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

  /* The register stretches to fill the height, but only so far. A vertical with
     four sectors cannot honestly fill half a 900px screen, and letting it try
     produced 200px cells holding one short line, which reads as a loading
     failure. Capping the row height leaves calm ground beneath the register
     instead, which is whitespace rather than an apparent bug. Verticals with
     enough sectors never reach the cap and fill the screen exactly. */
  const rows = Math.ceil(vertical.sectors.length / cols);
  const registerMaxHeight = rows * 116 + (rows - 1);

  return (
    <div className="panel-body flex flex-col">
      {/* Header strip: names the vertical, and on the deck offers the way out. */}
      <div className="screen-pad flex shrink-0 items-center justify-between gap-4 rule-b py-2.5">
        <h2 className="font-ui text-[13px] font-semibold tracking-tight text-ink">
          {pick(vertical.title)}
        </h2>
        {headerAction}
      </div>

      {/* Intro row. Sized by its content, never by the leftover height. */}
      <div className="grid shrink-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
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

        <div className="screen-pad flex flex-col justify-center gap-4 rule-t py-6 lg:gap-4 lg:border-t-0 lg:rule-l lg:py-6">
          <h1 className="screen-display max-w-[24ch] text-[clamp(1.375rem,2.3vw,2rem)]">
            {pick(vertical.tagline)}
          </h1>

          <div className="flex flex-col gap-2.5">
            {vertical.body.map((p) => (
              <p
                key={p.en}
                className="max-w-[60ch] font-ui text-[13px] leading-relaxed text-graphite"
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

      {/* The register. Begins immediately under the copy and runs to the foot of
          the screen, so there is no gap in which it could read as a footer. */}
      <div className="screen-pad flex shrink-0 items-center justify-between gap-4 rule-t rule-b py-2">
        <p className="screen-label">{pick(vertical.registerHeading)}</p>
        <p className="spec-figure text-[11px] text-graphite">
          {String(vertical.sectors.length).padStart(2, '0')}
        </p>
      </div>

      <ul
        className={`register-grid rule-b grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:min-h-0 lg:flex-1 lg:auto-rows-fr ${COLUMN_CLASS[cols]}`}
        style={{ ['--register-max' as string]: `${registerMaxHeight}px` }}
        role="list"
      >
        {vertical.sectors.map((s, i) => (
          <li
            key={s.en}
            className="flex flex-col justify-center bg-ground px-5 py-3 sm:px-6 lg:py-3.5"
          >
            <div className="flex items-start gap-3">
              <span className="spec-figure mt-px shrink-0 text-[10px] text-graphite">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-ui text-[12.5px] font-medium leading-snug tracking-tight text-ink">
                {pick(s)}
              </span>
            </div>
          </li>
        ))}

        {/* Completes the final row so the backing rule never shows as a solid
            block. Zero of these at the current item counts. */}
        {Array.from({ length: fillers }, (_, i) => (
          <li key={`filler-${i}`} aria-hidden="true" className="hidden bg-ground lg:block" />
        ))}
      </ul>
    </div>
  );
}
