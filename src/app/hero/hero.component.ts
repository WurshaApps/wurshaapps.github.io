import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [ButtonModule, RippleModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
})
export class HeroComponent {}
