import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
import { DownloadsComponent } from '../sections/downloads.component';
import { EditionsComponent } from '../sections/editions.component';
import { FooterComponent } from '../sections/footer.component';
import { HeaderComponent } from '../sections/header.component';
import { HeroComponent } from '../sections/hero.component';
import { LibraryComponent } from '../sections/library.component';
import { StoryComponent } from '../sections/story.component';

/** The whole site: one page per language (specs/website-redesign.md §4). */
@Component({
    selector: 'app-home',
    imports: [
        RouterLink,
        HeaderComponent,
        HeroComponent,
        EditionsComponent,
        StoryComponent,
        LibraryComponent,
        DownloadsComponent,
        FooterComponent,
    ],
    template: `
        <a class="skip-link" [routerLink]="[]" fragment="editions">{{ i18n.t().editions.title }}</a>
        <app-header />
        <main>
            <app-hero />
            <app-editions />
            <app-story />
            <app-library />
            <app-downloads />
        </main>
        <app-footer />
    `,
})
export class HomeComponent {
    readonly i18n = inject(I18nService);
}
