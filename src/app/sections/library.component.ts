import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';

@Component({
    selector: 'app-library',
    imports: [RouterLink],
    template: `
        @let t = i18n.t();
        <section id="library" class="section library">
            <div class="wrap">
                <h2>{{ t.library.title }}</h2>
                <p class="lede">{{ t.library.subtitle }}</p>
                <div class="grid">
                    @for (group of t.library.groups; track group.title) {
                        <div>
                            <h3>{{ group.title }}</h3>
                            <ul>
                                @for (item of group.items; track item) {
                                    <li>{{ item }}</li>
                                }
                                <li class="more">{{ t.library.more }}</li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </section>

        <section id="languages" class="section">
            <div class="wrap">
                <h2>{{ t.languages.title }}</h2>
                <p class="lede">{{ t.languages.subtitle }}</p>
                <ul class="langs">
                    @for (loc of i18n.locales; track loc.code) {
                        <li>
                            <a
                                [routerLink]="['/', loc.code]"
                                [attr.lang]="loc.code"
                                [attr.hreflang]="loc.code"
                                [attr.aria-current]="loc.code === i18n.lang() ? 'page' : null"
                                (click)="i18n.remember(loc.code)"
                                >{{ loc.name }}</a
                            >
                        </li>
                    }
                </ul>
                <p class="note">{{ t.languages.note }}</p>
            </div>
        </section>
    `,
    styles: `
        .library { background: var(--mist); }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-top: 48px; }
        h3 { margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--rule); font-size: 19px; font-weight: 600; }
        .grid ul { display: grid; gap: 7px; margin: 0; padding: 0; list-style: none; font-size: 15.5px; }
        .more { color: var(--ink-soft); }
        .langs { display: flex; flex-wrap: wrap; gap: 10px 12px; margin: 32px 0 28px; padding: 0; list-style: none; }
        .langs a { display: block; padding: 7px 14px; border: 1px solid var(--rule); border-radius: 999px; font-size: 15px; text-decoration: none; }
        .langs a:hover { border-color: var(--teal); }
        .langs a[aria-current='page'] { border-color: var(--teal); background: var(--teal); color: #fff; }
        @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
    `,
})
export class LibraryComponent {
    readonly i18n = inject(I18nService);
}
