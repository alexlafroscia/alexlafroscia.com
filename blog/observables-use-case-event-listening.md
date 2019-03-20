---
title: "Observables: A Study in Event Handling"
date: 2019-03-20T23:52:35+00:00
description: >-

series:
  slug: observables
  title: "Use Case: Event Handling"
tags:
  - observables
  - rxjs
---

One of the clearest use-cases for Observables is listening to events from a DOM node. The browser supplies its own API for subscribing to events, so why add the additional step of introducing a separate library?

We'll explore the differences between subscibing to some click events using the built-in `addEventListener` API and the `fromEvent` Observable from [RxJS][rxjs-from-event]. We'll start simple and introduce some additional requirerments to compare how both approaches evolve over time.

Let's start off with subscibing to the `click` event and logging it to the console.

```javascript
const button = document.querySelector("button");

// "Vanilla" JavaScript
button.addEventListener("click", event => {
  console.log(event);
});

// Using Observables
RxJS.fromEvent(button, "click").subscribe(event => {
  console.log(event);
});
```

The difference between the two is minimal, and a whole Observable implementation likely not worth the overhead of adding a library. However, code is never really static; it changes as our product does.

Imagine your requirements have changed and a slight tweak is requested: only log the event if the `SHIFT` key is being held down. How do both change with the new requirement?

```javascript
// "Vanilla" JavaScript
button.addEventListener("click", event => {
  if (event.shiftKey) {
    console.log(event);
  }
});

// Using Observables
RxJS.fromEvent(button, "click")
  .pipe(RxJS.filter(event => event.shiftKey))
  .subscribe(event => {
    console.log(event);
  });
```

In our first example, we subscibe to _all_ of the click events. Within the subscription, we can check whether the `SHIFT` key is being held down and only log when that is `true`. This isn't too bad, and we have all written "defensive" code like this by introducing conditionals around our behavior.

In our Observable case, we remove all events where the shift key is not being held down. When we actually subscribe to the events, we don't need to check `event.shiftKey` because the filtering was done first. We can safely log all of the events we subscribed to, because we only subscribed to the ones we want.

> Note: Much like `Array.filter` creates a new `Array` from all the elements for which the function returns `true`, the Observable `filter` function creates a new Observable that only emits the events for which the condition is `true`.

The benefits to the Observable approach can be made even more clear when we add an additional requirement: only log _every other_ event where the shift key was held down. What does an implementation for each of these look like?

```javascript
const isOdd = number => number % 2 !== 0;

// "Vanilla" JavaScript
let shiftClickCounter = 0;
button.addEventListener("click", event => {
  if (event.shiftKey) {
    if (isOdd(shiftClickCounter)) {
      console.log(event);
    }
    shiftClickCounter = shiftClickCounter + 1;
  }
});

// Using Observables
RxJS.fromEvent(button, "click")
  .pipe(
    RxJS.filter(event => event.shiftKey),
    RxJS.filter((_, index) => isOdd(index))
  )
  .subscribe(event => {
    console.log(event);
  });
```

In the vanilla example, we lack any real concept of the sequence of the events; each event is handled independently of any other. This means that we need to manually keep tracker of the odd or even state and compare against that in order to log at the correct time. Additionally, we end up with some error-prone nested conditionals where we check the `SHIFT` key state, and _then_ the odd/even state, and log at the appropriate time, being sure to update the odd/even flag at the right time as well.

Comparitively, the Observable implementation allows us to simply add an additional `filter` on the original Observable. After filtering out all the events where we do not have the `SHIFT` key pressed, we add a second filter and only emit only the odd-numbers events.

[rxjs-from-event]: https://rxjs.dev/api/index/function/fromEvent
