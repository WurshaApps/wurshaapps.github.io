# Site content

This directory is the **single source of truth** for wursha.com. The Angular app reads these files at
build time and prerenders one page per language at `/<lang>/` — to change copy, edit JSON here.

## Files

| File                          | What it holds                                                       | Edit when…                         |
| ----------------------------- | ------------------------------------------------------------------- | ---------------------------------- |
| `apps.json`                   | The six editions in display order: accent colour, release prefix, store/download URLs, version | New release; URL change |
| `<lang>.json` (14 files)      | All copy for one language; `en.json` is the master                  | Any copy change                    |
| `blog.json`                   | Blog posts (release announcements), newest first, in en and ar      | Every app release                  |
| `schemas/apps.schema.json`    | JSON Schema for `apps.json`                                         | Adding an app field                |
| `schemas/blog.schema.json`    | JSON Schema for `blog.json`                                         | Changing the post shape            |
| `schemas/content.schema.json` | JSON Schema for every `<lang>.json`                                 | Adding/removing a field            |
| `CONTRACT.md`                 | Every section and field, and what it controls                       | When the shape changes             |

## Editing flow

1. Edit `en.json` and `ar.json` first, then the same keys in the other 12 files. Copy that also appears on
   the store pages (edition names, scene captions) should follow the app repo's
   `store/listings/<locale>/listing.json`, so the site and the store say the same thing.
2. `npm run check-content` compares every file's keys with `en.json` (it also runs before `npm run build`).
3. Shape change (a field added or removed): update `schemas/content.schema.json`, the `Dict` interface in
   `src/app/i18n/translations.ts`, and the component that reads it.

## Rules for copy

See `specs/website-redesign.md` §5. In short: every number is counted and rounded down (50+ books,
200+ reciters), "offline" only for what is on the device, no superlatives, say what stays in Arabic.
`*…*` in a title marks the highlighted phrase.

## Images

`public/shots/{en,ar}/` and `public/editions/` are made by `npm run import-shots` from the store
screenshots (see the script header). LTR pages use the English set, RTL pages the Arabic set.

## Releases

`npm run update-links` fetches the newest Mac/Windows downloads from `WurshaApps/QuranHolder_Releases`
into `apps.json` (editions without a `release` prefix are skipped).

Announce each release on the blog: add a post at the top of `blog.json` with a new `slug` (`v35-1-2`, no
dots), the `version`, the release `date` and `en` + `ar` text. The Arabic follows the app repo's
`CHANGELOG.md`, the English its store What's New (`store/listings/en-US/listing.json`). A post may add
other languages under `text`; languages without one show the English text and `blog.langNote`.
A post's text and each of its sections may have an `image` (`{ src, alt }`, a 4:5 1080x1350 picture under
`public/blog/<slug>/`, shown under the summary or after the section); give it `alt` text in each language.
`npm run check-content` checks the order, slugs, that no text is empty and that every image exists.
For a release worth announcing on the home page, also change `hero.news.text` in all 14 files: the line
above the headline links to the newest post.
