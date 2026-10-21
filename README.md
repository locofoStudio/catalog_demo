# Locofo Catalog — B2B product demo (MH900 v1)

Desktop + mobile UI aligned with Figma **Catalog UI — MH900 v1** (Hello Loco sign-off). Wholesale B2B demo for Decathlon-style sunglasses; **MH900** is the only interactive listing card; additional SKUs remain in the registry for deep-link PDPs and multi-sheet PDF tests.

## Run locally

```bash
python3 -m http.server 8080
# http://localhost:8080
```

Use ~1440px width for desktop QA and ≤900px (or device toolbar) for mobile layouts.

## Pages

| Page | Role |
|------|------|
| `index.html` | Category listing (3-col desktop / 1-col mobile) |
| `product.html` | **MH900** interactive PDP (copy left, stage right on desktop; stage top on mobile) |
| `product-mh500.html`, `product-antifog.html` | Extra PDPs (not linked from listing; optional for PDF/QA) |
| `pdf.html` | One Haloo-style sheet per shortlisted SKU; MH900 fallback if empty |

## Figma reference

[Catalog UI — MH900 v1](https://www.figma.com/design/wuHRlPAk9qQC5x6HAihMqQ/Untitled?node-id=35-2)

Key frames: desktop listing `54:2`, PDP Description `41:2`, Shortlist drawer `41:184`, PDF `35:254`; mobile listing `65:4`, PDP `67:2`, shortlist bottom sheet `67:180`.

## UI specs (implemented)

- **Brand:** Locofo Catalog; nav chip **Wholesale demo · price on request** (under title on mobile).
- **Listing:** **Price on request** on cards; MH900 **Interactive demo** badge; other cards **Demo sample** with gradient placeholders.
- **PDP:** No retail / Apple hero meta; 7-frame spin; **Export PDF** as outline button; shortlist drawer (desktop right rail / mobile ~70% bottom sheet).
- **PDF:** Logistics `[placeholder]` lines; multi-page print when multiple SKUs are shortlisted.

## Assets

- `frames/` — MH900 360
- `frames-mh500/`, `frames-antifog/` — optional PDP sequences
- `figma-shots/` — earlier reference stills

Demo only — not affiliated with Decathlon or Apple.
