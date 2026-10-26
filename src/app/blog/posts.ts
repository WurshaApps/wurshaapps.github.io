import blog from '@content/blog.json';
import type { Lang } from '../i18n/locales';

/** One language's text of a post. Mirrors `content/schemas/blog.schema.json`. */
export interface PostText {
    title: string;
    summary: string;
    sections: { title: string; intro?: string; items: string[] }[];
}

export interface Post {
    /** `/<lang>/blog/<slug>/` */
    slug: string;
    version: string;
    /** Release date, YYYY-MM-DD. */
    date: string;
    text: Partial<Record<Lang, PostText>> & Record<'en' | 'ar', PostText>;
}

/** Release announcements, newest first, from `content/blog.json`. */
export const POSTS = blog.posts as Post[];

export const findPost = (slug: string | null | undefined): Post | undefined => POSTS.find((p) => p.slug === slug);

/** The post in `lang`, or in English when it has no text in `lang` (the page then shows `blog.langNote`). */
export function postText(post: Post, lang: Lang): { text: PostText; lang: Lang } {
    const text = post.text[lang];
    return text ? { text, lang } : { text: post.text.en, lang: 'en' };
}

/**
 * "25 October 2026" in the page language, written the way `privacy.updated` is: Gregorian calendar
 * everywhere (Persian and Pashto default to the solar one) and Western digits on Arabic pages.
 */
export function formatDate(date: string, lang: Lang): string {
    const locale = lang === 'en' ? 'en-GB' : lang === 'ar' ? 'ar-u-ca-gregory-nu-latn' : `${lang}-u-ca-gregory`;
    return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
