import type { Locale } from '@/i18n/config';
import type { Vertical, Bilingual } from '@/data/verticals';
import { verticals } from '@/data/verticals';
import { company } from '@/data/company';
import { SITE_URL } from '@/lib/seo';

/**
 * JSON-LD for the site.
 *
 * The point of this file is entity grounding: an answer engine asked "who in
 * Taiwan supplies bottle to bottle PET recycling lines" has to be able to tell
 * that UNITECH is one organisation, that these four verticals belong to it, and
 * that the sector registers are an enumerated catalogue rather than a wall of
 * text. Everything here is generated from `verticals.ts` and the dictionaries,
 * so nothing has to be kept in sync by hand.
 *
 * **Nothing in here is asserted unless the site can support it.** The contact
 * facts come from `src/data/company.ts`, where every value is traced to the
 * client's own answer or to Taiwan's company registry. Business hours are still
 * left out: the site publishes them, but the client has not yet confirmed them.
 * Schema is exactly what an engine quotes back as fact, so an unconfirmed value
 * is worse than a missing one.
 */

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const LANG: Record<Locale, string> = { en: 'en', zh: 'zh-TW' };

const pick = (b: Bilingual, locale: Locale) => b[locale] ?? b.en;

/**
 * The sector vocabulary the company works in, taken from Partnerships because
 * it carries the union of both pathways. This is the most useful single field
 * on the Organization for retrieval: it is the client's own procurement
 * language, which is the language a buyer's question arrives in.
 */
const knowsAbout = (locale: Locale) =>
  verticals.partnerships.sectors.map((s) => pick(s, locale));

export function organizationSchema(locale: Locale, description: string) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Unitech Manufacturing Technologies Taiwan Co., Ltd.',
    alternateName: 'UNITECH',
    url: `${SITE_URL}/${locale}`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/common/logo-color.png`,
    },
    description,
    /* The registry's name, which differs from the display name above; see the
       note in company.ts. `legalName` is the field that ties this entity to
       the government record, which is the strongest signal we can give that
       the company is real. */
    legalName: company.legalNameZh,
    /* Taiwan's Unified Business Number. `taxID` because in Taiwan it is the
       tax registration number; `identifier` so the scheme is named. */
    taxID: company.ubn,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Unified Business Number (統一編號)',
      value: company.ubn,
    },
    foundingDate: company.founded,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    telephone: company.phone.e164,
    email: company.email,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: company.phone.e164,
      email: company.email,
      availableLanguage: ['en', 'zh-TW'],
    },
    /* No `sameAs` yet. The client sent directory homepages (Taiwantrade, CENS,
       TAITRA, web66) rather than UNITECH's own listings on them, and a personal
       LinkedIn profile. `sameAs` must point at pages about this organisation,
       so none of those qualify; the specific listing URLs are still to come. */
    knowsAbout: knowsAbout(locale),
  };
}

export function webSiteSchema(locale: Locale, name: string, description: string) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/${locale}`,
    name,
    description,
    inLanguage: LANG[locale],
    publisher: { '@id': ORG_ID },
  };
}

/**
 * A vertical as a service with an enumerated catalogue.
 *
 * `hasOfferCatalog` rather than a bare `ItemList`, because the sectors are
 * things the company offers rather than an arbitrary list, and the catalogue
 * form is what says so. The register on screen is the same data: 10, 4, 16 and
 * 8 items across the four verticals, terminal content with no per-sector
 * detail, so each entry is a name and nothing more. Giving them URLs or
 * descriptions would be inventing detail the client's data sheet does not
 * supply.
 */
export function verticalServiceSchema(locale: Locale, vertical: Vertical) {
  const url = `${SITE_URL}/${locale}/${vertical.slug}`;
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: pick(vertical.title, locale),
    description: pick(vertical.tagline, locale),
    url,
    serviceType: pick(vertical.label, locale),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: pick(vertical.registerHeading, locale),
      numberOfItems: vertical.sectors.length,
      itemListElement: vertical.sectors.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: pick(s, locale) },
      })),
    },
  };
}

export interface Crumb {
  name: string;
  /** Route below the locale segment, '' for the home screen. */
  path: string;
}

export function breadcrumbSchema(locale: Locale, homeName: string, trail: Crumb[]) {
  const items = [{ name: homeName, path: '' }, ...trail];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}/${locale}${c.path}`,
    })),
  };
}

/** Wraps nodes into the one `@graph` a page emits. */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
