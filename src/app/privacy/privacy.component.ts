import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { FooterComponent } from '../sections/footer.component';
import { HeaderComponent } from '../sections/header.component';

interface TextPart {
    text: string;
    href?: string;
}

// URLs and email addresses in the policy text become links (content stays plain JSON).
const LINKABLE = /(https?:\/\/[^\s،,)]+[^\s،,.)]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

/** The privacy policy, `/<lang>/privacy/`: the address the app stores link to (via `/privacy`). */
@Component({
    selector: 'app-privacy',
    imports: [HeaderComponent, FooterComponent],
    template: `
        @let p = i18n.t().privacy;
        <app-header />
        <main class="wrap privacy">
            <h1>{{ p.title }}</h1>
            <p class="updated">{{ p.updated }}</p>
            <p class="intro">{{ p.intro }}</p>
            @for (section of p.sections; track $index) {
                <section>
                    <h2>{{ section.title }}</h2>
                    @for (paragraph of section.paragraphs; track $index) {
                        <p>
                            @for (part of parts(paragraph); track $index) {
                                @if (part.href) {
                                    <a [href]="part.href" dir="ltr">{{ part.text }}</a>
                                } @else {
                                    {{ part.text }}
                                }
                            }
                        </p>
                    }
                    @if (section.items.length) {
                        <ul>
                            @for (item of section.items; track $index) {
                                <li>
                                    @for (part of parts(item); track $index) {
                                        @if (part.href) {
                                            <a [href]="part.href" dir="ltr">{{ part.text }}</a>
                                        } @else {
                                            {{ part.text }}
                                        }
                                    }
                                </li>
                            }
                        </ul>
                    }
                </section>
            }
        </main>
        <app-footer />
    `,
    styles: `
        .privacy { max-width: 780px; padding-block: 56px 72px; }
        h1 { margin-bottom: 8px; }
        .updated { margin-bottom: 28px; color: var(--ink-soft); font-size: 14.5px; }
        .intro { margin-bottom: 8px; font-size: 18px; }
        section { margin-top: 36px; }
        h2 { margin-bottom: 12px; font-size: 22px; }
        p { margin: 0 0 12px; }
        ul { display: grid; gap: 8px; margin: 0 0 12px; padding-inline-start: 22px; }
        a { color: var(--teal); overflow-wrap: anywhere; }
    `,
})
export class PrivacyComponent {
    readonly i18n = inject(I18nService);

    /** `split` with a capturing group alternates text and matches: odd positions are links. */
    parts(text: string): TextPart[] {
        return text
            .split(LINKABLE)
            .map((part, index) =>
                index % 2 ? { text: part, href: part.startsWith('http') ? part : `mailto:${part}` } : { text: part },
            )
            .filter((part) => part.text !== '');
    }
}
