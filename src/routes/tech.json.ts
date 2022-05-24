import type { RequestHandler } from "./__types/tech.json";
import { pipe } from "$lib/pipe";
import { collect, filter, map } from "$lib/async-iter";
import { Post } from "$lib/post";
import type { Frontmatter } from "$lib/post";
import type { MdxvexModuleResult } from "$lib/types";

export async function findAllPosts(): Promise<Post[]> {
  const modules = import.meta.glob("./tech/**/*.{md,svx}");

  return await pipe(
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
}

// @ts-expect-error `RequestHandler` wants the `body` to be a specific type,
//                  which includes an index signature on each JSON object in
//                  the response, but I don't want to add that to `SerializedPost`
export const get: RequestHandler = async () => {
  const posts = await findAllPosts();

  return {
    body: {
      posts: posts.map((post) => post.toJSON()),
    },
  };
};
