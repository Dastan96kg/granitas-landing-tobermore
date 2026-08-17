# GRANITAS KG — как редактировать сайт

## Админка

**https://granitas.kg/admin/**

Вход: кнопка **Sign in with GitHub** → или через «Use a Personal Access Token»
(токен GitHub-аккаунта с доступом к этому репозиторию).

Разделы:
- **📞 Контакты и настройки** — телефоны, WhatsApp, Instagram, адрес, часы работы,
  переключатель «показывать цены в каталоге»
- **🧱 Каталог и цены** — виды брусчатки: названия, описания, фото, цены от/до
- **🖼 Галерея работ** — фото объектов с подписями

После нажатия **Publish** изменения попадают в репозиторий, GitHub Action
пересобирает страницы (~1 мин) и GitHub Pages выкладывает их на granitas.kg
(ещё ~1–2 мин). Итого правка видна на сайте через **2–3 минуты**.

## Как это устроено

```
content/*.json  ←  правит админка (/admin, Sveltia CMS)
      ↓ push в main
.github/workflows/rebuild.yml  →  node scripts/build.mjs
      ↓ коммит собранных файлов
index.html, about/index.html, ai/summary.json, llms.txt  →  GitHub Pages → granitas.kg
```

- `scripts/build.mjs` регенерирует маркер-регионы в `index.html`
  (`<!-- build:catalog -->`, `build:gallery`, `build:contacts`, `build:products-jsonld`)
  и обновляет контакты по всем файлам, включая SEO-разметку (JSON-LD),
  `llms.txt` и `ai/summary.json`.
- Скрипт идемпотентен: `node scripts/build.mjs` можно запускать сколько угодно раз.
- **Правки внутри маркер-регионов руками не делать** — их перезапишет следующая сборка.
  Контент меняется только через `content/*.json` (или админку).

## Ограничения

- График работы в JSON-LD (`openingHoursSpecification`) статичен — при смене
  часов работы поправить вручную в `index.html`.
- Форма «Заявка на расчёт» на сайте не подключена к бэкенду — заявки никуда
  не отправляются (показывается только сообщение «Спасибо»).
