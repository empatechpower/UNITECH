/**
 * The company's own facts, in one place: the contact screen shows them and the
 * Organization schema asserts them, so both read from here rather than from
 * two copies that could drift.
 *
 * Sources, and every value below is traceable to one of them:
 *
 * - The client, by message on 2026-09-18, answering the launch inputs request
 *   (section A): address, phone, RFQ email, UBN, founding year.
 * - Taiwan's company registry (GCIS open data, queried by UBN 53556225 on the
 *   same day): the registered Chinese address, the exact setup date, and the
 *   registered Chinese name. The registry agreed with everything the client sent.
 *
 * **The registered Chinese name is not the one the site uses.** The registry
 * has 優利特科技股份有限公司; the /zh pages say 優尼泰克製造技術台灣有限公司,
 * which does not appear in the registry at all. It may be a trading name or it
 * may be a translation someone made up; that is the client's call, so the
 * display name in translations/zh.json is untouched and only `legalNameZh`
 * below, which is what the schema's `legalName` asserts, carries the registry
 * form.
 */

export const company = {
  /** Registered Chinese name, from the registry. See the note above. */
  legalNameZh: '優利特科技股份有限公司',

  /** Unified Business Number (統一編號), Taiwan's company registration number. */
  ubn: '53556225',

  /** Registry setup date, ROC 100-11-21. The client gave the year as 2011. */
  founded: '2011-11-21',

  address: {
    /** Exactly as the client wrote it. */
    en: '1F., No. 473, Sec. 1, Dongxing Rd., Nantun Dist., Taichung City 408409, Taiwan (R.O.C.)',
    /** The registry's form, with the client's postal code in the Taiwanese
        position at the front. Not a transliteration of the English. */
    zh: '408409 臺中市南屯區豐樂里東興路一段473號1樓',
    street: '1F., No. 473, Sec. 1, Dongxing Rd., Nantun Dist.',
    locality: 'Taichung City',
    postalCode: '408409',
    country: 'TW',
  },

  phone: {
    display: '+886 4 2471 3400',
    /** E.164, for tel: links and the schema. */
    e164: '+886424713400',
  },

  /** For RFQs. The contact form is meant to deliver to a different address,
      which is deliberately not here: it belongs server-side with the form
      handler, not in a module the client bundle imports. */
  email: 'sales@umtt.com.tw',
} as const;
