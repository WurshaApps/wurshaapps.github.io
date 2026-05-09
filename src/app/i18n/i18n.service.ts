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
import { loadDict, type Dict } from './translations';

const STORAGE_KEY = 'wursha-lang';
const FALLBACK: Lang = 'ar';

@Injectable({ providedIn: 'root' })
export class I18nService {
    private readonly _lang = signal<Lang>(this.detectInitial());
    private readonly _dict = signal<Dict | null>(null);
    private readonly cache = new Map<Lang, Dict>();

    readonly lang = this._lang.asReadonly();
    readonly dir = computed<Direction>(() => (RTL_LANGS.has(this._lang()) ? 'rtl' : 'ltr'));
    readonly t = computed<Dict>(() => {
        const dict = this._dict();
        if (!dict) {
            throw new Error('I18n dictionary accessed before initial load completed.');
        }
        return dict;
    });
    readonly locales = LOCALES;
    readonly currentLocale = computed(() => getLocale(this._lang()));

    constructor() {
        effect(() => {
            const lang = this._lang();
            const dir = this.dir();
            const dict = this._dict();
            if (typeof document !== 'undefined') {
                document.documentElement.lang = lang;
                document.documentElement.dir = dir;
                if (dict) {
                    document.title = dict.meta.title;
                    const meta = document.querySelector('meta[name="description"]');
                    if (meta) meta.setAttribute('content', dict.meta.description);
                }
            }
            try {
                localStorage?.setItem(STORAGE_KEY, lang);
            } catch {
                /* ignore */
            }
        });
    }

    /**
     * Loads the currently selected language and exposes its dictionary.
     * Used by the app initializer to block first paint until copy is ready.
     */
    async ensureLoaded(): Promise<void> {
        const lang = this._lang();
        const dict = await this.fetch(lang);
        if (this._lang() === lang) this._dict.set(dict);
    }

    /**
     * Switch active language. Loads the locale chunk on demand, then swaps the
     * dictionary and lang signal together so the UI never renders mismatched
     * direction/text.
     */
    setLang(lang: Lang) {
        void this.fetch(lang).then((dict) => {
            this._dict.set(dict);
            this._lang.set(lang);
        });
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

    private async fetch(lang: Lang): Promise<Dict> {
        const cached = this.cache.get(lang);
        if (cached) return cached;
        const dict = await loadDict(lang);
        this.cache.set(lang, dict);
        return dict;
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
