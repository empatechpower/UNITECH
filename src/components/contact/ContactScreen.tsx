'use client';

import { useState } from 'react';
import type { Locale } from '@/i18n/config';

/**
 * One screen: the form, the details needed to act on it, and the process a
 * submitted RFQ goes through.
 *
 * TODO: the form has no submission handler. It validates and reports state
 * client-side only; wiring a backend is still outstanding.
 */
export default function ContactScreen({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Record<string, string>;
}) {
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { title: dict.step1_title, body: dict.step1_desc },
    { title: dict.step2_title, body: dict.step2_desc },
    { title: dict.step3_title, body: dict.step3_desc },
    { title: dict.step4_title, body: dict.step4_desc },
    { title: dict.step5_title, body: dict.step5_desc },
  ];

  return (
    <div className="panel-body flex flex-col">
      <div className="grid flex-1 lg:min-h-0 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="screen-pad flex min-h-0 flex-col justify-center py-8 lg:py-0 lg:pr-12">
          <h1 className="screen-display text-[clamp(1.6rem,3.4vw,2.5rem)]">
            {dict.hero_headline}
          </h1>

          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label={dict.form_name} required />
              <Field id="email" label={dict.form_email} type="email" required />
              <Field id="company" label={dict.form_company} />
              <Field id="country" label={dict.form_country} />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="block font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite">
                {dict.form_message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                className="mt-2 w-full resize-none border border-rule-strong bg-ground-raised px-3 py-2.5 font-ui text-sm text-ink outline-none transition-colors placeholder:text-graphite/70 focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button type="submit" className="ctl-solid">
                {dict.form_submit_cta}
              </button>
              {submitted ? (
                <p role="status" className="font-ui text-[12px] text-graphite">
                  {locale === 'zh'
                    ? '表單尚未連接後端，請直接與我們聯繫。'
                    : 'This form is not connected to a backend yet. Please contact us directly.'}
                </p>
              ) : null}
            </div>
          </form>
        </div>

        <aside className="screen-pad flex flex-col justify-center gap-6 rule-l bg-ground-sunk/40 py-8 lg:py-0">
          <div>
            <h2 className="font-ui text-[13px] font-semibold tracking-tight text-ink">
              {dict.company_name}
            </h2>
          </div>
          <dl className="grid gap-4">
            {[
              { k: dict.address_label, v: dict.address },
              { k: dict.phone_label, v: dict.phone },
              { k: dict.email_label, v: dict.email },
              { k: dict.hours_label, v: dict.hours },
              { k: dict.response_label, v: dict.response },
            ].map((row) => (
              <div key={row.k} className="rule-t pt-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
                  {row.k}
                </dt>
                <dd className="mt-1 font-ui text-sm text-ink">{row.v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <ol className="grid shrink-0 gap-px rule-t bg-rule sm:grid-cols-3 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.title} className="bg-ground px-5 py-4 lg:px-6">
            <span className="spec-figure text-[11px] text-graphite">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-1 font-ui text-[13px] font-semibold tracking-tight text-ink">
              {s.title}
            </h3>
            <p className="mt-0.5 font-ui text-[12px] leading-snug text-graphite">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Field({
  id,
  label,
  type = 'text',
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite"
      >
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-2 w-full border border-rule-strong bg-ground-raised px-3 py-2.5 font-ui text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}
