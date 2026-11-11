import catalog from '@content/apps.json';
import layouts from '@content/layouts.json';
import type { Direction } from '../i18n/locales';
import type { EditionId, Platform, SceneId } from '../i18n/translations';

export interface App {
    id: EditionId;
    accent: string;
    /** Alt text of `public/editions/<id>-promo.webp` (its text is Arabic): `ar` on RTL pages, `en` on the rest. */
    promoAlt: { en: string; ar: string };
    release?: string;
    urls: Partial<Record<Platform, string>>;
}

/** Editions in display order, from `content/apps.json`. */
export const APPS = catalog.apps as App[];

/**
 * The Mushafs each edition offers, bundled one first (`content/layouts.json`, written by
 * `npm run update-layouts` from the apps' layout catalog). The catalog names layouts in Arabic and English
 * only: RTL pages show the Arabic names, the others the English ones.
 */
export function layoutNames(dir: Direction): Record<EditionId, string[]> {
    const lang = dir === 'rtl' ? 'ar' : 'en';
    const names = layouts.layouts as Record<string, { ar: string; en: string }>;
    return Object.fromEntries(
        Object.entries(layouts.editions).map(([id, keys]) => [id, keys.map((k) => names[k][lang])]),
    ) as Record<EditionId, string[]>;
}

/**
 * App Store Connect provider token (the `pt` value in a link from App Analytics' campaign link generator),
 * the same for every app on the account. Apple only counts a campaign link that carries both `pt` and `ct`.
 */
const APP_STORE_PROVIDER_TOKEN = '119253327';

/**
 * Store link tagged with where the visitor came from, so App Store Connect (App Analytics → Sources →
 * Campaigns) and Play Console (Statistics → acquisition by UTM) can count the visits and installs that
 * came from this site, per page language. Desktop links go straight to GitHub and are counted there
 * (`npm run download-counts`).
 */
export function storeUrl(app: App, platform: Platform, lang: string): string | undefined {
    const url = app.urls[platform];
    if (!url) return undefined;
    const campaign = `wursha.com-${lang}`;
    if (platform === 'ios') {
        return `${url}?pt=${APP_STORE_PROVIDER_TOKEN}&ct=${campaign}&mt=8`;
    }
    if (platform === 'android') {
        const referrer = `utm_source=wursha.com&utm_medium=website&utm_campaign=${campaign}`;
        return `${url}&referrer=${encodeURIComponent(referrer)}`;
    }
    return url;
}

/**
 * The stores' official download badges, in the page language where the store has one
 * (`public/badges/`, see content/README.md "Store badges"); the others show the English badge.
 */
const APP_STORE_BADGES = new Set(['ar', 'bn', 'de', 'en', 'fr', 'id', 'ms', 'tr', 'ur']);
const GOOGLE_PLAY_BADGES = new Set(['ar', 'az', 'bn', 'de', 'en', 'fa', 'fr', 'hi', 'id', 'ms', 'tr', 'ur', 'uz']);

export function badge(platform: 'ios' | 'android', lang: string): string {
    return platform === 'ios'
        ? `badges/app-store/${APP_STORE_BADGES.has(lang) ? lang : 'en'}.svg`
        : `badges/google-play/${GOOGLE_PLAY_BADGES.has(lang) ? lang : 'en'}.png`;
}

/**
 * Screenshots come in two sets (scripts/import-shots.mjs): English UI for LTR pages, Arabic UI for RTL
 * pages. Captions are page text, so every language gets its own words over the same few images.
 * The memorize scene exists in Arabic only (its audio menu is Arabic in every UI language).
 */
export function shotSet(dir: Direction): 'en' | 'ar' {
    return dir === 'rtl' ? 'ar' : 'en';
}

export function sceneImage(scene: SceneId, dir: Direction): string {
    return `shots/${scene === 'memorize' ? 'ar' : shotSet(dir)}/${scene}.webp`;
}
