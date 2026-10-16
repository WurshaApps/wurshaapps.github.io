import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
import { LangPickerComponent } from '../i18n/lang-picker.component';

@Component({
    selector: 'app-header',
    imports: [LangPickerComponent, RouterLink],
    template: `
        @let t = i18n.t();
        <header>
            <div class="wrap bar">
                <a class="logo" [routerLink]="[]" fragment="top">
                    <img src="wursha-logo.png" alt="" width="30" height="30" />
                    {{ t.brand }}
                </a>
                <nav [attr.aria-label]="t.brand">
                    <a [routerLink]="[]" fragment="editions">{{ t.nav.editions }}</a>
                    <a [routerLink]="[]" fragment="features">{{ t.nav.features }}</a>
                    <a [routerLink]="[]" fragment="library">{{ t.nav.library }}</a>
                    <a [routerLink]="[]" fragment="downloads">{{ t.nav.downloads }}</a>
                </nav>
                <app-lang-picker />
            </div>
        </header>
    `,
    styles: `
        :host { position: sticky; top: 0; z-index: 20; display: block; }
        header { background: var(--deep); color: #fff; }
        .bar { display: flex; align-items: center; gap: 24px; height: 64px; }
        .logo { display: flex; align-items: center; gap: 10px; font-size: 19px; font-weight: 700; text-decoration: none; }
        .logo img { width: 30px; height: 30px; border-radius: 8px; }
        nav { display: flex; gap: 22px; margin-inline-start: auto; font-size: 15px; }
        nav a { text-decoration: none; opacity: 0.85; }
        nav a:hover { opacity: 1; }
        @media (max-width: 760px) {
            nav { display: none; }
            app-lang-picker { margin-inline-start: auto; }
        }
    `,
})
export class HeaderComponent {
    readonly i18n = inject(I18nService);
}
