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
    featured?: boolean;
}

const VERSION = '33.0.0';

const APPS: AppDownload[] = [
    {
        image: 'madina.png',
        name: { ar: 'حامل القرآن: مصحف المدينة', en: 'QuranHolder: Madina Mushaf' },
        nameColor: '#5eead4',
        featured: true,
        description: { ar: 'الخط العثماني — رواية حفص', en: 'Uthmani script — Hafs riwaya' },
        android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_madina',
        ios: 'https://apps.apple.com/app/id1436371392',
        mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/madina-v33.0.0/-33.0.0-universal.dmg',
        windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/madina-v33.0.0/-33.0.0.Setup.exe',
    },
    {
        image: 'shmrly.png',
        name: { ar: 'حامل القرآن: مصحف الشمرلي', en: 'QuranHolder: Shamarli Mushaf' },
        nameColor: '#a78bfa',
        description: { ar: 'بخط الشمرلي مع هوامش واسعة', en: 'Shamarli script with wide margins' },
        android: 'https://play.google.com/store/apps/details?id=apps.wursha.mosshfshmrly',
        ios: 'https://apps.apple.com/app/id1434342823',
        mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/shmrly-v33.0.0/-33.0.0-universal.dmg',
        windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/shmrly-v33.0.0/-33.0.0.Setup.exe',
    },
    {
        image: 'tjwid.png',
        name: { ar: 'حامل القرآن: مصحف التجويد', en: 'QuranHolder: Tajweed Mushaf' },
        nameColor: '#86efac',
        description: { ar: 'برواية حفص مع تلوين أحكام التجويد', en: 'Hafs riwaya with color-coded tajweed' },
        android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_tjwid',
        ios: 'https://apps.apple.com/app/id1509386930',
        mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/tjwid-v33.0.0/-33.0.0-universal.dmg',
        windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/tjwid-v33.0.0/-33.0.0.Setup.exe',
    },
    {
        image: 'warsh.png',
        name: { ar: 'مصحف ورش', en: 'Warsh Mushaf' },
        nameColor: '#fbbf24',
        description: { ar: 'برواية ورش عن نافع، من طريق الأزرق', en: 'Warsh an Nafi’ — via Al-Azraq' },
        android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_warsh',
        ios: 'https://apps.apple.com/app/id1436361790',
        mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/warsh-v33.0.0/-33.0.0-universal.dmg',
        windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/warsh-v33.0.0/-33.0.0.Setup.exe',
    },
    {
        image: 'qalon.png',
        name: { ar: 'مصحف قالون', en: 'Qalon Mushaf' },
        nameColor: '#fb923c',
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
            <div class="downloads__bg" aria-hidden="true">
                <div class="downloads__mesh"></div>
                <div class="downloads__grid-overlay"></div>
            </div>

            <div class="container">
                <header class="dl-header">
                    <span class="dl-header__eyebrow">
                        <span class="dl-header__pulse" aria-hidden="true"></span>
                        {{ d.eyebrow }}
                        <code>v{{ d.version }}</code>
                    </span>
                    <h2>{{ d.title }}</h2>
                    <p>{{ d.subtitle }}</p>

                    <div class="dl-platforms" role="list" [attr.aria-label]="d.supportedOn">
                        <span class="dl-platforms__label">{{ d.supportedOn }}</span>
                        <span class="dl-platform" role="listitem" [title]="d.platformNames.android">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.6 9.5l1.4-2.4c.2-.4-.4-.8-.7-.4L16.7 9c-1.3-.6-2.9-1-4.7-1s-3.4.4-4.7 1L5.7 6.7c-.3-.4-.9 0-.7.4L6.4 9.5C3.8 10.9 2 13.4 2 16h20c0-2.6-1.8-5.1-4.4-6.5zM7.5 14a1 1 0 110-2 1 1 0 010 2zm9 0a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                            <span>{{ d.platformNames.android }}</span>
                        </span>
                        <span class="dl-platform" role="listitem" [title]="d.platformNames.ios">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M16.4 13.1c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.7-1.8-3.3-1.8-1.4-.1-2.7.8-3.4.8s-1.8-.8-3-.8a4 4 0 00-3.4 2.1c-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.2s1.5-.7 2.8-.7 1.7.7 2.8.7 1.9-1 2.6-2c.8-1.2 1.2-2.3 1.2-2.4-.1 0-2.3-.9-2.3-3.5z" />
                            </svg>
                            <span>{{ d.platformNames.ios }}</span>
                        </span>
                        <span class="dl-platform" role="listitem" [title]="d.platformNames.windows">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M3 5.5L11 4v7H3zM12 4l9-1.5V11h-9zM3 12h8v7L3 17.5zM12 12h9v7.5L12 18z" />
                            </svg>
                            <span>{{ d.platformNames.windows }}</span>
                        </span>
                        <span class="dl-platform" role="listitem" [title]="d.platformNames.mac">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M16.4 13.1c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.7-1.8-3.3-1.8-1.4-.1-2.7.8-3.4.8s-1.8-.8-3-.8a4 4 0 00-3.4 2.1c-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.2s1.5-.7 2.8-.7 1.7.7 2.8.7 1.9-1 2.6-2c.8-1.2 1.2-2.3 1.2-2.4-.1 0-2.3-.9-2.3-3.5z" />
                            </svg>
                            <span>{{ d.platformNames.mac }}</span>
                        </span>
                        <span class="dl-platform dl-platform--soon" role="listitem" [title]="d.webSoon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
                            </svg>
                            <span>{{ d.platformNames.web }}</span>
                            <em>{{ d.webSoon }}</em>
                        </span>
                    </div>
                </header>

                <div class="dl-grid">
                    @for (app of apps; track app.image) {
                        <app-link
                            [image]="app.image"
                            [appName]="app.name[i18n.lang()]"
                            [nameColor]="app.nameColor"
                            [description]="app.description ? app.description[i18n.lang()] : ''"
                            [version]="version"
                            [featured]="!!app.featured"
                            [android]="app.android"
                            [ios]="app.ios"
                            [mac]="app.mac"
                            [windows]="app.windows" />
                    }
                </div>

                <footer class="dl-footnote">
                    <span class="dl-footnote__item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="M3 9h18" />
                        </svg>
                        {{ d.winNote }}
                    </span>
                    <span class="dl-footnote__item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                            <path d="M16 13c0-2 2-3 2-3-1-1-2-1-3-1-1 0-2 1-3 1s-2-1-3-1c-2 0-4 1-4 4 0 4 3 8 4 8s2-1 3-1 2 1 3 1c1 0 2-1 3-3" />
                            <path d="M14 5c.5-.5.8-1.3.7-2-.7 0-1.4.4-1.8 1-.4.4-.7 1.2-.6 1.9.7.1 1.4-.4 1.7-.9z" />
                        </svg>
                        {{ d.macNote }}
                    </span>
                </footer>
            </div>
        </section>
    `,
    styles: `
        .downloads {
            position: relative;
            padding: 6rem 0 5rem;
            background: #050a0e;
            color: #f0fdf4;
            isolation: isolate;
            overflow: hidden;
        }

        .downloads__bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
        }

        .downloads__mesh {
            position: absolute;
            inset: 0;
            background:
                radial-gradient(40% 50% at 80% 0%, rgba(252, 211, 77, 0.18), transparent 65%),
                radial-gradient(45% 55% at 0% 30%, rgba(15, 118, 110, 0.32), transparent 70%),
                radial-gradient(40% 60% at 100% 80%, rgba(94, 234, 212, 0.18), transparent 70%),
                radial-gradient(60% 50% at 50% 100%, rgba(167, 139, 250, 0.12), transparent 70%),
                linear-gradient(180deg, #061410 0%, #03080b 100%);
        }

        .downloads__grid-overlay {
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 90%);
            -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 90%);
        }

        .container {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.25rem;
        }

        .dl-header {
            text-align: center;
            max-width: 50rem;
            margin: 0 auto 3.5rem;
        }

        .dl-header__eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            background: rgba(252, 211, 77, 0.1);
            border: 1px solid rgba(252, 211, 77, 0.25);
            color: #fcd34d;
            padding: 0.4rem 0.85rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 0.04em;
            margin-bottom: 1.4rem;
        }

        .dl-header__eyebrow code {
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            background: rgba(252, 211, 77, 0.15);
            padding: 0.1rem 0.4rem;
            border-radius: 0.35rem;
            font-size: 0.72rem;
            color: #fde68a;
        }

        .dl-header__pulse {
            position: relative;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: #34d399;
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6);
            animation: dl-pulse 2s ease-out infinite;
        }

        @keyframes dl-pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.55);
            }
            70% {
                box-shadow: 0 0 0 8px rgba(52, 211, 153, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
            }
        }

        .dl-header h2 {
            font-size: clamp(2rem, 4.4vw, 3rem);
            color: #fcfcfc;
            margin: 0 0 0.9rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.15;
        }

        .dl-header p {
            color: rgba(236, 253, 245, 0.7);
            font-size: 1.05rem;
            line-height: 1.7;
            margin: 0 0 2rem;
        }

        .dl-platforms {
            display: inline-flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 999px;
            padding: 0.45rem 0.55rem;
            backdrop-filter: blur(8px);
        }

        .dl-platforms__label {
            font-size: 0.75rem;
            color: rgba(236, 253, 245, 0.55);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            padding: 0 0.6rem;
        }

        .dl-platform {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(255, 255, 255, 0.05);
            color: #ecfdf5;
            padding: 0.35rem 0.7rem;
            border-radius: 999px;
            font-size: 0.82rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
            transition:
                background-color 0.2s,
                border-color 0.2s,
                transform 0.2s;
        }

        .dl-platform:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(252, 211, 77, 0.35);
            transform: translateY(-1px);
        }

        .dl-platform svg {
            width: 0.9rem;
            height: 0.9rem;
            color: #fcd34d;
        }

        .dl-platform--soon {
            opacity: 0.7;
        }

        .dl-platform--soon em {
            font-style: normal;
            color: rgba(252, 211, 77, 0.7);
            font-size: 0.7rem;
            border-inline-start: 1px solid rgba(255, 255, 255, 0.15);
            padding-inline-start: 0.5rem;
            margin-inline-start: 0.2rem;
        }

        @media (max-width: 640px) {
            .dl-platforms {
                border-radius: 1.2rem;
            }
            .dl-platform--soon em {
                display: none;
            }
        }

        .dl-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.2rem;
        }

        @media (min-width: 720px) {
            .dl-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 1080px) {
            .dl-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            .dl-grid > :first-child {
                grid-column: span 2;
            }
        }

        .dl-footnote {
            margin: 2.5rem 0 0;
            display: flex;
            flex-wrap: wrap;
            gap: 1.2rem;
            justify-content: center;
            color: rgba(236, 253, 245, 0.5);
            font-size: 0.82rem;
        }

        .dl-footnote__item {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }

        .dl-footnote__item svg {
            width: 0.95rem;
            height: 0.95rem;
            color: rgba(252, 211, 77, 0.55);
            flex: 0 0 auto;
        }
    `,
})
export class DownloadsComponent {
    readonly i18n = inject(I18nService);
    readonly apps = APPS;
    readonly version = VERSION;
}
