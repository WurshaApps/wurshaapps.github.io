import { Injectable, computed, effect, signal } from '@angular/core';
import { LOCALES, RTL_LANGS, getLocale, isLang, type Direction, type Lang } from './locales';
import { TRANSLATIONS, type Dict } from './translations';

const STORAGE_KEY = 'wursha-lang';

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

    setLang(lang: Lang) {
        this._lang.set(lang);
    }

    private detectInitial(): Lang {
        try {
            const saved = localStorage?.getItem(STORAGE_KEY);
            if (isLang(saved)) return saved;
        } catch {
            /* ignore */
        }
        if (typeof navigator !== 'undefined') {
            const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
            for (const l of langs) {
                if (!l) continue;
                const code = l.split('-')[0]?.toLowerCase();
                if (isLang(code)) return code;
            }
        }
        return 'ar';
    }
}
