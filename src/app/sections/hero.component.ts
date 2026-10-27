import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { POSTS } from '../blog/posts';
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
                    <a class="news" [routerLink]="['/', i18n.lang(), 'blog', latest.slug]">
                        <span class="badge">{{ t.news.label }}</span>
                        <span class="text">{{ t.news.text }}</span>
                        <span class="arrow" aria-hidden="true">{{ i18n.dir() === 'rtl' ? '←' : '→' }}</span>
                    </a>
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
        .news { display: inline-flex; align-items: center; gap: 10px; max-width: 100%; margin-bottom: 26px; padding-block: 6px; padding-inline: 6px 16px; border-radius: 20px; background: rgb(255 255 255 / 0.08); box-shadow: inset 0 0 0 1px rgb(217 174 95 / 0.55); color: #fff; font-size: 15px; line-height: 1.45; text-decoration: none; transition: background 0.15s; }
        .news:hover { background: rgb(255 255 255 / 0.14); }
        .badge { flex: none; padding: 3px 12px; border-radius: 999px; background: var(--gold); color: #1b1407; font-weight: 700; font-size: 13.5px; }
        .text { min-width: 0; }
        .arrow { flex: none; color: var(--gold); font-weight: 700; }
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
    /** The announcement (`hero.news`) links to the newest post. */
    readonly latest = POSTS[0];
}
