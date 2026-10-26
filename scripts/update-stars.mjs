import { readFile, writeFile } from 'node:fs/promises';
import { projects } from '../src/data/projects.ts';

// Persist the last successful count per repository; failed requests keep old values.
const file = new URL('../src/data/stars.json', import.meta.url);
const previous = await readFile(file, 'utf8');
const stars = JSON.parse(previous);
for (const project of projects) {
  const repo = new URL(project.url).pathname.slice(1);
  try {
    const headers = { Accept: 'application/vnd.github+json' };
    if (process.env.GH_TOKEN) headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers, signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { stargazers_count: count } = await response.json();
    if (!Number.isInteger(count) || count < 0) throw new Error('Invalid star count');
    stars[repo] = count;
    console.log(`${repo}: ${count}`);
  } catch (error) {
    console.warn(`${repo}: keeping saved count (${error.message})`);
  }
}
const updated = JSON.stringify(stars, null, 2) + '\n';
if (updated !== previous) await writeFile(file, updated);
