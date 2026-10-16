import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
import { shotSet } from '../shared/catalog';
import { HlComponent } from '../shared/hl.component';

@Component({
    selector: 'app-hero',
    imports: [HlComponent, RouterLink],
    template: `
        @let t = i18n.t().hero;
        <section id="top" class="dark">
            <div class="wrap grid">
                <div>
                    <h1><app-hl [text]="t.title" /></h1>
                    <div class="divider" aria-hidden="true"></div>
                    <p class="sub">{{ t.subtitle }}</p>
                    <div class="ctas">
                        <a class="btn btn--primary" [routerLink]="[]" fragment="downloads">{{ t.cta }}</a>
                        <a class="btn btn--ghost" [routerLink]="[]" fragment="editions">{{ t.ctaSecondary }}</a>
                    </div>
                    <p class="platforms">{{ t.platforms }}</p>
                </div>
                <img
                    class="spread"
                    [src]="'shots/' + set() + '/spread.webp'"
                    [attr.srcset]="'shots/' + set() + '/spread-800.webp 800w, shots/' + set() + '/spread.webp 1400w'"
                    sizes="(max-width: 900px) 92vw, 640px"
                    [alt]="t.imageAlt"
                    width="1400"
                    height="1114"
                    fetchpriority="high" />
            </div>
        </section>
    `,
    styles: `
        section { overflow: hidden; padding: clamp(48px, 7vw, 96px) 0 clamp(56px, 8vw, 110px); background: var(--dark-panel); color: #fff; }
        .grid { display: grid; grid-template-columns: 6fr 7fr; gap: clamp(32px, 5vw, 72px); align-items: center; }
        h1 { font-size: clamp(38px, 4.6vw, 60px); }
        .divider { display: flex; align-items: center; gap: 10px; margin-top: 22px; color: var(--gold); }
        .divider::before { content: ''; width: 56px; height: 1px; background: currentColor; opacity: 0.7; }
        .divider::after { content: ''; width: 8px; height: 8px; background: currentColor; transform: rotate(45deg); }
        .sub { max-width: 46ch; margin-top: 20px; color: var(--on-dark-soft); font-size: 1.12em; }
        .ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
        .platforms { margin-top: 22px; color: var(--on-dark-soft); font-size: 14px; }
        .spread { border-radius: 6px; filter: drop-shadow(0 30px 50px rgb(0 0 0 / 0.35)); }
        @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
    `,
})
export class HeroComponent {
    readonly i18n = inject(I18nService);
    readonly set = computed(() => shotSet(this.i18n.dir()));
}
