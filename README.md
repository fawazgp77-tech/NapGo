# NapGo Landing Page

A modern, premium, fully responsive landing page for NapGo, an ergonomic travel pillow designed for upright rest during long journeys.

## Overview

The site tells the NapGo product story through a clean consumer-product landing page experience: problem, solution, feature hotspots, how it works, comparison, user journey, testimonials, FAQ, and final call to action.

## Files

- `index.html` - Page structure and content.
- `styles.css` - Responsive layout, visual system, animations, cards, nav, hotspots, and FAQ styling.
- `script.js` - Sticky nav behavior, reveal animations, interactive hotspots, FAQ accordion, and parallax.
- `assets/napgo-product.png` - Main NapGo product image.
- `assets/traditional-pillow-problem.png` - Problem section illustration.
- `assets/napgo-logo-icon.svg` - Minimal black and blue NapGo logo icon.

## Main Features

- Sticky transparent navigation that becomes solid on scroll.
- Premium hero section with product image and highlighted background ring.
- Interactive product hotspots for visible pillow features.
- Responsive feature cards, comparison table, user journey, testimonials, and FAQ.
- Smooth scrolling, fade-in reveals, hover effects, subtle parallax, and mobile navigation.

## Local Preview

Open `index.html` directly in a browser, or run a local static server from this folder:

```bash
python -m http.server 4173
```

Then visit:

```text
http://127.0.0.1:4173
```

## Customization

- Update hero copy in `index.html` inside the `hero-copy` block.
- Adjust colors in `styles.css` under the `:root` variables.
- Move feature hotspot positions in `index.html` by changing each hotspot's `--x` and `--y` percentages.
- Replace product imagery by updating files in the `assets` folder while keeping the same filenames.
