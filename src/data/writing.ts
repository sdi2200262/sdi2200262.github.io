import { getCollection } from 'astro:content';

export async function publishedWriting() {
  const now = new Date();
  return (await getCollection('writing', ({ data }) => !data.draft && data.date <= now))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
