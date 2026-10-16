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
if (failed) process.exit(1);
console.log('content: all locales match en.json');
