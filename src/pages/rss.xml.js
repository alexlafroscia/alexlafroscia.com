import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
    const posts = await getCollection("posts");

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: posts.map((post) => {
            const { data, id, rendered } = post;
            const { title, description, date } = data;

            return {
                title,
                description,
                pubDate: date,
                content: rendered.html,
                link: `/${id}/`,
            };
        }),
    });
}
