# TOBERMORE — SEO+GEO Audit Report

## Baseline (before)
- **GEO Score:** 25/100 (critical)
- **Breakdown:** robots 0, llms 0, schema 5, meta 7, content 12, signals 3, ai_discovery 0, brand_entity 1, negative_penalty -3
- **Trust Stack:** D (composite 7/25)
- **Platform Citation:** ChatGPT 40, Perplexity 32, Google AI 35

## Critical Gaps Identified
1. No robots.txt (AI bots not explicitly allowed)
2. No llms.txt
3. No sitemap.xml
4. Missing schemas: Organization, WebSite, LocalBusiness, Product, BreadcrumbList, Review
5. Missing meta: canonical, og:*, twitter:*, theme-color
6. Brand name inconsistency between title/H1
7. No sameAs to social profiles in schema
8. Missing date_modified signal
9. 9 images missing alt-text
10. Boilerplate ratio 98% (no <main> tag)
11. No /.well-known/ai.txt, /ai/summary.json, /ai/faq.json, /ai/service.json

## Plan — 110% Implementation
- B1: robots.txt + llms.txt + sitemap.xml + .well-known/ai.txt + /ai/*.json
- B2: 8 schemas (Organization, WebSite, LocalBusiness, Product×8, FAQPage existing, BreadcrumbList, Review×4)
- B3: Full meta (canonical, OG, Twitter, theme-color, robots max-image-preview)
- B4: GEO citation paragraph, About section, FAQ improvements
- B5: Preload hero, lazy-load gallery, dns-prefetch
- B6: All alt-texts from photo-descriptions.json, html lang/dir, aria
- B7: NAP consistency, geo coords, OpeningHours, hasMap, sameAs

## Tobermore Constraints
- B2B sharp-style preserved (no border-radius, Hanken Grotesk, Title Case)
- SEO additions in <head> only — zero visual impact
- About section follows split-text Tobermore aesthetic

## Result (after)
- **GEO Score:** 83/100 (good) — was 25/100 (critical)
- **Breakdown after:** robots 15, llms 12, schema 13, meta 14, content 12, signals 6, ai_discovery 5, brand_entity 6, negative_penalty 0
- **Delta:** +58 points

## Known Limitations
- `/.well-known/ai.txt` returns 404 — GitHub Pages refuses to serve `.well-known/*` even with `.nojekyll`. Only fixable via custom domain.
- Auditor recommends Wikipedia/Wikidata/LinkedIn/Crunchbase `sameAs` — not applicable for a small local Bishkek brand without those pages.
- Visible "/about" link recommendation persists; we have "О Компании" anchor #about — auditor heuristic looks for /about path.
- Product schema "has_price" requires explicit price (we don't expose KGS pricing publicly).
- WebMCP toolname/tooldescription — experimental Chrome AI agent spec, intentionally skipped.
