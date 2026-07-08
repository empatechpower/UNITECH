import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import HeroSection from '@/components/homepage/HeroSection';
import IndustrySelector from '@/components/homepage/IndustrySelector';
import TaiwanAdvantage from '@/components/homepage/TaiwanAdvantage';
import Capabilities from '@/components/homepage/Capabilities';
import FeaturedProjects from '@/components/homepage/FeaturedProjects';
import ResourcesPreview from '@/components/homepage/ResourcesPreview';
import CTASection from '@/components/homepage/CTASection';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : ('en' as Locale);
  const dict = await getDictionary(locale);
  const t = dict.homepage;

  return (
    <>
      <HeroSection dict={t} />
      <IndustrySelector dict={t} />
      <TaiwanAdvantage dict={t} />
      <Capabilities dict={t} />
      <FeaturedProjects dict={t} />
      <ResourcesPreview locale={locale} dict={t} readSuffix={dict.resources.read_suffix} />
      <CTASection locale={locale} dict={t} />
    </>
  );
}
