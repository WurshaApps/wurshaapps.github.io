import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LOCALES, RTL_LANGS, detectLangFromUserAgent, getLocale, isLang, type Direction, type Lang } from './locales';
import { loadDict, type Dict } from './translations';

const STORAGE_KEY = 'wursha-lang';
const FALLBACK: Lang = 'ar';
export const SITE_URL = 'https://wursha.com';

/** The site's pages; each exists once per language at `/<lang>/<page>/`. A blog post is `blog/<slug>`. */
export type Page = 'home' | 'privacy' | 'blog' | `blog/${string}`;
const pagePath = (page: Page) => (page === 'home' ? '' : `${page}/`);

/** `<title>` and meta description of a page. */
export interface HeadText {
    title: string;
    description: string;
}

/** Each language is its own prerendered page at `/<lang>/`; the route decides the language. */
@Injectable({ providedIn: 'root' })
export class I18nService {
    private readonly document = inject(DOCUMENT);
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);
    private readonly cache = new Map<Lang, Dict>();
    private readonly _lang = signal<Lang>(FALLBACK);
    private readonly _dict = signal<Dict | null>(null);
    private readonly _page = signal<Page>('home');

    readonly lang = this._lang.asReadonly();
    readonly page = this._page.asReadonly();
    /** Router link to this page in `lang`. */
    readonly pageLink = (lang: Lang): string[] => (this._page() === 'home' ? ['/', lang] : ['/', lang, ...this._page().split('/')]);
    readonly dir = computed<Direction>(() => (RTL_LANGS.has(this._lang()) ? 'rtl' : 'ltr'));
    readonly locales = LOCALES;
    readonly currentLocale = computed(() => getLocale(this._lang()));
    readonly t = computed<Dict>(() => {
        const dict = this._dict();
        if (!dict) throw new Error('I18n dictionary accessed before the route resolved it.');
        return dict;
    });

    /**
     * Loads `lang`, then swaps text, direction and the document head together. Called by the route resolvers;
     * `head` gives the title and description of a page whose text is not in the dictionary (a blog post).
     */
    async use(lang: Lang, page: Page = 'home', head?: (dict: Dict) => HeadText): Promise<Dict> {
        let dict = this.cache.get(lang);
        if (!dict) {
            dict = await loadDict(lang);
            this.cache.set(lang, dict);
        }
        this._dict.set(dict);
        this._lang.set(lang);
        this._page.set(page);
        this.applyHead(lang, page, head?.(dict) ?? this.headText(dict, page));
        return dict;
    }

    /** Remembers an explicit choice from the language picker; `/` sends returning visitors there. */
    remember(lang: Lang) {
        if (!this.isBrowser) return;
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            /* private browsing */
        }
    }

    /**
     * Language for a visit to `/`, highest priority first: the saved manual choice, the browser's
     * languages (see `detectLangFromUserAgent`), then Arabic. Always Arabic while prerendering.
     */
    detect(): Lang {
        if (!this.isBrowser) return FALLBACK;
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (isLang(saved)) return saved;
        } catch {
            /* private browsing */
        }
        return detectLangFromUserAgent() ?? FALLBACK;
    }

    private headText(dict: Dict, page: Page): HeadText {
        if (page === 'privacy') return { title: dict.privacy.metaTitle, description: dict.privacy.metaDescription };
        if (page === 'blog') return { title: dict.blog.metaTitle, description: dict.blog.metaDescription };
        return dict.meta;
    }

    private applyHead(lang: Lang, page: Page, { title, description }: HeadText) {
        const html = this.document.documentElement;
        html.lang = lang;
        html.dir = RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
        const path = pagePath(page);
        this.title.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:url', content: `${SITE_URL}/${lang}/${path}` });
        this.meta.updateTag({ property: 'og:locale', content: lang });

        const head = this.document.head;
        head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((el) => el.remove());
        const link = (attrs: Record<string, string>) => {
            const el = this.document.createElement('link');
            for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
            head.appendChild(el);
        };
        link({ rel: 'canonical', href: `${SITE_URL}/${lang}/${path}` });
        for (const l of LOCALES) link({ rel: 'alternate', hreflang: l.code, href: `${SITE_URL}/${l.code}/${path}` });
        // `/` and `/privacy` pick the visitor's language; the blog has no such page, so its default is Arabic like `/`.
        const xDefault = page === 'home' || page === 'privacy' ? path : `ar/${path}`;
        link({ rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/${xDefault}` });
    }
}
