---
title: Testing ESLint Rules with Vitest
date: 2023-01-29
description: >-
  ESLint provides some great tools for testing your rules. This post shows how to use Vitest to
tags:
  - Vitest
  - ESLint
---

I recently needed to write a custom lint rule for a project that uses Vitest to run its tests. ESLint provides great tools for testing custom rules through the [`RuleTester`][ruletester] class, but using it directly would mean that this project needed two different test runners to be run all of the tests. This got me thinking: is there a way to run the tests for the lint rule _using_ Vitest?

It turns out, there is! `RuleTester` is cleverly designed for exactly this purpose. There are three static methods that can be overwritten on the `RuleTester` class to allow it to integrate with any test runner that you want. In a test helper, I defined a new class like this:

```ts
import { describe, it } from "vitest";
import { RuleTester } from "eslint";

export class VitestRuleTester extends RuleTester {
  static describe(message, callback) {
    describe(message, callback);
  }

  static it(message, callback) {
    it(message, callback);
  }

  static itOnly(message, callback) {
    it.only(message, callback);
  }
}
```

Now, after generating a lint rule using the typical Yeoman generator, you can replace the import of `RuleTester` from the `eslint` module with an import of this subclass that we've defined. Voilà! Your ESLint rule tests are now running with Vitest.

For a deeper example of testing an ESLint rule with Vitest, you can check out my example project [here][example].

[ruletester]: https://eslint.org/docs/latest/integrate/nodejs-api#ruletester
[example]: https://github.com/alexlafroscia/eslint-rule-testing-with-vitest/blob/main/tests/lib/rules/disallow-var.test.js
