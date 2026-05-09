import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { StatsComponent } from './stats/stats.component';
import { AudiencesComponent } from './audiences/audiences.component';
import { FeatureComponent } from './feature/feature.component';
import { EditionsComponent } from './editions/editions.component';
import { RecitersComponent } from './reciters/reciters.component';
import { BooksComponent } from './books/books.component';
import { SciencesComponent } from './sciences/sciences.component';
import { GesturesComponent } from './gestures/gestures.component';
import { TechComponent } from './tech/tech.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { FooterComponent } from './footer/footer.component';
import { I18nService } from './i18n/i18n.service';

@Component({
    selector: 'app-root',
    imports: [
        HeaderComponent,
        HeroComponent,
        StatsComponent,
        AudiencesComponent,
        FeatureComponent,
        EditionsComponent,
        RecitersComponent,
        BooksComponent,
        SciencesComponent,
        GesturesComponent,
        TechComponent,
        DownloadsComponent,
        FooterComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    readonly i18n = inject(I18nService);
}
