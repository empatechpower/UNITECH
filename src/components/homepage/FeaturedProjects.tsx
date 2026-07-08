'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeaturedProjectsProps {
  dict: {
    projects_eyebrow: string;
    projects_title: string;
  };
}

const projects = [
  { image: '/images/portfolio/WELDING-CELLS.png', label: 'Welding Cells', size: 'large' as const },
  { image: '/images/portfolio/MOBILITY.png', label: 'Mobility', size: 'small' as const },
  { image: '/images/portfolio/POWER.png', label: 'Power', size: 'small' as const },
  { image: '/images/portfolio/ASSEMBLY-AUTOMATION.png', label: 'Assembly & Automation', size: 'medium' as const },
  { image: '/images/portfolio/PARTNERSHIPS.png', label: 'Partnerships', size: 'medium' as const },
];

export default function FeaturedProjects({ dict }: FeaturedProjectsProps) {
  return (
    <section className="relative bg-warm-white font-ui py-20 md:py-28">
      <div className="section-padding max-w-[1440px] mx-auto mb-10 md:mb-14 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-5">{dict.projects_eyebrow}</p>
          <h2 className="editorial-heading text-3xl sm:text-5xl md:text-6xl">{dict.projects_title}</h2>
        </div>
      </div>

      <div className="section-padding max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
        {projects.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className={`group relative overflow-hidden ${
              p.size === 'large'
                ? 'col-span-2 row-span-2'
                : p.size === 'medium'
                  ? 'col-span-2 row-span-1'
                  : 'col-span-1 row-span-1'
            }`}
          >
            <Image
              src={p.image}
              alt={p.label}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute bottom-3 left-3 text-white text-xs tracking-[0.15em] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {p.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
