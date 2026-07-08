'use client';

import Link from 'next/link';
import MachineryHero from '@/components/machinery/MachineryHero';
import CapabilityNav from '@/components/machinery/CapabilityNav';
import CapabilitySection from '@/components/machinery/CapabilitySection';
import MetricsSection from '@/components/machinery/MetricsSection';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxSection from '@/components/ParallaxSection';

interface ManufacturingPageClientProps {
  dict: Record<string, any>;
  locale: string;
}

export default function ManufacturingPageClient({ dict, locale }: ManufacturingPageClientProps) {
  const t = dict.manufacturing;

  const sections = [
    { id: 'stampings', title: t.stampings_title, desc: t.stampings_desc, image: '/images/portfolio/STAMPINGS.png' },
    { id: 'forgings', title: t.forgings_title, desc: t.forgings_desc, image: '/images/portfolio/FORGINGS.png' },
    { id: 'rubber-plastics', title: t.rubber_title, desc: t.rubber_desc, image: '/images/portfolio/RUBBER-PLASTICS.png' },
    { id: 'castings', title: t.castings_title, desc: t.castings_desc, image: '/images/portfolio/CASTINGS-SINTERING-MIM.png' },
    { id: 'cnc-machining', title: t.cnc_title, desc: t.cnc_desc, image: '/images/portfolio/CNC-MACHINED-PARTS.png' },
    { id: 'electronics', title: t.electronics_title, desc: t.electronics_desc, image: '/images/portfolio/ELECTORNICS.png' },
    { id: 'fasteners', title: t.fasteners_title, desc: t.fasteners_desc, image: '/images/portfolio/FASTENERS.png' },
    { id: 'custom', title: t.custom_title, desc: t.custom_desc, image: '/images/portfolio/CUSTOM.png' },
  ];

  const metrics = [
    { value: '20+', label: t.metric_partners ?? 'Manufacturing Partners' },
    { value: '100%', label: t.metric_taiwan ?? 'Made in Taiwan' },
    { value: '8', label: t.metric_capabilities ?? 'Capability Areas' },
    { value: '50+', label: t.metric_countries ?? 'Countries Served' },
  ];

  const ctaLabel = t.explore_cta ?? 'Explore Capability';

  return (
    <>
      <MachineryHero
        headline={t.hero_headline ?? 'Precision Parts Manufacturing'}
        subtext={t.hero_subtext ?? t.hero_text}
        backgroundImage="/images/homepage/Lead_image-manufacturing.jpg"
        scrollLabel={t.scroll_label ?? 'Scroll'}
        ghostText="MANUFACTURING"
        tag={t.page_title}
      />

      <CapabilityNav
        items={sections.map(s => ({ id: s.id, title: s.title }))}
        label={t.sections_label}
      />

      {sections.slice(0, 3).map((s, i) => (
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

      {sections.slice(3).map((s, i) => (
        <CapabilitySection
          key={s.id}
          id={s.id}
          index={i + 3}
          title={s.title}
          description={s.desc}
          image={s.image}
          ctaLabel={ctaLabel}
        />
      ))}

      <ParallaxSection
        backgroundImage="/images/homepage/Lead_image-manufacturing.jpg"
        speed={0.2}
        overlayOpacity={0.92}
        className="py-20 md:py-32"
      >
        <ScrollReveal>
          <div className="text-center section-padding">
            <div className="label-tag mb-4">{t.sections_label}</div>
            <h2 className="font-display uppercase text-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-8">
              {t.cta_headline ?? 'Ready to Source World-Class Parts?'}
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
