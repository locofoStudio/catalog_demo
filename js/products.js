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
  };

  const listing = [
    {
      id: '8827754',
      name: 'CAT.2-4 Sunglasses MH900 Full Lens HD',
      variant: 'Grey Volcano',
      ref: '8827754',
      badge: 'CAT 2–4 · Photochromic',
      live: true,
    },
    {
      id: 'mh500-cat3',
      name: 'Sunglasses MH500 Cat 3',
      variant: 'Black / Blue lenses',
      ref: '8776054',
      badge: 'CAT 3',
      live: false,
      placeholder: 'ph-mh500',
    },
    {
      id: '8648844',
      name: 'Anti-Fog Full UV Protection Sport Sunglasses',
      variant: 'Snow white / White',
      ref: '8648844',
      badge: 'CAT 3 · Anti-fog',
      live: true,
    },
    {
      id: 'active-100',
      name: 'Sunglasses Active 100 Cat 3',
      variant: 'Grey / Smoke lens',
      ref: '8545258',
      badge: 'CAT 3 · Sport',
      live: false,
      placeholder: 'ph-active',
    },
    {
      id: 'explore-500',
      name: 'Sunglasses Explore 500 SQR',
      variant: 'Khaki / Brown lens',
      ref: '8776051',
      badge: 'Square frame',
      live: false,
      placeholder: 'ph-explore',
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
        if (!row.live) return row;
        const p = products[row.id];
        if (!p) return row;
        return {
          ...row,
          href: p.pdpHref,
          thumb: p.thumb,
          placeholder: null,
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
