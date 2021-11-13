---
title: Generate Integration test data with Mirage
date: 2018-02-25T08:11:29+08:00
description: Need Ember Data models in Integration tests? You can use Mirage, even if the component doesn't fetch the data itself.
tags:
  - ember.js
  - qunit
  - mirage
---

<script context="module">
    import{ base } from '$app/paths';
</script>

If you have an Ember component that requires an Ember Data model as an attribute, you might want to use Mirage to generate the models in the right shape. Thankfully, you can access Ember Data in your test to generate the data, then pass that into the component to test it.

```javascript
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'my-app/tests/helpers/setup-mirage';
import { find, render } from '@ember/test-helpers';
import { run } from '@ember/runloop';

module('Integration | Components | render-post', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
  });

  test('it renders a blog post', async function(assert) {
    const post = this.server.create('post', {
      name: 'Generate Integration test data with Mirage'
    });

    await run(async () => {
      this.set('post', await this.store.findRecord('post', post.id);
    });

    await render(hbs`{{render-post post}}`);

    const title = await find('h1');
    assert.equal(title.textContent, post.name, 'Rendered the title');
  });
});
```

**Note**: For the `setupMirage` definition, see [my previous blog post][qunit-api-blog-post] about the new QUnit API.

[qunit-api-blog-post]: {base}/tech/ember-upgrade-to-new-qunit-api
