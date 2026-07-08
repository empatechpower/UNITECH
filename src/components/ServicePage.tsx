import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import ParallaxSection from '@/components/ParallaxSection';

interface ServiceSection {
  id: string;
  title: string;
  desc: string;
  image: string;
}

interface ServicePageProps {
  pageTitle: string;
  heroText: string;
  heroImage: string;
  sectionsLabel: string;
  sections: ServiceSection[];
  contactCta: string;
  contactHref: string;
}

export default function ServicePage({ pageTitle, heroText, heroImage, sectionsLabel, sections, contactCta, contactHref }: ServicePageProps) {
  return (
    <>
      {/* Hero — Fullscreen Masked Parallax */}
      <ParallaxSection
        backgroundImage={heroImage}
        speed={0.35}
        overlayOpacity={0.78}
        overlayGradient="bg-gradient-to-b from-navy-950/60 via-transparent to-navy-950"
        className="pt-32 pb-16 md:pt-40 md:pb-24"
      >
        <div className="section-padding">
          <div className="label-tag mb-4 animate-fade-in">{pageTitle}</div>
          <div className="gradient-line w-20 mb-6 animate-fade-in animate-delay-100" />
          <p className="text-steel-200 text-lg sm:text-xl max-w-4xl leading-relaxed animate-fade-up animate-delay-200">
            {heroText}
          </p>
        </div>
      </ParallaxSection>

      {/* Anchor Nav */}
      <section className="section-padding py-6 sticky top-[64px] z-30 bg-navy-950/95 backdrop-blur-md border-b border-steel-700/15">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="label-tag text-[9px] whitespace-nowrap mr-2 hidden sm:inline">{sectionsLabel}</span>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-steel-400 hover:text-accent-cyan text-xs font-body tracking-wide whitespace-nowrap px-3 py-1.5 border border-steel-700/20 hover:border-accent-cyan/30 transition-all duration-300"
            >
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* Sections with Parallax Images */}
      <section className="section-padding py-12 md:py-20">
        <div className="space-y-20 md:space-y-32">
          {sections.map((s, i) => (
            <div key={s.id} id={s.id} className="scroll-mt-32">
              <ScrollReveal>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center`}>
                  {/* Parallax Image */}
                  <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <ParallaxImage
                      src={s.image}
                      alt={s.title}
                      speed={0.12}
                      className="h-64 sm:h-80 lg:h-96 border border-steel-700/20"
                      overlayClassName="bg-gradient-to-t from-navy-950/50 to-transparent"
                    >
                      <div className="absolute top-4 left-4 z-10">
                        <span className="font-micro text-[10px] tracking-[0.2em] text-accent-cyan/70 uppercase">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </ParallaxImage>
                  </div>

                  {/* Content */}
                  <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h2 className="heading-micro text-xl sm:text-2xl text-white mb-4">{s.title}</h2>
                    <div className="gradient-line w-16 mb-5" />
                    <p className="text-steel-300 text-base leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — Parallax background */}
      <ParallaxSection
        backgroundImage={sections[0]?.image || '/images/solutions/bg-Metal.jpg'}
        speed={0.2}
        overlayOpacity={0.9}
        className="py-16 md:py-24"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-steel-700/30 to-transparent z-10" />
        <ScrollReveal>
          <div className="text-center section-padding">
            <Link href={contactHref} className="btn-solid">
              {contactCta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </ScrollReveal>
      </ParallaxSection>
    </>
  );
}
