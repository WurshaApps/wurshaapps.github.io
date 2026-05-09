#!/usr/bin/env node
// Generate placeholder marketing images via Gemini 2.5 Flash Image ("Nano Banana").
//
// Reads PLACEHOLDER_IMAGES.md, extracts each entry's filename + aspect-ratio kind
// + prompt block, and writes the generated image into public/.
//
// Usage:
//   GEMINI_API_KEY=... node scripts/generate-placeholders.mjs            # all missing
//   GEMINI_API_KEY=... node scripts/generate-placeholders.mjs --force    # regenerate all
//   GEMINI_API_KEY=... node scripts/generate-placeholders.mjs --only 2,5 # by entry number
//   GEMINI_API_KEY=... node scripts/generate-placeholders.mjs --dry-run  # parse only
//
// Get a key at https://aistudio.google.com/apikey

import { readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, 'PLACEHOLDER_IMAGES.md');
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// PlaceholderComponent kinds → Gemini-supported aspect ratios.
// 9:19 has no native option; 9:16 is the closest — crop after.
// 16:10 maps to 16:9 for the same reason.
const KIND_TO_RATIO = {
    phone: '9:16',
    wide: '16:9',
    square: '1:1',
    background: '21:9',
};

function parseArgs(argv) {
    const args = { force: false, dryRun: false, only: null };
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--force') args.force = true;
        else if (a === '--dry-run') args.dryRun = true;
        else if (a === '--only') args.only = new Set(argv[++i].split(',').map((s) => Number(s.trim())));
        else throw new Error(`Unknown arg: ${a}`);
    }
    return args;
}

// Pull each "## N. Title" section and extract file/kind/prompt.
function parseSpec(md) {
    const sections = md.split(/\n(?=## \d+\. )/g).filter((s) => /^## \d+\. /.test(s));
    return sections.map((section) => {
        const numMatch = section.match(/^## (\d+)\. (.+)$/m);
        const fileMatch = section.match(/\*\*File:\*\*\s*`([^`]+)`/);
        const kindMatch = section.match(/\*\*Kind \/ size:\*\*\s*`([^`]+)`/);
        // Prompt: blockquote lines (possibly indented under the list item) after "**Prompt:**".
        const promptMatch = section.match(/\*\*Prompt:\*\*\s*\n((?:[ \t]*>\s?.*\n?)+)/);

        if (!numMatch || !fileMatch || !kindMatch || !promptMatch) {
            const missing = [
                !numMatch && 'num',
                !fileMatch && 'file',
                !kindMatch && 'kind',
                !promptMatch && 'prompt',
            ].filter(Boolean).join(',');
            throw new Error(`Failed to parse section (missing: ${missing}): ${section.slice(0, 80)}…`);
        }

        const prompt = promptMatch[1]
            .split('\n')
            .map((l) => l.replace(/^[ \t]*>\s?/, ''))
            .join('\n')
            .trim();

        return {
            num: Number(numMatch[1]),
            title: numMatch[2].trim(),
            file: fileMatch[1].trim(),
            kind: kindMatch[1].trim(),
            prompt,
        };
    });
}

async function exists(path) {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

async function generateOne(entry, apiKey) {
    const ratio = KIND_TO_RATIO[entry.kind];
    if (!ratio) throw new Error(`Unknown kind '${entry.kind}' for entry ${entry.num}`);

    const body = {
        contents: [{ parts: [{ text: entry.prompt }] }],
        generationConfig: {
            responseModalities: ['IMAGE'],
            imageConfig: { aspectRatio: ratio },
        },
    };

    const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Gemini ${res.status}: ${text.slice(0, 400)}`);
    }

    const json = await res.json();
    const parts = json?.candidates?.[0]?.content?.parts ?? [];
    const imgPart = parts.find((p) => p.inlineData?.data);
    if (!imgPart) {
        const textPart = parts.find((p) => p.text)?.text ?? '(no text)';
        throw new Error(`No image in response. Text: ${textPart.slice(0, 200)}`);
    }

    return Buffer.from(imgPart.inlineData.data, 'base64');
}

async function main() {
    const args = parseArgs(process.argv);
    const apiKey = process.env.GEMINI_API_KEY;

    const md = await readFile(SOURCE, 'utf8');
    const entries = parseSpec(md);
    const filtered = args.only ? entries.filter((e) => args.only.has(e.num)) : entries;

    if (filtered.length === 0) {
        console.error('No entries matched. Available numbers:', entries.map((e) => e.num).join(', '));
        process.exit(1);
    }

    console.log(`Parsed ${entries.length} entries, generating ${filtered.length}.`);

    if (args.dryRun) {
        for (const e of filtered) {
            console.log(`#${e.num} ${e.kind}/${KIND_TO_RATIO[e.kind]} → ${e.file}  (${e.prompt.length} chars)`);
        }
        return;
    }

    if (!apiKey) {
        console.error('Missing GEMINI_API_KEY. Get one at https://aistudio.google.com/apikey');
        process.exit(1);
    }

    let made = 0,
        skipped = 0,
        failed = 0;

    for (const entry of filtered) {
        const out = join(ROOT, entry.file);
        if (!args.force && (await exists(out))) {
            console.log(`#${entry.num} skip (exists): ${entry.file}`);
            skipped++;
            continue;
        }

        process.stdout.write(`#${entry.num} ${entry.title} → ${entry.file} … `);
        try {
            const buf = await generateOne(entry, apiKey);
            await writeFile(out, buf);
            console.log(`ok (${(buf.length / 1024).toFixed(0)} KB, ${KIND_TO_RATIO[entry.kind]})`);
            made++;
        } catch (e) {
            console.log(`FAIL\n  ${e.message}`);
            failed++;
        }
    }

    console.log(`\nDone. Generated ${made}, skipped ${skipped}, failed ${failed}.`);
    if (failed > 0) process.exit(1);
}

main().catch((e) => {
    console.error(e.stack || e.message);
    process.exit(1);
});
