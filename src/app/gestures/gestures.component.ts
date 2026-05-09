import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { PlaceholderComponent } from '../shared/placeholder.component';

@Component({
    selector: 'app-gestures',
    imports: [PlaceholderComponent],
    template: `
        @let g = i18n.t().gestures;
        <section id="gestures" class="gestures">
            <div class="container">
                <header class="section-header">
                    <h2>{{ g.title }}</h2>
                    <p>{{ g.subtitle }}</p>
                </header>

                <div class="layout">
                    <div class="layout__visual">
                        <app-placeholder
                            slot="gestures-demo"
                            kind="phone"
                            label="Animated gesture demo (swipe / pinch / long-press)" />
                    </div>

                    <ul class="grid">
                        @for (item of g.items; track $index) {
                            <li class="g-card">
                                <div class="g-card__icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                                        <path [attr.d]="iconForIndex($index)" />
                                    </svg>
                                </div>
                                <div>
                                    <div class="g-card__gesture">{{ item.gesture }}</div>
                                    <div class="g-card__action">{{ item.action }}</div>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </section>
    `,
    styles: `
        .gestures {
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
        .layout {
            display: grid;
            gap: 2.5rem;
            grid-template-columns: 1fr;
            align-items: center;
        }
        @media (min-width: 980px) {
            .layout {
                grid-template-columns: 1fr 1.6fr;
            }
        }
        .layout__visual {
            max-width: 22rem;
            margin: 0 auto;
            width: 100%;
        }
        .grid {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.8rem;
            grid-template-columns: 1fr;
        }
        @media (min-width: 600px) {
            .grid {
                grid-template-columns: 1fr 1fr;
            }
        }
        @media (min-width: 1140px) {
            .grid {
                grid-template-columns: 1fr 1fr 1fr;
            }
        }
        .g-card {
            display: flex;
            gap: 0.85rem;
            background: #fff;
            border: 1px solid rgba(15, 118, 110, 0.12);
            border-radius: 1rem;
            padding: 1rem 1.1rem;
            transition:
                transform 0.18s,
                box-shadow 0.18s,
                border-color 0.18s;
        }
        .g-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 32px -22px rgba(15, 118, 110, 0.35);
            border-color: rgba(15, 118, 110, 0.3);
        }
        .g-card__icon {
            flex: 0 0 2.2rem;
            height: 2.2rem;
            border-radius: 0.6rem;
            background: linear-gradient(135deg, rgba(15, 118, 110, 0.14), rgba(217, 119, 6, 0.12));
            color: #0f766e;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .g-card__icon svg {
            width: 1.2rem;
            height: 1.2rem;
        }
        .g-card__gesture {
            font-weight: 600;
            color: #0c2d2c;
            font-size: 0.92rem;
            line-height: 1.3;
        }
        .g-card__action {
            color: #4b5852;
            font-size: 0.82rem;
            margin-top: 0.15rem;
        }
    `,
})
export class GesturesComponent {
    readonly i18n = inject(I18nService);

    private icons = [
        'M5 12h14M12 5l7 7-7 7',
        'M12 3v18M5 8l-2 4 2 4M19 8l2 4-2 4',
        'M8 12V5a2 2 0 0 1 4 0v7M8 12h-2a2 2 0 0 0-2 2v3l4 4h6a4 4 0 0 0 4-4v-2',
        'M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
        'M9 5l-3 3v9l3 3M15 5l3 3v9l-3 3',
        'M8 8h8v8H8z',
        'M3 12h7M14 12h7M12 5v3M12 16v3',
        'M12 5v14M5 12h14',
        'M3 6h18M3 12h12M3 18h6',
    ];

    iconForIndex(i: number): string {
        return this.icons[i] ?? this.icons[0];
    }
}
