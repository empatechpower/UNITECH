'use client';

import { useEffect, useRef, useState } from 'react';

interface CapabilityNavProps {
  items: { id: string; title: string }[];
  label?: string;
}

export default function CapabilityNav({ items, label }: CapabilityNavProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isStuck, setIsStuck] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const sectionEls = items.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          const sorted = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(sorted[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sectionEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!navRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 1, rootMargin: '-65px 0px 0px 0px' }
    );
    const sentinel = document.getElementById('cap-nav-sentinel');
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeEl = itemRefs.current.get(activeId);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeId]);

  return (
    <>
      <div id="cap-nav-sentinel" className="h-0" />
      <nav
        ref={navRef}
        className={`sticky top-[64px] z-30 transition-all duration-500 ${
          isStuck
            ? 'bg-navy-950/95 backdrop-blur-xl border-b border-accent-cyan/10 shadow-lg shadow-navy-950/50'
            : 'bg-navy-950/80 backdrop-blur-md border-b border-steel-700/10'
        }`}
      >
        <div className="section-padding py-0">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {label && (
              <span className="label-tag text-[8px] whitespace-nowrap mr-4 py-4 hidden lg:inline border-r border-steel-700/20 pr-4">
                {label}
              </span>
            )}

            {items.map((item, i) => {
              const isActive = activeId === item.id;
              const num = String(i + 1).padStart(2, '0');
              return (
                <a
                  key={item.id}
                  ref={(el) => { if (el) itemRefs.current.set(item.id, el); }}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative flex items-center gap-2 whitespace-nowrap px-4 lg:px-5 py-4 text-xs font-body tracking-wide transition-all duration-300 group shrink-0 ${
                    isActive
                      ? 'text-accent-cyan'
                      : 'text-steel-500 hover:text-steel-200'
                  }`}
                >
                  <span className={`font-micro text-[9px] tracking-[0.15em] transition-colors duration-300 ${
                    isActive ? 'text-accent-cyan' : 'text-steel-600 group-hover:text-steel-400'
                  }`}>
                    {num}
                  </span>
                  <span className="hidden sm:inline">{item.title}</span>

                  {/* Active indicator */}
                  <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent-cyan transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`} />
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
