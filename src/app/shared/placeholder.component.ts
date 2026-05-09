import { Component, inject, input } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

/**
 * Reusable image/screenshot placeholder.
 * Search the codebase for `app-placeholder` to find every spot where a real
 * asset should be dropped in. The slot name + `kind` make the intent explicit.
 */
@Component({
    selector: 'app-placeholder',
    template: `
        <div
            class="placeholder"
            [class.placeholder--phone]="kind() === 'phone'"
            [class.placeholder--wide]="kind() === 'wide'"
            [class.placeholder--square]="kind() === 'square'"
            [class.placeholder--background]="kind() === 'background'"
            [attr.data-slot]="slot()"
            [attr.data-kind]="kind()"
            role="img"
            [attr.aria-label]="label() || i18n.t().common.placeholder">
            <div class="placeholder__inner">
                <svg class="placeholder__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z"
                        stroke="currentColor"
                        stroke-width="1.5" />
                    <path d="M4 17l4-4 3 3 4-5 5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                </svg>
                <div class="placeholder__slot">{{ slot() }}</div>
                @if (label()) {
                    <div class="placeholder__label">{{ label() }}</div>
                }
                <div class="placeholder__hint">{{ i18n.t().common.placeholder }}</div>
            </div>
        </div>
    `,
    styles: `
        :host {
            display: block;
        }
        .placeholder {
            position: relative;
            width: 100%;
            border: 2px dashed rgba(15, 118, 110, 0.35);
            border-radius: 1.25rem;
            background:
                repeating-linear-gradient(
                    45deg,
                    rgba(15, 118, 110, 0.04) 0 12px,
                    rgba(15, 118, 110, 0.08) 12px 24px
                ),
                linear-gradient(135deg, rgba(15, 118, 110, 0.06), rgba(217, 119, 6, 0.06));
            color: #0f766e;
            overflow: hidden;
            transition: border-color 0.2s ease;
        }
        .placeholder:hover {
            border-color: rgba(15, 118, 110, 0.6);
        }
        .placeholder--phone {
            aspect-ratio: 9 / 19;
            border-radius: 2.25rem;
        }
        .placeholder--wide {
            aspect-ratio: 16 / 10;
        }
        .placeholder--square {
            aspect-ratio: 1 / 1;
        }
        .placeholder--background {
            aspect-ratio: 21 / 9;
            border-radius: 1.5rem;
        }
        .placeholder__inner {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            padding: 1rem;
            text-align: center;
        }
        .placeholder__icon {
            width: 2.4rem;
            height: 2.4rem;
            opacity: 0.55;
        }
        .placeholder__slot {
            font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 0.72rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            opacity: 0.7;
        }
        .placeholder__label {
            font-weight: 600;
            font-size: 0.95rem;
            max-width: 28ch;
        }
        .placeholder__hint {
            font-size: 0.75rem;
            opacity: 0.55;
        }
    `,
})
export class PlaceholderComponent {
    readonly i18n = inject(I18nService);

    /** Short identifier visible on the placeholder for easy locating. */
    readonly slot = input.required<string>();
    /** Human-readable description of what the asset should depict. */
    readonly label = input<string>('');
    /** Aspect ratio preset. */
    readonly kind = input<'phone' | 'wide' | 'square' | 'background'>('wide');
}
