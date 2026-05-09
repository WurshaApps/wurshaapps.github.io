export type Lang = 'ar' | 'en';

export interface Dict {
    meta: {
        title: string;
        description: string;
    };
    nav: {
        features: string;
        editions: string;
        reciters: string;
        books: string;
        downloads: string;
        switchLang: string;
    };
    hero: {
        eyebrow: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
        screenshotAlt: string;
    };
    stats: {
        editions: string;
        editionsLabel: string;
        reciters: string;
        recitersLabel: string;
        books: string;
        booksLabel: string;
        features: string;
        featuresLabel: string;
    };
    audiences: {
        title: string;
        subtitle: string;
        items: { title: string; body: string }[];
    };
    features: {
        title: string;
        subtitle: string;
        categories: {
            id: string;
            title: string;
            count: number;
            blurb: string;
            highlights: string[];
        }[];
    };
    editions: {
        title: string;
        subtitle: string;
        collections: { name: string; description: string; items: string[] }[];
        list: {
            code: string;
            name: string;
            note: string;
            isDefault?: boolean;
        }[];
        crossNote: string;
    };
    reciters: {
        title: string;
        subtitle: string;
        riwayatTitle: string;
        riwayat: { name: string; sub?: string }[];
        sourcesTitle: string;
        sources: { name: string; sub: string }[];
        featuredTitle: string;
        featured: { name: string; riwaya: string; version: string }[];
        downloadNote: string;
    };
    books: {
        title: string;
        subtitle: string;
        categories: {
            key: string;
            title: string;
            count: string;
            samples: string[];
        }[];
    };
    sciences: {
        title: string;
        subtitle: string;
        items: { title: string; body: string }[];
    };
    gestures: {
        title: string;
        subtitle: string;
        items: { gesture: string; action: string }[];
    };
    downloads: {
        title: string;
        subtitle: string;
        platforms: { android: string; ios: string; windows: string; mac: string };
        winNote: string;
        macNote: string;
    };
    tech: {
        title: string;
        subtitle: string;
        bullets: string[];
    };
    footer: {
        about: string;
        creditsTitle: string;
        credits: { label: string; value: string }[];
        sourcesTitle: string;
        sources: string[];
        rights: string;
    };
    common: {
        placeholder: string;
        screenshot: string;
        comingSoon: string;
    };
}

const ar: Dict = {
    meta: {
        title: 'حامل القرآن — رفيقك الكامل لقراءة القرآن وتلاوته ودراسته وحفظه',
        description:
            '15 مصحفاً معتمداً، 68 قارئاً، 63 كتاباً وتفسيراً وترجمة، وفرش القراءات وتحليل صرفي ونحوي للكلمات — في تطبيق واحد.',
    },
    nav: {
        features: 'الخصائص',
        editions: 'المصاحف',
        reciters: 'القراء',
        books: 'الكتب والتفاسير',
        downloads: 'تحميل التطبيق',
        switchLang: 'English',
    },
    hero: {
        eyebrow: 'تطبيق حامل القرآن — الورشة الرقمية',
        title: 'الرفيق الكامل للقرآن الكريم',
        titleHighlight: 'قراءةً وتلاوةً ودراسةً وحفظاً',
        subtitle:
            'خمسة عشر مصحفاً معتمداً، وثمانية وستون قارئاً من خيرة قراء العالم الإسلامي، وأكثر من خمسة عشر تفسيراً جنباً إلى جنب مع فرش القراءات والتحليل النحوي والصرفي للكلمات — كل ذلك في تطبيق واحد يعمل بدون إنترنت بعد التحميل الأولي.',
        ctaPrimary: 'حمّل التطبيق',
        ctaSecondary: 'تعرّف على الخصائص',
        screenshotAlt: 'لقطة من تطبيق حامل القرآن',
    },
    stats: {
        editions: '15',
        editionsLabel: 'مصحفاً معتمداً',
        reciters: '68',
        recitersLabel: 'قارئاً مختاراً',
        books: '63',
        booksLabel: 'كتاباً وتفسيراً وترجمة',
        features: '+78',
        featuresLabel: 'خاصية للمستخدم',
    },
    audiences: {
        title: 'لمن صُمِّم هذا التطبيق؟',
        subtitle: 'أربع شرائح أساسية يخدمها التطبيق بعمقٍ وتفصيل.',
        items: [
            {
                title: 'القارئ اليومي',
                body: 'مصحفٌ رقمي جميل قابل للتخصيص الكامل — ألوان، خطوط، تخطيط، وإيماءات لمس مريحة لمن يقرأ القرآن وِرداً يومياً.',
            },
            {
                title: 'حملة القرآن الكريم',
                body: 'إنشاء ختمات متعدّدة، حفظ الموضع، تكرار الآيات، ضبط الفاصل بين الآيات، وأدوات مراجعة دقيقة لمن يحفظ ويراجع.',
            },
            {
                title: 'طلاب علوم القرآن',
                body: 'فرش القراءات العشر، الإعراب، الصرف، أسباب النزول، علامات الوقف، وأكثر من ٢٢ كتاباً متخصصاً في القراءات.',
            },
            {
                title: 'غير الناطقين بالعربية',
                body: 'أكثر من ١٤ ترجمة معتمدة، وقراءة صوتية للترجمة الإنجليزية بصوت Sahih International لفهمٍ أعمق للمعاني.',
            },
        ],
    },
    features: {
        title: 'خصائص لا تُحصى في تطبيقٍ واحد',
        subtitle:
            'أكثر من ٧٨ خاصية مدروسة، موزّعة على ١١ فئة، تخدم القراءة والتلاوة والدراسة والحفظ.',
        categories: [
            {
                id: 'reading',
                title: 'القراءة وعرض المصحف',
                count: 8,
                blurb:
                    'واجهة مصحف كاملة الشاشة بتخطيطات متعددة، مظاهر مخصّصة، سبعة خطوط، ولوحة ألوان قابلة للتخصيص نهاراً وليلاً.',
                highlights: [
                    'أوضاع عرض عمودية وأفقية',
                    'مظهر نهاري وليلي وتلقائي',
                    'سبعة خطوط (الأميري، العثماني، النسخ، الرقعة، شهرزاد...)',
                    'إبقاء الشاشة مضيئة أثناء التلاوة',
                ],
            },
            {
                id: 'navigation',
                title: 'التنقّل في المصحف',
                count: 6,
                blurb: 'تنقّل سريع بين السور والأجزاء والأرباع والصفحات بالاسم أو الرقم أو الصفحة.',
                highlights: [
                    'فهرس السور (114) مع البحث',
                    'فهرس الأجزاء (30) والأرباع (120)',
                    'انتقال مباشر إلى أي صفحة (1–604)',
                    'تمرير تلقائي قابل للتخصيص',
                ],
            },
            {
                id: 'tracks',
                title: 'الختمات والتقدّم',
                count: 3,
                blurb: 'أنشئ ختمات متعدّدة بألوان مميّزة (وِرد يومي، حفظ، قيام، مراجعة) واحفظ موضعك تلقائياً.',
                highlights: ['ختمات متعدّدة بألوان مخصّصة', 'حفظ آخر صفحة لكل ختمة', 'مؤشر تقدّم مرئي للنسبة المنجزة'],
            },
            {
                id: 'bookmarks',
                title: 'العلامات والملاحظات',
                count: 4,
                blurb: 'علامات على الصفحات والآيات، ملاحظات شخصية مرتبطة بالختمة، وتصدير ومشاركة.',
                highlights: [
                    'علامة صفحة بنقرة',
                    'علامة آية للدراسة المعمّقة',
                    'ملاحظات شخصية مرتبطة بالختمة',
                    'تصدير العلامات والملاحظات نصياً',
                ],
            },
            {
                id: 'audio',
                title: 'التلاوة الصوتية',
                count: 10,
                blurb:
                    'استمع إلى ٦٨ قارئاً بجودة عالية، وكرّر، وحدّد سرعة التلاوة، وأوقف التشغيل عند نهاية السورة أو الجزء أو الصفحة.',
                highlights: [
                    'تكرار آية / سورة / نطاق محدّد',
                    'فاصل قابل للتخصيص بين الآيات',
                    'سرعة تشغيل (1×، 1.25×، 1.5×...)',
                    'تظليل الآية المتلوّة وتمرير تلقائي',
                    'تحميل التلاوة كاملة لتشغيلها بدون إنترنت',
                    'إيقاف عند نهاية السورة، الصفحة، الربع، الحزب، الجزء، أو بعد مدة',
                ],
            },
            {
                id: 'search',
                title: 'البحث والمراجع',
                count: 7,
                blurb: 'بحث في النص الكامل بأربعة أنماط: مبسّط، بالتشكيل، بالنص العثماني، أو بالجذر.',
                highlights: [
                    'بحث بالنمط (Wildcard / Regex)',
                    'بحث بكلمة كاملة',
                    'حصر البحث في السورة الحالية',
                    'صفحة الآية بتفاصيلها كاملة',
                ],
            },
            {
                id: 'sciences',
                title: 'علوم القرآن والمراجع',
                count: 10,
                blurb:
                    'تحليل صرفي ونحوي على مستوى الكلمة، أكثر من ١٥ تفسيراً، فرش القراءات بألوان، وأسباب النزول.',
                highlights: [
                    'صفحة الكلمة (المعنى، الصرف، الإعراب)',
                    'القراءات من القرّاء العشرة',
                    'أسباب النزول (الواحدي وغيره)',
                    'علامات الوقف والابتداء',
                    'فرش القراءات بقواعد ملوّنة',
                ],
            },
            {
                id: 'customization',
                title: 'التخصيص والإعدادات',
                count: 10,
                blurb:
                    'بدّل بين 15 مصحفاً، تحكّم في الإيماءات، اقفل اتجاه الشاشة، وفعّل اختصارات لوحة المفاتيح وفأرة الحاسب.',
                highlights: [
                    'القراء حسب الرواية المختارة',
                    'تخصيص كل إيماءة لمس على حدة',
                    'دعم لوحة المفاتيح ودولاب الفأرة',
                    'العربية والإنجليزية للواجهة',
                ],
            },
            {
                id: 'tools',
                title: 'أدوات وخصائص أخرى',
                count: 9,
                blurb:
                    'أدعية مختارة، تصدير واستيراد الإعدادات، تحديث البيانات، مشاركة، ونسخ بنقرة واحدة.',
                highlights: [
                    'صفحة الأدعية من الكتاب والسنة',
                    'تصدير/استيراد JSON للإعدادات والعلامات',
                    'مشاركة الآيات والملاحظات',
                    'جولة ترحيبية تفاعلية',
                ],
            },
            {
                id: 'gestures',
                title: 'التحكم باللمس والإيماءات',
                count: 5,
                blurb: 'تقليب بالسحب، تكبير بفتل الإصبعين، ضغطة مطوّلة لفتح الهوامش، ونقرة في المركز لإخفاء الأشرطة.',
                highlights: [
                    'تقليب الصفحات بالسحب يميناً ويساراً',
                    'تكبير وتصغير بفتل الإصبعين',
                    'الهامش بالضغطة المطوّلة',
                    'إخفاء الأشرطة بالنقر على وسط الصفحة',
                ],
            },
            {
                id: 'editions',
                title: 'خصائص خاصة بالمصاحف',
                count: 4,
                blurb: 'خصائص فريدة لكل مصحف: تلوين أحكام التجويد، إحداثيات الكلمات، هوامش مقارنة بين القراءات.',
                highlights: [
                    'مصحف المدينة بالخط العثماني (افتراضي)',
                    'مصحف التجويد بأحكامٍ ملوّنة',
                    'مصحف الشمرلي بهوامشه الواسعة',
                    'دعم الروايات: حفص، ورش، قالون، شعبة...',
                ],
            },
        ],
    },
    editions: {
        title: 'خمسة عشر مصحفاً معتمداً',
        subtitle:
            'مجموعتان رئيسيتان: «حامل القرآن» للقراءة الموسّعة، و«خَير زاد» لإعداد حملة الكتاب. كلٌ بفرشه ووسيلة إيضاحه الملوّنة وهامشه المقارن.',
        collections: [
            {
                name: 'حامل القرآن',
                description: 'مجموعة موسّعة بالخط العثماني تشمل القراءات والروايات الكبرى.',
                items: ['المدينة', 'الشمرلي', 'التجويد', 'شعبة', 'أبو جعفر', 'ابن كثير', 'ابن عامر', 'ابن ذكوان', 'الأصبهاني'],
            },
            {
                name: 'خَير زاد',
                description: 'سلسلة لإعداد حملة كتاب الله، بمنهج تربوي ميسّر.',
                items: ['حفص', 'ورش', 'قالون', 'عاصم وابن عامر', 'تيسير العشر'],
            },
        ],
        list: [
            { code: 'Madina', name: 'مصحف المدينة', note: 'الخط العثماني وإحداثيات الكلمات. الأساس للمقارنة.', isDefault: true },
            { code: 'Hafs', name: 'خير زاد: حفص', note: 'رواية حفص بخلفية بيضاء، منهج خير زاد.' },
            { code: 'Warsh', name: 'خير زاد: ورش', note: 'ورش عن نافع بألوان توضّح الفروق عن حفص.' },
            { code: 'Qalon', name: 'خير زاد: قالون', note: 'قالون عن نافع ضمن مشروع خير زاد.' },
            { code: 'Shoba', name: 'مصحف شعبة', note: 'شعبة عن عاصم بخلفية بيضاء.' },
            { code: 'Tjwid', name: 'مصحف التجويد', note: 'تلوين أحكام التجويد على الحروف (دار المعرفة).' },
            { code: 'Shmrly', name: 'مصحف الشمرلي', note: 'بخط الشمرلي مع هوامش واسعة.' },
            { code: 'Aamer', name: 'خير زاد: عاصم وابن عامر', note: 'مصحف مقارن: عاصم وابن عامر على الهامش.' },
            { code: 'Jafar', name: 'مصحف أبي جعفر', note: 'قراءة أبي جعفر مع هامش مقارن.' },
            { code: 'Asbhani', name: 'الأصبهاني من المصباح', note: 'الأصبهاني بألوان توضّح الفروق عن حفص.' },
            { code: 'Kathir', name: 'مصحف ابن كثير', note: 'قراءة ابن كثير مع هامش الفروق.' },
            { code: 'IbnAaamer', name: 'مصحف ابن عامر', note: 'تلوين شامل للفروق عن حفص.' },
            { code: 'Thkwan', name: 'رواية ابن ذكوان', note: 'ابن ذكوان عن ابن عامر مع وسيلة إيضاح ملوّنة.' },
            { code: 'Twst', name: 'أصحاب التوسط', note: 'تيسير العشر، يبيّن المتفق والمختلف فيه ووقف هشام والإمالة.' },
            { code: 'Libya', name: 'مصحف قالون (ليبيا)', note: 'إصدار ليبي لمصحف قالون.' },
        ],
        crossNote: 'معظم المصاحف تدعم وسيلة الإيضاح الملوّنة، الهوامش المقارنة بين القراءات، علامات الوقف، ومنهج المصحف.',
    },
    reciters: {
        title: 'ثمانية وستون قارئاً عبر الروايات والقراءات',
        subtitle:
            'كلّ قارئ مرتبط برواية معيّنة وإصدار (مرتل، مجوّد، معلّم، مصحف الإذاعة، كامل) ومصدر صوتي عالي الجودة. ويمكنك إضافة قارئ مخصّص برابط.',
        riwayatTitle: 'الروايات والقراءات',
        riwayat: [
            { name: 'حفص عن عاصم', sub: 'الأكثر شهرة' },
            { name: 'ورش عن نافع' },
            { name: 'قالون عن نافع' },
            { name: 'شعبة عن عاصم' },
            { name: 'الدوري عن أبي عمرو' },
            { name: 'السوسي عن أبي عمرو' },
            { name: 'الأصبهاني' },
            { name: 'حمزة برواياته' },
            { name: 'جمع الكبرى والصغرى', sub: 'بيان القراءات العشر' },
            { name: 'بيان أوجه قالون وورش' },
        ],
        sourcesTitle: 'المصادر الصوتية',
        sources: [
            { name: 'mp3quran.net', sub: 'المكتبة الصوتية للقرآن — حتى 192 كبت/ث' },
            { name: 'everyayah.com', sub: 'كل آية — مصدر بديل' },
            { name: 'quran.ksu.edu.sa', sub: 'المصحف الإلكتروني — جامعة الملك سعود' },
            { name: 'sound.quraat.info', sub: 'قراءات صوتية كلاسيكية ومتخصّصة' },
            { name: 'wursha-backup.github.io', sub: 'نسخة احتياطية لتلاوات الحصري' },
        ],
        featuredTitle: 'من القراء المميَّزين',
        featured: [
            { name: 'محمود خليل الحصري', riwaya: 'حفص عن عاصم', version: 'مرتل / مجوّد / إذاعة / معلّم' },
            { name: 'محمد صديق المنشاوي', riwaya: 'حفص عن عاصم', version: 'مرتل / مجوّد / معلّم' },
            { name: 'عبد الباسط عبد الصمد', riwaya: 'حفص / ورش', version: 'مرتل / مجوّد' },
            { name: 'مشاري راشد العفاسي', riwaya: 'حفص عن عاصم', version: 'مرتل' },
            { name: 'ياسر الدوسري', riwaya: 'حفص عن عاصم', version: 'مرتل' },
            { name: 'سعود الشريم', riwaya: 'حفص عن عاصم', version: 'مرتل' },
            { name: 'أحمد طلبة', riwaya: 'جمع الكبرى', version: 'كامل' },
            { name: 'إبراهيم المغربي', riwaya: 'الأصبهاني', version: 'كامل' },
        ],
        downloadNote: 'تحميل التلاوات كاملة للاستماع بدون إنترنت مع عرض الحجم والسرعة.',
    },
    books: {
        title: 'ثلاثة وستون كتاباً ومرجعاً',
        subtitle: 'صفحة الآية تجمع التفاسير وعلوم القرآن والقراءات والترجمات في مكان واحد.',
        categories: [
            {
                key: 'tafseer',
                title: 'التفاسير',
                count: '17 تفسيراً',
                samples: [
                    'تفسير ابن كثير',
                    'تفسير الطبري',
                    'تفسير القرطبي',
                    'تفسير السعدي',
                    'تفسير البغوي',
                    'التفسير الميسّر',
                    'المختصر في التفسير',
                    'التحرير والتنوير',
                    'تفسير الجلالين',
                    'زاد المسير لابن الجوزي',
                    'المحرر الوجيز لابن عطية',
                    'النسفي (مدارك التنزيل)',
                    'نظم الدرر للبقاعي',
                    'أضواء البيان للشنقيطي',
                ],
            },
            {
                key: 'sciences',
                title: 'علوم القرآن',
                count: '10 كتب',
                samples: [
                    'أسباب النزول للواحدي',
                    'إعراب القرآن للدعّاس',
                    'الجدول في إعراب القرآن وصرفه',
                    'الدر المصون للسمين الحلبي',
                    'الميسر في غريب القرآن',
                    'النشر في القراءات العشر لابن الجزري',
                    'الوقف والابتداء',
                    'متشابهات الألفاظ',
                ],
            },
            {
                key: 'qiraat',
                title: 'القراءات',
                count: '22 كتاباً',
                samples: [
                    'رواية قالون عن نافع',
                    'رواية ورش عن نافع',
                    'قراءة ابن كثير',
                    'قراءة أبي عمرو',
                    'قراءة ابن عامر',
                    'رواية شعبة عن عاصم',
                    'قراءة حمزة',
                    'قراءة الكسائي',
                    'قراءة أبي جعفر',
                    'قراءة يعقوب',
                    'قراءة خلف العاشر',
                    'العشر الصغرى',
                    'تيسير العشر',
                    'شواهد طيبة النشر',
                ],
            },
            {
                key: 'translations',
                title: 'الترجمات',
                count: '14 ترجمة',
                samples: [
                    'الإنجليزية — الهلالي وخان',
                    'Saheeh International',
                    'Pickthall',
                    'الفرنسية',
                    'الألمانية (Abu Rida)',
                    'الروسية',
                    'التركية',
                    'الإندونيسية',
                    'الماليزية',
                    'الأوردية',
                    'الفارسية',
                    'الهولندية',
                    'الأذرية',
                    'الترجمة الصوتية (Phonetic)',
                ],
            },
        ],
    },
    sciences: {
        title: 'دراسة معمّقة للكلمة والآية',
        subtitle: 'انقر أي كلمة لتفتح صفحتها، وتصفّح خمس تبويبات تكشف معناها وصرفها وإعرابها وقراءاتها وترجماتها.',
        items: [
            { title: 'المعنى', body: 'قاموس مفردات القرآن — كلماتٌ غريبة بمعانٍ موجزة وواضحة.' },
            { title: 'الصرف', body: 'تحليل صرفي تفصيلي يكشف بنية الكلمة وأصلها واشتقاقاتها.' },
            { title: 'الإعراب', body: 'إعراب نحوي دقيق للآية والكلمة من مصادر متخصّصة.' },
            { title: 'القراءات', body: 'القراءات المختلفة من القرّاء العشرة، وفرش بألوان توضّح الفروق.' },
            { title: 'الترجمات', body: 'أكثر من ١٤ ترجمة معتمدة بلغات العالم الكبرى.' },
        ],
    },
    gestures: {
        title: 'تحكُّم لمسي طبيعي ومرن',
        subtitle: 'كلّ إيماءة قابلة للتفعيل والتعطيل، وكثيرٌ منها قابل لإعادة التعريف.',
        items: [
            { gesture: 'السحب يميناً ويساراً', action: 'تقليب الصفحات' },
            { gesture: 'السحب على الحافتين', action: 'ضبط إضاءة الشاشة' },
            { gesture: 'فتل الإصبعين', action: 'تكبير الصفحة' },
            { gesture: 'النقرة على الآية', action: 'فتح صفحة الآية' },
            { gesture: 'الضغط المطوّل على الآية', action: 'عرض الهامش (هَمْش)' },
            { gesture: 'النقر على الكلمة', action: 'فتح صفحة الكلمة' },
            { gesture: 'النقر على وسط الصفحة', action: 'إخفاء/إظهار الأشرطة' },
            { gesture: 'السحب من الوسط', action: 'فهرس السور / البحث' },
            { gesture: 'دولاب الفأرة وأسهم لوحة المفاتيح', action: 'التنقّل على الحاسب والويب' },
        ],
    },
    downloads: {
        title: 'حمّل التطبيق على جهازك',
        subtitle: 'متاح على الأندرويد والآيفون والآيباد والويندوز والماك والويب — وبدعم كامل للقراءة بدون إنترنت.',
        platforms: {
            android: 'تنزيل من Google Play',
            ios: 'تنزيل من App Store',
            windows: 'تنزيل لويندوز',
            mac: 'تنزيل لماك',
        },
        winNote: 'يعمل على ويندوز 10 فما فوق',
        macNote: 'بعد فك الضغط، انقر بالزر الأيمن واختر «فتح»',
    },
    tech: {
        title: 'تقنية متينة، بنية مفتوحة للتوسع',
        subtitle: 'بُني التطبيق ببنية معيارية تسمح بإضافة مصاحف وقراء وكتب مرجعية بسرعة.',
        bullets: [
            'يعمل بدون إنترنت بالكامل بعد التحميل الأولي',
            '15 خدمة فهرسة منفصلة لكل مصحف — دون مساومة بين القراءات',
            'متاح على Android و iOS والويب (PWA / حاسب)',
            'تخطيط عربي من اليمين إلى اليسار من الدرجة الأولى مع دعم كامل للإنجليزية',
            'تحديثات بيانات منفصلة (نص المصحف، فهرس البحث، فرش القراءات، الكلمات)',
        ],
    },
    footer: {
        about: 'تطبيق حامل القرآن من إنتاج الورشة الرقمية للتطبيقات.',
        creditsTitle: 'الشكر والاعتراف',
        credits: [
            { label: 'الناشر', value: 'الورشة الرقمية للتطبيقات' },
            { label: 'البرمجة والتصميم', value: 'م. كريم مجدي' },
            { label: 'مصاحف خَير زاد', value: 'الشيخ علي بن عبد المنعم صالح' },
            { label: 'مصحف التجويد', value: 'دار المعرفة (كافة الحقوق محفوظة)' },
            { label: 'فرش القراءات والهوامش', value: 'إعداد م/ محمد شلبي وفريق متخصّص' },
            { label: 'التفاسير', value: 'الباحث القرآني — مركز تفسير للدراسات القرآنية' },
        ],
        sourcesTitle: 'مصادر الصوت والبيانات',
        sources: [
            'المكتبة الصوتية للقرآن الكريم (mp3quran.net)',
            'كل آية (everyayah.com)',
            'المصحف الإلكتروني — جامعة الملك سعود',
            'قراءات صوتية (sound.quraat.info)',
            'موقع جمهرة العلوم — معاني الكلمات والصرف والنحو',
            'القرآن العظيم — وقف الراجحي — بيانات الوقف والابتداء',
        ],
        rights: '© الورشة الرقمية للتطبيقات — جميع الحقوق محفوظة.',
    },
    common: {
        placeholder: 'مكان مخصّص للصورة',
        screenshot: 'لقطة شاشة',
        comingSoon: 'قريباً',
    },
};

const en: Dict = {
    meta: {
        title: 'Wursha QuranHolder — Read, Recite, Study, and Memorize the Quran',
        description:
            '15 authentic Mushaf editions, 68 reciters, 63 reference books and translations, side-by-side qira’at, and word-level grammatical analysis — all in one app.',
    },
    nav: {
        features: 'Features',
        editions: 'Editions',
        reciters: 'Reciters',
        books: 'Books & Tafseers',
        downloads: 'Download',
        switchLang: 'العربية',
    },
    hero: {
        eyebrow: 'Wursha QuranHolder — by Wursha Digital Apps',
        title: 'A complete companion for the Quran',
        titleHighlight: 'reading, reciting, studying, and memorizing.',
        subtitle:
            '15 authentic Mushaf editions, 68 world-class reciters, 15+ classical and modern tafseers, side-by-side qira’at, and word-by-word morphological and grammatical analysis — fully offline-capable after the initial download.',
        ctaPrimary: 'Get the app',
        ctaSecondary: 'Explore features',
        screenshotAlt: 'Screenshot of Wursha QuranHolder',
    },
    stats: {
        editions: '15',
        editionsLabel: 'Authentic Mushaf editions',
        reciters: '68',
        recitersLabel: 'Curated reciters',
        books: '63',
        booksLabel: 'Books, tafseers, translations',
        features: '78+',
        featuresLabel: 'User-facing features',
    },
    audiences: {
        title: 'Built for four kinds of readers',
        subtitle: 'A single app that goes deep for each audience — without compromise.',
        items: [
            {
                title: 'The daily reader',
                body: 'A beautiful, fully customizable digital mushaf — colors, fonts, layout, and gentle touch gestures for the daily wird.',
            },
            {
                title: 'Memorizers (huffaz)',
                body: 'Multiple tracks (khatmahs), automatic position saving, verse repetition, configurable verse pauses, and precise review tools.',
            },
            {
                title: 'Students of Quranic sciences',
                body: 'Farsh of the ten qira’at, i’rab, sarf, asbab al-nuzul, waqf markers, and 22+ specialized qira’at references.',
            },
            {
                title: 'Non-Arabic speakers',
                body: '14+ authoritative translations, plus a recited English translation by Sahih International for deeper understanding.',
            },
        ],
    },
    features: {
        title: 'Countless features in one app',
        subtitle: '78+ thoughtful features across 11 categories — for reading, listening, study, and memorization.',
        categories: [
            {
                id: 'reading',
                title: 'Reading & display',
                count: 8,
                blurb:
                    'Full-screen mushaf with multiple layouts, custom themes, seven font families, and configurable day and night palettes.',
                highlights: [
                    'Portrait and landscape layouts',
                    'Light, night, and auto themes',
                    '7 fonts (Amiri, Uthmani, Naskh, Ruqaa, Scheherazade…)',
                    'Keep screen on during reading',
                ],
            },
            {
                id: 'navigation',
                title: 'Navigation',
                count: 6,
                blurb: 'Jump to any sura, juz’, rub’, or page — by name, number, or page.',
                highlights: [
                    'All 114 suras with search',
                    'All 30 juz’ and 120 quarters',
                    'Direct page jump (1–604)',
                    'Configurable auto-scroll',
                ],
            },
            {
                id: 'tracks',
                title: 'Tracks & progress',
                count: 3,
                blurb: 'Create multiple reading tracks (daily wird, memorization, qiyam, review) and resume automatically.',
                highlights: ['Multiple tracks with custom colors', 'Auto-save last page per track', 'Visual progress indicator'],
            },
            {
                id: 'bookmarks',
                title: 'Bookmarks & notes',
                count: 4,
                blurb: 'Page and verse bookmarks, personal notes scoped to each track, plus export and share.',
                highlights: [
                    'One-tap page bookmarks',
                    'Per-verse bookmarks for deep study',
                    'Track-scoped personal notes',
                    'Export bookmarks and notes as text',
                ],
            },
            {
                id: 'audio',
                title: 'Audio & recitation',
                count: 10,
                blurb:
                    'Listen to 68 reciters, repeat any range, control speed, and stop on sura, juz’, page, or after a duration.',
                highlights: [
                    'Repeat verse, sura, or custom range',
                    'Configurable pause between verses',
                    'Playback speed (1×, 1.25×, 1.5×…)',
                    'Auto-highlight and follow-along scroll',
                    'Download recitations for offline listening',
                    'Stop on sura, page, quarter, hizb, juz’, or duration',
                ],
            },
            {
                id: 'search',
                title: 'Search & reference',
                count: 7,
                blurb: 'Full-text search across four modes: plain, with diacritics, Uthmani, and root-based.',
                highlights: [
                    'Pattern search (wildcard / regex)',
                    'Whole-word matching',
                    'Restrict to current sura',
                    'Full verse details page',
                ],
            },
            {
                id: 'sciences',
                title: 'Quranic sciences',
                count: 10,
                blurb: 'Word-level morphology and grammar, 15+ tafseers, color-coded farsh of qira’at, and asbab al-nuzul.',
                highlights: [
                    'Word page (meaning, sarf, i’rab)',
                    'Readings from the ten reciters',
                    'Asbab al-nuzul (Al-Wahidi & others)',
                    'Waqf and ibtida’ markers',
                    'Color-coded farsh rules',
                ],
            },
            {
                id: 'customization',
                title: 'Customization & settings',
                count: 10,
                blurb: 'Switch among 15 editions, configure gestures, lock orientation, and use keyboard and mouse on desktop.',
                highlights: [
                    'Reciters filtered per riwaya',
                    'Per-gesture toggles',
                    'Mouse wheel & arrow-key support',
                    'Arabic and English UI',
                ],
            },
            {
                id: 'tools',
                title: 'Tools & extras',
                count: 9,
                blurb: 'Curated supplications, settings import/export, data updates, share, and one-tap copy.',
                highlights: [
                    'Du’a from Quran and Sunna',
                    'JSON import/export of settings & bookmarks',
                    'Share verses and notes',
                    'Interactive onboarding tour',
                ],
            },
            {
                id: 'gestures',
                title: 'Gestures & interaction',
                count: 5,
                blurb: 'Swipe to turn, pinch to zoom, long-press for margins, and tap center to hide UI.',
                highlights: [
                    'Swipe left/right between pages',
                    'Pinch-to-zoom',
                    'Long-press to view margin notes',
                    'Center tap toggles UI bars',
                ],
            },
            {
                id: 'editions',
                title: 'Edition-specific features',
                count: 4,
                blurb: 'Tajweed coloring, word coordinates, and comparative margins between qira’at — per edition.',
                highlights: [
                    'Madina mushaf (default Uthmani)',
                    'Tajweed mushaf with color rules',
                    'Shamarli mushaf with wide margins',
                    'Hafs, Warsh, Qalon, Sho’ba support…',
                ],
            },
        ],
    },
    editions: {
        title: '15 authentic Mushaf editions',
        subtitle:
            'Two main collections: “Hamil al-Quran” for breadth across qira’at, and “Khair Zad” for memorizers. Each ships with farsh, color legends, and comparative margins.',
        collections: [
            {
                name: 'Hamil al-Quran',
                description: 'A wide collection in Uthmani script covering major qira’at and riwayat.',
                items: ['Madina', 'Shamarli', 'Tajweed', 'Sho’ba', 'Abu Ja’far', 'Ibn Kathir', 'Ibn Aamer', 'Ibn Dhakwan', 'Asbahani'],
            },
            {
                name: 'Khair Zad',
                description: 'A memorizer-focused series with a structured pedagogical approach.',
                items: ['Hafs', 'Warsh', 'Qalon', 'Asim & Ibn Aamer', 'Tayseer of the Ten'],
            },
        ],
        list: [
            { code: 'Madina', name: 'Madina Mushaf', note: 'Uthmani script with word coordinates. Baseline for comparisons.', isDefault: true },
            { code: 'Hafs', name: 'Khair Zad: Hafs', note: 'Hafs riwaya with the Khair Zad memorization curriculum.' },
            { code: 'Warsh', name: 'Khair Zad: Warsh', note: 'Warsh an Nafi’ with color-coded variants vs. Hafs.' },
            { code: 'Qalon', name: 'Khair Zad: Qalon', note: 'Qalon an Nafi’ within the Khair Zad project.' },
            { code: 'Shoba', name: 'Sho’ba Mushaf', note: 'Sho’ba an Asim, clean white background.' },
            { code: 'Tjwid', name: 'Tajweed Mushaf', note: 'Letter-level color coding of tajweed rules (Dar Al-Ma’arifah).' },
            { code: 'Shmrly', name: 'Shamarli Mushaf', note: 'Shamarli script with wide hamish margins.' },
            { code: 'Aamer', name: 'Khair Zad: Asim & Ibn Aamer', note: 'Comparative edition with Asim and Ibn Aamer side-by-side.' },
            { code: 'Jafar', name: 'Abu Ja’far Mushaf', note: 'Abu Ja’far qira’a with comparative margins.' },
            { code: 'Asbhani', name: 'Asbahani (Al-Misbah)', note: 'Asbahani with color-coded variants from Hafs.' },
            { code: 'Kathir', name: 'Ibn Kathir Mushaf', note: 'Ibn Kathir qira’a with margin variants.' },
            { code: 'IbnAaamer', name: 'Ibn Aamer Mushaf', note: 'Ibn Aamer riwaya with comprehensive variant coloring.' },
            { code: 'Thkwan', name: 'Ibn Dhakwan Riwaya', note: 'Ibn Dhakwan from Ibn Aamer with color legend.' },
            { code: 'Twst', name: 'Tayseer (Moderate Readers)', note: 'Tayseer of the ten qira’at; agreed and disputed readings, Hisham’s waqf, imala.' },
            { code: 'Libya', name: 'Qalon (Libya)', note: 'Libyan Qalon variant with its own data schema.' },
        ],
        crossNote: 'Most editions support color legends, comparative margins between qira’at, waqf markers, and the manhaj curriculum view.',
    },
    reciters: {
        title: '68 reciters across riwayat and qira’at',
        subtitle:
            'Each reciter is paired with a riwaya, an edition (Murattal, Mujawwad, Teacher, Broadcast, Complete), and a high-quality CDN. You can also add a custom reciter URL.',
        riwayatTitle: 'Riwayat & Qira’at covered',
        riwayat: [
            { name: 'Hafs an Asim', sub: 'Most common' },
            { name: 'Warsh an Nafi’' },
            { name: 'Qalon an Nafi’' },
            { name: 'Sho’ba an Asim' },
            { name: 'Ad-Duri an Abi Amr' },
            { name: 'As-Susi an Abi Amr' },
            { name: 'Al-Asbahani' },
            { name: 'Hamza’s narrations' },
            { name: 'Al-Kobra & As-Soghra', sub: 'The ten qira’at' },
            { name: 'Aspects of Qalon & Warsh' },
        ],
        sourcesTitle: 'Audio sources',
        sources: [
            { name: 'mp3quran.net', sub: 'Primary CDN — up to 192 kbps' },
            { name: 'everyayah.com', sub: 'Verse-by-verse alternative source' },
            { name: 'quran.ksu.edu.sa', sub: 'King Saud University' },
            { name: 'sound.quraat.info', sub: 'Classical and qira’at-specialized library' },
            { name: 'wursha-backup.github.io', sub: 'Custom backup for Al-Husary' },
        ],
        featuredTitle: 'Featured reciters',
        featured: [
            { name: 'Mahmoud Khalil Al-Husary', riwaya: 'Hafs an Asim', version: 'Murattal / Mujawwad / Broadcast / Teacher' },
            { name: 'Muhammad Siddiq Al-Minshawi', riwaya: 'Hafs an Asim', version: 'Murattal / Mujawwad / Teacher' },
            { name: 'Abd al-Basit Abd as-Samad', riwaya: 'Hafs / Warsh', version: 'Murattal / Mujawwad' },
            { name: 'Mishari Rashid Al-Afasy', riwaya: 'Hafs an Asim', version: 'Murattal' },
            { name: 'Yasser Al-Dossary', riwaya: 'Hafs an Asim', version: 'Murattal' },
            { name: 'Saud Ash-Shuraym', riwaya: 'Hafs an Asim', version: 'Murattal' },
            { name: 'Ahmad Talba', riwaya: 'Al-Kobra', version: 'Complete' },
            { name: 'Ibrahim Al-Maghribi', riwaya: 'Al-Asbahani', version: 'Complete' },
        ],
        downloadNote: 'Download full recitations for offline listening with progress, speed, and storage usage.',
    },
    books: {
        title: '63 books and references',
        subtitle: 'The Aya panel brings tafseers, sciences, qira’at, and translations into one place.',
        categories: [
            {
                key: 'tafseer',
                title: 'Tafseer',
                count: '17 works',
                samples: [
                    'Ibn Kathir',
                    'At-Tabari',
                    'Al-Qurtubi',
                    'As-Sa’di',
                    'Al-Baghawi',
                    'Al-Muyassar',
                    'Al-Mukhtasar',
                    'At-Tahrir wat-Tanwir',
                    'Al-Jalalayn',
                    'Zad Al-Maseer (Ibn al-Jawzi)',
                    'Al-Muharrar Al-Wajeez (Ibn Atiyya)',
                    'An-Nasafi',
                    'Nazm Ad-Durar (Al-Biqa’i)',
                    'Adwa’ Al-Bayan (Ash-Shanqiti)',
                ],
            },
            {
                key: 'sciences',
                title: 'Quranic sciences',
                count: '10 works',
                samples: [
                    'Asbab An-Nuzul (Al-Wahidi)',
                    'I’rab Al-Quran (Ad-Daa’as)',
                    'Al-Jadwal in I’rab and Sarf',
                    'Ad-Durr Al-Masun (As-Samin Al-Halabi)',
                    'Al-Muyassar in Gharib',
                    'An-Nashr in the Ten Qira’at (Ibn Al-Jazari)',
                    'Al-Waqf wa Al-Ibtida’',
                    'Mutashabihat Al-Alfaz',
                ],
            },
            {
                key: 'qiraat',
                title: 'Qira’at',
                count: '22 works',
                samples: [
                    'Riwayat Qalon an Nafi’',
                    'Riwayat Warsh an Nafi’',
                    'Qira’at Ibn Kathir',
                    'Qira’at Abi Amr',
                    'Qira’at Ibn Aamer',
                    'Riwayat Sho’ba an Asim',
                    'Qira’at Hamza',
                    'Qira’at Al-Kisa’i',
                    'Qira’at Abi Ja’far',
                    'Qira’at Ya’qub',
                    'Qira’at Khalaf Al-Aashir',
                    'Al-Ashr As-Soghra',
                    'Tayseer Al-Ashr',
                    'Shawahid Tayyibat An-Nashr',
                ],
            },
            {
                key: 'translations',
                title: 'Translations',
                count: '14 languages',
                samples: [
                    'English — Hilali & Khan',
                    'Saheeh International',
                    'Pickthall',
                    'French',
                    'German (Abu Rida)',
                    'Russian',
                    'Turkish',
                    'Indonesian',
                    'Malay',
                    'Urdu',
                    'Farsi',
                    'Dutch',
                    'Azerbaijani',
                    'Phonetic transliteration',
                ],
            },
        ],
    },
    sciences: {
        title: 'Deep word and verse study',
        subtitle: 'Tap any word to open its page — five tabs reveal meaning, morphology, parsing, qira’at, and translations.',
        items: [
            { title: 'Meaning', body: 'A Quranic vocabulary dictionary with concise, clear definitions for unusual words.' },
            { title: 'Sarf (Morphology)', body: 'Detailed morphological analysis: word structure, root, and derivations.' },
            { title: 'I’rab (Parsing)', body: 'Precise grammatical parsing of the verse and its words from specialist sources.' },
            { title: 'Qira’at', body: 'Variant readings from the ten reciters with color-coded farsh notes.' },
            { title: 'Translations', body: '14+ authoritative translations covering the world’s major languages.' },
        ],
    },
    gestures: {
        title: 'Natural, flexible touch control',
        subtitle: 'Every gesture can be toggled — and many can be remapped.',
        items: [
            { gesture: 'Swipe left/right', action: 'Turn pages' },
            { gesture: 'Edge swipe up/down', action: 'Adjust screen brightness' },
            { gesture: 'Pinch', action: 'Zoom into the page' },
            { gesture: 'Tap on a verse', action: 'Open the verse page' },
            { gesture: 'Long-press a verse', action: 'Show margin notes (hamsh)' },
            { gesture: 'Tap on a word', action: 'Open the word page' },
            { gesture: 'Tap center', action: 'Toggle UI bars' },
            { gesture: 'Swipe from center', action: 'Suras index / search' },
            { gesture: 'Mouse wheel & arrow keys', action: 'Desktop and web navigation' },
        ],
    },
    downloads: {
        title: 'Get the app',
        subtitle: 'Available on Android, iPhone/iPad, Windows, macOS, and the web — fully offline-capable after the first download.',
        platforms: {
            android: 'Get it on Google Play',
            ios: 'Download on the App Store',
            windows: 'Download for Windows',
            mac: 'Download for macOS',
        },
        winNote: 'Works on Windows 10 and above',
        macNote: 'After unzipping, right-click and choose “Open”',
    },
    tech: {
        title: 'Solid engineering, modular architecture',
        subtitle: 'Built on a service-based architecture so editions, reciters, and references can be added quickly.',
        bullets: [
            'Fully offline-capable after the initial download',
            '15 dedicated edition index services — no compromise across qira’at',
            'Available on Android, iOS, and the web (PWA / desktop)',
            'First-class Arabic RTL with full English support',
            'Independent data updates (Quran text, search index, farsh, words)',
        ],
    },
    footer: {
        about: 'Wursha QuranHolder is published by Wursha Digital Apps.',
        creditsTitle: 'Credits & acknowledgements',
        credits: [
            { label: 'Publisher', value: 'Wursha Digital Apps' },
            { label: 'Engineering & design', value: 'Eng. Karim Magdy' },
            { label: 'Khair Zad mushafs', value: 'Sheikh Ali ibn Abd al-Mun’im Saleh' },
            { label: 'Tajweed Mushaf', value: 'Dar Al-Ma’arifah (all rights reserved)' },
            { label: 'Farsh and margins', value: 'Eng. Muhammad Shalaby & a specialized team' },
            { label: 'Tafseers', value: 'Al-Bahith Al-Qurani — Tafseer Center for Quranic Studies' },
        ],
        sourcesTitle: 'Audio & data sources',
        sources: [
            'mp3quran.net — Quran audio library',
            'everyayah.com',
            'King Saud University Electronic Mushaf',
            'sound.quraat.info — qira’at audio',
            'jamharat-uloom.org — word meanings, sarf, and grammar',
            'Al-Quran Al-Adheem — Al-Rajhi Endowment — waqf data',
        ],
        rights: '© Wursha Digital Apps — all rights reserved.',
    },
    common: {
        placeholder: 'Image placeholder',
        screenshot: 'Screenshot',
        comingSoon: 'Coming soon',
    },
};

export const TRANSLATIONS: Record<Lang, Dict> = { ar, en };
