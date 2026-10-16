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
