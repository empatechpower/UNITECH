import type { IndustryTheme } from '@/lib/industry-theme-types';

/**
 * What a visitor sees after choosing a pathway.
 *
 * PROVISIONAL SPLIT. Every category below is a real UNITECH offering, but which
 * pathway each one belongs to is still awaiting the client's answer on the
 * Industrial / Sustainable taxonomy. The assignment here is a placeholder so the
 * mechanic can be reviewed. Re-sorting later means moving entries between the
 * two arrays in this file and nothing else: no component, route or layout reads
 * the taxonomy anywhere but here.
 */

export interface Capability {
  /** Rendered larger and given two grid slots. One per pathway. */
  featured?: boolean;
  href: string;
  en: { title: string; body: string };
  zh: { title: string; body: string };
}

export interface PathwaySet {
  image: string;
  imageAlt: { en: string; zh: string };
  capabilities: Capability[];
}

export const pathwayCapabilities: Record<IndustryTheme, PathwaySet> = {
  industrial: {
    image: '/images/homepage-editorial/capability-automation.png',
    imageAlt: {
      en: 'Robotic assembly cell on a Taiwanese production floor',
      zh: '台灣產線上的機器人組裝單元',
    },
    capabilities: [
      {
        featured: true,
        href: '/services/machinery',
        en: { title: 'Machinery', body: 'Press lines, CNC, welding and assembly cells, integrated and tested before shipping.' },
        zh: { title: '機械設備', body: '沖壓生產線、CNC、焊接與組裝單元，出貨前完成整合與測試。' },
      },
      {
        href: '/services/manufacturing',
        en: { title: 'Stampings & Forgings', body: 'High-volume metal forming to drawing.' },
        zh: { title: '沖壓與鍛造', body: '依圖面進行大量金屬成型。' },
      },
      {
        href: '/services/manufacturing',
        en: { title: 'Castings & Sintering', body: 'Casting, sintering and metal injection moulding.' },
        zh: { title: '鑄造與燒結', body: '鑄造、粉末燒結與金屬射出成型。' },
      },
      {
        href: '/services/manufacturing',
        en: { title: 'Fasteners & Parts', body: 'Precision components from certified partners.' },
        zh: { title: '扣件與零件', body: '來自認證夥伴的精密零組件。' },
      },
      {
        href: '/services/machinery',
        en: { title: 'Polymer Moulding', body: 'Rubber and plastics tooling and production.' },
        zh: { title: '高分子成型', body: '橡膠與塑膠模具及生產。' },
      },
    ],
  },

  green: {
    image: '/images/homepage-editorial/selector-green.png',
    imageAlt: {
      en: 'Solar module inspection in a Taiwanese facility',
      zh: '台灣廠區內的太陽能模組檢測',
    },
    capabilities: [
      {
        featured: true,
        href: '/services/oem-products',
        en: { title: 'Clean Energy Systems', body: 'Power and energy hardware built to spec for the transition.' },
        zh: { title: '潔淨能源系統', body: '依規格打造的電力與能源硬體，支援能源轉型。' },
      },
      {
        href: '/services/manufacturing',
        en: { title: 'Circular Manufacturing', body: 'Material recovery designed into the process.' },
        zh: { title: '循環製造', body: '將材料回收納入製程設計。' },
      },
      {
        href: '/services/machinery',
        en: { title: 'Food Processing', body: 'Processing and preservation machinery.' },
        zh: { title: '食品加工', body: '食品加工與保鮮機械。' },
      },
      {
        href: '/services/oem-products',
        en: { title: 'Advanced Materials', body: 'Material technology for lower-impact products.' },
        zh: { title: '先進材料', body: '降低環境衝擊的材料技術。' },
      },
      {
        href: '/services/partnerships',
        en: { title: 'Partner Network', body: '20+ certified partners across Taiwan.' },
        zh: { title: '夥伴網絡', body: '橫跨台灣的 20 多家認證夥伴。' },
      },
    ],
  },
};
