---
title: "Observables: A Brief Introduction"
date: 2019-01-27T23:52:35+00:00
description: >-
  The basics of observables and how to use them
series:
  slug: observables
tags:
  - observables
  - rxjs
legacy: true
---

Lately I’ve been thinking a lot about "pull" and "push" with regard to the way functions interact with each other. Imagine two functions, `a` and `b`, where `a` depends on receiving a value from `b`. The value is _pulled_ if `a` determines when the value is delivered; it is _pushed_ if `b` determines the timing.

Combined with the ability to produce either one or more than one value, you get a total of four possible categories:

- A `Function` allows you to pull a single value from it
- A `Generator` allows you to pull any number of values from it
- A `Promise` pushes you a single value when it is ready
- A `???` pushes you any number of values when it is ready

What fills in the `???` in the statement above? The answer is an `Observable`. Let's walk through how to use them by comparing their behavior to promises. If you aren't comfortable with your knowledge of promises, take a moment to read through the [MDN document on using them](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) before reading more of this post.

## What is an `Observable`?

An `Observable` can be used to represent a stream of values over time. Much like a promise, you don’t know _when_ you will get a value. They can be used any time you want to represent a series of values from a given source. Some common use cases are:

- Events from the user (keypresses, clicks)
- Data pushed from your server (WebSocket events)

Let's dig into some details on what an `Observable` is and how to use them.

## How do you interact with an `Observable`?

Much like a you call `then` on a promise to receive a value from it, you can call `subscribe` on an observable to begin receiving values

```javascript
const subscription = observable.subscribe((value) => {
  console.log(value);
});
```

The act of subscribing to the observable creates a **subscription**. The callback passed to `subscribe` is called an **observer**, and can also take the form of an object. The following example behaves the exact same way as the one above:

```javascript
const subscription = observable.subscribe({
  next: (value) => {
    console.log(value);
  },
});
```

Unlike a promise, where your handler is called at most one time, the `next` callback is invoked for each value that the observable produces.

Since we do not know how many values we will receive or when we will receive them, we may run into a case where we need to signal that we are no longer interested. The subscription allows us to `unsubscribe` when we no longer want to receive values

```javascript
const subscription = observable.subscribe((value) => {
  console.log(value);
});

// Some time later...
subscription.unsubscribe();
```

Once you’ve called `unsubscribe`, your handler function will no longer be run.

### Handling Completion and Errors

When dealing with a promise, you can react to an error occurring as well as a value being produced. Similarly, you can also react to errors from an observable.

```javascript
const subscription = observable.subscribe({
  next: value => {
    console.log(value);
  },
  error: error => {
    console.error(error);
});
```

While an observable _can_ represent an infinite source of values, it is possible that no more will be produced. In that case, they can signal that they are "complete".

```javascript
const subscription = observable.subscribe({
  next: (value) => {
    console.log(value);
  },
  complete: () => {
    console.log("Done producing values!");
  },
});
```

## Further Reading

There is more to know about observables, but this is enough to get started. Below are some resources for learning more

- [RxJS](https://rxjs-dev.firebaseapp.com) is a great JavaScript library for working with observables in your code, providing an `Observable` implementation and a ton of utilities
- [Learning Observable By Building Observable](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87) is a great blog post by Ben Lesh, the lead developer of RxJS and a fantastic resource for knowledge on observables. Check out this post to go a little deeper on the topic.

Coming soon from me: using observables in Ember.js!
