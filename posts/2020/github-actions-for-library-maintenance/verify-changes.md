---
title: Verifying Changes
date: 2020-02-15T08:07:52.708Z
description: >-
    Some tips on ways that GitHub actions can make your life easier as
    an Open Source library maintainer.
series:
    slug: github-actions
topics:
    - open-source
    - github-actions
legacy: true
---

Recently, [Movable Ink](https://movableink.com/), the company where I work, released our configuration for [Tailwind](https://tailwindcss.com/) as an open-source project. While it's only being used internally, making it Open Source has been a motivating factor to keep the code clean and be thoughtful about how we're maintaining it. Using [GitHub Actions](https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions) has been key in helping us achieve that goal. In this series of posts, I'll be covering all the ways we're putting GitHub Actions to work for us.

In this first post we'll dive into the configuration for our [Verify](https://github.com/movableink/tailwind-config/blob/612bb35be17c4b4c82ee782502d0d8be716326fc/.github/workflows/verify.yml) workflow, which runs our tests and makes sure that all of the code is formatted the right way.

## Testing and Linting

The testing and linting jobs are almost identical, so we'll only go in-depth into the `test` job. Let's break down the steps to see what's going on. Below is the "full" definition for the `test` job in our `verify` workflow:

```yaml
test:
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@v1
        - uses: actions/setup-node@v1
          with:
              node-version: "12.x"
        - name: Get yarn cache directory path
          id: yarn-cache-dir-path
          run: echo "::set-output name=dir::$(yarn cache dir)"
        - uses: actions/cache@v1
          id: yarn-cache
          with:
              path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
              key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
              restore-keys: |
                  ${{ runner.os }}-yarn-
        - run: yarn install
        - run: yarn test
```

The first few lines are pretty typical for all GitHub Actions:

```yaml
test:
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@v1
```

These state that:

- The job will be named `test`, as that's the top-level key that the rest of the information is nested under
- The job should execute inside an Ubuntu environment. In our case, because we're dealing with code that runs in a browser, we don't really care what the operating system running the browser is. GitHub Actions supports running jobs on Windows or macOS.
- The job should start things off by checking out the project, so we have access to the code in the environment of the workflow. By default, it checks out the most recent commit from the branch that triggered this workflow, which is what we want.

That last one might seem a little obvious, but as we'll see in later posts within this series, you'll sometimes want some slightly different behavior!

### Node Setup

The next few step gives us a Node environment with `yarn` installed automatically, which is great for our project that uses `yarn`.

```yaml
- uses: actions/setup-node@v1
  with:
      node-version: "12.x"
```

The `with` key is how we can provide input into an action. It can be thought of like providing arguments to a function call. For the `actions/setup-node` action, we can provide a specific Node version we want to run against. While the action will work without a specific version, I prefer to provide that value to remove some guesswork about the environment we are running inside.

### Yarn Caching

The next few steps came directly from the documentation for `actions/cache`, the Action provided by GitHub for caching files between jobs. In the example below it is used to prime the environment with the `yarn` cache from our last test run, so that we can avoid the time to download dependencies where possible. This step is entirely optional, but in my experience has shaved at least 30 seconds off the time to run this job, which in my opinion is worth the few extra lines of configuration!

Since they are a little hard to read, let's break down exactly what's happening here:

```yaml
- name: Get yarn cache directory path
  id: yarn-cache-dir-path
  run: echo "::set-output name=dir::$(yarn cache dir)"
- uses: actions/cache@v1
  id: yarn-cache
  with:
      path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
      key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
      restore-keys: |
          ${{ runner.os }}-yarn-
```

The first step sets up a variable that we'll use in the second step through the output of the step. Actions can have an _output_ that can be referenced later on in your configuration file. Note the `id` on that step; it'll be important later on!

Let's dive into the syntax of the command being run here:

```bash
echo  "::set-output name=dir::$(yarn cache dir)"
```

We start off by using `echo` to print something to `STDOUT`. GitHub Actions looks for this specific `::set-output` syntax to find the output from your actions. This whole mechanism is pretty clever, in my opinion, because it means that _anything_ can set output from an action to pass along for later use; all it needs to do is print that line to the console.
`name=dir` specifies how we'll reference the output. An Action can have as many different outputs as it would like, so they must be named. In this case, we're naming it `dir`. The `::` is part of the Actions syntax, and is used as a separator between the name of the output and the value.

The next bit here is a bit of `bash`-foo: `$(yarn cache dir)` says to run the `yarn cache dir` command and interpolate the result into the string that it's found within. The result here is an Action output called `dir` whose value is the result of `yarn cache dir`, the location that `yarn` is configured to cache anything it has downloaded.

All of that gets us through just the _first_ of the two `yarn`-caching steps, but the latter is somewhat easier to digest. Here we're using `actions/cache` to restore the `yarn` cache between test runs.

```yaml
- uses: actions/cache@v1
  id: yarn-cache
  with:
      path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
      key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
      restore-keys: |
          ${{ runner.os }}-yarn-
```

The `with` key here is how we pass input to a GitHub Action. The `actions/cache` action takes three inputs that we care about for our usage case.

- `path`: The location on disk that we want to cache. Here we're using the fact that we can reference the output from previous steps in the configuration of future ones. The `${{ }}` syntax is how we tell GitHub Actions that we want to grab a dynamic value that the Actions environment provides. The `steps.yarn-cache-dir-path.outputs` bit is how we reference a specific previous step (note that `id` that we step up previously and the way it appears in the reference for the output). We lastly provide `dir`, the specific name of the output from our previous step.
- `key`: The key to match on when we're restoring our dependency cache. Here we're dynamically building the key based on a few dynamic values. For one, the operating system that we're running in, since the dependencies might install differently on different OSes. Secondly, a hash of the `yarn.lock` file, since a `yarn.lock` describes the specific set of dependencies that we'll need. By using a hash of the `yarn.lock` in the cache key, we can make use of a cache created by a previous job as long as it has not installed or removed any dependencies, which is the behavior that we want!
- `restore-keys`: `actions/cache` allows us to provide "partial" keys to be used if we don't have an exact cache key "hit". Since the dependencies are likely similar, even if the `yarn.lock` hash has changed, we are telling GitHub Actions to restore from another cache that matches the prefix `${{ runner.os }}-yarn.lock-` in case of a cache "miss". That will serve as a decent starting point for our dependency installation, rather than starting from a completely empty cache. When GitHub Actions uploads a new cache later on, though, it will store it with the full key that was provided by the `key` input.

The [`actions/cache` documentation](https://help.github.com/en/actions/configuring-and-managing-workflows/caching-dependencies-to-speed-up-workflows) does a great job of giving a deeper description if you want more information.

There is one last step after the cache configuration that's important:

```yaml
- run: yarn install
```

We need to make sure we actually run the `yarn install`! This takes the files out of the cache and places them into the correct location in your filesystem, as well as downloading any additional dependencies that were added since the cache was created.

### Running the Tests

The last step is actually what we want to run in the first place!

```yaml
- run: yarn test
```

With our environment ready for us, we can run our test suite. For this library in particular, that means running [`ava`](https://github.com/avajs/ava), a simple-to-use test runner for Node projects. The actual tools matter little, as long as you're writing tests somehow!

## Using Pre-Built Actions

While our previous example had us writing a lot of the logic by hand, there are also pre-built actions that bundle up some helpful behavior for us. One great example of this is [Percy](https://percy.io/), which provides a GitHub Action for creating a visual diff test for each of your [Storybook](https://storybook.js.org/) stories. You can find that action [here](https://github.com/percy/storybook-action).

The definition of the job is identical to our `test` job, except that instead of running `yarn test`, we use the Percy-provided action like so:

```yaml
- name: Percy Test
  uses: percy/storybook-action@v0.1.1
  with:
      storybook-flags: "-s dist"
  env:
      PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

This covers the testing configuration for our project. Keep an eye out for future posts on changelog generation, file size reports and deployment!
