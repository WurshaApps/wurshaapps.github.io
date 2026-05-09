import { Component, computed, inject, input } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

type StoreKey = 'android' | 'ios' | 'windows' | 'mac';

interface StoreLink {
    key: StoreKey;
    href: string;
    note?: string;
}

@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
})
export class LinkComponent {
    readonly i18n = inject(I18nService);

    readonly image = input<string>('');
    readonly name = input<string>();
    readonly nameColor = input<string>('#0f766e');
    readonly description = input<string>();
    readonly version = input<string>();
    readonly featured = input<boolean>(false);
    readonly android = input<string>();
    readonly ios = input<string>();
    readonly mac = input<string>();
    readonly windows = input<string>();

    readonly stores = computed<StoreLink[]>(() => {
        const t = this.i18n.t().downloads;
        const list: StoreLink[] = [];
        if (this.ios()) list.push({ key: 'ios', href: this.ios()! });
        if (this.android()) list.push({ key: 'android', href: this.android()! });
        if (this.windows()) list.push({ key: 'windows', href: this.windows()!, note: t.winNote });
        if (this.mac()) list.push({ key: 'mac', href: this.mac()!, note: t.macNote });
        return list;
    });

    readonly accent = computed(() => {
        const c = this.nameColor();
        return {
            glow: `0 18px 60px -28px ${c}`,
            ring: c,
        };
    });
}
