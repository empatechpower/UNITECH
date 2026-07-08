'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface TaiwanAdvantageProps {
  dict: {
    advantage_eyebrow: string;
    advantage_title: string;
    advantage_precision_title: string;
    advantage_precision_desc: string;
    advantage_innovation_title: string;
    advantage_innovation_desc: string;
    advantage_reach_title: string;
    advantage_reach_desc: string;
  };
}

export default function TaiwanAdvantage({ dict }: TaiwanAdvantageProps) {
  const pillars = [
    {
      n: '01',
      image: '/images/homepage-editorial/advantage-precision.png',
      title: dict.advantage_precision_title,
      desc: dict.advantage_precision_desc,
    },
    {
      n: '02',
      image: '/images/homepage-editorial/advantage-innovation.png',
      title: dict.advantage_innovation_title,
      desc: dict.advantage_innovation_desc,
    },
    {
      n: '03',
      image: '/images/homepage-editorial/advantage-reach.png',
      title: dict.advantage_reach_title,
      desc: dict.advantage_reach_desc,
    },
  ];

  return (
    <section className="relative bg-paper font-ui py-20 md:py-28">
      <div className="section-padding max-w-[1440px] mx-auto mb-12 md:mb-16">
        <p className="eyebrow mb-5">{dict.advantage_eyebrow}</p>
        <h2 className="editorial-heading text-3xl sm:text-5xl md:text-6xl max-w-2xl">
          {dict.advantage_title}
        </h2>
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid section-padding max-w-[1440px] mx-auto grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <PillarCard key={p.n} {...p} index={i} />
        ))}
      </div>

      {/* Mobile: swipeable carousel */}
      <div className="md:hidden section-padding">
        <Carousel opts={{ align: 'start' }}>
          <CarouselContent>
            {pillars.map((p, i) => (
              <CarouselItem key={p.n} className="basis-[80%]">
                <PillarCard {...p} index={i} mobile />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

function PillarCard({
  image,
  title,
  desc,
  n,
  index,
  mobile,
}: {
  image: string;
  title: string;
  desc: string;
  n: string;
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: mobile ? 0 : index * 0.1 }}
    >
      <div className="relative aspect-[4/5] mb-6 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 33vw, 80vw"
        />
        <span className="absolute top-4 left-4 font-editorial text-2xl text-white/80 italic">
          {n}
        </span>
      </div>
      <h3 className="font-editorial text-2xl text-ink mb-2 tracking-[-0.01em]">{title}</h3>
      <p className="text-graphite text-sm leading-relaxed max-w-xs">{desc}</p>
    </motion.div>
  );
}
