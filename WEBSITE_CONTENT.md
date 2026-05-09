# Wursha QuranHolder — Website Content

> Source-of-truth content document for the marketing/landing website of **Wursha QuranHolder** (قرآن حامل القرآن), an Ionic/Angular hybrid mobile app for Quran reading, listening, study, and memorization.

- **Platforms:** Android, iOS, Web
- **Languages:** Arabic (default), English
- **Quran Editions Shipped:** 15
- **Reciters Shipped:** 68
- **Reference Books / Tafseers / Translations:** 63
- **Settings Classes:** 8 (78+ configurable properties)
- **User-Facing Features:** 78+

---

## Table of Contents

1. [Tagline & Positioning](#1-tagline--positioning)
2. [Feature Catalog](#2-feature-catalog)
3. [Quranic Editions (Books / Mushafs)](#3-quranic-editions-books--mushafs)
4. [Reciters](#4-reciters)
5. [Settings & Options](#5-settings--options)
6. [Reference Books, Tafseers & Translations](#6-reference-books-tafseers--translations)
7. [Gestures & Interaction Model](#7-gestures--interaction-model)
8. [Tech Stack & Platforms](#8-tech-stack--platforms)

---

## 1. Tagline & Positioning

**Headline:** A complete companion for reading, reciting, studying, and memorizing the Quran.

**Sub-headline:** 15 authentic Mushaf editions. 68 world-class reciters. Side-by-side qira'at, tafseer in 15+ classical and modern works, and word-by-word grammatical analysis — all in one app.

**Audiences:**
- Daily Quran readers who want a beautiful, customizable mushaf.
- Memorizers (huffaz) who need tracks, repetition, and audio control.
- Students of Quranic sciences (qira'at, tajweed, i'rab, asbab al-nuzul).
- Non-Arabic speakers using one of 14+ supported translations.

---

## 2. Feature Catalog

Total of **78+ user-facing features** organized into 11 categories.

### 2.1 Reading & Display (8)

| # | Feature | What it does |
|---|---|---|
| 1 | **Main Quran Reading** | Full-screen mushaf reading interface displaying authentic Islamic editions as digital pages. |
| 2 | **Customizable Page Display (Safha)** | Choose between portrait (vertical/horizontal) and landscape (single/double-page) layouts. |
| 3 | **Theme & Color Customization** | Switch between Light, Night, and Auto themes; pick from White, Sepia, Blue, Gray, Dark, Black presets — or define custom light/dark colors. |
| 4 | **Decorative Elements Control** | Toggle ornamental decorations, page headers, sura names, juz' markers, bookmarks, and page numbers. |
| 5 | **Font Selection** | Choose from 7 font styles (Program default, Amiri, Uthmani, Naskh, Ruqaa, Scheherazade, System). |
| 6 | **Dynamic Font Size** | Scale Quran text size via slider for comfortable reading. |
| 7 | **Brightness Swipe Gestures** | Adjust screen brightness by swiping left/right on the page (toggleable). |
| 8 | **Keep Screen On** | Prevent screen lock during reading sessions. |

### 2.2 Navigation (6)

| # | Feature | What it does |
|---|---|---|
| 9 | **Sura (Chapter) Navigation** | Browse and jump to any of the 114 suras with search and Meccan/Medinan indication. |
| 10 | **Part (Juz') Navigation** | Jump to any of the 30 parts; search by name, number, or page. |
| 11 | **Quarter (Rub') Navigation** | Jump to any of the 120 quarters with visual *tarwisa* markers. |
| 12 | **Page Number Jump** | Direct navigation to any page (1–604). |
| 13 | **Quick Navigation Menu** | Floating quick-access menu for fast section switching. |
| 14 | **Auto-Scroll** | Auto-scroll vertically or horizontally with configurable interval (defaults: 5s vertical, 60s horizontal). |

### 2.3 Reading Tracks & Progress (3)

| # | Feature | What it does |
|---|---|---|
| 15 | **Reading Tracks (Khatmahs)** | Create, name, and manage multiple reading tracks (e.g., "Ramadan 2025", "Daily Reading") with unique colors. |
| 16 | **Page Position Tracking** | Resume from the last read page within each track automatically. |
| 17 | **Progress Indicator** | Visual percentage of the Quran completed in the active track. |

### 2.4 Bookmarks & Notes (4)

| # | Feature | What it does |
|---|---|---|
| 18 | **Page Bookmarks** | Bookmark entire pages with a single tap. |
| 19 | **Verse (Aya) Bookmarks** | Bookmark individual verses for detailed study. |
| 20 | **Personal Notes on Verses** | Attach custom notes to any verse, scoped per track. |
| 21 | **Bookmark/Note Export** | Export bookmarks and notes as formatted text and share or copy. |

### 2.5 Audio & Recitation (10)

| # | Feature | What it does |
|---|---|---|
| 22 | **Quran Audio Recitation** | Listen to high-quality recitations from 68 reciters across multiple riwayat. |
| 23 | **Reciter Selection & Browser** | Browse and pick from a curated reciter list. |
| 24 | **Reciter Management** | Enable/disable reciters, reorder by preference, add custom reciter URLs. |
| 25 | **Offline Downloader** | Download full recitations for offline listening with progress and storage usage. |
| 26 | **Playback Controls** | Play, pause, resume, and seek between verses. |
| 27 | **Repeat & Section Playback** | Repeat single verses, suras, or custom verse ranges; configurable repeat count. |
| 28 | **Pause Between Verses** | Configurable silence gap between consecutive verses. |
| 29 | **Playback Speed Control** | Adjust playback speed (1x, 1.25x, 1.5x, etc.). |
| 30 | **Follow-Along Highlighting** | Auto-scroll to and highlight the currently playing verse. |
| 31 | **Audio Stop Points** | Stop audio at end of sura, page, quarter, hizb, juz', or after a duration. |

### 2.6 Search & Reference (7)

| # | Feature | What it does |
|---|---|---|
| 32 | **Full-Text Search** | Search the entire Quran across multiple text variants. |
| 33 | **Search Modes** | Plain, Tashkeel (with diacritics), Uthmani, and Root-based search. |
| 34 | **Pattern Search** | Wildcard / regex-style expressions. |
| 35 | **Whole Word Search** | Match exact words only. |
| 36 | **Current Sura Search** | Restrict search scope to the current sura. |
| 37 | **Diacritic Matching** | Choose to match or ignore diacritical marks. |
| 38 | **Verse Details (Aya Page)** | View full verse info: sura, verse number, page, related interpretations. |

### 2.7 Quranic Sciences & Reference (10)

| # | Feature | What it does |
|---|---|---|
| 39 | **Word-Level Analysis** | Tap any word to open detailed morphological and linguistic info. |
| 40 | **Word Tabs** | Meaning, Sarf (morphology), I'rab (parsing), Qira'at, and Translations. |
| 41 | **Tafseer Books** | 15+ classical and modern works (Ibn Kathir, Tabari, Qurtubi, Sa'di, Baghawi, Muyassar, etc.). |
| 42 | **Word Meanings Dictionary** | Arabic vocabulary references. |
| 43 | **Grammatical Parsing (I'rab)** | Detailed grammatical analysis of Quranic text. |
| 44 | **Quranic Readings (Qira'at)** | Alternative readings from the 10 famous readers. |
| 45 | **Asbab al-Nuzul** | Historical context / reasons behind verse revelation. |
| 46 | **Translation Coverage** | 14+ language translations. |
| 47 | **Waqf Markers** | Display recommended stopping points for proper recitation. |
| 48 | **Farsh (Variant Readings)** | Detailed recitation rules for selected qira'at readers, with color legends. |

### 2.8 Customization & User Settings (10)

| # | Feature | What it does |
|---|---|---|
| 49 | **15 Quranic Editions** | Switch between 15 manuscript editions (see §3). |
| 50 | **Reciters per Edition** | Each edition surfaces reciters that match its riwaya. |
| 51 | **Gesture Configuration** | Enable/disable tap-to-hide footer, swipe-to-turn-pages, brightness swipe, center swipe. |
| 52 | **Page Orientation Lock** | Force portrait, landscape, or auto-rotate. |
| 53 | **Verse Modal Trigger** | Tap or long-press to open verse details. |
| 54 | **Word Modal Trigger** | Tap or long-press to open word details. |
| 55 | **Status Bar Control** | Show or hide the system status bar. |
| 56 | **Keyboard & Mouse Shortcuts** | Arrow keys and mouse wheel for desktop/web. |
| 57 | **Center Swipe Shortcuts** | Special gestures from the center of the page. |
| 58 | **Language Selection** | Arabic ↔ English interface. |

### 2.9 Tools & Extras (9)

| # | Feature | What it does |
|---|---|---|
| 59 | **Supplications (Du'a) Page** | Curated collection of Islamic supplications from the Quran. |
| 60 | **App Information & About** | App version, developer info, related apps, download links. |
| 61 | **Settings Import/Export (JSON)** | Export and import preferences, bookmarks, and notes. |
| 62 | **Database Download Manager** | Download optional offline data (search DB, word morphology, Farsh rules). |
| 63 | **Share Functionality** | Share verses, search results, bookmarks, notes via social/messaging/email. |
| 64 | **Copy to Clipboard** | One-tap copy of verse text and notes. |
| 65 | **Interactive Tutorial** | Guided onboarding slideshow for new users. |
| 66 | **Release Notes / Changelog** | Alert highlighting new features in each version. |
| 67 | **Info Slides** | Interactive carousel with tips. |

### 2.10 Gestures & Interaction (5)

| # | Feature | What it does |
|---|---|---|
| 68 | **Swipe Page Turn** | Swipe left/right between pages with multi-page support. |
| 69 | **Pinch-to-Zoom** | Zoom into Quran pages for detailed reading. |
| 70 | **Long-Press Context** | Press-and-hold on verses or words for context menus. |
| 71 | **Hamsh (Margin Notes) on Long Press** | Long-press a verse to view margin notes / commentary. |
| 72 | **Tap-to-Hide Footer** | Tap page center to toggle footer and UI controls. |

### 2.11 Edition-Specific Features (4)

| # | Feature | What it does |
|---|---|---|
| 73 | **Madina Edition (Default)** | Standard mushaf with Uthmanic script and word coordinates. |
| 74 | **Tajweed Edition** | Color-coded tajweed rules per letter (Dar Al-Ma'arifah). |
| 75 | **Shamarli Edition** | Alternative manuscript edition with hamish margins. |
| 76 | **Multiple Riwayat Support** | Hafs, Warsh, Qalon, Sho'ba, Ibn Kathir, Abu Ja'far, Ibn Aamer, Ibn Dhakwan, and more. |

---

## 3. Quranic Editions (Books / Mushafs)

The app ships with **15 authentic Mushaf editions** spanning two main collections:

- **حامل القرآن (Quran Embracer):** Madina, Shamarli, Tajweed, Sho'ba, Abu Ja'far, Ibn Kathir, Ibn Aamer, Ibn Dhakwan, Asbahani.
- **خير زاد (Khair Zad) — memorization aid series:** Hafs, Warsh, Qalon, Asim/Ibn Aamer, Tayseer.

| # | Code | Arabic Name | English Name | What's Distinctive | Default |
|---|---|---|---|---|---|
| 1 | `Madina` | مصحف المدينة | **Madina Mushaf** | Uthmanic script, word coordinates, full farsh + tanweer + manhaj. Base for all comparisons. | ✅ |
| 2 | `Hafs` | خير زاد: مصحف حفص | **Khair Zad: Hafs** | Hafs riwaya on a white background; memorization-focused. | |
| 3 | `Warsh` | خير زاد: مصحف ورش | **Khair Zad: Warsh** | Warsh riwaya with blue color legend marking variants vs. Hafs. | |
| 4 | `Qalon` | خير زاد: مصحف قالون | **Khair Zad: Qalon** | Qalon transmission from Nafi'; Khair Zad curriculum. | |
| 5 | `Shoba` | مصحف شعبة | **Sho'ba Mushaf** | Sho'ba an Asim, clean white background. | |
| 6 | `Tjwid` | مصحف التجويد | **Tajweed Mushaf** | Letters color-coded by tajweed rule (Dar Al-Ma'arifah). | |
| 7 | `Shmrly` | مصحف الشمرلي | **Shamarli Mushaf** | Shamarli script, unique pagination (2–522), wide pages with hamish margins. | |
| 8 | `Aamer` | خير زاد: مصحف عاصم وابن عامر | **Khair Zad: Asim & Ibn Aamer** | Comparative edition; Asim and Ibn Aamer side-by-side in margins. | |
| 9 | `Jafar` | مصحف أبو جعفر | **Abu Ja'far Mushaf** | Abu Ja'far qira'a with hamish differences from Hafs and 24 info pages. | |
| 10 | `Asbhani` | مصحف الأصبهاني من المصباح | **Asbahani (from Al-Misbah)** | Asbahani transmission with color-coded variants from Hafs; Warsh-compatible. | |
| 11 | `Kathir` | مصحف ابن كثير | **Ibn Kathir Mushaf** | Ibn Kathir qira'a with hamish differences and Khair Zad curriculum. | |
| 12 | `IbnAaamer` | مصحف ابن عامر | **Ibn Aamer Mushaf** | Ibn Aamer riwaya with comprehensive variant color-coding. | |
| 13 | `Thkwan` | رواية ابن ذكوان | **Ibn Dhakwan Riwaya** | Ibn Dhakwan from Ibn Aamer, color-coded differences, hamish middle sections. | |
| 14 | `Twst` | مصحف أصحاب التوسط | **Tayseer (Moderate Readers)** | Tayseer of the ten qira'at; shows agreed and disputed readings, Hisham's waqf, imala. | |
| 15 | `Libya` | مصحف قالون (ليبيا) | **Libya / Qalon Mushaf** | Libyan Qalon variant with its own data schema; standard 1–604 pagination. | |

**Cross-edition features:** Most editions support color legends, hamish (margin) comparative recitations, waqf markers, and the manhaj (curriculum) view.

---

## 4. Reciters

The app ships with **68 reciters**. Each reciter is configured with a riwaya, a version (Murattal, Mujawwad, Teacher Edition, Broadcast, Complete, etc.), and a CDN source.

### 4.1 Riwayat / Qira'at Covered

- **حفص عن عاصم** (Hafs an Asim) — most reciters
- **ورش عن نافع** (Warsh an Nafi')
- **قالون عن نافع** (Qalon an Nafi')
- **شعبة عن عاصم** (Sho'ba an Asim)
- **الدوري عن أبي عمرو** (Ad-Duri an Abi Amr)
- **السوسي عن أبي عمرو** (As-Susi an Abi Amr)
- **الأصبهاني** (Al-Asbahani)
- **حمزة براوياته** (Hamza's narrations)
- **جمع الكبرى / الصغرى** (Major & Minor compilations of the ten qira'at)
- **بيان أوجه قالون / ورش** (Aspects of Qalon / Warsh)

### 4.2 Audio Sources

- **mp3quran.net** — primary CDN for most reciters (32 / 64 / 128 / 192 kbps)
- **everyayah.com** — alternative source
- **quran.ksu.edu.sa** — King Saud University audio
- **sound.quraat.info** — large collection of classical and qira'at-specialized recordings
- **wursha-backup.github.io** — custom backup for Al-Husary variations

### 4.3 Full Reciter List

| ID | Reciter | Riwaya | Version | Source | Bitrate |
|---|---|---|---|---|---|
| 1 | محمود خليل الحصري — Mahmoud Khalil Al-Husary | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 2 | محمد محمود الطبلاوي — Muhammad Al-Tablawi | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 3 | أحمد علي العجمي — Ahmad Al-Ajmy | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 4 | محمد صديق المنشاوي — Al-Minshawi | Hafs an Asim | Murattal | mp3quran.net | 128 kbps |
| 5 | أيمن رشدي سويد — Ayman Sowaid | Hafs an Asim | Standard | everyayah.com | 64 kbps |
| 6 | خليفة الطنيجي — Khalifa Al-Tunaiji | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 7 | فارس عباد — Faris Abbad | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 8 | سعود الشريم — Saood Ash-Shuraym | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 9 | أبو بكر الشاطري — Abu Bakr Ash-Shaatree | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 10 | عبد الباسط عبد الصمد — Abd al-Basit | Hafs an Asim | Murattal | mp3quran.net | 192 kbps |
| 11 | علي الحذيفي — Ali Al-Hudhaify | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 13 | محمد أيوب — Muhammad Ayyoub | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 14 | محمد جبريل — Muhammad Jibreel | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 15 | محمود علي البنا — Mahmoud Al-Banna | Hafs an Asim | Standard | mp3quran.net | 32 kbps |
| 16 | مشاري العفاسي — Mishari Al-Afasy | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 17 | ناصر القطامي — Nasser Al-Qatami | Hafs an Asim | Standard | mp3quran.net | 128 kbps |
| 18 | ياسر الدوسري — Yasser Ad-Dussary | Hafs an Asim | Standard | mp3quran.net | 128 kbps |
| 19 | محمود خليل الحصري — Al-Husary | Qalon an Nafi' | Standard | wursha-backup.github.io | — |
| 20 | إبراهيم الدوسري — Ibrahim Al-Dosary | Warsh an Nafi' | Standard | mp3quran.net | 128 kbps |
| 21 | محمود خليل الحصري — Al-Husary | Warsh an Nafi' | Standard | wursha-backup.github.io | — |
| 22 | عبد الباسط — Abd al-Basit | Warsh an Nafi' | Standard | mp3quran.net | 128 kbps |
| 23 | ياسين الجزائري — Yassin Al-Jazaery | Warsh an Nafi' | Standard | mp3quran.net | 64 kbps |
| 24 | محمود خليل الحصري — Al-Husary | Hafs an Asim | Mujawwad | mp3quran.net | 64 kbps |
| 25 | محمد صديق المنشاوي — Al-Minshawi | Hafs an Asim | Mujawwad | mp3quran.net | 64 kbps |
| 26 | عبد الباسط — Abd al-Basit | Hafs an Asim | Mujawwad | mp3quran.net | 128 kbps |
| 27 | محمود خليل الحصري — Al-Husary | Hafs an Asim | Broadcast Edition (مصحف الإذاعة) | wursha-backup.github.io | — |
| 28 | محمود خليل الحصري — Al-Husary | Hafs an Asim | Teacher Edition (المصحف المعلم) | mp3quran.net | 128 kbps |
| 29 | عبد الله بصفر — Abdullah Basfar | Hafs an Asim | Standard | mp3quran.net | 64 kbps |
| 30 | مصطفى إسماعيل — Mostafa Ismail | Hafs an Asim | Murattal | quran.ksu.edu.sa | 128 kbps |
| 31 | ياسر سلامة — Yaser Salamah | Hafs an Asim | Standard | quran.ksu.edu.sa | 128 kbps |
| 32 | Sahih International | Hafs an Asim | English Translation | quran.ksu.edu.sa | — |
| 33 | محمد صديق المنشاوي — Al-Minshawi | Hafs an Asim | Teacher Edition | quran.ksu.edu.sa | 128 kbps |
| 51 | أحمد طلبة — Ahmad Talba | Hafs an Asim | Complete | sound.quraat.info | — |
| 52 | أحمد طلبة — Ahmad Talba | Al-Kobra (جمع الكبرى) | Complete | sound.quraat.info | — |
| 53 | صالح عبد المقصود — Saleh Abd al-Maqsood | As-Soghra (جمع الصغرى) | Complete | sound.quraat.info | — |
| 54 | طه الفهد — Taha Al-Fahd | As-Soghra | Complete | sound.quraat.info | — |
| 55 | هاني بركات — Hani Barakat | Al-Kobra | Complete | sound.quraat.info | — |
| 56 | حمزة الحبشي — Hamza Al-Habashi | As-Soghra | Complete | sound.quraat.info | — |
| 57 | حمادة خطاب — Hamada Khattab | Bayan Al-Kobra | Part 1 | sound.quraat.info | — |
| 58 | مجموعة أساتذة — Group of Teachers | Bayan As-Soghra | Educational | sound.quraat.info | — |
| 59 | مجموعة قراء — Group of Reciters | Bayan As-Soghra | Bayan Ad-Durrah | sound.quraat.info | — |
| 60 | مجموعة قراء | Aspects of Qalon | Bayan Aspects of Qalon | sound.quraat.info | — |
| 61 | مجموعة قراء | Aspects of Warsh | Bayan Aspects of Warsh | sound.quraat.info | — |
| 62 | عبد الحكيم عبد اللطيف — Abd al-Hakeem Abd al-Latif | Sho'ba an Asim | Complete | sound.quraat.info | — |
| 63 | أحمد سمير — Ahmad Samir | Hamza's Narrations | Standard | sound.quraat.info | — |
| 65 | عبد الرحمن الحذيفي — Abd al-Rahman Al-Hudhaify | Qalon an Nafi' | Complete | sound.quraat.info | — |
| 66 | مفتاح السلطني — Muftah As-Sultani | Ad-Duri an Abi Amr | Complete | sound.quraat.info | — |
| 67 | عبد الرشيد صوفي — Abd al-Rashid Soufi | As-Susi an Abi Amr | Complete | sound.quraat.info | — |
| 68 | إبراهيم المغربي — Ibrahim Al-Maghribi | Al-Asbahani | Standard | sound.quraat.info | — |

> Reciter list also includes additional preset entries; users may add custom reciter URLs via Reciter Management.

---

## 5. Settings & Options

The app exposes **8 settings classes** with **78+ properties**, persisted via Ionic Storage and managed by `GlobalStateService`.

### 5.1 AudioSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `audioReciter` | number | 1 | Currently selected reciter ID. |
| `audioPause` | number | 0 | Pause (ms) between consecutive verses. |
| `audioReciters` | IReciter[] | preset list | Available reciters with metadata. |

### 5.2 SystemSettings

Mostly internal state — not exposed in the UI.

| Property | Type | Default | Description |
|---|---|---|---|
| `firstRun` | boolean | true | First-launch flag. |
| `pageView` | enum | Portrait | Active page view mode. |
| `doubleSafhaWidth` | number | 0.75 | Width ratio for double-page view. |
| `doubleSafhaHeight` | string | '100%' | Height for double-page view. |
| `userHasSeenTutorial` | boolean | false | Tutorial completion flag. |
| `dataDbVersion` | number | 12 | Quran text DB version. |
| `indexDbVersion` | number | 4 | Search index DB version. |
| `farshDbVersion` | number | 4 | Farsh DB version. |
| `wordsDbVersion` | number | 1 | Word definitions DB version. |
| `showFooterHideWarning` | boolean | true | Footer-hide warning. |
| `showBookWindowWarning` | boolean | true | Book window warning. |
| `showFooterIsHiddenWarning` | boolean | true | Footer-is-hidden warning. |
| `latestVersionChangelog` | number | 1 | Last shown changelog version. |
| `startWithOldWebview` | boolean | false | Legacy webview on startup. |

### 5.3 SafhaSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `mainTheme` | enum | Light | Light / Night / Auto. |
| `safhaLightColor` | string | Sepia | Light-mode background. |
| `safhaCustomLightColor` | string | rgba(252,187,254,1) | Custom light color. |
| `safhaNightColor` | string | Gray | Night-mode background. |
| `safhaCustomNightColor` | string | rgba(111,9,114,1) | Custom night color. |
| `decorationIsEnabled` | boolean | true | Page decorations. |
| `pageTopBarIsEnabled` | boolean | true | Header bar. |
| `pageSoraIsEnabled` | boolean | true | Sura name/number. |
| `pagePartIsEnabled` | boolean | true | Juz' indicator. |
| `pageBookmarkIsEnabled` | boolean | true | Bookmark indicator. |
| `pageNumberIsEnabled` | boolean | true | Page numbers. |
| `safhaShowMarker` | boolean | true | Cursor/selection marker. |
| `safhaShowHamshOnPress` | boolean | false | Show margin notes on long press. |
| `safhaShowMoreWaqf` | boolean | false | Additional waqf marks. |
| `showLegend` | boolean | true | Symbol legend. |
| `safhaFarshQareeRange` | number | 0 | Selected farsh variant range. |
| `portraitType` | enum | Horizontal | Vertical / Horizontal portrait scrolling. |
| `landscapeType` | enum | DoublePageB / SinglePage | Landscape layout (4 variants). |
| `showQuarterTarwisa` | boolean | true | Quarter markers. |
| `showQuarterToast` | boolean | true | Quarter boundary toast. |
| `showBookWindow` | boolean | true | Reference book panel. |
| `showBookWindowToggle` | boolean | true | Toggle book window button. |
| `enableAutoScroll` | boolean | false | Auto-scroll mode. |
| `verticalAutoScrollIntervalInSeconds` | number | 5 | Vertical scroll interval. |
| `horizontalAutoScrollIntervalInSeconds` | number | 60 | Horizontal scroll interval. |
| `safhaFullHeight` | boolean | false | Full-height Quran text. |
| `farshCircleRadius` | number | 10 | Word annotation circle radius (px). |

### 5.4 TrackSettings (internal)

| Property | Type | Default | Description |
|---|---|---|---|
| `tracks` | ITrackModel[] | [] | User reading tracks. |
| `tracksReady` | boolean | false | Tracks load flag. |
| `tracksActiveIndex` | number | 0 | Active track index. |

### 5.5 AyaSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `ayaBookWindow` | string | 'm3any' | Active reference book / tafseer key. |
| `ayaFontSize` | number | 2 | Font size multiplier (0–20). |
| `ayaFont` | string | 'system-font' | Aya font family. |
| `doaaFont` | string | 'system-font' | Du'a font family. |
| `ayaItemsOrder` | number[] | [] | Custom panel ordering. |
| `activeCategory` | enum | ShortTafseer | Active book category. |

### 5.6 WordSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `wordSelectedBook` | string | 'm3any' | Selected dictionary/book. |
| `wordActiveTab` | string | 'meaning' | Active tab in word panel. |
| `wordFontSize` | number | 2 | Word font size multiplier. |
| `wordFont` | string | 'system-font' | Word font family. |

### 5.7 MoreSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `swipeControlsBrightness` | boolean | true | Swipe to adjust brightness. |
| `tapHidesFooter` | boolean | true | Tap toggles footer. |
| `tapSwipePages` | boolean | false | Tap also flips pages. |
| `openAyaPage` | enum | Tap | How to open verse details (Tap / Press / Off). |
| `openWordPage` | enum | Press | How to open word details (Tap / Press / Off). |
| `appShowStatusbar` | boolean | true | Show system status bar. |
| `mouseWheelAndArrowKeys` | boolean | true | Mouse wheel + arrow keys (desktop). |
| `centerSwipeShortcuts` | boolean | true | Center-area gesture shortcuts. |
| `pageOrientation` | enum | Auto | Auto / Portrait / Landscape lock. |
| `safhaKeepScreenOn` | boolean | true | Prevent screen sleep. |
| `autoSaveAudio` | boolean | false | Auto-save audio playback progress. |
| `appLanguage` | string | 'ar' | UI language code. |
| `userHasSelectedLanguage` | boolean | false | Whether the user picked the language. |

### 5.8 SearchSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `searchOptionsVisible` | boolean | false | Show search options panel. |
| `searchCurrentSora` | boolean | false | Restrict to current sura. |
| `searchPattern` | boolean | false | Pattern matching mode. |
| `searchWholeWord` | boolean | false | Whole-word match. |
| `searchMatch` | boolean | false | Case-sensitive match. |
| `searchInText` | enum | Plain | Variant searched (Plain / Uthamni / Tashkeel / Root). |
| `searchResultText` | enum | Uthamni | Variant displayed in results. |

### 5.9 Display & Option Enums

- **`MainThemeTypeEnum`** — Auto / Light / Night
- **`PageViewTypeEnum`** — Portrait / Landscape
- **`PortraitTypeEnum`** — Vertical / Horizontal
- **`LandscapeTypeEnum`** — SinglePage / DoublePageA / DoublePageB / DoublePageC
- **`SafhaColorEnum`** — White / Sepia / Blue / Gray / Dark / Black / CustomLight / CustomDark
- **`OpenAyaPageTypeEnum`** — Tap / Press / Off
- **`PageOrientationTypeEnum`** — Auto / Portrait / Landscape
- **`BookCategoryEnum`** — ShortTafseer / Tafseer / QuranSciences / Qira'at / Translation
- **`SearchModeEnum`** — Uthamni / Tashkeel / Plain / Root

### 5.10 FarshQareeEnum (Variant Reading Filters — 25 values)

`None`, `AboJaffar`, `IbnKatheer`, `Qalon`, `Shoba`, `Warsh`, `WarshSh`, `IbnAmer`, `Hesham`, `AshabSela`, `IbnThakwan`, `Tayseer`, `Hamza`, `Kisai`, `Khalaf`, `KisaiKhalaf`, `AbuAmro`, `Dori`, `Sosi`, `Yaqoob`, `Tawasot`, `AsemAmer`, `Basryan`, `WarshSh1`, `WaqfMushaf`.

---

## 6. Reference Books, Tafseers & Translations

The Aya panel ships with **63 reference books** organized into 5 categories: **Short Tafseer (مختصرات)**, **Tafseer (تفاسير)**, **Quranic Sciences (علوم القرآن)**, **Qira'at (قراءات)**, and **Translations (ترجمات)**.

### 6.1 Tafseer Books (17)

| ID | Title | Author | Death |
|---|---|---|---|
| 3 | كلمات القرآن تفسير وبيان | حسنين محمد مخلوف | 1410 هـ |
| 4 | المختصر في تفسير القرآن الكريم | مركز تفسير للدراسات القرآنية | — |
| 5 | التفسير الميسّر | مجمع الملك فهد لطباعة المصحف الشريف | — |
| 6 | تفسير ابن كثير | إسماعيل بن عمر بن كثير القرشي الدمشقي | 774 هـ |
| 7 | تفسير الجلالين | جلال الدين المحلَّى وجلال الدين السيوطي | 864 / 911 هـ |
| 8 | تفسير السعدي | عبد الرحمن بن ناصر السعدي | 1376 هـ |
| 9 | تفسير القرطبي | محمد بن أحمد الأنصاري القرطبي | 671 هـ |
| 10 | تفسير الطبري | محمد بن جرير الطبري | 310 هـ |
| 11 | التحرير والتنوير | محمد الطاهر ابن عاشور | 1393 هـ |
| 12 | التسهيل لعلوم التنزيل | محمد بن أحمد بن جزي الكلبي أبو القاسم | 741 هـ |
| 13 | تفسير البغوي | الحسين بن مسعود البغوي | 516 هـ |
| 14 | التفسير الوسيط للقرآن الكريم | محمد سيد طنطاوي | 1431 هـ |
| 48 | زاد المسير في علم التفسير | أبو الفرج عبد الرحمن بن علي بن محمد الجوزي | 597 هـ |
| 49 | المحرر الوجيز (تفسير ابن عطية) | أبو محمد عبد الحق بن غالب بن عطية الأندلسي | 546 هـ |
| 62 | تفسير النسفي (مدارك التنزيل) | عبد الله بن أحمد بن محمود النسفي | 710 هـ |
| 63 | نظم الدرر في تناسب الآيات والسور | برهان الدين إبراهيم بن عمر البقاعي | 885 هـ |
| 64 | تفسير أضواء البيان | محمد الأمين بن محمد المختار الشنقيطي | 1393 هـ |

### 6.2 Quranic Sciences (10)

| ID | Title | Author | Death |
|---|---|---|---|
| 15 | أسباب النزول | الواحدي النيسابوري الشافعي | 468 هـ |
| 16 | إعراب القرآن الكريم | أحمد عبيد الدعاس | 1431 هـ |
| 17 | متشابهات الألفاظ | تجهيز محمد شلبي | — |
| 44 | الجدول في إعراب القرآن وصرفه | محمود الصافي | 1376 هـ |
| 45 | الدر المصون | السمين الحلبي (أحمد بن يوسف) | 756 هـ |
| 46 | الميسر في غريب القرآن | مركز الدراسات القرآنية | — |
| 47 | النشر في القراءات العشر | ابن الجزري (محمد بن محمد) | 833 هـ |
| 51 | نص الآية بالخط العثماني | تنزيل من حكيم حميد | — |
| 59 | الوقف والابتداء | تجهيز محمد شلبي (من جمهرة العلوم) | — |
| 60 | وقف المصاحف (الشمرلي والمدينة والأزهر وورش) | تجهيز محمد شلبي | — |

### 6.3 Qira'at Books (22)

| ID | Title | Notes |
|---|---|---|
| 19 | رواية قالون عن نافع | |
| 20 | رواية ورش عن نافع | |
| 21 | رواية ورش — الأصبهاني | عن نافع من طريق الأصبهاني |
| 22 | قراءة ابن كثير | |
| 23 | قراءة أبي عمرو | |
| 24 | قراءة ابن عامر | |
| 25 | رواية شعبة عن عاصم | |
| 26 | قراءة حمزة | |
| 27 | قراءة الكسائي | |
| 28 | قراءة أبي جعفر | |
| 29 | قراءة يعقوب | |
| 30 | قراءة خلف العاشر | |
| 31 | العشر الصغرى | |
| 32 | تيسير العشر | بموافقة مشروع تيسير القراءات |
| 52 | شواهد القراءات العشر | الشاطبية والدرة |
| 53 | قراءات أصحاب الصلة | قالون وابن كثير وأبو جعفر |
| 54 | قراءات أصحاب التوسط | عاصم وابن عامر والكسائي وخلف |
| 55 | قراءات أهل سما | |
| 56 | قراءة عاصم وابن عامر | |
| 57 | قراءة الكسائي وخلف | |
| 58 | قراءة البصريين | |
| 65 | شواهد طيبة النشر | إعداد م/ محمد شلبي |

> All Qira'at books are prepared by Eng. Muhammad Shalaby unless otherwise stated.

### 6.4 Translations (14)

| ID | Title | Author / Source |
|---|---|---|
| 18 | ترجمة معاني القرآن الكريم — English | محمد تقي الدين الهلالي ومحمد محسن خان (1407 هـ) |
| 33 | Phonetic Book | Prepared by Muhammad Shalaby |
| 34 | Russian Book | Prepared by Muhammad Shalaby |
| 35 | Turkish Book | Prepared by Muhammad Shalaby |
| 36 | Indonesian Book | Prepared by Muhammad Shalaby |
| 37 | Malay Book | Prepared by Muhammad Shalaby |
| 38 | Urdu Book | Prepared by Muhammad Shalaby |
| 39 | Farsi Book | Prepared by Muhammad Shalaby |
| 40 | Pickthall Book | Prepared by Muhammad Shalaby |
| 41 | French Book | Prepared by Muhammad Shalaby |
| 42 | Dutch Book | Prepared by Muhammad Shalaby |
| 43 | Azerbaijani Book | Prepared by Muhammad Shalaby |
| 50 | Saheeh International | Umm Muhammad (Emily Assami), Mary Kennedy, Amatullah Bantley |
| 61 | Deutsch Book | Abu Rida Muhammad ibn Ahmad ibn Rassoul (1425 هـ) |

---

## 7. Gestures & Interaction Model

- **Swipe left/right** — turn pages.
- **Swipe up/down (edges)** — adjust screen brightness (toggleable).
- **Pinch** — zoom into the page.
- **Tap** — open verse / word details (configurable Tap vs. Press).
- **Long-press** — open word window or margin notes (hamsh).
- **Center tap** — toggle footer.
- **Center swipe** — quick-action shortcuts.
- **Arrow keys & mouse wheel** — desktop/web navigation.

---

## 8. Tech Stack & Platforms

| Layer | Technology |
|---|---|
| Framework | Angular 15 + Ionic 6.7 + Cordova |
| Language | TypeScript 4.9.5 |
| State | RxJS + service-based + Ionic Storage |
| Database | SQLite (via `cordova-sqlite-ext`) |
| i18n | `@ngneat/transloco` (Arabic default, English supported) |
| Platforms | Android, iOS, Web (PWA / desktop) |
| Audio | Cordova media + multiple CDN sources, offline downloader (zip) |
| Sharing | `SocialSharing` plugin |
| Distribution | Google Play (fastlane), App Store (fastlane), web build |

**Key architectural points worth highlighting on the website:**

- Fully offline-capable Quran reading and audio (after initial download).
- 15 dedicated edition index services — no compromise across qira'at.
- Service-based, modular architecture — fast updates and new editions/reciters can be added.
- RTL Arabic-first layout with first-class English support.
