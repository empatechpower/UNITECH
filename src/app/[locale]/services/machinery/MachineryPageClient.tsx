'use client';

import Link from 'next/link';
import MachineryHero from '@/components/machinery/MachineryHero';
import CapabilityNav from '@/components/machinery/CapabilityNav';
import CapabilitySection from '@/components/machinery/CapabilitySection';
import MetricsSection from '@/components/machinery/MetricsSection';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxSection from '@/components/ParallaxSection';

interface MachineryPageClientProps {
  dict: Record<string, any>;
  locale: string;
}

export default function MachineryPageClient({ dict, locale }: MachineryPageClientProps) {
  const t = dict.machinery;

  const sections = [
    { id: 'metal-working', title: t.metal_working_title, desc: t.metal_working_desc, image: '/images/solutions/metal-working.png' },
    { id: 'cnc-machining-cells', title: t.cnc_title, desc: t.cnc_desc, image: '/images/portfolio/cnc-machining.png' },
    { id: 'welding-cells', title: t.welding_title, desc: t.welding_desc, image: '/images/portfolio/welding-cells.png' },
    { id: 'assembly-automation', title: t.assembly_title, desc: t.assembly_desc, image: '/images/portfolio/assembly-automation.png' },
    { id: 'polymer-moulding', title: t.polymer_title, desc: t.polymer_desc, image: '/images/portfolio/polymer-moulding.png' },
    { id: 'food-processing', title: t.food_title, desc: t.food_desc, image: '/images/portfolio/FOOD-PROCESSING-AND-PRESERVATION-MACHINERY.png' },
  ];

  const metrics = [
    { value: '25+', label: t.metric_years ?? 'Years of Engineering Experience' },
    { value: '120+', label: t.metric_lines ?? 'Integrated Production Lines' },
    { value: '18+', label: t.metric_industries ?? 'Industries Served' },
    { value: '99.8%', label: t.metric_reliability ?? 'Reliability Focus' },
  ];

  const ctaLabel = t.explore_cta ?? 'Explore Capability';

  return (
    <>
      <MachineryHero
        headline={t.hero_headline ?? 'Integrated Manufacturing Systems'}
        subtext={t.hero_subtext ?? t.hero_text}
        backgroundImage="/images/homepage/DSC_0015-machinery.jpg"
        scrollLabel={t.scroll_label ?? 'Scroll'}
      />

      <CapabilityNav
        items={sections.map(s => ({ id: s.id, title: s.title }))}
        label={t.sections_label}
      />

      {/* First two capabilities */}
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

      {/* Metrics after first two capabilities */}
      <MetricsSection metrics={metrics} />

      {/* Remaining capabilities */}
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

      {/* Bottom CTA */}
      <ParallaxSection
        backgroundImage="/images/solutions/metal-working.png"
        speed={0.2}
        overlayOpacity={0.92}
        className="py-20 md:py-32"
      >
        <ScrollReveal>
          <div className="text-center section-padding">
            <div className="label-tag mb-4">{t.sections_label}</div>
            <h2 className="font-display uppercase text-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-8">
              {t.cta_headline ?? 'Ready to Engineer Your Next Line?'}
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
