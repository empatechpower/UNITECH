'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import MachineryHero from '@/components/machinery/MachineryHero';
import MetricsSection from '@/components/machinery/MetricsSection';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxSection from '@/components/ParallaxSection';
import TechnicalOverlay from '@/components/machinery/TechnicalOverlay';

interface PartnershipsPageClientProps {
  dict: Record<string, any>;
  locale: string;
}

function BenefitCard({ title, desc, icon, index }: { title: string; desc: string; icon: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={ref}
      className={`relative p-8 lg:p-10 border transition-all duration-700 ease-out h-full group ${
        hovered ? 'border-accent-cyan/30 bg-navy-800/50' : 'border-steel-700/15 bg-navy-800/20'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-cyan to-transparent transition-transform duration-500 origin-left ${
        hovered ? 'scale-x-100' : 'scale-x-0'
      }`} />

      <div className="flex items-center gap-3 mb-6">
        <span className="font-micro text-accent-cyan/40 text-[10px] tracking-[0.2em]">{num}</span>
        <span className="text-accent-cyan/50 text-2xl">{icon}</span>
      </div>

      <h3 className="font-display uppercase text-white text-lg sm:text-xl tracking-wide mb-4">{title}</h3>
      <div className="gradient-line w-12 mb-5" />
      <p className="text-steel-400 text-sm sm:text-base leading-relaxed">{desc}</p>
    </div>
  );
}

export default function PartnershipsPageClient({ dict, locale }: PartnershipsPageClientProps) {
  const t = dict.partnerships;

  const benefits = [
    { title: t.benefit1_title, desc: t.benefit1_desc, icon: '⟐' },
    { title: t.benefit2_title, desc: t.benefit2_desc, icon: '◈' },
    { title: t.benefit3_title, desc: t.benefit3_desc, icon: '⬡' },
  ];

  const metrics = [
    { value: '25+', label: t.metric_years ?? 'Years of Partnerships' },
    { value: '100%', label: t.metric_taiwan ?? 'Taiwan SME Network' },
    { value: '15+', label: t.metric_transfers ?? 'Technology Transfers' },
    { value: '30+', label: t.metric_countries ?? 'Countries Reached' },
  ];

  return (
    <>
      <MachineryHero
        headline={t.hero_headline ?? 'Techno-Commercial Partnerships'}
        subtext={t.hero_subtext ?? t.subtitle}
        backgroundImage="/images/portfolio/PARTNERSHIPS.png"
        scrollLabel={t.scroll_label ?? 'Scroll'}
        ghostText="PARTNERS"
        tag={t.page_title}
      />

      {/* Description */}
      <section className="relative py-20 md:py-28">
        <TechnicalOverlay index={0} variant="left" />
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="label-tag mb-4">{t.page_title}</div>
                <h2 className="font-display uppercase text-white text-2xl sm:text-3xl md:text-4xl tracking-wide leading-[1.1] mb-6">
                  {t.headline}
                </h2>
                <div className="gradient-line w-16" />
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollReveal delay={150}>
                <p className="text-steel-300 text-base sm:text-lg leading-relaxed mb-6">{t.para1}</p>
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <p className="text-steel-400 text-base sm:text-lg leading-relaxed">{t.para2}</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
        <div className="section-padding mt-12">
          <div className="h-px bg-gradient-to-r from-transparent via-steel-700/15 to-transparent" />
        </div>
      </section>

      <MetricsSection metrics={metrics} />

      {/* Benefits */}
      <section className="relative py-16 md:py-24">
        <div className="section-padding">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="label-tag mb-4">{t.benefits_label ?? 'WHY PARTNER WITH US'}</div>
              <h2 className="font-display uppercase text-white text-2xl sm:text-3xl md:text-4xl tracking-wide">
                {t.benefits_headline ?? 'Partnership Advantages'}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((b, i) => (
              <BenefitCard key={b.title} title={b.title} desc={b.desc} icon={b.icon} index={i} />
            ))}
          </div>
        </div>
        <div className="section-padding mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-steel-700/15 to-transparent" />
        </div>
      </section>

      {/* CTA */}
      <ParallaxSection
        backgroundImage="/images/homepage/partnerships.jpg"
        speed={0.2}
        overlayOpacity={0.92}
        className="py-20 md:py-32"
      >
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center section-padding">
            <div className="label-tag mb-4">{t.page_title}</div>
            <h2 className="font-display uppercase text-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-4">{t.cta_title}</h2>
            <div className="gradient-line w-16 mx-auto mb-6" />
            <p className="text-steel-300 text-base leading-relaxed mb-10">{t.cta_desc}</p>
            <Link href={`/${locale}/contact-us`} className="btn-primary">
              {t.cta_button}
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
