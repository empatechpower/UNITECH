/**
 * The AI crawler table. One source for both halves of the policy: what
 * `robots.ts` allows, and what the middleware counts.
 *
 * They must not drift. Allowing a bot you do not count means you cannot tell
 * whether the permission did anything; counting one you do not allow means
 * reading zeros and concluding the crawler is ignoring you.
 *
 * `agent` is the exact token for robots.txt. `match` is a lowercase substring
 * test against the User-Agent header, which is looser on purpose: real headers
 * carry version suffixes and URLs around the token.
 */

export type CrawlerKind = 'search' | 'training';

export interface Crawler {
  agent: string;
  match: string;
  kind: CrawlerKind;
  note: string;
}

export const CRAWLERS: Crawler[] = [
  /* Retrieval and answer engines. These decide whether the site can be cited
     in a generated answer. Blocking any one of them opts out of that engine's
     results, which is the opposite of the point. */
  { agent: 'OAI-SearchBot', match: 'oai-searchbot', kind: 'search', note: 'ChatGPT Search indexing' },
  { agent: 'ChatGPT-User', match: 'chatgpt-user', kind: 'search', note: 'ChatGPT fetching for a user' },
  { agent: 'Claude-SearchBot', match: 'claude-searchbot', kind: 'search', note: 'Claude search indexing' },
  { agent: 'Claude-User', match: 'claude-user', kind: 'search', note: 'Claude fetching for a user' },
  { agent: 'PerplexityBot', match: 'perplexitybot', kind: 'search', note: 'Perplexity indexing' },
  { agent: 'Perplexity-User', match: 'perplexity-user', kind: 'search', note: 'Perplexity fetching for a user' },
  { agent: 'Google-Extended', match: 'google-extended', kind: 'search', note: 'gates Gemini and AI Overviews' },
  { agent: 'Applebot-Extended', match: 'applebot-extended', kind: 'search', note: 'Apple Intelligence' },

  /* Foundation-model training corpora. Allowing these is an IP decision for the
     client, not a visibility one: denying them costs no citations. Kept in the
     same table so they are counted either way, and so the two policies cannot
     be edited into each other by accident. */
  { agent: 'GPTBot', match: 'gptbot', kind: 'training', note: 'OpenAI training' },
  { agent: 'ClaudeBot', match: 'claudebot', kind: 'training', note: "Anthropic's general crawler" },
  { agent: 'CCBot', match: 'ccbot', kind: 'training', note: 'Common Crawl' },
  { agent: 'anthropic-ai', match: 'anthropic-ai', kind: 'training', note: 'Anthropic training' },
  { agent: 'Bytespider', match: 'bytespider', kind: 'training', note: 'ByteDance training' },
];

export const agentsOfKind = (kind: CrawlerKind) =>
  CRAWLERS.filter((c) => c.kind === kind).map((c) => c.agent);

/**
 * Which crawler, if any, sent this request. Ordered longest-match-first so
 * "Claude-SearchBot" is not swallowed by a shorter token that is a prefix of
 * it; the current table has no such overlap, but the next one added might.
 */
const BY_LENGTH = [...CRAWLERS].sort((a, b) => b.match.length - a.match.length);

export function identifyCrawler(userAgent: string | null): Crawler | undefined {
  if (!userAgent) return undefined;
  const ua = userAgent.toLowerCase();
  return BY_LENGTH.find((c) => ua.includes(c.match));
}
