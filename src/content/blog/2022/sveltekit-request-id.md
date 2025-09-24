---
title: Setting a Request ID in SvelteKit
date: 2022-05-30
tags:
  - sveltejs
  - sveltekit
---

I have been working on a full-stack application in [SvelteKit](https://kit.svelte.dev) recently. As the complexity of the application grew, it started getting harder to understand what was happening during each page render. I knew I needed something to help track down what was happening in my application during each request. The solution to my problem was a familiar one: request IDs!

A request ID allows you to have a single, unique value that can be used as part of each log entry that you create during the lifetime of a request. This allows you to find all of the log entries from a given request by searching for entries that contain the request ID. We will also attach the request ID as a header on the response from the server, so that we can access it from the browser when one of our requests fails; this can really aid in debugging problems that your users run into.

Setting up our application this way gives us 3 things we need to do:

1. [Generate a unique identifier](#1-generate-a-unique-identifier)
2. [Make it available to each request handler](#2-make-it-available-to-each-request-handler)
3. [Assign it as a header](#3-assign-it-as-a-header)

Let's take a look at how we can do each of these things!

## 1. Generate a Unique Identifier

There can be a deceptive amount of complexity around creating a string that we can trust to be unique. Since this guarantee is very important to us, it's a good idea to make use of a shared, trusted implementation for this behavior.

The [`uuid`](https://www.npmjs.com/package/uuid) package on _npm_ is often used for this purpose, but as of version 16.7.0, Node.js can actually do this for us! Since version 16.15.0 is now the LTS release (meaning it's the recommended version for most users) we can safely choose to use the language's tools rather than an external package.

Creating a unique identifier in Node.js looks like this; we can import the `randomUUID` function from the `node:`-scoped `crypto` module and call it to create a guaranteed-unique identifier for us to use.

```ts
import { randomUUID } from "node:crypto";

const id: string = randomUUID();
```

This is a code snippet that we will come back to in the next section!

## 2. Make it available to each request handler

Now that we know how we are going to generate our identifier, we need a way to make it available to our request handler. While we _could_ generate it within each of our SvelteKit endpoints, this ends up being a lot of repeated boilerplate code that it would be nice to avoid. Thankfully, SvelteKit has a mechanism called "locals" that serve exactly this purpose! "Locals" allow us to define additional properties that are attached to the `event` object that each SvelteKit endpoint receives.

The first step, if you're using TypeScript, is to tell SvelteKit the type of your new "local". Skip to the definition for `handle` below if you're using JavaScript; otherwise, open up the `src/app.d.ts` file, which should look something like this:

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

Now that we have the type definition in place, we're ready to actually define our request ID "local"! We can do this by using the [`handle` hook](https://kit.svelte.dev/docs/hooks#handle), which allows us to define logic that runs before or after SvelteKit creates the response to a request. Right now we will use it to define our "local" on the `event` object before SvelteKit creates the response for the request:

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

## 3. Assign it as a header

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

Here we have followed the convention of calling the header `x-request-id`, but you can choose any name that makes sense to you!

---

I hope this post has been useful for learning about request IDs and how you can create them in SvelteKit. If you want to view the source code for a working example app that uses this pattern, you can check out that out [here](https://github.com/alexlafroscia/sveltekit-cls-demo/commit/b44b27e4566d1d693825382f10364ed10a7ff6c0)!
