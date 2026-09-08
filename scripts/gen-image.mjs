#!/usr/bin/env node
/**
 * Image generation for the UNITECH site, through Google Gemini.
 *
 * Replaces the Higgsfield MCP route. Generation runs on the user's own Gemini
 * account, so nothing here generates anything unprompted: it is a tool the
 * session calls when an image has been agreed.
 *
 * The key lives in `.env.local`, which .gitignore already covers via
 * `.env*.local`. It is never read from anywhere that gets committed.
 *
 *   node scripts/gen-image.mjs --models
 *     List the image-capable models this account actually has, so the model
 *     name is confirmed against the account rather than assumed.
 *
 *   node scripts/gen-image.mjs \
 *     --prompt "..." \
 *     --out public/images/homepage/partnerships.jpg \
 *     [--aspect 16:9] [--model gemini-2.5-flash-image] [--n 1]
 *
 * With --n > 1 the outputs are suffixed -1, -2, ... so variants can be compared
 * before one is chosen. Existing files are never silently overwritten; pass
 * --force to replace one.
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, extname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://generativelanguage.googleapis.com/v1beta';
// Confirmed against the account with --models. The strongest image model
// available there; gemini-3.1-flash-image is the cheaper/faster fallback.
const DEFAULT_MODEL = 'gemini-3-pro-image';

/* ---------------------------------------------------------------- key --- */

function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();

  const envFile = join(ROOT, '.env.local');
  if (existsSync(envFile)) {
    for (const line of readFileSync(envFile, 'utf8').split('\n')) {
      const m = line.match(/^\s*(?:export\s+)?GEMINI_API_KEY\s*=\s*(.*)$/);
      if (!m) continue;
      const val = m[1].trim().replace(/^["']|["']$/g, '');
      // Skip the placeholder from the setup instructions, which otherwise
      // shadows a real key appended after it.
      if (val && val !== 'your-key-here') return val;
    }
  }

  console.error(
    'No GEMINI_API_KEY found.\n\n' +
      'Add it to unitech-site/.env.local (already gitignored):\n\n' +
      '  GEMINI_API_KEY=your-key-here\n\n' +
      'Get a key at https://aistudio.google.com/apikey'
  );
  process.exit(1);
}

/* --------------------------------------------------------------- args --- */

function parseArgs(argv) {
  const out = { n: 1, aspect: '16:9', model: DEFAULT_MODEL };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--models') out.models = true;
    else if (a === '--force') out.force = true;
    else if (a.startsWith('--')) out[a.slice(2)] = argv[++i];
  }
  out.n = Number(out.n) || 1;
  return out;
}

/* ------------------------------------------------------------- models --- */

async function listModels(key) {
  const res = await fetch(`${API}/models?pageSize=200`, {
    headers: { 'x-goog-api-key': key },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const { models = [] } = await res.json();

  // Not every image model has "image" in its name: nano-banana-pro-preview is
  // one, and matching on the name alone silently hides it.
  const IMAGE_NAME = /image|imagen|nano-banana/i;
  const imageModels = models.filter(
    (m) =>
      IMAGE_NAME.test(m.name) ||
      (m.supportedGenerationMethods || []).some((s) => /image/i.test(s))
  );

  console.log(`\n${models.length} models on this account. Image-capable:\n`);
  for (const m of imageModels) {
    console.log(`  ${m.name.replace('models/', '')}`);
    if (m.description) console.log(`      ${m.description.slice(0, 110)}`);
  }
  if (!imageModels.length) {
    console.log('  (none matched; full list follows)\n');
    for (const m of models) console.log(`  ${m.name.replace('models/', '')}`);
  }
  console.log();
}

/* ---------------------------------------------------------- generation --- */

const EXT_FOR = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp' };

async function generate({ key, model, prompt, aspect }) {
  const res = await fetch(`${API}/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: aspect },
      },
    }),
  });

  const text = await res.text();

  // Image generation is not on the Gemini free tier: every image model reports
  // `limit: 0` until billing is enabled on the project. That is a setup problem,
  // not a code problem, so say so plainly instead of dumping the raw payload.
  if (res.status === 429 && /limit: 0/.test(text)) {
    throw new Error(
      `No image quota for "${model}".\n\n` +
        'Every Gemini image model returns limit: 0 until billing is enabled on\n' +
        'the project behind this API key. The key itself is fine (text models work).\n\n' +
        'Enable billing at https://aistudio.google.com/apikey (open the key\'s\n' +
        'project, then set up a paid plan), and rerun. Image generation is billed\n' +
        'per image, so there is no free allowance to fall back to.'
    );
  }

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${text.slice(0, 600)}`);

  const body = JSON.parse(text);
  const parts = body?.candidates?.[0]?.content?.parts || [];
  const image = parts.find((p) => p.inlineData?.data);

  if (!image) {
    const reason = body?.candidates?.[0]?.finishReason;
    const note = parts.map((p) => p.text).filter(Boolean).join(' ');
    throw new Error(
      `No image returned${reason ? ` (finishReason: ${reason})` : ''}` +
        `${note ? `: ${note.slice(0, 300)}` : ''}`
    );
  }
  return {
    buffer: Buffer.from(image.inlineData.data, 'base64'),
    mime: image.inlineData.mimeType || 'image/png',
  };
}

/* ----------------------------------------------------------------- run --- */

const args = parseArgs(process.argv.slice(2));
const key = loadKey();

if (args.models) {
  await listModels(key);
  process.exit(0);
}

if (!args.prompt || !args.out) {
  console.error('Need --prompt and --out. See the header of this file.');
  process.exit(1);
}

const outPath = resolve(ROOT, args.out);
mkdirSync(dirname(outPath), { recursive: true });

for (let i = 1; i <= args.n; i++) {
  const target =
    args.n === 1
      ? outPath
      : join(
          dirname(outPath),
          `${basename(outPath, extname(outPath))}-${i}${extname(outPath)}`
        );

  if (existsSync(target) && !args.force) {
    console.error(
      `Refusing to overwrite ${target}\n` +
        'Pass --force if replacing it is intended.'
    );
    process.exit(1);
  }

  process.stdout.write(`[${i}/${args.n}] ${args.model} ${args.aspect} ... `);
  let buffer, mime;
  try {
    ({ buffer, mime } = await generate({
      key,
      model: args.model,
      prompt: args.prompt,
      aspect: args.aspect,
    }));
  } catch (err) {
    console.error(`\n\n${err.message}\n`);
    process.exit(1);
  }

  // Honour what the API actually returned rather than the requested extension.
  const wanted = EXT_FOR[mime] || '.png';
  const final =
    extname(target).toLowerCase() === wanted ? target : target.replace(/\.[^.]+$/, wanted);

  writeFileSync(final, buffer);
  console.log(`${(buffer.length / 1024).toFixed(0)} KB -> ${final.replace(ROOT + '/', '')}`);
}
