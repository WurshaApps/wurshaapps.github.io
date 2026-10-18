import catalog from '@content/apps.json';
import type { Direction } from '../i18n/locales';
import type { EditionId, Platform, SceneId } from '../i18n/translations';

export interface App {
    id: EditionId;
    accent: string;
    release?: string;
    urls: Partial<Record<Platform, string>>;
}

/** Editions in display order, from `content/apps.json`. */
export const APPS = catalog.apps as App[];
export const VERSION = catalog.version;
export const PLATFORMS: Platform[] = ['ios', 'android', 'mac', 'windows'];

export const hasDesktop = (app: App) => Boolean(app.urls.mac || app.urls.windows);

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
