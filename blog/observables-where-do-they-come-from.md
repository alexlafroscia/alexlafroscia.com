---
title: "Observables: Where do they come from?"
date: 2019-03-20T21:52:35+00:00
description: >-
  How do you actually get access to an Observable?
series:
  slug: observables
  title: Where do they come from?
tags:
  - observables
  - rxjs
---

If your interest in Observables has been piqued, you might be wondering how you actually start using them in your application. Currently, the browser does _not_ ship with an Observable implementation; you need to install a library that provides one. There are a few available, such as:

1. [RxJS][rxjs]
2. [Zen Observable][zen-observable]

I'll defer to their respective documentation on ways to install them into your application.

> Note: There is an open proposal to add an Observable implementation to JavaScript, which you can find [here][observable-proposal].

## Getting Observables in Your Application

Now that Observables are available to your application, where might you start using them? Observables can be helpful any time you have a source of events that you want to manage and react to.

### DOM Events

Say that we want to subscribe to clicks from a button and, as a result, log something to the console. Here's what that looks like both without Observables, and with **RxJS** helping us

```javascript
const button = document.querySelector("button");

// Using Observables
RxJS.fromEvent(button, "click").subscribe(event => {
  console.log(event);
});
```

You can check out [my deep-dive on the benefits of using an Observable for this][event-handling-deep-dive] for information on why you might want to use this approach.

[rxjs]: https://rxjs.dev
[zen-observable]: https://github.com/zenparsing/zen-observable
[observable-proposal]: https://github.com/tc39/proposal-observable
[event-handling-deep-dive]: /observables-use-case-event-listening
