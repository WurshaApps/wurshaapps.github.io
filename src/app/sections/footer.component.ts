import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
    selector: 'app-footer',
    template: `
        @let t = i18n.t().footer;
        <footer>
            <div class="wrap grid">
                <div>
                    <p class="about">{{ t.about }}</p>
                    <h2>{{ t.creditsTitle }}</h2>
                    <dl>
                        @for (c of t.credits; track c.label) {
                            <dt>{{ c.label }}</dt>
                            <dd>{{ c.value }}</dd>
                        }
                    </dl>
                </div>
                <div>
                    <h2>{{ t.sourcesTitle }}</h2>
                    <ul>
                        @for (s of t.sources; track s) {
                            <li>{{ s }}</li>
                        }
                    </ul>
                    <p class="rights">{{ t.rights }}</p>
                </div>
            </div>
        </footer>
    `,
    styles: `
        footer { padding: 64px 0 72px; border-top: 1px solid var(--rule); color: var(--ink-soft); font-size: 14.5px; }
        .grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; }
        .about { margin-bottom: 20px; color: var(--ink); font-weight: 600; }
        h2 { margin-bottom: 12px; color: var(--ink); font-size: 15px; }
        dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; margin: 0; }
        dt { color: var(--ink); }
        dd { margin: 0; }
        ul { display: grid; gap: 6px; margin: 0; padding: 0; list-style: none; }
        .rights { margin-top: 24px; }
        @media (max-width: 760px) {
            .grid { grid-template-columns: 1fr; }
            dl { grid-template-columns: 1fr; }
            dd { margin-bottom: 8px; }
        }
    `,
})
export class FooterComponent {
    readonly i18n = inject(I18nService);
}
