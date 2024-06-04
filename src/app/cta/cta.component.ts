import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-cta',
    standalone: true,
    imports: [ButtonModule, RippleModule],
    template: `
        <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
            <div class="text-700 text-center">
                <div class="text-blue-600 font-bold mb-3">
                    <i class="pi pi-discord"></i>&nbsp;POWERED BY DISCORD
                </div>
                <div class="text-900 font-bold text-5xl mb-3">
                    Join Our Design Community
                </div>
                <div class="text-700 text-2xl mb-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Velit numquam eligendi quos.
                </div>
                <p-button
                    pRipple
                    [raised]="true"
                    [rounded]="true"
                    label="Join Now"
                    icon="pi pi-discord"
                    class="font-bold px-5 py-3 white-space-nowrap"
                ></p-button>
            </div>
        </div>
    `,
    styles: `
        .p-button-icon {
            display: none;
            margin-left: 0.5rem;
        }
    `,
})
export class CtaComponent {}
