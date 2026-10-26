# Content contract

Every section below maps to one component in `src/app/sections/`. All 14 `<lang>.json` files have the
same shape as `en.json` (checked by `npm run check-content`).

| Key         | Component                                   | Purpose                                                           |
| ----------- | ------------------------------------------- | ----------------------------------------------------------------- |
| `meta`      | `I18nService` (document head)               | `<title>`, meta description, Open Graph title/description         |
| `brand`     | `header`                                    | Logo text: "Wursha"; Arabic-script pages may use «ورشة»          |
| `nav`       | `header`, `lang-picker`                     | Section links and the language-picker label                       |
| `hero`      | `hero`                                      | Headline, subtitle, two buttons, platforms line, spread alt text  |
| `editions`  | `editions`, `downloads`                     | Cards for the five editions; names reused in the download table    |
| `story`     | `story`                                     | The seven feature scenes, same order as the App Store screenshots |
| `library`   | `library`                                   | Four book lists                                                   |
| `languages` | `library` (languages section)               | Heading and the "stays in Arabic" note; names from `locales.ts`   |
| `account`   | `account`                                   | Optional account: sign-in, what syncs, data received, deletion link |
| `downloads` | `downloads`                                 | Table headings, link labels, notes                                |
| `footer`    | `footer`                                    | About line, credits, sources, rights, privacy link                |
| `privacy`   | `privacy/privacy.component`, `I18nService`  | The privacy policy page `/<lang>/privacy/` and its `<title>`/description |

## Fields

```ts
meta:      { title, description }
brand:     string
nav:       { editions, features, library, downloads, language }
hero:      { title, subtitle, cta, ctaSecondary, platforms, imageAlt }
editions:  { title, subtitle, platformsAll, platformsMobile,
             list: { [id in madina|tajweed|warsh|qalon|shamarli]: { name, riwaya, series, line } } }
story:     { title, subtitle, screensNote,
             scenes: [{ id: meaning|tartil|memorize|night|tracks|athkar|share, title, subtitle, items: string[], note? }] }
library:   { title, subtitle, more, groups: [{ title, items: string[] }] }   // 4 groups
languages: { title, subtitle, note }
account:   { title, subtitle, items: string[], delete }   // 4 items; the privacy link reuses footer.privacy
downloads: { title, subtitle, version, columns: { edition, ios, android, mac, windows },
             links: { ios, android, mac, windows }, notAvailable, winNote, macNote }
footer:    { about, creditsTitle, credits: [{ label, value }], sourcesTitle, sources: string[], rights, privacy }
privacy:   { metaTitle, metaDescription, title, updated, intro,
             sections: [{ title, paragraphs: string[], items: string[] }] }   // same sections in every language
```

Notes:

- `hero.title` and every `story.scenes[].title`: `*…*` marks the highlighted phrase (gold).
- `story.scenes` must keep the seven ids in this order; each id picks `public/shots/<set>/<id>.webp`.
  `memorize` only exists in the Arabic set (its audio menu is Arabic in every UI language), so non-Arabic
  pages keep its `note`.
- `story.screensNote`: shown when the screenshots are not in the page's language (empty in en and ar).
- `editions.list` keys must match `apps.json` ids. An edition without Mac/Windows URLs shows
  `platformsMobile` on its card and `notAvailable` in the table.

## `apps.json`

```ts
{ version: "35.0.2", apps: [{ id, accent: "#rrggbb", release?: "madina", urls: { ios?, android?, mac?, windows? } }] }
```

Order of `apps` is the display order. `accent` is the edition's store colour (card panel). `release` is
the tag prefix in `WurshaApps/QuranHolder_Releases` used by `scripts/update-links.mjs`.
- `account`: Google's OAuth brand verification checks that the home page says why the apps ask for
  Google data and links the privacy policy; this section does both. Keep it true to the app repo's
  `specs/accounts.md` (providers per platform, what syncs) and to the `privacy` text.
- `privacy`: plain text; `https://…` URLs and email addresses become links on the page. Sections and their
  `paragraphs`/`items` counts must match `en.json` (checked). Keep it true to what the apps do — the data
  list follows the app repo's `specs/accounts.md` §4/§8 — and change `updated` with every edit.
