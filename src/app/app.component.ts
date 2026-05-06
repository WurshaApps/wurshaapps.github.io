import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LinkComponent } from './link/link.component';

interface link {
    image: string;
    name: string;
    nameColor: string;
    description?: string;
    android?: string;
    ios?: string;
    mac?: string;
    windows?: string;
}

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, LinkComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'wdc';

    links: link[] = [
        {
            image: 'madina.png',
            name: 'حامل القرآن: مصحف المدينة',
            nameColor: '#2c636d',
            android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_madina',
            ios: 'https://apps.apple.com/app/id1436371392',
            mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/madina-v33.0.0/-33.0.0-universal.dmg',
            windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/madina-v33.0.0/-33.0.0.Setup.exe',
        },
        {
            image: 'shmrly.png',
            name: 'حامل القرآن: مصحف الشمرلي',
            nameColor: '#4b4b94',
            android: 'https://play.google.com/store/apps/details?id=apps.wursha.mosshfshmrly',
            ios: 'https://apps.apple.com/app/id1434342823',
            mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/shmrly-v33.0.0/-33.0.0-universal.dmg',
            windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/shmrly-v33.0.0/-33.0.0.Setup.exe',
        },
        {
            image: 'tjwid.png',
            name: 'حامل القرآن: مصحف التجويد',
            nameColor: '#306f20',
            description: 'برواية حفص عن عاصم',
            android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_tjwid',
            ios: 'https://apps.apple.com/app/id1509386930',
            mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/tjwid-v33.0.0/-33.0.0-universal.dmg',
            windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/tjwid-v33.0.0/-33.0.0.Setup.exe',
        },
        {
            image: 'warsh.png',
            name: 'مصحف ورش',
            nameColor: '#75502f',
            description: 'برواية ورش عن نافع، من طريق الأزرق',
            android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_warsh',
            ios: 'https://apps.apple.com/app/id1436361790',
            mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/warsh-v33.0.0/-33.0.0-universal.dmg',
            windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/warsh-v33.0.0/-33.0.0.Setup.exe',
        },
        {
            image: 'qalon.png',
            name: 'مصحف قالون',
            nameColor: '#75502f',
            description: 'برواية قالون عن نافع',
            android: 'https://play.google.com/store/apps/details?id=apps.wursha.quran_qalon',
            ios: 'https://apps.apple.com/app/id1437326658',
            mac: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/qalon-v33.0.0/-33.0.0-universal.dmg',
            windows: 'https://github.com/WurshaApps/QuranHolder_Releases/releases/download/qalon-v33.0.0/-33.0.0.Setup.exe',
        },
    ];
}
