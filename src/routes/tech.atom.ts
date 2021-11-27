import { Feed } from "feed";
import { prepare } from "$lib/atom/content";
import { findAllPosts } from "./tech.json";

type Response = {
  headers: Record<string, string>;
  body: string;
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(): Promise<Response> {
  const feed = new Feed({
    title: "Tech | Alex LaFroscia",
    description: "Tech posts by Alex LaFroscia",
    id: "http://alexlafroscia.com/tech",
    link: "http://alexlafroscia.com/tech",
    generator: "SvelteKit + Feed",
    copyright: "All rights reserved 2021, Alex LaFroscia",
    feedLinks: {
      atom: "https://alexlafroscia.com/tech.atom",
    },
    author: {
      name: "Alex LaFroscia",
      email: "alex@lafroscia.com",
      link: "https://alexlafroscia.com",
    },
  });

  feed.addCategory("Tech");

  for (const post of await findAllPosts()) {
    const url = `https://alexlafroscia.com/tech/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      date: new Date(post.date.epochMilliseconds),
      content: post.content ? await prepare(post.content) : undefined,
    });
  }

  return {
    headers: {
      "Content-Type": "application/atom+xml",
    },
    body: feed.atom1(),
  };
}
