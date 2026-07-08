'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface MachineryHeroProps {
  headline: string;
  subtext: string;
  backgroundImage: string;
  scrollLabel?: string;
  ghostText?: string;
  tag?: string;
}

export default function MachineryHero({ headline, subtext, backgroundImage, scrollLabel = 'Scroll', ghostText = 'MACHINERY', tag = 'MACHINERY' }: MachineryHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const rafId = useRef<number>(0);

  const update = useCallback(() => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    setOffsetY(rect.top * 0.4);
    rafId.current = requestAnimationFrame(update);
  }, [isMobile]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 768px)').matches ||
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsMobile(mobile);
    if (!mobile) {
      rafId.current = requestAnimationFrame(update);
    }
    setIsLoaded(true);
    return () => cancelAnimationFrame(rafId.current);
  }, [update]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: isMobile ? 'none' : `translate3d(0, ${offsetY}px, 0) scale(1.15)` }}
      >
        <Image src={backgroundImage} alt="" fill className="object-cover" priority />
      </div>

      {/* Overlay stack */}
      <div className="absolute inset-0 bg-navy-950/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-transparent" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Cyan glow accent */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)' }} />

      {/* Diagonal line */}
      <div
        className="absolute top-0 right-[15%] w-[1px] h-[160%] bg-gradient-to-b from-transparent via-accent-cyan/10 to-transparent origin-top hidden md:block"
        style={{ transform: `rotate(15deg) translate3d(0, ${isMobile ? 0 : offsetY * 0.1}px, 0)` }}
      />

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <div
          className="heading-micro text-[14vw] md:text-[11vw] text-transparent leading-none whitespace-nowrap"
          style={{
            WebkitTextStroke: '1px rgba(6, 182, 212, 0.05)',
            transform: isMobile ? 'none' : `translate3d(0, ${offsetY * 0.2}px, 0)`,
          }}
        >
          {ghostText}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding pb-40 md:pb-32 lg:pb-40">
        <div className="max-w-5xl">
          <div
            className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="label-tag mb-5 text-[10px] sm:text-xs">{tag}</div>
            <div className="gradient-line w-16 mb-8" />
          </div>

          <h1
            className={`font-display uppercase text-white text-4xl sm:text-5xl lg:text-[60px] leading-[0.95] tracking-wide mb-8 transition-all duration-1000 delay-200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {headline}
          </h1>

          <p
            className={`text-steel-300 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed transition-all duration-1000 delay-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {subtext}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 transition-all duration-1000 delay-[800ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-micro text-[9px] tracking-[0.3em] uppercase text-steel-500">{scrollLabel}</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-accent-cyan/60 to-transparent animate-pulse" />
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-steel-700/20 to-transparent z-10" />
    </div>
  );
}
