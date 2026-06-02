# Phat Panda — Broken & Problem Link Report

Audit run: May 30, 2026 against https://phatpanda.com

## Critical (fix today)

| URL on phatpanda.com | Problem | Fix |
|---|---|---|
| `https://phatpanda.com/google.com` | Age-gate "No" button. Doesn't redirect off-site — server's catch-all silently returns the homepage. Underage visitors never blocked. | Point to `https://www.google.com` (done in rebuild) |
| `https://phatpanda.com/robots.txt` | Returns homepage HTML, not a robots file | Ship the new `robots.txt` |
| `https://phatpanda.com/sitemap.xml` | Same — returns homepage HTML | Ship the new `sitemap.xml` |
| `https://phatpanda.com/<any-unknown-url>` | Catch-all returns homepage with HTTP 200 | Configure host to serve `404.html` with a real 404 status |

## Dead / redirected external links

| URL on phatpanda.com | What's wrong | Replacement |
|---|---|---|
| `https://mgretailer.com/phat-panda-has-created-the-perfect-marijuana-strain-factory/` | Returns blank — MG Magazine moved the article under a sub-path | `https://mgretailer.com/business/growing-horticulture/phat-panda-has-created-the-perfect-marijuana-strain-factory/` |
| `https://www.greenentrepreneur.com/green100` | 301-redirects to `https://www.entrepreneur.com/building-a-business` — the Green 100 list page no longer exists | Replace with current High Times entry or remove |

## Needs protocol upgrade (http → https)

These work today but the link is hard-coded `http://`. Each destination 301-redirects to https, which is a wasted hop and a small SEO hit.

| Old | New |
|---|---|
| `http://growopfarms.com/` | `https://growopfarms.com/` |
| `http://www.dabstract.com/` | `https://www.dabstract.com/` |
| `http://www.ggstrains.com/` | `https://ggstrains.com/` |
| `http://www.hotsugar.com/` | `https://www.hotsugar.com/` |
| `http://www.phatpandastore.com/` | `https://phatpandastore.com/` |
| `http://www.spokesman.com/stories/2018/apr/20/grow-op-farms-in-spokane-valley-expanding-its-alre/` | `https://www.spokesman.com/...` |

## Verified OK

These all return real content as expected: homepage, brand-guide, careers (+ WA/MA/CA sub-pages), contact, systems, all social profiles, all sub-brand domains except as noted above, all press links except as noted above.

## Minor

- `[ https://www.youtube.com/...]` link has an extra leading space inside the href.
- The site references both `/contact` and `/contact/` interchangeably; pick one with a canonical tag.
- The footer link to the brand guide uses a different slug pattern than the rest of the site (`brand-guide` vs `careers/`).
