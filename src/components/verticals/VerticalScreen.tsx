import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Vertical, Bilingual } from '@/data/verticals';

/**
 * One vertical, one screen, in two compositions.
 *
 * All four verticals share this component because they share one shape in the
 * client's source document: a claim, a paragraph or three, and a register of
 * the sectors covered. What differs is the composition, chosen per vertical by
 * `layout` in verticals.ts:
 *
 * `split` is the spec sheet. Photograph on the left, and on the right the
 * claim, the copy, the action and then the register. The two pathway grounds
 * use it, because a visitor arrives there to compare capability.
 *
 * `cover` is the dossier cover. One full-bleed photograph with everything set
 * into a wash of the ground. The two cross-cutting verticals use it, so that
 * reaching Partnerships or Part Supply from the nav feels like opening a
 * different document rather than re-reading a pathway screen.
 *
 * **The register stays directly under the call to action in both.** It once ran
 * full-width along the foot of the screen, where it read as a footer and buried
 * the one thing a procurement buyer came for. Nothing goes between the action
 * and the register.
 *
 * The whole block is centred in the frame from `lg` up, which is what the rest
 * of the screens already do (Home, About and Contact all centre their copy
 * columns). It used to sit at the top with the leftover height below it, which
 * read as the page having run out rather than as composition.
 *
 * The register reflows its column count with `auto-fit` (`.register-grid`),
 * because the width available to it ranges from half the screen to all of it.
 * Its hairlines are per-cell borders rather than the usual 1px gap over a
 * rule-coloured backing: auto-fit leaves the last row partial, and the backing
 * would show through the empty cells as a solid block.
 */
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
  const pick = (b: Bilingual) => b[locale] ?? b.en;
  const cover = vertical.layout === 'cover';

  const claim = (
    <>
      <h1
        className={
          cover
            ? 'screen-display max-w-[34ch] text-[clamp(1.5rem,2.1vw,2.35rem)]'
            : 'screen-display max-w-[36ch] text-[clamp(1.375rem,2.1vw,1.9rem)]'
        }
      >
        {pick(vertical.tagline)}
      </h1>

      <div className="flex flex-col gap-2.5">
        {vertical.body.map((p) => (
          <p
            key={p.en}
            className={`font-ui text-[13px] leading-relaxed text-graphite ${
              cover ? 'max-w-[62ch]' : 'max-w-[68ch]'
            }`}
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
    </>
  );

  const register = (
    <>
      <div
        className={`flex items-center justify-between gap-4 rule-t rule-b py-2 lg:py-1.5 ${
          cover ? 'screen-pad bg-ground/92' : 'px-5 sm:px-8 lg:px-12'
        }`}
      >
        <p className="screen-label">{pick(vertical.registerHeading)}</p>
        <p className="spec-figure text-[11px] text-graphite">
          {String(vertical.sectors.length).padStart(2, '0')}
        </p>
      </div>

      <ul
        className="register-grid rule-b grid"
        data-layout={vertical.layout}
        role="list"
      >
        {vertical.sectors.map((s, i) => (
          <li
            key={s.en}
            className={`flex items-start gap-2.5 border-b border-r border-rule py-2.5 lg:py-1.5 ${
              cover ? 'bg-ground/92 px-5 sm:px-8 lg:px-6 xl:px-7' : 'px-5 sm:px-8 lg:px-5 xl:px-6'
            }`}
          >
            <span className="spec-figure mt-px shrink-0 text-[10px] text-graphite">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-ui text-[12.5px] font-medium leading-snug tracking-tight text-ink">
              {pick(s)}
            </span>
          </li>
        ))}
      </ul>
    </>
  );

  const header = (
    <div className="screen-pad relative z-10 flex shrink-0 items-center justify-between gap-4 rule-b py-2.5">
      <h2 className="font-ui text-[13px] font-semibold tracking-tight text-ink">
        {pick(vertical.title)}
      </h2>
      {headerAction}
    </div>
  );

  /* --- Cover ----------------------------------------------------------- */
  if (cover) {
    return (
      <div className="panel-body flex flex-col">
        {header}

        <div className="relative flex min-h-0 flex-1 flex-col">
          <Image
            key={vertical.image}
            src={vertical.image}
            alt={pick(vertical.imageAlt)}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: vertical.imagePosition ?? 'center' }}
            className="photo-grade object-cover"
          />
          {/* The wash is what makes the copy legible over the photograph. It is
              built from --ground, so it follows the pathway the visitor is on
              rather than being a fixed white. */}
          <div className="cover-wash absolute inset-0" aria-hidden="true" />

          {/* Below lg the photograph needs room to read before the copy starts,
              which is what the spacer buys; above lg the raking wash handles it
              and the copy sits high against a clear top right. */}
          <div className="relative min-h-[34vh] shrink-0 lg:hidden" aria-hidden="true" />

          {/* Claim, copy, action and register in one bounded column set into
              the wash. The register is held to the same measure as the copy
              rather than running the full width, so the photograph stays clear
              to its right and the two read as one block. */}
          <div className="cover-column relative flex min-h-0 flex-col lg:flex-1 lg:justify-center">
            <div className="screen-pad flex shrink-0 flex-col gap-4 py-6 lg:gap-3 lg:py-4">
              {claim}
            </div>

            {register}
          </div>
        </div>
      </div>
    );
  }

  /* --- Split ----------------------------------------------------------- */
  return (
    <div className="panel-body flex flex-col">
      {header}

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

        <div className="flex min-h-0 flex-col rule-t lg:border-t-0 lg:rule-l lg:justify-center">
          <div className="screen-pad flex shrink-0 flex-col gap-4 py-6 lg:gap-3.5 lg:py-5">
            {claim}
          </div>

          {register}
        </div>
      </div>
    </div>
  );
}
