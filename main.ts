// @pandya's entry for make.fun's "Get the most reposts and likes on make.fun's newest X posts" (makefun-x-reposts-02).
//
// The entry is a handful of posts on X, each one quoting or replying to a different post of make.fun's pool on
// x.com/makefunai. POSTS.json at the repository root lists their addresses. This program reads it, checks that it has
// the shape the gate expects (1 to 15 X post addresses, no repeats), and writes it to the output directory.
// Node 22, standard library only, no network.
//
// Locally: mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_POSTS = 15;
const MAX_BYTES = 16384;
// The pool's floor post. X ids grow with time, so a post of ours made in the contest window is always newer than it.
const POOL_FLOOR_ID = 2125053632605196760n;

// https://x.com/<handle>/status/<id>, the same on twitter.com, with an optional www. or mobile. prefix.
const POST_URL = /^https:\/\/(?:www\.|mobile\.)?(?:x|twitter)\.com\/([A-Za-z0-9_]{1,15})\/status\/(\d{1,20})(?:[?#].*)?$/;

function fail(message: string): never {
  console.error(`POSTS.json: ${message}`);
  process.exit(1);
}

const raw = readFileSync(join(BOT_DIR, 'POSTS.json'));
if (raw.length > MAX_BYTES) fail(`${raw.length} bytes, over the ${MAX_BYTES}-byte cap`);

let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString('utf8'));
} catch (err) {
  fail(`not JSON (${(err as Error).message})`);
}

const posts = (parsed as { posts?: unknown })?.posts;
if (!Array.isArray(posts) || posts.length < 1 || posts.length > MAX_POSTS) {
  fail(`"posts" must be a list of 1 to ${MAX_POSTS} addresses`);
}

const seenIds = new Set<string>();
const handles = new Set<string>();
for (const item of posts) {
  const match = typeof item === 'string' ? POST_URL.exec(item) : null;
  if (!match) fail(`not an X post address: ${JSON.stringify(item)}`);
  const [, handle, id] = match;
  if (handle.toLowerCase() === 'makefunai') fail(`${item} is make.fun's own post, not ours`);
  if (BigInt(id) <= POOL_FLOOR_ID) fail(`post ${id} is older than the pool's floor post, so it predates the contest`);
  if (seenIds.has(id)) fail(`post ${id} is listed twice`);
  seenIds.add(id);
  handles.add(handle.toLowerCase());
}
if (handles.size > 1) fail(`posts come from ${handles.size} accounts; they must all come from one`);

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'POSTS.json'), raw);
console.log(`POSTS.json: ${posts.length} post(s) from @${[...handles][0]} copied to ${OUTPUT_DIR}`);
