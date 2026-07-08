'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/config';

interface HeaderProps {
  locale: Locale;
  nav: {
    home: string;
    about: string;
    services: string;
    machinery: string;
    manufacturing: string;
    oem: string;
    partnerships: string;
    contact: string;
    resources?: string;
  };
}

export default function Header({ locale, nav }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const otherLocale = locale === 'en' ? 'zh' : 'en';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const serviceItems = [
    { href: `/${locale}/services/machinery`, label: nav.machinery },
    { href: `/${locale}/services/manufacturing`, label: nav.manufacturing },
    { href: `/${locale}/services/oem-products`, label: nav.oem },
    { href: `/${locale}/services/partnerships`, label: nav.partnerships },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-xl border-b border-concrete transition-all duration-500 font-ui ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="section-padding flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <Image
            src="/images/common/logo-color.png"
            alt="UNiTECH"
            width={72}
            height={72}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>
            {nav.home}
          </NavLink>
          <NavLink href={`/${locale}/about-us`} active={isActive(`/${locale}/about-us`)}>
            {nav.about}
          </NavLink>

          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <NavLink href={`/${locale}/services`} active={pathname.includes('/services')}>
              {nav.services}
              <svg className={`w-3 h-3 ml-1 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </NavLink>
            <div className={`absolute top-full left-0 mt-0 pt-2 transition-all duration-300 ${servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <div className="bg-white/98 backdrop-blur-md border border-concrete shadow-[0_20px_40px_-12px_rgba(20,22,26,0.12)] min-w-[220px]">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-5 py-3 text-sm tracking-wide transition-colors border-l-2 ${
                      isActive(item.href)
                        ? 'text-accent border-accent bg-accent-soft'
                        : 'text-graphite border-transparent hover:text-ink hover:border-accent/50 hover:bg-paper'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {nav.resources && (
            <NavLink href={`/${locale}/resources`} active={pathname.includes('/resources')}>
              {nav.resources}
            </NavLink>
          )}

          <NavLink href={`/${locale}/contact-us`} active={isActive(`/${locale}/contact-us`)}>
            {nav.contact}
          </NavLink>

          {/* Language Toggle */}
          <Link
            href={switchPath}
            className="ml-4 px-3 py-1.5 border border-ink/15 text-graphite hover:text-ink hover:border-ink/40 text-[10px] tracking-[0.15em] uppercase font-semibold transition-all duration-300"
          >
            {locale === 'en' ? '中文' : 'EN'}
          </Link>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href={switchPath}
            className="px-2.5 py-1 border border-ink/15 text-graphite text-[10px] tracking-[0.15em] uppercase font-semibold"
          >
            {locale === 'en' ? '中文' : 'EN'}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span className={`w-6 h-[1.5px] bg-ink transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`w-6 h-[1.5px] bg-ink transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[1.5px] bg-ink transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="bg-warm-white/98 backdrop-blur-md border-t border-concrete py-4 section-padding flex flex-col">
          <MobileLink href={`/${locale}`} active={isActive(`/${locale}`)}>{nav.home}</MobileLink>
          <MobileLink href={`/${locale}/about-us`} active={isActive(`/${locale}/about-us`)}>{nav.about}</MobileLink>
          <MobileLink href={`/${locale}/services`} active={pathname === `/${locale}/services`}>{nav.services}</MobileLink>
          {serviceItems.map((item) => (
            <MobileLink key={item.href} href={item.href} active={isActive(item.href)} indent>
              {item.label}
            </MobileLink>
          ))}
          {nav.resources && (
            <MobileLink href={`/${locale}/resources`} active={pathname.includes('/resources')}>{nav.resources}</MobileLink>
          )}
          <MobileLink href={`/${locale}/contact-us`} active={isActive(`/${locale}/contact-us`)}>{nav.contact}</MobileLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 text-sm tracking-wide transition-colors duration-300 ${
        active ? 'text-accent' : 'text-graphite hover:text-ink'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, active, indent, children }: { href: string; active: boolean; indent?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`py-3 text-base tracking-wide border-b border-concrete transition-colors ${
        indent ? 'pl-6 text-sm' : ''
      } ${active ? 'text-accent' : 'text-graphite'}`}
    >
      {children}
    </Link>
  );
}
