#!/usr/bin/env node
// Checks every content/<lang>.json against content/en.json: same keys, same scenes in the same order,
// non-empty strings, balanced *highlight* marks. Runs before `ng build` (package.json "prebuild").
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'content');
const master = JSON.parse(readFileSync(join(dir, 'en.json'), 'utf8'));
// Lists whose length may differ by language (book names, credits…). Everything else must match en.
const FREE_LENGTH = /^(library\.groups\.\d+\.items|footer\.(credits|sources)|story\.scenes\.\d+\.items)$/;
const MAY_BE_EMPTY = new Set(['story.screensNote']);
// Optional per language: a scene note (e.g. "the audio menu is in Arabic" is pointless in Arabic).
const OPTIONAL = new Set(['note']);

function compare(ref, val, path, errors) {
    const at = path.join('.');
    if (Array.isArray(ref)) {
        if (!Array.isArray(val)) return errors.push(`${at}: expected a list`);
        if (!FREE_LENGTH.test(at) && val.length !== ref.length) errors.push(`${at}: ${val.length} items, en has ${ref.length}`);
        val.forEach((v, i) => compare(ref[Math.min(i, ref.length - 1)], v, [...path, i], errors));
    } else if (ref && typeof ref === 'object') {
        if (!val || typeof val !== 'object' || Array.isArray(val)) return errors.push(`${at}: expected an object`);
        for (const k of Object.keys(ref)) if (!(k in val) && !OPTIONAL.has(k)) errors.push(`${at ? at + '.' : ''}${k}: missing`);
        for (const k of Object.keys(val)) {
            if (!(k in ref)) {
                if (!OPTIONAL.has(k)) errors.push(`${at ? at + '.' : ''}${k}: not in en.json`);
            }
            else compare(ref[k], val[k], [...path, k], errors);
        }
    } else if (typeof ref === 'string') {
        if (typeof val !== 'string') return errors.push(`${at}: expected text`);
        if (!val.trim() && !MAY_BE_EMPTY.has(at) && at !== '$schema') errors.push(`${at}: empty`);
        if ((val.match(/\*/g) ?? []).length % 2) errors.push(`${at}: unbalanced *highlight* marks`);
    }
}

let failed = false;
for (const file of readdirSync(dir).filter((f) => /^[a-z]{2}\.json$/.test(f))) {
    const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    const errors = [];
    compare(master, data, [], errors);
    // Scenes: same ids in the same order.
    const ids = (s) => (s?.story?.scenes ?? []).map((x) => x.id).join(',');
    if (ids(data) !== ids(master)) errors.push(`story.scenes: ids ${ids(data)} ≠ en ${ids(master)}`);
    if (errors.length) {
        failed = true;
        console.error(`${file}\n  ${errors.join('\n  ')}`);
    }
}
// blog.json: unique slugs, newest first, English and Arabic text for every post, no empty text.
const LANGS = readdirSync(dir).filter((f) => /^[a-z]{2}\.json$/.test(f)).map((f) => f.slice(0, 2));
const blog = JSON.parse(readFileSync(join(dir, 'blog.json'), 'utf8'));
const errors = [];
const slugs = new Set();
blog.posts.forEach((post, i) => {
    const at = `posts.${i} (${post.slug})`;
    if (!/^[a-z0-9-]+$/.test(post.slug ?? '')) errors.push(`${at}: slug must be lowercase letters, digits and dashes`);
    if (slugs.has(post.slug)) errors.push(`${at}: slug used twice`);
    slugs.add(post.slug);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date ?? '')) errors.push(`${at}: date must be YYYY-MM-DD`);
    if (i > 0 && post.date > blog.posts[i - 1].date) errors.push(`${at}: newer than the post above it (newest first)`);
    for (const lang of ['en', 'ar']) if (!post.text?.[lang]) errors.push(`${at}: no ${lang} text`);
    for (const [lang, text] of Object.entries(post.text ?? {})) {
        if (!LANGS.includes(lang)) errors.push(`${at}.text.${lang}: not a site language`);
        const empty = [text.title, text.summary, ...(text.sections ?? []).flatMap((s) => [s.title, s.intro ?? 'x', ...s.items])]
            .some((s) => typeof s !== 'string' || !s.trim());
        if (empty || !text.sections?.length) errors.push(`${at}.text.${lang}: missing or empty text`);
    }
});
if (errors.length) {
    failed = true;
    console.error(`blog.json\n  ${errors.join('\n  ')}`);
}

if (failed) process.exit(1);
console.log('content: all locales match en.json, blog.json is complete');
