'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface ParallaxHeroProps {
  backgroundImage: string;
  children: React.ReactNode;
  maskText?: string;
  overlayOpacity?: number;
}

export default function ParallaxHero({ backgroundImage, children, maskText, overlayOpacity = 0.7 }: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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
    return () => cancelAnimationFrame(rafId.current);
  }, [update]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background Image */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: isMobile ? 'none' : `translate3d(0, ${offsetY}px, 0) scale(1.2)`,
        }}
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy-950" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-transparent to-navy-950" />
      <div className="absolute inset-0 noise-overlay opacity-30" />

      {/* Masked text layer — large background text visible through image mask */}
      {maskText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <div
            className="heading-micro text-[12vw] md:text-[10vw] text-transparent leading-none whitespace-nowrap"
            style={{
              WebkitTextStroke: '1px rgba(6, 182, 212, 0.08)',
              transform: isMobile ? 'none' : `translate3d(0, ${offsetY * 0.2}px, 0)`,
            }}
          >
            {maskText}
          </div>
        </div>
      )}

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Diagonal accent */}
      <div
        className="absolute top-0 right-[20%] w-[1px] h-[140%] bg-gradient-to-b from-transparent via-accent-cyan/15 to-transparent origin-top"
        style={{
          transform: isMobile ? 'rotate(12deg)' : `rotate(12deg) translate3d(0, ${offsetY * 0.15}px, 0)`,
        }}
      />

      {/* Content */}
      <div className="relative section-padding w-full py-32 lg:py-0 z-10">
        {children}
      </div>

      {/* Bottom gradient edge */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-navy-950 to-transparent z-10" />
    </div>
  );
}
