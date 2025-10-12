import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
    // Load Markdown and MDX files in the `posts` directory.
    loader: glob({ base: "./posts", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            date: z.coerce.date(),
            tags: z.array(z.string()).optional(),
        }),
});

export const collections = { posts };
