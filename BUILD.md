# Locofo Catalog Demo - build brief (cloud agent)

## Repo
https://github.com/locofoStudio/catalog_demo.git

## Goal
Implement the interactive B2B product catalog demo from Figma into this repo as a working desktop-first website. Open a PR (do not push straight to main unless the repo is empty and has no default protection).

## Figma source of truth
https://www.figma.com/design/wuHRlPAk9qQC5x6HAihMqQ/Untitled?node-id=35-2
Page: **Catalog UI - MH900 v1**

Frames to implement:
- Desktop - Description (41:2) - primary PDP
- Desktop - Details / Weight / Colors (tab states)
- Desktop - Shortlist (41:184) - drawer overlay
- PDF Export - Haloo-style (35:254) - print/export view

Screenshots attached under uploads/figma-shots/ (or see repo handoff package).

## Product
Decathlon CAT.2-4 Sunglasses MH900 Full Lens HD - Grey Volcano (8827754)
7 angle photos: uploads/frames/01.jpg … 07.jpg (or catalog-glasses)

## Locked decisions
- Brand: **Locofo Catalog**
- Hide retail price; show “Wholesale demo · price on request”
- Logistics on PDF use labeled placeholders
- Desktop first; skip mobile breakpoints for v1
- Product media on the **RIGHT**; copy/tabs on the LEFT
- No Apple-style meta hero blurb under the product
- 360 = frame-sequence (scroll scrub + drag) using the 7 photos - not a live 3D engine

## Features (MVP)
1. Sticky/full-viewport PDP matching Figma: nav, tabs (Description/Details/Weight/Colors), CTAs
2. Scroll-scrubbed and/or drag 360 frame viewer with pills + “n / 7” badge
3. Shortlist: Save toggles drawer; localStorage persistence; count in nav
4. Export PDF: open/print the Haloo-style sheet (window.print or lightweight PDF lib); logistics placeholders only
5. Clean README with how to run locally

## Stack
Prefer simple static HTML/CSS/JS or Vite if the empty repo needs structure. Match existing repo stack if one already exists. Inter + Figma colors (#f5f5f7, #1d1d1f, #0071e3, #6e6e73). Do not require Tailwind unless already in the repo.

## Success criteria
- Visual match to Description / Shortlist / PDF screenshots on desktop ~1440
- All 7 frames load; scroll or drag advances frames; tabs switch content
- Shortlist save/remove works after refresh
- PDF export view printable with placeholders for case pack / loading
- README + PR description explain run instructions
