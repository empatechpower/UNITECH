/**
 * Service areas per page. Titles and descriptions stay in the translation
 * files; this only maps which keys belong to which page and what imagery each
 * area uses.
 *
 * Image note: only three area-specific photographs exist at usable quality
 * (metal working, CNC, polymer moulding). The rest reuse the real section
 * photography rather than the old pixelated cut-outs, which look worse the
 * larger they are shown, and this layout shows them large.
 */
export interface ServiceArea {
  titleKey: string;
  descKey: string;
  image: string;
}

export interface ServiceDefinition {
  slug: string;
  dictKey: 'machinery' | 'manufacturing' | 'oem' | 'partnerships';
  hero: string;
  areas: ServiceArea[];
}

export const services: ServiceDefinition[] = [
  {
    slug: 'machinery',
    dictKey: 'machinery',
    hero: '/images/homepage/DSC_0015-machinery.jpg',
    areas: [
      { titleKey: 'metal_working_title', descKey: 'metal_working_desc', image: '/images/solutions/metal-working.png' },
      { titleKey: 'cnc_title', descKey: 'cnc_desc', image: '/images/portfolio/cnc-machining.png' },
      { titleKey: 'welding_title', descKey: 'welding_desc', image: '/images/homepage/DSC_0015-machinery.jpg' },
      { titleKey: 'assembly_title', descKey: 'assembly_desc', image: '/images/homepage-editorial/capability-automation.png' },
      { titleKey: 'polymer_title', descKey: 'polymer_desc', image: '/images/portfolio/polymer-moulding.png' },
      { titleKey: 'food_title', descKey: 'food_desc', image: '/images/solutions/mechanical2.jpg' },
    ],
  },
  {
    slug: 'manufacturing',
    dictKey: 'manufacturing',
    hero: '/images/homepage/Lead_image-manufacturing.jpg',
    areas: [
      { titleKey: 'stampings_title', descKey: 'stampings_desc', image: '/images/solutions/slot-punch-array.jpg' },
      { titleKey: 'forgings_title', descKey: 'forgings_desc', image: '/images/solutions/bg-Metal.jpg' },
      { titleKey: 'rubber_title', descKey: 'rubber_desc', image: '/images/portfolio/polymer-moulding.png' },
      { titleKey: 'castings_title', descKey: 'castings_desc', image: '/images/solutions/metal-working.png' },
      { titleKey: 'cnc_title', descKey: 'cnc_desc', image: '/images/portfolio/cnc-machining.png' },
      { titleKey: 'electronics_title', descKey: 'electronics_desc', image: '/images/homepage-editorial/advantage-innovation.png' },
      { titleKey: 'fasteners_title', descKey: 'fasteners_desc', image: '/images/solutions/mechanical.jpg' },
      { titleKey: 'custom_title', descKey: 'custom_desc', image: '/images/homepage/Lead_image-manufacturing.jpg' },
    ],
  },
  {
    slug: 'oem-products',
    dictKey: 'oem',
    hero: '/images/homepage/oem-product.jpg',
    areas: [
      { titleKey: 'mobility_title', descKey: 'mobility_desc', image: '/images/homepage-editorial/advantage-reach.png' },
      { titleKey: 'healthcare_title', descKey: 'healthcare_desc', image: '/images/homepage-editorial/advantage-precision.png' },
      { titleKey: 'power_title', descKey: 'power_desc', image: '/images/homepage-editorial/selector-green.png' },
      { titleKey: 'materials_title', descKey: 'materials_desc', image: '/images/homepage/oem-product.jpg' },
    ],
  },
  {
    slug: 'partnerships',
    dictKey: 'partnerships',
    hero: '/images/homepage/partnerships.jpg',
    areas: [
      { titleKey: 'benefit1_title', descKey: 'benefit1_desc', image: '/images/homepage/partnerships.jpg' },
      { titleKey: 'benefit2_title', descKey: 'benefit2_desc', image: '/images/homepage-editorial/selector-industrial.png' },
      { titleKey: 'benefit3_title', descKey: 'benefit3_desc', image: '/images/solutions/mechanical.jpg' },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
