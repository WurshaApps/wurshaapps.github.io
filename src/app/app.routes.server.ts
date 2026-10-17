import { RenderMode, type ServerRoute } from '@angular/ssr';
import { LOCALES } from './i18n/locales';

export const serverRoutes: ServerRoute[] = [
    { path: '', renderMode: RenderMode.Prerender },
    { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: async () => LOCALES.map((l) => ({ lang: l.code })) },
    { path: 'privacy', renderMode: RenderMode.Prerender },
    { path: ':lang/privacy', renderMode: RenderMode.Prerender, getPrerenderParams: async () => LOCALES.map((l) => ({ lang: l.code })) },
    { path: '**', renderMode: RenderMode.Client },
];
