import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { PlaceholderComponent } from '../shared/placeholder.component';

@Component({
    selector: 'app-tech',
    imports: [PlaceholderComponent],
    template: `
        @let t = i18n.t().tech;
        <section class="tech">
            <div class="container">
                <div class="copy">
                    <h2>{{ t.title }}</h2>
                    <p>{{ t.subtitle }}</p>
                    <ul>
                        @for (b of t.bullets; track $index) {
                            <li>
                                <span class="check" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12l4 4 10-10" />
                                    </svg>
                                </span>
                                {{ b }}
                            </li>
                        }
                    </ul>
                </div>
                <div class="visual">
                    <app-placeholder
                        slot="tech-platforms"
                        kind="square"
                        label="Cross-platform mockup — phone, tablet, desktop, and web all running the app" />
                </div>
            </div>
        </section>
    `,
    styles: `
        .tech {
            padding: 5rem 0;
            background: #fdfaf3;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.25rem;
            display: grid;
            gap: 3rem;
            grid-template-columns: 1fr;
            align-items: center;
        }
        @media (min-width: 980px) {
            .container {
                grid-template-columns: 1.4fr 1fr;
            }
        }
        .copy h2 {
            font-size: clamp(1.8rem, 3.6vw, 2.6rem);
            color: #0c2d2c;
            margin: 0 0 0.8rem;
            font-weight: 700;
        }
        .copy p {
            color: #4b5852;
            line-height: 1.7;
            font-size: 1.05rem;
            margin: 0 0 1.8rem;
        }
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        li {
            display: flex;
            align-items: flex-start;
            gap: 0.7rem;
            color: #36443f;
            font-size: 1rem;
            line-height: 1.6;
        }
        .check {
            flex: 0 0 1.6rem;
            height: 1.6rem;
            margin-top: 0.1rem;
            border-radius: 50%;
            background: rgba(15, 118, 110, 0.14);
            color: #0f766e;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .check svg {
            width: 0.95rem;
            height: 0.95rem;
        }
        .visual {
            max-width: 28rem;
            margin: 0 auto;
            width: 100%;
        }
    `,
})
export class TechComponent {
    readonly i18n = inject(I18nService);
}
