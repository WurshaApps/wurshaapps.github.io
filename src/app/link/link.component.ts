import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-link',
    standalone: true,
    imports: [NgOptimizedImage, TooltipModule],
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
})
export class LinkComponent {
    image = input<string>('image');
    name = input<string>();
    description = input<string>();
    android = input<string>();
    ios = input<string>();
    mac = input<string>();
    windows = input<string>();
}
