/** Shared product registry — listing, PDP, shortlist, PDF */
(function () {
  const MH900_FRAMES = [
    'frames/01.jpg',
    'frames/02.jpg',
    'frames/03.jpg',
    'frames/04.jpg',
    'frames/05.jpg',
    'frames/06.jpg',
    'frames/07.jpg',
  ];

  const ANTIFOG_FRAMES = [
    'frames-antifog/01.jpg',
    'frames-antifog/02.jpg',
    'frames-antifog/03.jpg',
    'frames-antifog/04.jpg',
    'frames-antifog/05.jpg',
    'frames-antifog/06.jpg',
    'frames-antifog/07.jpg',
  ];

  const MH500_FRAMES = [
    'frames-mh500/01.jpg',
    'frames-mh500/02.jpg',
    'frames-mh500/03.jpg',
    'frames-mh500/04.jpg',
    'frames-mh500/05.jpg',
    'frames-mh500/06.jpg',
    'frames-mh500/07.jpg',
  ];

  const products = {
    '8827754': {
      id: '8827754',
      title: 'CAT.2-4 Sunglasses MH900',
      subtitle: 'MH900 Full Lens HD',
      variant: 'Grey Volcano',
      eyebrow: 'CAT.2-4 · MH900 Full Lens HD',
      pdpHref: 'product.html',
      frames: MH900_FRAMES,
      thumb: 'frames/01.jpg',
      pdf: {
        sheetTitle: 'CAT.2-4 SUNGLASSES',
        meta: 'MH900 Full Lens HD · Grey Volcano · Model 8827754',
        summary:
          'Optimal precision and quality of vision for mountain use. Photochromic full-lens HD sunglasses with adjustable fit and ventilated wraparound coverage — built for China→US/EU buyer presentations.',
        hero: 'frames/01.jpg',
        heroAlt: 'CAT.2-4 Sunglasses MH900 Grey Volcano',
        thumbs: ['frames/01.jpg', 'frames/04.jpg'],
        bullets: [
          'Photochromic CAT 2–4 · 100% UV',
          'Ventilated lens · Adjustable nose & arms',
          'Wraparound coverage · Soft case included',
        ],
        blocks: [
          {
            title: 'Materials',
            lines: [
              'Frame: SEBS 30% / Polyamide 60% / Stainless 10%',
              'Lens: 100% Polyurethane · Screws: Stainless steel',
            ],
          },
          {
            title: 'Dimensions / Weight',
            lines: ['Product net weight: 36 g · One size', 'Soft case included'],
          },
          {
            title: 'Performance',
            lines: ['CAT 2–4 photochromic · 100% UV filter', 'Ventilated · Wraparound coverage'],
          },
          {
            title: 'Logistics (placeholders — not final)',
            lines: [
              'Case pack: [placeholder] / carton · Origin: China',
              'Loading qty: [placeholder] — confirm with ops',
            ],
          },
        ],
      },
    },
    '8648844': {
      id: '8648844',
      title: 'Anti-Fog Sport Sunglasses Perf 500',
      subtitle: 'Perf 500 Light CAT 3',
      variant: 'Snow white / White',
      eyebrow: 'CAT 3 · Perf 500 Light Anti-Fog',
      pdpHref: 'product-antifog.html',
      frames: ANTIFOG_FRAMES,
      thumb: 'frames-antifog/01.jpg',
      pdf: {
        sheetTitle: 'ANTI-FOG SPORT SUNGLASSES',
        meta: 'Perf 500 Light CAT 3 · Snow white · Model 8648844',
        summary:
          'Full UV protection sport sunglasses for running and cycling in sunny weather. Frameless wraparound design with ventilated anti-fog treatment and secure nose/temple grips — B2B wholesale spec for buyer presentations.',
        hero: 'frames-antifog/01.jpg',
        heroAlt: 'Anti-Fog Sport Sunglasses White model 8648844',
        thumbs: ['frames-antifog/01.jpg', 'frames-antifog/05.jpg'],
        bullets: [
          'CAT 3 · 100% UV · ISO 12312-1',
          'Ventilated anti-fog · Polycarbonate lenses',
          'Frameless wraparound · Nose & temple grips',
        ],
        blocks: [
          {
            title: 'Materials',
            lines: [
              'Lens: Polycarbonate · Frameless wraparound chassis',
              'Nose pads & temple grips for secure fit',
            ],
          },
          {
            title: 'Dimensions / Weight',
            lines: ['Product net weight: 35.4 g · One size', 'Snow white / White colorway'],
          },
          {
            title: 'Performance',
            lines: [
              'CAT 3 · filters ~88% visible light · Sunny weather',
              '100% UV · ISO 12312-1 · Ventilated anti-fog',
            ],
          },
          {
            title: 'Logistics (placeholders — not final)',
            lines: [
              'Case pack: [placeholder] / carton · Origin: China',
              'Loading qty: [placeholder] — confirm with ops',
            ],
          },
        ],
      },
    },
    '863953': {
      id: '863953',
      title: "Adults' Hiking Sunglasses MH500",
      subtitle: 'MH500 Category 3',
      variant: 'Smoked black',
      eyebrow: 'CAT 3 · Quechua MH500 Hiking',
      pdpHref: 'product-mh500.html',
      frames: MH500_FRAMES,
      thumb: 'frames-mh500/01.jpg',
      pdf: {
        sheetTitle: 'HIKING SUNGLASSES MH500',
        meta: 'MH500 Category 3 · Smoked black · Model 863953',
        summary:
          "Lightweight Quechua hiking sunglasses for regular mountain use. CAT 3 lenses with wraparound coverage, large lenses for peripheral vision, and shaped temples for stability — wholesale spec for buyer presentations.",
        hero: 'frames-mh500/01.jpg',
        heroAlt: "Quechua MH500 Hiking Sunglasses Smoked black model 863953",
        thumbs: ['frames-mh500/01.jpg', 'frames-mh500/04.jpg'],
        bullets: [
          'CAT 3 · 100% UV · Wraparound coverage',
          '~29 g · Large lenses · Shaped temples',
          'Polycarbonate lenses · Polyamide frame',
        ],
        blocks: [
          {
            title: 'Materials',
            lines: [
              'Lens: Polycarbonate · Frame: Polyamide',
              'Screws: Stainless steel',
            ],
          },
          {
            title: 'Dimensions / Weight',
            lines: [
              'Product net weight: ~29 g · One size',
              'Smoked black colorway',
            ],
          },
          {
            title: 'Performance',
            lines: [
              'CAT 3 · 100% UV · Ideal for regular mountain hiking',
              'Wraparound vs wind, splash, weather · Peripheral vision',
            ],
          },
          {
            title: 'Accessories (optional)',
            lines: ['Compatible with MH ACC 100 L / 500 L retainer straps'],
          },
          {
            title: 'Logistics (placeholders — not final)',
            lines: [
              'Case pack: [placeholder] / carton · Origin: China',
              'Loading qty: [placeholder] — confirm with ops',
            ],
          },
        ],
      },
    },
  };

  /** Category grid — Figma Catalog UI MH900 v1 (only MH900 is interactive) */
  const listing = [
    {
      id: '8827754',
      interactive: true,
      title: 'MH900 Full Lens HD',
      subtitle: 'Grey Volcano · SKU 8827754',
      tags: 'CAT 2–4 · Photochromic · Mountain',
      media: 'mh900',
    },
    {
      id: '863953',
      interactive: true,
      title: 'MH500 Category 3',
      subtitle: 'Hiking sunglasses',
      tags: 'CAT 3 · Wraparound · Trail',
      media: 'mh500',
    },
    {
      id: '8648844',
      interactive: true,
      title: 'Anti-Fog Full UV Sport',
      subtitle: 'White · Ref 8648844',
      tags: 'CAT 3 · Anti-fog · Cycling',
      media: 'antifog',
    },
  ];

  window.LocofoCatalog = {
    products,
    listing,
    defaultPdfId: '8827754',

    getProduct(id) {
      return products[id] || null;
    },

    getListing() {
      return listing.map((row) => {
        if (!row.interactive) return row;
        const p = products[row.id];
        if (!p) return row;
        return {
          ...row,
          href: p.pdpHref,
          thumb: p.thumb,
        };
      });
    },

    resolveShortlistIds(ids) {
      return ids.map((id) => products[id]).filter(Boolean);
    },
  };

  /** @deprecated use LocofoCatalog.getProduct — set on PDP via product-boot.js */
  window.LOCOFO_PRODUCT = products['8827754'];
})();
