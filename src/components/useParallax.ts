'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface ParallaxState {
  progress: number;
  offsetY: number;
  isInView: boolean;
}

export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ParallaxState>({ progress: 0, offsetY: 0, isInView: false });
  const rafId = useRef<number>(0);
  const isMobile = useRef(false);

  const update = useCallback(() => {
    if (!ref.current || isMobile.current) return;

    const rect = ref.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const inView = rect.bottom > 0 && rect.top < windowH;

    if (inView) {
      const progress = (windowH - rect.top) / (windowH + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const offsetY = (rect.top - windowH / 2) * speed;

      setState({ progress: clampedProgress, offsetY, isInView: true });
    } else if (state.isInView) {
      setState((prev) => ({ ...prev, isInView: false }));
    }

    rafId.current = requestAnimationFrame(update);
  }, [speed, state.isInView]);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    isMobile.current = mql.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      isMobile.current = e.matches;
    };
    mql.addEventListener('change', handleChange);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isMobile.current = true;
    }

    rafId.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId.current);
      mql.removeEventListener('change', handleChange);
    };
  }, [update]);

  return { ref, ...state };
}
