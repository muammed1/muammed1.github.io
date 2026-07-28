import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectStatusSchema = z.enum(['deployed', 'in-development', 'archived']);
const projectPrivacySchema = z.enum(['public', 'private']);

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    role: z.string().min(1),
    status: projectStatusSchema,
    privacy: projectPrivacySchema,
    featured: z.boolean().default(false),
    technologies: z.array(z.string().min(1)).min(1),
    capabilities: z.array(z.string().min(1)).min(1),
  }),
});

export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type ProjectPrivacy = z.infer<typeof projectPrivacySchema>;

export const collections = { projects };
