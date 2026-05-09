import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { PlaceholderComponent } from '../shared/placeholder.component';

interface KnownEditionThumb {
    code: string;
    image: string;
}

const KNOWN_THUMBS: KnownEditionThumb[] = [
    { code: 'Madina', image: 'madina.png' },
    { code: 'Shmrly', image: 'shmrly.png' },
    { code: 'Tjwid', image: 'tjwid.png' },
    { code: 'Warsh', image: 'warsh.png' },
    { code: 'Qalon', image: 'qalon.png' },
];

@Component({
    selector: 'app-editions',
    imports: [PlaceholderComponent],
    template: `
        @let e = i18n.t().editions;
        <section id="editions" class="editions">
            <div class="container">
                <header class="section-header">
                    <h2>{{ e.title }}</h2>
                    <p>{{ e.subtitle }}</p>
                </header>

                <div class="collections">
                    @for (col of e.collections; track $index) {
                        <article class="collection">
                            <h3>{{ col.name }}</h3>
                            <p>{{ col.description }}</p>
                            <div class="collection__items">
                                @for (item of col.items; track $index) {
                                    <span class="tag">{{ item }}</span>
                                }
                            </div>
                        </article>
                    }
                </div>

                <div class="editions__showcase">
                    <app-placeholder
                        slot="editions-comparison"
                        kind="background"
                        label="Comparison artwork — same verse across multiple Mushaf editions" />
                </div>

                <div class="editions__grid">
                    @for (item of e.list; track item.code) {
                        <article class="edition" [class.edition--default]="item.isDefault">
                            <div class="edition__thumb">
                                @if (thumbFor(item.code); as src) {
                                    <img [src]="src" [alt]="item.name" loading="lazy" />
                                } @else {
                                    <div class="edition__placeholder">
                                        <span>{{ item.code }}</span>
                                    </div>
                                }
                                @if (item.isDefault) {
                                    <span class="edition__badge">★</span>
                                }
                            </div>
                            <div class="edition__body">
                                <div class="edition__head">
                                    <h4>{{ item.name }}</h4>
                                    <code class="edition__code">{{ item.code }}</code>
                                </div>
                                <p>{{ item.note }}</p>
                            </div>
                        </article>
                    }
                </div>

                <p class="editions__note">{{ e.crossNote }}</p>
            </div>
        </section>
    `,
    styles: `
        .editions {
            padding: 5rem 0;
            background: linear-gradient(180deg, #fdfaf3, #fbf3e2);
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
        .collections {
            display: grid;
            gap: 1.2rem;
            grid-template-columns: 1fr;
            margin-bottom: 2.5rem;
        }
        @media (min-width: 720px) {
            .collections {
                grid-template-columns: 1fr 1fr;
            }
        }
        .collection {
            background: #fff;
            border: 1px solid rgba(15, 118, 110, 0.12);
            border-radius: 1.1rem;
            padding: 1.4rem 1.4rem;
        }
        .collection h3 {
            color: #0f766e;
            margin: 0 0 0.4rem;
            font-size: 1.2rem;
            font-weight: 700;
        }
        .collection p {
            color: #4b5852;
            margin: 0 0 0.9rem;
            line-height: 1.6;
        }
        .collection__items {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .tag {
            background: rgba(15, 118, 110, 0.1);
            color: #134e4a;
            font-size: 0.85rem;
            padding: 0.3rem 0.7rem;
            border-radius: 999px;
        }
        .editions__showcase {
            margin: 0 0 2.5rem;
        }
        .editions__grid {
            display: grid;
            gap: 0.9rem;
            grid-template-columns: 1fr;
        }
        @media (min-width: 580px) {
            .editions__grid {
                grid-template-columns: 1fr 1fr;
            }
        }
        @media (min-width: 980px) {
            .editions__grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        .edition {
            display: flex;
            gap: 0.9rem;
            background: #fff;
            border: 1px solid rgba(15, 118, 110, 0.12);
            border-radius: 1rem;
            padding: 0.85rem;
            transition:
                transform 0.18s,
                box-shadow 0.18s,
                border-color 0.18s;
        }
        .edition:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 32px -22px rgba(15, 118, 110, 0.35);
            border-color: rgba(15, 118, 110, 0.3);
        }
        .edition--default {
            border-color: rgba(217, 119, 6, 0.4);
            box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.12);
        }
        .edition__thumb {
            position: relative;
            flex: 0 0 4.5rem;
            height: 4.5rem;
            border-radius: 0.7rem;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(15, 118, 110, 0.08), rgba(217, 119, 6, 0.08));
        }
        .edition__thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .edition__placeholder {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0f766e;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.7rem;
            letter-spacing: 0.04em;
            text-align: center;
            padding: 0.4rem;
            border: 1.5px dashed rgba(15, 118, 110, 0.35);
            border-radius: 0.7rem;
        }
        .edition__badge {
            position: absolute;
            top: 0.3rem;
            inset-inline-end: 0.3rem;
            background: #d97706;
            color: #fff;
            border-radius: 999px;
            font-size: 0.7rem;
            line-height: 1;
            padding: 0.2rem 0.4rem;
        }
        .edition__body {
            flex: 1;
            min-width: 0;
        }
        .edition__head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.4rem;
            margin-bottom: 0.3rem;
        }
        .edition h4 {
            margin: 0;
            color: #0c2d2c;
            font-size: 1rem;
            font-weight: 700;
        }
        .edition__code {
            background: rgba(15, 118, 110, 0.08);
            color: #0f766e;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.7rem;
            padding: 0.15rem 0.4rem;
            border-radius: 0.4rem;
        }
        .edition p {
            color: #4b5852;
            font-size: 0.85rem;
            line-height: 1.55;
            margin: 0;
        }
        .editions__note {
            text-align: center;
            color: #4b5852;
            margin: 2rem auto 0;
            font-size: 0.95rem;
            max-width: 50rem;
        }
    `,
})
export class EditionsComponent {
    readonly i18n = inject(I18nService);

    thumbFor(code: string): string | null {
        return KNOWN_THUMBS.find((t) => t.code === code)?.image ?? null;
    }
}
