'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface ParallaxSectionProps {
  backgroundImage: string;
  children: React.ReactNode;
  speed?: number;
  overlayOpacity?: number;
  overlayGradient?: string;
  className?: string;
  minHeight?: string;
}

export default function ParallaxSection({
  backgroundImage,
  children,
  speed = 0.3,
  overlayOpacity = 0.85,
  overlayGradient,
  className = '',
  minHeight,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const rafId = useRef<number>(0);

  const update = useCallback(() => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.bottom > 0 && rect.top < windowH) {
      const centerOffset = rect.top - windowH / 2 + rect.height / 2;
      setOffsetY(centerOffset * speed);
    }

    rafId.current = requestAnimationFrame(update);
  }, [speed, isMobile]);

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
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={minHeight ? { minHeight } : undefined}
    >
      {/* Parallax background */}
      <div
        className="absolute inset-[-25%] will-change-transform"
        style={{
          transform: isMobile ? 'none' : `translate3d(0, ${offsetY}px, 0)`,
        }}
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-navy-950" style={{ opacity: overlayOpacity }} />
      {overlayGradient && <div className={`absolute inset-0 ${overlayGradient}`} />}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
