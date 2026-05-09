# Content contract

The full spec for the JSON files in this directory. Every section below maps to a section component under `src/app/<section>/`. Edit the JSON, the site updates. Edit the shape, update the schema and the `Dict` interface together.

## Files at a glance

```
content/
├── apps.json              # Shared catalog (no localized strings)
├── ar.json                # Arabic content + apps copy
├── en.json                # English content + apps copy
└── schemas/
    ├── apps.schema.json   # Validates apps.json
    └── content.schema.json # Validates ar.json and en.json
```

`ar.json` and `en.json` are **shape-identical**. Any change to one must be mirrored in the other.

## Locale file (`ar.json` / `en.json`)

A single object with these top-level sections:

| Key         | Component                              | Purpose                                                |
| ----------- | -------------------------------------- | ------------------------------------------------------ |
| `meta`      | `src/index.html` head + `I18nService`  | `<title>` and `<meta name=description>` (per locale)   |
| `nav`       | `header/header.component`              | Sticky nav links + lang-toggle label                   |
| `hero`      | `hero/hero.component`                  | Headline, subhead, CTAs, screenshot alt                |
| `stats`     | `stats/stats.component`                | The 4-number strip below the hero                      |
| `audiences` | `audiences/audiences.component`        | The "who is this for" persona cards                    |
| `features`  | `feature/feature.component`            | The 11-category feature grid                           |
| `editions`  | `editions/editions.component`          | Mushaf collections + per-edition cards                 |
| `reciters`  | `reciters/reciters.component`          | Featured reciters, riwayat covered                     |
| `books`     | `books/books.component`                | Tabbed library: tafseer / sciences / qira'at / trans.  |
| `sciences`  | `sciences/sciences.component`          | The 5 word-page tabs (meaning, sarf, i'rab, …)         |
| `gestures`  | `gestures/gestures.component`          | Gesture → action grid                                  |
| `downloads` | `downloads/downloads.component`        | Section copy, platform names, store-pill labels        |
| `tech`      | `tech/tech.component`                  | "Solid engineering" bullet block                       |
| `footer`    | `footer/footer.component`              | About blurb, credits, sources, copyright               |
| `common`    | `shared/placeholder.component` etc.    | Generic strings (placeholder, screenshot, comingSoon)  |
| `apps`      | `downloads/downloads.component`        | Per-app localized name + description, keyed by app id  |

### Per-section field reference

#### `meta`
```ts
{ title: string, description: string }
```
Drives `<title>` and `<meta name=description>`. The `I18nService` swaps these on language change.

#### `nav`
```ts
{ features, editions, reciters, books, downloads, switchLang }
```
All strings. `switchLang` is the OTHER language's name (e.g. AR file says `"English"`, EN file says `"العربية"`).

#### `hero`
```ts
{ eyebrow, title, titleHighlight, subtitle, ctaPrimary, ctaSecondary, screenshotAlt }
```
- `title` is plain; `titleHighlight` is the second line that gets the gradient.
- `eyebrow` is also reused as the brand text in the header.

#### `stats`
Four `<value, label>` pairs. The values are strings (not numbers) so you can include `+` or Arabic digits (e.g. `"+78"`, `"15"`).

#### `audiences`
```ts
{ title, subtitle, items: [{ title, body }, …] }
```
Designed for **4 items** (4-col on wide screens). Other counts work but won't match the 4-up grid.

#### `features`
```ts
{ title, subtitle, categories: [{ id, title, count: number, blurb, highlights: string[] }, …] }
```
- `id` is **load-bearing**: it selects the icon SVG path in `feature.component.ts`. Known ids: `reading`, `navigation`, `tracks`, `bookmarks`, `audio`, `search`, `sciences`, `customization`, `tools`, `gestures`, `editions`. Adding a new id requires updating the `iconFor()` map.
- `count` is a number (rendered as a pill), not a string.

#### `editions`
```ts
{
  title, subtitle, crossNote,
  collections: [{ name, description, items: string[] }, …],
  list: [{ code, name, note, isDefault?: boolean }, …]
}
```
- `code` may match a thumbnail image in `editions.component.ts` (currently `Madina`, `Shmrly`, `Tjwid`, `Warsh`, `Qalon`). Codes without a thumbnail render as a placeholder badge with the code text.
- `isDefault: true` highlights the entry with a gold ring + star badge. Use on at most one item.

#### `reciters`
```ts
{
  title, subtitle, riwayatTitle, featuredTitle, downloadNote,
  riwayat: [{ name, sub? }, …],
  featured: [{ name, riwaya, version }, …]
}
```
`sub` on `riwayat` items is optional (renders as a small italic line under the name).

#### `books`
```ts
{
  title, subtitle,
  categories: [{ key, title, count: string, samples: string[] }, …]
}
```
- `key` is a stable id (lowercase, kebab-case). Used by the `@angular/aria` Tabs primitive — must be unique within the section.
- `count` is a **string** here ("17 works") because the unit is localized.

#### `sciences` & `gestures`
Both have `{ title, subtitle, items: [...] }`:
- `sciences.items[]` → `{ title, body }`
- `gestures.items[]` → `{ gesture, action }`

#### `downloads`
```ts
{
  title, subtitle, eyebrow, supportedOn, primaryCta, winNote, macNote, webSoon,
  platformNames: { android, ios, windows, mac, web },
  platforms: { android, ios, windows, mac },     // ARIA labels for store links
  storeLabels: {
    android: { small, big },                     // e.g. small="GET IT ON", big="Google Play"
    ios:     { small, big },
    windows: { small, big },
    mac:     { small, big }
  }
}
```
The version number ("33.0.0") lives in `apps.json` — not here. Only the *eyebrow* prefix ("Latest release" / "الإصدار الأحدث") is localized.

#### `tech`
```ts
{ title, subtitle, bullets: string[] }
```

#### `footer`
```ts
{ about, creditsTitle, sourcesTitle, rights,
  credits: [{ label, value }, …],
  sources: string[]
}
```

#### `common`
```ts
{ placeholder, screenshot, comingSoon }
```
Used by the `<app-placeholder>` component (the dashed preview boxes that mark where real images go).

#### `apps`
```ts
{ [id]: { name: string, description?: string } }
```
- Keys must match `id`s in `apps.json`.
- `name` is required, `description` is optional (renders as a small subline below the app name on the download card).

## Apps catalog (`apps.json`)

```ts
{
  version: string,             // e.g. "33.0.0", semver pattern enforced by schema
  apps: [
    {
      id: string,              // matches keys in ar.json/en.json `apps`
      image: string,           // filename in /public, e.g. "madina.png"
      nameColor: string,       // hex/rgb/hsl — drives card glow + accent
      featured?: boolean,      // if true, spans 2 cols on wide grid
      urls: {
        android?: string,      // store/download URL — omit to hide that pill
        ios?: string,
        windows?: string,
        mac?: string
      }
    },
    …
  ]
}
```

## Adding / changing things

### Add a new app
1. New entry in `apps.json` → `apps[]` with a unique `id`.
2. Add the same `id` key to both `ar.json` → `apps` and `en.json` → `apps` (with `name`, optional `description`).
3. Place the app icon at `/public/<image-filename>`.

No code changes.

### Bump version
Edit `apps.json` → `version`. The downloads section eyebrow updates everywhere.

### Add a feature category
1. Add an entry to `features.categories[]` in both locale files. Pick an `id` from the list of known ids (or add a new icon mapping in `feature/feature.component.ts:iconFor()`).
2. The card appears in the grid automatically.

### Add a new locale (e.g. `fr.json`)
1. Copy `en.json` → `fr.json`, translate strings (keep keys identical).
2. Open `src/app/i18n/translations.ts`, add the import and the new key to `TRANSLATIONS`.
3. Update `Lang` type and the `I18nService` toggle logic.
4. Add `nav.switchLang` cycling logic if you want a multi-way switcher instead of a binary toggle.

### Change a section's shape
1. Update `schemas/content.schema.json`.
2. Update both `ar.json` and `en.json` to match.
3. Update the `Dict` interface in `src/app/i18n/translations.ts`.
4. Update consuming components.
5. `ng build` will catch any drift.

## Conventions

- **Strings, never `null`** — omit optional fields rather than setting them to `null`.
- **Arabic digits or Latin digits**: free choice per string. The `stats` section uses Latin digits in both locales for clean alignment; prose uses Arabic digits in AR (e.g. "أربع شرائح").
- **Quotation marks**: use Arabic «» in AR copy, English “” in EN copy. ASCII `"` only as JSON string delimiters.
- **Em-dashes** (`—`): use generously between phrases; never `--` or ` - `.
- **No HTML in content**. If you need formatting, design a new section/field. The site renders plain text only.
