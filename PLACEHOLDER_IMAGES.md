# Placeholder Image Specifications

Reference for all `<app-placeholder>` slots in the Wursha QuranHolder marketing site. Drop generated assets into `public/` and replace each `<app-placeholder>` usage with an `<img>` (or equivalent) pointing to the new file.

## Brand & style anchors (apply to every prompt)

- **Product:** Wursha QuranHolder — a beautifully crafted Mushaf reader app (iOS, Android, Mac, Windows, Web).
- **Brand colors:** primary teal `#0f766e`, accent saffron `#d97706`, soft cream/sepia background `#fdf8ef`, deep ink `#0a1f1d`.
- **Mood:** serene, scholarly, premium, modern Islamic minimalism. Avoid kitsch, neon, or over-saturated colors.
- **Typography in mockups:** Arabic should be set in a Mushaf-style script (Uthmani / Madina / Tajweed-colored — never decorative display fonts). Latin UI text in a clean modern sans (e.g., Inter / SF Pro look-alike).
- **No people, no faces.** Hands holding a phone are acceptable in lifestyle shots; do not render identifiable individuals.
- **Forbidden:** crescent-and-star clichés, generic mosque silhouettes with neon glow, AI-typical "Arabic-looking" gibberish text. If real Arabic text can't be rendered, use a tasteful blurred / abstracted text block instead of fake glyphs.

## Aspect ratios used in code

| Kind | Ratio | Recommended export | Used for |
|---|---|---|---|
| `phone` | 9 : 19 | 1080 × 2280 px | Single-device app screenshots |
| `wide` | 16 : 10 | 1920 × 1200 px | Landscape app overview / dashboard shots |
| `square` | 1 : 1 | 1440 × 1440 px | Feature snapshots, device clusters |
| `background` | 21 : 9 | 2520 × 1080 px | Wide hero/showcase artwork |

Export as **PNG** with transparent background where the design calls for it (device mockups, isolated UI), **JPG** for full-bleed scenic backgrounds.

---

## 1. Hero background artwork

- **File:** `public/hero-bg.jpg` (or `.png` if transparency wanted)
- **Slot/component:** hero section background — `src/app/hero/hero.component.html:4`
- **Kind / size:** `background` — 21:9, **2520 × 1080 px**
- **Description:** Atmospheric backdrop sitting behind the hero headline and CTA. Should not compete with foreground text. Generous negative space on the right for the phone mockup; subtle pattern on the left.
- **Prompt:**
  > Wide cinematic backdrop, 21:9, for a premium Quran reader app landing page. Soft cream paper texture (#fdf8ef) overlaid with very faint geometric Islamic tessellation in teal (#0f766e) and saffron (#d97706) at ~6% opacity. A muted golden-hour light gradient sweeps from upper-left to lower-right. Empty negative space across the right two-thirds for overlay text and a phone mockup. Tasteful, scholarly, museum-poster aesthetic. No text, no people, no mosque silhouettes, no crescent. Flat illustration with subtle paper grain. 2520x1080.

## 2. Hero phone screenshot — main reading interface

- **File:** `public/hero-phone.png`
- **Slot:** `hero-phone` — `src/app/hero/hero.component.html:25`
- **Kind / size:** `phone` — 9:19, **1080 × 2280 px**
- **Description:** Marquee app screenshot. Shows the primary Mushaf reading screen: an open Quran page in Madina-style typesetting, top bar with surah name + ayah counter, bottom tab bar (Read / Listen / Search / Library / Settings). Light theme.
- **Prompt:**
  > Modern iPhone-style portrait app screenshot, 9:19, of an elegant Quran reader app called "Wursha QuranHolder". Light cream background (#fdf8ef), Madina/Uthmani-style Arabic Mushaf page filling most of the screen with realistic line breaks and verse markers (use real Quranic typesetting style, not gibberish — if needed render as a soft, slightly blurred page so script is recognizable but not legible). Slim translucent top bar with teal (#0f766e) surah name "Al-Baqarah" and page number "2". Bottom tab bar with five minimal monoline icons: book, play, magnifier, bookmark, gear. One tab highlighted in saffron (#d97706). Subtle drop shadow, status bar shown, no device frame. 1080x2280, PNG, transparent outside the screen rectangle is fine.

## 3. Hero feature snapshot A — theming / customization

- **File:** `public/hero-feature-a.png`
- **Slot:** `hero-feature-a` — `src/app/hero/hero.component.html:30`
- **Kind / size:** `square` — 1:1, **1440 × 1440 px**
- **Description:** Small cluster image highlighting a key feature: theme & color customization. Three stacked theme swatches (Light / Sepia / Night) with a thumbnail of the Quran page in each style.
- **Prompt:**
  > Square 1:1 product feature card, 1440x1440. Three small phone screen thumbnails fanned vertically, each showing the same Quran page in a different theme: top in white/light, middle in warm sepia (#f3e7c9), bottom in deep night (#0a1f1d) with cream text. Soft drop shadow. Background: clean off-white (#fafaf6) with a faint teal (#0f766e) circular gradient behind the cluster. A small saffron (#d97706) color picker dot in the corner. Minimal, premium, no text labels. PNG.

## 4. Hero feature snapshot B — bookmarks / khatmahs

- **File:** `public/hero-feature-b.png`
- **Slot:** `hero-feature-b` — `src/app/hero/hero.component.html:31`
- **Kind / size:** `square` — 1:1, **1440 × 1440 px**
- **Description:** Pairs visually with feature A. Highlights reading tracks ("khatmah") and bookmarks: a small phone screen showing a progress ring around a Quran-juz wheel, plus two colored bookmark tags floating beside it.
- **Prompt:**
  > Square 1:1 product feature card, 1440x1440. A single phone-screen thumbnail centered, showing a circular reading-progress dial divided into 30 juz segments — most filled in teal (#0f766e), a few unfilled in pale gray, one segment glowing saffron (#d97706). Above the dial, a small label "Ramadan Khatmah" in clean sans-serif. Two small floating tag pills beside the phone: one teal labelled "Bookmarks", one saffron labelled "Notes". Background: clean off-white (#fafaf6) with very faint paper texture. Minimal, premium, no other text. PNG.

## 5. Features overview screenshot — main reading screen, landscape

- **File:** `public/features-overview.png`
- **Slot:** `features-overview` — `src/app/feature/feature.component.html:10`
- **Kind / size:** `wide` — 16:10, **1920 × 1200 px**
- **Description:** Wide tablet/desktop view of the app showing the full reading experience: open Mushaf page on the left, side panel on the right with tafseer/qira'at/translation tabs. Used as the headline visual of the Features section.
- **Prompt:**
  > Wide 16:10 landscape mockup, 1920x1200, of a premium Quran reader app on an iPad-like tablet in landscape orientation, no device frame. Left two-thirds: a beautifully typeset Madina-style Arabic Mushaf page (real-looking Quranic script, not gibberish — if necessary keep slightly soft so script is recognizable but not legible). Right one-third: a side panel with three tabs at top labelled "Tafsir / Qira'at / Translation" in clean sans-serif, with the first tab selected and showing a stack of well-spaced text rows (use abstract gray bars instead of fake text). Top toolbar with surah dropdown "Al-Baqarah ▾", page counter "2", and small icons for audio, search, bookmark. Light cream theme (#fdf8ef), teal (#0f766e) accents on selected tab and toolbar, saffron (#d97706) bookmark icon. Subtle ambient shadow. PNG, transparent outside the tablet screen.

## 6. Reciters audio player screen

- **File:** `public/reciters-player.png`
- **Slot:** `reciters-player` — `src/app/reciters/reciters.component.ts:19`
- **Kind / size:** `phone` — 9:19, **1080 × 2280 px**
- **Description:** Phone screenshot of the audio player: large now-playing card at the top (reciter name, surah, ayah), waveform/progress bar in the middle, transport controls (prev / play / next), and a queue list below.
- **Prompt:**
  > Portrait phone app screenshot, 9:19, 1080x2280. Quran reciter audio player on a light cream background (#fdf8ef). Top: rounded card with a soft teal-to-saffron gradient (#0f766e → #d97706 at 25% opacity), inside the card a circular abstract calligraphic emblem (no readable text), beneath it the labels "Sheikh Mishary Alafasy" and "Al-Baqarah · Ayah 255" in clean sans-serif. Middle: a thin horizontal progress bar with a teal filled portion and a saffron handle, timestamps "01:42" and "04:18". Below: large central play button (teal circle, white triangle), flanked by previous and next chapter icons, and on either side small "speed 1.0x" and "repeat" toggles. Bottom third: a queue list of 4 upcoming verses, each row with a small ayah number badge and abstract gray text bars. Status bar at top, no device frame. PNG.

## 7. Books — aya panel screenshot

- **File:** `public/books-aya-panel.png`
- **Slot:** `books-aya-panel` — `src/app/books/books.component.ts:20`
- **Kind / size:** `phone` — 9:19, **1080 × 2280 px**
- **Description:** Phone screenshot of the verse-detail panel that opens when tapping an ayah. Tabbed interface: Tafseer / Qira'at / Sciences / Translations. The Tafseer tab is active.
- **Prompt:**
  > Portrait phone app screenshot, 9:19, 1080x2280. Top quarter: a single Quran ayah rendered in Madina-style Arabic script (use a soft, slightly blurred Mushaf line so script reads as authentic but not legible) on cream (#fdf8ef), with a small reference label "2 : 255" in teal. Below the ayah: a horizontal tab bar with four tabs labelled in clean sans-serif: "Tafsir · Qira'at · Sciences · Translations". The first tab selected, underlined in saffron (#d97706). Lower two-thirds: a scroll of well-spaced text rows representing tafsir paragraphs — render as abstract dark-gray bars of varying length on cream, with one quoted block indented and accented by a teal vertical bar on the left. Bottom: a thin tab bar with five icons. No fake Latin or Arabic text. PNG.

## 8. Sciences — word page screenshot

- **File:** `public/sciences-word-page.png`
- **Slot:** `sciences-word-page` — `src/app/sciences/sciences.component.ts:19`
- **Kind / size:** `phone` — 9:19, **1080 × 2280 px**
- **Description:** Phone screenshot of the word-level analysis screen: a single Arabic word displayed large at top, with tabs for Meaning / Sarf (morphology) / I'rab (syntax) / Qira'at / Translations. Active tab shows a small morphology table.
- **Prompt:**
  > Portrait phone app screenshot, 9:19, 1080x2280. Top: a single large Arabic word in Madina-style calligraphy centered on cream (#fdf8ef), with a tiny teal pill above it labeled "Word 4 · Ayah 255". Below: a horizontal scrolling tab bar with five tabs in clean sans-serif: "Meaning · Sarf · I'rab · Qira'at · Translations". Second tab selected, underlined in saffron (#d97706). Middle: a clean two-column table — left column abstract dark-gray label bars (representing root, pattern, type, gender, number), right column shorter value bars. One row highlighted with a faint teal background. Lower third: a small derivation tree diagram with three connected nodes drawn as soft teal circles linked by thin lines. Bottom: tab bar with five icons. No fake text glyphs. PNG.

## 9. Gestures demo

- **File:** `public/gestures-demo.png` (static; an animated GIF/MP4 can come later)
- **Slot:** `gestures-demo` — `src/app/gestures/gestures.component.ts:19`
- **Kind / size:** `phone` — 9:19, **1080 × 2280 px**
- **Description:** Phone screenshot of the Mushaf reading view with overlaid gesture indicators: a swipe arrow across the page, a pinch-zoom indicator at one corner, and a long-press ring on a single ayah.
- **Prompt:**
  > Portrait phone app screenshot, 9:19, 1080x2280. Background: a soft, slightly blurred Madina-style Mushaf page on cream (#fdf8ef) — Arabic script readable as authentic Mushaf typesetting but not legible. Overlay (top layer): three semi-transparent gesture indicators in saffron (#d97706) with thin teal (#0f766e) outlines — (1) a horizontal arrow with motion trail across the page mid-height labeled "swipe", (2) two diverging arrows at upper-right corner labeled "pinch", (3) a pulsing concentric ring around one ayah marker labeled "hold". Indicators sit on a 35% black scrim that darkens the page slightly so they pop. Labels in clean sans-serif. No device frame, status bar visible. PNG.

## 10. Editions comparison artwork

- **File:** `public/editions-comparison.png`
- **Slot:** `editions-comparison` — `src/app/editions/editions.component.ts:45`
- **Kind / size:** `background` — 21:9, **2520 × 1080 px**
- **Description:** Wide showcase artwork: the same verse rendered three different ways side-by-side — Hafs Madina print, Warsh print with blue variant marks, and Tajweed-colored edition. Should feel like museum exhibit cards.
- **Prompt:**
  > Wide 21:9 showcase composition, 2520x1080, on a cream museum-card background (#fdf8ef) with very subtle paper grain. Three rectangular "page cards" arranged horizontally with thin teal (#0f766e) borders and soft shadows. Each card shows a stylised Arabic verse line in Madina/Uthmani style — soft enough that script is recognizable but not legible. Card 1 labeled "Hafs · Madina" in tiny teal serif at the bottom — black ink. Card 2 labeled "Warsh · Khair Zad" — same line but selected letters tinted sky-blue to mark variants. Card 3 labeled "Tajweed Edition" — same line with letters color-coded in red, green, blue, orange to indicate tajweed rules (mimic the Dar Al-Ma'arifah palette). A faint horizontal saffron (#d97706) thread runs behind all three cards connecting them. No people, no extra text. PNG.

## 11. Tech stack — cross-platform mockup

- **File:** `public/tech-platforms.png`
- **Slot:** `tech-platforms` — `src/app/tech/tech.component.ts:29`
- **Kind / size:** `square` — 1:1, **1440 × 1440 px**
- **Description:** Device cluster: phone, tablet, laptop, and desktop monitor — all running the Wursha app showing the same Mushaf page. Communicates "one app, every platform".
- **Prompt:**
  > Square 1:1 device family cluster, 1440x1440, on a clean off-white (#fafaf6) background with a very faint teal (#0f766e) radial glow behind the devices. Four flat-style devices arranged in a relaxed group: a desktop monitor at back-left, an open laptop center-back, a tablet in landscape front-right, and a phone in portrait front-left. Every screen displays the same Quran reader UI: cream (#fdf8ef) Mushaf page with Madina-style Arabic script (soft, recognizable, not legible) and a slim teal toolbar at top. No device-brand logos. Subtle realistic shadows under each device. Minimal, premium, isometric-ish but not aggressively so. No keyboards in detail, no cables, no people. PNG with transparent background outside the device shapes is fine.

---

## Workflow tips

- Generate all images at the **export size** above, then let the site downscale.
- For app-screen mockups (#2, #5, #6, #7, #8, #9, #11), AI image gens often produce gibberish glyphs — prefer **soft / blurred Arabic** so it reads authentic without showing fake text. For exact Arabic, render the screen in Figma/SwiftUI and screenshot.
- Keep a consistent corner-radius and shadow treatment across all device mockups so the set feels like one shoot.
- After dropping a real asset, replace the `<app-placeholder>` element in the relevant component with `<img src="/path.png" alt="…" />` and remove the slot import if it becomes unused.
