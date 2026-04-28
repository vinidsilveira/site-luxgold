# README.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Lux Gold** — institutional website for a men's semi-jewelry brand (correntes e pulseiras masculinas) based in Sapucaia do Sul, RS. Target audience: men aged 18–25. Brand voice: modern, direct, stylish, masculine. Visual identity: black & gold, minimalist luxury.

Static site — no build system. Open `index.html` directly in a browser or use `npx serve .` / VS Code Live Server.

## File Structure

```
index.html      — single-page site (all sections via anchor links)
css/style.css   — all styles (design tokens at :root, mobile-first)
js/main.js      — nav scroll, mobile menu, reveal observer, tab filter, form handler
```

## Design System

- **Fonts:** Cormorant (headings) + Montserrat (body) via Google Fonts
- **Colors:** defined as CSS custom properties in `:root` — `--gold: #C9A84C`, `--bg: #080808`, `--text`, `--border`, etc. Always use tokens, never raw hex.
- **Spacing:** 4/8px incremental system; section padding via `--section-pad` clamp
- **Breakpoints:** 480px / 768px / 1024px (mobile-first)

## Key Conventions

- SVG icons only (no emoji as icons)
- All interactive elements have `cursor: pointer` and visible focus states
- Animations respect `prefers-reduced-motion` (declared at bottom of CSS)
- `.reveal` + IntersectionObserver pattern for scroll animations
- Product cards use `data-category` attribute for JS tab filtering
- WhatsApp links use `wa.me/5551999999999` — update the phone number before going live
- Form submit sends via WhatsApp (`wa.me` with pre-filled text) as backend fallback

## Before Going Live

1. Replace `5551999999999` with the real WhatsApp number throughout `index.html` and `js/main.js`
2. Update `contato@luxgold.com.br` with the real email
3. Add real product photos — replace `.product-img-placeholder` divs with `<img>` tags (use WebP, declare width/height to prevent CLS)
4. Set `href` on social links (Instagram, TikTok, Facebook)
5. Update `<link rel="canonical">` URL
6. Add `favicon.ico` / PWA icons
