# wursha.com Redesign — Proposal & Plan

> **Status (2026-10-16):** Direction A built and shipped to `main` (14 prerendered languages). Open: native review of the
> 12 translated locales (Pashto and Uzbek have no store listing to start from).
>
> Companion to the app repo's `specs/appstore-overhaul.md` and `specs/playstore-overhaul.md`: the
> website should tell **the same story, in the same look, with the same words** as the new store
> pages, so a visitor who comes from the store sees the same product and a visitor who lands here first
> sees what the store will show them.

---

## 1. Goal

Make wursha.com a **calm, modern page for the six Mushaf editions** that:

1. Shows the real app in the first second. Today the hero is three empty placeholder cards.
2. Helps a visitor **pick their Mushaf** (Madina, Hafs, Tajweed, Warsh, Qalun, Shamarly) and **download it
   for their device** in two clicks.
3. Sells what the app does **today** (Tartil, memorization audio, khatmas, adhkar, share-as-image,
   tafsir and translations, 14-language interface), using only claims we can back up.
4. Reads natively in all 14 interface languages, RTL included, and is **indexable per language**.

Non-goals: blog, accounts, a web reader, analytics beyond what GitHub Pages gives us.

## 2. Where we start (2026-10-16 snapshot)

Angular 21 + Tailwind 4 SPA on GitHub Pages (`CNAME` → wursha.com). All copy lives in `content/<lang>.json`
(14 locales), catalog in `content/apps.json`. 11 sections: hero · stats · audiences · features (11
categories, "78+ features") · editions · reciters · sciences · books · gestures · tech · downloads · footer.

| Problem | Detail |
|---|---|
| **Empty hero** | `hero-phone.png`, `hero-feature-a/b.png` are generated placeholders (`PLACEHOLDER_IMAGES.md`). The first screen shows blank rounded boxes. |
| **Numbers disagree** | Site: 5 editions, 68 reciters, 63 books, 17 tafsirs, "78+ features". `meta.description`: "**15** authentic Mushaf editions". Store (shipped copy): 6 editions, **200+ reciters**, **50+ books**. A careful reader notices. |
| **Hafs is missing** | `apps.json` lists 5 editions; Hafs (Khair Zad) is on the App Store and Google Play. |
| **Outdated story** | No mention of Tartil, adhkar, share-as-image, multiple khatmas as a headline feature, or the 14-language UI. The store pages lead with these now. |
| **Reads like a spec sheet** | 78 features in 11 categories, a gestures table, a "Solid engineering" block. Long, dense, written for us more than for a reader. |
| **Hype words** | "world-class reciters", "Countless features", "without compromise", "Solid engineering". |
| **Different look from the store** | El Messiri / Inter, cream background, emerald + amber. The store moved to style A: deep teal + warm gold, IBM Plex Sans Arabic / Plex Sans, per-edition accents. |
| **One URL for 14 languages** | Language comes from `localStorage` / `navigator.languages` on the client. Search engines see one (English or Arabic) page; Urdu, Indonesian, Turkish… searches can't find a Turkish page. |
| **No per-edition landing** | Store "website" links all go to the same homepage; a Warsh reader lands on a Madina-first page. |

### 2.1 Facts checked against the app source (`Wursha_QuranHolder` @ 35.0.3)

| Claim | Site today | Actual | Use on the site |
|---|---|---|---|
| Tartil (full-surah) reciters | — | **242** reciters, 288 recitations (`src/assets/json/tartil/reciters.json`) | "200+ reciters" (as the store) |
| Verse-by-verse reciters (follow-along, repeat) | "68" | **~49**; 68 is the highest catalog **id**, not a count (`AudioService.reciters`, SPEC §10) | "40+ verse-by-verse reciters" or don't number it |
| Books (tafsir, sciences, qira'at, translations) | 63 | ~63 text columns in `MosshfAndBooksModel`; some are **downloadable side databases**, not bundled | "50+ books" (as the store); "on your device" → "on your device after a one-time download" where that applies |
| Editions | 5 (and "15" in `meta`) | **6** shipped apps (15 is the number of edition *index services* in code) | "6 Mushaf editions" |
| Hafs platforms | missing | Android (`apps.wursha.quran_hafs`) + iOS; **no Mac/Windows** release | add to `apps.json` with 2 platforms |
| Ads / in-app purchases | — | None registered (IAP package in deps but plugin not installed, SPEC §19) | "No ads" is defensible; "free" needs the store price confirmed |

What we already have and should reuse:

- **Localized store art** (`~/work/wursha/store-shots/35.0.3/`): iPhone 7–8 scenes, iPad 6–7, Mac 5, per
  edition × 10 locales; product-page headers (21:9 two-page spread with headline) and search-result
  creatives (3:2) per edition × locale; Play `fa` and `az-AZ` creatives.
- **Reviewed copy** (`Wursha_QuranHolder/store/listings/<locale>/listing.json`): per-edition name,
  subtitle, intro paragraph and hero hook; scene captions; the 6-block description. ar + en reviewed by
  the user, others by Claude.
- **The content contract** (`content/*.json` + schema + `Dict` type): works well, keep it.

## 3. Design direction

### 3.0 Decisions (agreed 2026-10-16)

| # | Decision | Choice |
|---|---|---|
| W1 | Visual direction | **A — store-matched** (picked from static A/B/C mockups, not kept in the repo) |
| W2 | Scope | **Homepage only**; no per-edition pages for now (§4 edition pages dropped) |
| W3 | Brand | **Wursha leads**; Quran Holder / Khair Zad appear as edition series names |
| W4 | Pricing line | **"Free, no ads"** may be said (no ads or IAP in code, all editions free) |
| W5 | Hero line | en "The Mushaf you know, with everything around it" · ar «المصحف الذي تعرفه، ومعه كل ما تحتاجه» |
| W6 | Screenshots | **No baked captions; captions are HTML in every language.** Two screenshot sets only (English UI for LTR pages, Arabic UI for RTL pages) to keep assets small (~1.5 MB); `story.screensNote` says which UI the screens show |

### 3.1 Principles

1. **The Mushaf is the hero.** Real pages, large, never restyled or recolored (same rule as the store).
2. **One idea per screen.** Each section has a short headline, one sentence, one image. No grids of 11
   cards.
3. **Quiet, not plain.** Generous whitespace, one accent colour at a time, a subtle geometric pattern
   only where the store art already uses it. No gradients on text, no glow, no crescent/mosque clichés.
4. **Same voice as the store.** Captions and hooks are lifted from `listing.json`, not rewritten.
5. **Fast and readable everywhere.** Mobile first, RTL first-class, works on a slow connection.

### 3.2 Visual options (A picked, W1)

| | **A — Store-matched (recommended)** | **B — Paper & ink** | **C — Edition-themed** |
|---|---|---|---|
| Feel | Continuation of the App Store page | Editorial, book-like, very light | Each edition feels like its own product |
| Hero | Deep teal band, gold highlight word, the two-page spread from the product-page header | Warm off-white, single Mushaf page with soft shadow, ink-dark type | Edition picker on top; the whole page recolors to the chosen accent |
| Body | Light (white/sand) sections, teal type, gold only for highlights | All light, teal as a thin accent | Light sections tinted with the edition accent |
| Type | IBM Plex Sans Arabic + IBM Plex Sans (+ Noto Nastaliq Urdu, Noto Sans Devanagari/Bengali, already bundled for compose) | Same, with a serif display face for Latin headlines | Same as A |
| Pros | Zero brand drift; art drops in without re-composition | Calmest, most "elegant" | Strong per-edition landing pages |
| Cons | Teal band is the store look, less surprise | Store art (teal/brown/purple backgrounds) clashes a little; needs cropped device shots | More work; colour shifts can feel busy |

Recommendation: **A**, borrowing C's accent switch **only inside the editions section and on
per-edition pages** (madina teal, tjwid green, shmrly purple, hafs/warsh/qalon brown). Dark mode follows
the system and reuses the night-theme screenshot.

### 3.3 Images

The store finals have their captions baked in. For the site the caption should be **real HTML text**
(translatable, accessible, indexable, sharp at any size). So:

- **Device shots:** crop each iPhone/iPad/Mac final below its caption band → device-only image, caption
  rendered by the page in the visitor's language. If the crop looks off, rerun the capture pipeline to
  keep the raw frames (`$SHOTS_WORK` was a scratch dir; raw captures were not kept).
- **Hero:** the edition's product-page header art, minus its text, or the iPad two-page capture.
- **Feature scenes** are the same across editions, so the site uses **madina** for scenes 2–8 and only
  the hero changes per edition (~8 images × 12 locales instead of × 6 editions).
- **Locales:** 10 have store shots; fa and az have Play creatives; **ps and uz fall back to en** (open:
  or fa for Pashto?).
- **Format/budget:** AVIF + WebP, `srcset` 1×/2×, lazy below the fold, hero ≤ 150 KB on mobile.
  Estimate ~200 files, ~15 MB in the repo. (Open: commit them or host on the Releases repo / a CDN.)

## 4. Page structure

One long page, 7 sections instead of 11, plus optional edition pages.

| # | Section | Content | Source | Replaces |
|---|---|---|---|---|
| 1 | **Header** | Logo · Editions · Features · Download · language picker | — | header |
| 2 | **Hero** | Hook, one sentence, primary CTA "Download", secondary "Choose your Mushaf"; platform row (iPhone & iPad · Android · Mac · Windows); the two-page spread | `promotionalText`, madina `hero` | hero, stats |
| 3 | **Choose your Mushaf** | 6 cards: page thumbnail, name, store subtitle, one-line hook, "Get it" (opens that edition's download row). Short note: "Same features in every edition; the difference is the Mushaf and its riwaya." | `editions.<ed>.{name,subtitle,hero,intro}` | editions, audiences |
| 4 | **The story** (7 scenes, store order) | Meaning & tafsir · Tartil · Memorize · Night reading · Khatmas · Adhkar · Share as image. Each: caption title/subtitle + 2–3 bullets from the description block + one device shot, alternating sides | `captions.*`, description blocks | features, reciters, sciences, gestures |
| 5 | **The library** | Tafsir / Quran sciences / qira'at / translations as four short, honest lists ("Ibn Kathir, At-Tabari, Al-Qurtubi… and more") | existing `books` section, trimmed | books |
| 6 | **Download** | Edition × platform matrix (desktop) / edition accordion (mobile); store badges; Windows/Mac notes; version from `apps.json` | `apps.json`, `downloads` | downloads |
| 7 | **Footer** | About, **credits & sources** (kept: they build trust), privacy policy, contact, language list | `footer` | tech, footer |

Dropped: stats strip, audiences cards, 11-category feature grid, gestures table, "Solid engineering".
Their best lines move into the story bullets.

**Edition pages (dropped, W2; possible later):** `/madina`, `/hafs`, `/tajweed`, `/warsh`, `/qalun`, `/shamarly` = the same
page with that edition's hero, accent and download row first. Store "marketing URL" per edition points
there. Cheap once the page is data-driven.

## 5. Copy

### 5.1 Honesty rules (same spirit as the store guidance)

- **Every number is counted**, then rounded *down* ("50+" for 53). One source of truth for counts
  (`content/facts.json`, see §6) so the site and the store can't drift again.
- **"Offline"** only for what is bundled: Mushaf pages, tafsir/translation books on the device. Audio
  says "download surahs to listen offline".
- **No superlatives we can't prove:** no "best", "#1", "world-class", "complete", "countless",
  "without compromise". Prefer the concrete thing ("Ibn Kathir, As-Sa'di and Al-Qurtubi") over the
  adjective ("authoritative").
- **Say what's Arabic-only** where it matters (sura names, athkar texts, some audio-menu labels stay in
  Arabic in every UI language) — a line in the language section, not hidden.
- **"Free"** only if true for every edition and platform, and say plainly if there are ads or purchases
  (open: see §9).
- **Credit** the Mushaf publishers, data and audio sources in the footer, as today.

### 5.2 Draft copy (en, ar) — tone sample

Hero:

| | en | ar |
|---|---|---|
| Kicker | Wursha · Free, no ads | ورشة · مجاني وبلا إعلانات |
| Title | The Mushaf you know, with **everything around it** | المصحف الذي تعرفه، و**كل ما تحتاجه حوله** |
| Line | Read the original pages, understand them with 50+ tafsir and translation books, and listen to 200+ reciters, in one app. | اقرأ الصفحات الأصلية، وافهمها بأكثر من 50 كتاباً في التفسير والترجمة، واستمع لأكثر من 200 قارئ، في تطبيق واحد. |
| CTA | Download · Choose your Mushaf | حمّل التطبيق · اختر مصحفك |

Alternatives for the en title (open): "Read. Understand. Listen. Memorize." · "A quiet place to read
the Quran" · "Six Mushafs. One careful app."

Choose your Mushaf, intro: *"Every edition has the same tafsir library, recitations and tools. Pick the
Mushaf and riwaya you read from."* / *"في كل نسخة مكتبة التفسير والتلاوات والأدوات نفسها. اختر المصحف
والرواية التي تقرأ بها."*

Story scenes reuse the store captions word for word (en: "The meaning, in English" · "Listen to 200+
reciters" · "Repeat to memorize" · "Easy on your eyes at night" · "Several khatmas at once" · "Your
daily adhkar" · "Share a verse as an image"), with 2–3 bullets each taken from the matching description
block. Example:

> **Repeat to memorize**
> Set repeats, pauses and speed.
> - Verse-by-verse recitation that highlights the verse being read
> - Repeat a verse or a passage as many times as you like
> - Pause between verses to recite it back

Words we will stop using: *world-class, countless, complete companion, without compromise, solid
engineering, 78+ features.*

### 5.3 Translation

- en + ar written first; **user reviews both**.
- fr, de, tr, id, ms, ur, hi, bn, fa, az: scene captions and edition hooks **copied from their
  `listing.json`** (already done for the store); new site-only strings translated by Claude.
- ps, uz: no store listing, translated from en; native review recommended.

## 6. Technical plan

Keep: Angular 21, Tailwind 4, standalone components, the `content/` contract and schema validation,
`scripts/update-links.mjs`, GitHub Pages deploy.

Change:

1. **Static prerender per language** — `outputMode: "static"`, routes `/<lang>/` (and
   `/<lang>/<edition>` if edition pages are in). Each page ships its own `<html lang dir>`, `<title>`,
   description, `hreflang` alternates and Open Graph image (the edition header art). `/` keeps today's
   auto-detect and redirects to the best `/<lang>/`. The language picker becomes links, not state.
2. **Content sync** — `scripts/sync-store-copy.mjs` reads the app repo's `store/listings/*/listing.json`
   + `locales.json` and writes the shared fields (edition names, subtitles, hooks, intros, captions) into
   `content/<lang>.json`. Site-only copy stays hand-written. Run it when listings change.
3. **`content/facts.json`** — counts (editions, reciters, books, tafsirs, translations, UI languages)
   with a note on how each was counted; copy uses `{{reciters}}`-style tokens.
4. **`apps.json`** — add **hafs**; add per-edition accent + platform availability (hafs: Android +
   iOS only; the download matrix shows "not available" cells honestly instead of hiding the edition).
5. **Asset script** — `scripts/import-shots.mjs`: crop finals → device-only, resize, encode AVIF/WebP
   into `public/shots/<lang>/`.
6. **Components** — new: `hero`, `editions-picker`, `story-scene` (one component, 7 instances),
   `library`, `download-matrix`. Remove: stats, audiences, feature, reciters, sciences, gestures, tech,
   placeholder. Logical CSS properties (`ms-`, `me-`, `start-`) for RTL.
7. **Quality bars** — Lighthouse mobile ≥ 95 performance / 100 accessibility / 100 SEO; LCP < 2 s on
   4G; no layout shift; WCAG AA contrast on teal and gold (gold on white needs checking); keyboard and
   screen-reader pass; `prefers-reduced-motion` respected.

## 7. Plan

| Phase | Work | Gate (user) |
|---|---|---|
| **0. Decide** | This doc: §9 questions; recount reciters/books/tafsirs from the bundled data | **Answer §9** |
| **1. Mockups** | Static HTML of hero + editions + one story scene, en + ar, desktop + phone, in the chosen direction (or A vs B side by side) | **Pick / adjust direction** |
| **2. Copy** | `facts.json`; en + ar site copy; sync script; other 12 locales | **Review en + ar** |
| **3. Build** | Prerender + routing, new components, `apps.json` + hafs, asset import, remove old sections | — |
| **4. QA** | All 14 locales × phone/desktop screenshots (contact sheet), RTL check, Lighthouse, link check on every download URL | **Approve the contact sheet** |
| **5. Ship** | PR → main → Pages deploy; update store marketing URLs to per-edition pages if built | **Approve merge / store URL change** |

Rough size: Phase 1 half a day, Phases 2–4 two to three sessions, mostly unattended screenshot and
translation work.

## 8. Risks

- **Counts:** "200+" is the Tartil library; the verse-by-verse list is ~49 (§2.1). Any line about
  follow-along, repeat or memorization must not imply 200+.
- **Image weight** in the repo and the Pages build (~15 MB, grows with every store refresh).
- **Crop quality** of store finals; fallback is a raw recapture run.
- **SEO move:** going from `/` to `/<lang>/` changes URLs; `/` must keep working and redirect, and
  old anchors (`#downloads`) must still land.
- **Translations** for ps/uz/hi/bn without native review.
- **Store review:** if per-edition URLs become the store "marketing URL", they must be live before the
  listings change.

## 9. Open questions

1. Visual direction: A (store-matched), B (paper & ink), or C (edition-themed)?
2. Scope: homepage only, or homepage + six edition pages?
3. ~~Numbers~~ — settled from the app source (§2.1): 200+ Tartil reciters, 50+ books, 6 editions.
   Open only: name the verse-by-verse count ("40+") or leave it unnumbered?
4. ~~Hafs platforms~~ — Android + iOS (§2.1).
5. Are all editions free on every store? (No ads/IAP in code.) Can the site say "Free, no ads"?
6. Brand on the site: lead with **Wursha**, **Quran Holder / Khair Zad**, or the editions themselves?
7. Images: commit to the repo, or host elsewhere?
8. Pashto and Uzbek: English screenshots, or Persian for Pashto?
