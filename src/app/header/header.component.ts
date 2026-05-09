import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { LangPickerComponent } from '../i18n/lang-picker.component';

@Component({
    selector: 'app-header',
    imports: [LangPickerComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    readonly i18n = inject(I18nService);
}
