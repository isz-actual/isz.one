# CLAUDE.md

## Project Overview

**Ice Station Zebra (isz.one)** is a static HTML/CSS marketing website for Ice Station Zebra LLC, a challenge coin manufacturing and security consulting business based in Pittsburgh, PA. The site showcases coin products, explains the ordering process, and provides company/founder information.

## Repository Structure

```
isz.one/
├── assets/
│   └── css/
│       └── style.css           # Single minified CSS file (all styles)
├── index.html                  # Homepage (hero, featured coins, CTA)
├── gallery.html                # Coin image gallery (Squarespace CDN images)
├── process.html                # 5-step ordering process, specs table, FAQ
├── about.html                  # Company info, founder bio (Timothy E. Reed, CPP)
├── custom-order.html           # Custom order form (Google Forms integration)
└── CLAUDE.md                   # This file
```

## Technology Stack

- **HTML5** - Semantic markup, no templating engine
- **CSS3** - Custom properties, Grid, Flexbox, animations, responsive design
- **No JavaScript** - Entirely static, no JS anywhere
- **No build system** - No package.json, bundler, or compilation step
- **No backend** - Static files only; forms use Google Forms externally

## Development Workflow

### Running Locally

Open any HTML file directly in a browser, or use any static file server:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

No build, install, or compilation steps are required.

### Deployment

The site can be deployed to any static hosting platform (GitHub Pages, Netlify, Vercel, etc.) by serving the repository root directory as-is.

## Design System & CSS

All styles live in `assets/css/style.css` (minified, single line).

### Color Palette (CSS Custom Properties)

| Variable           | Value     | Usage                        |
|--------------------|-----------|------------------------------|
| `--primary-navy`   | `#0052CC` | Primary brand blue           |
| `--bright-blue`    | `#1E90FF` | Headings, links              |
| `--dark-bg`        | `#0f1419` | Page background              |
| `--card-bg`        | `#1a1f2e` | Card/section backgrounds     |
| `--accent-gold`    | `#D4AF37` | Accent highlights, gold trim |
| `--text-light`     | `#e8e9ed` | Primary text color           |
| `--text-muted`     | `#a0a5b5` | Secondary/muted text         |
| `--border-color`   | `#2a2f3f` | Borders and dividers         |

### Key CSS Components

- `.navbar` - Sticky top nav with gradient background and blur backdrop
- `.hero` - Full-width hero sections with gradient backgrounds
- `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-outline` / `.btn-large` - Button system
- `.coin-grid` / `.coin-card` - Grid layout for coin cards
- `.gallery-grid` / `.gallery-item` - Image gallery with hover overlays
- `.process-timeline` / `.process-step` / `.process-number` - Numbered process steps
- `.footer` / `.footer-content` / `.footer-section` - Grid-based footer
- `.container` - Max-width 1200px centered wrapper

### Responsive Breakpoint

Single breakpoint at `768px` for mobile. Below this width:
- Navigation gaps reduce, font size shrinks
- Hero grid collapses to single column
- Buttons become full-width
- Gallery grid uses smaller minimums
- Process steps stack vertically

## Page Structure Conventions

Each HTML page follows this structure:
1. `<!DOCTYPE html>` declaration
2. `<head>` with charset, viewport, title, stylesheet link
3. `<nav class="navbar">` - Consistent navigation across all pages (active page marked with `class="nav-link active"`)
4. `<section class="hero">` - Page header/hero
5. Content sections (page-specific)
6. `<section class="cta-section">` - Call-to-action before footer
7. `<footer class="footer">` - Consistent footer with company info, quick links, shop links

### Navigation Links (5 pages)

| Label        | File              | Description                  |
|--------------|-------------------|------------------------------|
| Home         | `index.html`      | Landing page                 |
| Gallery      | `gallery.html`    | Coin image showcase          |
| How It Works | `process.html`    | Ordering process & specs     |
| About        | `about.html`      | Company & founder details    |
| Custom Order | `custom-order.html` | Order form (CTA-styled link) |

## External Services

- **Shopify Store**: `https://iszactual.myshopify.com/` - E-commerce storefront
- **Google Forms**: Used for custom order submissions (form ID placeholder: `YOUR_FORM_ID_HERE`)
- **Squarespace CDN**: Gallery images hosted externally (`images.squarespace-cdn.com`)
- **LinkedIn**: Company page at `linkedin.com/company/ice-station-zebra-llc`
- **Portfolio**: `icestationzebra.myportfolio.com` - Full portfolio gallery

## Known Issues & Notes

- **Missing local assets**: `assets/images/logo.png` and `assets/images/favicon.png` are referenced in HTML but not present in the repository. Images are served from external CDN.
- **Google Form placeholder**: `custom-order.html` contains `YOUR_FORM_ID_HERE` as a placeholder form URL that needs to be replaced with the actual Google Form ID.
- **Mixed formatting**: `index.html` and `gallery.html` have indented/formatted HTML. `about.html`, `process.html`, and `custom-order.html` are minified (single-line HTML).
- **No `.gitignore`**: The repository has no `.gitignore` file.

## Git Conventions

Commit messages follow the pattern: `Add <thing> with <description>` or `Create <thing>`.

Examples from history:
- `Create index.html`
- `Add initial CSS styles for the application`
- `Add initial gallery.html with complete structure`
- `Add about.html with company information and details`

## Coding Conventions

- **Font stack**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter Tight', sans-serif`
- **Border radius**: `4px` consistently (no rounded corners)
- **Transitions**: Use `var(--transition)` (`all 0.3s ease`)
- **Gradients**: `linear-gradient(135deg, ...)` used throughout for backgrounds
- **Inline styles**: Some pages use inline `style` attributes for one-off layout adjustments (padding, margins, grid definitions)
- **External links**: Always use `target="_blank"` for links to external sites
- **Contact email**: `tim@icestationzebra.one` (used site-wide)
