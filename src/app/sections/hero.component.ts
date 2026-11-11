import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { POSTS } from '../blog/posts';
import { I18nService } from '../i18n/i18n.service';
import { APPS, badge, shotSet, storeUrl } from '../shared/catalog';
import { HlComponent } from '../shared/hl.component';

/**
 * The main app leads: its icon and name are the page's headline (`editions.list.madina.name`), `hero.title`
 * is the tagline under it. Everything is centred over the two-page spread, which rises from the bottom
 * of the section and fades out.
 */
@Component({
    selector: 'app-hero',
    imports: [HlComponent, RouterLink],
    template: `
        @let t = i18n.t().hero;
        <section id="top" class="dark">
            <div class="wrap intro">
                <a class="news" [routerLink]="['/', i18n.lang(), 'blog', latest.slug]">
                    <span class="badge">{{ t.news.label }}</span>
                    <span class="text">{{ t.news.text }}</span>
                    <span class="arrow" aria-hidden="true">{{ i18n.dir() === 'rtl' ? '←' : '→' }}</span>
                </a>
                <div class="icon">
                    <img [src]="'editions/' + main.id + '-icon.webp'" alt="" width="128" height="128" fetchpriority="high" />
                </div>
                <h1>{{ i18n.t().editions.list[main.id].name }}</h1>
                <p class="tagline"><app-hl [text]="t.title" /></p>
                <div class="divider" aria-hidden="true"><i></i></div>
                <p class="sub">{{ t.subtitle }}</p>
                <div class="stores">
                    @for (p of storePlatforms; track p) {
                        @if (storeUrl(main, p, i18n.lang()); as url) {
                            <a [href]="url" rel="noopener">
                                <img [src]="badge(p, i18n.lang())" [alt]="i18n.t().downloads.links[p]" height="56" />
                            </a>
                        }
                    }
                </div>
                <p class="platforms">{{ t.platforms }}</p>
                <a class="btn btn--ghost choose" [routerLink]="[]" fragment="editions">{{ t.ctaSecondary }}</a>
            </div>
            <div class="wrap stage">
                <img
                    class="spread"
                    [src]="'shots/' + set() + '/spread.webp'"
                    [attr.srcset]="'shots/' + set() + '/spread-800.webp 800w, shots/' + set() + '/spread.webp 1400w'"
                    sizes="(max-width: 1000px) 92vw, 940px"
                    [alt]="t.imageAlt"
                    width="1400"
                    height="1114"
                    fetchpriority="high" />
            </div>
        </section>
    `,
    styles: `
        section { position: relative; overflow: hidden; padding-top: clamp(40px, 6vw, 80px); background: var(--dark-panel); color: #fff; }
        /* A soft gold glow behind the icon and name. */
        section::before { content: ''; position: absolute; inset-inline: 0; top: 0; height: 640px; background: radial-gradient(42% 60% at 50% 22%, rgb(217 174 95 / 0.16), transparent 70%); pointer-events: none; }
        .intro { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; }

        .news { display: inline-flex; align-items: center; gap: 10px; max-width: 100%; margin-bottom: clamp(32px, 4vw, 48px); padding-block: 6px; padding-inline: 6px 16px; border-radius: 20px; background: rgb(255 255 255 / 0.08); box-shadow: inset 0 0 0 1px rgb(217 174 95 / 0.55); color: #fff; font-size: 15px; line-height: 1.45; text-align: start; text-decoration: none; transition: background 0.15s; }
        .news:hover { background: rgb(255 255 255 / 0.14); }
        .badge { flex: none; padding: 3px 12px; border-radius: 999px; background: var(--gold); color: #1b1407; font-weight: 700; font-size: 13.5px; }
        .text { min-width: 0; }
        .arrow { flex: none; color: var(--gold); font-weight: 700; }

        .icon { padding: 6px; border-radius: 34px; background: linear-gradient(145deg, rgb(217 174 95 / 0.9), rgb(217 174 95 / 0.25)); box-shadow: 0 18px 48px rgb(0 0 0 / 0.4); }
        .icon img { display: block; width: clamp(96px, 10vw, 128px); height: auto; aspect-ratio: 1; border-radius: 28px; }

        h1 { margin-top: 22px; font-size: clamp(48px, 7.4vw, 92px); line-height: 1.1; }
        .tagline { max-width: 30ch; margin-top: 14px; font-size: clamp(24px, 3vw, 36px); font-weight: 600; line-height: var(--heading-leading); text-wrap: balance; }

        .divider { display: flex; align-items: center; gap: 10px; margin-top: 24px; color: var(--gold); }
        .divider::before, .divider::after { content: ''; width: 56px; height: 1px; background: currentColor; opacity: 0.7; }
        .divider i { width: 8px; height: 8px; background: currentColor; transform: rotate(45deg); }

        .sub { max-width: 52ch; margin-top: 22px; color: var(--on-dark-soft); font-size: 1.12em; }
        /* Official store badges, shown as given: same height, no recolouring. */
        .stores { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 34px; }
        .stores a { display: block; border-radius: 10px; transition: transform 0.15s, filter 0.15s; }
        .stores a:hover { transform: translateY(-2px); filter: drop-shadow(0 8px 18px rgb(0 0 0 / 0.35)); }
        .stores img { display: block; width: auto; height: 56px; }
        .platforms { margin-top: 18px; color: var(--on-dark-soft); font-size: 14px; }
        .choose { margin-top: 26px; }

        /* The spread rises from the bottom edge and fades into it. */
        .stage { position: relative; display: flex; justify-content: center; margin-top: clamp(40px, 6vw, 72px); height: clamp(220px, 40vw, 460px); overflow: hidden; -webkit-mask-image: linear-gradient(#000 55%, transparent); mask-image: linear-gradient(#000 55%, transparent); }
        .spread { width: min(100%, 940px); height: auto; align-self: flex-start; border-radius: 8px 8px 0 0; box-shadow: 0 -10px 60px rgb(0 0 0 / 0.35); }

        @media (max-width: 560px) {
            .news { font-size: 14px; }
            .stores img { height: 48px; }
        }
        @media (prefers-reduced-motion: reduce) { .news, .stores a { transition: none; } }
    `,
})
export class HeroComponent {
    readonly i18n = inject(I18nService);
    readonly set = computed(() => shotSet(this.i18n.dir()));
    /** The announcement (`hero.news`) links to the newest post. */
    readonly latest = POSTS[0];
    readonly main = APPS[0];
    readonly storePlatforms = ['ios', 'android'] as const;
    readonly storeUrl = storeUrl;
    readonly badge = badge;
}
