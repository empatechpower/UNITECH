'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServicesPageClientProps {
  locale: string;
  t: {
    hero_eyebrow: string;
    hero_heading_1: string;
    hero_heading_2: string;
    hero_heading_3: string;
    hero_desc: string;
    hero_cta_explore: string;
    hero_cta_quote: string;
    hero_scroll: string;
    machinery_title: string;
    machinery_desc: string;
    manufacturing_title: string;
    manufacturing_desc: string;
    oem_title: string;
    oem_desc: string;
    partnerships_title: string;
    partnerships_desc: string;
    explore: string;
    featured_label: string;
    featured_title: string;
    featured_desc: string;
    featured_adv_1: string;
    featured_adv_2: string;
    featured_adv_3: string;
    featured_cta: string;
    trust_label: string;
    trust_title: string;
    trust_metric_partners: string;
    trust_metric_taiwan: string;
    trust_metric_countries: string;
    trust_metric_oem: string;
    process_label: string;
    process_title: string;
    process_desc: string;
    process_step_1: string;
    process_step_2: string;
    process_step_3: string;
    process_step_4: string;
    process_step_5: string;
    process_step_6: string;
    cta_title: string;
    cta_desc: string;
    cta_quote: string;
    cta_contact: string;
  };
}

/* ------------------------------------------------------------------ */
/*  Reusable scroll-reveal hook                                       */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                  */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !counted.current) {
        counted.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          el.textContent = Math.round(ease * end) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(e.target);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, suffix, duration]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ================================================================== */
/*  MAIN COMPONENT                                                    */
/* ================================================================== */
export default function ServicesPageClient({ locale, t }: ServicesPageClientProps) {
  /* ---- parallax + mouse state ---- */
  const heroRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const rafId = useRef(0);

  const updateParallax = useCallback(() => {
    if (!heroRef.current || isMobile) return;
    const rect = heroRef.current.getBoundingClientRect();
    setOffsetY(rect.top * 0.35);
    rafId.current = requestAnimationFrame(updateParallax);
  }, [isMobile]);

  useEffect(() => {
    const mobile =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsMobile(mobile);
    if (!mobile) { rafId.current = requestAnimationFrame(updateParallax); }
    return () => cancelAnimationFrame(rafId.current);
  }, [updateParallax]);

  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [isMobile]);


  /* ---- data ---- */
  const services = [
    {
      title: t.machinery_title,
      desc: t.machinery_desc,
      href: `/${locale}/services/machinery`,
      image: '/images/homepage/DSC_0015-machinery.jpg',
      count: '6',
      countLabel: locale === 'en' ? 'Capabilities' : '技術能力',
    },
    {
      title: t.manufacturing_title,
      desc: t.manufacturing_desc,
      href: `/${locale}/services/manufacturing`,
      image: '/images/homepage/Lead_image-manufacturing.jpg',
      count: '8',
      countLabel: locale === 'en' ? 'Capabilities' : '技術能力',
    },
    {
      title: t.oem_title,
      desc: t.oem_desc,
      href: `/${locale}/services/oem-products`,
      image: '/images/homepage/oem-product.jpg',
      count: '4',
      countLabel: locale === 'en' ? 'Product Lines' : '產品線',
    },
    {
      title: t.partnerships_title,
      desc: t.partnerships_desc,
      href: `/${locale}/services/partnerships`,
      image: '/images/homepage/partnerships.jpg',
      count: '3',
      countLabel: locale === 'en' ? 'Models' : '合作模式',
    },
  ];

  const processSteps = [
    t.process_step_1,
    t.process_step_2,
    t.process_step_3,
    t.process_step_4,
    t.process_step_5,
    t.process_step_6,
  ];

  const trustMetrics = [
    { value: 20, suffix: '+', label: t.trust_metric_partners },
    { value: 100, suffix: '%', label: t.trust_metric_taiwan },
    { value: 40, suffix: '+', label: t.trust_metric_countries },
    { value: 0, suffix: '', label: t.trust_metric_oem, display: 'OEM' },
  ];

  const advantages = [t.featured_adv_1, t.featured_adv_2, t.featured_adv_3];

  /* ---- reveal hooks ---- */
  const featuredReveal = useReveal();
  const trustReveal = useReveal();
  const processReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center overflow-hidden"
      >
        {/* bg image */}
        <div
          className="absolute inset-0"
          style={!isMobile ? { transform: `translateY(${offsetY * 0.3}px)` } : undefined}
        >
          <Image
            src="/images/solutions/bg-Metal.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-950/80" />
        </div>

        {/* blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.04] animate-grid-drift pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* radial glow */}
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-cyan/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />

        {/* vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 60px rgba(6,14,26,0.7)' }} />

        {/* ghost text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-micro text-[12vw] lg:text-[180px] tracking-[0.15em] uppercase text-transparent"
            style={{ WebkitTextStroke: '1px rgba(6,182,212,0.06)' }}>
            SERVICES
          </span>
        </div>

        {/* content */}
        <div className="relative section-padding w-full pt-32 pb-40 lg:pt-40 lg:pb-32 z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-6 max-w-[1440px] mx-auto">
            {/* LEFT */}
            <div className="lg:w-[55%] lg:min-w-0">
              <div className="label-tag mb-6 animate-fade-in">{t.hero_eyebrow}</div>
              <div className="gradient-line w-16 mb-8 animate-fade-in animate-delay-100" />

              <h1 className="mb-8">
                <span className="block heading-micro text-lg tracking-normal sm:tracking-[0.2em] sm:text-2xl md:text-3xl xl:text-4xl text-white leading-[1.08] animate-fade-up break-words">
                  {t.hero_heading_1}
                </span>
                <span className="block heading-micro text-lg tracking-normal sm:tracking-[0.2em] sm:text-2xl md:text-3xl xl:text-4xl text-accent-cyan leading-[1.08] mt-1 animate-fade-up animate-delay-200 break-words">
                  {t.hero_heading_2}
                </span>
                <span className="block heading-micro text-lg tracking-normal sm:tracking-[0.2em] sm:text-2xl md:text-3xl xl:text-4xl text-steel-400 leading-[1.08] mt-1 animate-fade-up animate-delay-300 break-words">
                  {t.hero_heading_3}
                </span>
              </h1>

              <p className="text-steel-300 text-base sm:text-lg leading-relaxed max-w-xl mb-10 animate-fade-up animate-delay-400">
                {t.hero_desc}
              </p>

              <div className="flex flex-wrap items-center gap-5 animate-fade-up animate-delay-500">
                <a
                  href="#services-grid"
                  className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-4 bg-accent-cyan text-navy-950 font-micro text-xs tracking-[0.2em] uppercase font-bold hover:bg-accent-blue hover:shadow-lg hover:shadow-accent-cyan/20 transition-all duration-300"
                >
                  {t.hero_cta_explore}
                  <svg className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <Link
                  href={`/${locale}/contact-us`}
                  className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-4 bg-transparent border-2 border-accent-cyan/50 text-accent-cyan font-micro text-xs tracking-[0.2em] uppercase hover:bg-accent-cyan/10 hover:border-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/10 transition-all duration-300"
                >
                  {t.hero_cta_quote}
                  <svg className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* RIGHT — layered composition */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none lg:w-[45%] flex justify-center animate-fade-in animate-delay-500">
              <div className="lg:animate-float">
                <div
                  className="relative w-full lg:max-w-[420px]"
                  style={!isMobile ? {
                    transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 4}px)`,
                    transition: 'transform 0.3s ease-out',
                  } : undefined}
                >
                  {/* glass backdrop — desktop only */}
                  <div className="absolute -inset-5 bg-white/[0.02] backdrop-blur-[2px] border border-white/[0.04] hidden lg:block" />

                  {/* corner brackets */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 lg:w-8 lg:h-8 border-t border-l border-accent-cyan/40 z-10" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 lg:w-8 lg:h-8 border-t border-r border-accent-cyan/40 z-10" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 lg:w-8 lg:h-8 border-b border-l border-accent-cyan/40 z-10" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 lg:w-8 lg:h-8 border-b border-r border-accent-cyan/40 z-10" />

                  {/* main image */}
                  <div className="relative border border-steel-700/30 bg-navy-800/30 backdrop-blur-sm shadow-2xl shadow-navy-950/50 overflow-hidden">
                    {/* Scanning line — desktop only */}
                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden lg:block">
                      <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent animate-scan-line" />
                    </div>

                    <div className="relative h-40 sm:h-48 md:h-52 lg:h-[320px] overflow-hidden">
                      <Image
                        src="/images/solutions/mechanical.jpg"
                        alt="Precision manufacturing"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/20" />
                      <div className="absolute inset-0 bg-accent-cyan/[0.05]" />
                    </div>

                    {/* Card footer */}
                    <div className="px-4 py-3 lg:px-5 lg:py-4 flex items-center justify-between border-t border-steel-700/20 bg-navy-900/40">
                      <div>
                        <div className="font-mono text-[9px] lg:text-[10px] text-steel-400 tracking-wider uppercase">
                          Manufacturing Overview
                        </div>
                        <div className="font-mono text-[8px] lg:text-[9px] text-accent-cyan/50 tracking-wider mt-1">
                          Taiwan &bull; Global Delivery
                        </div>
                      </div>
                      <Image
                        src="/images/common/Made-in-TW-Logo.png"
                        alt="Made in Taiwan"
                        width={44}
                        height={44}
                        className="opacity-60 lg:w-12 lg:h-12"
                      />
                    </div>
                  </div>

                  {/* coordinate labels — desktop only */}
                  <div className="absolute -top-7 -left-4 text-accent-cyan/25 font-mono text-[10px] tracking-wider hidden lg:block">
                    SYS::MFG_OVERVIEW
                  </div>
                  <div className="absolute -bottom-8 right-0 font-micro text-[9px] tracking-[0.3em] text-steel-600 hidden lg:block">
                    24.9°N 121.5°E
                  </div>

                  {/* floating stat badge — desktop only */}
                  <div
                    className="absolute -right-16 top-8 bg-navy-900/80 backdrop-blur border border-steel-700/30 px-4 py-3 hidden lg:block"
                    style={!isMobile ? {
                      transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -3}px)`,
                      transition: 'transform 0.4s ease-out',
                    } : undefined}
                  >
                    <div className="font-micro text-accent-cyan text-lg tracking-wider">20+</div>
                    <div className="font-micro text-[8px] tracking-[0.3em] text-steel-500 mt-0.5">PARTNERS</div>
                  </div>

                  {/* floating TW badge — desktop only */}
                  <div
                    className="absolute -left-14 bottom-12 bg-navy-900/80 backdrop-blur border border-accent-cyan/20 px-3 py-2 hidden lg:block"
                    style={!isMobile ? {
                      transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -4}px)`,
                      transition: 'transform 0.5s ease-out',
                    } : undefined}
                  >
                    <div className="font-micro text-[8px] tracking-[0.3em] text-accent-cyan">100% TAIWAN</div>
                  </div>

                  {/* Dashed connecting lines — desktop only */}
                  <div className="absolute -bottom-8 left-1/2 w-[1px] h-8 border-l border-dashed border-accent-cyan/20 hidden lg:block" />
                </div>
              </div>
            </div>
          </div>

          {/* scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="font-micro text-[9px] tracking-[0.3em] text-steel-500">{t.hero_scroll}</span>
            <div className="relative w-[1px] h-12 bg-steel-700/40 overflow-hidden">
              <div className="absolute w-full h-3 bg-accent-cyan/60 animate-scroll-line" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SERVICES GRID — editorial asymmetric                        */}
      {/* ============================================================ */}
      <section id="services-grid" className="relative py-20 md:py-32 overflow-hidden">
        {/* subtle bg gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950 pointer-events-none" />

        <div className="relative section-padding space-y-6 lg:space-y-8">

          {/* ROW 1: Large featured Machinery card */}
          <div>
            <ServiceCardLarge
              title={services[0].title}
              desc={services[0].desc}
              href={services[0].href}
              image={services[0].image}
              count={services[0].count}
              countLabel={services[0].countLabel}
              explore={t.explore}
              index={0}
            />
          </div>

          {/* ROW 2: Two medium cards — Manufacturing + OEM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <ServiceCard
                title={services[1].title}
                desc={services[1].desc}
                href={services[1].href}
                image={services[1].image}
                count={services[1].count}
                countLabel={services[1].countLabel}
                explore={t.explore}
                index={1}
              />
            </div>
            <div>
              <ServiceCard
                title={services[2].title}
                desc={services[2].desc}
                href={services[2].href}
                image={services[2].image}
                count={services[2].count}
                countLabel={services[2].countLabel}
                explore={t.explore}
                index={2}
              />
            </div>
          </div>

          {/* ROW 3: Wide horizontal Partnerships */}
          <div>
            <ServiceCardWide
              title={services[3].title}
              desc={services[3].desc}
              href={services[3].href}
              image={services[3].image}
              count={services[3].count}
              countLabel={services[3].countLabel}
              explore={t.explore}
              index={3}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURED CAPABILITY                                         */}
      {/* ============================================================ */}
      <section ref={featuredReveal.ref} className="relative py-24 md:py-40 overflow-hidden">
        {/* bg image — subdued: blur + desaturate + darken */}
        <div className="absolute inset-0">
          <Image
            src="/images/solutions/slot-punch-array.jpg"
            alt=""
            fill
            className="object-cover blur-[3px] saturate-[0.8] brightness-[0.85]"
          />
          {/* primary dark overlay */}
          <div className="absolute inset-0 bg-navy-950/[0.72]" />
          {/* left-to-right gradient behind text column */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent" />
          {/* vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 60px rgba(5,10,20,0.6)' }} />
        </div>

        {/* blueprint grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className={`relative section-padding transition-all duration-1000 ${featuredReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-14 lg:gap-24 items-center">
              {/* image — reduced ~12% via max-w, softened overlay */}
              <div className="flex-1 relative max-w-md lg:max-w-none">
                <div className="relative aspect-[4/3] overflow-hidden lg:scale-[0.88] lg:origin-center">
                  <Image
                    src="/images/solutions/mechanical2.jpg"
                    alt="Precision Manufacturing"
                    fill
                    className="object-cover brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-950/50 via-navy-950/20 to-navy-950/30" />
                </div>
                {/* corner brackets */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-accent-cyan/20 lg:scale-[0.88] lg:origin-top-left" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-accent-cyan/20 lg:scale-[0.88] lg:origin-bottom-right" />
              </div>

              {/* content — glass panel backing */}
              <div className="flex-1 relative">
                {/* subtle glass panel */}
                <div className="absolute -inset-8 lg:-inset-10 bg-[rgba(5,10,20,0.35)] backdrop-blur-sm rounded-sm -z-10" />

                <div className="label-tag mb-5">{t.featured_label}</div>
                <div className="gradient-line w-12 mb-8" />

                <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-white mb-8 leading-[1.08]">
                  {t.featured_title}
                </h2>

                <p className="text-steel-200/90 text-base leading-[1.8] mb-10 max-w-[52ch]">
                  {t.featured_desc}
                </p>

                {/* advantages */}
                <div className="space-y-5 mb-14">
                  {advantages.map((adv, i) => (
                    <div key={i} className="flex items-center gap-3.5">
                      <div className="w-1.5 h-1.5 bg-accent-cyan flex-shrink-0" />
                      <span className="font-micro text-[11px] tracking-[0.15em] text-steel-100/80 uppercase">{adv}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/${locale}/services/manufacturing`}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-accent-cyan/10 border-2 border-accent-cyan/50 text-accent-cyan font-micro text-xs tracking-[0.2em] uppercase hover:bg-accent-cyan/20 hover:border-accent-cyan/80 hover:text-white transition-all duration-300 group"
                >
                  {t.featured_cta}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TRUST METRICS                                               */}
      {/* ============================================================ */}
      <section ref={trustReveal.ref} className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className={`relative section-padding transition-all duration-1000 ${trustReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-16">
            <div className="label-tag mb-4">{t.trust_label}</div>
            <div className="gradient-line w-12 mx-auto mb-6" />
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              {t.trust_title}
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {trustMetrics.map((m, i) => (
              <div key={i} className={`text-center ${i < trustMetrics.length - 1 ? 'lg:border-r lg:border-steel-700/30' : ''}`}>
                <div className="heading-display text-5xl sm:text-6xl lg:text-7xl text-white mb-2">
                  {m.display ? (
                    <span>{m.display}</span>
                  ) : (
                    <AnimatedCounter end={m.value} suffix={m.suffix} />
                  )}
                </div>
                <div className="font-micro text-[10px] tracking-[0.25em] text-steel-500 uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROCESS TIMELINE                                            */}
      {/* ============================================================ */}
      <section ref={processReveal.ref} className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/40 to-navy-950" />

        <div className={`relative section-padding transition-all duration-1000 ${processReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-16 lg:mb-20">
            <div className="label-tag mb-4">{t.process_label}</div>
            <div className="gradient-line w-12 mx-auto mb-6" />
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
              {t.process_title}
            </h2>
            <p className="text-steel-400 text-base max-w-xl mx-auto leading-relaxed">
              {t.process_desc}
            </p>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block max-w-6xl mx-auto">
            <div className="relative">
              {/* connecting line */}
              <div className="absolute top-6 left-[8%] right-[8%] h-[1px] bg-steel-700/40" />

              <div className="grid grid-cols-6 gap-4">
                {processSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center"
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    {/* numbered square */}
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-navy-950 border border-accent-cyan/40 mb-5">
                      <span className="font-micro text-sm text-accent-cyan tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="font-micro text-[10px] tracking-[0.2em] text-steel-300 uppercase leading-tight">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="lg:hidden max-w-sm mx-auto">
            <div className="relative pl-10">
              {/* vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-steel-700/40" />

              <div className="space-y-8">
                {processSteps.map((step, i) => (
                  <div key={i} className="relative flex items-center gap-4">
                    <div className="absolute left-[-18px] w-10 h-10 flex items-center justify-center bg-navy-950 border border-accent-cyan/40">
                      <span className="font-micro text-xs text-accent-cyan tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="font-micro text-[11px] tracking-[0.15em] text-steel-300 uppercase">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                   */}
      {/* ============================================================ */}
      <section ref={ctaReveal.ref} className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />

        {/* radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-cyan/[0.04] rounded-full blur-[120px] pointer-events-none" />

        {/* blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* gradient borders */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />

        <div className={`relative section-padding text-center transition-all duration-1000 ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 leading-tight">
            {t.cta_title}
          </h2>
          <p className="text-steel-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            {t.cta_desc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact-us`} className="btn-solid group">
              {t.cta_quote}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link href={`/${locale}/contact-us`} className="btn-primary group">
              {t.cta_contact}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ================================================================== */
/*  SERVICE CARD COMPONENTS                                           */
/* ================================================================== */

interface CardProps {
  title: string;
  desc: string;
  href: string;
  image: string;
  count: string;
  countLabel: string;
  explore: string;
  index: number;
}

/* Large featured card — full width, taller image */
function ServiceCardLarge({ title, desc, href, image, count, countLabel, explore, index }: CardProps) {
  const reveal = useReveal();
  return (
    <div ref={reveal.ref} className={`transition-all duration-700 ${reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <Link href={href} className="group block relative overflow-hidden bg-navy-800/40 border border-steel-700/20 hover:border-accent-cyan/30 transition-all duration-500">
        {/* top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-cyan via-accent-blue to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 z-10" />

        <div className="flex flex-col lg:flex-row">
          {/* image — 65% */}
          <div className="relative lg:w-[65%] h-64 sm:h-80 lg:h-[420px] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/30 via-transparent to-navy-950/70 lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/80" />

            {/* ghost number */}
            <div className="absolute bottom-4 left-6 font-micro text-[80px] lg:text-[120px] leading-none text-white/[0.04] tracking-wider pointer-events-none">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          {/* content — 35% */}
          <div className="lg:w-[35%] p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="heading-micro text-3xl lg:text-4xl text-accent-cyan">{count}</span>
              <span className="font-micro text-[9px] tracking-[0.3em] text-steel-500 uppercase">{countLabel}</span>
            </div>

            <h2 className="heading-display text-2xl sm:text-3xl lg:text-4xl text-white mb-4 leading-tight">
              {title}
            </h2>

            <p className="text-steel-400 text-sm leading-relaxed mb-8">
              {desc}
            </p>

            <span className="inline-flex items-center gap-2 font-micro text-[11px] tracking-[0.2em] text-accent-cyan uppercase group-hover:text-white transition-colors duration-300">
              {explore}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>

            {/* corner bracket bottom-right */}
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent-cyan/0 group-hover:border-accent-cyan/40 transition-all duration-500" />
          </div>
        </div>
      </Link>
    </div>
  );
}

/* Medium card — equal grid */
function ServiceCard({ title, desc, href, image, count, countLabel, explore, index }: CardProps) {
  const reveal = useReveal();
  return (
    <div ref={reveal.ref} className={`transition-all duration-700 h-full ${reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}>
      <Link href={href} className="group block relative h-full overflow-hidden bg-navy-800/40 border border-steel-700/20 hover:border-accent-cyan/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.06)]">
        {/* top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-cyan via-accent-blue to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 z-10" />

        {/* image — taller ratio */}
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

          {/* capability count */}
          <div className="absolute bottom-4 right-5 flex items-baseline gap-1.5">
            <span className="heading-micro text-2xl text-accent-cyan">{count}</span>
            <span className="font-micro text-[9px] tracking-[0.25em] text-steel-500 uppercase">{countLabel}</span>
          </div>

          {/* ghost number */}
          <div className="absolute top-4 left-5 font-micro text-[60px] leading-none text-white/[0.04] tracking-wider pointer-events-none">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* content */}
        <div className="p-6 lg:p-8">
          <h2 className="heading-display text-xl sm:text-2xl text-white mb-3 leading-tight">
            {title}
          </h2>
          <p className="text-steel-400 text-sm leading-relaxed mb-6">
            {desc}
          </p>
          <span className="inline-flex items-center gap-2 font-micro text-[11px] tracking-[0.2em] text-accent-cyan uppercase group-hover:text-white transition-colors duration-300">
            {explore}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </span>
        </div>

        {/* corner brackets on hover */}
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-accent-cyan/0 group-hover:border-accent-cyan/30 transition-all duration-500" />
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent-cyan/0 group-hover:border-accent-cyan/30 transition-all duration-500" />
      </Link>
    </div>
  );
}

/* Wide horizontal card */
function ServiceCardWide({ title, desc, href, image, count, countLabel, explore, index }: CardProps) {
  const reveal = useReveal();
  return (
    <div ref={reveal.ref} className={`transition-all duration-700 ${reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <Link href={href} className="group block relative overflow-hidden bg-navy-800/40 border border-steel-700/20 hover:border-accent-cyan/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.06)]">
        {/* top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-cyan via-accent-blue to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 z-10" />

        <div className="flex flex-col md:flex-row">
          {/* image — 45% */}
          <div className="relative md:w-[45%] h-56 md:h-auto min-h-[240px] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-950/60 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent md:hidden" />

            {/* ghost number */}
            <div className="absolute bottom-4 left-6 font-micro text-[80px] leading-none text-white/[0.04] tracking-wider pointer-events-none">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          {/* content — 55% */}
          <div className="md:w-[55%] p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="heading-micro text-2xl text-accent-cyan">{count}</span>
              <span className="font-micro text-[9px] tracking-[0.3em] text-steel-500 uppercase">{countLabel}</span>
            </div>

            <h2 className="heading-display text-2xl sm:text-3xl text-white mb-4 leading-tight">
              {title}
            </h2>

            <p className="text-steel-400 text-sm leading-relaxed mb-8 max-w-lg">
              {desc}
            </p>

            <span className="inline-flex items-center gap-2 font-micro text-[11px] tracking-[0.2em] text-accent-cyan uppercase group-hover:text-white transition-colors duration-300">
              {explore}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </div>
        </div>

        {/* corner brackets */}
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent-cyan/0 group-hover:border-accent-cyan/40 transition-all duration-500" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-accent-cyan/0 group-hover:border-accent-cyan/40 transition-all duration-500" />
      </Link>
    </div>
  );
}
