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
- About section (if added) follows split-text Tobermore aesthetic
