import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { LinkComponent } from '../link/link.component';

interface AppDownload {
    image: string;
    name: { ar: string; en: string };
    nameColor: string;
    description?: { ar: string; en: string };
    android?: string;
    ios?: string;
    mac?: string;
    windows?: string;
}

const APPS: AppDownload[] = [
    {
        image: 'madina.png',
        name: { ar: 'حامل القرآن: مصحف المدينة', en: 'QuranHolder: Madina Mushaf' },
        nameColor: '#2c636d',
        android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_madina',
        ios: 'https://apps.apple.com/app/id1436371392',
        mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/madina-v33.0.0/-33.0.0-universal.dmg',
        windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/madina-v33.0.0/-33.0.0.Setup.exe',
    },
    {
        image: 'shmrly.png',
        name: { ar: 'حامل القرآن: مصحف الشمرلي', en: 'QuranHolder: Shamarli Mushaf' },
        nameColor: '#4b4b94',
        android: 'https://play.google.com/store/apps/details?id=apps.wursha.mosshfshmrly',
        ios: 'https://apps.apple.com/app/id1434342823',
        mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/shmrly-v33.0.0/-33.0.0-universal.dmg',
        windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/shmrly-v33.0.0/-33.0.0.Setup.exe',
    },
    {
        image: 'tjwid.png',
        name: { ar: 'حامل القرآن: مصحف التجويد', en: 'QuranHolder: Tajweed Mushaf' },
        nameColor: '#306f20',
        description: { ar: 'برواية حفص عن عاصم', en: 'Hafs an Asim riwaya' },
        android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_tjwid',
        ios: 'https://apps.apple.com/app/id1509386930',
        mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/tjwid-v33.0.0/-33.0.0-universal.dmg',
        windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/tjwid-v33.0.0/-33.0.0.Setup.exe',
    },
    {
        image: 'warsh.png',
        name: { ar: 'مصحف ورش', en: 'Warsh Mushaf' },
        nameColor: '#75502f',
        description: { ar: 'برواية ورش عن نافع، من طريق الأزرق', en: 'Warsh an Nafi’ — via Al-Azraq' },
        android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_warsh',
        ios: 'https://apps.apple.com/app/id1436361790',
        mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/warsh-v33.0.0/-33.0.0-universal.dmg',
        windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/warsh-v33.0.0/-33.0.0.Setup.exe',
    },
    {
        image: 'qalon.png',
        name: { ar: 'مصحف قالون', en: 'Qalon Mushaf' },
        nameColor: '#75502f',
        description: { ar: 'برواية قالون عن نافع', en: 'Qalon an Nafi’ riwaya' },
        android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_qalon',
        ios: 'https://apps.apple.com/app/id1437326658',
        mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/qalon-v33.0.0/-33.0.0-universal.dmg',
        windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/qalon-v33.0.0/-33.0.0.Setup.exe',
    },
];

@Component({
    selector: 'app-downloads',
    imports: [LinkComponent],
    template: `
        @let d = i18n.t().downloads;
        <section id="downloads" class="downloads">
            <div class="container">
                <header class="section-header">
                    <h2>{{ d.title }}</h2>
                    <p>{{ d.subtitle }}</p>
                    <div class="platform-icons">
                        <span class="platform-icon" [title]="d.platforms.android">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 9.5l1.4-2.4a.6.6 0 0 0-1-.6L16.5 8.9A8 8 0 0 0 12 8a8 8 0 0 0-4.5.9L6 6.5a.6.6 0 0 0-1 .6L6.4 9.5A7 7 0 0 0 3 15h18a7 7 0 0 0-3.4-5.5zM8 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                        </span>
                        <span class="platform-icon" [title]="d.platforms.ios">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 13.1c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.7-1.8-3.3-1.8-1.4-.1-2.7.8-3.4.8s-1.8-.8-3-.8a4 4 0 0 0-3.4 2.1c-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.2s1.5-.7 2.8-.7 1.7.7 2.8.7 1.9-1 2.6-2c.8-1.2 1.2-2.3 1.2-2.4-.1 0-2.3-.9-2.3-3.5zM14.4 5.6c.6-.7 1-1.7.9-2.6-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5 1 .1 2-.5 2.5-1.2z"/></svg>
                        </span>
                        <span class="platform-icon" [title]="d.platforms.windows">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5L11 4v7H3zM12 4l9-1.5V11h-9zM3 12h8v7L3 17.5zM12 12h9v7.5L12 18z"/></svg>
                        </span>
                        <span class="platform-icon" [title]="d.platforms.mac">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 13.1c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.7-1.8-3.3-1.8-1.4-.1-2.7.8-3.4.8s-1.8-.8-3-.8a4 4 0 0 0-3.4 2.1c-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.2s1.5-.7 2.8-.7 1.7.7 2.8.7 1.9-1 2.6-2c.8-1.2 1.2-2.3 1.2-2.4-.1 0-2.3-.9-2.3-3.5z"/></svg>
                        </span>
                    </div>
                </header>

                <div class="downloads__grid">
                    @for (app of apps; track app.image) {
                        <app-link
                            [image]="app.image"
                            [name]="app.name[i18n.lang()]"
                            [nameColor]="app.nameColor"
                            [description]="app.description ? app.description[i18n.lang()] : ''"
                            [android]="app.android"
                            [ios]="app.ios"
                            [mac]="app.mac"
                            [windows]="app.windows" />
                    }
                </div>

                <p class="downloads__notes">
                    <span>{{ d.winNote }}</span>
                    <span aria-hidden="true">·</span>
                    <span>{{ d.macNote }}</span>
                </p>
            </div>
        </section>
    `,
    styles: `
        .downloads {
            padding: 5rem 0;
            background: linear-gradient(180deg, #064e3b 0%, #0f766e 100%);
            color: #ecfdf5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.25rem;
        }
        .section-header {
            text-align: center;
            max-width: 46rem;
            margin: 0 auto 3rem;
        }
        .section-header h2 {
            font-size: clamp(1.8rem, 3.6vw, 2.6rem);
            color: #fcd34d;
            margin: 0 0 0.7rem;
            font-weight: 700;
        }
        .section-header p {
            color: rgba(236, 253, 245, 0.85);
            font-size: 1.05rem;
            line-height: 1.7;
            margin: 0 0 1.5rem;
        }
        .platform-icons {
            display: inline-flex;
            gap: 0.6rem;
        }
        .platform-icon {
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 0.55rem;
            background: rgba(255, 255, 255, 0.1);
            color: #fcd34d;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .platform-icon svg {
            width: 1.2rem;
            height: 1.2rem;
        }
        .downloads__grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.2rem;
        }
        @media (min-width: 720px) {
            .downloads__grid {
                grid-template-columns: 1fr 1fr;
            }
        }
        @media (min-width: 1080px) {
            .downloads__grid {
                grid-template-columns: 1fr 1fr 1fr;
            }
        }
        .downloads__notes {
            margin: 2rem 0 0;
            text-align: center;
            color: rgba(236, 253, 245, 0.7);
            font-size: 0.85rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            justify-content: center;
        }
    `,
})
export class DownloadsComponent {
    readonly i18n = inject(I18nService);
    readonly apps = APPS;
}
