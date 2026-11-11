# Content contract

Every section below maps to one component in `src/app/sections/`. All 14 `<lang>.json` files have the
same shape as `en.json` (checked by `npm run check-content`).

| Key         | Component                                   | Purpose                                                           |
| ----------- | ------------------------------------------- | ----------------------------------------------------------------- |
| `meta`      | `I18nService` (document head)               | `<title>`, meta description, Open Graph title/description         |
| `brand`     | `header`                                    | Logo text: "Wursha"; Arabic-script pages may use «ورشة»          |
| `nav`       | `header`, `lang-picker`                     | Section links and the language-picker label                       |
| `hero`      | `hero`                                      | Tagline under the app name, subtitle, two buttons, platforms line, spread alt text, release announcement |
| `editions`  | `editions`                                  | The main app's row, then the specialized editions' rows with their Mushafs; every row has its downloads |
| `story`     | `story`                                     | The seven feature scenes, same order as the App Store screenshots |
| `library`   | `library`                                   | Four book lists                                                   |
| `languages` | `library` (languages section)               | Heading and subtitle; names from `locales.ts`                     |
| `account`   | `account`                                   | Optional account: why to sign in, privacy and deletion links |
| `downloads` | `editions`, `hero`, `blog`                  | Store badge alt text, Mac/Windows button labels, the blog's version label |
| `footer`    | `footer`                                    | About line, rights, privacy and blog links                        |
| `privacy`   | `privacy/privacy.component`, `I18nService`  | The privacy policy page `/<lang>/privacy/` and its `<title>`/description |
| `blog`      | `blog/blog.component`, `blog/post.component`, `I18nService` | The blog `/<lang>/blog/`: head, heading, link labels; posts are in `blog.json` |

## Fields

```ts
meta:      { title, description }
brand:     string
nav:       { editions, features, library, blog, language }
hero:      { title, subtitle, cta, ctaSecondary, platforms, imageAlt, news: { label, text } }
editions:  { title, subtitle, mainLabel, specialTitle, specialSubtitle, layoutsTitle,
             list: { [id in madina|tajweed|warsh|qalon|shamarli]: { name, line } } }
story:     { title, subtitle, screensNote,
             scenes: [{ id: meaning|tartil|memorize|night|tracks|athkar|share, title, subtitle, items: string[], note? }] }
library:   { title, subtitle, more, groups: [{ title, items: string[] }] }   // 4 groups
languages: { title, subtitle }
account:   { title, subtitle, delete }   // the privacy link reuses footer.privacy
downloads: { version, columns: { mac, windows }, links: { ios, android, mac, windows }, winNote }
footer:    { about, rights, privacy }
privacy:   { metaTitle, metaDescription, title, updated, intro,
             sections: [{ title, paragraphs: string[], items: string[] }] }   // same sections in every language
blog:      { metaTitle, metaDescription, title, subtitle, readMore, all, langNote }
```

Notes:

- The hero's headline (`<h1>`) is the main app's icon and name, `editions.list.madina.name`; `hero.title` is the
  tagline under it, then `subtitle`, the main app's App Store and Google Play badges, `platforms` and the
  `ctaSecondary` button, all centred over the two-page spread. `hero.cta` is the blog
  posts' download button, which opens the editions.
- `downloads.links.ios` / `.android`: alt text of the store badges (content/README.md "Store badges").
- `downloads.links.mac` / `.windows` over `downloads.columns.mac` / `.windows`: the two lines of the Mac and Windows
  buttons; `winNote` is the Windows button's tooltip. `downloads.version` labels the blog posts' version.
- `hero.title` and every `story.scenes[].title`: `*…*` marks the highlighted phrase (gold).
- `story.scenes` must keep the seven ids in this order; each id picks `public/shots/<set>/<id>.webp`.
  `memorize` only exists in the Arabic set (its audio menu is Arabic in every UI language), so non-Arabic
  pages keep its `note`.
- `story.screensNote`: shown when the screenshots are not in the page's language (empty in en and ar).
- `editions`: one row per app, each with its promo card and its App Store, Google Play, Mac and Windows buttons;
  there is no download section (`#downloads` is an empty anchor at the top of the editions, for old links).
  The first app in `apps.json` (madina) is the main app, on a dark row with the `mainLabel` badge; the rest sit
  under `specialTitle` / `specialSubtitle`, each listing its Mushafs under `layoutsTitle`.
- `editions.list` keys must match `apps.json` ids. A row shows a button only for the platforms its `urls` has.

## `layouts.json`

```ts
{ updatedAt, editions: { [id]: string[] }, layouts: { [key]: { ar, en } } }
```

Written by `npm run update-layouts` from the apps' layout catalog (`https://data.wursha.com/catalog.json`):
each edition's layout keys, its bundled layout first, and every listed layout's name. Don't edit it by hand;
rerun the script after a layout is published or a catalog rule changes (app repo `specs/mushaf-layouts.md`
§4.1a). The catalog names layouts in Arabic and English only, so RTL pages show the Arabic names and the
others the English ones. The main app's card doesn't list its layouts (it has all of them).

## `apps.json`

```ts
{ version: "35.0.2", apps: [{ id, accent: "#rrggbb", promoAlt: { en, ar }, release?: "madina", urls: { ios?, android?, mac?, windows? } }] }
```

Order of `apps` is the display order. `accent` is the edition's store colour (card panel). `release` is
the tag prefix in `WurshaApps/QuranHolder_Releases` used by `scripts/update-links.mjs`. `version` is shown nowhere on the site (`update-links` keeps it). `promoAlt` is the alt
text of the edition's promo card (`public/editions/<id>-promo.webp`): `ar` on RTL pages, `en` on the others.
- `account`: Google's OAuth brand verification checks that the home page says why the apps ask for
  Google data and links the privacy policy; this section does both. Keep it true to the app repo's
  `specs/accounts.md` (providers per platform, what syncs) and to the `privacy` text.
- `privacy`: plain text; `https://…` URLs and email addresses become links on the page. Sections and their
  `paragraphs`/`items` counts must match `en.json` (checked). Keep it true to what the apps do — the data
  list follows the app repo's `specs/accounts.md` §4/§8 — and change `updated` with every edit.
