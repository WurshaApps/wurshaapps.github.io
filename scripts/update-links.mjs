#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = 'WurshaApps/QuranHolder_Releases';
const TARGET = 'src/app/app.component.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

async function fetchReleases() {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, {
        headers: { 'User-Agent': 'wursha-update-links', Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    return res.json();
}

function pickLatestForPrefix(releases, prefix) {
    const match = releases.find(
        (r) => !r.draft && !r.prerelease && r.tag_name.startsWith(`${prefix}-v`),
    );
    if (!match) throw new Error(`No release found for prefix '${prefix}'`);
    const dmg = match.assets.find((a) => a.name.endsWith('.dmg'));
    const exe = match.assets.find((a) => a.name.endsWith('.exe'));
    if (!dmg) throw new Error(`No .dmg asset in ${match.tag_name}`);
    if (!exe) throw new Error(`No .exe asset in ${match.tag_name}`);
    return { tag: match.tag_name, mac: dmg.browser_download_url, windows: exe.browser_download_url };
}

async function main() {
    const path = join(root, TARGET);
    let content = await readFile(path, 'utf8');

    const prefixes = [...content.matchAll(/image: '(\w+)\.png'/g)].map((m) => m[1]);
    if (prefixes.length === 0) throw new Error(`No apps found in ${TARGET}`);

    const releases = await fetchReleases();

    let changed = false;
    for (const prefix of prefixes) {
        const { tag, mac, windows } = pickLatestForPrefix(releases, prefix);
        const blockRe = new RegExp(
            `(image: '${prefix}\\.png'[\\s\\S]*?)mac: '[^']*',(\\s+)windows: '[^']*',`,
        );
        if (!blockRe.test(content)) throw new Error(`Block not found for ${prefix}`);
        const next = content.replace(blockRe, `$1mac: '${mac}',$2windows: '${windows}',`);
        if (next !== content) changed = true;
        content = next;
        console.log(`${prefix}: ${tag}`);
    }

    if (changed) {
        await writeFile(path, content);
        console.log(`Updated ${TARGET}`);
    } else {
        console.log('Already up to date.');
    }
}

main().catch((e) => {
    console.error(e.message);
    process.exit(1);
});
