---
title: Setting a Request ID in SvelteKit
date: 2022-05-05
---

Giving each request to your server a unique identifier can be a really helpful tool for debugging an application. Let's take a look at how we can create such an identifier when using SvelteKit!

In case it's not familiar to you already, the idea behind a request ID is to have a single, unique value that can be used as part of all of the logging that you doing the lifetime of a request. This allows you to connect different logs from the same request together, by looking for all of the logs that contain that ID. Often times, this ID is also attached as a header to the response from the server; this allows us to, for example, find the ID for a request that unexpectedly failed and use that to locate all the logs for that request. These requirements give us 3 things that we need to do:

1. Generate a unique identifier
2. Make it available to each request handler
3. Assign it as a header

Let's take a look at how we can do each of these things!

## Generate a Unique Identifier

A unique identifier may sound simple at first, but can be a deceptive amount of complexity around actually _creating_ a string that we can trust to be unique. Since this guarantee is very important to us, it's a good idea to make use of a shared, trusted implementation for this behavior.

The [`uuid`](https://www.npmjs.com/package/uuid) package on _npm_ is often used for this purpose, but as of version 16.7.0, Node.js can actually do this for us! Since version 16.15.0 is now the LTS release (meaning it's the recommended version for most users) we can safely choose to use the language's tools rather than an external package.

Creating a unique identifier in Node.js looks like this; we can import the `randomUUID` function form the `node:`-scoped `crypto` module and call it to create a guaranteed-unique identifier for us to use.

```ts
import { randomUUID } from "node:crypto";

const id: string = randomUUID();
```

This is a code snippet that we will come back to in the next section!

## Make it available to each request handler

Now that we know how we are going to generate our identifier, we need a way to make it available to our request handler. While we _could_ generate it within each of our SvelteKit endpoints, this ends up being a lot of repeated boilerplate code that it would be nice to avoid. Thankfully, SvelteKit has a mechanism called **locals** that serve exactly this purpose! Locals allow us to define additional properties that are attached to the `event` object that each SvelteKit endpoint receives.

The first step, if you're using TypeScript, is to tell SvelteKit the type of your new "local". Skip this part if you're using JavaScript; otherwise, open up the `src/app.d.ts` file, which should look something like this:

```ts
/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}
```

This file contains a few different types that, if defined, will help power autocomplete and type-checking for different SvelteKit APIs that you can define for your application. In this case, we want to define the `Locals` interface to include our request ID by updating the file like so:

```ts
/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  interface Locals {
    /**
     * The unique identifier for this request
     */
    requestId: string;
  }

  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}
```

Now that we have the type definition in place, we're ready to actually define our request ID "local"! We can do this by using the [`handle` hook](https://kit.svelte.dev/docs/hooks#handle), which allows us to define logic that runs before or after SvelteKit creates the response to a request. Right now we will use it to define out "local" on the `event` object:

```ts
// src/hooks.ts
import type { Handle } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.requestId = randomUUID();

  const response = await resolve(event);

  return response;
};
```

With that in place, every SvelteKit endpoint that you define can access `locals.requestId` to retreive our unique identifier!

## Assign it as a header

The last requirements that we defined earlier was to supply the request ID as a header on the response. Thankfully, our `handle` hook can help us here too! Since it receives the response from SvelteKit before it is delivered to the browser, we have an opportunity to modify it before it is sent.

```ts
// src/hooks.ts
import type { Handle } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.requestId = randomUUID();

  const response = await resolve(event);

  response.headers.set("x-request-id", event.locals.requestId);

  return response;
};
```

In this instance, we have given the header the name `x-request-id` because it's an often-used value when using this pattern. For your application, you can choose any name that makes sense for you!

---

I hope this post has been useful for learning about SvelteKit's APIs and how you can use them to assign a unique request ID that can help you debug your applications. If you want to view the source code for a working SvelteKit example app that uses this pattern, you can check out [this commit here](https://github.com/alexlafroscia/sveltekit-cls-demo/commit/b44b27e4566d1d693825382f10364ed10a7ff6c0)!
