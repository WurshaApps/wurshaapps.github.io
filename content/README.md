# Site content

This directory is the **single source of truth** for the marketing site at `wurshaapps.github.io`.
The Angular app under `src/` reads these files at build time — to update copy, edit JSON here.

## Files

| File                            | What it holds                                                      | Edit when…                              |
| ------------------------------- | ------------------------------------------------------------------ | --------------------------------------- |
| `apps.json`                     | Catalog of downloadable apps (URLs, icon, accent color, version)  | New release; new app; URL change        |
| `ar.json`                       | All Arabic copy + Arabic app names/descriptions                    | Any AR copy change                      |
| `en.json`                       | All English copy + English app names/descriptions                  | Any EN copy change                      |
| `schemas/apps.schema.json`      | JSON Schema for `apps.json`                                        | Adding a new app field                  |
| `schemas/content.schema.json`   | JSON Schema for `ar.json` and `en.json`                            | Adding/removing a section or field      |
| `CONTRACT.md`                   | Detailed spec — every section, every field, what it controls       | When the schema changes                 |

## Editing flow

1. Open `ar.json` (or `en.json`) — most edits land here. VSCode autocompletes against the schema thanks to the `$schema` field at the top.
2. Save. If `ng serve` is running, the site reloads automatically.
3. If you change the **shape** (add/remove a field), also update:
   - `schemas/content.schema.json` (or `schemas/apps.schema.json`)
   - The `Dict` interface in `src/app/i18n/translations.ts`
   - Any component that reads the field

## What lives where

- **All copy, lists, labels** → per-locale JSON (`ar.json` / `en.json`)
- **Structural / language-agnostic data** (URLs, hex colors, image paths, version) → `apps.json`
- **Per-locale app names + descriptions** → `apps` map inside `ar.json` / `en.json`, keyed by app `id`
- **Numeric counts** (e.g. features per category) → `count: <number>` in JSON
- **Display counts with units** (e.g. "17 works") → `count: "17 works"` (string, since the unit is localized)

## Validation

The schema files are **referenced by `$schema` at the top of every JSON file**. Editors that speak JSON Schema (VSCode, IntelliJ, Sublime + LSP) will:

- Autocomplete property names
- Flag unknown / misspelled fields
- Warn on missing required fields
- Validate enum values and patterns

A second line of defence: TypeScript's `Dict` interface (`src/app/i18n/translations.ts`) is the same shape. If JSON drifts from the schema, `ng build` fails.

## Adding a new app

1. Add the entry to `apps.json` → `apps[]` with a new `id` (lowercase kebab-case).
2. Add the same `id` to both `ar.json` → `apps` and `en.json` → `apps` with `name` (and optional `description`).
3. Drop the icon image into `/public/<image-filename>`.
4. Done — the downloads grid picks it up. No component code change needed.

## Adding a new section

This is a structural change. You'll edit:

1. `schemas/content.schema.json` — add the new section and its shape
2. `ar.json` and `en.json` — add the section content
3. `src/app/i18n/translations.ts` — add the field to the `Dict` interface
4. Build a new Angular component for the section (or add to an existing one)
5. Wire it into `src/app/app.component.html`

See `CONTRACT.md` for the full per-section spec.

## Why this layout

- **Two big JSON files (one per locale)** — small enough to grep, big enough that edits are linear; matches the way translators normally work
- **Build-time imports** — no network fetch, no loading states; bundle ships with content
- **Schema-driven editing** — `$schema` references give editors validation without any toolchain
- **TS shape check on assembly** — `Dict` interface catches drift at `ng build` time
