export type ResourceCategoryKey =
  | 'taiwan-manufacturing'
  | 'sustainability'
  | 'industry-insights'
  | 'case-studies'
  | 'whitepapers';

export const categoryLabels: Record<ResourceCategoryKey, { en: string; zh: string }> = {
  'taiwan-manufacturing': { en: 'Taiwan Manufacturing', zh: '台灣製造' },
  sustainability: { en: 'Sustainability', zh: '永續發展' },
  'industry-insights': { en: 'Industry Insights', zh: '產業洞察' },
  'case-studies': { en: 'Case Studies', zh: '案例研究' },
  whitepapers: { en: 'Whitepapers', zh: '白皮書' },
};

export interface ResourceArticle {
  slug: string;
  category: ResourceCategoryKey;
  image: string;
  readTime: number;
  en: { title: string; excerpt: string; body: string[] };
  zh: { title: string; excerpt: string; body: string[] };
}

export const resourceArticles: ResourceArticle[] = [
  {
    slug: 'taiwan-precision-manufacturing-ecosystem',
    category: 'taiwan-manufacturing',
    image: '/images/homepage-editorial/hero.png',
    readTime: 5,
    en: {
      title: "Inside Taiwan's Precision Manufacturing Ecosystem",
      excerpt: "How a dense, certified network of partners lets Taiwan hit tolerances most manufacturing hubs can't touch.",
      body: [
        "Taiwan's manufacturing strength was never built by a single giant factory. It was built by thousands of specialized workshops, each mastering one process — stamping, forging, precision machining — to a standard few countries can match at volume.",
        "For a company like UNITECH, that density is the advantage. Instead of one factory's capacity, clients draw on a curated network of 20+ certified partners, each vetted for the same standard of tolerance, traceability, and delivery reliability.",
      ],
    },
    zh: {
      title: '深入台灣精密製造生態系',
      excerpt: '緊密且經認證的合作網絡，讓台灣能達成多數製造重鎮難以企及的公差標準。',
      body: [
        '台灣的製造實力從來不是靠單一大型工廠建立起來的，而是由數千家專業工坊共同成就 —— 沖壓、鍛造、精密加工，每一項製程都精益求精，達到少有國家能在量產規模下企及的標準。',
        '對 UNITECH 而言，這種產業密度正是核心優勢。客戶所倚賴的不只是單一工廠的產能，而是一個經過嚴選、擁有 20 多家認證合作夥伴的網絡，每一家都通過相同標準的公差、可追溯性與交期可靠度審核。',
      ],
    },
  },
  {
    slug: 'green-technology-reshaping-production',
    category: 'sustainability',
    image: '/images/homepage-editorial/selector-green.png',
    readTime: 4,
    en: {
      title: 'How Green Technology Is Reshaping Industrial Production',
      excerpt: "Renewable infrastructure and circular manufacturing are no longer side projects — they're becoming the production line itself.",
      body: [
        'For decades, sustainability in manufacturing meant compliance — cleaner emissions, better waste handling. Today it means something closer to a redesign: solar-integrated facilities, closed-loop material recovery, and supply chains built around reuse rather than disposal.',
        "Taiwan's technology sector is positioned unusually well for this shift. The same precision engineering culture that built its semiconductor and machinery industries now applies directly to solar manufacturing, battery systems, and smart-grid components.",
      ],
    },
    zh: {
      title: '綠色科技如何重塑工業生產',
      excerpt: '再生能源基礎設施與循環製造已不再是附屬專案 —— 它們正逐漸成為生產線本身。',
      body: [
        '數十年來，製造業的永續發展多半意味著法規遵循 —— 更潔淨的排放、更妥善的廢棄物處理。如今，它更接近一場全面的重新設計：整合太陽能的廠房、閉環式材料回收，以及以再利用而非丟棄為核心的供應鏈。',
        '台灣的科技產業在這波轉型中具備獨特優勢。造就半導體與機械產業的精密工程文化，如今直接應用於太陽能製造、電池系統與智慧電網元件。',
      ],
    },
  },
  {
    slug: 'engineering-advantage-20-years-partnerships',
    category: 'industry-insights',
    image: '/images/homepage-editorial/advantage-innovation.png',
    readTime: 6,
    en: {
      title: 'Engineering Advantage: What 20+ Years of Partnerships Taught Us',
      excerpt: 'The lessons that only come from two decades of RFQs, tooling revisions, and shipped containers.',
      body: [
        'Every long-term manufacturing partnership eventually teaches the same lesson: the quote is the easy part. What separates a reliable partner from a risky one shows up months later — in tooling revisions, in how a supplier handles a failed inspection, in whether a delivery date actually holds.',
        'Two decades of RFQs have shaped how UNITECH vets partners before a client ever sees a quote: certification checks, capacity audits, and a track record reviewed as carefully as the part drawing itself.',
      ],
    },
    zh: {
      title: '工程優勢：20 多年合作關係教會我們的事',
      excerpt: '唯有二十年的詢價、模具修正與貨櫃出貨經驗，才能累積出的體悟。',
      body: [
        '每一段長期的製造合作關係，最終都會教會你同一個道理：報價從來不是最難的部分。真正區分可靠夥伴與高風險夥伴的關鍵，往往在數月後才會顯現 —— 模具的修正次數、供應商面對驗貨失敗時的應對方式，以及交期是否真的能被信守。',
        '二十年的詢價經驗，形塑了 UNITECH 在客戶看到報價之前，如何審核合作夥伴：認證審查、產能稽核，以及像審視零件圖面一樣審慎檢視的過往紀錄。',
      ],
    },
  },
  {
    slug: 'precision-behind-every-micron',
    category: 'industry-insights',
    image: '/images/homepage-editorial/advantage-precision.png',
    readTime: 5,
    en: {
      title: 'The Precision Behind Every Micron',
      excerpt: "A closer look at the tolerances, inspection standards, and quiet discipline behind Taiwan's machining reputation.",
      body: [
        'A tolerance of ±0.005mm sounds abstract until you see what it takes to hold it consistently across a production run of a hundred thousand parts. It requires machines calibrated daily, operators trained for years, and inspection built into every stage rather than bolted on at the end.',
        "That discipline, more than any single piece of equipment, is what Taiwan's machining sector is actually known for — and what makes it possible to promise a tolerance and mean it.",
      ],
    },
    zh: {
      title: '每一微米背後的精密工藝',
      excerpt: '深入探討台灣加工產業聲譽背後的公差標準、檢驗規範與默默堅持的職人精神。',
      body: [
        '±0.005mm 的公差聽起來很抽象，直到你親眼見證，要在十萬件零件的量產過程中持續維持這樣的精度需要付出什麼：每日校正的機台、歷經多年訓練的操作人員，以及貫穿每一道製程、而非事後補強的檢驗機制。',
        '比起任何一台設備，這種紀律才是台灣加工產業真正聞名之處 —— 也是讓「承諾的公差」真正兌現的關鍵。',
      ],
    },
  },
  {
    slug: 'rfq-to-global-delivery-case-study',
    category: 'case-studies',
    image: '/images/portfolio/ASSEMBLY-AUTOMATION.png',
    readTime: 7,
    en: {
      title: 'From RFQ to Global Delivery: A Cross-Border Case Study',
      excerpt: "How one automation line moved from spec sheet to a client's production floor on three continents.",
      body: [
        'A mid-size automotive supplier needed an assembly line that could be replicated at three facilities — one in Mexico, one in Turkey, one in India — without losing a single tolerance in translation. The brief was less about the machine than about repeatability.',
        'The line was engineered, proven, and tested in Taiwan first, then shipped as a validated process rather than just equipment. Each facility received the same documentation, the same calibration standard, and support through the first production run.',
      ],
    },
    zh: {
      title: '從詢價到全球交付：跨國案例研究',
      excerpt: '一條自動化產線如何從規格書，一路交付到橫跨三大洲的客戶產線現場。',
      body: [
        '一家中型汽車零件供應商，需要一條能在三處廠房 —— 墨西哥、土耳其、印度 —— 複製部署、且不因跨國複製而流失任何公差的組裝產線。這個案子的重點與其說是設備本身，不如說是「可複製性」。',
        '這條產線先在台灣完成工程設計、驗證與測試，最終交付的不僅是設備，而是一套經過驗證的完整製程。每一處廠房都收到相同的技術文件、相同的校正標準，並在首次量產階段獲得全程支援。',
      ],
    },
  },
  {
    slug: 'rethinking-supply-chains-toward-taiwan',
    category: 'whitepapers',
    image: '/images/homepage-editorial/advantage-reach.png',
    readTime: 4,
    en: {
      title: 'Why Global Brands Are Rethinking Supply Chains Toward Taiwan',
      excerpt: "A short look at the sourcing shift behind Taiwan's growing share of precision manufacturing orders.",
      body: [
        'Supply chain resilience has moved from a procurement footnote to a boardroom priority. Companies that once optimized purely for unit cost are now weighing lead time volatility, IP exposure, and quality consistency just as heavily.',
        "Taiwan's position — an established manufacturing base with strong IP protection, direct English-language project management, and proximity to the rest of Asia's supply base — has made it a natural landing point for that reassessment.",
      ],
    },
    zh: {
      title: '全球品牌為何重新思考轉向台灣的供應鏈布局',
      excerpt: '簡述台灣精密製造訂單佔比持續成長背後的採購策略轉變。',
      body: [
        '供應鏈韌性已從採購部門的附註事項，躍升為董事會層級的優先議題。過去純粹以單位成本為導向的企業，如今同樣重視交期波動、智慧財產權曝險與品質一致性。',
        '台灣兼具成熟的製造基礎、健全的智慧財產權保護、直接以英語溝通的專案管理能力，以及緊鄰亞洲其他供應鏈基地的地理優勢 —— 這些條件使其自然成為這波供應鏈重新評估浪潮的理想落點。',
      ],
    },
  },
  {
    slug: 'circular-manufacturing-future-oem',
    category: 'sustainability',
    image: '/images/homepage-editorial/capability-automation.png',
    readTime: 5,
    en: {
      title: 'Building Resilience: Circular Manufacturing and OEM Production',
      excerpt: 'What it actually takes to design an OEM product line around reuse instead of replacement.',
      body: [
        'Circular manufacturing sounds simple in a slide deck — design for disassembly, recover materials, reduce waste. In an active OEM production line, it means renegotiating tooling, material specs, and supplier agreements all at once.',
        'The OEM lines built around this thinking today — from mobility products to power systems — tend to share one trait: sustainability was a design constraint from day one, not a retrofit applied after launch.',
      ],
    },
    zh: {
      title: '打造韌性：循環製造與 OEM 生產',
      excerpt: '要將 OEM 產品線真正圍繞「再利用」而非「汰換」來設計，實際上需要付出什麼？',
      body: [
        '循環製造在簡報上聽起來很單純 —— 易拆解設計、材料回收、減少浪費。但在實際運作中的 OEM 產線裡，這意味著要同時重新協商模具、材料規格與供應商合約。',
        '如今圍繞這種思維打造的 OEM 產線 —— 從移動出行產品到電力系統 —— 往往有一個共通點：永續性從第一天就是設計限制條件，而非產品上市後才追加的補救措施。',
      ],
    },
  },
];

export function getResourceArticle(slug: string): ResourceArticle | undefined {
  return resourceArticles.find((a) => a.slug === slug);
}
