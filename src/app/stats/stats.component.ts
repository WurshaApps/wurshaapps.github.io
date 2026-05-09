import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
    selector: 'app-stats',
    template: `
        @let s = i18n.t().stats;
        <section class="stats" aria-label="key numbers">
            <div class="container">
                <div class="stat">
                    <div class="stat__value">{{ s.editions }}</div>
                    <div class="stat__label">{{ s.editionsLabel }}</div>
                </div>
                <div class="stat">
                    <div class="stat__value">{{ s.reciters }}</div>
                    <div class="stat__label">{{ s.recitersLabel }}</div>
                </div>
                <div class="stat">
                    <div class="stat__value">{{ s.books }}</div>
                    <div class="stat__label">{{ s.booksLabel }}</div>
                </div>
                <div class="stat">
                    <div class="stat__value">{{ s.features }}</div>
                    <div class="stat__label">{{ s.featuresLabel }}</div>
                </div>
            </div>
        </section>
    `,
    styles: `
        .stats {
            background: linear-gradient(135deg, #064e3b 0%, #0f766e 60%, #134e4a 100%);
            color: #ecfdf5;
            padding: 2.4rem 0;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.25rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.4rem 1rem;
        }
        @media (min-width: 720px) {
            .container {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        .stat {
            text-align: center;
            position: relative;
        }
        .stat + .stat::before {
            content: "";
            position: absolute;
            inset-inline-start: 0;
            top: 15%;
            bottom: 15%;
            width: 1px;
            background: rgba(255, 255, 255, 0.12);
        }
        @media (max-width: 719px) {
            .stat:nth-child(odd) + .stat::before {
                display: none;
            }
        }
        .stat__value {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 700;
            color: #fcd34d;
            margin-bottom: 0.3rem;
        }
        .stat__label {
            font-size: 0.95rem;
            opacity: 0.85;
        }
    `,
})
export class StatsComponent {
    readonly i18n = inject(I18nService);
}
