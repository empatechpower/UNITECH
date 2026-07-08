'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

interface AboutPageClientProps {
  locale: string;
  dict: Record<string, any>;
}

function MetricCounter({
  target,
  suffix,
  label,
  isVisible,
}: {
  target: number;
  suffix: string;
  label: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start: number | null = null;
    let raf: number;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 2000, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, target]);

  return (
    <div className="text-center lg:px-8">
      <div className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ink mb-2 tabular-nums">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="font-ui text-xs text-graphite tracking-[0.15em] uppercase">
        {label}
      </div>
    </div>
  );
}

export default function AboutPageClient({ locale, dict }: AboutPageClientProps) {
  const t = dict.about;

  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (metricsRef.current) observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  const stories = [
    { title: t.story_global_title, desc: t.para1 },
    { title: t.story_parts_title, desc: t.para2 },
    { title: t.story_tech_title, desc: t.para3 },
    { title: t.story_trust_title, desc: t.para5 },
  ];

  const verticals = [
    {
      title: t.vert_machinery,
      desc: t.vert_machinery_desc,
      image: '/images/homepage/DSC_0015-machinery.jpg',
      href: `/${locale}/services/machinery`,
    },
    {
      title: t.vert_parts,
      desc: t.vert_parts_desc,
      image: '/images/homepage/Lead_image-manufacturing.jpg',
      href: `/${locale}/services/manufacturing`,
    },
    {
      title: t.vert_tech,
      desc: t.vert_tech_desc,
      image: '/images/homepage/oem-product.jpg',
      href: `/${locale}/services/oem-products`,
    },
  ];

  const metrics = [
    { target: 20, suffix: '+', label: t.stat_partners_label },
    { target: 100, suffix: '%', label: t.stat_taiwan_label },
    { target: 40, suffix: '+', label: t.stat_markets_label },
    { target: 3, suffix: '', label: t.stat_verticals_label },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink font-ui">
        <Image
          src="/images/homepage-editorial/hero.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/50" />

        <div className="relative z-10 h-full flex flex-col items-start justify-end section-padding pb-20 md:pb-28 max-w-[1440px] mx-auto">
          <p className="eyebrow !text-white/70 mb-6">{t.hero_label}</p>
          <h1 className="editorial-heading !text-white text-4xl sm:text-6xl md:text-7xl max-w-3xl mb-8">
            {t.headline}
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
            {t.para6}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/services`} className="btn-editorial">
              {t.hero_cta}
            </Link>
            <Link href={`/${locale}/contact-us`} className="btn-editorial-outline !border-white/30 !text-white hover:!border-white hover:!bg-white/10">
              {t.cta_button}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== METRICS ===== */}
      <section ref={metricsRef} className="relative bg-paper font-ui py-16 md:py-20">
        <div className="absolute inset-0 grid-technical opacity-30" />
        <div className="relative section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-concrete">
            {metrics.map((m, i) => (
              <MetricCounter key={i} {...m} isVisible={metricsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPANY STORY ===== */}
      <section className="relative bg-warm-white font-ui py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <ScrollReveal>
            <p className="eyebrow mb-16">{t.story_label}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {stories.map((s, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div
                  className={`p-8 lg:p-10 bg-paper border border-concrete hover:border-accent/30 transition-colors duration-500 h-full ${
                    i % 2 === 1 ? 'lg:mt-8' : ''
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <span className="font-editorial text-5xl lg:text-6xl text-accent/15 leading-none italic shrink-0">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-editorial text-xl lg:text-2xl text-ink mb-3 tracking-[-0.01em]">
                        {s.title}
                      </h3>
                      <p className="text-graphite text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MADE IN TAIWAN STATEMENT ===== */}
      <section className="relative bg-ink font-ui py-28 md:py-40 overflow-hidden">
        <Image
          src="/images/homepage-editorial/advantage-reach.png"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 grid-technical opacity-10" />

        <ScrollReveal>
          <div className="relative z-10 text-center section-padding">
            <Image
              src="/images/common/Made-in-TW-Logo.png"
              alt="Made in Taiwan"
              width={80}
              height={80}
              className="mx-auto mb-10 opacity-80"
            />
            <h2 className="editorial-heading !text-white text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
              {t.taiwan_statement}
            </h2>
            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              {t.taiwan_subtitle}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== THREE VERTICALS ===== */}
      <section className="relative bg-warm-white font-ui py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <ScrollReveal>
            <p className="eyebrow mb-16">{t.verticals_title}</p>
          </ScrollReveal>

          {/* Featured vertical — full-width horizontal */}
          <ScrollReveal>
            <Link
              href={verticals[0].href}
              className="group block mb-6 relative bg-paper border border-concrete overflow-hidden transition-colors duration-500 hover:border-accent/40"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="relative lg:w-[60%] h-64 sm:h-72 lg:h-80 overflow-hidden">
                  <Image
                    src={verticals[0].image}
                    alt={verticals[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center">
                  <span className="font-editorial text-5xl text-accent/15 italic mb-4">01</span>
                  <h3 className="font-editorial text-2xl text-ink mb-4 tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
                    {verticals[0].title}
                  </h3>
                  <p className="text-graphite text-sm leading-relaxed mb-6">{verticals[0].desc}</p>
                  <span className="inline-flex items-center gap-2 text-ink text-xs tracking-[0.2em] uppercase font-semibold group-hover:text-accent transition-colors duration-300">
                    {dict.home?.learn_more ?? 'Learn More'}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Remaining verticals — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verticals.slice(1).map((v, i) => (
              <ScrollReveal key={v.title} delay={(i + 1) * 120}>
                <Link
                  href={v.href}
                  className="group block h-full relative bg-paper border border-concrete overflow-hidden transition-colors duration-500 hover:border-accent/40"
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7 lg:p-8">
                    <span className="font-editorial text-4xl text-accent/15 italic mb-2 block">0{i + 2}</span>
                    <h3 className="font-editorial text-xl text-ink mb-3 tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
                      {v.title}
                    </h3>
                    <p className="text-graphite text-sm leading-relaxed mb-5">{v.desc}</p>
                    <span className="inline-flex items-center gap-2 text-ink text-xs tracking-[0.2em] uppercase font-semibold group-hover:text-accent transition-colors duration-300">
                      {dict.home?.learn_more ?? 'Learn More'}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-ink font-ui py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-technical opacity-[0.08]" />
        <div className="absolute inset-0 mesh-glow opacity-60" />
        <ScrollReveal>
          <div className="relative z-10 text-center section-padding">
            <p className="eyebrow justify-center mb-6">{t.cta_title}</p>
            <h2 className="editorial-heading !text-white text-3xl sm:text-5xl md:text-6xl mb-10 max-w-2xl mx-auto">
              {t.cta_desc}
            </h2>
            <Link href={`/${locale}/contact-us`} className="btn-editorial !bg-warm-white !text-ink hover:!bg-accent hover:!text-warm-white">
              {t.cta_button}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
