import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, CanMatchFn, ResolveFn, Routes, UrlSegment } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { I18nService } from './i18n/i18n.service';
import { isLang, type Lang } from './i18n/locales';
import type { Dict } from './i18n/translations';

const isLangSegment: CanMatchFn = (_route, segments: UrlSegment[]) => isLang(segments[0]?.path);
const langDict: ResolveFn<Dict> = (route: ActivatedRouteSnapshot) => inject(I18nService).use(route.paramMap.get('lang') as Lang);
// `/` is prerendered in Arabic for crawlers and no-JS visitors; the inline script in index.html sends
// everyone else to their language before Angular starts.
const rootDict: ResolveFn<Dict> = () => inject(I18nService).use('ar');

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent, resolve: { dict: rootDict } },
    { path: ':lang', canMatch: [isLangSegment], component: HomeComponent, resolve: { dict: langDict } },
    { path: '**', redirectTo: '' },
];
