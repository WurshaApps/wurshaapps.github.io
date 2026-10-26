# wursha.com

Marketing site for the Wursha Mushaf apps (Quran Holder and Khair Zad editions). Angular 21, prerendered
to static pages, deployed to GitHub Pages by `.github/workflows/node.js.yml` on every push to `main`.

- One page per language: `/ar/`, `/en/`, … (14 languages, `src/app/i18n/locales.ts`), each with its own
  `<html lang dir>`, title, description and `hreflang` links. `/` sends visitors to their saved or browser
  language (inline script in `src/index.html`) and is itself the Arabic page for crawlers.
- The privacy policy is `/<lang>/privacy/` (`src/app/privacy/`), text in the `privacy` block of each
  `content/<lang>.json`. `/privacy` — the address the app stores link to — sends visitors to their language
  the same way `/` does, and is the Arabic page for crawlers. Keep it in step with what the apps do
  (the app repo's `specs/accounts.md` §4/§8) and change `privacy.updated` with every edit.
- The blog is `/<lang>/blog/` (`src/app/blog/`): one announcement per app release, linked from the header and
  footer. Posts are in `content/blog.json`, in English and Arabic (from the app repo's `CHANGELOG.md` and the
  store's What's New); other languages show the English text with a note. Add a post at the top for every release.
- `/delete-account` (`public/delete-account/index.html`) forwards to the account-deletion page on the sign-in
  domain (app repo, `firebase-cloud/hosting/`), keeping `?lang=` and `#`. It is the address in the privacy policy
  and Google Play's "Delete account URL".
- Visitor numbers, with no cookies or IDs:
  App Store and Play links in the download table carry a `wursha.com-<lang>` campaign tag (`storeUrl()` in
  `src/app/shared/catalog.ts`), read in App Store Connect (App Analytics → Campaigns) and Play Console
  (acquisition by UTM). Desktop downloads are GitHub's own counts (`npm run download-counts`). Page visits go
  to a cookieless Cloudflare Web Analytics counter, switched on by the `token` in `src/index.html`'s last script.
- All copy lives in `content/` — see `content/README.md`. Design and copy rules: `specs/website-redesign.md`.

## Commands

| Command                 | Does                                                                     |
| ----------------------- | ------------------------------------------------------------------------ |
| `npm start`             | Dev server at http://localhost:4200 (server-renders the requested page)  |
| `npm run build`         | Checks content, then builds and prerenders every page into `dist/wdc/browser` |
| `npm run check-content` | Compares every `content/<lang>.json` with `en.json`                      |
| `npm run update-links`  | Pulls the newest Mac/Windows download links into `content/apps.json`     |
| `npm run download-counts` | Mac/Windows downloads per edition from GitHub (`-- --versions` per release) |
| `npm run import-shots`  | Rebuilds `public/shots/` and `public/editions/` from the store screenshots (needs ImageMagick) |

To check the built site the way GitHub Pages serves it:

```bash
python3 -m http.server 4311 --directory dist/wdc/browser
```
