import { NextResponse } from 'next/server';

/**
 * The contact form's handler. Sends each enquiry to the client's inbox through
 * Resend, called over its HTTP API with `fetch` rather than through the SDK, so
 * the site takes on no dependency for one POST.
 *
 * Configuration is entirely environment variables, set in the Vercel project
 * and in `.env.local` for local work (gitignored via `.env*.local`):
 *
 *   RESEND_API_KEY   required. Without it the handler answers 503, and the
 *                    form tells the buyer to email or phone instead.
 *   CONTACT_FROM     required. A sender on a domain verified in Resend, such
 *                    as "UNITECH Website <website@umtt.com.tw>". Until
 *                    umtt.com.tw is verified, Resend will only deliver from its
 *                    test sender to the Resend account owner's own address, so
 *                    nothing reaches the client.
 *   CONTACT_TO       optional. Defaults to the address the client asked for.
 *
 * The recipient lives here, server side, rather than in `src/data/company.ts`,
 * because that module is imported by the contact screen and would put the
 * address in the client bundle.
 *
 * The buyer's address goes in `reply_to`, so the client can answer an enquiry
 * by replying to it. The email is plain text only: the fields are the buyer's
 * own input, and plain text leaves nothing for it to inject into.
 */

/** Where the client asked for form submissions to go, on 2026-09-18. */
const DEFAULT_TO = 'peter@umtt.com.tw';

const LIMITS = { name: 120, email: 200, company: 160, country: 80, message: 5000 };

/* Deliberately loose. The browser has already validated the field as an email;
   this only rejects input that could not possibly be one. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = keyof typeof LIMITS;

function clean(value: unknown, field: Field): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, LIMITS[field]);
}

/** Subject and sender name are single-line; strip anything that is not. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  /* A field no person can see or reach. Anything that fills it is a bot, and
     it gets the same answer a person would so it learns nothing. */
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 'name');
  const email = clean(body.email, 'email');
  const company = clean(body.company, 'company');
  const country = clean(body.country, 'country');
  const message = clean(body.message, 'message');

  if (!name || !message || !EMAIL.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || DEFAULT_TO;

  if (!key || !from) {
    return NextResponse.json({ ok: false, error: 'unconfigured' }, { status: 503 });
  }

  const subject = oneLine(
    `Website enquiry from ${name}${company ? `, ${company}` : ''}${country ? ` (${country})` : ''}`
  );

  const text = [
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company || '(not given)'}`,
    `Country:  ${country || '(not given)'}`,
    '',
    message,
    '',
    '--',
    'Sent from the contact form at umtt.com.tw. Reply to this email to answer the enquiry directly.',
  ].join('\n');

  let res: Response;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }

  if (!res.ok) {
    /* Logged for the deploy's runtime logs, never returned: Resend's message
       can describe the account's configuration. */
    const detail = await res.text().catch(() => '');
    console.error(`[contact] resend ${res.status}: ${detail.slice(0, 300)}`);
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
