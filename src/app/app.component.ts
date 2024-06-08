import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LinkComponent } from './link/link.component';
import { FooterComponent } from './footer/footer.component';

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
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, LinkComponent, FooterComponent],
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
            android: 'https://bit.ly/qmdna',
            ios: 'https://bit.ly/Qmdna',
            mac: 'https://bit.ly/madina-mac',
            windows: 'https://bit.ly/madina_win',
        },
        {
            image: 'shmrly.png',
            name: 'حامل القرآن: مصحف الشمرلي',
            nameColor: '#4b4b94',
            android: 'https://bit.ly/shmrly',
            ios: 'https://bit.ly/Shmrly',
            mac: 'https://bit.ly/shmrly-mac',
            windows: 'https://bit.ly/shmrly_win',
        },
        {
            image: 'tjwid.png',
            name: 'حامل القرآن: مصحف التجويد',
            nameColor: '#306f20',
            description: 'برواية حفص عن عاصم',
            android: 'https://bit.ly/qhtjwid',
            ios: 'https://bit.ly/Qhtjwid',
            mac: 'https://bit.ly/tjwid-mac',
            windows: 'https://bit.ly/tjwid_win',
        },
        {
            image: 'warsh.png',
            name: 'مصحف ورش',
            nameColor: '#75502f',
            description: 'برواية ورش عن نافع، من طريق الأزرق',
            android: 'https://bit.ly/qkzwrsh',
            ios: 'https://bit.ly/Qkzwrsh',
            mac: 'https://bit.ly/warsh_mac',
            windows: 'https://bit.ly/warsh_win',
        },
        {
            image: 'qalon.png',
            name: 'مصحف قالون',
            nameColor: '#75502f',
            description: 'برواية قالون عن نافع',
            android: 'https://bit.ly/kzqalon',
            ios: 'https://bit.ly/Kzqalon',
            mac: 'https://bit.ly/qalon_mac',
            windows: 'https://bit.ly/qalon_win',
        },
    ];
}
