# Ice Station Zebra (isz.one)

Marketing website for **Ice Station Zebra LLC**, a custom challenge coin, lapel pin, and patch maker based in Pittsburgh, PA. The site showcases the work, explains the custom-order process, and routes inquiries through an AI intake agent.

Live: https://isz.one

## Stack

- Static HTML and CSS. No framework, no build step.
- One shared stylesheet at `assets/css/style.css` (arctic-hybrid theme).
- Minimal JavaScript: a single iframe-resize listener on `custom-order.html` for the embedded intake widget. No other scripts.

## Hosting and deploy

- Hosted on **GitHub Pages** from the `main` branch, custom domain `isz.one` (see `CNAME`).
- **Every merge to `main` auto-deploys.** No manual step.
- Local preview:
  ```
  python3 -m http.server 8000
  # visit http://localhost:8000
  ```

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home: hero, featured work, audience sections, Death Coin spotlight, catalog |
| `masonic.html` | Masonic and Fraternal landing page |
| `military.html` | Military and Veteran landing page |
| `public-safety.html` | Police, Fire and EMS landing page |
| `gallery.html` | Coin image gallery |
| `portfolio/index.html` | Full portfolio |
| `process.html` | How custom orders work, specs, FAQ |
| `design-guide.html` | Design guidance for buyers |
| `estimator.html` | Pricing estimator |
| `about.html` | Company and founder (Timothy E. Reed, CPP) |
| `assessment.html` | Security assessment tool |
| `custom-order.html` | Custom order intake (embeds the AI intake agent) |
| `advisory.html` | Advisory page |

## Navigation

Shared across pages: Home, a **Coins** dropdown (Masonic / Military / Police, Fire and EMS), Gallery, Portfolio, How It Works, Estimator, About, Shop, and a Custom Order call to action. Mobile uses a CSS-only hamburger (no JavaScript). `design-guide.html` and `advisory.html` use their own standalone layouts.

## Brand and theme

Arctic-hybrid palette, defined as CSS custom properties in `assets/css/style.css`:

| Variable | Value | Use |
|---|---|---|
| `--dark-bg` | `#0B1F33` | Page background (Midnight Signal Blue) |
| `--bright-blue` | `#00A4CC` | Headings and links (Electric Fade) |
| `--accent-gold` | `#D4AF37` | Accent (coin metal) |
| `--text-light` | `#F6F7F8` | Text (Signal White) |

## External services

- **Shopify** storefront: https://iszactual.myshopify.com (collections linked from the site)
- **AI intake agent**: `https://webhook.isz.one/intake/widget`, embedded on `custom-order.html` (creates a HubSpot deal on completion)
- **LinkedIn**: https://www.linkedin.com/company/ice-station-zebra-llc

## Conventions

- Dark theme, `4px` border radius, `linear-gradient(135deg, ...)` accents.
- Each page carries its own page-specific `<style>` block for layout, on top of the shared stylesheet.
- Commit style: `Add <thing> with <description>` or `Create <thing>`.
- Contact: `sales@isz.one`.

---

(c) Ice Station Zebra LLC, Pittsburgh, PA.
