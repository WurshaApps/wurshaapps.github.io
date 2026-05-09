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
