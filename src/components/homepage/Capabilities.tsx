'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface CapabilitiesProps {
  dict: {
    capabilities_eyebrow: string;
    capabilities_title: string;
    cap_machinery: string;
    cap_machinery_desc: string;
    cap_oem: string;
    cap_oem_desc: string;
    cap_automation: string;
    cap_automation_desc: string;
    cap_components: string;
    cap_components_desc: string;
    cap_engineering: string;
    cap_engineering_desc: string;
  };
}

export default function Capabilities({ dict }: CapabilitiesProps) {
  const items = [
    { image: '/images/portfolio/cnc-machining.png', title: dict.cap_machinery, desc: dict.cap_machinery_desc },
    { image: '/images/homepage/oem-product.jpg', title: dict.cap_oem, desc: dict.cap_oem_desc },
    { image: '/images/homepage-editorial/capability-automation.png', title: dict.cap_automation, desc: dict.cap_automation_desc },
    { image: '/images/portfolio/STAMPINGS.png', title: dict.cap_components, desc: dict.cap_components_desc },
    { image: '/images/solutions/metal-working.png', title: dict.cap_engineering, desc: dict.cap_engineering_desc },
  ];

  return (
    <section className="relative bg-ink font-ui py-20 md:py-28 overflow-hidden">
      <div className="section-padding max-w-[1440px] mx-auto mb-10 md:mb-14">
        <p className="eyebrow mb-5">{dict.capabilities_eyebrow}</p>
        <h2 className="editorial-heading !text-white text-3xl sm:text-5xl md:text-6xl">
          {dict.capabilities_title}
        </h2>
      </div>

      {/* Desktop: horizontal scroll-snap gallery */}
      <div className="hidden md:flex gap-px overflow-x-auto scrollbar-none snap-x snap-mandatory">
        {items.map((item, i) => (
          <CapabilityCard key={item.title} {...item} index={i} />
        ))}
      </div>

      {/* Mobile: swipeable carousel */}
      <div className="md:hidden section-padding">
        <Carousel opts={{ align: 'start' }}>
          <CarouselContent>
            {items.map((item, i) => (
              <CarouselItem key={item.title} className="basis-[80%]">
                <CapabilityCard {...item} index={i} mobile />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

function CapabilityCard({
  image,
  title,
  desc,
  index,
  mobile,
}: {
  image: string;
  title: string;
  desc: string;
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: mobile ? 0 : index * 0.08 }}
      className={`group relative shrink-0 snap-start overflow-hidden ${
        mobile ? 'h-[70vh] min-h-[420px]' : 'w-[80vw] md:w-[42vw] xl:w-[34vw] h-[70vh] min-h-[480px]'
      }`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(min-width: 768px) 40vw, 80vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
      <span className="absolute top-6 left-6 font-editorial text-xl text-white/50 italic">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3 className="font-editorial text-2xl md:text-3xl text-white mb-1.5 tracking-[-0.01em]">{title}</h3>
        <p className="text-white/60 text-sm">{desc}</p>
      </div>
    </motion.div>
  );
}
