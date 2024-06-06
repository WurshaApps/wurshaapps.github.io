import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-link',
    standalone: true,
    imports: [NgOptimizedImage, TooltipModule],
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
    host: {
        class: 'border-round-xl shadow-6',
    },
})
export class LinkComponent {
    image = input<string>('image');
    name = input<string>();
    nameColor = input<string>('#000000');
    description = input<string>();
    android = input<string>();
    ios = input<string>();
    mac = input<string>();
    windows = input<string>();
}
