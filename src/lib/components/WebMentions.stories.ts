import type { Meta, StoryObj } from "@storybook/svelte";
import { faker } from "@faker-js/faker";

import type { Author, Reply } from "$lib/webmentions";
import WebMentions from "./WebMentions.svelte";

function makeAuthor(): Author {
  return {
    name: faker.person.fullName(),
    photo: faker.image.avatar(),
    url: "",
    type: "card",
  };
}

function makeReply(): Reply {
  return {
    author: makeAuthor(),
    content: {
      html: faker.lorem
        .paragraphs({ min: 1, max: 3 }, "\n")
        .split("\n")
        .map((p) => `<p>${p}</p>`)
        .join("\n"),
    },
    "in-reply-to": "",
  };
}

const meta: Meta<WebMentions> = {
  title: "WebMentions",
  component: WebMentions,
  argTypes: {
    webmentions: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<WebMentions>;

export const Loading: Story = {
  args: {
    webmentions: new Promise(() => {}),
  },
};

export const NoReplies: Story = {
  args: {
    webmentions: Promise.resolve({
      type: "feed",
      name: "Webmentions",
      children: [],
    }),
  },
};

export const OneReply: Story = {
  args: {
    webmentions: Promise.resolve({
      type: "feed",
      name: "Webmentions",
      children: [makeReply()],
    }),
  },
};

export const ManyReplies: Story = {
  args: {
    webmentions: Promise.resolve({
      type: "feed",
      name: "Webmentions",
      children: [makeReply(), makeReply(), makeReply()],
    }),
  },
};
