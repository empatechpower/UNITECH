'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CTASectionProps {
  locale: string;
  dict: {
    cta_title: string;
    cta_button: string;
  };
}

export default function CTASection({ locale, dict }: CTASectionProps) {
  return (
    <section className="relative bg-ink font-ui py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-technical opacity-[0.08]" />
      <div className="absolute inset-0 mesh-glow opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7 }}
        className="relative z-10 section-padding max-w-[1440px] mx-auto text-center"
      >
        <h2 className="editorial-heading !text-white text-4xl sm:text-6xl md:text-7xl mb-10">
          {dict.cta_title}
        </h2>
        <Link
          href={`/${locale}/contact-us`}
          className="inline-flex items-center gap-2 px-9 py-4 bg-warm-white text-ink font-ui text-xs tracking-[0.15em] uppercase font-semibold hover:bg-accent hover:text-warm-white transition-colors duration-300"
        >
          {dict.cta_button}
        </Link>
      </motion.div>
    </section>
  );
}
