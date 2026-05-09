import {
    Component,
    ElementRef,
    HostListener,
    afterNextRender,
    computed,
    inject,
    signal,
    viewChild,
} from '@angular/core';
import { I18nService } from './i18n.service';
import type { Lang } from './locales';

@Component({
    selector: 'app-lang-picker',
    template: `
        <div class="picker" [class.picker--open]="open()">
            <button
                #trigger
                type="button"
                class="picker__trigger"
                [attr.aria-haspopup]="'listbox'"
                [attr.aria-expanded]="open()"
                (click)="toggle()"
                [attr.aria-label]="ariaLabel()">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" stroke-width="1.5" />
                </svg>
                <span class="picker__current">{{ i18n.currentLocale().name }}</span>
                <svg class="picker__chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            @if (open()) {
                <ul
                    #popup
                    class="picker__popup"
                    role="listbox"
                    [attr.aria-label]="ariaLabel()"
                    (keydown)="onListKeydown($event)">
                    @for (loc of i18n.locales; track loc.code; let i = $index) {
                        <li
                            class="picker__item"
                            role="option"
                            [attr.aria-selected]="loc.code === i18n.lang()"
                            [attr.tabindex]="loc.code === i18n.lang() ? 0 : -1"
                            [attr.dir]="loc.dir"
                            [attr.data-index]="i"
                            (click)="select(loc.code)"
                            (keydown.enter)="select(loc.code)"
                            (keydown.space)="select(loc.code); $event.preventDefault()">
                            <span class="picker__name">{{ loc.name }}</span>
                            <span class="picker__english">{{ loc.english }}</span>
                            @if (loc.code === i18n.lang()) {
                                <svg class="picker__check" viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                                    <path d="M5 12l4 4 10-10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            }
                        </li>
                    }
                </ul>
            }
        </div>
    `,
    styles: `
        :host {
            display: inline-flex;
            position: relative;
        }

        .picker {
            position: relative;
        }

        .picker__trigger {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(15, 118, 110, 0.08);
            color: #134e4a;
            border: 1px solid rgba(15, 118, 110, 0.15);
            border-radius: 0.7rem;
            padding: 0.45rem 0.85rem;
            font-size: 0.9rem;
            font-family: inherit;
            cursor: pointer;
            transition:
                background-color 0.15s,
                border-color 0.15s;
        }

        .picker__trigger:hover {
            background: rgba(15, 118, 110, 0.14);
            border-color: rgba(15, 118, 110, 0.3);
        }

        .picker__trigger:focus-visible {
            outline: 2px solid #0f766e;
            outline-offset: 2px;
        }

        .picker__current {
            font-weight: 600;
            min-width: 2.5rem;
            white-space: nowrap;
        }

        .picker__chevron {
            opacity: 0.7;
            transition: transform 0.18s;
        }

        .picker--open .picker__chevron {
            transform: rotate(180deg);
        }

        .picker__popup {
            position: absolute;
            top: calc(100% + 0.5rem);
            inset-inline-end: 0;
            min-width: 14rem;
            max-height: 22rem;
            overflow-y: auto;
            background: #fff;
            border: 1px solid rgba(15, 118, 110, 0.18);
            border-radius: 0.85rem;
            box-shadow:
                0 24px 48px -20px rgba(15, 118, 110, 0.35),
                0 4px 12px -6px rgba(0, 0, 0, 0.1);
            list-style: none;
            margin: 0;
            padding: 0.4rem;
            z-index: 100;
            animation: lp-fade-in 0.15s ease-out;
        }

        @keyframes lp-fade-in {
            from {
                opacity: 0;
                transform: translateY(-4px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .picker__item {
            display: grid;
            grid-template-columns: 1fr auto auto;
            align-items: center;
            gap: 0.6rem;
            padding: 0.55rem 0.7rem;
            border-radius: 0.55rem;
            cursor: pointer;
            color: #1f2937;
            font-size: 0.92rem;
            transition: background-color 0.12s;
            user-select: none;
        }

        .picker__item:hover {
            background: rgba(15, 118, 110, 0.08);
        }

        .picker__item:focus-visible {
            outline: 2px solid #0f766e;
            outline-offset: -2px;
            background: rgba(15, 118, 110, 0.06);
        }

        .picker__item[aria-selected="true"] {
            background: rgba(15, 118, 110, 0.1);
            color: #0f766e;
            font-weight: 600;
        }

        .picker__name {
            font-weight: inherit;
        }

        .picker__english {
            color: #6b7280;
            font-size: 0.78rem;
        }

        .picker__item[aria-selected="true"] .picker__english {
            color: #0f766e;
            opacity: 0.7;
        }

        .picker__check {
            color: #0f766e;
        }
    `,
})
export class LangPickerComponent {
    readonly i18n = inject(I18nService);
    private readonly host = inject(ElementRef<HTMLElement>);
    readonly open = signal(false);

    private readonly popup = viewChild<ElementRef<HTMLUListElement>>('popup');

    readonly ariaLabel = computed(() => this.i18n.t().nav.switchLang);

    constructor() {
        afterNextRender(() => {});
    }

    toggle() {
        this.open.update((v) => !v);
        if (this.open()) {
            queueMicrotask(() => {
                const el = this.popup()?.nativeElement;
                el?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus();
            });
        }
    }

    select(code: Lang) {
        this.i18n.setLang(code);
        this.open.set(false);
    }

    onListKeydown(event: KeyboardEvent) {
        const list = this.popup()?.nativeElement;
        if (!list) return;
        const items = Array.from(list.querySelectorAll<HTMLElement>('.picker__item'));
        const active = document.activeElement as HTMLElement | null;
        const idx = active ? items.indexOf(active) : -1;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                items[(idx + 1 + items.length) % items.length]?.focus();
                break;
            case 'ArrowUp':
                event.preventDefault();
                items[(idx - 1 + items.length) % items.length]?.focus();
                break;
            case 'Home':
                event.preventDefault();
                items[0]?.focus();
                break;
            case 'End':
                event.preventDefault();
                items[items.length - 1]?.focus();
                break;
            case 'Escape':
                event.preventDefault();
                this.open.set(false);
                break;
        }
    }

    @HostListener('document:click', ['$event'])
    onDocClick(event: MouseEvent) {
        if (!this.open()) return;
        const target = event.target as Node | null;
        if (target && !this.host.nativeElement.contains(target)) {
            this.open.set(false);
        }
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        this.open.set(false);
    }
}
