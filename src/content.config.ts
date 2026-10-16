import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { outputTypes } from './data/output-types';
import { outputStatuses } from './data/output-statuses';
import { projects } from './data/site';

const resourceUrl = z.string().refine((value) => {
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\')) return true;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); }
  catch { return false; }
}, 'Use an https:// URL or a site-relative path such as /papers/paper.pdf');

const outputs = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/outputs' }),
  schema: z.object({
    title: z.string().trim().min(1),
    authors: z.array(z.string().trim().min(1)).min(1),
    year: z.number().int().min(1900).max(2100),
    dateAdded: z.string().date(),
    type: z.enum(outputTypes),
    status: z.enum(outputStatuses).default('Published'),
    authorNote: z.string().optional(),
    image: z.object({ src: resourceUrl, alt: z.string().trim().min(1) }).optional(),
    tags: z.array(z.string().trim().min(1).transform((tag) => tag.toLowerCase())).default([]).transform((tags) => [...new Set(tags)]),
    projects: z.array(z.string().refine((id) => projects.some((project) => project.id === id), 'Use an existing project ID from src/data/site.ts')).default([]).transform((ids) => [...new Set(ids)]),
    venue: z.string().default(''),
    doi: z.string().regex(/^10\.\d{4,9}\/\S+$/, 'Use a DOI identifier such as 10.1234/example, without https://doi.org/').optional(),
    links: z.array(z.object({ label: z.string().trim().min(1), url: resourceUrl })).default([]),
    draft: z.boolean().default(true),
  }),
});

export const collections = { outputs };
