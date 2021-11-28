---
path: /observables-how-why
title: "Observables: How and Why"
date: 2019-02-03T23:52:35+00:00
description: >-
  How to get started with Observables, and some times you may want to use them
series:
  slug: observables
  title: How and Why
tags:
  - observables
  - rxjs
---

After getting some great feedback on my introduction to Observables, it was clear that I missed some important bits of information:

1. How do you actually start using Observables in your application?
2. Why would you want to use them over some other pattern that could achieve the same thing?

_Thank you, Emily and Offir!_

This post will discuss both of these things. By the end of it, you should have an understanding of how to start using Observables and some ways they can improve your code.

## How do you get started?

JavaScript doesn’t have native support for Observables yet. Much like the early days of Promises, you need to pick a library that implements them. There is a [proposal open to add them to the language][observables-proposal], but for the meantime, you'll need to bring your own implementation.

The most popular library for using Observables in JavaScript is [RxJS][rxjs]. Since installation can differ based on your specific environment, I will defer to the [RxJS installation documentaion][rxjs-installation] for a detailed explanation.

For the purposes of this blog post, I'll present some code that works with RxJS version 6, consumed through ES modules.

## Why use Observables?

One of the big benefits of approaching problems using Observables is that they provide a _declarative_ alternative to code that otherwise might be _imperative_.

_Declarative_ code explains what you want to achieve, while _imperative_ code describes how you want to achieve it. Generally, declarative code is less error-prone since it is easier to express what you want than how you want it. Let's look at an example problem to explore the differences.

### Event listening

A very common pattern in UI programming is listening for events and reacting to them. Let's approach a simple problem and look at how you might approach it both with and without Observables.

> Count the number of times `#my-button` is clicked. Log the updated value each time it changes.

We can break this down into four basic steps for ourselves:

1. Listen to clicks on the `#my-button` element
2. Keep a count of them
3. Log the count each time it is updated
4. Clean up the listener at some time in the future[^1]

[^1]: You should always be "hygenic" and clean up any event listeners that you create!

A typical pattern for approaching that task in JavaScript would look something like this:

```javascript
const button = document.getElementById("my-button");

let count = 0;
function handler() {
  count++;
  console.log(`Buttton clicked ${count} times`);
}

button.addEventListener("click", handler);

// Some time later...
button.removeEventListener("click", handler);
```

The above code is _imperative_. While our intention starts with the buttons clicks, our code does not mirror our intention. Instead, we start with a counter and the event handler, devoid of their role with regard to the button, and only later give them meaning by applying them to the button's event. Lastly, when we no longer care about the event, we have to be explicit about _how_ to stop listening.

Let's try to approach the same task with RxJS and Observables. RxJS provides some helper functions for creating an Observable from an event and to manipulate the Observable over time.

```javascript
import { fromEvent } from "rxjs";
import { scan } from "rxjs/operators";

const button = document.getElementById("my-button");

const subscription = fromEvent(button, "click")
  .pipe(scan(count => count + 1, 0))
  .subscribe(count => {
    console.log(`Buttton clicked ${count} times`);
  });

// Some time later...
subscription.unsubscribe();
```

This code example is _declarative_ and maps much more closely to the original intention behind the code.

- We start by creating an Observable of `click` events using the `fromEvent` helper function
- We can use `pipe` to create a "new" Observable from our "old" one. `scan` works a lot like `reduce` on an Array -- you create an Observable that emits a new value based on the previous value, starting with a seed (in our case, `0`)
- We `subscribe` to the "new" Observable -- which emits the latest `count` -- to log the value whenever it is updated.
- Lastly, when we're ready to stop listening, we simply state our intention rather than _how_ we want to stop listening

It's intentional that the code maps much more closely to the way we originally framed the task at hand. Code written in this way tends to be easier to understand and maintain over time.

The downside is that using a library like RxJS requires familiarizing yourself with the different "operators" (like `scan`) and what they do. However, once you have an idea of what is available, you end up with a powerful set of tools at your disposal that remove a lot of code you'd otherwise manage yourself.

Hopefully this gives you an idea of what kind of benefits working with Observables can bring to your code. For more examples, I highly recommend checking out the [RxJS Overview][rxjs-overview] page, which provides even more examples of approaching tasks with an without Observables.

[observables-proposal]: https://github.com/tc39/proposal-observable
[rxjs]: https://rxjs.dev/
[rxjs-installation]: https://rxjs.dev/guide/installation
[rxjs-overview]: https://rxjs.dev/guide/overview
