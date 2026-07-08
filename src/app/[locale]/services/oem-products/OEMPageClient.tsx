'use client';

import Link from 'next/link';
import MachineryHero from '@/components/machinery/MachineryHero';
import CapabilityNav from '@/components/machinery/CapabilityNav';
import CapabilitySection from '@/components/machinery/CapabilitySection';
import MetricsSection from '@/components/machinery/MetricsSection';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxSection from '@/components/ParallaxSection';

interface OEMPageClientProps {
  dict: Record<string, any>;
  locale: string;
}

export default function OEMPageClient({ dict, locale }: OEMPageClientProps) {
  const t = dict.oem;

  const sections = [
    { id: 'mobility', title: t.mobility_title, desc: t.mobility_desc, image: '/images/portfolio/MOBILITY.png' },
    { id: 'health-care', title: t.healthcare_title, desc: t.healthcare_desc, image: '/images/portfolio/HEALTH-CARE.png' },
    { id: 'power', title: t.power_title, desc: t.power_desc, image: '/images/portfolio/POWER.png' },
    { id: 'materials', title: t.materials_title, desc: t.materials_desc, image: '/images/portfolio/MATERIALS.png' },
  ];

  const metrics = [
    { value: '4', label: t.metric_verticals ?? 'Product Verticals' },
    { value: '100%', label: t.metric_taiwan ?? 'Made in Taiwan' },
    { value: '30+', label: t.metric_markets ?? 'Global Markets' },
    { value: '100%', label: t.metric_ip ?? 'IP Protection' },
  ];

  const ctaLabel = t.explore_cta ?? 'Explore Product Line';

  return (
    <>
      <MachineryHero
        headline={t.hero_headline ?? 'High-Technology OEM Products'}
        subtext={t.hero_subtext ?? t.hero_text}
        backgroundImage="/images/homepage/oem-product.jpg"
        scrollLabel={t.scroll_label ?? 'Scroll'}
        ghostText="OEM"
        tag={t.page_title}
      />

      <CapabilityNav
        items={sections.map(s => ({ id: s.id, title: s.title }))}
        label={t.sections_label ?? 'PRODUCT LINES'}
      />

      {sections.slice(0, 2).map((s, i) => (
        <CapabilitySection
          key={s.id}
          id={s.id}
          index={i}
          title={s.title}
          description={s.desc}
          image={s.image}
          ctaLabel={ctaLabel}
        />
      ))}

      <MetricsSection metrics={metrics} />

      {sections.slice(2).map((s, i) => (
        <CapabilitySection
          key={s.id}
          id={s.id}
          index={i + 2}
          title={s.title}
          description={s.desc}
          image={s.image}
          ctaLabel={ctaLabel}
        />
      ))}

      <ParallaxSection
        backgroundImage="/images/homepage/oem-product.jpg"
        speed={0.2}
        overlayOpacity={0.92}
        className="py-20 md:py-32"
      >
        <ScrollReveal>
          <div className="text-center section-padding">
            <div className="label-tag mb-4">{t.sections_label ?? 'PRODUCT LINES'}</div>
            <h2 className="font-display uppercase text-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-8">
              {t.cta_headline ?? 'Explore Our OEM Solutions'}
            </h2>
            <Link href={`/${locale}/contact-us`} className="btn-primary">
              {t.contact_cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </ParallaxSection>
    </>
  );
}
