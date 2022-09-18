import type { RequestHandler } from "./$types";
import { Feed } from "feed";
import { prepare } from "$lib/atom/content";
import { Post } from "$lib/post";

export const prerender = true;

export const GET: RequestHandler = async () => {
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

  for (const post of await Post.all()) {
    const url = `https://alexlafroscia.com/tech/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      date: post.date,
      content: post.content ? await prepare(post.content) : undefined,
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml",
    },
  });
};
