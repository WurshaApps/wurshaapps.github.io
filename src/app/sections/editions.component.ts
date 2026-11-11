import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { APPS, badge, layoutNames, storeUrl } from '../shared/catalog';

/**
 * The main app (madina, first in apps.json, which offers every Mushaf) on a dark row, then the specialized
 * editions, one row each. Every row shows the edition's promo card (`public/editions/<id>-promo.webp`, the
 * release's store art) and its App Store, Google Play, Mac and Windows downloads; the specialized editions
 * also list the Mushafs they offer (content/layouts.json). There is no separate download section.
 */
@Component({
    selector: 'app-editions',
    template: `
        @let t = i18n.t().editions;
        @let lang = i18n.lang();
        @let d = i18n.t().downloads;
        <section id="editions" class="section">
            <!-- Old links to the removed download section (/<lang>/#downloads) land here. -->
            <span id="downloads" aria-hidden="true"></span>
            <div class="wrap">
                <h2>{{ t.title }}</h2>
                <p class="lede">{{ t.subtitle }}</p>

                @for (app of apps; track app.id; let isMain = $first) {
                    @if ($index === 1) {
                        <h3 class="special-title">{{ t.specialTitle }}</h3>
                        <p class="lede">{{ t.specialSubtitle }}</p>
                    }
                    <article class="card" [class.main]="isMain" [class.dark]="isMain">
                        @let e = t.list[app.id];
                        <img
                            class="promo"
                            [src]="'editions/' + app.id + '-promo.webp'"
                            [attr.srcset]="'editions/' + app.id + '-promo-640.webp 640w, editions/' + app.id + '-promo.webp 1080w'"
                            [attr.sizes]="isMain ? '(max-width: 680px) 92vw, 420px' : '(max-width: 680px) 92vw, 340px'"
                            [alt]="i18n.dir() === 'rtl' ? app.promoAlt.ar : app.promoAlt.en"
                            width="1080"
                            height="1350"
                            loading="lazy" />
                        <div class="body">
                            @if (isMain) {
                                <p class="badge">{{ t.mainLabel }}</p>
                            }
                            <div class="head">
                                <img class="icon" [src]="'editions/' + app.id + '-icon.webp'" alt="" width="56" height="56" loading="lazy" />
                                @if (isMain) {
                                    <h3>{{ e.name }}</h3>
                                } @else {
                                    <h4>{{ e.name }}</h4>
                                }
                            </div>
                            <p class="line">{{ e.line }}</p>
                            @if (!isMain) {
                                <p class="layouts-title">{{ t.layoutsTitle }}</p>
                                <ul class="layouts">
                                    @for (name of names()[app.id]; track $index) {
                                        <li>{{ name }}</li>
                                    }
                                </ul>
                            }
                            <div class="stores">
                                @for (p of storePlatforms; track p) {
                                    @if (storeUrl(app, p, lang); as url) {
                                        <a [href]="url" rel="noopener"><img [src]="badge(p, lang)" [alt]="d.links[p]" height="40" loading="lazy" /></a>
                                    }
                                }
                                <!-- Mac and Windows: GitHub release downloads, drawn to match the store badges. -->
                                @if (app.urls.mac; as url) {
                                    <a class="desktop" [href]="url" rel="noopener">
                                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5V15H4zM6 6v7h12V6zM2 16.5h20v.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" /></svg>
                                        <span><small>{{ d.links.mac }}</small>{{ d.columns.mac }}</span>
                                    </a>
                                }
                                @if (app.urls.windows; as url) {
                                    <a class="desktop" [href]="url" rel="noopener" [title]="d.winNote">
                                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.6 10.4 4.6v6.9H3zM11.4 4.4 21 3v8.5h-9.6zM3 12.5h7.4v6.9L3 18.4zM11.4 12.5H21V21l-9.6-1.4z" /></svg>
                                        <span><small>{{ d.links.windows }}</small>{{ d.columns.windows }}</span>
                                    </a>
                                }
                            </div>
                        </div>
                    </article>
                }
            </div>
        </section>
    `,
    styles: `
        .card { display: grid; grid-template-columns: 340px minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: center; margin-top: 24px; padding: 20px; border-radius: 24px; background: var(--mist); }
        .promo { width: 100%; height: auto; border-radius: 14px; box-shadow: 0 14px 36px rgb(0 0 0 / 0.22); }
        .body { display: flex; flex-direction: column; align-items: flex-start; padding-block: 12px; padding-inline-end: 12px; }
        .head { display: flex; align-items: center; gap: 14px; }
        .icon { flex: none; width: 56px; height: 56px; border-radius: 13px; box-shadow: 0 2px 8px rgb(0 0 0 / 0.18); }
        h4 { margin: 0; font-size: clamp(24px, 2.4vw, 30px); line-height: var(--heading-leading); }
        .line { max-width: 54ch; margin-top: 12px; font-size: 17px; }
        .layouts-title { align-self: stretch; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--rule); color: var(--ink-soft); font-size: 13px; font-weight: 600; }
        .layouts { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0 0; padding: 0; list-style: none; }
        .layouts li { padding: 3px 10px; border: 1px solid var(--rule); border-radius: 999px; background: #fff; color: var(--ink); font-size: 13.5px; }
        .layouts li:first-child { border-color: var(--teal); }
        .stores { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .stores a { display: block; border-radius: 8px; transition: opacity 0.15s; }
        .stores a:hover { opacity: 0.85; }
        .stores img { display: block; width: auto; height: 40px; }
        /* Same size and look as the store badges: black, grey hairline, two-line label. */
        .stores .desktop { display: flex; align-items: center; gap: 8px; height: 40px; padding-inline: 10px 14px; border: 1px solid #a6a6a6; border-radius: 8px; background: #000; color: #fff; text-decoration: none; }
        .desktop svg { flex: none; width: 22px; height: 22px; fill: currentColor; }
        .desktop span { display: flex; flex-direction: column; font-size: 17px; font-weight: 600; line-height: 1.05; white-space: nowrap; }
        .desktop small { font-size: 10px; font-weight: 400; letter-spacing: 0.02em; }

        /* Main app: bigger, on the hero's dark panel. */
        .main { grid-template-columns: 420px minmax(0, 1fr); margin-top: 48px; padding: clamp(20px, 3vw, 36px); background: var(--dark-panel); color: #fff; }
        .main .promo { box-shadow: 0 20px 50px rgb(0 0 0 / 0.45); }
        .main .badge { margin-bottom: 16px; padding: 4px 12px; border-radius: 999px; background: var(--gold); color: #1b1407; font-size: 13px; font-weight: 700; }
        /* The teal icon would vanish on the teal panel: a gold frame, like the hero's. */
        .main .icon { width: 72px; height: 72px; border: 3px solid var(--gold); border-radius: 18px; box-shadow: 0 8px 24px rgb(0 0 0 / 0.4); }
        .main h3 { font-size: clamp(34px, 4vw, 52px); }
        .main .line { font-size: 19px; }
        .main .stores img, .main .desktop { height: 48px; }
        .main .desktop span { font-size: 20px; }
        .main .desktop small { font-size: 11px; }
        .main .desktop svg { width: 26px; height: 26px; }

        .special-title { margin-top: clamp(56px, 7vw, 88px); }
        .special-title + .lede { margin-bottom: 12px; }

        @media (max-width: 960px) {
            .card { grid-template-columns: 260px minmax(0, 1fr); }
            .main { grid-template-columns: 300px minmax(0, 1fr); }
        }
        @media (max-width: 680px) {
            .card, .main { grid-template-columns: 1fr; }
            .promo { max-width: 420px; justify-self: center; }
            .body { padding-inline: 4px; }
        }
        @media (prefers-reduced-motion: reduce) { .stores a { transition: none; } }
    `,
})
export class EditionsComponent {
    readonly i18n = inject(I18nService);
    readonly apps = APPS;
    readonly storePlatforms = ['ios', 'android'] as const;
    readonly storeUrl = storeUrl;
    readonly badge = badge;
    readonly names = computed(() => layoutNames(this.i18n.dir()));
}
