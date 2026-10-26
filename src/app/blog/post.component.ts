import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
import { getLocale } from '../i18n/locales';
import { FooterComponent } from '../sections/footer.component';
import { HeaderComponent } from '../sections/header.component';
import { findPost, formatDate, postText } from './posts';

/**
 * One release announcement, `/<lang>/blog/<slug>/`. Posts are written in English and Arabic; other
 * languages show the English text under `blog.langNote`, with a link to the Arabic one.
 */
@Component({
    selector: 'app-post',
    imports: [RouterLink, HeaderComponent, FooterComponent],
    template: `
        @let t = i18n.t();
        @let p = view();
        <app-header />
        <main class="wrap post">
            <p class="back">
                <a [routerLink]="['/', i18n.lang(), 'blog']">{{ t.blog.all }}</a>
            </p>
            <p class="meta">
                {{ t.downloads.version }} {{ p.post.version }} ·
                <time [attr.datetime]="p.post.date">{{ p.date }}</time>
            </p>
            @if (p.fallback) {
                <p class="note">
                    {{ t.blog.langNote }}
                    <a [routerLink]="['/', 'ar', 'blog', p.post.slug]" hreflang="ar" lang="ar" dir="rtl">{{ arabic }}</a>
                </p>
            }
            <article [attr.lang]="p.fallback ? p.lang : null" [attr.dir]="p.fallback ? 'ltr' : null">
                <h1>{{ p.text.title }}</h1>
                <p class="summary">{{ p.text.summary }}</p>
                @for (section of p.text.sections; track $index) {
                    <section>
                        <h2>{{ section.title }}</h2>
                        @if (section.intro) {
                            <p>{{ section.intro }}</p>
                        }
                        @if (section.items.length) {
                            <ul>
                                @for (item of section.items; track $index) {
                                    <li>{{ item }}</li>
                                }
                            </ul>
                        }
                    </section>
                }
            </article>
            <p class="cta">
                <a class="btn btn--primary" [routerLink]="['/', i18n.lang()]" fragment="downloads">{{ t.hero.cta }}</a>
            </p>
        </main>
        <app-footer />
    `,
    styles: `
        .post { max-width: 780px; padding-block: 40px 72px; }
        .back { margin-bottom: 28px; font-size: 15px; }
        .back a { color: var(--teal); }
        .meta { margin-bottom: 8px; color: var(--ink-soft); font-size: 14.5px; }
        .note { margin: 0 0 20px; }
        .note a { color: var(--teal); }
        h1 { margin-bottom: 12px; font-size: clamp(30px, 4vw, 40px); }
        .summary { font-size: 18px; }
        section { margin-top: 36px; }
        h2 { margin-bottom: 12px; font-size: 22px; }
        section p { margin: 0 0 12px; }
        ul { display: grid; gap: 8px; margin: 0 0 12px; padding-inline-start: 22px; }
        .cta { margin-top: 48px; }
    `,
})
export class PostComponent {
    readonly i18n = inject(I18nService);
    readonly arabic = getLocale('ar').name;
    // The route only matches known slugs (app.routes.ts), and stays mounted when moving between posts.
    private readonly params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });
    readonly view = computed(() => {
        const post = findPost(this.params().get('slug'))!;
        const lang = this.i18n.lang();
        const shown = postText(post, lang);
        return { post, ...shown, fallback: shown.lang !== lang, date: formatDate(post.date, lang) };
    });
}
