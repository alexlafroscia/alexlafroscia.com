export interface Author {
  name: string;
  photo: string;
  type: "card";
  url: string;
}

// TODO: what is this payload actually shaped like?
export interface Like {
  "like-of": string;

  "wm-property": "like-of";
}

export interface Reply {
  author: Author;
  content: {
    html: string;
    text: string;
  };

  type: "entry";
  name: string;
  published: string;
  url: string;

  "in-reply-to": string;

  "wm-id": number;
  "wm-private": false;
  "wm-property": "in-reply-to";
  "wm-received": string;
  "wm-source": string;
  "wm-target": string;
}

export type WebMention = Reply | Like;

export interface WebMentionsPayload {
  type: "feed";
  name: "Webmentions";
  children: WebMention[];
}

interface Dependencies {
  fetch: typeof fetch;
}

interface Options extends Dependencies {}

export async function getWebMentions(page: URL, { fetch }: Options): Promise<WebMentionsPayload> {
  const url = new URL("https://webmention.io/api/mentions.jf2");
  url.searchParams.set("target", page.toString());

  const payload = fetch(url).then((res) => res.json());

  return payload as Promise<WebMentionsPayload>;
}
