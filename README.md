# Phat Panda — Rebuild Deliverables (May 2026)

This folder contains everything from the rebuild — both the new static site (deploy-ready) and a React component version — plus the audit reports.

## What's in here

```
PhatPanda.com/
├── index.html               # New homepage (single-page with all sections)
├── careers.html             # /careers page
├── contact.html             # /contact page with working form scaffold
├── brand-guide.html         # /brand-guide page with copy-to-clipboard swatches
├── 404.html                 # Real 404 page (configure host to serve it)
├── robots.txt               # New — old site had none
├── sitemap.xml              # New — old site had none
├── assets/
│   ├── css/styles.css       # All styles, brand tokens, animations
│   ├── js/main.js           # Age gate, mobile menu, filters, scroll reveal, counters
│   └── img/favicon.svg      # Inline panda SVG
├── react-version/
│   ├── PhatPandaSite.jsx    # Drop-in React component (Tailwind)
│   └── README.md            # Setup for Next.js / Vite / CRA
├── SEO-AUDIT.md             # Full scorecard — 42/100, fix list
├── BROKEN-LINKS.md          # Every link verified, with fixes
└── AWARDS-AND-PRESS.md      # All recognition + press hits, with live URLs
```

## Deploy (static site)

Drop the root of this folder onto any static host:

- **Netlify / Vercel:** `git push` or drag-and-drop the folder
- **Cloudflare Pages:** point at this folder
- **DigitalOcean App Platform / S3 + CloudFront:** upload all files
- **GitHub Pages:** push and enable Pages on the branch

Hosts that handle 404 automatically (Netlify, Vercel, Cloudflare Pages) will pick up `404.html`. For Apache/nginx, add:

```apache
# .htaccess
ErrorDocument 404 /404.html
```

```nginx
# nginx
error_page 404 /404.html;
```

## What changed from the old site

**Killed / fixed:**
- Age gate "No" button that linked to `/google.com` (= homepage) — now redirects to google.com proper
- No `robots.txt` or `sitemap.xml` — both shipped
- No real 404 — shipped
- © 2018 — now dynamic year
- 2016 marijuana-sales stats in About copy — removed
- Deprecated `meta keywords` — removed
- Generic page titles ("Phat Panda") — now keyword + location
- "Read More" reused 7x — every press card now has unique anchor text
- Only 4 of 12 sub-brands on homepage — all 12 now in a filterable grid
- No awards anywhere on the marketing site — DOPE Cup, Cannabis Cup, Inlander, etc. now in an Awards strip
- Misspellings ("redudancies") — fixed

**Added:**
- Organization + LocalBusiness JSON-LD schema
- Open Graph + Twitter Card meta for rich social previews
- Skip-to-main link, ARIA labels, focus management — WCAG 2.1 AA
- `prefers-reduced-motion` support
- Mobile hamburger menu
- Animated stats counter
- Brand category filter chips
- Scroll-reveal observer
- Sticky header with scroll-state shadow
- Back-to-top button
- Contact form scaffold (needs backend wire-up)

## What still needs your input

1. **Adobe Fonts kit ID** — site uses Space Grotesk + Inter as fallbacks. Drop your Typekit `<link>` into each HTML `<head>` to switch to Termina + Early Sans Variable.
2. **Hi-res hero / brand photography** — currently using SVG illustration placeholders. Swap in your product shots.
3. **Real career listings** — `/careers.html` links to `/contact.html`; wire to a real ATS (Greenhouse, Lever, etc.) if you want apply-now flows.
4. **Contact form backend** — currently shows an alert. Wire to Formspree, Netlify Forms, or a serverless endpoint.
5. **Shopify / phatpandastore.com integration** — `Shop` CTAs link out; consider an embed if you want product cards on the marketing site.
6. **Google Search Console / Bing Webmaster Tools** — submit the new sitemap after deploy.
7. **Google Business Profile** — claim/optimize for the Spokane Valley HQ.

## Want me to take it further?

Reasonable next steps I can build:
- Press kit page with downloadable hi-res photos + founder bios
- `/news` or `/blog` section (huge SEO win — current site has zero fresh content)
- Live product feed from Shopify
- Cannabis Cup wins page with full strain database
- Multi-state retailer locator
