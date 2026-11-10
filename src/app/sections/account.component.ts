import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';

/**
 * The optional account (app repo `specs/accounts.md`): what sign-in is for. Google's
 * OAuth brand verification reads this on the home page, so keep it next to the privacy policy link.
 */
@Component({
    selector: 'app-account',
    imports: [RouterLink],
    template: `
        @let t = i18n.t();
        <section id="account" class="section account">
            <div class="wrap">
                <div>
                    <h2>{{ t.account.title }}</h2>
                    <p class="lede">{{ t.account.subtitle }}</p>
                    <p class="links">
                        <a class="btn btn--ghost" [routerLink]="['/', i18n.lang(), 'privacy']">{{ t.footer.privacy }}</a>
                        <a class="btn btn--ghost" [href]="deleteUrl()">{{ t.account.delete }}</a>
                    </p>
                </div>
            </div>
        </section>
    `,
    styles: `
        .account { background: var(--mist); }
        .links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .btn--ghost { color: var(--teal); }
        .btn--ghost:hover { background: rgb(9 77 89 / 0.06); }
    `,
})
export class AccountComponent {
    readonly i18n = inject(I18nService);
    /** The deletion page (`public/delete-account/`) is in Arabic and English; other languages follow the browser. */
    readonly deleteUrl = computed(() => {
        const lang = this.i18n.lang();
        return lang === 'ar' || lang === 'en' ? `/delete-account/?lang=${lang}` : '/delete-account/';
    });
}
