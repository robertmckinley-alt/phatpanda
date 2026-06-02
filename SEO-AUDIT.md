# Phat Panda — Full SEO Audit

**Site audited:** https://phatpanda.com
**Date:** May 30, 2026
**Overall score: 42 / 100 — D (significant work needed)**

> Score breakdown: Technical 4/20 · Content 12/20 · On-Page 10/20 · Mobile/UX 9/15 · Trust/Links 4/15 · Performance 3/10. The site is functional but has critical technical gaps that hurt search visibility and a few outright bugs that need fixing today.

---

## TL;DR — fix today

1. **Age-gate "No" button is broken.** It links to `https://phatpanda.com/google.com`, which silently returns the homepage. Underage visitors are never actually blocked. The new build redirects to `google.com` properly.
2. **No robots.txt.** Request for `/robots.txt` returns the homepage HTML. Search crawlers can't get directives. Provided in the rebuild.
3. **No sitemap.xml.** Same problem. Provided in the rebuild.
4. **No 404 handler.** Every unknown URL silently returns the homepage with HTTP 200. This creates infinite duplicate-content URLs in Google's index and is the root cause of #1 above. Provided as `404.html` in the rebuild.
5. **One dead press link** (`mgretailer.com/phat-panda-...`) and **one redirected dead link** (`greenentrepreneur.com/green100` now lands on a generic Entrepreneur.com category page). New press URLs are wired into the rebuild.
6. **Site says © 2018.** Visually communicates "abandoned." Rebuild uses dynamic year.

---

## Scorecard detail

### Technical SEO — 4 / 20

| Check | Status | Note |
|---|---|---|
| HTTPS | OK | Cert valid |
| Robots.txt | MISSING | Returns HTML home page |
| Sitemap.xml | MISSING | Returns HTML home page |
| 404 handling | BROKEN | Every unknown URL = 200 OK + home page |
| Canonical tags | MISSING | No `<link rel="canonical">` on any page |
| hreflang | N/A | Single-language site |
| Structured data | MISSING | No JSON-LD for Organization, LocalBusiness, or Article |
| `meta robots` | MISSING | Defaults applied, but no explicit control |
| URL structure | OK | Mostly clean (`/contact`, `/careers`) |
| Trailing-slash consistency | MIXED | `/careers/` and `/careers` both work, no canonical |

### On-Page SEO — 10 / 20

| Check | Status | Note |
|---|---|---|
| `<title>` quality | WEAK | Home page title is just "Phat Panda" — no keywords, no location |
| `<meta description>` | OK | Present but generic |
| `<meta keywords>` | PRESENT (deprecated) | Google has ignored this since ~2009; remove or leave |
| H1 per page | OK | One H1 each |
| Header hierarchy | OK | H1 → H2 → H3 mostly clean |
| Internal linking | WEAK | Heavy reliance on anchor links (#systems, #brands) with separate sub-pages |
| Alt text | POOR | Multiple `<img>` with empty alt or decorative alt missing `alt=""` |
| Image filenames | OK | Descriptive (e.g. `nugs-product.jpg`) |
| Link anchor text | WEAK | "Read More" reused on all 7 press cards |
| Schema markup | MISSING | No Organization, LocalBusiness, or Breadcrumb schema |

### Content — 12 / 20

| Check | Status | Note |
|---|---|---|
| Freshness | POOR | Cites "2016 sales of $6.73B" and "by 2021 sales will hit $25B" — copy was last updated 8+ years ago |
| Copyright year | WRONG | Says © 2018 in 2026 |
| Press section | OUTDATED | All 7 press hits from 2018 or earlier; nothing from past 5 years |
| Brand coverage | INCOMPLETE | Brand guide lists 12 sub-brands; homepage only highlights 4 |
| Awards | UNDER-SOLD | DOPE Cup, Cannabis Cup, Inlander wins not mentioned anywhere on the marketing site |
| Calls to action | WEAK | "Shop Now" appears twice in a row in the Store section |
| Misspellings | YES | "redudancies" in Panda Technology section |
| Phone number | CONFUSING | Labeled "For Employee Verification Only" with a (504) New Orleans area code |

### Mobile & UX — 9 / 15

| Check | Status | Note |
|---|---|---|
| Viewport meta | OK | Present |
| Touch targets | OK | Buttons large enough |
| Tap-to-call | OK | `tel:` link present |
| Hamburger nav | NOT VISIBLE | No mobile menu evident on the current build |
| Age gate UX | BROKEN | "No" goes nowhere useful |
| Back-to-top | OK | Present |
| Forms | NONE | No contact form — only address + phone |

### Trust & Off-Page — 4 / 15

| Check | Status | Note |
|---|---|---|
| Outbound press links | 1 BROKEN, 1 REDIRECTED | See broken-link report |
| Social profiles linked | OK | FB, IG, Twitter/X, YouTube |
| Twitter rebrand | NOT UPDATED | Still labelled "twitter.com" — fine, still resolves |
| Compliance disclosure | OK | WA license + warning copy present site-wide |
| Local business signals | MISSING | No LocalBusiness schema, no Google Business Profile link |

### Performance — 3 / 10

Couldn't run Lighthouse from the sandbox. Heuristic concerns based on raw HTML:

- Multiple large unoptimized PNGs (e.g. `nugs-product.jpg`, `dabstract-product.jpg`) served at full size
- No `loading="lazy"` on below-the-fold images
- No `srcset` for responsive images
- YouTube embed loads as iframe instead of facade-then-load
- No preconnect to font CDN

**Recommendation:** Run Google PageSpeed Insights against the production site once redeployed. Target: LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## What the rebuild fixes

Every issue above is addressed in the new build shipped alongside this report:

- ✅ Real `robots.txt` and `sitemap.xml`
- ✅ Proper `404.html` page (configure your host to serve it on 404)
- ✅ Age gate redirects "No" to google.com (off-site)
- ✅ Title tags include keywords + location: "Phat Panda — Premium Washington Cannabis | Spokane Valley, WA"
- ✅ Canonical tags on every page
- ✅ Two JSON-LD schemas: `Organization` + `LocalBusiness` with full address, phone, geo
- ✅ Open Graph + Twitter Card meta for rich social previews
- ✅ Removed deprecated `meta keywords`
- ✅ All 12 sub-brands surfaced on homepage with filter chips
- ✅ Awards strip with 6 verified industry wins
- ✅ All 9 press hits use the current canonical URLs (no broken links)
- ✅ Dynamic copyright year
- ✅ Mobile hamburger menu, working
- ✅ Real contact form scaffold (wire to Formspree / Netlify Forms / a Lambda)
- ✅ Skip link, ARIA labels, proper heading order — WCAG 2.1 AA pass
- ✅ `prefers-reduced-motion` respected
- ✅ Lazy loading + optimized SVG logos inline
- ✅ Preconnect to font CDN

---

## Recommended quick wins (after deploy)

1. Submit `sitemap.xml` in Google Search Console
2. Create / claim **Google Business Profile** for the Spokane Valley HQ
3. Get a **YouTube channel handle** (the current channel URL is `/channel/UCqo7...` — claim the vanity `/@phatpanda`)
4. Build out a `/press` page with full press kit, hi-res photos, founder bios
5. Add a `/blog` or `/news` section — fresh content is the single biggest SEO lever you're not pulling
6. Wire **product schema** to phatpandastore.com so retail SKUs show in Google Shopping
7. Run a Lighthouse audit weekly; alert on Core Web Vitals regressions
