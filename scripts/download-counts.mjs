#!/usr/bin/env node
// Prints how often each desktop edition has been downloaded from WurshaApps/QuranHolder_Releases.
// Installers (.dmg / .exe) are first installs, nearly all of them from this site's download table;
// update packages (.zip / .nupkg) are the apps updating themselves.
//
//   npm run download-counts              totals per edition
//   npm run download-counts -- --versions   one row per release as well
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = 'WurshaApps/QuranHolder_Releases';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

async function fetchAllReleases() {
    const headers = { 'User-Agent': 'wursha-download-counts', Accept: 'application/vnd.github+json' };
    const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    const all = [];
    for (let page = 1; ; page++) {
        const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`, { headers });
        if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
        const batch = await res.json();
        all.push(...batch);
        if (batch.length < 100) return all;
    }
}

function kind(name) {
    if (name.endsWith('.dmg')) return 'mac';
    if (name.endsWith('.exe')) return 'windows';
    if (name.endsWith('.zip') || name.endsWith('.nupkg')) return 'updates';
    return null; // RELEASES and other updater metadata
}

const empty = () => ({ mac: 0, windows: 0, updates: 0 });

function table(rows) {
    const head = ['', 'Mac', 'Windows', 'Installs', 'Updates'];
    const body = rows.map(([label, c]) => [label, c.mac, c.windows, c.mac + c.windows, c.updates].map(String));
    const widths = head.map((h, i) => Math.max(h.length, ...body.map((r) => r[i].length)));
    const line = (r) => r.map((v, i) => (i === 0 ? v.padEnd(widths[i]) : v.padStart(widths[i]))).join('  ');
    return [line(head), ...body.map(line)].join('\n');
}

async function main() {
    const showVersions = process.argv.includes('--versions');
    const catalog = JSON.parse(await readFile(join(root, 'content/apps.json'), 'utf8'));
    const releases = (await fetchAllReleases()).filter((r) => !r.draft);

    const totals = [];
    const all = empty();
    for (const app of catalog.apps) {
        if (!app.release) continue;
        const sum = empty();
        const perVersion = [];
        for (const r of releases.filter((r) => r.tag_name.startsWith(`${app.release}-v`))) {
            const c = empty();
            for (const a of r.assets) {
                const k = kind(a.name);
                if (k) c[k] += a.download_count;
            }
            perVersion.push([`  ${r.tag_name}`, c]);
            for (const k of Object.keys(c)) sum[k] += c[k];
        }
        for (const k of Object.keys(sum)) all[k] += sum[k];
        totals.push([app.id, sum], ...(showVersions ? perVersion : []));
    }
    totals.push(['total', all]);
    console.log(table(totals));
}

main().catch((e) => {
    console.error(e.message);
    process.exit(1);
});
