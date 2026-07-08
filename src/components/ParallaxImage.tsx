'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className = '',
  overlayClassName = '',
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafId = useRef<number>(0);

  const update = useCallback(() => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const inView = rect.bottom > 0 && rect.top < windowH;

    if (inView) {
      const centerOffset = rect.top - windowH / 2 + rect.height / 2;
      setOffsetY(centerOffset * speed);
      setIsInView(true);
    } else {
      setIsInView(false);
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
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-[-20%] will-change-transform"
        style={{
          transform: isMobile ? 'none' : `translate3d(0, ${offsetY}px, 0)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
      {children}
    </div>
  );
}
