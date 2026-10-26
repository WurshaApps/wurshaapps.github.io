import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, CanMatchFn, ResolveFn, Routes, UrlSegment } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { I18nService } from './i18n/i18n.service';
import { isLang, type Lang } from './i18n/locales';
import type { Dict } from './i18n/translations';

const isLangSegment: CanMatchFn = (_route, segments: UrlSegment[]) => isLang(segments[0]?.path);
// `:lang/blog/:slug` only matches posts in content/blog.json; anything else falls through to `**`.
const isPostSegment: CanMatchFn = async (_route, segments: UrlSegment[]) =>
    isLang(segments[0]?.path) && (await import('./blog/posts')).findPost(segments[2]?.path) !== undefined;
const langDict: ResolveFn<Dict> = (route: ActivatedRouteSnapshot) => inject(I18nService).use(route.paramMap.get('lang') as Lang);
// `/` is prerendered in Arabic for crawlers and no-JS visitors; the inline script in index.html sends
// everyone else to their language before Angular starts.
const rootDict: ResolveFn<Dict> = () => inject(I18nService).use('ar');
const privacyDict: ResolveFn<Dict> = (route: ActivatedRouteSnapshot) =>
    inject(I18nService).use((route.paramMap.get('lang') as Lang | null) ?? 'ar', 'privacy');
const blogDict: ResolveFn<Dict> = (route: ActivatedRouteSnapshot) =>
    inject(I18nService).use(route.paramMap.get('lang') as Lang, 'blog');
const postDict: ResolveFn<Dict> = async (route: ActivatedRouteSnapshot) => {
    const i18n = inject(I18nService); // before the await, while still in the injection context
    const { findPost, postText } = await import('./blog/posts');
    const lang = route.paramMap.get('lang') as Lang;
    const post = findPost(route.paramMap.get('slug'))!;
    const { text } = postText(post, lang);
    return i18n.use(lang, `blog/${post.slug}`, (dict) => ({
        title: `${text.title} — ${dict.brand}`,
        description: text.summary,
    }));
};

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent, resolve: { dict: rootDict } },
    { path: ':lang', canMatch: [isLangSegment], component: HomeComponent, resolve: { dict: langDict } },
    // `/privacy` is the address the app stores link to: Arabic for crawlers, and index.html's script sends
    // visitors to `/<lang>/privacy/` like it does for `/`.
    { path: 'privacy', component: PrivacyComponent, resolve: { dict: privacyDict } },
    { path: ':lang/privacy', canMatch: [isLangSegment], component: PrivacyComponent, resolve: { dict: privacyDict } },
    {
        path: ':lang/blog',
        canMatch: [isLangSegment],
        loadComponent: () => import('./blog/blog.component').then((m) => m.BlogComponent),
        resolve: { dict: blogDict },
    },
    {
        path: ':lang/blog/:slug',
        canMatch: [isPostSegment],
        loadComponent: () => import('./blog/post.component').then((m) => m.PostComponent),
        resolve: { dict: postDict },
    },
    { path: '**', redirectTo: '' },
];
