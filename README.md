# Locofo Catalog — B2B product demo (MH900)

Desktop-first interactive catalog demo for **Decathlon CAT.2-4 Sunglasses MH900 Full Lens HD** (Grey Volcano · 8827754). Matches the Figma **Catalog UI — MH900 v1** frames: PDP with 360° frame scrub, shortlist drawer, and Haloo-style PDF export.

## Run locally

No build step required — static HTML/CSS/JS.

```bash
# From the repo root
python3 -m http.server 8080
# or: npx --yes serve -p 8080
```

Open [http://localhost:8080](http://localhost:8080) for the product grid. Interactive PDPs: **MH900** (`product.html`), **MH500 863953** (`product-mh500.html`), and **Anti-Fog 8648844** (`product-antifog.html`). Use a desktop browser (~1440px width recommended).

## Features

- **Product listing** (`index.html`) — Decathlon-style sunglasses grid; wholesale pricing only; three live cards (MH900, MH500 863953, Anti-Fog 8648844) plus mock demo cards.
- **PDPs** (`product.html`, `product-mh500.html`, `product-antifog.html`) — Copy and tabs on the left; product 360 on the right. Nav: Products, Shortlist count, Export PDF. Wholesale chip: “Wholesale demo · price on request”.
- **360 viewer** — Seven local frames in `frames/`. Scroll the wheel over the product area or drag horizontally to advance; pills and `n / 7` badge update.
- **Tabs** — Description, Details, Weight, Colors (click to switch).
- **Shortlist** — “Save to shortlist” persists to `localStorage`; drawer lists items with Remove; count in nav updates after refresh.
- **PDF** — `pdf.html` renders one Haloo-style sheet per shortlisted SKU (or MH900 demo if empty); use **Print / Save PDF** for multi-page export.

## Assets

- `frames/` — MH900; `frames-mh500/` — MH500 863953; `frames-antifog/` — Anti-Fog 8648844 (local 360 sequences only).
- `figma-shots/` — Reference screenshots from Figma.
- `scroll-360-reference.html` — Earlier scroll prototype (behavior reference only).

## Design source

[Figma — Catalog UI MH900 v1](https://www.figma.com/design/wuHRlPAk9qQC5x6HAihMqQ/Untitled?node-id=35-2)

## Notes

- Desktop-first; mobile breakpoints intentionally omitted for v1.
- Demo only — not affiliated with Decathlon or Apple.
