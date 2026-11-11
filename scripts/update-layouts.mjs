#!/usr/bin/env node
// Writes content/layouts.json from the apps' live Mushaf layout catalog: which layouts each edition offers
// (its bundled layout first, then the ones it downloads) and every listed layout's Arabic and English name.
// The catalog's allow-lists come from wursha-layouts' catalog-rules.json (app repo specs/mushaf-layouts.md §4.1a);
// run this after a layout is published or a rule changes.
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CATALOG = 'https://data.wursha.com/catalog.json';
// Site edition id → the catalog's edition key.
const EDITIONS = { madina: 'Madina', tajweed: 'Tjwid', warsh: 'Warsh', qalon: 'Qalon', shamarli: 'Shmrly' };
const target = join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'layouts.json');

const res = await fetch(CATALOG);
if (!res.ok) throw new Error(`${CATALOG}: HTTP ${res.status}`);
const catalog = await res.json();

const editions = {};
const used = new Set();
for (const [id, key] of Object.entries(EDITIONS)) {
    const entry = catalog.editions[key];
    if (!entry) throw new Error(`catalog has no edition ${key}`);
    const keys = [entry.defaultLayout, ...entry.allow.filter((k) => k !== entry.defaultLayout)];
    for (const k of keys) if (!catalog.layouts[k]) throw new Error(`${key} allows ${k}, which the catalog doesn't list`);
    editions[id] = keys;
    keys.forEach((k) => used.add(k));
}
const layouts = Object.fromEntries(
    [...used].sort().map((k) => {
        const { name } = catalog.layouts[k];
        return [k, { ar: name.ar, en: name.en }];
    }),
);

const out = { $schema: './schemas/layouts.schema.json', updatedAt: catalog.updatedAt, editions, layouts };
await writeFile(target, JSON.stringify(out, null, 4) + '\n');
for (const [id, keys] of Object.entries(editions)) console.log(`${id}: ${keys.length} layouts`);
