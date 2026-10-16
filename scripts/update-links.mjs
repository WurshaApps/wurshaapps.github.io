#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = 'WurshaApps/QuranHolder_Releases';
const TARGET = 'content/apps.json';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

async function fetchReleases() {
    const headers = { 'User-Agent': 'wursha-update-links', Accept: 'application/vnd.github+json' };
    // Optional: CI runners share IPs, so unauthenticated calls hit the rate limit quickly.
    const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    return res.json();
}

// Newest published release per platform, so a mac-only or windows-only release
// updates its own link without blanking or failing the other one.
function pickLatestForPrefix(releases, prefix) {
    const published = releases.filter(
        (r) => !r.draft && !r.prerelease && r.tag_name.startsWith(`${prefix}-v`),
    );
    if (published.length === 0) throw new Error(`No release found for prefix '${prefix}'`);
    const latestWith = (ext) => {
        for (const r of published) {
            const asset = r.assets.find((a) => a.name.endsWith(ext));
            if (asset) return { tag: r.tag_name, url: asset.browser_download_url };
        }
        throw new Error(`No ${ext} asset in any '${prefix}' release`);
    };
    const mac = latestWith('.dmg');
    const windows = latestWith('.exe');
    const version = published[0].tag_name.slice(prefix.length + 2); // strip "<prefix>-v"
    return {
        tag: mac.tag === windows.tag ? mac.tag : `mac ${mac.tag}, windows ${windows.tag}`,
        version,
        mac: mac.url,
        windows: windows.url,
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
        // Editions without desktop builds (hafs) have no release prefix.
        if (!app.release) continue;
        const prefix = app.release;
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
