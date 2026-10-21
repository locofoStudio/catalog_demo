/** Locofo catalog SKUs - shared by listing, PDP, shortlist, and PDF export */
window.LOCOFO_PRODUCTS = {
  '8827754': {
    id: '8827754',
    title: 'CAT.2-4 Sunglasses MH900',
    subtitle: 'MH900 Full Lens HD',
    variant: 'Grey Volcano',
    eyebrow: 'CAT.2-4 · MH900 Full Lens HD',
    frames: [
      'frames/01.jpg',
      'frames/02.jpg',
      'frames/03.jpg',
      'frames/04.jpg',
    ],
    thumb: 'frames/01.jpg',
    pdfThumbA: 'frames/01.jpg',
    pdfThumbB: 'frames/04.jpg',
    pdfTitle: 'CAT.2-4 SUNGLASSES',
    pdfMeta: 'MH900 Full Lens HD · Grey Volcano · Model 8827754',
    pdfHeroAlt: 'CAT.2-4 Sunglasses MH900 Grey Volcano',
    summary:
      'Optimal precision and quality of vision for mountain use. Photochromic full-lens HD sunglasses with adjustable fit and ventilated wraparound coverage - built for China→US/EU buyer presentations.',
    bullets: [
      'Photochromic CAT 2–4 · 100% UV',
      'Ventilated lens · Adjustable nose & arms',
      'Wraparound coverage · Soft case included',
    ],
    materials: [
      'Frame: SEBS 30% / Polyamide 60% / Stainless 10%',
      'Lens: 100% Polyurethane · Screws: Stainless steel',
    ],
    weightLines: ['Product net weight: 36 g · One size', 'Soft case included'],
    performance: ['CAT 2–4 photochromic · 100% UV filter', 'Ventilated · Wraparound coverage'],
    logistics: [
      'Case pack: [placeholder] / carton · Origin: China',
      'Loading qty: [placeholder] - confirm with ops',
    ],
  },
  '8648844': {
    id: '8648844',
    title: 'Anti-Fog Full UV Protection Sport Sunglasses',
    subtitle: 'Perf 500 Light / Anti-Fog Sport',
    variant: 'White (Snow white)',
    eyebrow: 'CAT.3 · Perf 500 Light',
    frames: [
      'frames-antifog/01.jpg',
      'frames-antifog/02.jpg',
      'frames-antifog/03.jpg',
      'frames-antifog/04.jpg',
    ],
    thumb: 'frames-antifog/01.jpg',
    pdfThumbA: 'frames-antifog/01.jpg',
    pdfThumbB: 'frames-antifog/04.jpg',
    pdfTitle: 'ANTI-FOG SPORT SUNGLASSES',
    pdfMeta: 'Perf 500 Light · White (Snow white) · Model 8648844',
    pdfHeroAlt: 'Anti-Fog Full UV Protection Sport Sunglasses White',
    summary:
      'Category 3 lenses that block 100% of UV. Frameless wraparound sport sunglasses for running and cycling, with wide coverage against wind and debris - built for China→US/EU buyer presentations.',
    bullets: [
      'CAT 3 · 100% UV / ISO 12312-1',
      'Anti-fog ventilated lens · Polycarbonate',
      'Wraparound coverage · Grips on nose & temples',
    ],
    materials: [
      'Lens: Polycarbonate',
      'Frame: Sport wraparound with grips on nose & temples',
    ],
    weightLines: ['Product net weight: 35.4 g · One size'],
    performance: [
      'CAT 3 · 100% UV / ISO 12312-1',
      'Anti-fog ventilated · Wraparound coverage',
    ],
    logistics: [
      'Case pack: [placeholder] / carton · Origin: China',
      'Loading qty: [placeholder] - confirm with ops',
    ],
  },
  '863953': {
    id: '863953',
    title: "Adults' Hiking Sunglasses MH500",
    subtitle: 'MH500 Category 3',
    variant: 'Smoked black',
    eyebrow: 'CAT.3 · MH500 Hiking',
    frames: [
      'frames-mh500/01.jpg',
      'frames-mh500/02.jpg',
      'frames-mh500/03.jpg',
      'frames-mh500/04.jpg',
    ],
    thumb: 'frames-mh500/01.jpg',
    pdfThumbA: 'frames-mh500/01.jpg',
    pdfThumbB: 'frames-mh500/04.jpg',
    pdfTitle: "ADULTS' HIKING SUNGLASSES MH500",
    pdfMeta: 'MH500 Category 3 · Smoked black · Model 863953',
    pdfHeroAlt: "Adults' Hiking Sunglasses MH500 Smoked black",
    summary:
      'Anti-UV lenses block 100% of UV; CAT 3 protects from glare; wraparound protects eyes even at the sides. Ideal for regular mountain hiking - light & supportive - built for China→US/EU buyer presentations.',
    bullets: [
      'Sun protection CAT 3 · 100% UV',
      'Wraparound coverage · Large field of vision',
      'Lightweight 29 g · Shaped temples for stability',
    ],
    materials: [
      'Lens: 100% Polycarbonate',
      'Frame: 100% Polyamide · Screws: Stainless steel',
    ],
    weightLines: ['Product net weight: 29 g · One size'],
    performance: [
      'CAT 3 · 100% UV',
      'Wraparound · Large lenses · Polycarbonate robustness',
    ],
    logistics: [
      'Case pack: [placeholder] / carton · Origin: China',
      'Loading qty: [placeholder] - confirm with ops',
    ],
  },
};

/** Default current product (listing / PDF fallback). PDP pages override after this script. */
window.LOCOFO_PRODUCT = window.LOCOFO_PRODUCTS['8827754'];

window.LocofoCatalog = {
  get(id) {
    return window.LOCOFO_PRODUCTS[id] || null;
  },
  setCurrent(id) {
    const p = window.LOCOFO_PRODUCTS[id];
    if (p) window.LOCOFO_PRODUCT = p;
    return window.LOCOFO_PRODUCT;
  },
};
