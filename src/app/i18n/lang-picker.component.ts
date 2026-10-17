import { Component, ElementRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from './i18n.service';
import type { Lang } from './locales';

/** Disclosure menu of links to every language page; a choice is remembered for visits to `/`. */
@Component({
    selector: 'app-lang-picker',
    imports: [RouterLink],
    host: {
        '(document:click)': 'onDocClick($event)',
        '(document:keydown.escape)': 'close(true)',
    },
    template: `
        <button
            type="button"
            class="trigger"
            aria-controls="lang-menu"
            [attr.aria-expanded]="open()"
            [attr.aria-label]="i18n.t().nav.language + ': ' + i18n.currentLocale().name"
            (click)="open.set(!open())">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" stroke-width="1.5" />
            </svg>
            <span>{{ i18n.currentLocale().name }}</span>
        </button>
        @if (open()) {
            <ul id="lang-menu" class="menu">
                @for (loc of i18n.locales; track loc.code) {
                    <li>
                        <a
                            [routerLink]="i18n.pageLink(loc.code)"
                            [attr.hreflang]="loc.code"
                            [attr.aria-current]="loc.code === i18n.lang() ? 'page' : null"
                            (click)="choose(loc.code)">
                            <span [attr.lang]="loc.code" [attr.dir]="loc.dir">{{ loc.name }}</span>
                            <small>{{ loc.english }}</small>
                        </a>
                    </li>
                }
            </ul>
        }
    `,
    styles: `
        :host { position: relative; display: inline-flex; }
        .trigger {
            display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px;
            border: 1px solid rgb(255 255 255 / 0.35); border-radius: 999px;
            background: none; color: inherit; font: inherit; font-size: 14px; cursor: pointer;
        }
        .trigger:hover { background: rgb(255 255 255 / 0.08); }
        .menu {
            position: absolute; top: calc(100% + 8px); inset-inline-end: 0; z-index: 30;
            min-width: 230px; max-height: min(70vh, 460px); overflow-y: auto;
            margin: 0; padding: 6px; list-style: none;
            background: #fff; color: var(--ink); border-radius: 14px;
            box-shadow: 0 18px 50px rgb(6 54 64 / 0.28);
        }
        a {
            display: flex; justify-content: space-between; align-items: baseline; gap: 12px;
            padding: 9px 12px; border-radius: 9px; text-decoration: none; font-size: 15px;
        }
        a:hover { background: var(--mist); }
        a[aria-current='page'] { background: var(--mist); color: var(--teal); font-weight: 600; }
        small { color: var(--ink-soft); font-size: 12px; }
    `,
})
export class LangPickerComponent {
    readonly i18n = inject(I18nService);
    private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
    readonly open = signal(false);

    choose(lang: Lang) {
        this.i18n.remember(lang);
        this.open.set(false);
    }

    close(refocus = false) {
        if (!this.open()) return;
        this.open.set(false);
        if (refocus) this.host.nativeElement.querySelector<HTMLElement>('.trigger')?.focus();
    }

    onDocClick(event: MouseEvent) {
        if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.close();
    }
}
