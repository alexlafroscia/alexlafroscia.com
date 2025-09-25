---
title: Writing a local @types Package
date: 2022-01-20
description: >-
    Writing your own TypeScript types for a dependency can be hard to configure correctly. Writing your own @types package for a dependency can be a quick and easy way to get your project type-checking again.
---

I recently worked on a Node.js project in TypeScript that made use of my usual suite of tools:

- [`ava`](https://github.com/avajs/ava) with [`ts-node`](https://www.npmjs.com/package/ts-node) for testing
- [`eslint`](https://eslint.org) for linting
- Good ol' `tsc` to compile my TypeScript files into JavaScript

This all worked great when there was little-to-no `tsconfig.json` customization present, but I ran into a situation that caused me some trouble.

A third-party package with an `npm` scope (meaning the name looks something like `@organization/package-name`) did not come with type definitions, nor were they available from [Definitely Typed](https://definitelytyped.org). I could write a local type definition by extending `typeRoots` in the TypeScript configuration file, but this didn't work well for `ts-node` which, by default, ignores that property. I tried to configure `paths` instead but could not get that working correctly with the scoped package name. After a lot of back-and-forth over the configuration possibilities, I almost gave up and just avoided trying to add types for this package altogether!

While reflecting on how nice and easy the "just install a `@types/` package" approach to third-party type definitions is, it occurred to me that I could probably write my _own_ `@types/` package for it within the repo and have my package manager actually install it into `node_modules`. This would satisfy all of the tools and avoid needing any custom `tsconfig.json` magic; for all intents and purposes, it would be a "normal" `@types/` package that _just so happened_ to come from inside the repo instead!

I was able to achieve this by first creating a package within the repo for the type definitions. Note that this _does not_ need to be a workspace package; it'll work just fine without that.

```bash
mkdir -p types/organization__package-name
echo '{ "name": "@types/organization__package-name" }' > package.json
touch types/organization__package-name/index.d.ts
```

Then, in the `package.json` for your project, add the following:

```json
{
    "devDependencies": {
        "@types/organization__package-name": "file:./types/organization__package-name"
    }
}
```

Note that the naming here is important: for scoped `npm` packages, the expectation for the corresponding `@types` package (because it, itself, is within the `@types` scope) is to remove the `@` from the name of the scope and join the scope and package name with two underscores in a row. The path on your file system can really be _anything_; it's the key in your `devDependencies` that is actually important for TypeScript to locate the files automatically.

After installing your new dependencies with whichever package manager you prefer, you're all set to fill out your `index.d.ts` file with the types for your dependency!
