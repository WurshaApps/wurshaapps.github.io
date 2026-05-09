import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { PlaceholderComponent } from '../shared/placeholder.component';

@Component({
    selector: 'app-reciters',
    imports: [PlaceholderComponent],
    template: `
        @let r = i18n.t().reciters;
        <section id="reciters" class="reciters">
            <div class="container">
                <header class="section-header">
                    <h2>{{ r.title }}</h2>
                    <p>{{ r.subtitle }}</p>
                </header>

                <div class="reciters__layout">
                    <div class="reciters__visual">
                        <app-placeholder
                            slot="reciters-player"
                            kind="phone"
                            label="Audio player screen — currently playing reciter & verse" />
                    </div>

                    <div class="reciters__panels">
                        <article class="panel">
                            <h3>{{ r.featuredTitle }}</h3>
                            <ul class="featured">
                                @for (rec of r.featured; track $index) {
                                    <li class="featured__row">
                                        <div class="featured__avatar" aria-hidden="true">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                                <circle cx="12" cy="8" r="4" />
                                                <path d="M3 21c1.5-4 5-6 9-6s7.5 2 9 6" />
                                            </svg>
                                        </div>
                                        <div class="featured__meta">
                                            <div class="featured__name">{{ rec.name }}</div>
                                            <div class="featured__sub">{{ rec.riwaya }} · {{ rec.version }}</div>
                                        </div>
                                    </li>
                                }
                            </ul>
                            <p class="panel__note">{{ r.downloadNote }}</p>
                        </article>

                        <article class="panel">
                            <h3>{{ r.riwayatTitle }}</h3>
                            <div class="riwayat">
                                @for (riwaya of r.riwayat; track $index) {
                                    <span class="riwaya">
                                        <span>{{ riwaya.name }}</span>
                                        @if (riwaya.sub) {
                                            <em>{{ riwaya.sub }}</em>
                                        }
                                    </span>
                                }
                            </div>
                        </article>

                        <article class="panel">
                            <h3>{{ r.sourcesTitle }}</h3>
                            <ul class="sources">
                                @for (src of r.sources; track $index) {
                                    <li>
                                        <code>{{ src.name }}</code>
                                        <span>{{ src.sub }}</span>
                                    </li>
                                }
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    `,
    styles: `
        .reciters {
            padding: 5rem 0;
            background: #fffaf0;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.25rem;
        }
        .section-header {
            text-align: center;
            max-width: 46rem;
            margin: 0 auto 2.5rem;
        }
        .section-header h2 {
            font-size: clamp(1.8rem, 3.6vw, 2.6rem);
            color: #0c2d2c;
            margin: 0 0 0.7rem;
            font-weight: 700;
        }
        .section-header p {
            color: #4b5852;
            font-size: 1.05rem;
            line-height: 1.7;
            margin: 0;
        }
        .reciters__layout {
            display: grid;
            gap: 2rem;
            grid-template-columns: 1fr;
            align-items: start;
        }
        @media (min-width: 980px) {
            .reciters__layout {
                grid-template-columns: 1fr 1.6fr;
            }
        }
        .reciters__visual {
            position: sticky;
            top: 6rem;
            max-width: 22rem;
            margin: 0 auto;
            width: 100%;
        }
        .reciters__panels {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
        }
        .panel {
            background: #fff;
            border: 1px solid rgba(15, 118, 110, 0.12);
            border-radius: 1.1rem;
            padding: 1.4rem 1.4rem;
        }
        .panel h3 {
            color: #0f766e;
            margin: 0 0 1rem;
            font-size: 1.1rem;
            font-weight: 700;
        }
        .panel__note {
            color: #4b5852;
            font-size: 0.85rem;
            margin: 1rem 0 0;
            padding-top: 1rem;
            border-top: 1px dashed rgba(15, 118, 110, 0.15);
        }
        .featured {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.7rem;
            grid-template-columns: 1fr;
        }
        @media (min-width: 600px) {
            .featured {
                grid-template-columns: 1fr 1fr;
            }
        }
        .featured__row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem;
            border-radius: 0.7rem;
            transition: background-color 0.15s;
        }
        .featured__row:hover {
            background: rgba(15, 118, 110, 0.05);
        }
        .featured__avatar {
            flex: 0 0 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(15, 118, 110, 0.18), rgba(217, 119, 6, 0.16));
            color: #0f766e;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .featured__avatar svg {
            width: 1.2rem;
            height: 1.2rem;
        }
        .featured__meta {
            min-width: 0;
        }
        .featured__name {
            font-weight: 600;
            color: #0c2d2c;
            font-size: 0.95rem;
            line-height: 1.3;
        }
        .featured__sub {
            color: #4b5852;
            font-size: 0.78rem;
            margin-top: 0.1rem;
        }
        .riwayat {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .riwaya {
            display: inline-flex;
            flex-direction: column;
            background: rgba(15, 118, 110, 0.07);
            border: 1px solid rgba(15, 118, 110, 0.12);
            color: #134e4a;
            padding: 0.45rem 0.8rem;
            border-radius: 0.7rem;
            font-size: 0.88rem;
        }
        .riwaya em {
            display: block;
            font-style: normal;
            font-size: 0.7rem;
            color: #0f766e;
            margin-top: 0.15rem;
        }
        .sources {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
        }
        .sources li {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            align-items: baseline;
            color: #4b5852;
            font-size: 0.9rem;
        }
        .sources code {
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            background: rgba(15, 118, 110, 0.08);
            color: #0f766e;
            padding: 0.15rem 0.45rem;
            border-radius: 0.4rem;
            font-size: 0.8rem;
        }
    `,
})
export class RecitersComponent {
    readonly i18n = inject(I18nService);
}
