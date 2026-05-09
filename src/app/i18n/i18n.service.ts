import { Injectable, computed, effect, signal } from '@angular/core';
import { TRANSLATIONS, type Dict, type Lang } from './translations';

const STORAGE_KEY = 'wursha-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
    private readonly _lang = signal<Lang>(this.detectInitial());

    readonly lang = this._lang.asReadonly();
    readonly dir = computed<'rtl' | 'ltr'>(() => (this._lang() === 'ar' ? 'rtl' : 'ltr'));
    readonly t = computed<Dict>(() => TRANSLATIONS[this._lang()]);
    readonly other = computed<Lang>(() => (this._lang() === 'ar' ? 'en' : 'ar'));

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

    toggle() {
        this._lang.set(this._lang() === 'ar' ? 'en' : 'ar');
    }

    private detectInitial(): Lang {
        try {
            const saved = localStorage?.getItem(STORAGE_KEY) as Lang | null;
            if (saved === 'ar' || saved === 'en') return saved;
        } catch {
            /* ignore */
        }
        if (typeof navigator !== 'undefined') {
            const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
            for (const l of langs) {
                if (!l) continue;
                if (l.toLowerCase().startsWith('ar')) return 'ar';
                if (l.toLowerCase().startsWith('en')) return 'en';
            }
        }
        return 'ar';
    }
}
