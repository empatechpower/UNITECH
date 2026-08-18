import Image from 'next/image';
import type { Locale } from '@/i18n/config';

interface FooterProps {
  locale: Locale;
  footer: {
    company: string;
    rights: string;
    tagline: string;
  };
}

/**
 * Status bar, not a sitemap. In a fixed-screen site there is no "bottom of the
 * page" to park a link farm in, and every route already sits in the header.
 * This carries the legal identity line and nothing else.
 */
export default function Footer({ locale, footer }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="h-9 shrink-0 rule-t bg-ground lg:h-10">
      <div className="screen-pad flex h-full items-center justify-between gap-4">
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
          <span className="hidden sm:inline">{footer.company}</span>
          <span className="sm:hidden">{footer.tagline}</span>
        </p>

        <div className="flex shrink-0 items-center gap-4">
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-graphite md:block">
            © {year} {footer.rights}
          </p>
          <Image
            src="/images/common/Made-in-TW-Logo.png"
            alt={locale === 'zh' ? '台灣製造' : 'Made in Taiwan'}
            width={120}
            height={40}
            className="h-4 w-auto opacity-55"
          />
        </div>
      </div>
    </footer>
  );
}
