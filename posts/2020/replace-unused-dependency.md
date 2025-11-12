---
title: Replace an Unused Dependency
date: 2020-05-07
description: >-
    If you ever run into the need to replace a dependency that is causing problems and that you can safely ignore,
    here's what to do!
legacy: true
---

I recently ran into a bit of an odd situation regarding a problematic `npm` dependency. Our app depended on an old version of `d3`, which had a dependency on an old version of `jsdom`, which itself depended on `contextify`. `contextify` is not supported on modern versions of Node and would fail to install. Upgrading `d3` to a modern version without the dependency on `jsdom` was too hard, but we needed _some_ way to move forward.

As it turns out, `jsdom` was only a dependency of `d3` in order to support a Node environment, which was not necessary for our app's use case. Could we replace the `jsdom` entirely with some kind of "dummy" package, since we didn't need a real, working version of `jsdom` anyway?

I took to Twitter with the question, and [Jan Buschtöns](https://twitter.com/buschtoens) replied with a great suggestion:

> [@alexlafroscia You could try creating noop package in your repo and reference it in the resolution using the `file:` protocol.](https://twitter.com/buschtoens/status/1257866825687281667)

As our application is already using [`yarn` workspaces](https://classic.yarnpkg.com/en/docs/workspaces/), this worked great! We created a package in the monorepo called `noop` with nothing but a `package.json` like this:

```json
{
    "name": "noop",
    "version": "1.0.0"
}
```

and then used [`yarn` resolutions](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/) to point `jsdom` to that package. Our "root" `package.json` got the following

```json
{
    "resolutions": {
        "**/d3/jsdom": "file:./packages/noop"
    }
}
```

which tells `yarn` to replace the `d3` dependency on `jsdom` with our dummy package.

If you end up in a case like this yourself and don't have a place to create your own dummy package, you could use something like the [`none`](https://www.npmjs.com/package/none) package instead for the same effect!.
