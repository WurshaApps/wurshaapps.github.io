import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
import { APPS, hasDesktop } from '../shared/catalog';

@Component({
    selector: 'app-editions',
    imports: [RouterLink],
    template: `
        @let t = i18n.t().editions;
        <section id="editions" class="section">
            <div class="wrap">
                <h2>{{ t.title }}</h2>
                <p class="lede">{{ t.subtitle }}</p>
                <ul class="grid">
                    @for (app of apps; track app.id) {
                        @let e = t.list[app.id];
                        <li>
                            <a [routerLink]="[]" fragment="downloads">
                                <div class="panel" [style.background-color]="app.accent">
                                    <img [src]="'editions/' + app.id + '.webp'" alt="" width="360" height="573" loading="lazy" />
                                </div>
                                <h3>{{ e.name }}</h3>
                                <p class="meta">{{ e.riwaya }}<span aria-hidden="true"> · </span>{{ e.series }}</p>
                                <p class="line">{{ e.line }}</p>
                                <p class="avail">{{ hasDesktop(app) ? t.platformsAll : t.platformsMobile }}</p>
                            </a>
                        </li>
                    }
                </ul>
            </div>
        </section>
    `,
    styles: `
        /* Flex, not grid, so a short last row (5 editions = 3 + 2) sits centred. */
        .grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin: 48px 0 0; padding: 0; list-style: none; }
        li { flex: 0 1 calc((100% - 40px) / 3); }
        a { display: flex; flex-direction: column; height: 100%; padding-bottom: 22px; border-radius: 18px; background: var(--mist); overflow: hidden; text-decoration: none; }
        a:hover .panel img { transform: translateY(-4px); }
        .panel { display: flex; justify-content: center; height: 240px; margin-bottom: 18px; padding: 28px 28px 0; overflow: hidden; }
        .panel img { width: 62%; border-radius: 3px 3px 0 0; box-shadow: 0 10px 30px rgb(0 0 0 / 0.3); transition: transform 0.2s; }
        h3 { padding: 0 22px; font-size: 21px; }
        .meta { padding: 0 22px; color: var(--ink-soft); font-size: 14px; }
        .line { padding: 10px 22px 0; font-size: 15.5px; }
        .avail { margin-top: auto; padding: 12px 22px 0; color: var(--ink-soft); font-size: 13px; }
        @media (max-width: 900px) { li { flex-basis: calc((100% - 20px) / 2); } }
        @media (max-width: 560px) { li { flex-basis: 100%; } }
        @media (prefers-reduced-motion: reduce) { .panel img { transition: none; } }
    `,
})
export class EditionsComponent {
    readonly i18n = inject(I18nService);
    readonly apps = APPS;
    readonly hasDesktop = hasDesktop;
}
