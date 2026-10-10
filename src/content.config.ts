// The shape every blog post must have. A post that breaks these rules stops the build,
// so nothing half-finished goes live by accident.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(155),
    category: z.enum(['Build Logs', 'AI Automations & Agents', 'AI Marketing', 'Industry Guides', 'AI & Data Safety', 'Tool Reviews']),
    status: z.enum(['draft', 'review', 'published']),
    publishDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // What in this post is our own: a build, a number, a screenshot or an opinion. Required.
    originalElement: z.string().min(10),
    targetPhrase: z.string().optional(),
    tags: z.array(z.string()).default([]),
    sources: z.array(z.string().url()).default([]),
    youtubeId: z.string().optional(),
  }),
});

export const collections = { posts };
