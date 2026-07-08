'use client';

import { useEffect, useRef, useState } from 'react';

interface Metric {
  value: string;
  label: string;
}

interface MetricsSectionProps {
  metrics: Metric[];
}

function AnimatedNumber({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isVisible, target]);

  return <>{current}{suffix}</>;
}

function parseMetricValue(value: string): { number: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (match) return { number: parseFloat(match[1]), suffix: match[2] };
  return { number: 0, suffix: value };
}

export default function MetricsSection({ metrics }: MetricsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-navy-900/50" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, i) => {
            const { number, suffix } = parseMetricValue(metric.value);
            return (
              <div
                key={i}
                className={`text-center md:text-left transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-3 tracking-tight">
                  <AnimatedNumber target={number} suffix={suffix} isVisible={isVisible} />
                </div>
                <div className="font-micro text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-steel-400 leading-snug">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
