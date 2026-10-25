import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['Essay', 'Note', 'Post']).default('Post'),
    draft: z.boolean().default(false),
    comments: z.boolean().default(true),
  }),
});
export const collections = { writing };
