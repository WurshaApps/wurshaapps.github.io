import arJson from '@content/ar.json';
import enJson from '@content/en.json';

export type Lang = 'ar' | 'en';

/**
 * Shape of one locale's content. Mirrors `content/schemas/content.schema.json`.
 * Source of truth for copy: `content/ar.json` and `content/en.json`.
 * If you change this, update the JSON Schema and both locale files together.
 */
export interface Dict {
    meta: {
        title: string;
        description: string;
    };
    nav: {
        features: string;
        editions: string;
        reciters: string;
        books: string;
        downloads: string;
        switchLang: string;
    };
    hero: {
        eyebrow: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
        screenshotAlt: string;
    };
    stats: {
        editions: string;
        editionsLabel: string;
        reciters: string;
        recitersLabel: string;
        books: string;
        booksLabel: string;
        features: string;
        featuresLabel: string;
    };
    audiences: {
        title: string;
        subtitle: string;
        items: { title: string; body: string }[];
    };
    features: {
        title: string;
        subtitle: string;
        categories: {
            id: string;
            title: string;
            count: number;
            blurb: string;
            highlights: string[];
        }[];
    };
    editions: {
        title: string;
        subtitle: string;
        collections: { name: string; description: string; items: string[] }[];
        list: {
            code: string;
            name: string;
            note: string;
            isDefault?: boolean;
        }[];
        crossNote: string;
    };
    reciters: {
        title: string;
        subtitle: string;
        riwayatTitle: string;
        riwayat: { name: string; sub?: string }[];
        sourcesTitle: string;
        sources: { name: string; sub: string }[];
        featuredTitle: string;
        featured: { name: string; riwaya: string; version: string }[];
        downloadNote: string;
    };
    books: {
        title: string;
        subtitle: string;
        categories: {
            key: string;
            title: string;
            count: string;
            samples: string[];
        }[];
    };
    sciences: {
        title: string;
        subtitle: string;
        items: { title: string; body: string }[];
    };
    gestures: {
        title: string;
        subtitle: string;
        items: { gesture: string; action: string }[];
    };
    downloads: {
        title: string;
        subtitle: string;
        eyebrow: string;
        supportedOn: string;
        platformNames: { android: string; ios: string; windows: string; mac: string; web: string };
        platforms: { android: string; ios: string; windows: string; mac: string };
        storeLabels: {
            android: { small: string; big: string };
            ios: { small: string; big: string };
            windows: { small: string; big: string };
            mac: { small: string; big: string };
        };
        primaryCta: string;
        winNote: string;
        macNote: string;
        webSoon: string;
    };
    tech: {
        title: string;
        subtitle: string;
        bullets: string[];
    };
    footer: {
        about: string;
        creditsTitle: string;
        credits: { label: string; value: string }[];
        sourcesTitle: string;
        sources: string[];
        rights: string;
    };
    common: {
        placeholder: string;
        screenshot: string;
        comingSoon: string;
    };
    apps: Record<string, { name: string; description?: string }>;
}

const ar: Dict = arJson as Dict;
const en: Dict = enJson as Dict;

export const TRANSLATIONS: Record<Lang, Dict> = { ar, en };
