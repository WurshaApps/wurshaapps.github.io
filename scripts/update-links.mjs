#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = 'WurshaApps/QuranHolder_Releases';
const TARGET = 'content/apps.json';

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
    const version = match.tag_name.slice(prefix.length + 2); // strip "<prefix>-v"
    return {
        tag: match.tag_name,
        version,
        mac: dmg.browser_download_url,
        windows: exe.browser_download_url,
    };
}

function compareSemver(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
        if (diff !== 0) return diff;
    }
    return 0;
}

async function main() {
    const path = join(root, TARGET);
    const original = await readFile(path, 'utf8');
    const catalog = JSON.parse(original);

    if (!Array.isArray(catalog.apps) || catalog.apps.length === 0) {
        throw new Error(`No apps[] found in ${TARGET}`);
    }

    const releases = await fetchReleases();

    let highestVersion = null;
    for (const app of catalog.apps) {
        if (typeof app.image !== 'string' || !app.image.endsWith('.png')) {
            throw new Error(`App '${app.id}' is missing a .png image filename`);
        }
        const prefix = app.image.replace(/\.png$/, '');
        const { tag, version, mac, windows } = pickLatestForPrefix(releases, prefix);

        app.urls = app.urls ?? {};
        app.urls.mac = mac;
        app.urls.windows = windows;

        if (!highestVersion || compareSemver(version, highestVersion) > 0) {
            highestVersion = version;
        }

        console.log(`${app.id} (${prefix}): ${tag}`);
    }

    if (highestVersion) catalog.version = highestVersion;

    const next = JSON.stringify(catalog, null, 4) + '\n';
    if (next !== original) {
        await writeFile(path, next);
        console.log(`Updated ${TARGET} → version ${catalog.version}`);
    } else {
        console.log('Already up to date.');
    }
}

main().catch((e) => {
    console.error(e.message);
    process.exit(1);
});
