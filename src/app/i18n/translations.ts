import type { Lang } from './locales';

export type EditionId = 'madina' | 'tajweed' | 'warsh' | 'qalon' | 'shamarli';
export type SceneId = 'meaning' | 'tartil' | 'memorize' | 'night' | 'tracks' | 'athkar' | 'share';
export type Platform = 'ios' | 'android' | 'mac' | 'windows';

/**
 * Shape of one locale's content. Mirrors `content/schemas/content.schema.json`.
 * Source of truth for copy: `content/<code>.json` files; `npm run check-content` compares every
 * locale's keys with en.json. Text wrapped in `*…*` is highlighted (see `HlComponent`).
 */
export interface Dict {
    meta: { title: string; description: string };
    brand: string;
    nav: { editions: string; features: string; library: string; downloads: string; language: string };
    hero: {
        title: string;
        subtitle: string;
        cta: string;
        ctaSecondary: string;
        platforms: string;
        imageAlt: string;
    };
    editions: {
        title: string;
        subtitle: string;
        platformsAll: string;
        platformsMobile: string;
        list: Record<EditionId, { name: string; riwaya: string; series: string; line: string }>;
    };
    story: {
        title: string;
        subtitle: string;
        /** Shown under the heading when the screenshots are in another language than the page; empty in en/ar. */
        screensNote: string;
        scenes: { id: SceneId; title: string; subtitle: string; items: string[]; note?: string }[];
    };
    library: {
        title: string;
        subtitle: string;
        more: string;
        groups: { title: string; items: string[] }[];
    };
    languages: { title: string; subtitle: string; note: string };
    /** The optional account: what sign-in is for (Google's OAuth brand verification reads it). The privacy link reuses `footer.privacy`. */
    account: { title: string; subtitle: string; items: string[]; delete: string };
    downloads: {
        title: string;
        subtitle: string;
        version: string;
        columns: Record<Platform | 'edition', string>;
        links: Record<Platform, string>;
        notAvailable: string;
        winNote: string;
        macNote: string;
    };
    footer: {
        about: string;
        creditsTitle: string;
        credits: { label: string; value: string }[];
        sourcesTitle: string;
        sources: string[];
        rights: string;
        /** Footer link to the privacy policy page. */
        privacy: string;
    };
    /** The privacy policy page, `/<lang>/privacy/`. URLs and emails in the text become links. */
    privacy: {
        metaTitle: string;
        metaDescription: string;
        title: string;
        updated: string;
        intro: string;
        sections: { title: string; paragraphs: string[]; items: string[] }[];
    };
}

/**
 * Per-language dynamic import factories. Each call site is statically analyzable
 * by the bundler, so esbuild emits one chunk per locale and only the requested
 * one is fetched at runtime.
 */
const LOADERS: Record<Lang, () => Promise<{ default: unknown }>> = {
    ar: () => import('@content/ar.json'),
    az: () => import('@content/az.json'),
    bn: () => import('@content/bn.json'),
    de: () => import('@content/de.json'),
    en: () => import('@content/en.json'),
    fa: () => import('@content/fa.json'),
    fr: () => import('@content/fr.json'),
    hi: () => import('@content/hi.json'),
    id: () => import('@content/id.json'),
    ms: () => import('@content/ms.json'),
    ps: () => import('@content/ps.json'),
    tr: () => import('@content/tr.json'),
    ur: () => import('@content/ur.json'),
    uz: () => import('@content/uz.json'),
};

export async function loadDict(lang: Lang): Promise<Dict> {
    const mod = await LOADERS[lang]();
    return mod.default as Dict;
}
