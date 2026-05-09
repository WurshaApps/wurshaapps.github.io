import { Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { PlaceholderComponent } from '../shared/placeholder.component';

@Component({
    selector: 'app-books',
    imports: [PlaceholderComponent],
    template: `
        @let b = i18n.t().books;
        <section id="books" class="books">
            <div class="container">
                <header class="section-header">
                    <h2>{{ b.title }}</h2>
                    <p>{{ b.subtitle }}</p>
                </header>

                <div class="books__layout">
                    <div class="books__visual">
                        <app-placeholder
                            slot="books-aya-panel"
                            kind="phone"
                            label="Aya panel — tafseer / qira’at / sciences / translations tabs" />
                    </div>

                    <div class="books__main">
                        <nav class="tabs" aria-label="book categories">
                            @for (cat of b.categories; track cat.key) {
                                <button
                                    type="button"
                                    class="tab"
                                    [class.tab--active]="active() === cat.key"
                                    (click)="active.set(cat.key)">
                                    <span class="tab__name">{{ cat.title }}</span>
                                    <span class="tab__count">{{ cat.count }}</span>
                                </button>
                            }
                        </nav>

                        @if (current(); as cat) {
                            <div class="tab-panel">
                                <div class="tab-panel__head">
                                    <h3>{{ cat.title }}</h3>
                                    <span class="tab-panel__count">{{ cat.count }}</span>
                                </div>
                                <ul class="samples">
                                    @for (item of cat.samples; track $index) {
                                        <li>{{ item }}</li>
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    `,
    styles: `
        .books {
            padding: 5rem 0;
            background: linear-gradient(180deg, #fbf3e2, #fdfaf3);
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
        .books__layout {
            display: grid;
            gap: 2rem;
            grid-template-columns: 1fr;
            align-items: start;
        }
        @media (min-width: 980px) {
            .books__layout {
                grid-template-columns: 1fr 1.6fr;
            }
        }
        .books__visual {
            max-width: 22rem;
            margin: 0 auto;
            width: 100%;
            position: sticky;
            top: 6rem;
        }
        .books__main {
            background: #fff;
            border: 1px solid rgba(15, 118, 110, 0.12);
            border-radius: 1.2rem;
            padding: 1.4rem;
        }
        .tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            border-bottom: 1px solid rgba(15, 118, 110, 0.1);
            padding-bottom: 1rem;
            margin-bottom: 1.4rem;
        }
        .tab {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(15, 118, 110, 0.05);
            border: 1px solid transparent;
            color: #134e4a;
            border-radius: 0.7rem;
            padding: 0.55rem 0.9rem;
            font-size: 0.9rem;
            cursor: pointer;
            font-family: inherit;
            transition:
                background-color 0.15s,
                border-color 0.15s,
                color 0.15s;
        }
        .tab:hover {
            background: rgba(15, 118, 110, 0.1);
        }
        .tab--active {
            background: #0f766e;
            color: #fff;
            border-color: #0f766e;
        }
        .tab__count {
            background: rgba(255, 255, 255, 0.18);
            color: inherit;
            padding: 0.1rem 0.45rem;
            border-radius: 999px;
            font-size: 0.72rem;
        }
        .tab:not(.tab--active) .tab__count {
            background: rgba(15, 118, 110, 0.12);
            color: #0f766e;
        }
        .tab-panel__head {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            margin-bottom: 1rem;
        }
        .tab-panel__head h3 {
            color: #0c2d2c;
            margin: 0;
            font-size: 1.2rem;
            font-weight: 700;
        }
        .tab-panel__count {
            color: #b45309;
            font-weight: 700;
            font-size: 0.95rem;
        }
        .samples {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.5rem;
        }
        @media (min-width: 600px) {
            .samples {
                grid-template-columns: 1fr 1fr;
            }
        }
        .samples li {
            position: relative;
            padding: 0.7rem 0.85rem;
            padding-inline-start: 2.1rem;
            background: rgba(15, 118, 110, 0.04);
            border: 1px solid rgba(15, 118, 110, 0.08);
            border-radius: 0.7rem;
            color: #36443f;
            font-size: 0.93rem;
            line-height: 1.4;
        }
        .samples li::before {
            content: "📖";
            position: absolute;
            inset-inline-start: 0.8rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.9rem;
            opacity: 0.7;
        }
    `,
})
export class BooksComponent {
    readonly i18n = inject(I18nService);
    readonly active = signal<string>('tafseer');

    readonly current = computed(() => {
        const list = this.i18n.t().books.categories;
        return list.find((c) => c.key === this.active()) ?? list[0];
    });
}
