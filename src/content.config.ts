import { defineCollection, z, reference } from "astro:content";
import { glob } from "astro/loaders";

const color = z.object({
    accent: z.string().optional(),
    contrast: z.string().optional(),
});

const posts = defineCollection({
    // Load Markdown and MDX files in the `posts` directory.
    loader: glob({ base: "./posts", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: () =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            date: z.coerce.date(),
            topics: z.array(reference("topics")).optional(),
        }),
});

const topics = defineCollection({
    loader: glob({ base: "./topics", pattern: "**/*.{md,mdx}" }),
    schema: () =>
        z.object({
            label: z.string(),
            color: z.optional(color),
        }),
});

export const collections = {
    posts,
    topics,
};
