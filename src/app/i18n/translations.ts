import arJson from '@content/ar.json';
import azJson from '@content/az.json';
import bnJson from '@content/bn.json';
import deJson from '@content/de.json';
import enJson from '@content/en.json';
import faJson from '@content/fa.json';
import frJson from '@content/fr.json';
import hiJson from '@content/hi.json';
import idJson from '@content/id.json';
import msJson from '@content/ms.json';
import psJson from '@content/ps.json';
import trJson from '@content/tr.json';
import urJson from '@content/ur.json';
import uzJson from '@content/uz.json';

import type { Lang } from './locales';

/**
 * Shape of one locale's content. Mirrors `content/schemas/content.schema.json`.
 * Source of truth for copy: `content/<code>.json` files.
 * If you change this, update the JSON Schema and every locale file together.
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

export const TRANSLATIONS: Record<Lang, Dict> = {
    ar: arJson as Dict,
    en: enJson as Dict,
    az: azJson as Dict,
    bn: bnJson as Dict,
    de: deJson as Dict,
    fa: faJson as Dict,
    fr: frJson as Dict,
    hi: hiJson as Dict,
    id: idJson as Dict,
    ms: msJson as Dict,
    ps: psJson as Dict,
    tr: trJson as Dict,
    ur: urJson as Dict,
    uz: uzJson as Dict,
};
