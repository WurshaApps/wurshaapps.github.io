import { Component, inject, input } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
})
export class LinkComponent {
    readonly i18n = inject(I18nService);

    readonly image = input<string>('');
    readonly name = input<string>();
    readonly nameColor = input<string>('#0c2d2c');
    readonly description = input<string>();
    readonly android = input<string>();
    readonly ios = input<string>();
    readonly mac = input<string>();
    readonly windows = input<string>();
}
