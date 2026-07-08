'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  dict: {
    hero_eyebrow: string;
    hero_headline_1: string;
    hero_headline_2: string;
    hero_cta: string;
    hero_scroll: string;
  };
}

export default function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink font-ui">
      <Image
        src="/images/homepage-editorial/hero.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/40" />

      <div className="relative z-10 h-full flex flex-col items-start justify-end section-padding pb-20 md:pb-28 max-w-[1440px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="eyebrow !text-white/70 mb-6"
        >
          {dict.hero_eyebrow}
        </motion.p>

        <h1 className="editorial-heading !text-white text-[13vw] sm:text-6xl md:text-7xl xl:text-[6.5rem] max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block"
          >
            {dict.hero_headline_1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="block text-white/60 italic"
          >
            {dict.hero_headline_2}
          </motion.span>
        </h1>

        <motion.a
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          href="#selector"
          className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 bg-warm-white text-ink font-ui text-xs tracking-[0.15em] uppercase font-semibold hover:bg-accent hover:text-warm-white transition-colors duration-300"
        >
          {dict.hero_cta}
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 right-6 md:right-10 z-10 hidden sm:flex flex-col items-center gap-3"
      >
        <span className="text-white/60 text-[10px] tracking-[0.25em] uppercase [writing-mode:vertical-rl]">
          {dict.hero_scroll}
        </span>
        <span className="w-px h-10 bg-white/30 overflow-hidden relative">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-white animate-scroll-line" />
        </span>
      </motion.div>
    </section>
  );
}
