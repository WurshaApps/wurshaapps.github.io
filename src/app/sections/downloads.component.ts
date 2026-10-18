import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { APPS, PLATFORMS, VERSION, storeUrl } from '../shared/catalog';

@Component({
    selector: 'app-downloads',
    template: `
        @let t = i18n.t();
        @let d = t.downloads;
        <section id="downloads" class="section">
            <div class="wrap">
                <h2>{{ d.title }}</h2>
                <p class="lede">{{ d.subtitle }} {{ d.version }} {{ version }}.</p>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">{{ d.columns.edition }}</th>
                            @for (p of platforms; track p) {
                                <th scope="col">{{ d.columns[p] }}</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        @for (app of apps; track app.id) {
                            <tr>
                                <th scope="row">
                                    {{ t.editions.list[app.id].name }}
                                    <small>{{ t.editions.list[app.id].riwaya }}</small>
                                </th>
                                @for (p of platforms; track p) {
                                    <td [attr.data-label]="d.columns[p]">
                                        @if (link(app, p, i18n.lang()); as url) {
                                            <a [href]="url" rel="noopener">{{ d.links[p] }}</a>
                                        } @else {
                                            <span class="na">{{ d.notAvailable }}</span>
                                        }
                                    </td>
                                }
                            </tr>
                        }
                    </tbody>
                </table>
                <p class="notes">
                    <span>{{ d.winNote }}</span>
                    <span>{{ d.macNote }}</span>
                </p>
            </div>
        </section>
    `,
    styles: `
        section { background: var(--deep); color: #fff; }
        .lede { color: var(--on-dark-soft); }
        table { width: 100%; margin-top: 40px; border-collapse: collapse; font-size: 15.5px; }
        th, td { padding: 16px 12px; border-bottom: 1px solid rgb(255 255 255 / 0.14); text-align: start; }
        thead th { font-size: 14px; font-weight: 500; opacity: 0.75; }
        tbody th { font-weight: 600; }
        small { display: block; font-size: 13px; font-weight: 400; opacity: 0.7; }
        a { display: inline-block; padding: 7px 14px; border: 1px solid rgb(255 255 255 / 0.35); border-radius: 999px; text-decoration: none; white-space: nowrap; }
        a:hover { background: rgb(255 255 255 / 0.1); }
        .na { font-size: 14px; opacity: 0.55; }
        .notes { display: flex; flex-wrap: wrap; gap: 8px 24px; margin-top: 20px; font-size: 14px; opacity: 0.75; }
        @media (max-width: 760px) {
            thead { display: none; }
            tr { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 8px; padding: 18px 0; border-bottom: 1px solid rgb(255 255 255 / 0.14); }
            th, td { padding: 0; border: 0; }
            tbody th { grid-column: 1 / -1; }
            td::before { content: attr(data-label); display: block; margin-bottom: 4px; font-size: 12px; opacity: 0.65; }
        }
    `,
})
export class DownloadsComponent {
    readonly i18n = inject(I18nService);
    readonly apps = APPS;
    readonly platforms = PLATFORMS;
    readonly version = VERSION;
    readonly link = storeUrl;
}
