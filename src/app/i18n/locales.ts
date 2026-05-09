export const LOCALES = [
    { code: 'ar', name: 'العربية', english: 'Arabic', dir: 'rtl' },
    { code: 'en', name: 'English', english: 'English', dir: 'ltr' },
    { code: 'az', name: 'Azərbaycanca', english: 'Azerbaijani', dir: 'ltr' },
    { code: 'bn', name: 'বাংলা', english: 'Bengali', dir: 'ltr' },
    { code: 'de', name: 'Deutsch', english: 'German', dir: 'ltr' },
    { code: 'fa', name: 'فارسی', english: 'Persian', dir: 'rtl' },
    { code: 'fr', name: 'Français', english: 'French', dir: 'ltr' },
    { code: 'hi', name: 'हिन्दी', english: 'Hindi', dir: 'ltr' },
    { code: 'id', name: 'Bahasa Indonesia', english: 'Indonesian', dir: 'ltr' },
    { code: 'ms', name: 'Bahasa Melayu', english: 'Malay', dir: 'ltr' },
    { code: 'ps', name: 'پښتو', english: 'Pashto', dir: 'rtl' },
    { code: 'tr', name: 'Türkçe', english: 'Turkish', dir: 'ltr' },
    { code: 'ur', name: 'اردو', english: 'Urdu', dir: 'rtl' },
    { code: 'uz', name: 'Oʻzbekcha', english: 'Uzbek', dir: 'ltr' },
] as const;

export type Lang = (typeof LOCALES)[number]['code'];
export type Direction = 'ltr' | 'rtl';

export interface LocaleInfo {
    code: Lang;
    name: string;
    english: string;
    dir: Direction;
}

const BY_CODE = new Map<string, LocaleInfo>(LOCALES.map((l) => [l.code, l as LocaleInfo]));

export function isLang(value: unknown): value is Lang {
    return typeof value === 'string' && BY_CODE.has(value);
}

export function getLocale(code: Lang): LocaleInfo {
    const info = BY_CODE.get(code);
    if (!info) throw new Error(`Unknown locale: ${code}`);
    return info;
}

export const RTL_LANGS: ReadonlySet<Lang> = new Set(
    LOCALES.filter((l) => l.dir === 'rtl').map((l) => l.code as Lang),
);

/**
 * ISO 639 aliases for legacy / variant codes the browser may emit.
 * Keys are 2/3-letter codes encountered in the wild; values map to one of our `Lang`s.
 */
const LANG_ALIASES: Record<string, Lang> = {
    in: 'id', // legacy ISO 639-1 for Indonesian
    prs: 'fa', // Dari Persian
    fas: 'fa',
    per: 'fa',
    pus: 'ps',
    pbt: 'ps',
    pbu: 'ps',
    azb: 'az', // South Azerbaijani — close enough
    aze: 'az',
    deu: 'de',
    ger: 'de',
    fra: 'fr',
    fre: 'fr',
    tur: 'tr',
    ind: 'id',
    msa: 'ms',
    zsm: 'ms',
    hin: 'hi',
    ben: 'bn',
    urd: 'ur',
    uzb: 'uz',
    ara: 'ar',
    eng: 'en',
};

/**
 * Country-to-language fallback. Used only when no language tag in the visitor's
 * navigator.languages list matches a supported `Lang` directly. The country code
 * is taken from the BCP 47 region subtag (e.g. "ru-AZ" → "AZ" → 'az').
 */
const COUNTRY_TO_LANG: Partial<Record<string, Lang>> = {
    // Arab world
    SA: 'ar', AE: 'ar', EG: 'ar', JO: 'ar', LB: 'ar', SY: 'ar', IQ: 'ar',
    KW: 'ar', QA: 'ar', BH: 'ar', OM: 'ar', YE: 'ar', PS: 'ar', LY: 'ar',
    TN: 'ar', DZ: 'ar', MA: 'ar', SD: 'ar', MR: 'ar', SO: 'ar', DJ: 'ar', KM: 'ar',
    // Persian / Pashto
    IR: 'fa',
    AF: 'fa', // Afghanistan: Dari (fa) is the more common browser default; Pashto users may switch manually
    // South Asia
    PK: 'ur', IN: 'hi', BD: 'bn',
    // Europe (German)
    DE: 'de', AT: 'de', LI: 'de',
    CH: 'de', // Switzerland — German is the largest of the official languages
    // French
    FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr',
    // Turkish
    TR: 'tr', CY: 'tr',
    // Southeast Asia
    ID: 'id',
    MY: 'ms', BN: 'ms', SG: 'ms',
    // Central Asia
    AZ: 'az',
    UZ: 'uz',
    // English-speaking
    GB: 'en', US: 'en', AU: 'en', NZ: 'en', IE: 'en', CA: 'en',
    ZA: 'en', NG: 'en', KE: 'en', GH: 'en',
};

/**
 * Pick a supported `Lang` from the visitor's browser locale settings.
 * Reads `navigator.languages` (the canonical user-agent locale signal — the
 * client-side equivalent of the `Accept-Language` header) and tries, in order:
 *
 *   1. Exact match on the language subtag of any tag (e.g. "fr-CA" → 'fr').
 *   2. ISO 639 aliases (e.g. legacy "in" → 'id', "prs" → 'fa').
 *   3. Region subtag fallback (e.g. "ru-AZ" → 'az', "en-SA" → 'ar') —
 *      only kicks in when no language tag matches directly.
 *
 * Returns `null` when nothing in the visitor's preferences matches our
 * supported set; the caller decides the ultimate fallback (`'ar'` here).
 */
export function detectLangFromUserAgent(): Lang | null {
    if (typeof navigator === 'undefined') return null;

    const candidates =
        navigator.languages && navigator.languages.length > 0
            ? Array.from(navigator.languages)
            : navigator.language
              ? [navigator.language]
              : [];

    // Pass 1: language subtag + ISO 639 aliases.
    for (const tag of candidates) {
        if (!tag) continue;
        const parts = tag.toLowerCase().split('-');
        const langSubtag = parts[0];
        if (!langSubtag) continue;
        if (isLang(langSubtag)) return langSubtag;
        const aliased = LANG_ALIASES[langSubtag];
        if (aliased) return aliased;
    }

    // Pass 2: region subtag → country fallback.
    for (const tag of candidates) {
        if (!tag) continue;
        const parts = tag.split('-');
        // Region subtag is typically 2-letter (ISO 3166-1) or 3-digit; we only handle the alpha case.
        const region = parts.slice(1).find((p) => /^[a-z]{2}$/i.test(p))?.toUpperCase();
        if (!region) continue;
        const fromRegion = COUNTRY_TO_LANG[region];
        if (fromRegion) return fromRegion;
    }

    return null;
}
