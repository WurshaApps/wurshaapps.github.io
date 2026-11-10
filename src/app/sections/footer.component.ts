import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';

@Component({
    selector: 'app-footer',
    imports: [RouterLink],
    template: `
        @let t = i18n.t().footer;
        <footer>
            <div class="wrap">
                <p class="about">{{ t.about }}</p>
                <p class="rights">
                    {{ t.rights }} ·
                    <a [routerLink]="['/', i18n.lang(), 'privacy']">{{ t.privacy }}</a> ·
                    <a [routerLink]="['/', i18n.lang(), 'blog']">{{ i18n.t().nav.blog }}</a>
                </p>
            </div>
        </footer>
    `,
    styles: `
        footer { padding: 40px 0 48px; border-top: 1px solid var(--rule); color: var(--ink-soft); font-size: 14.5px; }
        .about { margin-bottom: 12px; color: var(--ink); font-weight: 600; }
    `,
})
export class FooterComponent {
    readonly i18n = inject(I18nService);
}
