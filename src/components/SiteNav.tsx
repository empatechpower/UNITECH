'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import type { Locale } from '@/i18n/config';

export interface NavState {
  id: string;
  label: string;
}

interface SiteNavProps {
  locale: Locale;
  nav: Record<string, string>;
  /** The home screen's states, which double as the primary navigation. */
  states: NavState[];
}

export default function SiteNav(props: SiteNavProps) {
  // useSearchParams needs a boundary so the rest of the shell can stay static.
  return (
    <Suspense fallback={<NavShell {...props} activeState={null} search={null} />}>
      <NavInner {...props} />
    </Suspense>
  );
}

function NavInner(props: SiteNavProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const onHome = pathname === `/${props.locale}`;
  const view = searchParams.get('view') ?? props.states[0]?.id;
  // Capabilities is reached by choosing a pathway on the Home screen, so it
  // keeps Home lit rather than leaving nothing selected.
  const activeState = onHome ? (view === 'capabilities' ? 'home' : view) : null;
  return <NavShell {...props} activeState={activeState} search={searchParams.toString()} />;
}

function NavShell({
  locale,
  nav,
  states,
  activeState,
  search,
}: SiteNavProps & { activeState: string | null; search: string | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale: Locale = locale === 'en' ? 'zh' : 'en';
  // The locale toggle must land on the same screen in the other language.
  // `usePathname` excludes the query string, and the home screen's state lives
  // entirely in `?view=`, so building the target from the pathname alone sent
  // every state of Home to the other language's homepage. Carry the search
  // params across. The Suspense fallback cannot read them and degrades to the
  // bare path, but Next fills the boundary per request, so the served HTML
  // already carries the query (verified with curl on a production build).
  const basePath = pathname.startsWith(`/${locale}`)
    ? `/${otherLocale}${pathname.slice(locale.length + 1)}`
    : `/${otherLocale}`;
  const switchPath = search ? `${basePath}?${search}` : basePath;

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  /* Two groups, one bar. The verticals are the offer; About and Contact are
     the company. The hairline between them is what keeps six items legible. */
  const verticalPages = [
    { href: `/${locale}/partnerships`, label: nav.partnerships },
    { href: `/${locale}/part-supply`, label: nav.part_supply },
  ];

  const pages = [
    { href: `/${locale}/about-us`, label: nav.about },
    { href: `/${locale}/contact-us`, label: nav.contact },
  ];

  const stateHref = (id: string) =>
    id === states[0]?.id ? `/${locale}` : `/${locale}?view=${id}`;

  return (
    <>
    <header className="relative z-50 h-14 shrink-0 rule-b bg-ground/95 backdrop-blur-md lg:h-[68px]">
      <div className="screen-pad flex h-full items-center gap-3 xl:gap-6">
        <Link href={`/${locale}`} className="flex h-11 shrink-0 items-center lg:h-auto" aria-label="UNiTECH">
          <Image
            src="/images/common/logo-color.png"
            alt="UNiTECH"
            width={500}
            height={150}
            priority
            className="h-6 w-auto lg:h-7"
          />
        </Link>

        {/* The home screen's states are the primary navigation. */}
        <nav className="hidden flex-1 items-center lg:flex" aria-label={nav.state_label}>
          {states.map((s) => (
            <Link
              key={s.id}
              href={stateHref(s.id)}
              data-active={activeState === s.id}
              className="ctl-state whitespace-nowrap px-2.5 xl:px-4"
            >
              {s.label}
            </Link>
          ))}

          <span className="mx-1.5 h-5 w-px bg-rule xl:mx-3" aria-hidden="true" />

          {verticalPages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              data-active={pathname.startsWith(p.href)}
              className="ctl-state whitespace-nowrap px-2.5 xl:px-4"
            >
              {p.label}
            </Link>
          ))}

          <span className="mx-1.5 h-5 w-px bg-rule xl:mx-3" aria-hidden="true" />

          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              data-active={pathname.startsWith(p.href)}
              className="ctl-state whitespace-nowrap px-2.5 xl:px-4"
            >
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-2">
          <Link
            href={switchPath}
            className="inline-flex min-h-11 items-center border border-rule-strong px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite transition-colors duration-200 hover:bg-ground-sunk hover:text-ink lg:min-h-0 xl:px-3"
          >
            {locale === 'en' ? '中文' : 'EN'}
          </Link>
        </div>

        {/* Mobile */}
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            href={switchPath}
            className="inline-flex min-h-11 items-center border border-rule-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite"
          >
            {locale === 'en' ? '中文' : 'EN'}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? nav.menu_close : nav.menu_open}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-rule-strong"
          >
            <span
              className={`h-px w-4 bg-ink transition-transform duration-200 ${
                menuOpen ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-4 bg-ink transition-transform duration-200 ${
                menuOpen ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

    </header>

    <div
      id="site-menu"
      inert={!menuOpen ? true : undefined}
      className={`fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-ground transition-opacity duration-200 lg:hidden ${
        menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <nav className="screen-pad flex flex-col pt-2" aria-label={nav.state_label}>
        {states.map((s) => (
          <Link
            key={s.id}
            href={stateHref(s.id)}
            scroll={false}
            onClick={() => setMenuOpen(false)}
            className={`rule-b py-4 font-ui text-lg tracking-tight ${
              activeState === s.id ? 'text-accent' : 'text-ink'
            }`}
          >
            {s.label}
          </Link>
        ))}
        {[...verticalPages, ...pages].map((p) => (
          <Link
            key={p.href}
            href={p.href}
            onClick={() => setMenuOpen(false)}
            className={`rule-b py-4 font-ui text-lg tracking-tight ${
              pathname.startsWith(p.href) ? 'text-accent' : 'text-ink'
            }`}
          >
            {p.label}
          </Link>
        ))}
      </nav>
    </div>
    </>
  );
}

