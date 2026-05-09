import { Injectable, computed, effect, signal } from '@angular/core';
import {
    LOCALES,
    RTL_LANGS,
    detectLangFromUserAgent,
    getLocale,
    isLang,
    type Direction,
    type Lang,
} from './locales';
import { TRANSLATIONS, type Dict } from './translations';

const STORAGE_KEY = 'wursha-lang';
const FALLBACK: Lang = 'ar';

@Injectable({ providedIn: 'root' })
export class I18nService {
    private readonly _lang = signal<Lang>(this.detectInitial());

    readonly lang = this._lang.asReadonly();
    readonly dir = computed<Direction>(() => (RTL_LANGS.has(this._lang()) ? 'rtl' : 'ltr'));
    readonly t = computed<Dict>(() => TRANSLATIONS[this._lang()]);
    readonly locales = LOCALES;
    readonly currentLocale = computed(() => getLocale(this._lang()));

    constructor() {
        effect(() => {
            const lang = this._lang();
            const dir = this.dir();
            if (typeof document !== 'undefined') {
                document.documentElement.lang = lang;
                document.documentElement.dir = dir;
                document.title = TRANSLATIONS[lang].meta.title;
                const meta = document.querySelector('meta[name="description"]');
                if (meta) meta.setAttribute('content', TRANSLATIONS[lang].meta.description);
            }
            try {
                localStorage?.setItem(STORAGE_KEY, lang);
            } catch {
                /* ignore */
            }
        });
    }

    /**
     * Manually set the active language. The choice is persisted to localStorage
     * via the constructor effect, so it overrides user-agent auto-detection on
     * subsequent visits.
     */
    setLang(lang: Lang) {
        this._lang.set(lang);
    }

    /**
     * Forget the saved manual choice. The next page load will fall back to
     * user-agent detection. Provided for completeness; not wired to any UI.
     */
    clearSavedLang() {
        try {
            localStorage?.removeItem(STORAGE_KEY);
        } catch {
            /* ignore */
        }
    }

    /**
     * Detection chain (highest priority first):
     *   1. Persisted manual choice in localStorage — keeps the user's explicit
     *      pick stable across visits, untouched by auto-detection.
     *   2. User-agent locale (`navigator.languages`) — language subtag match,
     *      ISO 639 aliases, then region/country fallback. See locales.ts.
     *   3. Hard fallback: Arabic (the canonical content language).
     */
    private detectInitial(): Lang {
        try {
            const saved = localStorage?.getItem(STORAGE_KEY);
            if (isLang(saved)) return saved;
        } catch {
            /* SSR / private browsing */
        }
        return detectLangFromUserAgent() ?? FALLBACK;
    }
}
