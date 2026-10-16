import { LocationStrategy, TrailingSlashPathLocationStrategy, ViewportScroller } from '@angular/common';
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
        // Language pages live at `/<lang>/` (GitHub Pages serves <lang>/index.html); keep the slash.
        { provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy },
        provideClientHydration(withEventReplay()),
        // Anchor jumps land below the sticky header.
        provideAppInitializer(() => inject(ViewportScroller).setOffset([0, 64])),
    ],
};
