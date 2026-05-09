import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    readonly i18n = inject(I18nService);
}
