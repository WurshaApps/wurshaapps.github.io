import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
import { FooterComponent } from '../sections/footer.component';
import { HeaderComponent } from '../sections/header.component';
import { POSTS, formatDate, postText } from './posts';

/** The blog, `/<lang>/blog/`: one announcement per app release, newest first (`content/blog.json`). */
@Component({
    selector: 'app-blog',
    imports: [RouterLink, HeaderComponent, FooterComponent],
    template: `
        @let t = i18n.t();
        <app-header />
        <main class="wrap blog">
            <h1>{{ t.blog.title }}</h1>
            <p class="lede">{{ t.blog.subtitle }}</p>
            <ol>
                @for (item of items(); track item.post.slug) {
                    @let link = ['/', i18n.lang(), 'blog', item.post.slug];
                    <li>
                        <p class="meta">
                            {{ t.downloads.version }} {{ item.post.version }} ·
                            <time [attr.datetime]="item.post.date">{{ item.date }}</time>
                        </p>
                        <div [attr.lang]="item.lang" [attr.dir]="item.dir">
                            <h2><a [routerLink]="link">{{ item.text.title }}</a></h2>
                            <p class="summary">{{ item.text.summary }}</p>
                        </div>
                        <a class="more" [routerLink]="link" aria-hidden="true" tabindex="-1">{{ t.blog.readMore }}</a>
                    </li>
                }
            </ol>
        </main>
        <app-footer />
    `,
    styles: `
        .blog { max-width: 780px; padding-block: 56px 72px; }
        ol { display: grid; gap: 0; margin: 40px 0 0; padding: 0; list-style: none; }
        li { padding: 28px 0; border-top: 1px solid var(--rule); }
        .meta { color: var(--ink-soft); font-size: 14.5px; }
        h2 { margin: 6px 0 10px; font-size: clamp(22px, 2.4vw, 28px); }
        h2 a { text-decoration: none; }
        h2 a:hover { color: var(--teal); text-decoration: underline; }
        .summary { color: var(--ink-soft); }
        .more { display: inline-block; margin-top: 12px; color: var(--teal); font-weight: 600; font-size: 15px; }
    `,
})
export class BlogComponent {
    readonly i18n = inject(I18nService);
    readonly items = computed(() => {
        const lang = this.i18n.lang();
        return POSTS.map((post) => {
            const shown = postText(post, lang);
            return {
                post,
                text: shown.text,
                // Only marked when the text is not in the page language (English on a Turkish page, say).
                lang: shown.lang === lang ? null : shown.lang,
                dir: shown.lang === lang ? null : 'ltr',
                date: formatDate(post.date, lang),
            };
        });
    });
}
