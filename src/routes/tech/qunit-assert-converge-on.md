---
title: Converging on a Condition in QUnit
date: 2019-03-01T08:07:52.708Z
description: >-
  Sometimes it's hard to avoid race conditions in your tests. Writing convergent assertions can help!
tags:
  - testing
  - qunit
  - ember.js
---

While writing some acceptance tests recently I kept running into slight race conditions between the state my application and an assertion I wanted to make. For example, one of the tests looked something like this:

```javascript
test("creating a comment", async function (assert) {
  assert.equal(Task.comments.messages.length, 5, "Starts with correct number of comments");

  await Task.comments.input.fillIn("A new comment");
  await Task.comments.send();

  assert.equal(Task.comments.message.length, 6, "Adds a new comment");
});
```

How does the test know that the right number of messages should be visible at the point that `send()` resolves?

Thanks to the smart folks that create the test utilities we have available in Ember, the answer is ✨magic ✨ (sort of). The work to render the new message is scheduled into the Run Loop, and `send()` resolves once the Run Loop is done with any pending work. You often don't even need to thinking about the fact that there is probably some time between when the message is created and when it appears on the screen.

This, however, wasn't always working for me. Specifically, it worked locally but often broke when running the tests in CI -- the page would not have the new message visible at the point that we tried to check the updated count. How can we make the test more resilient to this kind of failure?

## Wait for the condition

Ember ships with a useful helper function called `waitUntil`. You can give it a function, and it will create a `Promise` that resolves once your function returns `true`. We can use it to make sure that the new message is visible before our assertion is run to make the test a little more reliable.

```javascript
import { waitUntil } from "@ember/test-helpers";

test("creating a comment", async function (assert) {
  assert.equal(Task.comments.messages.length, 5, "Starts with correct number of comments");

  await Task.comments.input.fillIn("A new comment");
  await Task.comments.send();

  await waitUntil(() => Task.comments.length === 6);

  assert.equal(Task.comments.message.length, 6, "Adds a new comment");
});
```

If we never get to a point where 6 comments are visible, an error will be thrown by `waitUntil` and our tests will fail.

Waiting on the condition and then asserting the same condition introduces some repetition that would be nice to avoid, however. How can we clean this up?

## Custom QUnit Assertion

Based around the testing approach that [The Frontside](https://frontside.io) has talked about on their podcast (and use within their [BigTest](https://www.bigtestjs.io) testing tools), I packaged the assertion and waiter into a single, custom QUnit assertion. It allows you to “converge” on a condition in your tests — it will continue to try your assertion until it is met and fail if the case is never met.

The above test can be revised using it like so:

```javascript
test("creating a comment", async function (assert) {
  assert.equal(Task.comments.messages.length, 5, "Starts with correct number of comments");

  await Task.comments.input.fillIn("A new comment");
  await Task.comments.send();

  await assert.convergeOn(() => Task.comments.length === 6, "Adds a new comment");
});
```

The same effect is achieved, but without the duplication between the waiter and assertion.

If you want to leverage this pattern in your own tests, you can put the following in your `tests/test-helper.js` file:

```javascript
import QUnit from "qunit";
import { waitUntil } from "@ember/test-helpers";

QUnit.extend(QUnit.assert, {
  async convergeOn(condition, message) {
    try {
      await waitUntil(condition);

      this.pushResult({ result: true, message });
    } catch (e) {
      if (e.message === "waitUntil timed out") {
        this.pushResult({ result: false, message });
      } else {
        throw e;
      }
    }
  },
});
```

Hopefully this pattern helps you write clear, stable tests!
