import { RenderMode, type ServerRoute } from '@angular/ssr';
import { POSTS } from './blog/posts';
import { LOCALES } from './i18n/locales';

const eachLang = async () => LOCALES.map((l) => ({ lang: l.code }));

export const serverRoutes: ServerRoute[] = [
    { path: '', renderMode: RenderMode.Prerender },
    { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: eachLang },
    { path: 'privacy', renderMode: RenderMode.Prerender },
    { path: ':lang/privacy', renderMode: RenderMode.Prerender, getPrerenderParams: eachLang },
    { path: ':lang/blog', renderMode: RenderMode.Prerender, getPrerenderParams: eachLang },
    {
        path: ':lang/blog/:slug',
        renderMode: RenderMode.Prerender,
        getPrerenderParams: async () => LOCALES.flatMap((l) => POSTS.map((p) => ({ lang: l.code, slug: p.slug }))),
    },
    { path: '**', renderMode: RenderMode.Client },
];
