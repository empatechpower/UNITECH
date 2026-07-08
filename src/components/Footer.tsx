import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import IndustryToggle from '@/components/IndustryToggle';
import type { IndustryTheme } from '@/lib/industry-theme-types';

interface FooterProps {
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
  };
  footer: {
    company: string;
    rights: string;
    tagline: string;
  };
  common: {
    industry_industrial: string;
    industry_green: string;
  };
  industry: IndustryTheme;
}

export default function Footer({ locale, nav, footer, common, industry }: FooterProps) {
  return (
    <footer className="relative bg-warm-white border-t border-concrete overflow-hidden font-ui">
      {/* Top accent border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Background texture */}
      <div className="absolute inset-0 grid-technical opacity-40" />
      <div className="absolute inset-0 paper-grain" />

      {/* Main footer */}
      <div className="relative section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-5">
              <Image
                src="/images/common/logo-color.png"
                alt="UNiTECH"
                width={96}
                height={29}
                className="w-12 h-auto lg:w-20"
              />
            </Link>
            <p className="text-ink text-sm leading-relaxed mb-2">
              {footer.tagline}
            </p>
            <p className="text-graphite text-xs leading-relaxed mb-5">
              {footer.company}
            </p>
            <Image
              src="/images/common/Made-in-TW-Logo.png"
              alt="Made in Taiwan"
              width={64}
              height={64}
              className="opacity-80 mb-6"
            />
            <IndustryToggle
              initialIndustry={industry}
              labels={{ industrial: common.industry_industrial, green: common.industry_green }}
            />
          </div>

          {/* Quick links */}
          <div>
            <h4 className="eyebrow mb-5">Navigation</h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink href={`/${locale}`}>{nav.home}</FooterLink>
              <FooterLink href={`/${locale}/about-us`}>{nav.about}</FooterLink>
              <FooterLink href={`/${locale}/services`}>
                {nav.services}
              </FooterLink>
              <FooterLink href={`/${locale}/contact-us`}>
                {nav.contact}
              </FooterLink>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="eyebrow mb-5">{nav.services}</h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink href={`/${locale}/services/machinery`}>
                {nav.machinery}
              </FooterLink>
              <FooterLink href={`/${locale}/services/manufacturing`}>
                {nav.manufacturing}
              </FooterLink>
              <FooterLink href={`/${locale}/services/oem-products`}>
                {nav.oem}
              </FooterLink>
              <FooterLink href={`/${locale}/services/partnerships`}>
                {nav.partnerships}
              </FooterLink>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="eyebrow mb-5">Company</h4>
            <p className="text-graphite text-sm leading-relaxed">
              {footer.company}
            </p>
            <div className="mt-4 text-graphite text-sm">Taiwan</div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative section-padding py-5 border-t border-concrete">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-graphite text-xs tracking-wide">
            &copy; {new Date().getFullYear()} {footer.company} {footer.rights}
          </p>
          <div className="flex items-center gap-1.5 text-graphite text-[10px] tracking-[0.15em] uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-accent/60 inline-block" />
            100% Made in Taiwan
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-graphite text-sm hover:text-accent transition-colors duration-300 tracking-wide"
    >
      {children}
    </Link>
  );
}
