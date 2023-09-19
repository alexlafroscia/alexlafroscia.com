import { getWebMentions } from "$lib/webmentions";
import type { LayoutLoad } from "./$types";

const PUBLIC_URL = "https://alexlafroscia.com";

export const load: LayoutLoad = ({ fetch, url }) => {
  const publicUrl = new URL(url.pathname, PUBLIC_URL);

  return {
    streamed: {
      webmentions: getWebMentions(publicUrl, {
        fetch,
      }),
    },
  };
};
