# Locofo Catalog — B2B product demo (MH900)

Desktop-first interactive catalog demo for **Decathlon CAT.2-4 Sunglasses MH900 Full Lens HD** (Grey Volcano · 8827754). Matches the Figma **Catalog UI — MH900 v1** frames: PDP with 360° frame scrub, shortlist drawer, and Haloo-style PDF export.

## Run locally

No build step required — static HTML/CSS/JS.

```bash
# From the repo root
python3 -m http.server 8080
# or: npx --yes serve -p 8080
```

Open [http://localhost:8080](http://localhost:8080) in a desktop browser (~1440px width recommended).

## Features

- **PDP** — Copy and tabs on the left; product 360 on the right. Nav: Products, Shortlist count, Export PDF. Wholesale chip: “Wholesale demo · price on request”.
- **360 viewer** — Seven local frames in `frames/`. Scroll the wheel over the product area or drag horizontally to advance; pills and `n / 7` badge update.
- **Tabs** — Description, Details, Weight, Colors (click to switch).
- **Shortlist** — “Save to shortlist” persists to `localStorage`; drawer lists items with Remove; count in nav updates after refresh.
- **PDF** — `pdf.html` Haloo-style spec sheet with logistics placeholders; use **Print / Save PDF** for export.

## Assets

- `frames/01.jpg`–`07.jpg` — 360 sequence (do not hotlink external CDN URLs).
- `figma-shots/` — Reference screenshots from Figma.
- `scroll-360-reference.html` — Earlier scroll prototype (behavior reference only).

## Design source

[Figma — Catalog UI MH900 v1](https://www.figma.com/design/wuHRlPAk9qQC5x6HAihMqQ/Untitled?node-id=35-2)

## Notes

- Desktop-first; mobile breakpoints intentionally omitted for v1.
- Demo only — not affiliated with Decathlon or Apple.
