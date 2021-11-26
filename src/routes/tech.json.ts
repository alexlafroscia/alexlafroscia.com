import { pipe } from "$lib/pipe";
import { collect, filter, map } from "$lib/async-iter";
import { Post } from "$lib/post";
import type { Frontmatter, SerializedPost } from "$lib/post";
import type { MdxvexModuleResult } from "$lib/types";

type Response = {
  body: {
    posts: SerializedPost[];
  };
};

export async function get(): Promise<Response> {
  const modules = import.meta.glob("./tech/**/*.{md,svx}");

  // Retrieve the same `mdsvex` config that we use at build-time
  const posts = await pipe(
    Object.entries(modules),
    map(async function ([entry, importModule]) {
      const slug = entry
        // Remove directory from path
        .replace("./tech", "")
        // Trim leading slash
        .replace(/^\//, "")
        // Remove file extension
        .replace(/\.(svx|md)$/, "");

      const { default: mod, metadata: frontmatter = {} } = await importModule();
      const code: MdxvexModuleResult = mod.render();

      return { code, frontmatter: frontmatter as Frontmatter, slug };
    }),
    filter((post) => !!post.frontmatter.date),
    map(({ code, frontmatter, slug }) => new Post(slug, code, frontmatter)),
    collect
  );

  return {
    body: {
      posts: posts.map((post) => post.toJSON()),
    },
  };
}
