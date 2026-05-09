import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { PlaceholderComponent } from '../shared/placeholder.component';

@Component({
    selector: 'app-hero',
    imports: [PlaceholderComponent],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
})
export class HeroComponent {
    readonly i18n = inject(I18nService);
}
