import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
    selector: 'app-audiences',
    template: `
        @let a = i18n.t().audiences;
        <section id="audiences" class="audiences">
            <div class="container">
                <header class="section-header">
                    <h2>{{ a.title }}</h2>
                    <p>{{ a.subtitle }}</p>
                </header>
                <div class="grid">
                    @for (item of a.items; track $index) {
                        <article class="card">
                            <div class="card__icon" aria-hidden="true">
                                @switch ($index) {
                                    @case (0) {
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                                            <path d="M4 5a2 2 0 0 1 2-2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z" />
                                            <path d="M13 3v5h5" /><path d="M8 13h8M8 17h6" />
                                        </svg>
                                    }
                                    @case (1) {
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                                            <path d="M12 3v18" /><path d="M5 8c3 0 5 1.5 7 3 2-1.5 4-3 7-3v10c-3 0-5 1.5-7 3-2-1.5-4-3-7-3V8z" />
                                        </svg>
                                    }
                                    @case (2) {
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                                            <path d="M3 6l9-3 9 3-9 3-9-3z" /><path d="M3 6v8c0 2 4 4 9 4s9-2 9-4V6" /><path d="M21 9v5" />
                                        </svg>
                                    }
                                    @default {
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                                            <circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                                        </svg>
                                    }
                                }
                            </div>
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.body }}</p>
                        </article>
                    }
                </div>
            </div>
        </section>
    `,
    styles: `
        .audiences {
            padding: 5rem 0;
            background: #fdfaf3;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.25rem;
        }
        .section-header {
            text-align: center;
            max-width: 44rem;
            margin: 0 auto 3rem;
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
        .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.2rem;
        }
        @media (min-width: 720px) {
            .grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (min-width: 1040px) {
            .grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        .card {
            background: #fff;
            border: 1px solid rgba(15, 118, 110, 0.1);
            border-radius: 1.2rem;
            padding: 1.8rem 1.4rem;
            transition:
                transform 0.18s,
                box-shadow 0.18s,
                border-color 0.18s;
        }
        .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 24px 40px -28px rgba(15, 118, 110, 0.4);
            border-color: rgba(15, 118, 110, 0.3);
        }
        .card__icon {
            width: 3rem;
            height: 3rem;
            border-radius: 0.85rem;
            background: linear-gradient(135deg, rgba(15, 118, 110, 0.12), rgba(217, 119, 6, 0.14));
            color: #0f766e;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
        }
        .card__icon svg {
            width: 1.5rem;
            height: 1.5rem;
        }
        .card h3 {
            font-size: 1.15rem;
            color: #0c2d2c;
            margin: 0 0 0.5rem;
            font-weight: 700;
        }
        .card p {
            color: #4b5852;
            line-height: 1.7;
            margin: 0;
            font-size: 0.95rem;
        }
    `,
})
export class AudiencesComponent {
    readonly i18n = inject(I18nService);
}
