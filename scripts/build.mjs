#!/usr/bin/env node
/**
 * GRANITAS KG — сборка сайта из content/*.json
 *
 * Источник правды для контактов, каталога и галереи — content/*.json
 * (редактируются через админку /admin). Скрипт регенерирует:
 *   - index.html: маркер-регионы build:catalog, build:gallery, build:contacts,
 *     build:products-jsonld + контактные ссылки по всему файлу
 *   - about/index.html: контактные ссылки
 *   - ai/summary.json: контактные поля
 *   - llms.txt: контактные строки
 *
 * Запуск: node scripts/build.mjs   (идемпотентен)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const write = (p, s) => writeFileSync(join(ROOT, p), s);

const settings = JSON.parse(read('content/settings.json'));
const catalog = JSON.parse(read('content/catalog.json'));
const gallery = JSON.parse(read('content/gallery.json'));

const SITE = 'https://granitas.kg';
const digits = (s) => String(s || '').replace(/\D/g, '');
const fmtPhone = (d) => {
  d = digits(d);
  return d.length === 12 ? `+${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)} ${d.slice(9)}` : `+${d}`;
};
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const phone = settings.phone.trim();
const phoneDigits = digits(phone);
const phone2 = (settings.phone2 || '').trim();
const wa = digits(settings.whatsapp);
const ig = settings.instagram.replace(/^@/, '').trim();

// ── регионы ──────────────────────────────────────────────────────────
function region(html, name, content, file) {
  const re = new RegExp(`(<!-- build:${name} -->)[\\s\\S]*?(<!-- /build:${name} -->)`);
  if (!re.test(html)) throw new Error(`Маркер build:${name} не найден в ${file}`);
  return html.replace(re, `$1${content}$2`);
}

const cardHtml = (c) => {
  const badge = c.featured ? '\n          <div class="card__badge">Премиум</div>' : '';
  const cls = c.featured ? 'card card--featured' : 'card';
  const price = settings.show_prices && c.price_low ? ` · от ${c.price_low} сом/м²` : '';
  return `      <div class="col col-4" data-reveal>
        <article class="${cls}">${badge}
          <figure class="card__media"><img src="${esc(c.image)}" alt="${esc(c.alt || c.title)}" width="600" height="450" loading="lazy"></figure>
          <div class="card__body">
            <div class="card__meta">${esc(c.meta)}${esc(price)}</div>
            <h3 class="card__title">${esc(c.title)}</h3>
            <p class="card__desc">${esc(c.desc)}</p>
            <a href="#contacts" class="card__link">Запросить Цену →</a>
          </div>
        </article>
      </div>`;
};

const galleryHtml = (g) =>
  `      <div class="col col-4" data-reveal><figure class="img-frame img-frame--gal"><img src="${esc(g.image)}" alt="${esc(g.alt || g.caption)}" width="600" height="450" loading="lazy"><figcaption>${esc(g.caption)}</figcaption></figure></div>`;

const contactRow = (k, v) => `            <li>
              <span class="contacts-list__k">${k}</span>
              ${v}
            </li>`;

const contactsHtml = [
  contactRow('Телефон', `<a href="tel:+${phoneDigits}" class="contacts-list__v">${esc(phone)}</a>`),
  ...(phone2 ? [contactRow('Телефон 2', `<a href="tel:+${digits(phone2)}" class="contacts-list__v">${esc(phone2)}</a>`)] : []),
  contactRow('WhatsApp', `<a href="https://wa.me/${wa}" class="contacts-list__v">${fmtPhone(wa)}</a>`),
  contactRow('Instagram', `<a href="https://instagram.com/${ig}" class="contacts-list__v">@${ig}</a>`),
  contactRow('Адрес', `<span class="contacts-list__v">${esc(settings.address)}</span>`),
  contactRow('Часы Работы', `<span class="contacts-list__v">${esc(settings.hours)}</span>`),
].join('\n');

// ── JSON-LD товаров: статичное SEO-обогащение (рейтинг/отзывы) ───────
const RATING = { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '4', bestRating: '5' };
const REVIEWS = [
  { '@type': 'Review', author: { '@type': 'Person', name: '@bek.karabalta' }, reviewBody: 'Очень красивая брусчатка, успехов в работе.', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' } },
  { '@type': 'Review', author: { '@type': 'Person', name: '@ibraimov329' }, reviewBody: 'Уложили мощную кремлёвскую брусчатку на дом — стоит как влитая.', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' } },
  { '@type': 'Review', author: { '@type': 'Person', name: '@suigunbaevagulzira' }, reviewBody: 'Мы тоже уложили GRANITAS, выглядит очень красиво.', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' } },
  { '@type': 'Review', author: { '@type': 'Person', name: '@abakirova_kanykey' }, reviewBody: 'Красиво, мы тоже сделали себе — благодарны команде.', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' } },
];

const productLd = (c) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: c.seo_name || c.title,
  image: `${SITE}/${c.seo_image || c.image}`,
  description: c.seo_desc || c.desc,
  brand: { '@type': 'Brand', name: 'GRANITAS' },
  manufacturer: { '@id': `${SITE}/#organization` },
  category: 'Брусчатка / Тротуарная плитка',
  material: 'Цемент, песок, заполнитель',
  ...(c.price_low
    ? {
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'KGS',
          lowPrice: String(c.price_low),
          highPrice: String(c.price_high || c.price_low),
          offerCount: '1',
          availability: 'https://schema.org/InStock',
          url: `${SITE}/#catalog`,
          seller: { '@type': 'Organization', name: 'GRANITAS KG', '@id': `${SITE}/#organization` },
        },
      }
    : {}),
  aggregateRating: RATING,
  review: REVIEWS,
});

const productsJsonLd = `
<script type="application/ld+json">
${JSON.stringify(catalog.items.map(productLd), null, 2)}
</script>
`;

// ── общие замены контактов (HTML-файлы) ──────────────────────────────
const contactPointsJson = [
  { tel: phoneDigits, type: 'sales' },
  ...(phone2 ? [{ tel: digits(phone2), type: 'customer service' }] : []),
]
  .map(
    (p) => `    {
      "@type": "ContactPoint",
      "telephone": "+${p.tel}",
      "contactType": "${p.type}",
      "areaServed": "KG",
      "availableLanguage": ["ru", "ky"]
    }`,
  )
  .join(',\n');

function replaceContacts(html) {
  html = html
    .replace(/tel:\+?\d+/g, `tel:+${phoneDigits}`)
    .replace(/wa\.me\/\d+/g, `wa.me/${wa}`)
    .replace(/instagram\.com\/[A-Za-z0-9._]+/g, `instagram.com/${ig}`)
    .replace(/Instagram @[A-Za-z0-9._]*[A-Za-z0-9_]/g, `Instagram @${ig}`)
    .replace(/\+996(?: \d{3}){3}/g, phone)
    .replace(/"telephone":\s*"[^"]*"/g, `"telephone": "+${phoneDigits}"`)
    .replace(/"streetAddress":\s*"[^"]*"/g, `"streetAddress": "${settings.street}"`)
    .replace(/"addressLocality":\s*"[^"]*"/g, `"addressLocality": "${settings.city}"`);
  // contactPoint-массив и пара телефонов пересобираются целиком
  // (главный + второй номер), поэтому идут после общего правила tel:/telephone
  html = html.replace(/"contactPoint": \[[\s\S]*?\n  \]/g, `"contactPoint": [\n${contactPointsJson}\n  ]`);
  html = html.replace(
    /<p><a href="tel:\+\d+">[^<]+<\/a><br><a href="tel:\+\d+">[^<]+<\/a><\/p>/g,
    phone2
      ? `<p><a href="tel:+${phoneDigits}">${phone}</a><br><a href="tel:+${digits(phone2)}">${phone2}</a></p>`
      : `<p><a href="tel:+${phoneDigits}">${phone}</a></p>`,
  );
  return html;
}

// index.html
let index = read('index.html');
index = replaceContacts(index);
index = region(index, 'catalog', `\n${catalog.items.map(cardHtml).join('\n\n')}\n\n`, 'index.html');
index = region(index, 'gallery', `\n${gallery.items.map(galleryHtml).join('\n')}\n`, 'index.html');
index = region(index, 'contacts', `\n${contactsHtml}\n`, 'index.html');
index = region(index, 'products-jsonld', productsJsonLd, 'index.html');
write('index.html', index);

// about/index.html
write('about/index.html', replaceContacts(read('about/index.html')));

// ai/summary.json
const ai = JSON.parse(read('ai/summary.json'));
if (ai.contacts || ai.business) {
  const c = ai.contacts || ai.business;
  if ('address' in c) c.address = settings.street;
  if ('phone' in c) c.phone = phone2 ? [`+${phoneDigits}`, `+${digits(phone2)}`] : [`+${phoneDigits}`];
  if ('whatsapp' in c) c.whatsapp = `https://wa.me/${wa}`;
  if ('instagram' in c) c.instagram = `https://instagram.com/${ig}`;
}
write('ai/summary.json', JSON.stringify(ai, null, 2) + '\n');

// llms.txt — построчная замена по ключам
const phoneList = phone2 ? `${phone}, ${phone2}` : phone;
let llms = read('llms.txt');
llms = llms
  .replace(/^- \*\*Адрес:\*\* .*$/m, `- **Адрес:** ${settings.street}`)
  .replace(/^- \*\*Телефон:\*\* .*$/m, `- **Телефон:** ${phoneList}`)
  .replace(/^- \*\*WhatsApp:\*\* .*$/m, `- **WhatsApp:** ${fmtPhone(wa)}`)
  .replace(/^- \*\*Instagram:\*\* .*$/m, `- **Instagram:** @${ig}`)
  .replace(/^- Телефон: .*$/m, `- Телефон: ${phoneList}`)
  .replace(/^- WhatsApp: .*$/m, `- WhatsApp: https://wa.me/${wa}`)
  .replace(/^- Instagram: .*$/m, `- Instagram: https://instagram.com/${ig}`)
  .replace(/^- Адрес: .*$/m, `- Адрес: ${settings.address}`)
  .replace(/по адресу: .*$/m, `по адресу: ${settings.street}`);
write('llms.txt', llms);

console.log('✓ Сборка завершена: index.html, about/index.html, ai/summary.json, llms.txt');
