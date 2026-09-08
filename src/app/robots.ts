import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { agentsOfKind } from '@/lib/ai-crawlers';

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

/* Both lists come from `src/lib/ai-crawlers.ts`, which the middleware also
   reads to count arrivals. Allowing a bot you do not count means you cannot
   tell whether the permission did anything. */
const AI_SEARCH_AGENTS = agentsOfKind('search');
const AI_TRAINING_AGENTS = agentsOfKind('training');

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
