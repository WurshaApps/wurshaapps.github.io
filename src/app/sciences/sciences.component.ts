import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { PlaceholderComponent } from '../shared/placeholder.component';

@Component({
    selector: 'app-sciences',
    imports: [PlaceholderComponent],
    template: `
        @let s = i18n.t().sciences;
        <section id="sciences" class="sciences">
            <div class="container">
                <header class="section-header">
                    <h2>{{ s.title }}</h2>
                    <p>{{ s.subtitle }}</p>
                </header>

                <div class="layout">
                    <div class="layout__visual">
                        <app-placeholder
                            slot="sciences-word-page"
                            kind="phone"
                            label="Word page — meaning / sarf / i’rab / qira’at / translations" />
                    </div>
                    <ul class="tabs">
                        @for (item of s.items; track $index) {
                            <li class="tab-item">
                                <span class="tab-item__num">{{ $index + 1 }}</span>
                                <div>
                                    <h3>{{ item.title }}</h3>
                                    <p>{{ item.body }}</p>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </section>
    `,
    styles: `
        .sciences {
            padding: 5rem 0;
            background: #064e3b;
            color: #ecfdf5;
            position: relative;
            overflow: hidden;
        }
        .sciences::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
                radial-gradient(60% 50% at 100% 0%, rgba(217, 119, 6, 0.18), transparent 70%),
                radial-gradient(40% 40% at 0% 100%, rgba(252, 211, 77, 0.12), transparent 70%);
            pointer-events: none;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.25rem;
            position: relative;
        }
        .section-header {
            text-align: center;
            max-width: 46rem;
            margin: 0 auto 3rem;
        }
        .section-header h2 {
            font-size: clamp(1.8rem, 3.6vw, 2.6rem);
            color: #fcd34d;
            margin: 0 0 0.7rem;
            font-weight: 700;
        }
        .section-header p {
            color: rgba(236, 253, 245, 0.85);
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
        @media (min-width: 880px) {
            .layout {
                grid-template-columns: 1fr 1.4fr;
            }
        }
        .layout__visual {
            max-width: 22rem;
            margin: 0 auto;
            width: 100%;
        }
        .tabs {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .tab-item {
            display: flex;
            gap: 1rem;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(252, 211, 77, 0.12);
            border-radius: 1rem;
            padding: 1.1rem 1.2rem;
            transition:
                background-color 0.15s,
                border-color 0.15s;
        }
        .tab-item:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(252, 211, 77, 0.3);
        }
        .tab-item__num {
            flex: 0 0 2.4rem;
            height: 2.4rem;
            border-radius: 0.7rem;
            background: linear-gradient(135deg, #d97706, #fbbf24);
            color: #064e3b;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .tab-item h3 {
            margin: 0 0 0.3rem;
            color: #fcd34d;
            font-size: 1.1rem;
            font-weight: 700;
        }
        .tab-item p {
            margin: 0;
            color: rgba(236, 253, 245, 0.85);
            font-size: 0.95rem;
            line-height: 1.65;
        }
    `,
})
export class SciencesComponent {
    readonly i18n = inject(I18nService);
}
