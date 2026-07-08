'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useIndustryTheme } from '@/hooks/useIndustryTheme';

interface IndustrySelectorProps {
  dict: {
    selector_eyebrow: string;
    selector_question: string;
    selector_industrial: string;
    selector_industrial_desc: string;
    selector_green: string;
    selector_green_desc: string;
    selector_cta: string;
  };
}

export default function IndustrySelector({ dict }: IndustrySelectorProps) {
  const { selectIndustry } = useIndustryTheme();

  return (
    <section id="selector" className="relative bg-warm-white font-ui">
      <div className="section-padding pt-20 md:pt-28 pb-10 md:pb-14 max-w-[1440px] mx-auto text-center">
        <p className="eyebrow justify-center mb-5">{dict.selector_eyebrow}</p>
        <h2 className="editorial-heading text-3xl sm:text-5xl md:text-6xl max-w-3xl mx-auto">
          {dict.selector_question}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <Panel
          theme="industrial"
          image="/images/homepage-editorial/selector-industrial.png"
          title={dict.selector_industrial}
          desc={dict.selector_industrial_desc}
          cta={dict.selector_cta}
          onSelect={() => selectIndustry('industrial')}
        />
        <Panel
          theme="green"
          image="/images/homepage-editorial/selector-green.png"
          title={dict.selector_green}
          desc={dict.selector_green_desc}
          cta={dict.selector_cta}
          onSelect={() => selectIndustry('green')}
        />
      </div>
    </section>
  );
}

function Panel({
  image,
  title,
  desc,
  cta,
  onSelect,
}: {
  theme: 'industrial' | 'green';
  image: string;
  title: string;
  desc: string;
  cta: string;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7 }}
      className="group relative h-[62vh] min-h-[420px] overflow-hidden text-left"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10 transition-opacity duration-500 group-hover:from-ink/95" />

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
        <h3 className="font-editorial text-3xl md:text-4xl text-white mb-3 tracking-[-0.02em]">
          {title}
        </h3>
        <p className="text-white/70 text-sm md:text-base max-w-sm mb-6 leading-relaxed">
          {desc}
        </p>
        <span className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase font-semibold">
          {cta}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.button>
  );
}
