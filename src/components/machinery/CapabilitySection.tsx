'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import TechnicalOverlay from './TechnicalOverlay';

interface CapabilitySectionProps {
  id: string;
  index: number;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
}

type LayoutVariant = 'wide-left' | 'wide-right' | 'hero-top' | 'offset-left' | 'offset-right' | 'split-deep';

const layouts: LayoutVariant[] = ['wide-left', 'wide-right', 'hero-top', 'offset-left', 'offset-right', 'split-deep'];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function SectionNumber({ index, visible }: { index: number; visible: boolean }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <span className={`font-display text-7xl sm:text-8xl md:text-9xl text-white/[0.04] leading-none select-none transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {num}
    </span>
  );
}

function ImageBlock({ src, alt, className, visible, delay = 0 }: { src: string; alt: string; className?: string; visible: boolean; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative overflow-hidden group ${className || ''} transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 ease-out ${hovered ? 'scale-105' : 'scale-100'}`}>
        <Image src={src} alt={alt} fill className={`object-cover transition-all duration-700 ${hovered ? 'brightness-110' : 'brightness-90'}`} />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/20" />
      {/* Cyan border on hover */}
      <div className={`absolute inset-0 border transition-all duration-500 ${hovered ? 'border-accent-cyan/40 shadow-[inset_0_0_30px_rgba(6,182,212,0.08)]' : 'border-steel-700/20'}`} />
    </div>
  );
}

function ContentBlock({ index, title, description, ctaLabel, visible, delay = 0 }: {
  index: number; title: string; description: string; ctaLabel: string; visible: boolean; delay?: number;
}) {
  return (
    <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex items-end gap-4 mb-6">
        <span className="font-micro text-accent-cyan/50 text-[11px] tracking-[0.2em]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="gradient-line flex-1 max-w-16" />
      </div>

      <h2 className="font-display uppercase text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.05] tracking-wide mb-6">
        {title}
      </h2>

      <p className="text-steel-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
        {description}
      </p>

      <a href="#" className="inline-flex items-center gap-3 text-accent-cyan font-micro text-[10px] sm:text-xs tracking-[0.2em] uppercase group/cta hover:gap-4 transition-all duration-300">
        {ctaLabel}
        <svg className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
}

export default function CapabilitySection({ id, index, title, description, image, ctaLabel }: CapabilitySectionProps) {
  const { ref, visible } = useScrollReveal();
  const layout = layouts[index % layouts.length];

  return (
    <div id={id} className="scroll-mt-[120px]" ref={ref}>
      {layout === 'wide-left' && (
        <div className="relative section-padding py-16 md:py-24">
          <TechnicalOverlay index={index} variant="left" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            <div className="lg:col-span-7 relative">
              <div className="absolute -top-12 -left-4 hidden lg:block">
                <SectionNumber index={index} visible={visible} />
              </div>
              <ImageBlock src={image} alt={title} className="h-72 sm:h-80 md:h-[420px] lg:h-[480px]" visible={visible} />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ContentBlock index={index} title={title} description={description} ctaLabel={ctaLabel} visible={visible} delay={200} />
            </div>
          </div>
        </div>
      )}

      {layout === 'wide-right' && (
        <div className="relative section-padding py-16 md:py-24">
          <TechnicalOverlay index={index} variant="right" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            <div className="lg:col-span-4 order-2 lg:order-1">
              <ContentBlock index={index} title={title} description={description} ctaLabel={ctaLabel} visible={visible} delay={200} />
            </div>
            <div className="lg:col-span-7 lg:col-start-6 order-1 lg:order-2 relative">
              <div className="absolute -top-12 -right-4 hidden lg:block">
                <SectionNumber index={index} visible={visible} />
              </div>
              <ImageBlock src={image} alt={title} className="h-72 sm:h-80 md:h-[420px] lg:h-[480px]" visible={visible} />
            </div>
          </div>
        </div>
      )}

      {layout === 'hero-top' && (
        <div className="relative py-16 md:py-24">
          <TechnicalOverlay index={index} variant="center" />
          {/* Full-bleed image */}
          <div className="relative mx-4 sm:mx-8 md:mx-12 lg:mx-20 xl:mx-28 mb-10 md:mb-14">
            <ImageBlock src={image} alt={title} className="h-64 sm:h-80 md:h-[400px] lg:h-[480px]" visible={visible} />
            <div className="absolute -bottom-6 left-6 md:left-10 hidden md:block">
              <SectionNumber index={index} visible={visible} />
            </div>
          </div>
          <div className="section-padding">
            <div className="max-w-3xl">
              <ContentBlock index={index} title={title} description={description} ctaLabel={ctaLabel} visible={visible} delay={300} />
            </div>
          </div>
        </div>
      )}

      {layout === 'offset-left' && (
        <div className="relative section-padding py-16 md:py-24">
          <TechnicalOverlay index={index} variant="left" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
            <div className="lg:col-span-6 relative">
              <div className="mb-8 lg:mb-0">
                <SectionNumber index={index} visible={visible} />
              </div>
              <ContentBlock index={index} title={title} description={description} ctaLabel={ctaLabel} visible={visible} delay={100} />
            </div>
            <div className="lg:col-span-6 lg:-mt-8">
              <ImageBlock src={image} alt={title} className="h-72 sm:h-80 md:h-[400px] lg:h-[520px]" visible={visible} delay={250} />
            </div>
          </div>
        </div>
      )}

      {layout === 'offset-right' && (
        <div className="relative section-padding py-16 md:py-24">
          <TechnicalOverlay index={index} variant="right" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
            <div className="lg:col-span-6 order-2 lg:order-1 lg:-mt-8">
              <ImageBlock src={image} alt={title} className="h-72 sm:h-80 md:h-[400px] lg:h-[520px]" visible={visible} delay={250} />
            </div>
            <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2 relative">
              <div className="mb-8 lg:mb-0">
                <SectionNumber index={index} visible={visible} />
              </div>
              <ContentBlock index={index} title={title} description={description} ctaLabel={ctaLabel} visible={visible} delay={100} />
            </div>
          </div>
        </div>
      )}

      {layout === 'split-deep' && (
        <div className="relative section-padding py-16 md:py-24">
          <TechnicalOverlay index={index} variant="left" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-14 -left-2 hidden lg:block">
                <SectionNumber index={index} visible={visible} />
              </div>
              <ImageBlock src={image} alt={title} className="h-72 sm:h-80 md:h-[400px] lg:h-[460px]" visible={visible} />
            </div>
            <div>
              <ContentBlock index={index} title={title} description={description} ctaLabel={ctaLabel} visible={visible} delay={200} />
            </div>
          </div>
        </div>
      )}

      {/* Section divider */}
      <div className="section-padding">
        <div className="h-px bg-gradient-to-r from-transparent via-steel-700/15 to-transparent" />
      </div>
    </div>
  );
}
