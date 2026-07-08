'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

interface ContactPageClientProps {
  locale: string;
  dict: Record<string, any>;
}

const inputClass =
  'w-full bg-white border border-concrete px-4 py-3.5 text-ink font-ui text-sm tracking-wide hover:border-ink/30 focus:border-accent focus:outline-none focus:shadow-[0_0_0_1px_var(--accent)] transition-all duration-300 placeholder:text-graphite/50';

export default function ContactPageClient({ locale, dict }: ContactPageClientProps) {
  const t = dict.contact;

  const steps = [
    { num: '01', title: t.step1_title, desc: t.step1_desc },
    { num: '02', title: t.step2_title, desc: t.step2_desc },
    { num: '03', title: t.step3_title, desc: t.step3_desc },
    { num: '04', title: t.step4_title, desc: t.step4_desc },
    { num: '05', title: t.step5_title, desc: t.step5_desc },
  ];

  const trustItems = [t.trust_taiwan, t.trust_oem, t.trust_partners, t.trust_delivery, t.trust_engineering];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-ink font-ui">
        <Image
          src="/images/solutions/mechanical2.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/55" />

        <div className="relative z-10 h-full flex flex-col items-start justify-end section-padding pb-20 md:pb-28 max-w-[1440px] mx-auto">
          <p className="eyebrow !text-white/70 mb-6">{t.page_title}</p>
          <h1 className="editorial-heading !text-white text-3xl sm:text-5xl md:text-6xl max-w-2xl mb-8">
            {t.hero_headline}
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
            {t.hero_desc}
          </p>
          <a href="#contact-form" className="btn-editorial">
            {t.form_submit_cta}
          </a>
        </div>
      </section>

      {/* ===== FORM + INFO PANEL ===== */}
      <section id="contact-form" className="relative bg-warm-white font-ui section-padding py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <p className="eyebrow mb-8">{t.form_label}</p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-graphite font-semibold block mb-2.5">
                      {t.form_name} *
                    </label>
                    <input type="text" name="name" required className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-graphite font-semibold block mb-2.5">
                      {t.form_email} *
                    </label>
                    <input type="email" name="email" required className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-graphite font-semibold block mb-2.5">
                      {t.form_company}
                    </label>
                    <input type="text" name="company" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-graphite font-semibold block mb-2.5">
                      {t.form_country} *
                    </label>
                    <input type="text" name="country" required className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-graphite font-semibold block mb-2.5">
                    {t.form_industry}
                  </label>
                  <input type="text" name="industry" className={inputClass} />
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-graphite font-semibold block mb-2.5">
                    {t.form_message} *
                  </label>
                  <textarea name="message" required rows={6} className={`${inputClass} resize-none`} />
                </div>

                <button type="submit" className="btn-editorial">
                  {t.form_submit_cta}
                </button>
              </form>
            </ScrollReveal>
          </div>

          {/* Info panel — 2 cols */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={200}>
              <div className="relative bg-paper border border-concrete p-8 lg:p-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent/40" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-accent/40" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-accent/40" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent/40" />
                <div className="absolute inset-0 grid-technical opacity-30" />

                <div className="relative space-y-7">
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold mb-3">
                      {t.info_label}
                    </div>
                    <p className="text-ink text-sm leading-relaxed">{t.company_name}</p>
                  </div>

                  <div className="h-px bg-concrete" />

                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold mb-2">
                      {t.address_label}
                    </div>
                    <p className="text-graphite text-sm">{t.address}</p>
                  </div>

                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold mb-2">
                      {t.phone_label}
                    </div>
                    <p className="text-graphite text-sm">{t.phone}</p>
                  </div>

                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold mb-2">
                      {t.email_label}
                    </div>
                    <p className="text-graphite text-sm">{t.email}</p>
                  </div>

                  <div className="h-px bg-concrete" />

                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold mb-2">
                      {t.hours_label}
                    </div>
                    <p className="text-graphite text-sm">{t.hours}</p>
                  </div>

                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold mb-2">
                      {t.response_label}
                    </div>
                    <p className="text-ink text-sm font-semibold">{t.response}</p>
                  </div>

                  <div className="h-px bg-concrete" />

                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/common/Made-in-TW-Logo.png"
                      alt="Made in Taiwan"
                      width={40}
                      height={40}
                      className="opacity-80"
                    />
                    <span className="text-[10px] tracking-[0.15em] uppercase text-graphite font-semibold">
                      100% Made in Taiwan
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== RFQ PROCESS TIMELINE ===== */}
      <section className="relative bg-paper font-ui py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-technical opacity-30" />
        <div className="relative section-padding max-w-[1440px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="eyebrow justify-center mb-6">{t.process_title}</p>
              <p className="text-graphite text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {t.process_subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-0 relative">
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-concrete" />
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-12 h-12 mb-5 border border-accent/40 bg-warm-white flex items-center justify-center">
                    <span className="font-editorial text-lg text-accent">{step.num}</span>
                  </div>
                  <h4 className="text-[11px] sm:text-xs tracking-[0.15em] uppercase text-ink font-semibold mb-2">
                    {step.title}
                  </h4>
                  <p className="text-graphite text-xs leading-relaxed max-w-[160px]">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="relative bg-warm-white font-ui section-padding py-16 md:py-24 border-y border-concrete">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="eyebrow justify-center">{t.trust_title}</p>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 lg:gap-x-14">
            {trustItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-ink text-sm tracking-wide">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="relative bg-ink font-ui py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-technical opacity-[0.08]" />
        <div className="absolute inset-0 mesh-glow opacity-60" />
        <ScrollReveal>
          <div className="relative z-10 text-center section-padding">
            <Image
              src="/images/common/Made-in-TW-Logo.png"
              alt="Made in Taiwan"
              width={56}
              height={56}
              className="mx-auto mb-8 opacity-80"
            />
            <h2 className="editorial-heading !text-white text-xl sm:text-2xl md:text-3xl mb-4">{t.subtitle}</h2>
            <p className="text-white/60 text-sm max-w-lg mx-auto mb-8">{t.company_name}</p>
            <a href="#contact-form" className="btn-editorial-outline !border-white/30 !text-white hover:!border-white hover:!bg-white/10">
              {t.form_submit_cta}
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
