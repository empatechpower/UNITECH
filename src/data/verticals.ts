import type { IndustryTheme } from '@/lib/industry-theme-types';

/**
 * The four verticals, transcribed from the client's "Unitech Website Data"
 * sheet (pdfs/Unitech Website Data.pdf, one page, four columns).
 *
 * This file is the single source of truth for what UNITECH offers. It replaces
 * the provisional Industrial / Sustainable split that used to live in
 * capabilities.ts: the client's own document assigns the sectors, so the
 * taxonomy is no longer a placeholder.
 *
 * Two of the four verticals are pathway grounds reached from the fork on Home
 * (`industrial`, `green`); the other two are cross-cutting and reached from the
 * nav (`partnerships`, `part-supply`). They share one shape and one component,
 * because they share one shape in the source document.
 *
 * Copy is bilingual inline rather than in the translation files, following the
 * precedent set by capabilities.ts, so that re-sorting a sector between
 * verticals stays a single-file edit. Nav labels live in translations because
 * SiteNav reads the dictionary.
 *
 * Editorial note: only the client's apostrophe-plurals were corrected
 * ("SME's" -> "SMEs", "Camera's" -> "Cameras", "NVR's" -> "NVRs"). Technical
 * nomenclature is verbatim, including terms worth querying with the client
 * ("Silicon, TPE, TPM moulding").
 */

export interface Bilingual {
  en: string;
  zh: string;
}

export type VerticalKey = 'industrial' | 'green' | 'partnerships' | 'part-supply';

/**
 * How a vertical is composed.
 *
 * `split` is the spec sheet: photograph beside the copy, used by the two
 * pathway grounds because a visitor arrives there to compare capability.
 *
 * `cover` is the dossier cover: one full-bleed photograph with the copy set
 * into a wash of the ground. The two cross-cutting verticals use it, so that
 * arriving at Partnerships or Part Supply from the nav feels like opening a
 * different document rather than re-reading the pathway screen.
 */
export type VerticalLayout = 'split' | 'cover';

export interface Vertical {
  key: VerticalKey;
  layout: VerticalLayout;
  /** Set when the vertical is its own route rather than a pathway panel. */
  slug?: string;
  /**
   * Which ground the vertical paints. The two cross-cutting verticals inherit
   * whatever ground the visitor already chose, so they carry no theme.
   */
  theme?: IndustryTheme;
  image: string;
  /**
   * Which part of the photograph to keep. The left column is a tall narrow
   * strip, so a landscape source centre-cropped can land on an empty patch:
   * the industrial still centre-crops onto a blurred sleeve. Any CSS
   * object-position value; defaults to centre.
   */
  imagePosition?: string;
  imageAlt: Bilingual;
  /** Short form, for the panel header and the page eyebrow. */
  label: Bilingual;
  /** Long form, used as the page title on the two nav routes. */
  title: Bilingual;
  /** The one-line claim from the top of the column. */
  tagline: Bilingual;
  body: Bilingual[];
  registerHeading: Bilingual;
  sectors: Bilingual[];
}

const SECTORS_HEADING: Bilingual = {
  en: 'Sectors we cover',
  zh: '我們涵蓋的製造領域',
};

export const verticals: Record<VerticalKey, Vertical> = {
  industrial: {
    key: 'industrial',
    layout: 'split',
    theme: 'industrial',
    image: '/images/homepage-editorial/selector-industrial.png',
    imagePosition: '68% center',
    imageAlt: {
      en: 'Operator at a machining centre on a Taiwanese production floor',
      zh: '台灣產線上的加工中心機操作員',
    },
    label: { en: 'Industrial Manufacturing', zh: '工業製造' },
    title: { en: 'Industrial Manufacturing Lines', zh: '工業製造生產線' },
    tagline: {
      en: 'Integrated and automated metal and polymer manufacturing lines',
      zh: '整合式自動化金屬與高分子製造生產線',
    },
    body: [
      {
        en: 'With extensive experience in manufacturing a wide range of press lines and other metalforming machinery, we now offer fully integrated and automated manufacturing lines that enable you to seize supply chain opportunities with the shortest window and lowest risk.',
        zh: '憑藉製造各類沖壓生產線與其他金屬成型機械的豐富經驗，我們現提供完全整合的自動化製造生產線，讓您以最短的時程與最低的風險掌握供應鏈契機。',
      },
    ],
    registerHeading: SECTORS_HEADING,
    sectors: [
      {
        en: 'Mechanical, Hydraulic and Servo Press Lines integrated with Tools & Automation',
        zh: '機械、油壓與伺服沖壓生產線，整合模具與自動化',
      },
      {
        en: 'CNC Machining Centres integrated with Tools & Automation',
        zh: 'CNC 加工中心機，整合刀具與自動化',
      },
      { en: 'Friction, Laser and TiG welding Lines', zh: '摩擦、雷射與 TIG 焊接生產線' },
      { en: 'BLDC Motor design & manufacturing', zh: '無刷直流馬達設計與製造' },
      { en: 'EV Traction Motor design & manufacturing', zh: '電動車驅動馬達設計與製造' },
      {
        en: 'Rare earth Magnet-free Motor design & manufacturing',
        zh: '無稀土磁鐵馬達設計與製造',
      },
      { en: 'Terminal, Connectors and Precision Parts', zh: '端子、連接器與精密零件' },
      { en: 'Silicon, TPE, TPM moulding', zh: '矽膠、TPE、TPM 成型' },
      { en: 'Drone Motors & Parts', zh: '無人機馬達與零件' },
      { en: 'CCTV IP Cameras and NVRs', zh: 'CCTV 網路攝影機與 NVR' },
    ],
  },

  green: {
    key: 'green',
    layout: 'split',
    theme: 'green',
    image: '/images/homepage-editorial/selector-green.png',
    imageAlt: {
      en: 'Solar module inspection in a Taiwanese facility',
      zh: '台灣廠區內的太陽能模組檢測',
    },
    label: { en: 'Green Manufacturing', zh: '綠色製造' },
    title: { en: 'Green Manufacturing Lines', zh: '綠色製造生產線' },
    tagline: {
      en: 'Integrated manufacturing lines for food processing, recycling and energy generation',
      zh: '食品加工、資源回收與能源發電的整合製造生產線',
    },
    body: [
      {
        en: 'The consequences of climate change and social disruption cannot be ignored, and we contribute to mitigating the effects with technologies that can reduce our carbon footprint, improve the quality of life and improve the lives of the poor across all sectors.',
        zh: '氣候變遷與社會失衡的後果不容忽視。我們以能降低碳足跡的技術投入減緩，改善生活品質，並在各個領域改善弱勢族群的生活。',
      },
    ],
    registerHeading: SECTORS_HEADING,
    sectors: [
      { en: 'Hybrid Wind & Solar Energy systems', zh: '風光混合發電系統' },
      { en: 'Bottle to Bottle PET Recycling Lines', zh: '瓶對瓶 PET 回收再生產線' },
      { en: 'Food Processing & Preservation Lines', zh: '食品加工與保鮮生產線' },
      { en: 'Geriatric Care & Wellness Products', zh: '銀髮照護與健康產品' },
    ],
  },

  partnerships: {
    key: 'partnerships',
    layout: 'cover',
    slug: 'partnerships',
    image: '/images/homepage-editorial/vertical-partnerships.jpeg',
    imageAlt: {
      en: 'Taiwanese manufacturing engineers and a visiting partner reviewing technical drawings on a factory floor',
      zh: '台灣製造工程師與來訪夥伴在廠房內檢視技術圖面',
    },
    label: { en: 'Partnerships', zh: '合作夥伴' },
    title: { en: 'Manufacturing Partnerships', zh: '製造合作夥伴' },
    tagline: {
      en: 'Facilitating manufacturing joint ventures with the best of Taiwan SMEs',
      zh: '促成與台灣頂尖中小企業的製造合資合作',
    },
    body: [
      {
        en: 'With extensive SME relationships in Taiwan, we are best equipped to identify and structure a dynamic win-win manufacturing partnership that will not only allow you to scale up efficient manufacturing but also tap into Taiwan’s unique cost-effective manufacturing processes and give you access to their long-term global markets.',
        zh: '憑藉在台灣廣泛的中小企業人脈，我們最有能力為您尋找並建構動態雙贏的製造夥伴關係，不僅讓您擴大高效製造規模，更能運用台灣獨特且具成本效益的製造製程，並取得他們長期經營的全球市場。',
      },
      {
        en: 'We specialise and focus on Indo-Taiwan partnerships but can work globally in emerging economies, or even developed economies that need to revive SME manufacturing.',
        zh: '我們專注於印度與台灣之間的合作，但也能在新興經濟體，甚至是需要重振中小企業製造的成熟經濟體中，於全球範圍內展開合作。',
      },
    ],
    registerHeading: SECTORS_HEADING,
    sectors: [
      {
        en: 'Mechanical, Hydraulic and Servo Press Lines integrated with Tools & Automation',
        zh: '機械、油壓與伺服沖壓生產線，整合模具與自動化',
      },
      {
        en: 'Hot, Warm and Cold Forging Press Lines integrated with Tools & Automation',
        zh: '熱鍛、溫鍛與冷鍛壓造生產線，整合模具與自動化',
      },
      {
        en: 'CNC Machining Centres integrated with Tools & Automation',
        zh: 'CNC 加工中心機，整合刀具與自動化',
      },
      {
        en: 'Friction, Laser, Ultrasonic and TiG welding Lines',
        zh: '摩擦、雷射、超音波與 TIG 焊接生產線',
      },
      { en: 'BLDC Motor design & manufacturing', zh: '無刷直流馬達設計與製造' },
      { en: 'EV Traction Motor design & manufacturing', zh: '電動車驅動馬達設計與製造' },
      {
        en: 'Rare earth Magnet-free Motor design & manufacturing',
        zh: '無稀土磁鐵馬達設計與製造',
      },
      { en: 'Terminal, Connectors and Precision Parts', zh: '端子、連接器與精密零件' },
      { en: 'Silicon, TPE, TPM moulding', zh: '矽膠、TPE、TPM 成型' },
      { en: 'Drone Motors & Parts', zh: '無人機馬達與零件' },
      { en: 'CCTV IP Cameras and NVRs', zh: 'CCTV 網路攝影機與 NVR' },
      { en: 'LCD Display Units', zh: 'LCD 顯示模組' },
      { en: 'Hybrid Wind & Solar Energy systems', zh: '風光混合發電系統' },
      { en: 'Bottle to Bottle PET Recycling Lines', zh: '瓶對瓶 PET 回收再生產線' },
      { en: 'Food Processing & Preservation Lines', zh: '食品加工與保鮮生產線' },
      { en: 'Geriatric Care & Wellness Products', zh: '銀髮照護與健康產品' },
    ],
  },

  'part-supply': {
    key: 'part-supply',
    layout: 'cover',
    slug: 'part-supply',
    image: '/images/homepage/oem-product.jpg',
    imageAlt: {
      en: 'Precision components produced by a Taiwanese supplier',
      zh: '台灣供應商生產的精密零組件',
    },
    label: { en: 'Part Supply', zh: '零件供應' },
    title: { en: 'Part Supply from Taiwan', zh: '台灣零件供應' },
    tagline: {
      en: 'OEM and standard parts from Taiwan',
      zh: '來自台灣的 OEM 與標準零件',
    },
    body: [
      {
        en: 'With hundreds of SME manufacturers, Taiwan excels in high quality, reliable, JIT part supply to the global markets.',
        zh: '台灣擁有數百家中小型製造商，在高品質、可靠的及時 (JIT) 零件供應上表現卓越，服務全球市場。',
      },
      {
        en: 'High IP respect makes us exceptional partners for the development of new products.',
        zh: '對智慧財產權的高度尊重，使我們成為新產品開發的絕佳夥伴。',
      },
      {
        en: 'In many cases we can develop, prove the process and then transfer manufacturing to the country of your choice for more reliable and cost-effective manufacturing.',
        zh: '在許多情況下，我們可以完成開發、驗證製程，再將製造移轉至您指定的國家，以取得更可靠且更具成本效益的生產。',
      },
    ],
    registerHeading: {
      en: 'Parts we develop & supply',
      zh: '我們可開發與供應的零件',
    },
    sectors: [
      {
        en: 'Rotor, Stator and other Motor Parts for Industrial, Appliance or Mobility applications',
        zh: '工業、家電與移動應用之轉子、定子及其他馬達零件',
      },
      {
        en: 'LCD display for Industrial, Appliances and Automotive applications',
        zh: '工業、家電與車用 LCD 顯示器',
      },
      { en: 'CCTV IP Cameras & NVRs', zh: 'CCTV 網路攝影機與 NVR' },
      { en: 'Automotive Dash Cams and Displays', zh: '車用行車記錄器與顯示器' },
      { en: 'Precision Machined Parts', zh: '精密加工件' },
      {
        en: 'Precision Stamped Parts for Lead frames, Terminal and Connectors',
        zh: '導線架、端子與連接器精密沖壓件',
      },
      {
        en: 'Precision Forged, Die Cast and gravity cast Parts',
        zh: '精密鍛造、壓鑄與重力鑄造零件',
      },
      { en: 'MIM and metal printed Parts', zh: '金屬射出成型與金屬列印零件' },
    ],
  },
};

/** The two verticals that are their own routes, in nav order. */
export const navVerticals: Vertical[] = [verticals.partnerships, verticals['part-supply']];

export const getVerticalBySlug = (slug: string) =>
  navVerticals.find((v) => v.slug === slug);

/** The pathway verticals, keyed by the ground they paint. */
export const pathwayVerticals: Record<IndustryTheme, Vertical> = {
  industrial: verticals.industrial,
  green: verticals.green,
};
