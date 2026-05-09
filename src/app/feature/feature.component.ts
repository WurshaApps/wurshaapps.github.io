import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { PlaceholderComponent } from '../shared/placeholder.component';

@Component({
    selector: 'app-feature',
    imports: [PlaceholderComponent],
    templateUrl: './feature.component.html',
    styleUrl: './feature.component.scss',
})
export class FeatureComponent {
    readonly i18n = inject(I18nService);

    iconFor(id: string): string {
        const map: Record<string, string> = {
            reading: 'M4 4h16v16H4z|M4 8h16',
            navigation: 'M3 12l9-9 9 9-9 9z',
            tracks: 'M3 6h18M3 12h12M3 18h6',
            bookmarks: 'M6 3h12v18l-6-4-6 4z',
            audio: 'M4 10v4h3l5 5V5L7 10z|M16 8a5 5 0 0 1 0 8',
            search: 'M21 21l-5-5|M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z',
            sciences: 'M12 3v18M3 12h18',
            customization: 'M12 3l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 10l6-1z',
            tools: 'M14 6l4 4-9 9-4 1 1-4z',
            gestures: 'M8 12V5a2 2 0 0 1 4 0v8M8 12h-2a2 2 0 0 0-2 2v3l4 4h6a4 4 0 0 0 4-4v-2',
            editions: 'M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z',
        };
        return map[id] ?? 'M12 3l9 9-9 9-9-9z';
    }
}
