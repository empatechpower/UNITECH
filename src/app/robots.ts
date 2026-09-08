import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * Before this file existed, /robots.txt returned 200 text/html: the request
 * fell through the middleware (it contains a dot, so the locale redirect skips
 * it) and was then matched by the `[locale]` dynamic segment, which treated
 * "robots.txt" as a locale, failed validation, fell back to English and served
 * the homepage. The same was true of /sitemap.xml and every other dotted path.
 *
 * Training and retrieval are separate crawlers, and blocking the first does not
 * exclude you from the second's answers. The two groups below are therefore
 * listed apart, so the training policy can be changed without touching the
 * search policy that AI citation actually depends on.
 */

/* Retrieval and answer-engine crawlers. These are the ones that decide whether
   the site can be cited in an AI-generated answer. Blocking any of them opts
   the site out of that engine's results. */
const AI_SEARCH_AGENTS = [
  'OAI-SearchBot', // ChatGPT Search indexing
  'ChatGPT-User', // ChatGPT fetching a page on a user's behalf
  'Claude-SearchBot', // Claude search indexing
  'Claude-User', // Claude fetching a page on a user's behalf
  'PerplexityBot', // Perplexity indexing
  'Perplexity-User',
  'Google-Extended', // gates Gemini and AI Overviews
  'Applebot-Extended',
];

/* Foundation-model training corpora. Allowing these is an IP decision for the
   client, not a visibility one: denying them costs no citations. To opt out,
   move this list into a disallow rule. It is deliberately kept separate so that
   change cannot accidentally take AI_SEARCH_AGENTS with it. */
const AI_TRAINING_AGENTS = ['GPTBot', 'CCBot', 'anthropic-ai', 'Bytespider'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        /* Next's build output and the image optimiser carry no indexable
           content of their own. */
        disallow: ['/_next/', '/api/'],
      },
      { userAgent: AI_SEARCH_AGENTS, allow: '/' },
      { userAgent: AI_TRAINING_AGENTS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
