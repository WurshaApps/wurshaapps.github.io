#!/usr/bin/env node
// Builds the site's images from the store-screenshot output (wursha-store-screenshots skill):
//   public/shots/<set>/<scene>.webp    phone screen cut from the iPhone final (caption band and bezel removed)
//   public/shots/<set>/spread.webp     the Mushaf two-page spread from the product-page header (+ spread-800.webp)
// Two sets keep the site light: `en` (English UI) serves LTR languages, `ar` (Arabic UI) serves RTL ones;
// captions are page text in every language (see src/app/shared/catalog.ts).
//   public/editions/<id>.webp          one Mushaf page per edition
// Usage: node scripts/import-shots.mjs [--appstore <dir>]
// Needs ImageMagick 7 (`magick`) on PATH. Re-run after every store-screenshot refresh.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name, fallback) => {
    const i = process.argv.indexOf(name);
    return i > 0 ? process.argv[i + 1] : fallback;
};
const APPSTORE = arg('--appstore', join(homedir(), 'work/wursha/store-shots/35.0.3'));

const SETS = {
    ar: { dir: 'rtl', folder: 'ar-SA' },
    en: { dir: 'ltr', folder: 'en-US' },
};
// Store edition folder → apps.json id.
const EDITIONS = { madina: 'madina', hafs: 'hafs', tjwid: 'tajweed', warsh: 'warsh', qalon: 'qalon', shmrly: 'shamarli' };
const SCENES = ['meaning', 'tartil', 'memorize', 'night', 'tracks', 'athkar', 'share'];

// iPhone 6.9" final (1290x2796): the device's size and position depend on the caption, so find the
// bezel (near-black ring) edges: left/right on a row near the bottom, top on a column clear of the
// rounded corner and the island. The bezel is ~3% of the device width.
function grayLine(src, geometry) {
    return magick(src, '-crop', geometry, '+repage', '-colorspace', 'gray', '-depth', '8', 'txt:-')
        .split('\n')
        .slice(1)
        .map((line) => Number(line.match(/\((\d+)/)?.[1] ?? 255));
}
function screenCrop(src) {
    const row = grayLine(src, '1290x1+0+2700');
    const left = row.findIndex((g) => g < 30);
    const right = row.length - 1 - [...row].reverse().findIndex((g) => g < 30);
    if (left < 0 || right <= left) throw new Error(`No device bezel found in ${src}`);
    const bezel = Math.round((right - left) * 0.031);
    const column = grayLine(src, `1x2400+${Math.round(left + (right - left) * 0.25)}+200`);
    const top = 200 + column.findIndex((g) => g < 30);
    const inset = bezel + 4;
    return `${right - left - 2 * inset}x${2796 - top - inset}+${left + inset}+${top + inset}`;
}

const tmp = mkdtempSync(join(tmpdir(), 'wursha-shots-'));
const magick = (...args) => execFileSync('magick', args, { encoding: 'utf8' }).trim();

function cropSpread(header, dir, out, widths) {
    // The spread is on the start side of an RTL header and the end side of an LTR one.
    const half = join(tmp, 'half.png');
    magick(header, '-crop', `2140x1646+${dir === 'rtl' ? 0 : 1700}+0`, '+repage', half);
    // Bounding box of the light page area, padded so the page headers and frame are not clipped.
    const [w, h, x, y] = magick(half, '-colorspace', 'gray', '-threshold', '62%', '-morphology', 'Open', 'Disk:8', '-format', '%@', 'info:')
        .split(/[x+]/)
        .map(Number);
    const box = `${w + 36}x${h + 80}+${x - 18}+${y - 62}`;
    for (const [suffix, width] of widths) {
        magick(half, '-crop', box, '+repage', '-resize', `${width}x`, '-quality', '82', out.replace('.webp', `${suffix}.webp`));
    }
}

let count = 0;
for (const [set, { dir, folder }] of Object.entries(SETS)) {
    const outDir = join(root, 'public/shots', set);
    mkdirSync(outDir, { recursive: true });
    const finals = join(APPSTORE, 'final/iphone/madina', folder);
    for (const [i, scene] of SCENES.entries()) {
        const src = join(finals, `0${i + 2}-${scene}.png`);
        if (!existsSync(src)) continue; // memorize is captured in ar only
        magick(src, '-crop', screenCrop(src), '+repage', '-resize', '560x', '-quality', '80', join(outDir, `${scene}.webp`));
        count++;
    }
    const header = join(APPSTORE, 'creative/madina', folder, 'header.png');
    cropSpread(header, dir, join(outDir, 'spread.webp'), [['', 1400], ['-800', 800]]);
    count += 2;
    console.log(`${set}: ${folder}`);
}

const edDir = join(root, 'public/editions');
mkdirSync(edDir, { recursive: true });
for (const [folder, id] of Object.entries(EDITIONS)) {
    const spread = join(tmp, `${id}.webp`);
    cropSpread(join(APPSTORE, 'creative', folder, 'ar-SA', 'header.png'), 'rtl', spread, [['', 1400]]);
    // The right-hand page of the spread.
    magick(spread, '-gravity', 'east', '-crop', '50%x100%+0+0', '+repage', '-resize', '360x', '-quality', '82', join(edDir, `${id}.webp`));
    count++;
}

rmSync(tmp, { recursive: true, force: true });
console.log(`Wrote ${count} images.`);
