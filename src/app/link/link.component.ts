import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-link',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
    host: {
        class: 'rounded-xl shadow-2xl',
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
