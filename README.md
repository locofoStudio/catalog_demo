# Locofo Catalog — B2B product demo (MH900 + MH500 + Anti-Fog)

Desktop-first interactive catalog demo for China→US/EU buyer presentations. Three live SKUs:

- **MH900 Full Lens HD** (Grey Volcano · 8827754) — `product.html`
- **MH500 Category 3** (Smoked black · 863953) — `product-mh500.html`
- **Anti-Fog Full UV Sport** (White / Snow white · 8648844) — `product-antifog.html`

Matches the Figma **Catalog UI — MH900 v1** chrome: PDP with 360° frame scrub, shortlist drawer, and Haloo-style PDF export (one sheet per shortlisted product).

## Run locally

No build step required — static HTML/CSS/JS.

```bash
# From this folder
python3 -m http.server 8080
# or: npx --yes serve -p 8080
```

Open [http://localhost:8080](http://localhost:8080) in a desktop browser (~1440px width recommended).

Or open files directly:

- `index.html` — catalog grid
- `product.html` — MH900 PDP
- `product-mh500.html` — MH500 PDP
- `product-antifog.html` — Anti-Fog PDP
- `pdf.html` — Print / Save PDF (reads shortlist from `localStorage`)

## Features

- **Catalog grid** — `index.html` lists running/cycling sunglasses-style cards. **MH900**, **MH500**, and **Anti-Fog** open interactive PDPs; Active 100 / Explore 500 remain mock samples.
- **PDP** — copy and tabs on the left; product 360 on the right. Nav: Products → grid, Shortlist count, Export PDF. Wholesale chip: “Wholesale demo · price on request” (no retail prices).
- **360 viewer** — local frames (`frames/` for MH900, `frames-mh500/` for MH500, `frames-antifog/` for Anti-Fog). Scroll or drag to advance; pills and `n / N` badge update. Tabs sync to frames 0–3.
- **Shortlist** — “Save to shortlist” persists product ids to `localStorage`; drawer lists **all** shortlisted SKUs from `LOCOFO_PRODUCTS`.
- **PDF** — `pdf.html` renders one cube-style spec sheet per shortlisted product (fallback: MH900 if empty). **Print / Save PDF** prints all sheets. Footer: Locofo Catalog · PRIVATE AND CONFIDENTIAL.

## Catalog data

`js/product.js` defines `window.LOCOFO_PRODUCTS` (keyed by model id). Each PDP sets the current SKU via `LocofoCatalog.setCurrent(...)` before `spin.js` / `app.js` run.

## Assets

- `frames/01.jpg`–`07.jpg` — MH900 360 sequence (PDP uses 01–04).
- `frames-mh500/01.jpg`–`07.jpg` — MH500 sequence (PDP uses 01–04; thumb/PDF side = 01 + 04).
- `frames-antifog/01.jpg`–`08.jpg` — Anti-Fog sequence (PDP uses 01–04; thumb/PDF side = 01 + 04).
- `figma-shots/` — Reference screenshots from Figma.
- `scroll-360-reference.html` — Earlier scroll prototype (behavior reference only).

## Design source

[Figma — Catalog UI MH900 v1](https://www.figma.com/design/wuHRlPAk9qQC5x6HAihMqQ/Untitled?node-id=35-2)

## Notes

- Desktop-first; mobile breakpoints intentionally omitted for v1.
- Demo only — not affiliated with Decathlon or Apple.
