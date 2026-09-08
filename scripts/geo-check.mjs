#!/usr/bin/env node
/**
 * Does an answer engine cite this site?
 *
 * Runs the fixed question set in `geo/prompts.json` against Gemini with Google
 * Search grounding, and records, per question, whether umtt.com.tw was among
 * the sources the model actually retrieved and whether UNITECH was named in the
 * answer. Results land in `geo/runs/<timestamp>.json` plus a markdown summary.
 *
 * The point is the series, not any one run. Same questions, same extraction,
 * month after month, so a change means something.
 *
 *   node scripts/geo-check.mjs                     all prompts
 *   node scripts/geo-check.mjs --locale en         one locale
 *   node scripts/geo-check.mjs --limit 3           a cheap smoke test
 *   node scripts/geo-check.mjs --model <name>      override the model
 *   node scripts/geo-check.mjs --models            list what the account has
 *
 * ---------------------------------------------------------------------------
 * KNOWN BLOCKER, measured 2026-09-09
 *
 * Google Search grounding is a billed feature and this key has no quota for it.
 * Plain text generation on the same model returns 200; adding
 * `tools: [{ google_search: {} }]` returns 429 on every attempt. This is the
 * same root cause that blocks scripts/gen-image.mjs: the consumer Gemini
 * subscription and the Gemini API are separate products, and billing has to be
 * enabled on the key's project. The script detects this case and says so rather
 * than dumping the raw payload.
 *
 * Until then the question set is still worth having: paste the prompts into
 * ChatGPT, Perplexity, Claude and Google AI Overviews by hand and record the
 * answers. That is slower but it is the same measurement, and it covers engines
 * this script cannot reach at all.
 *
 * Because grounded responses cannot currently be exercised end to end, every
 * run persists the raw groundingChunks alongside the derived verdict. If the
 * citation heuristic below turns out to read the wrong field, the runs are
 * still re-analysable without having to pay for them twice.
 * ---------------------------------------------------------------------------
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://generativelanguage.googleapis.com/v1beta';
/* Confirmed reachable on this account: plain generation returns 200. Other
   names in the models list 404 for this key even though they are listed. */
const DEFAULT_MODEL = 'gemini-3.8-flash';

/* ---------------------------------------------------------------- key --- */

function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  const envPath = join(ROOT, '.env.local');
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
  }
  fail('No GEMINI_API_KEY. Put it in .env.local (gitignored) or the environment.');
}

function fail(msg) {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
}

/* --------------------------------------------------------------- args --- */

const argv = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? dflt : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

/* ------------------------------------------------------------- models --- */

async function listModels(key) {
  const res = await fetch(`${API}/models?pageSize=200`, {
    headers: { 'x-goog-api-key': key },
  });
  const body = await res.json();
  if (!res.ok) fail(`Listing models failed (${res.status}): ${body?.error?.message ?? ''}`);
  for (const m of body.models ?? []) {
    if (!(m.supportedGenerationMethods ?? []).includes('generateContent')) continue;
    console.log(`  ${m.name.replace('models/', '')}`);
  }
}

/* ---------------------------------------------------------------- ask --- */

async function ask(key, model, text) {
  const res = await fetch(`${API}/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text }] }],
      tools: [{ google_search: {} }],
    }),
  });

  const body = await res.json().catch(() => ({}));

  if (res.status === 429) {
    return { blocked: 'quota', status: 429, message: body?.error?.message ?? '' };
  }
  if (!res.ok) {
    return { blocked: 'error', status: res.status, message: body?.error?.message ?? '' };
  }

  const cand = body.candidates?.[0] ?? {};
  const answer = (cand.content?.parts ?? []).map((p) => p.text ?? '').join('');
  const grounding = cand.groundingMetadata ?? {};
  return {
    answer,
    /* Raw, so a wrong heuristic can be re-derived later without re-paying. */
    groundingChunks: grounding.groundingChunks ?? [],
    searchQueries: grounding.webSearchQueries ?? [],
  };
}

/* ------------------------------------------------------------- verdict --- */

/**
 * Gemini returns grounding sources as vertexaisearch redirect URLs rather than
 * the publisher's own URL, with the domain usually in `title`. Both fields are
 * checked, plus the answer text, because which one carries the domain has
 * changed before and the raw chunks are kept precisely so this can be revised.
 */
function verdict(result, target) {
  const chunks = result.groundingChunks ?? [];
  const haystack = chunks
    .map((c) => `${c.web?.uri ?? ''} ${c.web?.title ?? ''} ${c.web?.domain ?? ''}`)
    .join(' ')
    .toLowerCase();

  const answer = (result.answer ?? '').toLowerCase();
  const cited = haystack.includes(target.domain.toLowerCase());
  const named = target.names.some((n) => answer.includes(n.toLowerCase()));

  const sources = chunks.map((c) => c.web?.title || c.web?.uri || '(unknown)');
  return { cited, named, sourceCount: chunks.length, sources };
}

/* ---------------------------------------------------------------- run --- */

const key = loadKey();
const model = arg('model', DEFAULT_MODEL);

if (has('models')) {
  await listModels(key);
  process.exit(0);
}

const set = JSON.parse(readFileSync(join(ROOT, 'geo/prompts.json'), 'utf8'));
const localeFilter = arg('locale');
const limit = Number(arg('limit', '0')) || 0;

let prompts = set.prompts.filter((p) => !p.retired);
if (localeFilter) prompts = prompts.filter((p) => p.locale === localeFilter);
if (limit) prompts = prompts.slice(0, limit);

console.log(`\n  model   ${model}`);
console.log(`  prompts ${prompts.length} of ${set.prompts.length}`);
console.log(`  target  ${set.target.domain}\n`);

const results = [];
let blockedBy = null;

for (const [i, p] of prompts.entries()) {
  process.stdout.write(`  [${String(i + 1).padStart(2)}/${prompts.length}] ${p.id} ... `);
  const r = await ask(key, model, p.text);

  if (r.blocked) {
    blockedBy = r;
    console.log(`blocked (${r.status})`);
    break;
  }

  const v = verdict(r, set.target);
  results.push({ ...p, ...v, answer: r.answer, groundingChunks: r.groundingChunks });
  console.log(v.cited ? 'CITED' : v.named ? 'named, not cited' : 'absent');

  // Be polite to the API between questions.
  await new Promise((r) => setTimeout(r, 1500));
}

if (blockedBy?.blocked === 'quota') {
  console.error(`
  BLOCKED: no Google Search grounding quota on this API key.

  Plain text generation on ${model} works; the same call with
  google_search attached returns 429. Grounding is a billed feature, so
  billing has to be enabled on the key's Google Cloud project. A consumer
  Gemini subscription does not grant API quota; they are separate products.

  This is the same blocker as scripts/gen-image.mjs.

  Meanwhile the question set is still the measurement: run the prompts in
  geo/prompts.json by hand against ChatGPT, Perplexity, Claude and Google
  AI Overviews, and record what each one cites. Slower, but it reaches
  engines this script cannot.

  API said: ${blockedBy.message.slice(0, 160)}
`);
  process.exit(2);
}

if (blockedBy) {
  fail(`Request failed (${blockedBy.status}): ${blockedBy.message.slice(0, 200)}`);
}

/* -------------------------------------------------------------- write --- */

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const dir = join(ROOT, 'geo/runs');
mkdirSync(dir, { recursive: true });

const cited = results.filter((r) => r.cited).length;
const named = results.filter((r) => r.named).length;

writeFileSync(
  join(dir, `${stamp}.json`),
  JSON.stringify({ at: new Date().toISOString(), model, promptSetVersion: set.version, results }, null, 2)
);

const md = [
  `# GEO visibility run ${stamp}`,
  '',
  `- model: \`${model}\``,
  `- prompt set: v${set.version}`,
  `- cited (umtt.com.tw among retrieved sources): **${cited} / ${results.length}**`,
  `- named (UNITECH in the answer text): **${named} / ${results.length}**`,
  '',
  '| question | locale | cited | named | sources |',
  '|---|---|---|---|---|',
  ...results.map((r) => `| ${r.id} | ${r.locale} | ${r.cited ? 'yes' : 'no'} | ${r.named ? 'yes' : 'no'} | ${r.sourceCount} |`),
].join('\n');

writeFileSync(join(dir, `${stamp}.md`), md + '\n');

console.log(`\n  cited ${cited}/${results.length}   named ${named}/${results.length}`);
console.log(`  written to geo/runs/${stamp}.{json,md}\n`);
