---
path: /ember-upgrade-to-new-qunit-api
title: Upgrading an Ember app to the new QUnit API
date: 2018-02-21T18:10:00+08:00
description: Some tips on upgrading to the new QUnit API in an Ember app
tags:
  - ember.js
  - qunit
---

I recently upgraded a large Ember app to the new API and ran into a few problems along the way. Here's a few tips for making your transition smoother than mine was.

## Update your dependencies

To start off, update to the latest `ember-cli-qunit`

```bash
yarn ember install ember-cli-qunit
```

Additionally, `ember-test-helpers` can be removed from your dependencies if you have it listed there, since `ember-cli-qunit` will bring in `ember-qunit`, which in turn will bring in the new version of that package, `@ember/test-helpers`.

```bash
yarn remove ember-test-helpers
```

## Migrating the test syntax

Thankfully, there's an excellent codemod that can look at your tests and convert them to the new syntax. It's not the _only_ thing that you'll need to do, but it does get you pretty far.

You can find the repository [here](https://github.com/rwjblue/ember-qunit-codemod), but for a quick one-liner, you can run it like this:

```bash
npx jscodeshift -t https://rawgit.com/rwjblue/ember-qunit-codemod/master/ember-qunit-codemod.js ./tests/
```

## Updating your test helpers

The `tests/helpers/start-app.js` and `tests/helpers/destory-app.js` helpers are no longer used with the new testing API, and the means for creating your application instance has changed as well. If you did any setup of your test environment in `start-app.js`, you should move that code to `tests/test-helper.js`. Both of those files can be deleted.

Additionally, you need to call the new `setApplication` function provided by `@ember/test-helpers` in your `tests/test-helper.js` file. Check out the [`ember-new-output` repo](https://github.com/ember-cli/ember-new-output/blob/928deb4bf5474991b6412eb699bf9d1fb6d6f3d3/tests/test-helper.js) for an example of what the file should look like after the change.

Finally, you'll need to ensure that your application doesn't start immediately but instead boots when your tests say so. You can configure this in your `config/environment.js` file like so:

```javascript
'use strict';

module.exports = function(environment) {
  // ...

  if (environment === 'test') {
    // Ensure app doesn't automatically start
    ENV.APP.autoboot = false;
  }

  return ENV;
};
```

## Handling `ember-cli-page-objects`

If you use use `ember-cli-page-objects`, the latest beta release allows it to work with the new `@ember/test-helpers` changes. This is necessary because the test helpers that used to be injected into the global scope are now imported explicitly. Upgrade to at least version `1.15.0.beta.1` and everything should "just work" (although you may start getting deprecation warnings about a change to the `collections` API, as I did. I took this opportunity to fix those issues while I was updating everything else.

## Making `ember-cli-mirage` explicit

Tests in the new style won't automatically start the Mirage server and set up the global `server` reference (which is probably a good thing!). After updating to Mirage `0.4.2` or later, you explicitly import a helper and pass in the `hooks`, much like the way you set up an Acceptance or Integration test:

```javascript
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { currentRouteName, visit } from '@ember/test-helpers';

module('Acceptance | Projects | Show', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting a project', async function(assert) {
    const project = this.server.create('project');

    await visit(`/project/${project.id}`);

    assert.equal(currentRouteName(), 'project');
  });
});
```

An added benefit is that `setupMirage` works in any kind of test, not _just_ Acceptance tests, making Mirage usage more consistent. For more information, check out the [`0.4.2` release notes](https://github.com/samselikoff/ember-cli-mirage/releases/tag/v0.4.2).

## Other Improvements

Here's a few other things that, while not necessary, are good improvement to make to spruce up your tests

### Avoiding `jQuery` in tests

The new `@ember/test-helpers` provides a great set of `jQuery`-less test helpers for interacting with the DOM. As Ember moves toward removing `jQuery` as a dependency, you might want to migrate to these new helpers. Thankfully, there is a codemod that you can find [here](https://github.com/simonihmig/ember-test-helpers-codemod) that transforms test code like this:

```javascript
this.$('.foo').click();
```

Into code like this (which doesn't require `jQuery`)

```javascript
import { click } from '@ember/test-helpers';

await click('.foo');
```

***

I hope this was useful guide. If you have any tips of your own or want suggestions on improvements, get in touch!

