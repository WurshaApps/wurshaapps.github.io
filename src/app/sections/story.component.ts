import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { sceneImage } from '../shared/catalog';
import { HlComponent } from '../shared/hl.component';

/** The store's screenshot story, in the same order; captions are page text over shared screenshots. */
@Component({
    selector: 'app-story',
    imports: [HlComponent],
    template: `
        @let t = i18n.t().story;
        <section id="features" class="section">
            <div class="wrap">
                <h2>{{ t.title }}</h2>
                <p class="lede">{{ t.subtitle }}</p>
                @if (t.screensNote) {
                    <p class="note">{{ t.screensNote }}</p>
                }
                @for (scene of t.scenes; track scene.id) {
                    <article class="scene">
                        <div class="stage">
                            <div class="phone">
                                <img [src]="image(scene.id)" alt="" width="560" height="1139" loading="lazy" />
                            </div>
                        </div>
                        <div>
                            <h3><app-hl [text]="scene.title" /></h3>
                            <p class="sub">{{ scene.subtitle }}</p>
                            <ul>
                                @for (item of scene.items; track $index) {
                                    <li>{{ item }}</li>
                                }
                            </ul>
                            @if (scene.note) {
                                <p class="note">{{ scene.note }}</p>
                            }
                        </div>
                    </article>
                }
            </div>
        </section>
    `,
    styles: `
        section { padding-top: 0; }
        .scene { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 6vw, 96px); align-items: center; margin-top: clamp(64px, 8vw, 112px); }
        .scene:nth-of-type(even) .stage { order: 2; }
        .stage { display: flex; align-items: flex-end; justify-content: center; height: 560px; border-radius: 28px; overflow: hidden; background: var(--dark-panel); }
        .phone { width: 300px; max-height: 500px; overflow: hidden; border: 10px solid #121516; border-bottom: 0; border-radius: 52px 52px 0 0; background: #000; box-shadow: 0 -10px 40px rgb(0 0 0 / 0.25); }
        .phone img { border-radius: 42px 42px 0 0; }
        h3 { margin-bottom: 10px; }
        .sub { color: var(--ink-soft); font-size: 1.08em; }
        ul { display: grid; gap: 12px; margin: 26px 0 0; padding: 0; list-style: none; }
        li { position: relative; padding-inline-start: 22px; }
        li::before { content: ''; position: absolute; inset-inline-start: 2px; top: 0.62em; width: 7px; height: 7px; background: var(--gold); transform: rotate(45deg); }
        @media (max-width: 860px) {
            .scene { grid-template-columns: 1fr; gap: 28px; }
            .scene:nth-of-type(even) .stage { order: 0; }
            .stage { height: 460px; }
            .phone { width: 250px; max-height: 420px; }
        }
    `,
})
export class StoryComponent {
    readonly i18n = inject(I18nService);
    image(scene: Parameters<typeof sceneImage>[0]) {
        return sceneImage(scene, this.i18n.dir());
    }
}
